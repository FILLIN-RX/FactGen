// src/stores/factures.js
import { defineStore } from "pinia";
import { getFacturesParClient, deleteFactures } from "../services/api";
import { useAuthStore } from "./auth";
export const useFacturesStore = defineStore("factures", {
  state: () => ({
    factures: [],
    loading: false,
    error: null,
    revenusParMois: Array(12).fill(0),
    selectedInvoice: null,
    selectedIndex: null,
  }),

  actions: {
    async charger() {
      this.loading = true;
      this.error = null;
      try {
        const auth = useAuthStore();
        const userId = auth.user?.id;
        if (!userId) {
          throw new Error("Utilisateur non authentifier");
        }
        this.factures = await getFacturesParClient();
        this.factures = factures;
        // Recalcule les revenus par mois
        this.revenusParMois = Array(12).fill(0);
        for (const f of factures) {
          const mois = new Date(f.date).getMonth();
          this.revenusParMois[mois] += f.montant;
        }
        this.sauvegarder();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    sauvegarder() {
      localStorage.setItem("factures", JSON.stringify(this.factures));
    },
    ajouter(facture) {
      this.factures.push(facture);
      const mois = new Date(facture.date).getMonth();
      this.revenusParMois[mois] += facture.montant;
      this.sauvegarder();
    },
    selectInvoice(facture, index) {
      this.selectedInvoice = facture;
      this.selectedIndex = index;
    },

    async deleteInvoice(index) {
      try{
      const auth = useAuthStore();
      const userId = auth.user?.id;
      if (!userId) {
        throw new Error("Utilisateur non authentifier");
      }
      if (confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
        const factureId = this.factures[index].id;
         await deleteFactures(factureId)// Appel API pour supprimer côté backend
          // Mise à jour des revenus par mois
         // const mois = new Date(this.factures[index].date).getMonth()
         // this.revenusParMois[mois] -= this.factures[index].montant

        // Si la suppression a réussi côté backend, retire localement :
        this.factures.splice(index, 1);
        this.sauvegarder();
        this.clearSelection();
      }
    }catch(error){
      this.error = error.message
      console.error("Erreur suppression facture:", error)
    }
    },

    clearSelection() {
      this.selectedInvoice = null;
      this.selectedIndex = null;
    },
  },

 getters: {
    hasInvoices: (state) => state.factures.length > 0,
    getFactureParId: (state) => (id) =>
      state.factures.find((f) => f.id === id),
  }
});
