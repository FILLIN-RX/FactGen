// src/stores/stats.js
import { defineStore } from "pinia";
import API from "../api/axios";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "./auth";

// move router outside the store, to be passed in
let routerInstance = null;
export function injectRouter(router) {
  routerInstance = router;
}

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
        const authStore = useAuthStore();
        await authStore.initialize();

        // Ensure session is valid or refreshed
        let { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (!session || sessionError) {
          const { data: refreshedData, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError || !refreshedData.session) {
            throw new Error(refreshError?.message || "Session utilisateur invalide");
          }
          session = refreshedData.session;
        }

        // Use API without manually injecting headers (interceptor will handle it)
        const [statsRes, revenusRes] = await Promise.all([
          API.get("/statistiques"),
          API.get("/statistiques/revenusmois")
        ]);

        if (!statsRes.data || !revenusRes.data) {
          throw new Error("Données manquantes dans la réponse");
        }

        this.updateGlobalStats(statsRes.data);
        this.processMonthlyRevenue(revenusRes.data.revenusParMois);

      } catch (err) {
        this.handleError(err);
      } finally {
        this.isLoading = false;
      }
    },

    updateGlobalStats(data) {
      this.totalClients = data.totalClients ?? 0;
      this.totalFactures = data.totalFactures ?? 0;
      this.totalRevenu = data.totalRevenu ?? 0;
      this.totalReductions = data.totalReductions ?? 0;
    },

    processMonthlyRevenue(revenusData) {
      const moisLabels = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
      ];

      const revenusMap = {};
      const moisSet = new Set();

      revenusData.forEach(item => {
        const [year, month] = item.mois.split("-");
        const moisIndex = parseInt(month, 10) - 1;
        const label = `${moisLabels[moisIndex]} ${year}`;
        revenusMap[label] = item.total_revenu ?? 0;
        moisSet.add(label);
      });

      const sortedMois = Array.from(moisSet).sort((a, b) => {
        const [ma, ya] = a.split(" ");
        const [mb, yb] = b.split(" ");
        const iA = moisLabels.indexOf(ma), iB = moisLabels.indexOf(mb);
        return ya - yb || iA - iB;
      });

      this.mois = sortedMois;
      this.revenusParMois = sortedMois.map(label => revenusMap[label] || 0);
    },

    handleError(error) {
      console.error("Erreur stats:", error);
      this.error = error.response?.data?.error || error.message;

      if (error.response?.status === 401 && routerInstance) {
        routerInstance.push("/login");
      }
    }
  }
});
