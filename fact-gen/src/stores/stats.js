// src/stores/stats.js
import { defineStore } from 'pinia'
import { useClientsStore } from './client'
import { useFacturesStore } from './Facture'

export const useStatsStore = defineStore('stats', {
  getters: {
    nombreClients() {
      const clientsStore = useClientsStore()
      return clientsStore.clients.length
    },
    nombreFactures() {
      const facturesStore = useFacturesStore()
      return facturesStore.factures.length
    },
    revenusParMois: () => {
        const facturesStore = useFacturesStore()
        const revenus = Array(12).fill(0)
        facturesStore.factures.forEach(facture => {
          const mois = new Date(facture.date).getMonth()
          revenus[mois] += facture.totalTTC
        })
        return revenus
      },
      mois: () => ['Janv', 'Févr', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc']
    
  },
})
