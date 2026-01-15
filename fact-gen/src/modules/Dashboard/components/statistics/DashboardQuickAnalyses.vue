<template>
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
                    <span :class="advancedAnalytics.tauxCroissanceClients >= 0 ? 'text-green-600' : 'text-red-600'"
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
