<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import { useStatsStore } from "@/modules/Dashboard/stores/stats.store";
import { useSettingsStore } from "@/shared/stores/setting.store";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/shared/utils/format";

import DashboardHeader from '@/modules/Dashboard/components/statistics/DashboardHeader.vue';
import DashboardQuickAnalyses from '@/modules/Dashboard/components/statistics/DashboardQuickAnalyses.vue';
import ClientsTable from '@/modules/Dashboard/components/statistics/ClientsTable.vue';
import FacturesTable from '@/modules/Dashboard/components/statistics/FacturesTable.vue';
import AnalyticsChart from '@/modules/Dashboard/components/statistics/AnalyticsChart.vue';
import AnalyticsInsights from '@/modules/Dashboard/components/statistics/AnalyticsInsights.vue';
import DashboardKpiCards from '@/modules/Dashboard/components/statistics/DashboardKpiCards.vue';
import LoadinApp from "@/shared/components/LoadinApp.vue";
import {
    ChartBarIcon, UsersIcon, DocumentTextIcon, ArrowTrendingUpIcon
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
    } finally {
        isLoading.value = false;
    }
});

const loadAllData = async () => {
    const userId = auth.userId;
    const [clientsRes, facturesRes] = await Promise.all([
        supabase.from("clients").select("*").eq("user_id", userId),
        supabase.from("facture").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    ]);
    clients.value = clientsRes.data || [];
    factures.value = facturesRes.data || [];
    await statsStore.chargerStatistiques(true);
    await statsStore.chargerRevenusJournaliers();
};

const stats = computed(() => ({
    totalClients: statsStore.totalClients, totalFactures: statsStore.totalFactures,
    totalRevenu: statsStore.totalRevenu, totalProspects: statsStore.totalProspects,
    tauxConversion: statsStore.tauxConversion, moyenneRevenuParMois: statsStore.moyenneRevenuParMois,
    moisLePlusRentable: statsStore.moisLePlusRentable, clientsTrend: statsStore.clientsTrend,
    facturesTrend: statsStore.facturesTrend, revenuTrend: statsStore.revenuTrend
}));

const advancedAnalytics = computed(() => {
    const facturesParStatut = factures.value.reduce((acc, f) => {
        acc[f.statut] = (acc[f.statut] || 0) + 1;
        return acc;
    }, {});
    return { facturesParStatut, revenuMoyen: stats.value.totalRevenu / (stats.value.totalFactures || 1) };
});

const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: ChartBarIcon },
    { id: 'clients', label: 'Portefeuille Clients', icon: UsersIcon },
    { id: 'factures', label: 'Historique Factures', icon: DocumentTextIcon },
    { id: 'analytics', label: 'Prévisions & Tendances', icon: ArrowTrendingUpIcon }
];

const refresh = async () => {
    isLoading.value = true;
    error.value = null;
    try { await loadAllData(); } catch { error.value = "Erreur de mise à jour."; } finally { isLoading.value = false; }
};
</script>

<template>
    <div class="min-h-screen bg-[#F8F9FA]">
        <DashboardHeader :isLoading="isLoading" :activeTab="activeTab" :tabs="tabs"
            @refresh="refresh" @update:activeTab="activeTab = $event" @go-back="router.go(-1)" />

        <n-spin v-if="isLoading" class="flex justify-center py-24">
            <template #description>Analyses en cours de calcul...</template>
        </n-spin>

        <n-result v-else-if="error" status="error" title="Erreur de chargement" :description="error">
            <template #footer><n-button @click="refresh">Réessayer</n-button></template>
        </n-result>

        <div v-else class="max-w-7xl mx-auto p-6">
            <n-tabs v-model:value="activeTab" type="line" animated>
                <n-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id" :tab="tab.label">
                    <div v-if="tab.id === 'overview'" class="space-y-6">
                        <DashboardKpiCards :stats="stats" :formatCurrency="formatWithCurrency" />
                        <DashboardQuickAnalyses :advancedAnalytics="advancedAnalytics"
                            :formatCurrency="formatWithCurrency" />
                    </div>
                    <div v-else-if="tab.id === 'clients'">
                        <ClientsTable :clients="clients" />
                    </div>
                    <div v-else-if="tab.id === 'factures'">
                        <FacturesTable :factures="factures" :formatCurrency="formatWithCurrency" />
                    </div>
                    <div v-else-if="tab.id === 'analytics'" class="space-y-6">
                        <AnalyticsChart :selectedPeriod="selectedPeriod" :chartData="statsStore"
                            @update:selectedPeriod="selectedPeriod = $event" />
                        <AnalyticsInsights :stats="stats" :formatCurrency="formatWithCurrency" />
                    </div>
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
</template>
