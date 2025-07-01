<script setup>
import { onMounted, computed } from 'vue'
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
  await auth.initialize();

  if (!auth.isAuthenticated) {
    console.error("Utilisateur non authentifié");
    return;
  }

  await statsStore.chargerStatistiques();
});

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
    description: 'Clients enregistrés',
    trend: '+12%',
    trendDirection: 'up'
  },
  {
    id: 'factures',
    title: 'Factures émises',
    value: statsStore.totalFactures,
    icon: 'document',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-emerald-600',
    lightBg: 'bg-emerald-50',
    description: 'Factures créées',
    trend: '+8%',
    trendDirection: 'up'
  },
  {
    id: 'revenus',
    title: 'Chiffre d\'affaires',
    value: statsStore.totalRevenus || 0,
    icon: 'currency',
    color: 'purple',
    bgGradient: 'from-purple-500 to-purple-600',
    lightBg: 'bg-purple-50',
    description: 'Revenus totaux',
    trend: '+15%',
    trendDirection: 'up',
    format: 'currency'
  },
  {
    id: 'taux',
    title: 'Taux de conversion',
    value: 87.5,
    icon: 'chart',
    color: 'orange',
    bgGradient: 'from-orange-500 to-orange-600',
    lightBg: 'bg-orange-50',
    description: 'Conversion clients',
    trend: '+3%',
    trendDirection: 'up',
    format: 'percentage'
  }
]);

// Format value based on type
const formatValue = (value, format) => {
  if (!value && value !== 0) return '-';
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value).replace('XOF', 'FCFA');
    case 'percentage':
      return `${value}%`;
    default:
      return new Intl.NumberFormat('fr-FR').format(value);
  }
};

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
  <div class="w-full">
    <!-- Header Section -->
    <div class="mb-6 px-4 sm:px-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Statistiques
          </h1>
          <p class="text-sm text-gray-600">
            Vue d'ensemble de votre activité
          </p>
        </div>
        
        <!-- Last Update Badge -->
        <div class="mt-4 sm:mt-0">
          <div class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <svg class="w-3 h-3 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Mis à jour {{ formattedLastUpdate }}
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
      <div 
        v-for="card in statsCards" 
        :key="card.id"
        class="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <!-- Gradient Background -->
        <div :class="`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`"></div>
        
        <!-- Content -->
        <div class="relative p-4 sm:p-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div :class="`p-2.5 rounded-xl ${card.lightBg}`">
              <svg 
                class="w-5 h-5"
                :class="`text-${card.color}-600`"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                v-html="getIcon(card.icon)"
              ></svg>
            </div>
            
            <!-- Trend Badge -->
            <div class="flex items-center space-x-1">
              <svg 
                class="w-3 h-3"
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
          <h3 class="text-sm font-medium text-gray-600 mb-1">
            {{ card.title }}
          </h3>

          <!-- Value -->
          <div class="mb-2">
            <!-- Loading State -->
            <div v-if="statsStore.isLoading" class="flex items-center">
              <div class="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            </div>
            
            <!-- Error State -->
            <div v-else-if="statsStore.error" class="flex items-center text-red-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium">Erreur</span>
            </div>
            
            <!-- Success State -->
            <p v-else class="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
              {{ formatValue(card.value, card.format) }}
            </p>
          </div>

          <!-- Description -->
          <p class="text-xs text-gray-500">
            {{ card.description }}
          </p>

          <!-- Loading Overlay -->
          <div v-if="statsStore.isLoading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-2xl">
            <LoadinApp />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="mt-8 px-4 sm:px-6">
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Refresh Stats -->
          <button 
            @click="statsStore.chargerStatistiques(true)"
            :disabled="statsStore.isLoading"
            class="flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
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

          <!-- Export Data -->
          <button class="flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
            <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Exporter
          </button>

          <!-- View Details -->
          <button class="flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group">
            <svg class="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Détails
          </button>
        </div>
      </div>
    </div>

    <!-- Error Details Modal/Toast -->
    <div v-if="statsStore.error" class="fixed bottom-4 right-4 max-w-sm">
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
            <div class="mt-3 flex space-x-2">
              <button 
                @click="statsStore.chargerStatistiques(true)"
                class="text-xs bg-red-100 hover:bg-red-200 text-red-800 font-medium px-2 py-1 rounded-md transition-colors"
              >
                Réessayer
              </button>
              <button 
                @click="statsStore.error = null"
                class="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Ignorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: fadeInUp 0.3s ease-out;
}

.group:nth-child(1) { animation-delay: 0.1s; }
.group:nth-child(2) { animation-delay: 0.2s; }
.group:nth-child(3) { animation-delay: 0.3s; }
.group:nth-child(4) { animation-delay: 0.4s; }

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    gap: 1rem;
  }
}

/* Hover effects */
.group:hover {
  transform: translateY(-2px);
}

/* Loading state improvements */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Custom scrollbar for mobile */
@media (max-width: 768px) {
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
}
</style>