// src/stores/factures.js
import { defineStore } from 'pinia'
import { getFacturesParClient,deleteFactures } from '../services/api'
export const useFacturesStore = defineStore('factures', {
  state: () => ({
    factures: [],
    loading:false,
    error: null,
    revenusParMois: Array(12).fill(0),
    selectedInvoice: null,
    selectedIndex: null,
  }),
  
  actions: {
   async charger() {
      this.loading = true
      this.error = null
      try{
        this.factures = await getFacturesParClient()
        console.log("Factures chargées:", this.factures)
      }catch (error) {
        this.error = error.message
      }finally {
        this.loading = false
      }

    },
    sauvegarder() {
      localStorage.setItem('factures', JSON.stringify(this.factures))
    },
    ajouter(facture) {
      this.factures.push(facture)
      const mois = new Date(facture.date).getMonth()
      this.revenusParMois[mois] += facture.montant
      this.sauvegarder()
    },
    selectInvoice(facture, index) {
      this.selectedInvoice = facture;
      this.selectedIndex = index;
    },

 async deleteInvoice(index) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
    const factureId = this.factures[index].id;
    const res = await deleteFactures(factureId); // Appel API pour supprimer côté backend
    // Si la suppression a réussi côté backend, retire localement :
    this.factures.splice(index, 1);
    this.sauvegarder();
    this.clearSelection();
  }
},

    clearSelection() {
      this.selectedInvoice = null;
      this.selectedIndex = null;
    }
  },

  getters: {
    hasInvoices: (state) => state.factures.length > 0,
  },
})
