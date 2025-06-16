// src/stores/clients.js
import { defineStore } from 'pinia'
import { getClients } from '../services/api'

import Client from '../models/client';

export const useClientsStore = defineStore('client', {
  state: () => ({
    clients: Client.chargerTous() || [],
    clientForm: {
      nom: "",
      email: "",
      adresse: "",
      telephone: "",
    },
    search: "",
    page: 1,
    pageSize: 6,
    selectedClient: null,
    selectedIndex: null,
    isFormOpen: false,
    isDetailsOpen: false,
    loading: false,
    error: null,
  }),

  getters: {
    filteredClients: (state) => {
      const searchLower = state.search.toLowerCase();
      return state.clients.filter(client => 
        client.nom.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.adresse.toLowerCase().includes(searchLower)
      );
    },
    
    paginatedClients: (state) => {
      const start = (state.page - 1) * state.pageSize;
      const end = start + state.pageSize;
      return state.filteredClients.slice(start, end);
    },
    
    totalPages: (state) => {
      return Math.ceil(state.filteredClients.length / state.pageSize) || 1;
    },
  },

  actions: {
    addClient() {
      const newClient = new Client(
        this.clientForm.nom,
        this.clientForm.adresse,
        this.clientForm.email,
        this.clientForm.telephone
      );
      
      newClient.sauvegarder();
      this.clients.push(newClient);
      this.resetForm();
    },
    
    deleteClient() {
      if (this.selectedIndex !== null) {
        this.clients.splice(this.selectedIndex, 1);
        localStorage.setItem("clients", JSON.stringify(this.clients));
        this.closeDetails();
      }
    },
    
    selectClient(client, index) {
      this.selectedClient = client;
      this.selectedIndex = index;
      this.isDetailsOpen = true;
    },
    
    resetForm() {
      this.clientForm = { nom: "", email: "", adresse: "", telephone: "" };
      this.isFormOpen = false;
    },
    
    openForm() {
      this.isFormOpen = true;
    },
    
    closeForm() {
      this.isFormOpen = false;
    },
    
    openDetails() {
      this.isDetailsOpen = true;
    },
    
    closeDetails() {
      this.isDetailsOpen = false;
    },
    
    nextPage() {
      if (this.page < this.totalPages) this.page++;
    },
    
    prevPage() {
      if (this.page > 1) this.page--;
    },
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
  },
});

/*
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
*/