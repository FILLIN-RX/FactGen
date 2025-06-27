// src/stores/stats.js
import { defineStore } from "pinia";
import API from "../api/axios";

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
      this.error = null;

      try {
        // ✅ Récupération des stats globales
        const [globalRes, moisRes] = await Promise.all([
          API.get("/statistiques"),
          API.get("/statistiques/revenusmois")
        ]);

        const global = globalRes.data;
        const revenusMois = moisRes.data.revenusParMois;

        this.totalClients = global.totalClients ?? 0;
        this.totalFactures = global.totalFactures ?? 0;
        this.totalRevenu = global.totalRevenu ?? 0;
        this.totalReductions = global.totalReductions ?? 0;

        // ✅ Génération des 12 mois de l’année en cours (ou fixe si tu veux)
        const currentYear = new Date().getFullYear();
        const moisLabels = [
          "janvier", "février", "mars", "avril", "mai", "juin",
          "juillet", "août", "septembre", "octobre", "novembre", "décembre"
        ];
        const moisComplets = moisLabels.map((mois, i) => `${mois} ${currentYear}`);

        // ✅ Transforme les données de l’API en dictionnaire
        const revenusMap = {};
        for (const item of revenusMois) {
          const date = new Date(item.mois + "-01");
          const label = `${moisLabels[date.getMonth()]} ${date.getFullYear()}`;
          revenusMap[label] = item.total_revenu ?? 0;
        }

        // ✅ Mise à jour de l’état
        this.mois = moisComplets;
        this.revenusParMois = moisComplets.map(label => revenusMap[label] || 0);

      } catch (err) {
        console.error("Erreur lors du chargement des statistiques:", err);
        this.error = err?.message || "Erreur inconnue";
      } finally {
        this.isLoading = false;
      }
    }
  }
});
