<template>
  <div class="bg-white shadow-md rounded-xl p-6 space-y-6 w-full mt-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Produits de la Facture</h2>

    <!-- Lignes de produits dynamiques -->
    <div v-for="(produit, index) in produits" :key="index"
         class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative">

      <input v-model="produit.nom" type="text" placeholder="Nom du produit"
             class="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>

      <input v-model.number="produit.prix" type="number" min="0" step="0.01" placeholder="Prix unitaire"
             class="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>

      <input v-model.number="produit.quantite" type="number" min="1" placeholder="Quantité"
             class="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"/>

      <div class="text-right text-lg font-semibold text-gray-800">
        {{ (produit.prix * produit.quantite).toFixed(2) }} €
      </div>

      <!-- Bouton supprimer -->
      <button @click="supprimerLigne(index)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-center shadow hover:bg-red-600">
        ×
      </button>
    </div>

    <!-- Ajout + validation -->
    <div class="flex justify-between items-center pt-4 border-t border-gray-300">
      <button @click="ajouterLigne"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow">
        + Ajouter un produit
      </button>

      <div class="text-xl font-bold text-gray-900">
        Total : {{ totalGeneral.toFixed(2) }} €
      </div>
    </div>

    <div class="flex justify-end">
      <button @click="validerProduits"
              class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
        Valider les produits
      </button>
    </div>
  </div>
</template>

<script>
import Produit from '../models/produit'

export default {
  name: 'ProduitListForm',
  emits: ['produits-valides'],
  data() {
    return {
      produits: []
    }
  },
  computed: {
    totalGeneral() {
      return this.produits.reduce((total, p) => total + (p.prix * p.quantite), 0);
    }
  },
  methods: {
    ajouterLigne() {
      this.produits.push({ nom: '', prix: 0, quantite: 1 });
    },
    supprimerLigne(index) {
      this.produits.splice(index, 1);
    },
    validerProduits() {
      const produitsValides = this.produits
        .filter(p => p.nom && p.prix > 0 && p.quantite > 0)
        .map(p => new Produit(p.nom, p.prix, p.quantite));

      if (produitsValides.length === 0) {
        alert("Ajoutez au moins un produit valide.");
        return;
      }

      this.$emit('produits-valides', produitsValides);
    }
  }
}
</script>
