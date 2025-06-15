// src/stores/factures.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFacturesParClient } from '../services/api'
export const useFacturesStore = defineStore('factures', {
  state: () => ({
    factures: ref([]),
    laoding:false,
    error: null,
    revenusParMois: Array(12).fill(0),
  }),
  
  actions: {
   async charger() {
      this.laoding = true
      this.error = null
      try{
        this.factures = await getFacturesParClient()
      }catch (error) {
        this.error = error.message
      }finally {
        this.laoding = false
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
  },
})
