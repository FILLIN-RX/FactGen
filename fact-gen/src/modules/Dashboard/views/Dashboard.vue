<template>
    <div class="space-y-8">
        <!-- Header Section -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-[#1A1C1E]">Tableau de bord</h1>
                <p class="text-sm text-surface-on-variant">Résumé financier de votre activité</p>
            </div>
            <div class="flex items-center gap-3">
                <button class="btn-outlined px-4 py-2 text-sm shadow-sm">
                    <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
                    Exporter
                </button>
                <button class="btn-filled px-5 py-2 hover:shadow-lg transition-shadow">
                    <PlusIcon class="w-5 h-5 mr-2" />
                    Créer une facture
                </button>
            </div>
        </header>

        <!-- Financial Overview (Cards) -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="stat in quickStats" :key="stat.label"
                class="card-outlined p-5 group hover:border-[#005AC1]/30 transition-colors">
                <div class="flex items-center justify-between mb-3">
                    <div class="p-2 rounded-lg" :class="stat.bg">
                        <component :is="stat.icon" class="w-5 h-5" :class="stat.color" />
                    </div>
                </div>
                <p class="text-xs font-medium text-surface-on-variant uppercase tracking-wider">{{ stat.label }}</p>
                <div class="flex items-end justify-between mt-1">
                    <h3 class="text-xl font-bold text-[#1A1C1E]">{{ stat.value }}</h3>
                    <span v-if="stat.trend"
                        class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-600 flex items-center">
                        <ArrowUpIcon class="w-2 h-2 mr-1" /> {{ stat.trend }}%
                    </span>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content: Recent Invoices -->
            <div class="lg:col-span-2 space-y-6">
                <div class="card-outlined p-0 overflow-hidden">
                    <div class="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                        <h2 class="font-bold text-[#1A1C1E]">Factures récentes</h2>
                        <router-link to="/facture" class="text-sm text-[#005AC1] hover:underline">Voir
                            tout</router-link>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead
                                class="bg-[#F8F9FA] text-[11px] uppercase tracking-wider text-surface-on-variant font-bold">
                                <tr>
                                    <th class="px-6 py-3">Client</th>
                                    <th class="px-6 py-3">Date</th>
                                    <th class="px-6 py-3">Montant</th>
                                    <th class="px-6 py-3">Statut</th>
                                    <th class="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                <tr v-for="invoice in recentInvoices" :key="invoice.id"
                                    class="hover:bg-[#F8F9FA]/50 transition-colors cursor-pointer group">
                                    <td class="px-6 py-4">
                                        <p class="text-sm font-bold text-[#1A1C1E]">{{ invoice.client }}</p>
                                        <p class="text-[10px] text-surface-on-variant">INV-{{ invoice.id }}</p>
                                    </td>
                                    <td class="px-6 py-4 text-xs text-surface-on-variant">
                                        {{ invoice.date }}
                                    </td>
                                    <td class="px-6 py-4 text-sm font-bold text-[#1A1C1E]">
                                        {{ formatCurrency(invoice.montant) }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <span :class="getStatusClass(invoice.status)">
                                            {{ invoice.status }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <button
                                            class="p-1.5 text-surface-on-variant hover:text-[#005AC1] transition-colors">
                                            <EllipsisVerticalIcon class="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Financial Chart -->
                <div class="card-outlined p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="font-bold text-[#1A1C1E]">Évolution mensuelle</h2>
                        <select class="input-outlined w-auto py-1 h-8 text-xs">
                            <option>Année 2024</option>
                            <option>Année 2023</option>
                        </select>
                    </div>
                    <div class="h-64 flex items-end justify-between gap-2 px-2">
                        <div v-for="(val, i) in [40, 60, 45, 80, 55, 90, 70, 85, 60, 95, 80, 100]" :key="i"
                            class="flex-1 bg-[#D3E4FF] rounded-t-sm hover:bg-[#005AC1] transition-colors relative group"
                            :style="{ height: val + '%' }">
                            <span
                                class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                {{ val }}k
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4 text-[10px] text-surface-on-variant font-bold">
                        <span>JAN</span><span>FÉV</span><span>MAR</span><span>AVR</span><span>MAI</span><span>JUN</span>
                        <span>JUL</span><span>AOÛ</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DÉC</span>
                    </div>
                </div>
            </div>

            <!-- Sidebar Content -->
            <aside class="space-y-6">
                <!-- Quick Reports -->
                <div class="card-outlined p-6 bg-[#005AC1] text-white border-none shadow-elevation-2">
                    <h3 class="font-bold text-lg mb-2">Prêt pour les impôts ?</h3>
                    <p class="text-xs text-blue-100 mb-4">Générez votre rapport annuel en un clic et simplifiez votre
                        comptabilité.</p>
                    <button
                        class="w-full bg-white text-[#005AC1] font-bold py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                        Générer le rapport
                    </button>
                </div>

                <!-- Recent Clients -->
                <div class="card-outlined p-0">
                    <div class="px-6 py-4 border-b border-outline-variant">
                        <h2 class="font-bold text-[#1A1C1E] text-sm">Nouveaux clients</h2>
                    </div>
                    <div class="p-4 space-y-4">
                        <div v-for="i in 3" :key="i" class="flex items-center justify-between group">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center border border-outline-variant text-[10px] font-bold">
                                    C{{ i }}
                                </div>
                                <div>
                                    <p class="text-xs font-bold text-[#1A1C1E]">Client #{{ i }}</p>
                                    <p class="text-[10px] text-surface-on-variant">Ajouté il y a 2h</p>
                                </div>
                            </div>
                            <button
                                class="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50 hover:text-[#005AC1] rounded">
                                <PlusIcon class="w-3 h-3" />
                            </button>
                        </div>
                        <button
                            class="w-full text-center py-2 text-xs font-bold text-[#005AC1] hover:bg-blue-50 rounded transition-colors">
                            Voir tous les clients
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {
    PlusIcon,
    ArrowDownTrayIcon,
    BanknotesIcon,
    ClockIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ArrowUpIcon,
    EllipsisVerticalIcon
} from '@heroicons/vue/24/outline';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
};

const quickStats = [
    { label: 'Revenu Total', value: '45 250 €', icon: BanknotesIcon, color: 'text-blue-600', bg: 'bg-blue-50', trend: '12' },
    { label: 'En attente', value: '8 400 €', icon: ClockIcon, color: 'text-amber-600', bg: 'bg-amber-50', trend: '4' },
    { label: 'En retard', value: '1 200 €', icon: ExclamationCircleIcon, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Encaissé', value: '35 650 €', icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-50', trend: '8' }
];

const recentInvoices = [
    { id: '2024-001', client: 'Tech Solutions SAS', date: '15 Jan 2024', montant: 2500, status: 'Payé' },
    { id: '2024-002', client: 'Marcelle Design', date: '14 Jan 2024', montant: 450, status: 'En attente' },
    { id: '2024-003', client: 'Boulangerie Patisson', date: '12 Jan 2024', montant: 1200, status: 'En retard' },
    { id: '2024-004', client: 'Jean Dubois EURL', date: '10 Jan 2024', montant: 800, status: 'Payé' },
    { id: '2024-005', client: 'Hôtel Splendid', date: '08 Jan 2024', montant: 3200, status: 'Payé' }
];

const getStatusClass = (status) => {
    switch (status) {
        case 'Payé': return 'badge-paid';
        case 'En attente': return 'badge-pending';
        case 'En retard': return 'bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-[10px] font-bold';
        default: return 'bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-[10px] font-bold';
    }
};
</script>

<style scoped>
/* Specific card hover effects */
.card-outlined {
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}
</style>
