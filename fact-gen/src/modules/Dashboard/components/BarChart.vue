<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { Bar } from "vue-chartjs";
import { useSettingsStore } from "@/shared/stores/setting.store";
import { useStatsStore } from "@/modules/Dashboard/stores/stats.store"; // Keep stats store in src/stores for now
import { useAuthStore } from "@/modules/Auth/stores/auth.store";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const settings = useSettingsStore();
const statsStore = useStatsStore();
const chartKey = ref(0);

// 🚀 Initialisation
onMounted(async () => {
    const auth = useAuthStore();
    await auth.initialize();

    if (auth.isAuthenticated) {
        await Promise.all([
            statsStore.chargerStatistiques(),
            statsStore.chargerRevenusJournaliers()
        ]);
        chartKey.value++;
    }
});

// 🔄 Auto-refresh charts on data change
watch(
    () => [statsStore.mois, statsStore.revenusParMois, statsStore.jours, statsStore.revenusParJours],
    () => chartKey.value++,
    { deep: true }
);

// 📊 Chart configurations
const createChartData = (labels: string[], data: number[], color: string) => ({
    labels: labels || [],
    datasets: [{
        label: "Montant TTC",
        data: data || [],
        backgroundColor: `${color}15`,
        borderColor: color,
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
    }]
});

const monthlyData = computed(() =>
    createChartData(statsStore.mois, statsStore.revenusParMois, "#3b82f6")
);

const dailyData = computed(() =>
    createChartData(statsStore.jours, statsStore.revenusParJours, "#ef4444")
);

// 🎨 Responsive chart options
const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: "#fff",
            titleColor: "#1f2937",
            bodyColor: "#374151",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            callbacks: {
                label: (context) => `💰 ${context.parsed.y.toLocaleString()} ${settings.currency}`
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: { color: "#f3f4f620" },
            ticks: {
                callback: (value) => {
                    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                    if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
                    return value.toLocaleString();
                },
                font: { size: 10 },
                color: '#6b7280'
            }
        },
        x: {
            grid: { display: false },
            ticks: {
                font: { size: 10 },
                color: '#6b7280',
                maxRotation: 45
            }
        }
    }
}));

// 📈 Data validation
const hasMonthlyData = computed(() => statsStore.mois?.length > 0);
const hasDailyData = computed(() => statsStore.jours?.length > 0);

// 🎯 Chart component with error handling
const ChartCard = ({ title, subtitle, data, hasData, icon, color, retry }) => {
    if (statsStore.isLoading) {
        return `
      <div class="flex items-center justify-center h-48">
        <div class="animate-spin w-8 h-8 border-3 border-${color}-200 border-t-${color}-600 rounded-full"></div>
      </div>
    `;
    }

    if (statsStore.error) {
        return `
      <div class="text-center py-12">
        <div class="w-12 h-12 bg-red-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="font-medium text-gray-900 mb-2">Erreur de chargement</p>
        <button @click="${retry}" class="px-4 py-2 bg-${color}-600 text-white rounded-lg text-sm hover:bg-${color}-700">
          Réessayer
        </button>
      </div>
    `;
    }

    if (!hasData) {
        return `
      <div class="text-center py-12">
        <div class="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
          ${icon}
        </div>
        <p class="font-medium text-gray-900 mb-1">Aucune donnée</p>
        <p class="text-sm text-gray-500">${subtitle}</p>
      </div>
    `;
    }

    return `<div class="h-48 sm:h-56"><Bar :data="${data}" :options="chartOptions" /></div>`;
};
</script>

<template>
    <div class=" p-3 sm:p-4 lg:p-6">
        <!-- 📱 Mobile-first header -->
        <div class="mb-4 sm:mb-6">
            <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Tableau de bord
            </h1>
            <p class="text-xs sm:text-sm text-gray-600">
                Analysez vos performances en temps réel
            </p>
        </div>

        <!-- 📊 Ultra-responsive grid -->
        <div class="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">

            <!-- 📈 Monthly Revenue Chart -->
            <div
                class="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-50">
                    <div class="flex-1 min-w-0">
                        <h2 class="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            Revenus mensuels
                        </h2>
                        <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
                            Évolution par mois
                        </p>
                    </div>
                    <div class="p-2 bg-blue-50 rounded-lg sm:rounded-xl shrink-0">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                            </path>
                        </svg>
                    </div>
                </div>

                <!-- Chart Content -->
                <div class="p-4 sm:p-5">
                    <!-- Loading -->
                    <div v-if="statsStore.isLoading" class="flex items-center justify-center h-48">
                        <div class="animate-spin w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full"></div>
                    </div>

                    <!-- Error -->
                    <div v-else-if="statsStore.error" class="text-center py-12">
                        <div class="w-12 h-12 bg-red-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <p class="font-medium text-gray-900 mb-2">Erreur de chargement</p>
                        <button @click="statsStore.chargerStatistiques(true)"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Réessayer
                        </button>
                    </div>

                    <!-- Empty State -->
                    <div v-else-if="!hasMonthlyData" class="text-center py-12">
                        <div class="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                        <p class="font-medium text-gray-900 mb-1">Aucune donnée</p>
                        <p class="text-sm text-gray-500">Créez des factures pour voir les statistiques</p>
                    </div>

                    <!-- Chart -->
                    <div v-else class="h-48 sm:h-56">
                        <Bar :key="`monthly-${chartKey}`" :data="monthlyData" :options="chartOptions" />
                    </div>
                </div>
            </div>

            <!-- 📅 Daily Revenue Chart -->
            <div
                class="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-50">
                    <div class="flex-1 min-w-0">
                        <h2 class="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            Revenus quotidiens
                        </h2>
                        <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
                            Activité par jour
                        </p>
                    </div>
                    <div class="p-2 bg-red-50 rounded-lg sm:rounded-xl shrink-0">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                    </div>
                </div>

                <!-- Chart Content -->
                <div class="p-4 sm:p-5">
                    <!-- Loading -->
                    <div v-if="statsStore.isLoading" class="flex items-center justify-center h-48">
                        <div class="animate-spin w-8 h-8 border-3 border-red-200 border-t-red-600 rounded-full"></div>
                    </div>

                    <!-- Error -->
                    <div v-else-if="statsStore.error" class="text-center py-12">
                        <div class="w-12 h-12 bg-red-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <p class="font-medium text-gray-900 mb-2">Erreur de chargement</p>
                        <button @click="statsStore.chargerRevenusJournaliers()"
                            class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                            Réessayer
                        </button>
                    </div>

                    <!-- Empty State -->
                    <div v-else-if="!hasDailyData" class="text-center py-12">
                        <div class="w-12 h-12 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                        </div>
                        <p class="font-medium text-gray-900 mb-1">Aucune activité</p>
                        <p class="text-sm text-gray-500">Aucune activité journalière détectée</p>
                    </div>

                    <!-- Chart -->
                    <div v-else class="h-48 sm:h-56">
                        <Bar :key="`daily-${chartKey}`" :data="dailyData" :options="chartOptions" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* 📱 Mobile-first utilities */
@media (max-width: 640px) {
    .border-3 {
        border-width: 3px;
    }
}

/* ✨ Smooth hover effects */
.hover\:shadow-md:hover {
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

/* 🎨 Custom scrollbar for mobile */
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
}
</style>
