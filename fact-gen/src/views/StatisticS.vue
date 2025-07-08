<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useStatsStore } from "@/stores/stats";
import API from "@/api/axios";

const router = useRouter();
const auth = useAuthStore();
const statsStore = useStatsStore();

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
        // Charger toutes les données nécessaires
        const [clientsRes, facturesRes, prospectsRes] = await Promise.all([
            API.get("/clients"),
            API.get("/factures"),
            API.get("/prospects").catch(() => ({ data: [] })) // Prospects optionnels
        ]);

        clients.value = clientsRes.data || [];
        factures.value = facturesRes.data || [];
        prospects.value = prospectsRes.data || [];

        // Charger les statistiques du store
        await statsStore.chargerStatistiques(true);
        await statsStore.chargerRevenusJournaliers();

        // Préparer les données pour les graphiques
        prepareChartData();
    } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        throw err;
    }
};

const prepareChartData = () => {
    // Données mensuelles
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

    // Données journalières
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

// Statistiques calculées
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

// Analyses avancées
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

const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value).replace('XOF', 'FCFA');
};

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

// Tabs configuration
const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'chart-bar' },
    { id: 'clients', label: 'Clients', icon: 'users' },
    { id: 'factures', label: 'Factures', icon: 'document-text' },
    { id: 'analytics', label: 'Analyses', icon: 'trending-up' }
];

const getIcon = (iconName) => {
    const icons = {
        'chart-bar': 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
        'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239',
        'document-text': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        'trending-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
    };
    return icons[iconName] || icons['chart-bar'];
};
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div class="px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <button @click="router.go(-1)" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <div>
                            <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Statistiques détaillées</h1>
                            <p class="text-sm text-gray-500">Analyse complète de votre activité</p>
                        </div>
                    </div>

                    <button @click="refresh" :disabled="isLoading"
                        class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                        </svg>
                        Actualiser
                    </button>
                </div>
            </div>

            <!-- Tabs -->
            <div class="border-t border-gray-200">
                <nav class="flex space-x-8 px-4 sm:px-6 lg:px-8" aria-label="Tabs">
                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                        activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors'
                    ]">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                :d="getIcon(tab.icon)"></path>
                        </svg>
                        <span class="hidden sm:inline">{{ tab.label }}</span>
                    </button>
                </nav>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center h-64">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-sm text-gray-500">Chargement des données...</p>
            </div>
        </div>

        <!-- Error State -->
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

        <!-- Content -->
        <div v-else class="p-4 sm:p-6 lg:p-8">
            <!-- Vue d'ensemble -->
            <div v-if="activeTab === 'overview'" class="space-y-6">
                <!-- KPI Cards -->
                <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">Clients</p>
                                <p class="text-2xl font-bold text-gray-900">{{ stats.totalClients }}</p>
                            </div>
                            <div class="p-3 bg-blue-50 rounded-full">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center text-sm">
                            <svg class="w-4 h-4 mr-1"
                                :class="stats.clientsTrend.direction === 'up' ? 'text-green-500' : 'text-red-500'"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    :d="stats.clientsTrend.direction === 'up' ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'">
                                </path>
                            </svg>
                            <span :class="stats.clientsTrend.direction === 'up' ? 'text-green-600' : 'text-red-600'">
                                {{ stats.clientsTrend.value }}
                            </span>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">Factures</p>
                                <p class="text-2xl font-bold text-gray-900">{{ stats.totalFactures }}</p>
                            </div>
                            <div class="p-3 bg-green-50 rounded-full">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center text-sm">
                            <svg class="w-4 h-4 mr-1"
                                :class="stats.facturesTrend.direction === 'up' ? 'text-green-500' : 'text-red-500'"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    :d="stats.facturesTrend.direction === 'up' ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'">
                                </path>
                            </svg>
                            <span :class="stats.facturesTrend.direction === 'up' ? 'text-green-600' : 'text-red-600'">
                                {{ stats.facturesTrend.value }}
                            </span>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">Revenus</p>
                                <p class="text-lg font-bold text-gray-900 sm:text-2xl">{{
                                    formatCurrency(stats.totalRevenu) }}</p>
                            </div>
                            <div class="p-3 bg-purple-50 rounded-full">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center text-sm">
                            <svg class="w-4 h-4 mr-1"
                                :class="stats.revenuTrend.direction === 'up' ? 'text-green-500' : 'text-red-500'"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    :d="stats.revenuTrend.direction === 'up' ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'">
                                </path>
                            </svg>
                            <span :class="stats.revenuTrend.direction === 'up' ? 'text-green-600' : 'text-red-600'">
                                {{ stats.revenuTrend.value }}
                            </span>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">Conversion</p>
                                <p class="text-2xl font-bold text-gray-900">{{ stats.tauxConversion }}%</p>
                            </div>
                            <div class="p-3 bg-orange-50 rounded-full">
                                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <p class="mt-2 text-sm text-gray-500">{{ stats.totalProspects }} prospects</p>
                    </div>
                </div>

                <!-- Analyses rapides -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Performances</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">Revenu moyen par facture</span>
                                <span class="font-medium">{{ formatCurrency(advancedAnalytics.revenuMoyen) }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">Croissance clients</span>
                                <span
                                    :class="advancedAnalytics.tauxCroissanceClients >= 0 ? 'text-green-600' : 'text-red-600'"
                                    class="font-medium">
                                    {{ advancedAnalytics.tauxCroissanceClients.toFixed(1) }}%
                                </span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">Nouveaux clients (30j)</span>
                                <span class="font-medium">{{ advancedAnalytics.clientsRecents }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">Factures récentes (30j)</span>
                                <span class="font-medium">{{ advancedAnalytics.facturesPeriod }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Répartition des factures</h3>
                        <div class="space-y-3">
                            <div v-for="(count, status) in advancedAnalytics.facturesParStatut" :key="status"
                                class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 rounded-full mr-3"
                                        :class="getStatusColor(status).replace('text-', 'bg-').replace('-800', '-500')">
                                    </div>
                                    <span class="text-sm text-gray-600 capitalize">{{ status }}</span>
                                </div>
                                <span class="font-medium">{{ count }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clients Tab -->
            <div v-if="activeTab === 'clients'" class="space-y-6">
                <div class="bg-white rounded-lg border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">Liste des clients</h3>
                        <p class="text-sm text-gray-500">{{ clients.length }} clients au total</p>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Téléphone</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Créé le</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="client in clients" :key="client.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="font-medium text-gray-900">{{ client.nom }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ client.email || '-' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ client.telephone || '-' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ formatDate(client.created_at) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Factures Tab -->
            <div v-if="activeTab === 'factures'" class="space-y-6">
                <div class="bg-white rounded-lg border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">Liste des factures</h3>
                        <p class="text-sm text-gray-500">{{ factures.length }} factures au total</p>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Numéro</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Montant</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Statut</th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="facture in factures" :key="facture.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="font-medium text-gray-900">{{ facture.numero }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ facture.client_nom || '-' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        {{ formatCurrency(facture.montant_total) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span :class="getStatusColor(facture.statut)"
                                            class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                                            {{ facture.statut }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ formatDate(facture.created_at) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Analytics Tab -->
            <div v-if="activeTab === 'analytics'" class="space-y-6">
                <!-- Period Selector-->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Analyses avancées</h3>
                        <div class="flex space-x-2">
                            <button @click="selectedPeriod = 'daily'" :class="[
                                selectedPeriod === 'daily'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                                'px-3 py-1 rounded-md text-sm font-medium transition-colors'
                            ]">
                                Journalier
                            </button>
                            <button @click="selectedPeriod = 'monthly'" :class="[
                                selectedPeriod === 'monthly'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                                'px-3 py-1 rounded-md text-sm font-medium transition-colors'
                            ]">
                                Mensuel
                            </button>
                        </div>
                    </div>

                    <!-- Chart Container -->
                    <div class="h-80 w-full">
                        <canvas ref="chartCanvas" class="w-full h-full" :key="selectedPeriod"></canvas>
                    </div>
                </div>

                <!-- Insights Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg border border-gray-200">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="text-sm font-medium text-gray-600">Meilleur mois</h4>
                            <div class="p-2 bg-green-50 rounded-full">
                                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                        </div>
                        <p class="text-lg font-semibold text-gray-900">{{ stats.moisLePlusRentable.mois }}</p>
                        <p class="text-sm text-gray-500">{{ formatCurrency(stats.moisLePlusRentable.montant) }}</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg border border-gray-200">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="text-sm font-medium text-gray-600">Moyenne mensuelle</h4>
                            <div class="p-2 bg-blue-50 rounded-full">
                                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(stats.moyenneRevenuParMois) }}
                        </p>
                        <p class="text-sm text-gray-500">Sur {{ statsStore.mois.length }} mois</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg border border-gray-200">
                        <div class="flex items-center justify-between mb-4">
                            <h4 class="text-sm font-medium text-gray-600">Évolution</h4>
                            <div class="p-2 bg-purple-50 rounded-full">
                                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                        </div>
                        <p class="text-lg font-semibold text-gray-900">{{ stats.revenuTrend.value }}</p>
                        <p class="text-sm text-gray-500">vs période précédente</p>
                    </div>
                </div>

                <!-- Detailed Analytics -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg border border-gray-200">
                        <h4 class="text-lg font-semibold text-gray-900 mb-4">Répartition par statut</h4>
                        <div class="space-y-3">
                            <div v-for="(count, status) in advancedAnalytics.facturesParStatut" :key="status">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 rounded-full mr-3"
                                            :class="getStatusColor(status).replace('text-', 'bg-').replace('-800', '-500')">
                                        </div>
                                        <span class="text-sm text-gray-600 capitalize">{{ status }}</span>
                                    </div>
                                    <span class="font-medium">{{ count }}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div :class="getStatusColor(status).replace('text-', 'bg-').replace('-800', '-500')"
                                        class="h-2 rounded-full transition-all duration-300"
                                        :style="{ width: `${(count / stats.totalFactures) * 100}%` }"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg border border-gray-200">
                        <h4 class="text-lg font-semibold text-gray-900 mb-4">Activité récente</h4>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div class="flex items-center">
                                    <div class="p-2 bg-blue-100 rounded-full">
                                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239">
                                            </path>
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">Nouveaux clients</p>
                                        <p class="text-xs text-gray-500">30 derniers jours</p>
                                    </div>
                                </div>
                                <span class="text-lg font-semibold text-gray-900">{{ advancedAnalytics.clientsRecents
                                    }}</span>
                            </div>

                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div class="flex items-center">
                                    <div class="p-2 bg-green-100 rounded-full">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">Factures récentes</p>
                                        <p class="text-xs text-gray-500">30 derniers jours</p>
                                    </div>
                                </div>
                                <span class="text-lg font-semibold text-gray-900">{{ advancedAnalytics.facturesPeriod
                                    }}</span>
                            </div>

                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div class="flex items-center">
                                    <div class="p-2 bg-purple-100 rounded-full">
                                        <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                            </path>
                                        </svg>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">Revenu moyen</p>
                                        <p class="text-xs text-gray-500">Par facture</p>
                                    </div>
                                </div>
                                <span class="text-lg font-semibold text-gray-900">{{
                                    formatCurrency(advancedAnalytics.revenuMoyen) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
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