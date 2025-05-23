<script setup>
import { onMounted } from 'vue'
import { useStatsStore } from '../stores/stats'

const statsStore = useStatsStore()

onMounted(() => {
  statsStore.chargerDepuisLocalStorage()
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de clients</p>
      <p class="text-3xl font-bold text-blue-600">{{ statsStore.clients }}</p>
    </div>

    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de factures</p>
      <p class="text-3xl font-bold text-green-600">{{ statsStore.factures }}</p>
    </div>
  </div>
</template>
