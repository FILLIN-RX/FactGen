<template>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="card-outlined p-5 bg-white group hover:border-[#005AC1]/30 transition-colors">
            <div class="flex items-center justify-between mb-3">
                <div class="p-2 rounded bg-blue-50">
                    <DocumentTextIcon class="w-5 h-5 text-[#005AC1]" />
                </div>
            </div>
            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">Factures Total</p>
            <h3 class="text-xl font-bold text-[#1A1C1E] mt-1">{{ totalCount }}</h3>
        </div>

        <div class="card-outlined p-5 bg-white group hover:border-[#005AC1]/30 transition-colors">
            <div class="flex items-center justify-between mb-3">
                <div class="p-2 rounded bg-green-50">
                    <BanknotesIcon class="w-5 h-5 text-green-600" />
                </div>
            </div>
            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">Montant total (EUR)</p>
            <h3 class="text-xl font-bold text-[#1A1C1E] mt-1">{{ formatPrice(totalAmount) }} €</h3>
        </div>

        <div class="card-outlined p-5 bg-white group hover:border-[#005AC1]/30 transition-colors">
            <div class="flex items-center justify-between mb-3">
                <div class="p-2 rounded bg-amber-50">
                    <ClockIcon class="w-5 h-5 text-amber-600" />
                </div>
            </div>
            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">En attente de paiement</p>
            <h3 class="text-xl font-bold text-[#1A1C1E] mt-1">{{ pendingCount }}</h3>
        </div>
    </div>
</template>

<script setup>
import { DocumentTextIcon, BanknotesIcon, ClockIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    totalCount: Number,
    totalAmount: Number,
    pendingCount: Number
});

function formatPrice(val) {
    if (typeof val !== "number" || isNaN(val)) return "0,00";
    return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(val);
}
</script>
