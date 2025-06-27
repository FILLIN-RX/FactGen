<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
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

onMounted(async() => {
  const auth = useAuthStore();
  await auth.initialize();

  if (!auth.isAuthenticated) {
    console.error("Utilisateur non authentifié");
    return;
  }
  statsStore.fetchStatistiques().then(() => {
    lineChartKey.value++;
    console.log("Mois:", statsStore.mois);
    console.log("Revenus:", statsStore.revenusParMois);
  });
});

// Données dynamiques depuis Pinia
const barChartData = computed(() => ({
  labels: statsStore.mois,
  datasets: [
    {
      label: "Montant TTC",
      data: statsStore.revenusParMois,
      backgroundColor: "#60a5fa",
    },
  ],
}));

const lineChartData = computed(() => ({
  labels: statsStore.mois,
  datasets: [
    {
      label: "Revenus",
      data: statsStore.revenusParMois,
      fill: false,
      backgroundColor: "#34d399",
      tension: 0.4,
    },
  ],
}));

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     x: {
//       ticks: { color: '#64748b' },
//       grid: { color: 'rgba(0,0,0,0.05)' }
//     },
//     y: {
//       ticks: { color: '#64748b' },
//       grid: { color: 'rgba(0,0,0,0.05)' }
//     }
//   },
//   plugins: {
//     legend: { labels: { color: '#64748b' } }
//   }
// }

// Chart options
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
          return `${context.parsed.y}$`;
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
          return value + "$";
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
</script>

<template>
  <div class="space-y-6 grid lg:grid-cols-2 gap-5 lg:px-10">
    <ActiviterRecente />
    <div class="bg-white rounded-xl hover:shadow p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">
        Montant TTC par mois
      </h2>
      <div style="height: 300px">
        <Bar :data="barChartData" :options="chartOptions" />
      </div>
    </div>

    <div class="bg-white rounded-xl hover:shadow p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Revenus mensuels</h2>
      <div style="height: 300px">
        <Line :data="lineChartData" :options="chartOptions" />
      </div>
    </div>
    <RevenueBreakchart />
  </div>
  <div class="lg:px-10"></div>
</template>
