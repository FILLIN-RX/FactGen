<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1A1C1E]">Tableau de bord</h1>
        <p class="text-sm text-gray-500">Aperçu de votre activité pour {{ currentMonth }}</p>
      </div>
      <n-button-group>
        <n-button quaternary circle @click="refreshData">
          <template #icon><n-icon><ArrowPathIcon /></n-icon></template>
        </n-button>
        <n-button type="primary" @click="$router.push('/NewInvoice')">
          <template #icon><n-icon><PlusIcon /></n-icon></template>
          Nouvelle facture
        </n-button>
      </n-button-group>
    </div>

    <n-grid :cols="4" :x-gap="16" :y-gap="16">
      <n-grid-item>
        <n-card>
          <n-thing>
            <template #avatar>
              <n-icon size="32" color="#005AC1"><BanknotesIcon /></n-icon>
            </template>
            <template #header>
              <span class="text-xs uppercase tracking-wider text-gray-500">Chiffre d'Affaires</span>
            </template>
            <template #description>
              <span class="text-2xl font-bold">{{ formatPrice(statsStore.totalRevenu) }}</span>
            </template>
            <template #footer>
              <n-tag :type="statsStore.revenuTrend?.direction === 'up' ? 'success' : 'error'" size="small">
                {{ statsStore.revenuTrend?.value || '0%' }}
              </n-tag>
              <span class="text-xs text-gray-400 ml-2">vs semaine dernière</span>
            </template>
          </n-thing>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card>
          <n-thing>
            <template #avatar>
              <n-icon size="32" color="#7c3aed"><DocumentTextIcon /></n-icon>
            </template>
            <template #header>
              <span class="text-xs uppercase tracking-wider text-gray-500">Factures Émises</span>
            </template>
            <template #description>
              <span class="text-2xl font-bold">{{ statsStore.totalFactures }}</span>
            </template>
            <template #footer>
              <n-tag :type="statsStore.facturesTrend?.direction === 'up' ? 'success' : 'error'" size="small">
                {{ statsStore.facturesTrend?.value || '0%' }}
              </n-tag>
              <span class="text-xs text-gray-400 ml-2">vs semaine dernière</span>
            </template>
          </n-thing>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card>
          <n-thing>
            <template #avatar>
              <n-icon size="32" color="#059669"><UserGroupIcon /></n-icon>
            </template>
            <template #header>
              <span class="text-xs uppercase tracking-wider text-gray-500">Clients Actifs</span>
            </template>
            <template #description>
              <span class="text-2xl font-bold">{{ statsStore.totalClients }}</span>
            </template>
            <template #footer>
              <n-tag :type="statsStore.clientsTrend?.direction === 'up' ? 'success' : 'error'" size="small">
                {{ statsStore.clientsTrend?.value || '0%' }}
              </n-tag>
              <span class="text-xs text-gray-400 ml-2">vs semaine dernière</span>
            </template>
          </n-thing>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card>
          <n-thing>
            <template #avatar>
              <n-icon size="32" color="#ea580c"><ChartBarIcon /></n-icon>
            </template>
            <template #header>
              <span class="text-xs uppercase tracking-wider text-gray-500">Conversion</span>
            </template>
            <template #description>
              <span class="text-2xl font-bold">{{ statsStore.tauxConversion }}%</span>
            </template>
            <template #footer>
              <span class="text-xs text-gray-500">{{ statsStore.totalProspects }} prospects totaux</span>
            </template>
          </n-thing>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid :cols="3" :x-gap="16">
      <n-grid-item :span="2">
        <n-card title="Évolution des Revenus">
          <template #header-extra>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#005AC1]" />
              <span class="text-xs text-gray-500">Revenus encaissés</span>
            </div>
          </template>
          <div class="h-[300px]">
            <RevenueChart />
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item :span="1">
        <n-card style="background: #005AC1; color: white; border: none; margin-bottom: 16px;">
          <h3 class="font-bold text-lg mb-2">Besoin d'aide ?</h3>
          <p class="text-blue-100 text-sm mb-4">Générez un rapport comptable complet pour vos déclarations.</p>
          <n-button ghost style="color: white; border-color: white;">Générer un rapport</n-button>
        </n-card>

        <n-card title="Mois le plus rentable">
          <div v-if="statsStore.moisLePlusRentable" class="flex items-center justify-between">
            <span class="text-sm capitalize">{{ statsStore.moisLePlusRentable.mois }}</span>
            <span class="font-bold text-emerald-600">+{{ formatPrice(statsStore.moisLePlusRentable.revenu) }}</span>
          </div>
          <p v-else class="text-sm text-gray-400">Pas assez de données</p>
          <n-divider />
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Moyenne mensuelle</span>
            <span class="font-bold text-[#005AC1]">{{ formatPrice(statsStore.moyenneRevenuParMois) }}</span>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStatsStore } from "@/modules/Dashboard/stores/stats.store";
import RevenueChart from "@/modules/Dashboard/components/BarChart.vue";
import {
  BanknotesIcon, DocumentTextIcon, UserGroupIcon, ChartBarIcon,
  PlusIcon, ArrowPathIcon
} from "@heroicons/vue/24/outline";

const statsStore = useStatsStore();
const currentMonth = new Date().toLocaleString("fr-FR", { month: "long", year: "numeric" });

onMounted(async () => {
  await refreshData();
});

const refreshData = async () => {
  await Promise.all([
    statsStore.chargerStatistiques(true),
    statsStore.chargerRevenusJournaliers(),
  ]);
};

const formatPrice = (value) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XAF" }).format(value);
</script>
