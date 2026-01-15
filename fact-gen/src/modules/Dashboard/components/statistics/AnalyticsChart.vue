<template>
    <div class="bg-white p-4 rounded-lg border border-gray-200">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Analyses avancées</h3>
            <div class="flex space-x-2">
                <button @click="$emit('update:selectedPeriod', 'daily')" :class="[
                    selectedPeriod === 'daily'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    'px-3 py-1 rounded-md text-sm font-medium transition-colors'
                ]">
                    Journalier
                </button>
                <button @click="$emit('update:selectedPeriod', 'monthly')" :class="[
                    selectedPeriod === 'monthly'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    'px-3 py-1 rounded-md text-sm font-medium transition-colors'
                ]">
                    Mensuel
                </button>
            </div>
        </div>

        <div class="h-80 w-full">
            <canvas ref="chartCanvas" class="w-full h-full" :key="selectedPeriod"></canvas>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import Chart from 'chart.js/auto'; // Assuming Chart.js for example

const props = defineProps({
    selectedPeriod: {
        type: String,
        required: true
    },
    chartData: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:selectedPeriod']);

const chartCanvas = ref(null);
let myChart = null; // To hold the Chart.js instance

const renderChart = () => {
    if (myChart) {
        myChart.destroy(); // Destroy previous chart instance
    }

    const dataToUse = props.chartData[props.selectedPeriod];

    if (chartCanvas.value && dataToUse && dataToUse.labels.length > 0) {
        myChart = new Chart(chartCanvas.value, {
            type: 'line', // Or 'bar', depending on preference
            data: dataToUse,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true // Show legend for the dataset
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Revenus (FCFA)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: props.selectedPeriod === 'monthly' ? 'Mois' : 'Jours'
                        }
                    }
                }
            }
        });
    }
};

onMounted(() => {
    renderChart();
});

watch([() => props.selectedPeriod, () => props.chartData], () => {
    renderChart();
}, { deep: true }); // Deep watch for chartData changes
</script>
