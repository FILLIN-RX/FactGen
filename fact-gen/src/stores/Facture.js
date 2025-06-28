import { defineStore } from "pinia";
import  API  from "../api/axios";
import Facture from "../models/facture";
import { useAuthStore } from "./auth";
import { creerFacture, deleteFactures,getFacturesParClient } from "../services/api";

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

        const factures = await  getFacturesParClient() 

        this.factures = factures || [];
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors du chargement des factures:", error);
      } finally {
        this.loading = false;
      }
    },

   async creerFactureComplete({
      client,
      societer,
      produits,
      reduction,
      suplement,
      date_emission,
      date_echeance,
    }) {
      this.loading = true;
      this.error = null;

      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
          throw new Error("Utilisateur non authentifié");
        }

        // ➕ Création de la facture temporaire (calcul total etc.)
        const facture = new Facture(
          societer,
          client,
          produits,
          reduction,
          suplement,
          null,
          date_emission,
          date_echeance
        );

        facture.validate();

        // 🔁 Upsert client
        const clientData = {
          nom: client.nom,
          email: client.email,
          address: client.address,
        };

        if (!clientData.nom || !clientData.email || !clientData.address) {
          throw new Error("Le client doit avoir un nom, un email et une adresse valide.");
        }

        const clientUpserted = await upsertClient(clientData);

        // 🧾 Préparation des données à envoyer
        const factureData = {
          client_id: clientUpserted.id,
          client_data: client,
          societer,
          produits,
          reduction,
          suplement,
          montant_total: facture.totalTTC,
          created_at: new Date().toISOString(),
          date_emission,
          date_echeance,
          user_id: authStore.userId,
        };

        const nouvelleFacture = await creerFacture(factureData);
        this.factures.push(nouvelleFacture);

        return nouvelleFacture;
      } catch (error) {
        this.error = error.message;
        console.error("❌ Erreur création facture :", error);
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
        await deleteFactures(facture.id);
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
  getters: {
  hasInvoices(state) {
    return state.factures && state.factures.length > 0;
  }
}

});