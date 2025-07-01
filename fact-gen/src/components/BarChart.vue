<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { Bar, Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { useStatsStore } from "../stores/stats";
import { useFacturesStore } from "../stores/Facture";
import RevenueBreakchart from "./RevenueBreakchart.vue";
import { useAuthStore } from "../stores/auth";
import ActiviterRecente from "./ActiviterRecente.vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement
);

const statsStore = useStatsStore();
const facturesStore = useFacturesStore();
const lineChartKey = ref(0);
const dayChartKey = ref(0);
const isDataLoaded = ref(false);

onMounted(async () => {
  console.log("🚀 Initialisation du composant graphiques");

  const auth = useAuthStore();
  await auth.initialize();

  if (!auth.isAuthenticated) {
    console.error("❌ Utilisateur non authentifié");
    return;
  }

  console.log("📊 Chargement des statistiques...");
  try {
    await statsStore.chargerStatistiques();
    await statsStore.chargerRevenusJournaliers();
    isDataLoaded.value = true;
    lineChartKey.value++;
    dayChartKey.value++;

    console.log("✅ Données chargées:");
    console.log("📅 Mois:", statsStore.mois);
    console.log("💰 Revenus:", statsStore.revenusParMois);
  } catch (error) {
    console.error("❌ Erreur lors du chargement:", error);
  }
});

// 👀 Watcher pour détecter les changements de données
watch(
  () => [statsStore.mois, statsStore.revenusParMois],
  ([newMois, newRevenus]) => {
    console.log("🔄 Données mises à jour:", {
      mois: newMois,
      revenus: newRevenus,
    });
    lineChartKey.value++; // Force le re-render des graphiques
  },
  { deep: true }
);

watch(
  () => [statsStore.jours, statsStore.revenusParJours],
  () => dayChartKey.value++,
  { deep: true }
);

// 📊 Computed pour les graphiques avec validation des données
const barChartData = computed(() => {
  const data = {
    labels: statsStore.mois || [],
    datasets: [
      {
        label: "Montant TTC",
        data: statsStore.revenusParMois || [],
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3b82f6",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: "rgba(59, 130, 246, 0.2)",
        hoverBorderColor: "#1d4ed8",
      },
    ],
  };

  console.log("📊 BarChart data:", data);
  return data;
});

const lineChartData = computed(() => {
  const data = {
    labels: statsStore.mois || [],
    datasets: [
      {
        label: "Revenus",
        data: statsStore.revenusParMois || [],
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "#10b981",
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
      },
    ],
  };

  console.log("📈 LineChart data:", data);
  return data;
});

// Graphique jours (nouveau)
const dayBarChartData = computed(() => ({
  labels: statsStore.jours || [],
  datasets: [
    {
      label: "Montant TTC (par jour)",
      data: statsStore.revenusParJours || [],
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "#ef4444",
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
      hoverBackgroundColor: "rgba(239, 68, 68, 0.2)",
      hoverBorderColor: "#dc2626",
    },
  ],
}));

// 🎨 Options des graphiques améliorées pour mobile
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#1f2937",
      bodyColor: "#374151",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      cornerRadius: 12,
      padding: 16,
      boxPadding: 8,
      usePointStyle: true,
      titleFont: {
        size: 14,
        weight: '600',
      },
      bodyFont: {
        size: 13,
      },
      callbacks: {
        title: function(context) {
          return context[0].label;
        },
        label: function (context) {
          return `💰 ${context.parsed.y.toLocaleString()} FCFA`;
        },
      },
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
        drawBorder: false,
      },
      ticks: {
        callback: function (value) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + 'K';
          }
          return value.toLocaleString();
        },
        padding: 12,
        font: {
          size: 11,
        },
        color: '#6b7280',
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#6b7280',
        maxRotation: 45,
        minRotation: 0,
      },
      border: {
        display: false,
      },
    },
  },
}));

// 🔍 Computed pour vérifier si les données sont disponibles
const hasData = computed(() => {
  return statsStore.mois.length > 0 && statsStore.revenusParMois.length > 0;
});

const hasDayData = computed(() => {
  return (
    (statsStore.jours || []).length > 0 &&
    (statsStore.revenusParJours || []).length > 0
  );
});
</script>

<template>
  <div class="w-full">
    <!-- Header Section -->
    <div class="mb-6 px-4 sm:px-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Tableau de bord
      </h1>
      <p class="text-sm text-gray-600">
        Analysez vos performances financières en temps réel
      </p>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6">
      <!-- 📊 Graphique Barres : par mois -->
      <div class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <!-- Header -->
        <div class="p-4 sm:p-6 border-b border-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
                Revenus mensuels
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                Évolution par mois
              </p>
            </div>
            <div class="p-2 bg-blue-50 rounded-xl">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 sm:p-6">
          <!-- Loading State -->
          <div v-if="statsStore.isLoading" class="flex items-center justify-center h-[250px] sm:h-[300px]">
            <div class="text-center">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
              <p class="text-sm text-gray-600">Chargement des données...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="statsStore.error" class="text-center h-[250px] sm:h-[300px] flex flex-col justify-center items-center">
            <div class="p-4 bg-red-50 rounded-2xl mb-4">
              <svg class="w-8 h-8 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p class="font-semibold text-gray-900 mb-2">Erreur de chargement</p>
            <p class="text-sm text-gray-600 mb-4">{{ statsStore.error }}</p>
            <button @click="statsStore.chargerStatistiques(true)"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors">
              Réessayer
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="!hasData" class="text-center h-[250px] sm:h-[300px] flex flex-col justify-center items-center">
            <div class="p-4 bg-gray-50 rounded-2xl mb-4">
              <svg class="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p class="font-semibold text-gray-900 mb-2">Aucune donnée</p>
            <p class="text-sm text-gray-600">Créez des factures pour voir les statistiques</p>
          </div>

          <!-- Chart -->
          <div v-else class="h-[250px] sm:h-[300px]">
            <Bar :key="`bar-${lineChartKey}`" :data="barChartData" :options="chartOptions" />
          </div>
        </div>
      </div>

      <!-- 📅 Graphique Barres : par jour -->
      <div class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <!-- Header -->
        <div class="p-4 sm:p-6 border-b border-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
                Revenus quotidiens
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                Activité par jour
              </p>
            </div>
            <div class="p-2 bg-red-50 rounded-xl">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 sm:p-6">
          <!-- Loading State -->
          <div v-if="statsStore.isLoading" class="flex items-center justify-center h-[250px] sm:h-[300px]">
            <div class="text-center">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-red-200 border-t-red-600 mx-auto mb-4"></div>
              <p class="text-sm text-gray-600">Chargement des données...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="statsStore.error" class="text-center h-[250px] sm:h-[300px] flex flex-col justify-center items-center">
            <div class="p-4 bg-red-50 rounded-2xl mb-4">
              <svg class="w-8 h-8 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p class="font-semibold text-gray-900 mb-2">Erreur de chargement</p>
            <p class="text-sm text-gray-600 mb-4">{{ statsStore.error }}</p>
            <button @click="statsStore.chargerRevenusJournaliers()"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors">
              Réessayer
            </button>
          </div>

          <!-- Empty State -->
          <div v-else-if="!hasDayData" class="text-center h-[250px] sm:h-[300px] flex flex-col justify-center items-center">
            <div class="p-4 bg-gray-50 rounded-2xl mb-4">
              <svg class="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p class="font-semibold text-gray-900 mb-2">Aucune activité</p>
            <p class="text-sm text-gray-600">Aucune activité journalière détectée</p>
          </div>

          <!-- Chart -->
          <div v-else class="h-[250px] sm:h-[300px]">
            <Bar :key="`day-bar-${dayChartKey}`" :data="dayBarChartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover .chart-container {
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .grid {
    padding: 0 1rem;
  }
}
</style>