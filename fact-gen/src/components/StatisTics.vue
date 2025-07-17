<script setup>
import { onMounted, computed } from 'vue'
import { useClientsStore } from '../stores/client'
import { useFacturesStore } from '../stores/Facture'
import { useStatsStore } from '../stores/stats'
import { useAuthStore } from '../stores/auth'
import LoadinApp from './LoadinApp.vue'
import StatisticS from '../views/StatisticS.vue'
const clientsStore = useClientsStore()
const facturesStore = useFacturesStore()
const statsStore = useStatsStore()
import { formatCurrency } from '../utils/format'
import { useSettingsStore } from '../stores/setting'
const setting = useSettingsStore()
const format = (val) => formatCurrency(val, setting.currency)
onMounted(async () => {
  const auth = useAuthStore();
  await auth.initialize();

  if (!auth.isAuthenticated) {
    console.error("Utilisateur non authentifié");
    return;
  }

  await statsStore.chargerStatistiques();
});
// Fonctions utilitaires
function formatPrice(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}
// Computed pour formater la date de dernière mise à jour
const formattedLastUpdate = computed(() => {
  if (!statsStore.lastUpdated) return 'Non disponible';
  
  const date = new Date(statsStore.lastUpdated);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'À l\'instant';
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Stats cards data
const statsCards = computed(() => [
  {
    id: 'clients',
    title: 'Clients actifs',
    value: statsStore.totalClients,
    icon: 'users',
    color: 'blue',
    bgGradient: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    description: 'Clients enregistrés',
    trend: statsStore.clientsTrend.value,
    trendDirection: statsStore.clientsTrend.direction
  },
  {
    id: 'factures',
    title: 'Factures émises',
    value: statsStore.totalFactures,
    icon: 'document',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-emerald-600',
    lightBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    description: 'Factures créées',
    trend: statsStore.facturesTrend.value,
    trendDirection: statsStore.facturesTrend.direction
  },
  {
    id: 'revenus',
    title: 'Chiffre d\'affaires',
    value: statsStore.totalRevenu || 0,
    icon: 'currency',
    color: 'purple',
    bgGradient: 'from-purple-500 to-purple-600',
    lightBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    description: 'Revenus totaux',
    trend: statsStore.revenuTrend.value,
    trendDirection: statsStore.revenuTrend.direction,
    format: 'currency'
  },
  {
    id: 'taux',
    title: 'Taux de conversion',
    value: statsStore.tauxConversion,
    icon: 'chart',
    color: 'orange',
    bgGradient: 'from-orange-500 to-orange-600',
    lightBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    description: 'Conversion clients',
    trend: '', // facultatif ici (à définir si tu veux comparer au taux précédent)
    trendDirection: 'up', // ou calculer la variation plus tard
    format: 'percentage'
  }
]);

// Format value based on type


// Get icon SVG
const getIcon = (iconName) => {
  const icons = {
    users: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239"></path>`,
    document: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
    currency: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>`,
    chart: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>`
  };
  return icons[iconName] || icons.chart;
};
</script>

<template>
  <div class="w-full  bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-100 px-3 py-4 sm:px-6 sm:py-6">
      <div class="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">
            Statistiques
          </h1>
          <p class="text-xs text-gray-600 sm:text-sm">
            Vue d'ensemble de votre activité
          </p>
        </div>
        
        <!-- Last Update Badge -->
        <div class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 sm:px-3 sm:py-1.5">
          <svg class="w-3 h-3 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="truncate">{{ formattedLastUpdate }}</span>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="p-3 sm:p-6">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6">
        <div 
          v-for="(card, index) in statsCards" 
          :key="card.id"
          class="stats-card group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <!-- Gradient Background -->
          <div :class="`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-3 transition-opacity duration-300`"></div>
          
          <!-- Content -->
          <div class="relative p-3 sm:p-4">
            <!-- Header with Icon and Trend -->
            <div class="flex items-center justify-between mb-3">
              <div :class="`p-1.5 rounded-lg ${card.lightBg} sm:p-2`">
                <svg 
                  class="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  :class="card.iconColor"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  v-html="getIcon(card.icon)"
                ></svg>
              </div>
              
              <!-- Trend Badge (Hidden on very small screens) -->
              <div class="hidden xs:flex items-center space-x-1">
                <svg 
                  class="w-2.5 h-2.5 sm:w-3 sm:h-3"
                  :class="card.trendDirection === 'up' ? 'text-emerald-500' : 'text-red-500'"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    :d="card.trendDirection === 'up' ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'"
                  ></path>
                </svg>
                <span 
                  class="text-xs font-medium"
                  :class="card.trendDirection === 'up' ? 'text-emerald-600' : 'text-red-600'"
                >
                  {{ card.trend }}
                </span>
              </div>
            </div>

            <!-- Title -->
            <h3 class="text-xs font-medium text-gray-600 mb-1.5 sm:text-sm truncate">
              {{ card.title }}
            </h3>

            <!-- Value -->
            <div class="mb-2">
              <!-- Loading State -->
              <div v-if="statsStore.isLoading" class="animate-pulse bg-gray-200 h-5 w-12 rounded sm:h-6 sm:w-16"></div>
              
              <!-- Error State -->
              <div v-else-if="statsStore.error" class="flex items-center text-red-500">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-xs font-medium">Erreur</span>
              </div>
              
              <!-- Success State -->
              <p v-else class="text-lg font-bold text-gray-900 leading-tight group-hover:scale-105 transition-transform duration-200 sm:text-xl">
                <span v-if="card.format==='currency'">{{ format(card.value) }}</span>
                <span v-else-if="card.format === 'percentage'">{{ card.value }} %</span>
                <span v-else>{{ card.value }}</span>
              </p>
            </div>

            <!-- Description (Hidden on small screens) -->
            <p class="hidden sm:block text-xs text-gray-500 truncate">
              {{ card.description }}
            </p>

            <!-- Trend on mobile (visible only on very small screens) -->
            <div class="flex xs:hidden items-center space-x-1 mt-1">
              <svg 
                class="w-2.5 h-2.5"
                :class="card.trendDirection === 'up' ? 'text-emerald-500' : 'text-red-500'"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  :d="card.trendDirection === 'up' ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'"
                ></path>
              </svg>
              <span 
                class="text-xs font-medium"
                :class="card.trendDirection === 'up' ? 'text-emerald-600' : 'text-red-600'"
              >
                {{ card.trend }}
              </span>
            </div>

            <!-- Loading Overlay -->
            <div v-if="statsStore.isLoading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-xl">
              <div class="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="px-3 pb-6 sm:px-6">
      <div class="bg-white rounded-xl p-4 border border-gray-200 sm:p-6">
        <h2 class="text-base font-semibold text-gray-900 mb-4 sm:text-lg">Actions rapides</h2>
        
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <!-- Refresh Stats -->
          <button 
            @click="statsStore.chargerStatistiques(true)"
            :disabled="statsStore.isLoading"
            class="flex items-center justify-center px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group sm:px-4 sm:py-3"
          >
            <svg 
              class="w-4 h-4 mr-2 transition-transform duration-200"
              :class="statsStore.isLoading ? 'animate-spin' : 'group-hover:rotate-180'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Actualiser
          </button>

          <!-- View Details -->
           
          <button  class="flex items-center justify-center px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200 transition-all duration-200 group sm:px-4 sm:py-3">
            <router-link to="/statistics" class="flex items-center w-full h-full justify-center">
            <svg class="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Détails
            </router-link>
          </button>
           
        </div>
      </div>
    </div>

    <!-- Error Toast -->
    <Transition 
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 translate-x-4"
      enter-to-class="opacity-100 translate-y-0 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 translate-x-0"
      leave-to-class="opacity-0 translate-y-4 translate-x-4"
    >
      <div v-if="statsStore.error" class="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-50">
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <h3 class="text-sm font-medium text-red-800">
                Erreur de chargement
              </h3>
              <div class="mt-1 text-sm text-red-700">
                {{ statsStore.error }}
              </div>
              <div class="mt-3 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button 
                  @click="statsStore.chargerStatistiques(true)"
                  class="text-xs bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-800 font-medium px-3 py-1.5 rounded-md transition-colors"
                >
                  Réessayer
                </button>
                <button 
                  @click="statsStore.error = null"
                  class="text-xs text-red-600 hover:text-red-800 font-medium px-3 py-1.5"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-card {
  animation: slideInUp 0.4s ease-out both;
}

/* Responsive grid improvements */
@media (max-width: 640px) {
  .stats-card {
    min-height: 120px;
  }
}

/* Custom breakpoint for very small screens */
@media (max-width: 375px) {
  .xs\:hidden {
    display: none !important;
  }
  
  .xs\:flex {
    display: flex !important;
  }
}

@media (min-width: 375px) {
  .xs\:hidden {
    display: block !important;
  }
  
  .xs\:flex {
    display: none !important;
  }
}

/* Improved hover effects */
.stats-card:hover {
  transform: translateY(-1px);
}

.stats-card:active {
  transform: translateY(0);
}

/* Touch-friendly buttons */
@media (max-width: 640px) {
  button {
    min-height: 44px;
  }
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth transitions */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Improved scrolling on mobile */
@supports (-webkit-overflow-scrolling: touch) {
  .w-full {
    -webkit-overflow-scrolling: touch;
  }
}
</style>