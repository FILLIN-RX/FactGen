<template>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">Clients</p>
                    <p class="text-2xl font-bold text-gray-900">{{ stats.totalClients }}</p>
                </div>
                <div class="p-3 bg-blue-50 rounded-full">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239">
                        </path>
                    </svg>
                </div>
            </div>
            <div class="mt-2 flex items-center text-sm">
                <svg class="w-4 h-4 mr-1"
                    :class="stats.clientsTrend.direction === 'up' ? 'text-green-500' : 'text-red-500'" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                </div>
            </div>
            <div class="mt-2 flex items-center text-sm">
                <svg class="w-4 h-4 mr-1"
                    :class="stats.facturesTrend.direction === 'up' ? 'text-green-500' : 'text-red-500'" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                        </path>
                    </svg>
                </div>
            </div>
            <div class="mt-2 flex items-center text-sm">
                <svg class="w-4 h-4 mr-1"
                    :class="stats.revenuTrend.direction === 'up' ? 'text-green-500' : 'text-red-500'" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                </div>
            </div>
            <p class="mt-2 text-sm text-gray-500">{{ stats.totalProspects }} prospects</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    stats: {
        type: Object,
        required: true
    },
    formatCurrency: {
        type: Function,
        required: true
    }
});
</script>
