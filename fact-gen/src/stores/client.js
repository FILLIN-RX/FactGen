// src/stores/clients.js
import { defineStore } from 'pinia'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [],
  }),
  actions: {
    charger() {
      this.clients = JSON.parse(localStorage.getItem('clients')) || []
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
