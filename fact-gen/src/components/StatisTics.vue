<script setup>
import { computed, ref,onMounted } from 'vue'
import { useStatsStore } from '../stores/stats'
import { useAuthStore } from '../stores/auth'
import { formatCurrency } from '../utils/format'
import { useSettingsStore } from '../stores/setting'

const statsStore = useStatsStore()
const authStore = useAuthStore()
const settingStore = useSettingsStore()

const format = (val) => formatCurrency(val, settingStore.currency)
const isLoading = ref(false)

onMounted(async () => {
  await authStore.initialize()
  if (authStore.isAuthenticated) {
    await loadStats()
  }
})

async function loadStats() {
  isLoading.value = true
  await statsStore.chargerStatistiques()
  isLoading.value = false
}

const statsCards = [
  { 
    id: 'clients', 
    title: 'Clients', 
    value: () => statsStore.totalClients,
    icon: '👥',
    color: 'text-blue-500 bg-blue-50'
  },
  { 
    id: 'factures', 
    title: 'Factures', 
    value: () => statsStore.totalFactures,
    icon: '📄',
    color: 'text-emerald-500 bg-emerald-50'
  },
  { 
    id: 'revenus', 
    title: 'CA', 
    value: () => format(statsStore.totalRevenu || 0),
    icon: '💰',
    color: 'text-purple-500 bg-purple-50'
  },
  { 
    id: 'moyenne', 
    title: 'Moyenne', 
    value: () => format(statsStore.totalRevenu / Math.max(1, statsStore.totalFactures)),
    icon: '📊',
    color: 'text-amber-500 bg-amber-50'
  }
]
</script>

<template>
  <div class="p-4 space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-xl font-bold">Statistiques</h1>
        <p class="text-sm text-gray-500">Vue d'ensemble</p>
      </div>
      <button 
        @click="loadStats" 
        class="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        :disabled="isLoading"
      >
        <span v-if="isLoading">🔄</span>
        <span v-else>↻</span>
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-3">
      <div 
        v-for="card in statsCards" 
        :key="card.id"
        class="p-4 bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div class="flex items-center justify-between">
          <div :class="`p-2 rounded-lg ${card.color}`">
            <span class="text-xl">{{ card.icon }}</span>
          </div>
        </div>
        <h3 class="mt-2 text-sm text-gray-500">{{ card.title }}</h3>
        <p class="mt-1 text-lg font-bold">
          {{ isLoading ? '...' : card.value() }}
        </p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="space-y-3">
      <router-link 
        to="/statistics" 
        class="block p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-center font-medium"
      >
        Voir détails →
      </router-link>
    </div>

    <!-- Error Message -->
    <div 
      v-if="statsStore.error"
      class="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
    >
      {{ statsStore.error }}
      <button @click="loadStats" class="ml-2 font-medium">Réessayer</button>
    </div>
  </div>
</template>

<style scoped>
/* Mobile-first responsive design */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>