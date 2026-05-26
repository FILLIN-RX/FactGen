import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import { useCurrencyStore } from "@/shared/stores/currency.store";

export const useStatsStore = defineStore("stats", {
  state: () => ({
    totalClients: 0,
    totalClientsSemaineDerniere: 0,
    totalFactures: 0,
    totalFacturesSemaineDerniere: 0,
    totalRevenu: 0,
    totalRevenuSemaineDerniere: 0,
    totalReductions: 0,
    totalProspects: 0,
    mois: [],
    revenusParMois: [],
    jours: [],
    revenusParJours: [],
    isLoading: false,
    error: null,
    lastUpdated: null,
  }),

  getters: {
    moyenneRevenuParMois: (state) => {
      const total = state.revenusParMois.reduce((sum, revenu) => sum + revenu, 0);
      return state.revenusParMois.length > 0 ? total / state.revenusParMois.length : 0;
    },

    moisLePlusRentable: (state) => {
      if (state.revenusParMois.length === 0) return null;
      const maxRevenu = Math.max(...state.revenusParMois);
      const index = state.revenusParMois.indexOf(maxRevenu);
      return { mois: state.mois[index], revenu: maxRevenu };
    },

    clientsTrend: (state) => {
      const diff = state.totalClients - state.totalClientsSemaineDerniere;
      const pourcent = (diff / (state.totalClientsSemaineDerniere || 1)) * 100;
      return { value: `${pourcent.toFixed(1)}%`, direction: pourcent >= 0 ? "up" : "down" };
    },

    facturesTrend: (state) => {
      const diff = state.totalFactures - state.totalFacturesSemaineDerniere;
      const pourcent = (diff / (state.totalFacturesSemaineDerniere || 1)) * 100;
      return { value: `${pourcent.toFixed(1)}%`, direction: pourcent >= 0 ? "up" : "down" };
    },

    revenuTrend: (state) => {
      const diff = state.totalRevenu - state.totalRevenuSemaineDerniere;
      const pourcent = (diff / (state.totalRevenuSemaineDerniere || 1)) * 100;
      return { value: `${pourcent.toFixed(1)}%`, direction: pourcent >= 0 ? "up" : "down" };
    },

    totalRevenuConverti: (state) => {
      const currencyStore = useCurrencyStore();
      return currencyStore.convert(state.totalRevenu).toFixed(2);
    },

    revenusParMoisConvertis: (state) => {
      const currencyStore = useCurrencyStore();
      return state.revenusParMois.map((revenu) => currencyStore.convert(revenu));
    },

    revenusParJoursConvertis: (state) => {
      const currencyStore = useCurrencyStore();
      return state.revenusParJours.map((revenu) => currencyStore.convert(revenu));
    },

    tauxConversion: (state) => {
      if (!state.totalProspects) return 0;
      return ((state.totalClients / state.totalProspects) * 100).toFixed(1);
    },
  },

  actions: {
    async chargerStatistiques(forceRefresh = false) {
      if (!forceRefresh && this.lastUpdated) {
        if (Date.now() - this.lastUpdated < 60000) return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const userId = useAuthStore().userId;
        if (!userId) throw new Error("Utilisateur non authentifié");

        const uneSemaineEnArriere = new Date();
        uneSemaineEnArriere.setDate(uneSemaineEnArriere.getDate() - 7);

        const [
          { count: totalClients },
          { count: totalClientsSemaineDerniere },
          { count: totalFactures },
          { count: totalFacturesSemaineDerniere },
          { data: factures },
          { data: reductionsData },
          { count: totalProspects },
        ] = await Promise.all([
          supabase.from("clients").select("*", { count: "exact", head: true }).eq("user_id", userId),
          supabase.from("clients").select("*", { count: "exact", head: true }).eq("user_id", userId).lt("created_at", uneSemaineEnArriere.toISOString()),
          supabase.from("facture").select("*", { count: "exact", head: true }).eq("user_id", userId),
          supabase.from("facture").select("*", { count: "exact", head: true }).eq("user_id", userId).lt("created_at", uneSemaineEnArriere.toISOString()),
          supabase.from("facture").select("montant_total, created_at").eq("user_id", userId),
          supabase.from("facture").select("reduction").eq("user_id", userId).not("reduction", "is", null),
          supabase.from("prospects").select("*", { count: "exact", head: true }).eq("user_id", userId),
        ]);

        this.totalClients = totalClients ?? 0;
        this.totalClientsSemaineDerniere = totalClientsSemaineDerniere ?? 0;
        this.totalFactures = totalFactures ?? 0;
        this.totalFacturesSemaineDerniere = totalFacturesSemaineDerniere ?? 0;
        this.totalProspects = totalProspects ?? 0;

        let totalRevenu = 0;
        let totalRevenuSemaineDerniere = 0;
        (factures || []).forEach(({ montant_total, created_at }) => {
          const montant = parseFloat(montant_total) || 0;
          totalRevenu += montant;
          if (new Date(created_at) < uneSemaineEnArriere) {
            totalRevenuSemaineDerniere += montant;
          }
        });
        this.totalRevenu = Math.round(totalRevenu * 100) / 100;
        this.totalRevenuSemaineDerniere = Math.round(totalRevenuSemaineDerniere * 100) / 100;

        const totalReductions = (reductionsData || []).reduce((sum, facture) => {
          if (facture.reduction && typeof facture.reduction === 'object') {
            return sum + (parseFloat(facture.reduction.valeurCalculee) || 0);
          }
          return sum;
        }, 0);
        this.totalReductions = Math.round(totalReductions * 100) / 100;

        this.lastUpdated = Date.now();
      } catch (err) {
        this.gererErreur(err);
      } finally {
        this.isLoading = false;
      }
    },

    async chargerRevenusMensuels() {
      const userId = useAuthStore().userId;
      if (!userId) return;

      const { data, error } = await supabase
        .from("facture")
        .select("montant_total, created_at")
        .eq("user_id", userId);

      if (error) return;

      const revenusParMois = {};
      (data || []).forEach((facture) => {
        const date = new Date(facture.created_at);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        if (!revenusParMois[key]) revenusParMois[key] = 0;
        revenusParMois[key] += parseFloat(facture.montant_total) || 0;
      });

      const revenusArray = Object.entries(revenusParMois).map(([mois, total]) => ({
        mois,
        total_revenu: Math.round(total * 100) / 100,
      }));

      this.traiterRevenusParMois(revenusArray);
    },

    mettreAJourStatistiquesGlobales(data) {
      this.totalClientsSemaineDerniere = data.totalClientsSemaineDerniere ?? 0;
      this.totalClients = data.totalClients ?? 0;
      this.totalFacturesSemaineDerniere = data.totalFacturesSemaineDerniere ?? 0;
      this.totalFactures = data.totalFactures ?? 0;
      this.totalRevenuSemaineDerniere = data.totalRevenuSemaineDerniere ?? 0;
      this.totalRevenu = data.totalRevenu ?? 0;
      this.totalReductions = data.totalReductions ?? 0;
      this.totalProspects = data.totalProspects ?? 0;
      this.lastUpdated = data.lastUpdated;
    },

    traiterRevenusParMois(revenusData) {
      const moisLabels = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre",
      ];

      if (!Array.isArray(revenusData)) return;

      const revenusMap = new Map();
      revenusData.forEach((item) => {
        if (!item.mois || typeof item.total_revenu === "undefined") return;
        const [year, month] = item.mois.split("-");
        const moisIndex = parseInt(month, 10) - 1;
        if (moisIndex >= 0 && moisIndex < 12) {
          const label = `${moisLabels[moisIndex]} ${year}`;
          const revenuActuel = revenusMap.get(label) || 0;
          revenusMap.set(label, revenuActuel + (item.total_revenu || 0));
        }
      });

      const sortedEntries = Array.from(revenusMap.entries()).sort((a, b) => {
        const [ma, ya] = a[0].split(" ");
        const [mb, yb] = b[0].split(" ");
        const iA = moisLabels.indexOf(ma);
        const iB = moisLabels.indexOf(mb);
        return parseInt(ya) - parseInt(yb) || iA - iB;
      });

      this.mois = sortedEntries.map(([label]) => label);
      this.revenusParMois = sortedEntries.map(([, revenu]) => revenu);
    },

    gererErreur(error) {
      this.error = error.message || "Erreur inconnue";
    },

    reinitialiser() {
      this.totalClients = 0;
      this.totalClientsSemaineDerniere = 0;
      this.totalFactures = 0;
      this.totalFacturesSemaineDerniere = 0;
      this.totalRevenu = 0;
      this.totalRevenuSemaineDerniere = 0;
      this.totalReductions = 0;
      this.totalProspects = 0;
      this.mois = [];
      this.revenusParMois = [];
      this.error = null;
      this.lastUpdated = null;
    },

    async chargerRevenusJournaliers() {
      const userId = useAuthStore().userId;
      if (!userId) return;

      const { data, error } = await supabase
        .from("facture")
        .select("montant_total, created_at")
        .eq("user_id", userId);

      if (error) {
        this.error = "Erreur chargement revenus journaliers";
        return;
      }

      const revenusParJour = {};
      (data || []).forEach((facture) => {
        const date = new Date(facture.created_at);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        if (!revenusParJour[key]) revenusParJour[key] = 0;
        revenusParJour[key] += parseFloat(facture.montant_total) || 0;
      });

      const revenusArray = Object.entries(revenusParJour).map(([jour, total]) => ({
        jour,
        total_revenu: Math.round(total * 100) / 100,
      }));

      this.jours = revenusArray.map(item => item.jour);
      this.revenusParJours = revenusArray.map(item => item.total_revenu);
    },
  }
});
