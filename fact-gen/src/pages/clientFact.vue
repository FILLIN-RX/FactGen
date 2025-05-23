<template>
  <div class="p-4">
    <input
      v-model="search"
      type="text"
      placeholder="Rechercher un client..."
      class="w-full p-2 mb-4 border rounded"
    />
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Clients de {{ nom }}</h1>
      <button @click="open = true" class="bg-blue-600 text-white px-4 py-2 rounded">Ajouter un client</button>
    </div>

    <!-- Popup formulaire -->
    <div v-if="open" class="mt-4 bg-white p-6 rounded shadow-md">
      <h2 class="text-lg font-semibold mb-2">Nouveau client</h2>
      <form @submit.prevent="ajouterClient" class="space-y-2">
        <input v-model="clientForm.nom" type="text" placeholder="Nom" class="w-full p-2 border rounded" />
        <input v-model="clientForm.email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
        <input v-model="clientForm.adresse" type="text" placeholder="Adresse" class="w-full p-2 border rounded" />
        <input v-model="clientForm.telephone" type="text" placeholder="+33 6 12 34 56 78" class="w-full p-2 border rounded" />
        <div class="flex justify-end space-x-2">
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
          <button @click="open = false" type="button" class="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
        </div>
      </form>
    </div>

    <!-- Liste des clients -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <div v-for="(client, i) in clients" :key="i" class="bg-white rounded-xl shadow-md p-4">
        <h3 class="text-lg font-semibold">{{ client.nom }}</h3>
        <p class="text-gray-800">{{ client.email }}</p>
        <p class="text-gray-800">{{ client.adresse }}</p>
        <p class="text-gray-800">{{ client.telephone }}</p>
        <button @click="supprimerClient(i)" class="mt-2 bg-red-600 text-white px-3 py-1 rounded">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
import Client from '../models/client';

export default {
  name: 'ClientView',
  data() {
    return {
      nom: this.$route.params.nom,
      clients: [],
      clientForm: {
        nom: '',
        email: '',
        adresse: '',
        telephone: ''
      },
      state: false,
      open: false
    };
  },
  created() {
    this.clients = Client.chargerTous(); // Chargement automatique au démarrage
  },
  methods: {
    ajouterClient() {
      this.state = true;

      const nouveauClient = new Client(
        this.clientForm.nom,
        this.clientForm.adresse,
        this.clientForm.email,
        this.clientForm.telephone
      );

       nouveauClient.sauvegarder();      // Enregistre dans localStorage
      this.clients.push(nouveauClient); // Met à jour la liste affichée

      this.clientForm = { nom: '', email: '', adresse: '', telephone: '' };
      this.open = false;
    },
    supprimerClient(index) {
      this.clients.splice(index, 1);
      localStorage.setItem('clients', JSON.stringify(this.clients));
    }
  }
};
</script>
