<template>
    <div class="bg-blue-200 rounded-lg p-5">
      <h2>Facture pour {{ facture.client.nom }}</h2>
      <p>Email: {{ facture.client.email }}</p>
      <p>Adresse: {{ facture.client.adresse }}</p>
  
      <h3>Produits:</h3>
      <ul>
        <li v-for="(produit, index) in facture.produits" :key="index">
          {{ produit.nom }} - {{ produit.quantite }} x {{ produit.prixUnitaire }} € = {{ produit.total }} €
        </li>
      </ul>
  
      <h3>Total: {{ facture.total }} €</h3>
    </div>
  </template>
  
  <script>
  import Facture from '../models/facture';
  import Client from '../models/client';
  export default {
    props: ['facture'],
  };
  </script>
  
  <style scoped>
  /* Styles pour afficher la facture */
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  h3 {
    font-weight: bold;
  }
  </style>
  