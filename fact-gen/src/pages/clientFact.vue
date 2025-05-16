<template>
    <div class="p-6  max-w-3xl mx-auto bg-white shadow rounded">
      <h1 class="text-2xl font-bold mb-4">👤 Détails du client</h1>
  
      <div v-if="!client">
        <p class="text-gray-600">Aucun client trouvé avec ce nom.</p>
      </div>
  
      <div v-else>
        <p><strong>Nom :</strong> {{ client.nom }}</p>
        <p><strong>Email :</strong> {{ client.email }}</p>
        <p><strong>Adresse :</strong> {{ client.adresse }}</p>
        <p><strong>Nombre de factures :</strong> {{ clientFactures.length }}</p>
        <p><strong>Total TTC cumulé :</strong> {{ formatPrix(totalTTC) }} €</p>
      </div>
    </div>
  </template>
  
  <script>
  import Client from '../models/client.js'; // adapte le chemin si besoin
  
  export default {
    name: 'Client',
    data() {
      return {
        nom: this.$route.params.nom,
        client: null,
        clientFactures: [],
      };
    },
    computed: {
      totalTTC() {
        return this.clientFactures.reduce((sum, f) => sum + (f.totalTTC || f.totalHT), 0);
      },
    },
    methods: {
      formatPrix(val) {
        const num = Number(val);
        return isNaN(num) ? '0.00' : num.toFixed(2);
      },
      chercherClient(nom) {
        const data = JSON.parse(localStorage.getItem('factures')) || [];
        const facturesClient = data.filter(f => f.client?.nom === nom);
        this.clientFactures = facturesClient;
  
        if (facturesClient.length > 0) {
          const { nom, adresse, email } = facturesClient[0].client;
          this.client = new Client(nom, adresse, email);
        }
      },
    },
    mounted() {
      this.chercherClient(this.nom);
    },
  };
  </script>
  