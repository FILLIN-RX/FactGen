// src/stores/stats.js
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    clients: 0,
    factures: 0,
    revenusParMois: [], // exemple : [1200, 1500, 1700]
    mois: ['Janvier', 'Février', 'Mars'],
  }),
  actions: {
    chargerDepuisLocalStorage() {
        const clients = JSON.parse(localStorage.getItem('clients')) || []
        const factures = JSON.parse(localStorage.getItem('factures')) || []
        console.log("Clients dans localStorage :", clients)
        console.log("Factures dans localStorage :", factures)
        this.clients = clients.length
        this.factures = factures.length
      },
  
      sauvegarder() {
        const clientsData = this.clients.map(c => c.toJSON())
        localStorage.setItem('clients', JSON.stringify(clientsData))
      },
      
    supprimerClient(index) {
        this.clients.splice(index, 1)
        this.sauvegarder()
      },
    ajouterClient(client) {
        this.clients.push(client)
        this.sauvegarder()
      },
    ajouterFacture(revenu) {
      this.factures++
      this.revenusParMois[this.revenusParMois.length - 1] += revenu
      this.sauvegarder()
    }
  }
})
