<template>
    <div class="space-y-4 border p-4 rounded-lg shadow">
      <h3 class="text-lg font-semibold">Appliquer une réduction</h3>
  
      <div>
        <label class="block font-medium">Type de réduction :</label>
        <label>
          <input type="radio" value="montant" v-model="type" /> Montant fixe (€)
        </label>
        <label class="ml-4">
          <input type="radio" value="pourcentage" v-model="type" /> Pourcentage (%)
        </label>
      </div>
  
      <div>
        <label class="block font-medium">Portée :</label>
        <label>
          <input type="radio" value="facture" v-model="portee" /> Sur toute la facture
        </label>
        <label class="ml-4">
          <input type="radio" value="produit" v-model="portee" /> Par produit
        </label>
      </div>
  
      <div>
        <label class="block font-medium">Valeur :</label>
        <input
          type="number"
          v-model.number="valeur"
          min="0"
          class="border rounded p-1 w-24"
        />
      </div>
  
      <button
        @click="appliquer"
        class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Appliquer réduction
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        type: 'pourcentage',
        portee: 'facture',
        valeur: 0
      }
    },
    methods: {
      appliquer() {
        const reduction = {
          type: this.type,
          portee: this.portee,
          valeur: this.valeur
        }
        this.$emit('reduction-appliquee', reduction)
      }
    }
  }
  </script>
  