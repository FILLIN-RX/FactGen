<template>
  <div class="facture-pdf p-10 text-sm text-gray-900">
    <h1 class="text-xl font-bold mb-2">Facture #{{ facture.id }}</h1>
    <p><strong>Client :</strong> {{ facture.client?.nom }}</p>
    <p><strong>Email :</strong> {{ facture.client?.email }}</p>
    <p><strong>Date :</strong> {{ facture.date }}</p>

    <h2 class="mt-6 font-semibold">Produits :</h2>
    <ul class="mb-4">
      <li v-for="(p, i) in facture.produits" :key="i">
        - {{ p.nom }} : {{ p.quantite }} × {{ p.prix }} € = {{ p.quantite * p.prix }} €
      </li>
    </ul>

    <p class="font-bold text-right">Total TTC : {{ facture.totalTTC }} €</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const facture = ref({})

onMounted(async () => {
  const { data } = await axios.get(`/api/factures/${route.params.id}`)
  facture.value = data
})
</script>

<style>
body {
  background: white;
  font-family: sans-serif;
}
</style>
