<script setup>
import { onMounted } from 'vue'
import { useClientsStore } from '../stores/client'
import { useFacturesStore } from '../stores/Facture'
import { useStatsStore } from '../stores/stats'

const clientsStore = useClientsStore()
const facturesStore = useFacturesStore()
const statsStore = useStatsStore()

onMounted(() => {
  clientsStore.charger()
  facturesStore.charger()
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:px-40 gap-4">
   
    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de clients</p>
       <div v-if="clientsStore.loading">Chargement des clients...</div>
       <div v-if="clientsStore.error">{{ clientsStore.error }}</div>
      <p class="text-3xl font-bold text-blue-600">{{ statsStore.nombreClients }}</p>
    </div>

    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de factures</p>
      <div v-if="facturesStore.loading">Chargement des factures...</div>
      <div v-if="facturesStore.error">{{ facturesStore.error }}</div>
      <p class="text-3xl font-bold text-green-600">{{ statsStore.nombreFactures }}</p>
    </div>
  </div>
</template>
