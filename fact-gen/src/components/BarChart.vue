<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Janvier', 'Février', 'Mars'],
  datasets: [
    {
      label: 'Total TTC',
      data: [1200, 1800, 1400],
      backgroundColor: '#60a5fa',
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <div style="height: 300px;">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
