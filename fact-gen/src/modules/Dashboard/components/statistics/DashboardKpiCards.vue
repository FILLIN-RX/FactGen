<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <n-card class="group" :hover-style="{ borderColor: 'rgba(0, 90, 193, 0.3)' }">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-blue-50 text-[#005AC1] ring-1 ring-blue-100 group-hover:scale-110 transition-transform">
                    <UsersIcon class="w-6 h-6" />
                </div>
                <n-tag :type="stats.clientsTrend.direction === 'up' ? 'success' : 'error'" size="small">
                    <template #icon>
                        <component :is="stats.clientsTrend.direction === 'up' ? ArrowUpIcon : ArrowDownIcon" class="w-3 h-3" />
                    </template>
                    {{ stats.clientsTrend.value }}
                </n-tag>
            </div>
            <n-p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Portefeuille Clients</n-p>
            <n-h3 class="text-3xl font-black text-[#1A1C1E] tracking-tight">{{ stats.totalClients }}</n-h3>
        </n-card>

        <n-card class="group" :hover-style="{ borderColor: 'rgba(0, 90, 193, 0.3)' }">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-green-50 text-green-600 ring-1 ring-green-100 group-hover:scale-110 transition-transform">
                    <DocumentTextIcon class="w-6 h-6" />
                </div>
                <n-tag :type="stats.facturesTrend.direction === 'up' ? 'success' : 'error'" size="small">
                    <template #icon>
                        <component :is="stats.facturesTrend.direction === 'up' ? ArrowUpIcon : ArrowDownIcon" class="w-3 h-3" />
                    </template>
                    {{ stats.facturesTrend.value }}
                </n-tag>
            </div>
            <n-p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Volume Documents</n-p>
            <n-h3 class="text-3xl font-black text-[#1A1C1E] tracking-tight">{{ stats.totalFactures }}</n-h3>
        </n-card>

        <n-card class="group sm:col-span-2 lg:col-span-1" :hover-style="{ borderColor: 'rgba(0, 90, 193, 0.3)' }">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-[#D3E4FF] text-[#005AC1] ring-1 ring-blue-100 group-hover:scale-110 transition-transform">
                    <BanknotesIcon class="w-6 h-6" />
                </div>
                <n-tag type="info" size="small">Mensuel</n-tag>
            </div>
            <n-p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Revenue Brut (TTC)</n-p>
            <n-h3 class="text-2xl font-black text-[#005AC1] tracking-tighter">{{ formatCurrency(stats.totalRevenu) }}</n-h3>
        </n-card>

        <n-card class="group" :hover-style="{ borderColor: 'rgba(0, 90, 193, 0.3)' }">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 group-hover:scale-110 transition-transform">
                    <PresentationChartLineIcon class="w-6 h-6" />
                </div>
            </div>
            <n-p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Taux de Conversion</n-p>
            <div class="flex items-end gap-2">
                <n-h3 class="text-3xl font-black text-[#1A1C1E] tracking-tight">{{ stats.tauxConversion }}%</n-h3>
                <n-p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-tighter">{{ stats.totalProspects }} cibles</n-p>
            </div>
        </n-card>
    </div>
</template>

<script setup>
import {
    UsersIcon,
    DocumentTextIcon,
    BanknotesIcon,
    PresentationChartLineIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
    stats: { type: Object, required: true },
    formatCurrency: { type: Function, required: true }
});
</script>
