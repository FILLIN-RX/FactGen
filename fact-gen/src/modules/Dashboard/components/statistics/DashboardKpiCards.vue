<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Clients KPI -->
        <div class="card-outlined p-6 bg-white group hover:border-[#005AC1]/30 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-blue-50 text-[#005AC1] ring-1 ring-blue-100 group-hover:scale-110 transition-transform">
                    <UsersIcon class="w-6 h-6" />
                </div>
                <div class="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold"
                    :class="stats.clientsTrend.direction === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
                    <component :is="stats.clientsTrend.direction === 'up' ? ArrowUpIcon : ArrowDownIcon"
                        class="w-3 h-3" />
                    {{ stats.clientsTrend.value }}
                </div>
            </div>
            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Portefeuille Clients
            </p>
            <h3 class="text-3xl font-black text-[#1A1C1E] tracking-tight">{{ stats.totalClients }}</h3>
        </div>

        <!-- Invoices KPI -->
        <div class="card-outlined p-6 bg-white group hover:border-[#005AC1]/30 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-green-50 text-green-600 ring-1 ring-green-100 group-hover:scale-110 transition-transform">
                    <DocumentTextIcon class="w-6 h-6" />
                </div>
                <div class="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold"
                    :class="stats.facturesTrend.direction === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
                    <component :is="stats.facturesTrend.direction === 'up' ? ArrowUpIcon : ArrowDownIcon"
                        class="w-3 h-3" />
                    {{ stats.facturesTrend.value }}
                </div>
            </div>
            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Volume Documents</p>
            <h3 class="text-3xl font-black text-[#1A1C1E] tracking-tight">{{ stats.totalFactures }}</h3>
        </div>

        <!-- Revenue KPI -->
        <div
            class="card-outlined p-6 bg-white group hover:border-[#005AC1]/30 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-[#D3E4FF] text-[#005AC1] ring-1 ring-blue-100 group-hover:scale-110 transition-transform">
                    <BanknotesIcon class="w-6 h-6" />
                </div>
                <div
                    class="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold text-[#005AC1] bg-blue-50">
                    Mensuel
                </div>
            </div>
            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Revenue Brut (TTC)
            </p>
            <h3 class="text-2xl font-black text-[#005AC1] tracking-tighter">{{ formatCurrency(stats.totalRevenu) }}</h3>
        </div>

        <!-- Conversion KPI -->
        <div class="card-outlined p-6 bg-white group hover:border-[#005AC1]/30 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <div
                    class="p-2.5 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 group-hover:scale-110 transition-transform">
                    <PresentationChartLineIcon class="w-6 h-6" />
                </div>
            </div>
            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mb-1">Taux de Conversion
            </p>
            <div class="flex items-end gap-2">
                <h3 class="text-3xl font-black text-[#1A1C1E] tracking-tight">{{ stats.tauxConversion }}%</h3>
                <span class="text-[10px] font-bold text-surface-on-variant mb-1 uppercase tracking-tighter">{{
                    stats.totalProspects }} cibles</span>
            </div>
        </div>
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
