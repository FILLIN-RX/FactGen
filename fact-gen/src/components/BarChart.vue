<script setup>
import { onMounted, computed, ref } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  LineElement, PointElement, ArcElement,
} from 'chart.js'
import { useStatsStore } from '../stores/stats'
import { useFacturesStore } from '../stores/Facture'
import RevenueBreakchart from './RevenueBreakchart.vue'
import ActiviterRecente from './ActiviterRecente.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement)

const statsStore = useStatsStore()
const facturesStore = useFacturesStore()
const lineChartKey = ref(0)

onMounted(() => {
  facturesStore.charger()
  lineChartKey.value++ // Forcer le rechargement du graphique
})

// Données dynamiques depuis Pinia
const barChartData = computed(() => ({
  labels: statsStore.mois,
  datasets: [{
    label: 'Montant TTC',
    data: statsStore.revenusParMois,
    backgroundColor: '#60a5fa'
  }]
}))

const lineChartData = computed(() => ({
  labels: statsStore.mois,
  datasets: [{
    label: 'Revenus',
    data: statsStore.revenusParMois,
    fill: false,
    backgroundColor: '#34d399',
    tension: 0.4
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: '#64748b' },
      grid: { color: 'rgba(0,0,0,0.05)' }
    },
    y: {
      ticks: { color: '#64748b' },
      grid: { color: 'rgba(0,0,0,0.05)' }
    }
  },
  plugins: {
    legend: { labels: { color: '#64748b' } }
  }
}
</script>

<template>
  <div class="space-y-6  grid lg:grid-cols-2 gap-5 lg:px-10">
    <ActiviterRecente />
    <div class="bg-white rounded-xl hover:shadow p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Montant TTC par mois</h2>
      <div style="height: 300px;">
        <Bar :data="barChartData" :options="chartOptions" />
      </div>
    </div>

    <div class="bg-white rounded-xl hover:shadow p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Revenus mensuels</h2>
      <div style="height: 300px;">
        <Line :data="lineChartData" :options="chartOptions" :key="lineChartKey" />
      </div>
     
    </div>
    
  </div>
  <div class="lg:px-10">
    <RevenueBreakchart />
  </div>
  
</template>
