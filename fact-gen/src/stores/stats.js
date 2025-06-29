import { defineStore } from "pinia";
import API from "../api/axios";
import { useAuthStore } from "./auth";

export const useStatsStore = defineStore("stats", {
  state: () => ({
    totalClients: 0,
    totalFactures: 0,
    totalRevenu: 0,
    totalReductions: 0,
    mois: [],
    revenusParMois: [],
    isLoading: false,
    error: null,
    lastUpdated: null,
  }),

  getters: {
    moyenneRevenuParMois: (state) => {
      const total = state.revenusParMois.reduce(
        (sum, revenu) => sum + revenu,
        0
      );
      return state.revenusParMois.length > 0
        ? total / state.revenusParMois.length
        : 0;
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
  },

  actions: {
    async chargerStatistiques(forceRefresh = false) {
      console.log("🚀 Début chargement statistiques, forceRefresh:", forceRefresh);
      
      // Éviter les rechargements inutiles
      if (!forceRefresh && this.lastUpdated) {
        const unMinute = 60 * 1000;
        if (Date.now() - this.lastUpdated < unMinute) {
          console.log("⏭️ Cache encore valide, skip");
          return;
        }
      }

      this.isLoading = true;
      this.error = null;

      try {
        console.log("📡 Envoi des requêtes API...");

        const [statsRes, revenusRes] = await Promise.all([
          API.get("/statistiques"),
          API.get("/statistiques/revenusmois"),
        ]);
   console.log("Stats reçues :", statsRes.data);
    console.log("Revenus reçus :", revenusRes.data);
        console.log("📊 Réponse statistiques:", statsRes.data);
        console.log("💰 Réponse revenus:", revenusRes.data);

        this.mettreAJourStatistiquesGlobales(statsRes.data);
        this.traiterRevenusParMois(revenusRes.data.revenusParMois || []);
        this.lastUpdated = Date.now();
        
        console.log("✅ Statistiques mises à jour avec succès");
        console.log("📈 État final:", {
          totalClients: this.totalClients,
          totalFactures: this.totalFactures,
          totalRevenu: this.totalRevenu,
          totalReductions: this.totalReductions
        });

      } catch (err) {
        console.error("❌ Erreur lors du chargement:", err);
        console.error("📄 Détails erreur:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config
        });
        this.gererErreur(err);
      } finally {
        this.isLoading = false;
        console.log("🏁 Fin chargement statistiques");
      }
    },

    mettreAJourStatistiquesGlobales(data) {
      console.log("🔄 Mise à jour données globales:", data);
      this.totalClients = data.totalClients ?? 0;
      this.totalFactures = data.totalFactures ?? 0;
      this.totalRevenu = data.totalRevenu ?? 0;
      this.totalReductions = data.totalReductions ?? 0;
      this.lastUpdated = data.lastUpdated;
    },

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
      console.error("🚨 Erreur gérée:", errorMessage);
      this.error = errorMessage;
    },

    reinitialiser() {
      console.log("🔄 Réinitialisation du store stats");
      this.totalClients = 0;
      this.totalFactures = 0;
      this.totalRevenu = 0;
      this.totalReductions = 0;
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

      console.log("Revenus journaliers chargés:", this.jours, this.revenusParJours);
    } catch (error) {
      console.error("Erreur chargement revenus journaliers", error);
      this.error = "Erreur chargement revenus journaliers";
    }
  }
  }
});