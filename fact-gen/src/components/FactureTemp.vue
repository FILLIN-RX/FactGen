<template>
    <div class="container bg-blue lg:w-1/2 w-full m-1">
      <div class="px-4 flex justify-between bg-blue-900 p-5">
        <div class="p5">FactGen</div>
        <div>
          <button class="p-2 mx-2 bg-green-200 rounded-lg">Aperçu</button>
          <button class="p-2 bg-red-300 rounded-lg">Télécharger le PDF</button>
        </div>
      </div>
  
      <div class="container">
        <div class="space-y-4">Client</div>
        <div></div>
      </div>
  
      <ClientForm @client-ajoute="ajouterClient" />
    </div>
  </template>
  
  <script>
  import ClientForm from './ClientForm.vue'
  import Client from '../models/client'
  import Produit from '../models/produit'
  import FactureModel from '../models/facture'
  
  export default {
    components: {
      ClientForm,
    },
    data() {
      return {
        facture: new FactureModel(new Client('', '', '')),
      };
    },
    methods: {
      ajouterClient(client) {
        this.facture.client = client;
        console.log("Client ajouté :", client);
      },
      ajouterProduit(produit) {
        this.facture.ajouterProduit(produit);
      }
    }
  }
  </script>
  