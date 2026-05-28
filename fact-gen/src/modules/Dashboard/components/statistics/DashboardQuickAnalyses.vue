<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <n-card>
            <n-h3 class="text-lg font-semibold text-gray-900 mb-4">Performances</n-h3>
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <n-text class="text-sm text-gray-600">Revenu moyen par facture</n-text>
                    <n-text class="font-medium">{{ formatCurrency(advancedAnalytics.revenuMoyen) }}</n-text>
                </div>
                <div class="flex justify-between items-center">
                    <n-text class="text-sm text-gray-600">Croissance clients</n-text>
                    <n-text :class="advancedAnalytics.tauxCroissanceClients >= 0 ? 'text-green-600' : 'text-red-600'"
                        class="font-medium">
                        {{ advancedAnalytics.tauxCroissanceClients.toFixed(1) }}%
                    </n-text>
                </div>
                <div class="flex justify-between items-center">
                    <n-text class="text-sm text-gray-600">Nouveaux clients (30j)</n-text>
                    <n-text class="font-medium">{{ advancedAnalytics.clientsRecents }}</n-text>
                </div>
                <div class="flex justify-between items-center">
                    <n-text class="text-sm text-gray-600">Factures récentes (30j)</n-text>
                    <n-text class="font-medium">{{ advancedAnalytics.facturesPeriod }}</n-text>
                </div>
            </div>
        </n-card>

        <n-card>
            <n-h3 class="text-lg font-semibold text-gray-900 mb-4">Répartition des factures</n-h3>
            <div class="space-y-3">
                <div v-for="(count, status) in advancedAnalytics.facturesParStatut" :key="status"
                    class="flex items-center justify-between">
                    <div class="flex items-center">
                        <n-tag size="small" round :class="getStatusColor(status)" class="mr-3">{{ status }}</n-tag>
                    </div>
                    <n-text class="font-medium">{{ count }}</n-text>
                </div>
            </div>
        </n-card>
    </div>
</template>

<script setup>
const props = defineProps({
    advancedAnalytics: {
        type: Object,
        required: true
    },
    formatCurrency: {
        type: Function,
        required: true
    },
    getStatusColor: {
        type: Function,
        required: true
    }
});
</script>
