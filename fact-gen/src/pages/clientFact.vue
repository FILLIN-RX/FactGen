<template>
    <div class="p-6  max-w-3xl mx-auto bg-white shadow rounded">
      <button @click="ajouterClient" class="btn outline-2 outline-offset-2 outline-green-200 bg-green-400 rounded-xl p-3 hover:bg-green-200">Ajouter un client</button>
      <div v-if="state">
      <h2  class="font-bold text-lg mb-2">client</h2>
      

    </div>
      <h1 class="text-2xl font-bold mb-4">👤 Détails du client</h1>
  
      <div>
         <p v-if="!state" class="text-gray-600">Aucun client trouvé avec ce nom.</p>
      </div>
  
      <div >
<!-- Popup affiché s’il est ouvert -->
<div v-if="open" class="fixed inset-0 bg-black/10  bg-opacity-20 backdrop-blur-sm  z-50 flex items-center justify-center">
  <div class="bg-white p-6 rounded-xl max-w-4xl w-full relative">
    
    <!-- Bouton de fermeture -->
    <button @click="open = false" class="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">×</button>

    <!-- Formulaire pour le dernier client ajouté -->
    <div v-if="clients.length">
      <div class="flex items-center justify-between border-b pb-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Fiche Client</h2>
          <p class="text-sm text-gray-500">ID Client : #CLT-202505</p>
        </div>
        <div class="text-right">
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Actif</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Nom complet</label>
          <input v-model="clients[clients.length - 1].nom" type="text" class="w-full text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Email</label>
          <input v-model="clients[clients.length - 1].email" type="email" class="w-full text-gray-800 border border-gray-300 rounded px-2 py-1" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Téléphone</label>
          <input type="text" placeholder="+33 6 12 34 56 78" class="w-full text-gray-800 border border-gray-300 rounded px-2 py-1" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Adresse</label>
          <input v-model="clients[clients.length - 1].adresse" type="text" class="w-full text-gray-800 border border-gray-300 rounded px-2 py-1" />
        </div>
      </div>
    </div>
  </div>
</div>

  
      </div>
    </div>
  </template>
  
  <script>
  import Client from '../models/client.js';
  import ClientForm from '../components/ClientForm.vue';
  
  export default {
    name: 'Client',
    components:{
        ClientForm,
    },
    data() {
      return {
        nom: this.$route.params.nom,
        clienttemplate: { nom: '', email: '', adresse: '' },
        clients: [],
        state:false,
        open:false
      };
    },
    computed: {
      
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
    
    mounted() {
      this.chercherClient(this.nom);
    },
    ajouterClient(){
      this.state = true
      this.open = true
      this.clients.push({ nom: '', email: '', adresse: '' })
    }
  },
  };
  </script>
  