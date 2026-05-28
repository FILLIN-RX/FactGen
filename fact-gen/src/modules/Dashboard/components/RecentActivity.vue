<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const activeTab = ref('all');

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

const metrics = [
    { label: 'Total', value: '435K', trend: '+29%', color: 'text-neutral-800' },
    { label: 'Earmark', value: '31%', trend: '+9%', color: 'text-neutral-800' },
    { label: '', value: '15%', trend: '+25%', color: 'text-neutral-600' }
];
</script>

<template>
    <n-card class="h-full w-screen mb-5 rounded-2xl" :bordered="true">
        <n-text class="card-title mb-6 font-semibold text-lg block">Expense Monitoring</n-text>

        <div class="flex space-x-4 mb-6 text-sm">
            <n-button @click="activeTab = 'all'" :type="activeTab === 'all' ? 'primary' : 'default'" size="small" ghost>
                Marketing
            </n-button>
            <n-button @click="activeTab = 'operations'" :type="activeTab === 'operations' ? 'primary' : 'default'" size="small" ghost>
                Operations
            </n-button>
            <n-button @click="activeTab = 'expenses'" :type="activeTab === 'expenses' ? 'primary' : 'default'" size="small" ghost>
                Operations Expenses
            </n-button>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col items-center">
                <div class="relative w-28 h-28">
                    <Doughnut :data="marketingData" :options="chartOptions" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <n-text class="text-lg font-semibold">45%</n-text>
                    </div>
                </div>
                <n-text class="mt-4 text-sm text-neutral-600">Marketing</n-text>
            </div>

            <div class="flex flex-col items-center">
                <div class="relative w-28 h-28">
                    <Doughnut :data="operationsData" :options="chartOptions" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <n-text class="text-lg font-semibold">25%</n-text>
                    </div>
                </div>
                <n-text class="mt-4 text-sm text-neutral-600">Operations</n-text>
            </div>

            <div class="flex flex-col items-center">
                <div class="relative w-28 h-28">
                    <Doughnut :data="licensingData" :options="chartOptions" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <n-text class="text-lg font-semibold">23%</n-text>
                    </div>
                </div>
                <n-text class="mt-4 text-sm text-neutral-600">Licensing</n-text>
            </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-4">
            <div v-for="(metric, index) in metrics" :key="index" class="text-right">
                <div :class="['text-2xl font-semibold', metric.color]">{{ metric.value }}</div>
                <div class="flex items-center justify-end space-x-1">
                    <n-text class="text-sm text-neutral-600">{{ metric.label }}</n-text>
                    <n-text class="text-xs text-green-500">{{ metric.trend }}</n-text>
                </div>
            </div>
        </div>
    </n-card>
</template>
