<script setup lang="ts">
import { ref } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Chart data
const chartData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
  datasets: [
    {
      data: [40, 20, 15, 15, 10],
      backgroundColor: [
        '#0EA5E9',
        '#F97316',
        '#14B8A6',
        '#6366F1',
        '#8B5CF6'
      ],
      borderWidth: 0,
      cutout: '65%'
    }
  ]
};

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#262626',
      bodyColor: '#525252',
      borderColor: '#E5E5E5',
      borderWidth: 1,
      padding: 12,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: function(context: any) {
          return `${context.label}: ${context.parsed}%`;
        }
      }
    }
  }
};

// Legend items
const legendItems = [
  { color: '#0EA5E9', label: 'Product A', percentage: '40%' },
  { color: '#F97316', label: 'Product B', percentage: '20%' },
  { color: '#14B8A6', label: 'Product C', percentage: '15%' },
  { color: '#6366F1', label: 'Product D', percentage: '15%' },
  { color: '#8B5CF6', label: 'Product E', percentage: '10%' }
];
</script>

<template>
  <div class="card h-full">
    <div class="card-title">Revenue Breakdown</div>
    
    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-center justify-center h-64">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>
      
      <div class="flex flex-col justify-center space-y-4">
        <div v-for="(item, index) in legendItems" :key="index" class="flex items-center">
          <div :style="`background-color: ${item.color}`" class="w-4 h-4 rounded-sm mr-3"></div>
          <div class="flex-1 h-2 bg-neutral-100 rounded-full">
            <div :style="`background-color: ${item.color}; width: ${item.percentage}`" class="h-full rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>