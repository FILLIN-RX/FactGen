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
        backgroundColor: "#60a5fa",
        borderColor: "#3b82f6",
        borderWidth: 1,
        borderRadius: 4,
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
        fill: false,
        backgroundColor: "#34d399",
        borderColor: "#10b981",
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
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
      backgroundColor: "#f87171",
      borderColor: "#ef4444",
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
}));
// 🎨 Options des graphiques améliorées
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "white",
      titleColor: "#262626",
      bodyColor: "#525252",
      borderColor: "#E5E5E5",
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function (context: any) {
          return `${context.parsed.y.toLocaleString()} FCFA`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value: number) {
          return value.toLocaleString() + " FCFA";
        },
        padding: 10,
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};

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
  <div>
    <!-- Activités récentes -->

    <!-- Graphiques -->
    <div class="space-y-6 grid  lg:grid-cols-2 gap-5 lg:px-10">
      <!-- 📊 Graphique Barres : par mois -->
      <div class="bg-white rounded-xl border border-blue-100 shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Montant TTC par mois
        </h2>

        <div v-if="statsStore.isLoading" class="flex items-center justify-center h-[300px]">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-2 text-gray-600">Chargement des données...</span>
        </div>

        <div v-else-if="statsStore.error"
          class="text-center text-red-600 h-[300px] flex flex-col justify-center items-center">
          <p class="font-semibold">❌ Erreur</p>
          <p class="text-sm text-gray-600">{{ statsStore.error }}</p>
          <button @click="statsStore.chargerStatistiques(true)"
            class="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm">
            Réessayer
          </button>
        </div>

        <div v-else-if="!hasData" class="text-center text-gray-500 h-[300px] flex items-center justify-center">
          <div>
            <p>📊 Aucune donnée disponible</p>
            <p class="text-sm">Créez des factures pour voir les statistiques</p>
          </div>
        </div>

        <div v-else style="height: 300px">
          <Bar :key="`bar-${lineChartKey}`" :data="barChartData" :options="chartOptions" />
        </div>
      </div>
      <!-- 📅 Graphique Barres : par jour -->
      <div class="bg-white rounded-xl hover:shadow p-6 border border-blue-100">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Montant TTC par jour
        </h2>

        <div v-if="statsStore.isLoading" class="flex items-center justify-center h-[300px]">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span class="ml-2 text-gray-600">Chargement des données...</span>
        </div>

        <div v-else-if="statsStore.error"
          class="text-center text-red-600 h-[300px] flex flex-col justify-center items-center">
          <p class="font-semibold">❌ Erreur</p>
          <p class="text-sm text-gray-600">{{ statsStore.error }}</p>
          <button @click="statsStore.chargerRevenusJournaliers()"
            class="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm">
            Réessayer
          </button>
        </div>

        <div v-else-if="!hasDayData" class="text-center text-gray-500 h-[300px] flex items-center justify-center">
          <div>
            <p>📆 Aucune donnée disponible</p>
            <p class="text-sm">Aucune activité journalière détectée</p>
          </div>
        </div>

        <div v-else style="height: 300px">
          <Bar :key="`day-bar-${dayChartKey}`" :data="dayBarChartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
