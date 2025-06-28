import { defineStore } from "pinia";
import API  from "../api/axios";
import { useAuthStore } from "./auth";
import { getClients,creerClient,deleteClient } from "../services/api";
export const useClientsStore = defineStore("clients", {
  state: () => ({
    clients: [],
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
      if (!state.search) return state.clients;
      
      const searchLower = state.search.toLowerCase();
      return state.clients.filter((client) =>
        client.nom?.toLowerCase().includes(searchLower) ||
        client.email?.toLowerCase().includes(searchLower) ||
        client.adresse?.toLowerCase().includes(searchLower) ||
        client.telephone?.toLowerCase().includes(searchLower)
      );
    },

    paginatedClients: (state) => {
      const start = (state.page - 1) * state.pageSize;
      return state.filteredClients.slice(start, start + state.pageSize);
    },

    totalPages: (state) => {
      return Math.ceil(state.filteredClients.length / state.pageSize) || 1;
    },

    hasClients: (state) => state.clients.length > 0,
  },

  actions: {
    async chargerClients() {
      this.loading = true;
      this.error = null;
      
      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
          throw new Error("Utilisateur non authentifié");
        }

        const clients = await getClients()
        this.clients = clients || [];
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors du chargement des clients:", error);
      } finally {
        this.loading = false;
      }
    },

    async ajouterClient() {
      this.loading = true;
      this.error = null;
      
      try {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
          throw new Error("Utilisateur non authentifié");
        }

        const clientData = {
          ...this.clientForm,
          user_id: authStore.userId,
        };

        const nouveauClient = await creerClient(clientData);
        this.clients.push(nouveauClient);
        this.resetForm();
        
        return nouveauClient;
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de l'ajout du client:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async supprimerClient(index = null) {
      const idx = index !== null ? index : this.selectedIndex;
      if (idx === null || idx === undefined) return;

      const client = this.clients[idx];
      if (!client) return;

      if (!confirm(`Êtes-vous sûr de vouloir supprimer le client "${client.nom}" ?`)) {
        return;
      }

      this.loading = true;
      this.error = null;
      
      try {
        await deleteClient(client.id);
        this.clients.splice(idx, 1);
        this.fermerDetails();
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors de la suppression du client:", error);
      } finally {
        this.loading = false;
      }
    },

    // Actions UI
    selectionnerClient(client, index) {
      this.selectedClient = client;
      this.selectedIndex = index;
      this.isDetailsOpen = true;
    },

    resetForm() {
      this.clientForm = {
        nom: "",
        email: "",
        adresse: "",
        telephone: "",
      };
      this.isFormOpen = false;
    },

    ouvrirFormulaire() {
      this.isFormOpen = true;
    },

    fermerFormulaire() {
      this.isFormOpen = false;
      this.resetForm();
    },

    ouvrirDetails() {
      this.isDetailsOpen = true;
    },

    fermerDetails() {
      this.isDetailsOpen = false;
      this.selectedClient = null;
      this.selectedIndex = null;
    },

    // Pagination
    pageSuivante() {
      if (this.page < this.totalPages) this.page++;
    },

    pagePrecedente() {
      if (this.page > 1) this.page--;
    },

    allerALaPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.page = page;
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
