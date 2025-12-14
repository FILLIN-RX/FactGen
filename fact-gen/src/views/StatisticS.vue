<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useStatsStore } from "@/stores/stats";
import API from "@/api/axios";
import { formatCurrency } from "../utils/format";
import { useSettingsStore } from "../stores/setting";
// Import the new components

import DashboardHeader from '../views/statistics/DashboardHeader.vue';
import DashboardQuickAnalyses from '../views/statistics/DashboardQuickAnalyses.vue' ;
import ClientsTable from '../views/statistics/ClientsTable.vue';
import FacturesTable from '../views/statistics/FacturesTable.vue';
import AnalyticsChart from '../views/statistics/AnalyticsChart.vue';
import AnalyticsInsights from '../views/statistics/AnalyticsInsights.vue';
import DashboardKpiCards from '../views/statistics/DashboardKpiCards.vue';
const formatWithCurrency = (value) => formatCurrency(value, settings.currency);

const router = useRouter();
const auth = useAuthStore();
const statsStore = useStatsStore();
const settings = useSettingsStore();

const isLoading = ref(true);
const error = ref(null);
const activeTab = ref('overview');
const selectedPeriod = ref('monthly');

const clients = ref([]);
const factures = ref([]);
const prospects = ref([]);

// Données pour les graphiques
const chartData = ref({
    monthly: { labels: [], datasets: [] },
    daily: { labels: [], datasets: [] }
});

onMounted(async () => {
    try {
        await auth.initialize();
        if (!auth.isAuthenticated) {
            return router.push("/login");
        }

        await loadAllData();
    } catch (err) {
        error.value = "Erreur lors du chargement des données.";
        console.error(err);
    } finally {
        isLoading.value = false;
    }
});

const loadAllData = async () => {
    try {
        const [clientsRes, facturesRes, prospectsRes] = await Promise.all([
            API.get("/clients"),
            API.get("/factures"),
            API.get("/prospects").catch(() => ({ data: [] }))
        ]);

        clients.value = clientsRes.data || [];
        factures.value = facturesRes.data || [];
        prospects.value = prospectsRes.data || [];

        await statsStore.chargerStatistiques(true);
        await statsStore.chargerRevenusJournaliers();

        prepareChartData();
    } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        throw err;
    }
};

const prepareChartData = () => {
    chartData.value.monthly = {
        labels: statsStore.mois,
        datasets: [{
            label: 'Revenus (FCFA)',
            data: statsStore.revenusParMois,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true
        }]
    };

    chartData.value.daily = {
        labels: statsStore.jours,
        datasets: [{
            label: 'Revenus journaliers (FCFA)',
            data: statsStore.revenusParJours,
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true
        }]
    };
};

const stats = computed(() => ({
    totalClients: statsStore.totalClients,
    totalFactures: statsStore.totalFactures,
    totalRevenu: statsStore.totalRevenu,
    totalProspects: statsStore.totalProspects,
    tauxConversion: statsStore.tauxConversion,
    moyenneRevenuParMois: statsStore.moyenneRevenuParMois,
    moisLePlusRentable: statsStore.moisLePlusRentable,
    clientsTrend: statsStore.clientsTrend,
    facturesTrend: statsStore.facturesTrend,
    revenuTrend: statsStore.revenuTrend
}));

const advancedAnalytics = computed(() => {
    const facturesPeriod = factures.value.filter(f => {
        const date = new Date(f.created_at);
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return date >= thirtyDaysAgo;
    });

    const facturesParStatut = factures.value.reduce((acc, f) => {
        acc[f.statut] = (acc[f.statut] || 0) + 1;
        return acc;
    }, {});

    const clientsRecents = clients.value.filter(c => {
        const date = new Date(c.created_at);
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return date >= thirtyDaysAgo;
    }).length;

    return {
        facturesPeriod: facturesPeriod.length,
        facturesParStatut,
        clientsRecents,
        revenuMoyen: stats.value.totalRevenu / (stats.value.totalFactures || 1),
        tauxCroissanceClients: ((stats.value.totalClients - statsStore.totalClientsSemaineDerniere) / (statsStore.totalClientsSemaineDerniere || 1)) * 100
    };
});

// Utility functions (keep them here or move to a separate utility file if used globally)


const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

const getStatusColor = (status) => {
    const colors = {
        'payée': 'bg-green-100 text-green-800',
        'en attente': 'bg-yellow-100 text-yellow-800',
        'annulée': 'bg-red-100 text-red-800',
        'brouillon': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const refresh = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        await loadAllData();
    } catch (err) {
        error.value = "Erreur lors de l'actualisation des données.";
    } finally {
        isLoading.value = false;
    }
};

const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'chart-bar' },
    { id: 'clients', label: 'Clients', icon: 'users' },
    { id: 'factures', label: 'Factures', icon: 'document-text' },
    { id: 'analytics', label: 'Analyses', icon: 'trending-up' }
];

// getIcon can remain here or be moved to DashboardHeader if only used there
// const getIcon = (iconName) => { /* ... */ };

</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <DashboardHeader
            :isLoading="isLoading"
            :activeTab="activeTab"
            :tabs="tabs"
            @refresh="refresh"
            @update:activeTab="activeTab = $event"
            @go-back="router.go(-1)"
        />

        <div v-if="isLoading" class="flex items-center justify-center h-64">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-sm text-gray-500">Chargement des données...</p>
            </div>
        </div>

        <div v-else-if="error" class="p-4 sm:p-6 lg:p-8">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex">
                    <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-red-800">{{ error }}</p>
                        <button @click="refresh" class="mt-2 text-sm text-red-600 hover:text-red-800 font-medium">
                            Réessayer
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="p-4 sm:p-6 lg:p-8">
            <div v-if="activeTab === 'overview'" class="space-y-6">
                <DashboardKpiCards
                    :stats="stats"
                    :formatCurrency="formatWithCurrency"
                />
                <DashboardQuickAnalyses
                    :advancedAnalytics="advancedAnalytics"
                    :formatCurrency="formatWithCurrency"
                    :getStatusColor="getStatusColor"
                />
            </div>

            <div v-if="activeTab === 'clients'" class="space-y-6">
                <ClientsTable
                    :clients="clients"
                    :formatDate="formatDate"
                />
            </div>

            <div v-if="activeTab === 'factures'" class="space-y-6">
                <FacturesTable
                    :factures="factures"
                    :formatCurrency="formatWithCurrency"
                    :formatDate="formatDate"
                    :getStatusColor="getStatusColor"
                />
            </div>

            <div v-if="activeTab === 'analytics'" class="space-y-6">
                <AnalyticsChart
                    :selectedPeriod="selectedPeriod"
                    :chartData="chartData"
                    @update:selectedPeriod="selectedPeriod = $event"
                />
                <AnalyticsInsights
                    :stats="stats"
                    :statsStoreMoisLength="statsStore.mois.length"
                    :formatCurrency="formatWithCurrency"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Chart.js responsive styles */
canvas {
    max-width: 100%;
    height: auto;
}

/* Smooth transitions */
.transition-all {
    transition: all 0.3s ease;
}

/* Custom scrollbar for tables */
.overflow-x-auto::-webkit-scrollbar {
    height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

/* Responsive table styles */
@media (max-width: 640px) {
    .overflow-x-auto table {
        font-size: 14px;
    }

    .overflow-x-auto th,
    .overflow-x-auto td {
        padding: 8px 12px;
    }
}
</style>