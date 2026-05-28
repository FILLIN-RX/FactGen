<template>
    <n-card>
        <div class="flex items-center justify-between mb-4">
            <n-h3 class="text-lg font-semibold text-gray-900">Analyses avancées</n-h3>
            <div class="flex space-x-2">
                <n-button @click="$emit('update:selectedPeriod', 'daily')"
                    :type="selectedPeriod === 'daily' ? 'primary' : 'default'"
                    size="small" ghost>
                    Journalier
                </n-button>
                <n-button @click="$emit('update:selectedPeriod', 'monthly')"
                    :type="selectedPeriod === 'monthly' ? 'primary' : 'default'"
                    size="small" ghost>
                    Mensuel
                </n-button>
            </div>
        </div>

        <div class="h-80 w-full">
            <canvas ref="chartCanvas" class="w-full h-full" :key="selectedPeriod"></canvas>
        </div>
    </n-card>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import Chart from 'chart.js/auto';

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
let myChart = null;

const renderChart = () => {
    if (myChart) {
        myChart.destroy();
    }

    const dataToUse = props.chartData[props.selectedPeriod];

    if (chartCanvas.value && dataToUse && dataToUse.labels.length > 0) {
        myChart = new Chart(chartCanvas.value, {
            type: 'line',
            data: dataToUse,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
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
}, { deep: true });
</script>
