import { defineStore } from "pinia";
import  API  from "../api/axios";
import { useAuthStore } from "./auth";

export const useFacturesStore = defineStore("factures", {
  state: () => ({
    factures: [],
    selectedFacture: null,
    selectedIndex: null,
    loading: false,
    error: null,
  }),

  getters: {
    hasFactures: (state) => state.factures.length > 0,
    
    factureParId: (state) => (id) => 
      state.factures.find((f) => f.id === id),
    
    totalRevenu: (state) => 
      state.factures.reduce((total, facture) => total + (facture.montant || 0), 0),
    
    revenusParMois: (state) => {
      const revenus = Array(12).fill(0);
      state.factures.forEach((facture) => {
        if (facture.date && facture.montant) {
          const mois = new Date(facture.date).getMonth();
          revenus[mois] += facture.montant;
        }
      });
      return revenus;
    },

    facturesParStatut: (state) => (statut) =>
      state.factures.filter((f) => f.statut === statut),
  },

  actions: {
    async chargerFactures() {
      this.loading = true;
      this.error = null;
      
      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
          throw new Error("Utilisateur non authentifié");
        }

        const factures = await 
    API.lister();
        this.factures = factures || [];
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors du chargement des factures:", error);
      } finally {
        this.loading = false;
      }
    },

    async ajouterFacture(factureData) {
      this.loading = true;
      this.error = null;
      
      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
          throw new Error("Utilisateur non authentifié");
        }

        const nouvelleFacture = await 
    API.creer({
          ...factureData,
          user_id: authStore.userId,
        });
        
        this.factures.push(nouvelleFacture);
        return nouvelleFacture;
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de l'ajout de la facture:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async supprimerFacture(index = null) {
      const idx = index !== null ? index : this.selectedIndex;
      if (idx === null || idx === undefined) return;

      const facture = this.factures[idx];
      if (!facture) return;

      if (!confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
        return;
      }

      this.loading = true;
      this.error = null;
      
      try {
        await 
    API.supprimer(facture.id);
        this.factures.splice(idx, 1);
        this.clearSelection();
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de la suppression de la facture:", error);
      } finally {
        this.loading = false;
      }
    },

    async mettreAJourFacture(id, donnees) {
      this.loading = true;
      this.error = null;
      
      try {
        const factureModifiee = await 
    API.mettreAJour(id, donnees);
        const index = this.factures.findIndex((f) => f.id === id);
        
        if (index !== -1) {
          this.factures[index] = factureModifiee;
        }
        
        return factureModifiee;
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de la mise à jour de la facture:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    selectionnerFacture(facture, index) {
      this.selectedFacture = facture;
      this.selectedIndex = index;
    },

    clearSelection() {
      this.selectedFacture = null;
      this.selectedIndex = null;
    },
  },
});