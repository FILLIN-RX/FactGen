import { defineStore } from "pinia";
import API from "@/shared/services/axios";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";

export const useStatsStore = defineStore("stats", {
  state: () => ({
    totalClients: 0,
    totalClientsSemaineDerniere: 0, // ← historique pour tendance
    totalFactures: 0,
    totalFacturesSemaineDerniere: 0,
    totalRevenu: 0,
    totalRevenuSemaineDerniere: 0,
    totalReductions: 0,

    totalProspects: 0, // ← nécessaire pour taux de conversion

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
      return {
        mois: state.mois[index],
        revenu: maxRevenu,
      };
    },

    // ✅ Nouveaux getters pour les tendances
    clientsTrend: (state) => {
      const diff = state.totalClients - state.totalClientsSemaineDerniere;
      const pourcent = (diff / (state.totalClientsSemaineDerniere || 1)) * 100;
      return {
        value: `${pourcent.toFixed(1)}%`,
        direction: pourcent >= 0 ? "up" : "down"
      };
    },

    facturesTrend: (state) => {
      const diff = state.totalFactures - state.totalFacturesSemaineDerniere;
      const pourcent = (diff / (state.totalFacturesSemaineDerniere || 1)) * 100;
      return {
        value: `${pourcent.toFixed(1)}%`,
        direction: pourcent >= 0 ? "up" : "down"
      };
    },

    revenuTrend: (state) => {
      const diff = state.totalRevenu - state.totalRevenuSemaineDerniere;
      const pourcent = (diff / (state.totalRevenuSemaineDerniere || 1)) * 100;
      return {
        value: `${pourcent.toFixed(1)}%`,
        direction: pourcent >= 0 ? "up" : "down"
      };
    },
    totalRevenuConverti: (state) => {
      const currencyStore = useCurrencyStore();
      return currencyStore.convert(state.totalRevenu).toFixed(2);
    },

    revenusParMoisConvertis: (state) => {
      const currencyStore = useCurrencyStore();
      return state.revenusParMois.map((revenu) =>
        currencyStore.convert(revenu)
      );
    },

    revenusParJoursConvertis: (state) => {
      const currencyStore = useCurrencyStore();
      return state.revenusParJours.map((revenu) =>
        currencyStore.convert(revenu)
      );
    },

    // ✅ Taux de conversion
    tauxConversion: (state) => {
      if (!state.totalProspects) return 0;
      return ((state.totalClients / state.totalProspects) * 100).toFixed(1);
    },
  },

  actions: {
    async chargerStatistiques(forceRefresh = false) {
      console.log("🚀 Début chargement statistiques, forceRefresh:", forceRefresh);
      if (!forceRefresh && this.lastUpdated) {
        const unMinute = 60 * 1000;
        if (Date.now() - this.lastUpdated < unMinute) return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const [statsRes, revenusRes] = await Promise.all([
          API.get("/statistiques"),
          API.get("/statistiques/revenusmois"),
        ]);

        this.mettreAJourStatistiquesGlobales(statsRes.data);
        this.traiterRevenusParMois(revenusRes.data.revenusParMois || []);
        this.lastUpdated = Date.now();

      } catch (err) {
        this.gererErreur(err);
      } finally {
        this.isLoading = false;
      }
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

    // (inchangé)
     traiterRevenusParMois(revenusData) {
      console.log("📅 Traitement revenus par mois:", revenusData);
      
      const moisLabels = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre",
      ];

      if (!Array.isArray(revenusData)) {
        console.warn("⚠️ Données de revenus invalides:", revenusData);
        return;
      }

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

      // Trier par ordre chronologique
      const sortedEntries = Array.from(revenusMap.entries()).sort((a, b) => {
        const [ma, ya] = a[0].split(" ");
        const [mb, yb] = b[0].split(" ");
        const iA = moisLabels.indexOf(ma);
        const iB = moisLabels.indexOf(mb);
        return parseInt(ya) - parseInt(yb) || iA - iB;
      });

      this.mois = sortedEntries.map(([label]) => label);
      this.revenusParMois = sortedEntries.map(([, revenu]) => revenu);
      
      console.log("📈 Revenus traités:", {
        mois: this.mois,
        revenues: this.revenusParMois
      });
    },

    gererErreur(error) {
      const errorMessage = error.response?.data?.error || error.message || "Erreur inconnue";
      this.error = errorMessage;
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
      try {
        const response = await API.get("/statistiques/revenusjours");
        const data = response.data.revenusParJour || [];
        this.jours = data.map(item => item.jour);
        this.revenusParJours = data.map(item => item.total_revenu);
      } catch (error) {
        this.error = "Erreur chargement revenus journaliers";
      }
    },
  }
});
