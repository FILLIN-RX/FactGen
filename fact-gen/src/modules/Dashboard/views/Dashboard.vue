<template>
    <div class="space-y-8 p-6 max-w-[1600px] mx-auto">
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-[#1A1C1E]">Tableau de bord</h1>
                <p class="text-sm text-gray-500">
                    Aperçu de votre activité pour {{ currentMonth }}
                </p>
            </div>
            <div class="flex items-center gap-3">
                <button 
                    @click="refreshData" 
                    class="p-2 text-gray-500 hover:text-[#005AC1] transition-colors"
                    title="Actualiser les données">
                    <ArrowPathIcon class="w-5 h-5" :class="{ 'animate-spin': statsStore.isLoading }" />
                </button>
                
                <router-link to="/factures/new" class="btn-filled flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    <PlusIcon class="w-5 h-5" />
                    Nouvelle facture
                </router-link>
            </div>
        </header>

        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="card-outlined bg-white p-5 border-l-4 border-l-[#005AC1]">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Chiffre d'Affaires</p>
                        <h3 class="text-2xl font-bold text-[#1A1C1E] mt-1">
                            {{ formatPrice(statsStore.totalRevenu) }}
                        </h3>
                    </div>
                    <div class="p-2 bg-blue-50 rounded-lg text-[#005AC1]">
                        <BanknotesIcon class="w-6 h-6" />
                    </div>
                </div>
                <div class="mt-4 flex items-center text-xs">
                     <span :class="getTrendColor(statsStore.revenuTrend?.direction)" class="font-bold flex items-center bg-gray-50 px-1.5 py-0.5 rounded">
                        {{ statsStore.revenuTrend?.value || '0%' }} 
                        <span class="ml-1" v-if="statsStore.revenuTrend?.direction === 'up'">↗</span>
                        <span class="ml-1" v-else>↘</span>
                    </span>
                    <span class="text-gray-400 ml-2">vs semaine dernière</span>
                </div>
            </div>

            <div class="card-outlined bg-white p-5">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Factures Émises</p>
                        <h3 class="text-2xl font-bold text-[#1A1C1E] mt-1">
                            {{ statsStore.totalFactures }}
                        </h3>
                    </div>
                    <div class="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <DocumentTextIcon class="w-6 h-6" />
                    </div>
                </div>
                 <div class="mt-4 flex items-center text-xs">
                     <span :class="getTrendColor(statsStore.facturesTrend?.direction)" class="font-bold flex items-center bg-gray-50 px-1.5 py-0.5 rounded">
                        {{ statsStore.facturesTrend?.value || '0%' }}
                    </span>
                    <span class="text-gray-400 ml-2">vs semaine dernière</span>
                </div>
            </div>

            <div class="card-outlined bg-white p-5">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Clients Actifs</p>
                        <h3 class="text-2xl font-bold text-[#1A1C1E] mt-1">
                            {{ statsStore.totalClients }}
                        </h3>
                    </div>
                    <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <UserGroupIcon class="w-6 h-6" />
                    </div>
                </div>
                <div class="mt-4 flex items-center text-xs">
                     <span :class="getTrendColor(statsStore.clientsTrend?.direction)" class="font-bold flex items-center bg-gray-50 px-1.5 py-0.5 rounded">
                        {{ statsStore.clientsTrend?.value || '0%' }}
                    </span>
                     <span class="text-gray-400 ml-2">vs semaine dernière</span>
                </div>
            </div>

            <div class="card-outlined bg-white p-5">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Conversion</p>
                        <h3 class="text-2xl font-bold text-[#1A1C1E] mt-1">
                            {{ statsStore.tauxConversion }}%
                        </h3>
                    </div>
                    <div class="p-2 bg-orange-50 rounded-lg text-orange-600">
                        <ChartBarIcon class="w-6 h-6" />
                    </div>
                </div>
                <div class="mt-4 flex items-center text-xs text-gray-400">
                    <span class="font-medium text-gray-600">{{ statsStore.totalProspects }}</span>
                    <span class="ml-1">prospects totaux</span>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div class="lg:col-span-2 card-outlined p-6 bg-white min-h-[400px]">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="font-bold text-[#1A1C1E] text-lg">Évolution des Revenus</h2>
                        <p class="text-xs text-gray-500">Comparatif mensuel (Hors Taxe)</p>
                    </div>
                     <div class="flex items-center gap-2 text-xs">
                        <span class="w-3 h-3 rounded-full bg-[#005AC1]"></span>
                        <span class="text-gray-600">Revenus encaissés</span>
                     </div>
                </div>
                <div class="h-[300px]">
                    <RevenueChart />
                </div>
            </div>

            <div class="space-y-6">
                <div class="card-filled bg-[#005AC1] text-white p-6 shadow-lg border-none">
                    <h3 class="font-bold text-lg mb-2">Besoin d'aide ?</h3>
                    <p class="text-blue-100 text-sm mb-4">Générez un rapport comptable complet pour vos déclarations.</p>
                    <button class="w-full py-2 bg-white text-[#005AC1] text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors">
                        Générer un rapport
                    </button>
                </div>

                <div class="card-outlined bg-white p-6">
                    <h3 class="font-bold text-[#1A1C1E] mb-4">Mois le plus rentable</h3>
                    <div v-if="statsStore.moisLePlusRentable" class="flex items-center justify-between">
                         <span class="text-sm text-gray-600 capitalize">{{ statsStore.moisLePlusRentable.mois }}</span>
                         <span class="font-bold text-emerald-600">+ {{ formatPrice(statsStore.moisLePlusRentable.revenu) }}</span>
                    </div>
                    <div v-else class="text-sm text-gray-400">Pas assez de données</div>
                    
                    <div class="divider my-4"></div>
                    
                    <h3 class="font-bold text-[#1A1C1E] mb-4">Moyenne mensuelle</h3>
                     <div class="flex items-center justify-between">
                         <span class="text-sm text-gray-600">Moyenne globale</span>
                         <span class="font-bold text-[#005AC1]">{{ formatPrice(statsStore.moyenneRevenuParMois) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStatsStore } from '@/modules/Dashboard/stores/stats.store';
import RevenueChart from '@/components/BarChart.vue'; // Assure-toi que le chemin est bon
import { 
    BanknotesIcon, 
    DocumentTextIcon, 
    UserGroupIcon, 
    ChartBarIcon,
    PlusIcon,
    ArrowPathIcon
} from '@heroicons/vue/24/outline';

const statsStore = useStatsStore();

const currentMonth = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

// Chargement initial
onMounted(async () => {
    await refreshData();
});

const refreshData = async () => {
    await Promise.all([
        statsStore.chargerStatistiques(true),
        statsStore.chargerRevenusJournaliers()
    ]);
};

// Formatteur de prix
const formatPrice = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(value);
};

// Helper pour les couleurs de tendance
const getTrendColor = (direction: string) => {
    return direction === 'up' ? 'text-emerald-600' : 'text-red-600';
};
</script>

<style scoped>
/* Petits ajustements spécifiques */
.card-outlined {
    @apply transition-shadow duration-300;
}
.card-outlined:hover {
    @apply shadow-md border-gray-300;
}
</style>