<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <n-card>
            <div class="flex items-center justify-between mb-4">
                <n-p class="text-sm font-medium text-gray-600">Meilleur mois</n-p>
                <div class="p-2 bg-green-50 rounded-full">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                </div>
            </div>
            <n-p class="text-lg font-semibold text-gray-900">{{ stats.moisLePlusRentable.mois }}</n-p>
            <n-p class="text-sm text-gray-500">{{ formatCurrency(stats.moisLePlusRentable.revenu) }}</n-p>
        </n-card>

        <n-card>
            <div class="flex items-center justify-between mb-4">
                <n-p class="text-sm font-medium text-gray-600">Moyenne mensuelle</n-p>
                <div class="p-2 bg-blue-50 rounded-full">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                </div>
            </div>
            <n-p class="text-lg font-semibold text-gray-900">{{ formatCurrency(stats.moyenneRevenuParMois) }}</n-p>
            <n-p class="text-sm text-gray-500">Sur {{ statsStoreMoisLength }} mois</n-p>
        </n-card>

        <n-card>
            <div class="flex items-center justify-between mb-4">
                <n-p class="text-sm font-medium text-gray-600">Évolution</n-p>
                <div class="p-2 bg-purple-50 rounded-full">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 12l3 3 7-7M12 20h9a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v11a2 2 0 002 2h7">
                        </path>
                    </svg>
                </div>
            </div>
            <n-p class="text-lg font-semibold text-gray-900">À définir</n-p>
            <n-p class="text-sm text-gray-500">Donnée à compléter</n-p>
        </n-card>
    </div>
</template>

<script setup>
const props = defineProps({
    stats: {
        type: Object,
        required: true
    },
    statsStoreMoisLength: {
        type: Number,
        required: true
    },
    formatCurrency: {
        type: Function,
        required: true
    }
});
</script>
