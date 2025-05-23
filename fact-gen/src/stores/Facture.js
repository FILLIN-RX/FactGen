// src/stores/factures.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFacturesStore = defineStore('factures', {
  state: () => ({
    factures: ref([]),
    revenusParMois: Array(12).fill(0),
  }),
  
  actions: {
    charger() {
      this.factures = JSON.parse(localStorage.getItem('factures')) || []
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
