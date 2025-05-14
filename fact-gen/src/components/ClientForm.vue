<template>
    <div class="w-4/5 bg-white p-3 text-center centered rounded-lg shadow mt-5 mx-auto lg:w-1/3">
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
  </template>
  
  <script>
  import Client from '../models/client';
  
  export default {
    data() {
      return {
        client: new Client('', '', '')
      };
    },
    methods: {
      ajouterClient() {
        this.$emit('client-ajoute', this.client);
        this.client = new Client('', '', ''); // Réinitialiser après ajout
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
  