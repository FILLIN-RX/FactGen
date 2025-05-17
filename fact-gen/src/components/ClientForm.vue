<template>
    <div class=" p-3 text-center rounded-lg mt-5 mx-auto lg:w-1/3">
      <h2>Ajouter un Client</h2>
      <form @submit.prevent="ajouterClient" class="flex justify-center items-center">
        <div>
          <label class="text-green-800 font-bold block" for="nom">Nom:</label>
          <input class="border border-gray-300 shadow rounded-lg" type="text" v-model="client.nom" placeholder="enter the name" id="nom" required />
        </div>
        
        <div>
          <label class="text-green-800 font-bold block" for="adresse">Adresse:</label>
          <input class="border border-gray-300 shadow rounded-lg" type="text" v-model="client.adresse" id="adresse" required />
        </div>
        <div>
          <label class="text-green-800 font-bold block" for="email">Email:</label>
          <input class="border border-gray-300 shadow rounded-lg" type="email" v-model="client.email" id="email" required />
        </div>
        
  
        
  
        <button class="bg-blue-500 p-5 rounded w-1/2 flex justify-center  " type="submit">Ajouter Client</button>
      </form>
    </div>
    <div class="p-5">
      <ul class=" grid grid-cols-3">
        <li>NOM</li>
        <li>EMAIL</li>
        <li>ADDRESS</li>
      </ul>
    </div>
    <div class="p-5">
    <ul class="grid grid-cols-3 gap-2  space-y-5" v-for="(c,i) in clients" :key="i">
      <li class="bg-blue-100 p-3 rounded">{{ c.nom }}</li>
      <li  class="bg-blue-100 p-3 rounded">{{ c.email }}</li>
      <li  class="bg-blue-100 p-3 rounded">{{ c.adresse }}</li>

    </ul>
  </div>
  <div v-for="(client,i) in clients" :key="i" class="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between border-b pb-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Fiche Client</h2>
        <p class="text-sm text-gray-500">ID Client : #CLT-202505</p>
      </div>
      <div class="text-right">
        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
          Actif
        </span>
      </div>
    </div>
  
    <!-- Infos principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 " >
      <div>
        <label class="block text-sm font-medium text-gray-600">Nom complet</label>
        <p class="text-lg font-semibold text-gray-900">{{ client.nom }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600">Email</label>
        <p class="text-gray-800">{{ client.email }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600">Téléphone</label>
        <p class="text-gray-800">+33 6 12 34 56 78</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600">Adresse</label>
        <p class="text-gray-800">{{ client.adresse }}</p>
      </div>
    </div>
  
    <!-- Historique -->
    <div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Historique des factures</h3>
      <ul class="divide-y divide-gray-200">
        <li class="py-3 flex justify-between text-sm">
          <span>Facture #FCT-202401</span>
          <span class="text-green-600 font-medium">Payée</span>
        </li>
        <li class="py-3 flex justify-between text-sm">
          <span>Facture #FCT-202402</span>
          <span class="text-yellow-600 font-medium">En attente</span>
        </li>
      </ul>
    </div>
  
    <!-- Actions -->
    <div class="flex justify-end space-x-3">
      <button class="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200">
        Modifier
      </button>
      <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Supprimer
      </button>
    </div>
  </div>
  
  </template>
  
  <script>
  import Client from '../models/client';
  
  export default {
    data() {
      return {
        client: new Client('', '', ''),
        clients:[{nom:'',email:'', adresse:''}]
        
      };
    },
    methods: {
      ajouterClient() {
        this.$emit('client-ajoute', this.client);
        this.client = new Client('', '', '');
        this.clients.push( this.client) // Réinitialiser après ajout
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour le formulaire */
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input {
    padding: 8px;
  }
  </style>
  