<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { useStatsStore } from '@/modules/Dashboard/stores/stats.store';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const statsStore = useStatsStore();

const chartData = computed(() => ({
  labels: statsStore.mois.length > 0 ? statsStore.mois : ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [{
    label: 'Revenus (HT)',
    data: statsStore.revenusParMois.length > 0 ? statsStore.revenusParMois : [0, 0, 0, 0, 0, 0],
    backgroundColor: '#005AC1',
    borderRadius: 4,
    barThickness: 24,
  }]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1A1C1E',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: (context: any) => `${context.raw.toLocaleString('fr-FR')} FCFA`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#F0F0F0',
        drawBorder: false,
      },
      ticks: {
        font: { size: 11, family: 'Inter' },
        color: '#74777F',
        callback: (value: any) => {
             if (value >= 1000000) return (value / 1000000) + 'M';
             if (value >= 1000) return (value / 1000) + 'k';
             return value;
        }
      }
    },
    x: {
      grid: { display: false },
      ticks: {
        font: { size: 11, family: 'Inter' },
        color: '#74777F'
      }
    }
  }
};
</script>

<template>
  <div class="w-full h-full">
    <div v-if="statsStore.isLoading" class="flex items-center justify-center h-full">
      <n-spin size="large" />
    </div>
    <n-empty v-else-if="statsStore.revenusParMois.length === 0" description="Aucune donnée financière disponible" class="flex flex-col items-center justify-center h-full" />
    <Bar v-else :data="chartData" :options="chartOptions" />
  </div>
</template>
