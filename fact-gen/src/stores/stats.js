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
  },

  actions: {
    async chargerStatistiques(forceRefresh = false) {
      // Éviter les rechargements inutiles
      if (!forceRefresh && this.lastUpdated) {
        const unMinute = 60 * 1000;
        if (Date.now() - this.lastUpdated < unMinute) {
          return;
        }
      }

      this.isLoading = true;
      this.error = null;

      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
          await authStore.initialize();
          if (!authStore.isAuthenticated) {
            throw new Error("Utilisateur non authentifié");
          }
        }

        const [statsRes, revenusRes] = await Promise.all([
          API.get("/statistiques"),
          API.get("/statistiques/revenusmois")
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
      this.totalClients = data.totalClients ?? 0;
      this.totalFactures = data.totalFactures ?? 0;
      this.totalRevenu = data.totalRevenu ?? 0;
      this.totalReductions = data.totalReductions ?? 0;
    },

    traiterRevenusParMois(revenusData) {
      const moisLabels = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
      ];

      if (!Array.isArray(revenusData)) {
        console.warn("Données de revenus invalides:", revenusData);
        return;
      }

      const revenusMap = new Map();
      
      revenusData.forEach(item => {
        if (!item.mois || typeof item.total_revenu === 'undefined') return;
        
        const [year, month] = item.mois.split("-");
        const moisIndex = parseInt(month, 10) - 1;
        
        if (moisIndex >= 0 && moisIndex < 12) {
          const label = `${moisLabels[moisIndex]} ${year}`;
          revenusMap.set(label, item.total_revenu || 0);
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
       console.log("📊 Données de revenus reçues :", revenusData);
      this.mois = sortedEntries.map(([label]) => label);
      this.revenusParMois = sortedEntries.map(([, revenu]) => revenu);
    },

    gererErreur(error) {
      console.error("Erreur lors du chargement des statistiques:", error);
      this.error = error.response?.data?.error || error.message || "Erreur inconnue";
    },

    reinitialiser() {
      this.totalClients = 0;
      this.totalFactures = 0;
      this.totalRevenu = 0;
      this.totalReductions = 0;
      this.mois = [];
      this.revenusParMois = [];
      this.error = null;
      this.lastUpdated = null;
    },
  },
});