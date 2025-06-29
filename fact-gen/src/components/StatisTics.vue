<script setup>
import { onMounted } from 'vue'
// vérifie bien le nom exact des stores et fichiers
import { useClientsStore } from '../stores/client'
import { useFacturesStore } from '../stores/Facture'
import { useStatsStore } from '../stores/stats'
import { useAuthStore } from '../stores/auth'
import LoadinApp from './LoadinApp.vue'
const clientsStore = useClientsStore()
const facturesStore = useFacturesStore()
const statsStore = useStatsStore()

onMounted(async () => {
  const auth = useAuthStore();
  await auth.initialize(); // très important

  if (!auth.isAuthenticated) {
    console.error("Utilisateur non authentifié");
    return;
  }

  // Appel des statistiques après authentification
  await statsStore.chargerStatistiques();
});


</script>

<template>
  <p class="text-sm text-gray-500">
  Dernière mise à jour : {{ new Date(statsStore.lastUpdated).toLocaleString() }}
</p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:px-40 gap-4">


    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de clients</p>

      <div v-if="statsStore.isLoading"><LoadinApp/></div>
      <div v-else-if="statsStore.error" class="text-red-600 font-semibold">{{ statsStore.error }}</div>
      <p v-else class="text-3xl font-bold text-blue-600">{{ statsStore.totalClients }}</p>
    </div>

    <div class="bg-white border rounded-xl p-6 shadow text-center">
      <p class="text-gray-500">Nombre de factures</p>

      <div v-if="statsStore.isLoading"><LoadinApp/></div>
      <div v-else-if="statsStore.error" class="text-red-600 font-semibold">{{ statsStore.error }}</div>
      <p v-else class="text-3xl font-bold text-green-600">{{ statsStore.totalFactures }}</p>
    </div>

  </div>
</template>
