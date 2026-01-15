<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import { useStatsStore } from "@/modules/Dashboard/stores/stats.store";
import { useSettingsStore } from "@/shared/stores/setting.store";
import API from "@/shared/services/axios";
import { formatCurrency } from "@/shared/utils/format";

// Sub-components
import DashboardHeader from '@/modules/Dashboard/components/statistics/DashboardHeader.vue';
import DashboardQuickAnalyses from '@/modules/Dashboard/components/statistics/DashboardQuickAnalyses.vue';
import ClientsTable from '@/modules/Dashboard/components/statistics/ClientsTable.vue';
import FacturesTable from '@/modules/Dashboard/components/statistics/FacturesTable.vue';
import AnalyticsChart from '@/modules/Dashboard/components/statistics/AnalyticsChart.vue';
import AnalyticsInsights from '@/modules/Dashboard/components/statistics/AnalyticsInsights.vue';
import DashboardKpiCards from '@/modules/Dashboard/components/statistics/DashboardKpiCards.vue';
import LoadinApp from "@/shared/components/LoadinApp.vue";
import {
    ChartBarIcon,
    UsersIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon,
    ExclamationCircleIcon
} from '@heroicons/vue/24/outline';

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

const formatWithCurrency = (value) => formatCurrency(value, settings.currency);

onMounted(async () => {
    try {
        await auth.initialize();
        if (!auth.isAuthenticated) return router.push("/login");
        await loadAllData();
    } catch (err) {
        error.value = "Impossible de charger les analyses financières.";
        console.error(err);
    } finally {
        isLoading.value = false;
    }
});

const loadAllData = async () => {
    const [clientsRes, facturesRes] = await Promise.all([
        API.get("/clients"),
        API.get("/factures")
    ]);
    clients.value = clientsRes.data || [];
    factures.value = facturesRes.data || [];
    await statsStore.chargerStatistiques(true);
    await statsStore.chargerRevenusJournaliers();
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
    const facturesParStatut = factures.value.reduce((acc, f) => {
        acc[f.statut] = (acc[f.statut] || 0) + 1;
        return acc;
    }, {});
    return {
        facturesParStatut,
        revenuMoyen: stats.value.totalRevenu / (stats.value.totalFactures || 1),
    };
});

const formatDate = (date) => date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : "-";

const getStatusColor = (status) => {
    const colors = {
        'payee': 'badge-paid',
        'paye': 'badge-paid',
        'en_attente': 'badge-pending',
        'en_retard': 'bg-red-50 text-red-600 border-red-100',
    };
    return colors[status] || 'bg-gray-50 text-gray-500 border-gray-100';
};

const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: ChartBarIcon },
    { id: 'clients', label: 'Portefeuille Clients', icon: UsersIcon },
    { id: 'factures', label: 'Historique Factures', icon: DocumentTextIcon },
    { id: 'analytics', label: 'Prévisions & Tendances', icon: ArrowTrendingUpIcon }
];

const refresh = async () => {
    isLoading.value = true;
    error.value = null;
    try { await loadAllData(); } catch (err) { error.value = "Erreur de mise à jour."; } finally { isLoading.value = false; }
};
</script>

<template>
    <div class="min-h-screen bg-[#F8F9FA]">
        <!-- Modern Header with Tabs -->
        <DashboardHeader :isLoading="isLoading" :activeTab="activeTab" :tabs="tabs" @refresh="refresh"
            @update:activeTab="activeTab = $event" @go-back="router.go(-1)" />

        <div v-if="isLoading" class="flex flex-col items-center justify-center h-[60vh]">
            <LoadinApp />
            <p class="mt-4 text-[10px] font-bold text-surface-on-variant uppercase tracking-widest animate-pulse">
                Analyses en cours de calcul...</p>
        </div>

        <div v-else-if="error" class="max-w-7xl mx-auto p-8">
            <div class="card-outlined bg-white p-12 text-center">
                <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ExclamationCircleIcon class="w-8 h-8 text-red-600" />
                </div>
                <h3 class="text-xl font-bold text-[#1A1C1E] mb-2">Erreur de chargement</h3>
                <p class="text-sm text-surface-on-variant mb-6">{{ error }}</p>
                <button @click="refresh" class="btn-filled px-8 py-2">Réessayer l'analyse</button>
            </div>
        </div>

        <div v-else class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
            <!-- Dynamic Content based on Active Tab -->
            <transition name="fade" mode="out-in">
                <div :key="activeTab">
                    <div v-if="activeTab === 'overview'" class="space-y-8">
                        <DashboardKpiCards :stats="stats" :formatCurrency="formatWithCurrency" />
                        <DashboardQuickAnalyses :advancedAnalytics="advancedAnalytics"
                            :formatCurrency="formatWithCurrency" :getStatusColor="getStatusColor" />
                    </div>

                    <div v-else-if="activeTab === 'clients'">
                        <ClientsTable :clients="clients" :formatDate="formatDate" />
                    </div>

                    <div v-else-if="activeTab === 'factures'">
                        <FacturesTable :factures="factures" :formatCurrency="formatWithCurrency"
                            :formatDate="formatDate" :getStatusColor="getStatusColor" />
                    </div>

                    <div v-else-if="activeTab === 'analytics'" class="space-y-8">
                        <AnalyticsChart :selectedPeriod="selectedPeriod" :chartData="statsStore"
                            @update:selectedPeriod="selectedPeriod = $event" />
                        <AnalyticsInsights :stats="stats" :formatCurrency="formatWithCurrency" />
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
