// src/stores/clients.js
import { defineStore } from 'pinia'
import { getClients,deleteClient,creerClient } from '../services/api'
import { useAuthStore } from './auth';
import Client from '../models/client';

export const useClientsStore = defineStore('client', {
  state: () => ({
    clients:  [],
    clientForm: {
      nom: "",
      email: "",
      address: "",
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
    async charger() {
      this.loading = true
      this.error = null
      try {
        const auth= useAuthStore()
        const userId = auth.user?.id;
        if (!userId) {
          throw new Error("Utilisateur non authentifier")
          
        }
        this.clients = await getClients()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async addClient() {
      const auth= useAuthStore()
        const userId = auth.user?.id;
        if (!userId) {
          throw new Error("Utilisateur non authentifier")
          
        }
      try {
        const clientData = {
          nom: this.clientForm.nom,
          address: this.clientForm.address,
          email: this.clientForm.email,
          telephone: this.clientForm.telephone,
        
        };
        
        // Appel API d'abord
        const created = await creerClient(clientData);
        // Ajoute dans le store local seulement si succès
        this.clients.push(created);
        this.sauvegarder();
        this.resetForm();
        alert("Client ajouté avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout du client:", error);
        alert("Erreur lors de l'ajout du client : " + error.message); 
      }
    },
    sauvegarder() {
      localStorage.setItem('clients', JSON.stringify(this.clients))
    },
   async deleteClient(index) {
        const auth= useAuthStore()
        const userId = auth.user?.id;
        if (!userId) {
          throw new Error("Utilisateur non authentifier")
          
        }
      // Utilise l'index passé OU le selectedIndex si index est undefined
      const idx = typeof index === 'number' ? index : this.selectedIndex;
      if (idx === null || idx === undefined) return;

      if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
        const client = this.clients[idx];
        if (!client) return; // Sécurité

        const clientId = client.id;
        await deleteClient(clientId); // Appel API pour supprimer côté backend
        this.clients.splice(idx, 1);
        this.sauvegarder();
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