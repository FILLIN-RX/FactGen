import { defineStore } from "pinia";
import axiosapi from "../api/axios";

export const useStatsStore = defineStore("statistiques", {
  state: () => ({
    totalClients: 0,
    totalFactures: 0,
    totalRevenu: 0,
    totalReductions: 0,
    mois: [],
    revenusParMois: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchStatistiques() {
      this.isLoading = true;
      try {
        // Statistiques globales
        const { data } = await axiosapi.get("/api/statistiques");
        this.totalClients = data.totalClients;
        this.totalFactures = data.totalFactures;
        this.totalRevenu = data.totalRevenu;
        this.totalReductions = data.totalReductions;

        // Statistiques mensuelles
        const { data: revenusData } = await axiosapi.get("/api/statistiques/revenusmois");

        // Liste fixe des 12 mois (année 2025)
        const moisFixes = [
          "janvier 2025", "février 2025", "mars 2025", "avril 2025",
          "mai 2025", "juin 2025", "juillet 2025", "août 2025",
          "septembre 2025", "octobre 2025", "novembre 2025", "décembre 2025"
        ];

        // Crée un dictionnaire { "juin 2025": montant }
        const moisNomParIndex = [
          'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
          'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];

        const revenusMap = {};
        revenusData.revenusParMois.forEach(item => {
          const date = new Date(item.mois + "-01"); // item.mois = "2025-06"
          const label = `${moisNomParIndex[date.getMonth()]} ${date.getFullYear()}`; // "juin 2025"
          revenusMap[label] = item.total_revenu;
        });

        // Remplissage final
        this.mois = moisFixes;
        this.revenusParMois = moisFixes.map(mois => revenusMap[mois] || 0);

        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
