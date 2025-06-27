// src/stores/clients.js
import { defineStore } from "pinia";
import { getClients, deleteClient, creerClient } from "../services/api";
import { useAuthStore } from "./auth";

export const useClientsStore = defineStore("client", {
  state: () => ({
    clients: [],
    clientForm: {
      nom: "",
      email: "",
      adresse: "", // ✔ corrige "address" → "adresse"
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
      return state.clients.filter(
        (client) =>
          client.nom.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower) ||
          client.adresse.toLowerCase().includes(searchLower) // ✔ idem ici
      );
    },

    paginatedClients: (state) => {
      const start = (state.page - 1) * state.pageSize;
      return state.filteredClients.slice(start, start + state.pageSize);
    },

    totalPages: (state) => {
      return Math.ceil(state.filteredClients.length / state.pageSize) || 1;
    },
  },

  actions: {
    async charger() {
      this.loading = true;
      this.error = null;
      try {
        const auth = useAuthStore();
        const userId = auth.user?.id;
        if (!userId) throw new Error("Utilisateur non authentifié");

        const clients = await getClients();
        this.clients = clients;
        this.sauvegarder();
      } catch (error) {
        this.error = error.message;
        console.error("Erreur lors du chargement des clients:", error);
      } finally {
        this.loading = false;
      }
    },

    async addClient() {
      try {
        const auth = useAuthStore();
        if (!auth.isAuthenticated) {
          await auth.initialize();
          if (!auth.isAuthenticated) throw new Error("Veuillez vous reconnecter");
        }

        const clientData = {
          nom: this.clientForm.nom,
          adresse: this.clientForm.adresse,
          email: this.clientForm.email,
          telephone: this.clientForm.telephone,
          user_id: auth.user.id,
        };

        const createdClient = await creerClient(clientData);
        this.clients.push(createdClient);
        this.sauvegarder();
        this.resetForm();

        return createdClient;
      } catch (error) {
        console.error("Erreur dans addClient:", error);
        alert(`Échec de la création : ${error.message}`);
        throw error;
      }
    },

    async deleteClient(index) {
      try {
        const auth = useAuthStore();
        const userId = auth.user?.id;
        if (!userId) throw new Error("Utilisateur non authentifié");

        const idx = typeof index === "number" ? index : this.selectedIndex;
        if (idx === null || idx === undefined) return;

        if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
          const client = this.clients[idx];
          if (!client) return;

          await deleteClient(client.id);
          this.clients.splice(idx, 1);
          this.sauvegarder();
          this.closeDetails();
        }
      } catch (error) {
        this.error = error.message;
        console.error("Erreur suppression client:", error);
      }
    },

    selectClient(client, index) {
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

    sauvegarder() {
      localStorage.setItem("clients", JSON.stringify(this.clients));
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
