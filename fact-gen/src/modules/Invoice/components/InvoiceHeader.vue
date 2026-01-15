<template>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-2xl font-bold text-[#1A1C1E]">Factures</h1>
            <p class="text-sm text-surface-on-variant">Suivez vos paiements et créez de nouveaux documents</p>
        </div>
        <div class="flex items-center gap-3">
            <button @click="$emit('toggle-filters')" class="btn-outlined px-4 py-2 text-sm relative"
                :class="{ 'bg-blue-50 border-[#005AC1]/30': showFilters }">
                <FunnelIcon class="w-4 h-4 mr-2" />
                Filtres
                <span v-if="activeFiltersCount > 0"
                    class="absolute -top-1 -right-1 w-4 h-4 bg-[#005AC1] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {{ activeFiltersCount }}
                </span>
            </button>
            <button @click="$emit('create')" class="btn-filled px-5 py-2">
                <PlusIcon class="w-5 h-5 mr-2" />
                Créer une facture
            </button>
        </div>
    </div>
</template>

<script setup>
import { FunnelIcon, PlusIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    resultCount: Number,
    showFilters: Boolean,
    activeFiltersCount: { type: Number, default: 0 }
});

defineEmits(['toggle-filters', 'create']);
</script>
