<template>
    <div>
      <h2>Ajouter un Produit</h2>
      <form @submit.prevent="ajouterProduit">
        <label for="nomProduit">Nom:</label>
        <input type="text" v-model="produit.nom" id="nomProduit" required />
  
        <label for="quantite">Quantité:</label>
        <input type="number" v-model="produit.quantite" id="quantite" min="1" required />
  
        <label for="prixUnitaire">Prix Unitaire:</label>
        <input type="number" v-model="produit.prixUnitaire" id="prixUnitaire" min="0" step="0.01" required />
  
        <button type="submit">Ajouter Produit</button>
      </form>
    </div>
  </template>
  
  <script>
  import Produit from '../models/produit';
  
  export default {
    data() {
      return {
        produit: new Produit('', 1, 0)
      };
    },
    methods: {
      ajouterProduit() {
        this.$emit('produit-ajoute', this.produit);
        this.produit = new Produit('', 1, 0); // Réinitialiser après ajout
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
  