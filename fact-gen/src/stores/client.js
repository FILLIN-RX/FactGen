// src/stores/clients.js
import { defineStore } from 'pinia'
import { getClients } from '../services/api'
export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [],
    loading: false,
    error: null,
  }),
  actions: {
    async charger() {
      this.loading = true
      this.error = null
      try {
        this.clients = await getClients()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    sauvegarder() {
      localStorage.setItem('clients', JSON.stringify(this.clients))
    },
    ajouter(client) {
      this.clients.push(client)
      this.sauvegarder()
    },
    supprimer(index) {
      this.clients.splice(index, 1)
      this.sauvegarder()
    },
  },
})
