<template>
    <div class="mb-6 transition-all duration-300 overflow-hidden" :class="showFilters || !isMobile
        ? 'max-h-screen opacity-100'
        : 'max-h-0 opacity-0 lg:max-h-screen lg:opacity-100'
        ">
        <div class="card-outlined p-5 bg-[#F8F9FA]/50">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Search -->
                <div class="md:col-span-2 relative">
                    <label class="text-[10px] font-bold text-surface-on-variant uppercase mb-1 block">Recherche
                        globale</label>
                    <div class="relative">
                        <MagnifyingGlassIcon
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-on-variant" />
                        <input :value="searchTerm" @input="$emit('update:searchTerm', $event.target.value)"
                            placeholder="Numéro, client..." class="input-outlined pl-10 h-10 py-0 text-sm" />
                    </div>
                </div>

                <!-- Client Filter -->
                <div>
                    <label class="text-[10px] font-bold text-surface-on-variant uppercase mb-1 block">Filtrer par
                        client</label>
                    <select :value="selectedClient" @change="$emit('update:selectedClient', $event.target.value)"
                        class="input-outlined h-10 py-0 text-sm">
                        <option value="">Tous les clients</option>
                        <option v-for="nom in clients" :key="nom" :value="nom">
                            {{ nom }}
                        </option>
                    </select>
                </div>

                <!-- Status Filter -->
                <div>
                    <label class="text-[10px] font-bold text-surface-on-variant uppercase mb-1 block">État du
                        paiement</label>
                    <select :value="selectedStatus" @change="$emit('update:selectedStatus', $event.target.value)"
                        class="input-outlined h-10 py-0 text-sm">
                        <option value="">Tous les statuts</option>
                        <option value="en_attente">En attente</option>
                        <option value="paye">Payée</option>
                        <option value="annule">Annulée</option>
                        <option value="en_retard">En retard</option>
                    </select>
                </div>
            </div>

            <div class="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant">
                <button @click="$emit('clear-filters')"
                    class="text-xs font-bold text-[#005AC1] hover:underline transition-colors">
                    Réinitialiser les filtres
                </button>
                <button @click="$emit('hide-filters')"
                    class="lg:hidden text-xs font-bold text-surface-on-variant hover:text-[#1A1C1E]">
                    Masquer les filtres
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

defineProps({
    searchTerm: String,
    selectedClient: String,
    selectedStatus: String,
    clients: Array,
    showFilters: Boolean,
    isMobile: Boolean
});

defineEmits(['update:searchTerm', 'update:selectedClient', 'update:selectedStatus', 'clear-filters', 'hide-filters']);
</script>
