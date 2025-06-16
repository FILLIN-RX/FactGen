<script setup>
import { onMounted } from 'vue'
// vérifie bien le nom exact des stores et fichiers
import { useClientsStore } from '../stores/client'
import { useFacturesStore } from '../stores/Facture'
import { useStatsStore } from '../stores/stats'

const clientsStore = useClientsStore()
const facturesStore = useFacturesStore()
const statsStore = useStatsStore()

onMounted(() => {
  statsStore.fetchStatistiques()
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:px-40 gap-4">

    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de clients</p>

      <div v-if="statsStore.isLoading">Chargement des clients...</div>
      <div v-else-if="statsStore.error" class="text-red-600 font-semibold">{{ statsStore.error }}</div>
      <p v-else class="text-3xl font-bold text-blue-600">{{ statsStore.totalClients }}</p>
    </div>

    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de factures</p>

      <div v-if="statsStore.isLoading">Chargement des factures...</div>
      <div v-else-if="statsStore.error" class="text-red-600 font-semibold">{{ statsStore.error }}</div>
      <p v-else class="text-3xl font-bold text-green-600">{{ statsStore.totalFactures }}</p>
    </div>

  </div>
</template>
