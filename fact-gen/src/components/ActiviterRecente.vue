<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const activeTab = ref('all');

// Data for the three donut charts
const marketingData = {
  labels: ['Marketing'],
  datasets: [{
    data: [45, 55],
    backgroundColor: [
      '#F97316',
      '#E5E5E5',
    ],
    borderWidth: 0,
    cutout: '75%'
  }]
};

const operationsData = {
  labels: ['Operations'],
  datasets: [{
    data: [25, 75],
    backgroundColor: [
      '#0EA5E9',
      '#E5E5E5',
    ],
    borderWidth: 0,
    cutout: '75%'
  }]
};

const licensingData = {
  labels: ['Licensing'],
  datasets: [{
    data: [23, 77],
    backgroundColor: [
      '#14B8A6',
      '#E5E5E5',
    ],
    borderWidth: 0,
    cutout: '75%'
  }]
};

// Common options for all donut charts
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  }
};

// Additional metrics
const metrics = [
  { label: 'Total', value: '435K', trend: '+29%', color: 'text-neutral-800' },
  { label: 'Earmark', value: '31%', trend: '+9%', color: 'text-neutral-800' },
  { label: '', value: '15%', trend: '+25%', color: 'text-neutral-600' }
];
</script>

<template>
  <div class="card h-full w-screen p-5  bg-white mb-5 rounded-2xl">
    <div class="card-title mb-6">Expense Monitoring</div>
    
    <!-- Tabs -->
    <div class="flex space-x-4 mb-6 text-sm">
      <button 
        @click="activeTab = 'all'" 
        :class="['px-3 py-1 rounded transition-colors', 
                activeTab === 'all' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:bg-neutral-100']">
        Marketing
      </button>
      <button 
        @click="activeTab = 'operations'" 
        :class="['px-3 py-1 rounded transition-colors', 
                activeTab === 'operations' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:bg-neutral-100']">
        Operations
      </button>
      <button 
        @click="activeTab = 'expenses'" 
        :class="['px-3 py-1 rounded transition-colors', 
                activeTab === 'expenses' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:bg-neutral-100']">
        Operations Expenses
      </button>
    </div>
    
    <!-- Charts -->
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col items-center">
        <div class="relative w-28 h-28">
          <Doughnut :data="marketingData" :options="chartOptions" />
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-lg font-semibold">45%</span>
          </div>
        </div>
        <span class="mt-4 text-sm text-neutral-600">Marketing</span>
      </div>
      
      <div class="flex flex-col items-center">
        <div class="relative w-28 h-28">
          <Doughnut :data="operationsData" :options="chartOptions" />
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-lg font-semibold">25%</span>
          </div>
        </div>
        <span class="mt-4 text-sm text-neutral-600">Operations</span>
      </div>
      
      <div class="flex flex-col items-center">
        <div class="relative w-28 h-28">
          <Doughnut :data="licensingData" :options="chartOptions" />
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-lg font-semibold">23%</span>
          </div>
        </div>
        <span class="mt-4 text-sm text-neutral-600">Licensing</span>
      </div>
    </div>
    
    <!-- Metrics -->
    <div class="mt-6 grid grid-cols-3 gap-4">
      <div v-for="(metric, index) in metrics" :key="index" class="text-right">
        <div :class="['text-2xl font-semibold', metric.color]">{{ metric.value }}</div>
        <div class="flex items-center justify-end space-x-1">
          <span class="text-sm text-neutral-600">{{ metric.label }}</span>
          <span class="text-xs text-green-500">{{ metric.trend }}</span>
        </div>
      </div>
    </div>
  </div>
</template>