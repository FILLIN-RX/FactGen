<template>
    <div @click="$emit('select')"
        class="card-outlined p-0 overflow-hidden hover:border-[#005AC1]/30 transition-all cursor-pointer group bg-white">
        <div class="px-6 py-4 flex items-center justify-between">
            <!-- Left: Info -->
            <div class="flex items-center space-x-4">
                <div
                    class="w-10 h-10 rounded-lg bg-[#F8F9FA] border border-outline-variant flex items-center justify-center text-surface-on-variant group-hover:bg-[#D3E4FF] group-hover:text-[#005AC1] group-hover:border-[#005AC1]/10 transition-colors">
                    <DocumentTextIcon class="w-5 h-5" />
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-[#1A1C1E]">INV-{{ invoice.numero }}</span>
                        <span :class="getStatusClass(invoice.statut)">
                            {{ formatStatus(invoice.statut) }}
                        </span>
                    </div>
                    <p class="text-[11px] text-surface-on-variant font-medium mt-0.5">
                        {{ clientName || 'Client inconnu' }} • {{ formatDate(invoice.date) }}
                    </p>
                </div>
            </div>

            <!-- Right: Amount & Action -->
            <div class="flex items-center gap-6">
                <div class="text-right hidden sm:block">
                    <p class="text-[10px] text-surface-on-variant uppercase tracking-wider font-bold">Montant</p>
                    <p class="text-base font-bold text-[#1A1C1E]">{{ formatPrice(invoice.montant_total) }}</p>
                </div>
                <div class="p-2 rounded-full group-hover:bg-[#D3E4FF]/50 transition-colors">
                    <ChevronRightIcon class="w-4 h-4 text-[#005AC1]" />
                </div>
            </div>
        </div>

        <!-- Mobile Price Footer -->
        <div
            class="sm:hidden px-6 pb-4 pt-1 flex justify-between items-center border-t border-outline-variant/30 bg-[#F8F9FA]/30">
            <p class="text-[10px] text-surface-on-variant font-bold uppercase">Total TTC</p>
            <p class="text-sm font-bold text-[#1A1C1E]">{{ formatPrice(invoice.montant_total) }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useClientsStore } from '@/modules/Client/stores/client.store';
import { formatCurrency } from '@/shared/utils/format';
import { useSettingsStore } from '@/shared/stores/setting.store';
import {
    DocumentTextIcon,
    ChevronRightIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({ invoice: Object });
defineEmits(['select']);

const clientsStore = useClientsStore();
const settingsStore = useSettingsStore();

const formatPrice = (val) => formatCurrency(val, settingsStore.currency);

const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

const clientName = computed(() => {
    if (!props.invoice?.client_id) return props.invoice?.client_data?.nom || "";
    const client = clientsStore.clients.find(c => c.id === props.invoice.client_id);
    return client ? client.nom : props.invoice.client_data?.nom || "";
});

const formatStatus = (status) => {
    const labels = {
        'paye': 'Payée',
        'payee': 'Payée',
        'en_attente': 'En attente',
        'en_retard': 'En retard',
        'brouillon': 'Brouillon',
        'annule': 'Annulée'
    };
    return labels[status] || status;
};

const getStatusClass = (status) => {
    switch (status) {
        case 'paye':
        case 'payee': return 'badge-paid scale-90 origin-left';
        case 'en_attente': return 'badge-pending scale-90 origin-left';
        case 'en_retard': return 'bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-red-100 scale-90 origin-left';
        default: return 'bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-gray-200 scale-90 origin-left';
    }
};
</script>
