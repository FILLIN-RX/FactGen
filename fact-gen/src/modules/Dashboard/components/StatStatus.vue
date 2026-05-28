<template>
    <div
        class="w-full bg-gradient-to-br from-white to-gray-50 min-h-screen lg:min-h-0 lg:max-w-8xl lg:mx-auto lg:my-4 lg:rounded-3xl lg:shadow-xl lg:p p-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
            <div class="flex-1">
                <n-h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 tracking-tight">
                    Répartition des factures
                </n-h2>
                <n-p class="text-sm text-gray-600 font-medium">
                    Vue d'ensemble de vos factures
                </n-p>
            </div>
        </div>

        <!-- État de chargement -->
        <div v-if="facturesStore.loading" class="flex items-center justify-center min-h-[300px] p-8">
            <div class="flex flex-col items-center gap-4">
                <n-spin size="large" />
                <n-p class="text-sm text-gray-600 font-medium">Chargement des données...</n-p>
            </div>
        </div>

        <!-- État vide -->
        <div v-else-if="!hasData" class="flex items-center justify-center min-h-[400px] p-8">
            <div class="flex flex-col items-center text-center max-w-sm">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                </div>
                <n-h3 class="text-lg font-semibold text-gray-900 mb-2">Aucune facture</n-h3>
                <n-p class="text-sm text-gray-600 mb-6 leading-relaxed">
                    Commencez par créer votre première facture
                </n-p>
                <n-button type="primary" size="large" class="rounded-xl font-semibold shadow-lg">
                    Créer une facture
                </n-button>
            </div>
        </div>

        <!-- Graphique et légende -->
        <div v-else class="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <n-card class="flex-1">
                <div class="relative h-72 lg:h-80">
                    <Doughnut :data="chartData" :options="chartOptions" />
                    <div
                        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <div class="text-3xl lg:text-4xl font-bold text-gray-900 leading-none">{{ totalFactures }}</div>
                        <div class="text-xs text-gray-600 uppercase tracking-wider font-semibold mt-1">Total</div>
                    </div>
                </div>
            </n-card>

            <n-card class="flex-1">
                <n-h3 class="text-lg font-semibold text-gray-900 mb-4">Détails par statut</n-h3>
                <div class="grid grid-cols-2 gap-3">
                    <div v-for="(item, index) in legendItems" :key="item.label"
                        class="flex  items-center justify-between p-4 rounded-xl bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-200 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
                        :class="{ 'opacity-50': item.count === 0 }">
                        <div class="flex items-center  gap-3">
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 rounded-full shadow-sm flex-shrink-0"
                                    :style="{ backgroundColor: item.color }"></div>
                                <div class="w-2 h-2 rounded-full bg-current opacity-60" :style="{ color: item.color }">
                                </div>
                            </div>
                            <n-text class="font-medium text-gray-700 text-sm">{{ item.label }}</n-text>
                        </div>
                        <div class="flex flex-col items-end">
                            <n-text class="font-bold text-gray-900 text-lg">{{ item.count }}</n-text>
                            <n-text class="text-xs text-gray-500 font-medium">{{ item.percentage }}%</n-text>
                        </div>
                    </div>
                </div>
            </n-card>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useFacturesStore } from "@/modules/Invoice/stores/invoice.store";
import { Doughnut } from "vue-chartjs";
import { showToastMessage } from "@/composables/useToast";
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const facturesStore = useFacturesStore();

const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("info");

const statutConfig = {
    paye: { label: "Payée", color: "#10b981" },
    impayée: { label: "Impayée", color: "#ef4444" },
    en_attente: { label: "En attente", color: "#f59e0b" },
    en_retard: { label: "En retard", color: "#dc2626" },
    brouillon: { label: "Brouillon", color: "#6b7280" },
    annule: { label: "Annulée", color: "#8b5cf6" }
};

const statutKeys = Object.keys(statutConfig);
const labels = Object.values(statutConfig).map(s => s.label);
const colors = Object.values(statutConfig).map(s => s.color);

onMounted(async () => {
    try {
        await facturesStore.chargerFactures();
        showToastMessage("Données chargées avec succès", "success");
        console.log("Statuts des factures:", facturesStore.factures.map(f => f.statut));
        console.log("Comptage des statuts:", facturesStore.facturesParStatutCount);
    } catch (error) {
        showToastMessage("Erreur lors du chargement", "error");
        console.error("Erreur lors du chargement des factures:", error);
    }
});

const showNotification = (message, type) => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
};

const hasData = computed(() => {
    const counts = facturesStore.facturesParStatutCount || {};
    return Object.values(counts).some(count => count > 0);
});

const totalFactures = computed(() => {
    const counts = facturesStore.facturesParStatutCount || {};
    return Object.values(counts).reduce((total, count) => total + count, 0);
});

const chartData = computed(() => {
    const counts = facturesStore.facturesParStatutCount || {};

    return {
        labels,
        datasets: [
            {
                label: "Factures par statut",
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 3,
                data: statutKeys.map((key) => counts[key] || 0),
                hoverOffset: 12,
                hoverBorderWidth: 4,
            },
        ],
    };
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 12,
            padding: 12,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            callbacks: {
                label: (context) => {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = total > 0 ? ((context.parsed * 100) / total).toFixed(1) : 0;
                    return `${context.label}: ${context.parsed} (${percentage}%)`;
                }
            }
        }
    },
    cutout: '70%',
    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1200,
        easing: 'easeOutQuart'
    },
    elements: {
        arc: {
            borderRadius: 6,
        }
    }
};

const legendItems = computed(() => {
    const counts = facturesStore.facturesParStatutCount || {};
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return statutKeys.map((key, index) => {
        const count = counts[key] || 0;
        const percentage = total > 0 ? ((count * 100) / total).toFixed(1) : 0;

        return {
            label: statutConfig[key].label,
            color: statutConfig[key].color,
            count,
            percentage
        };
    });
});
</script>
