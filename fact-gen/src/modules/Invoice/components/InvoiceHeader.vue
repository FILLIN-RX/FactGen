<template>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <n-h1>Factures</n-h1>
            <n-p class="text-sm text-surface-on-variant">Suivez vos paiements et créez de nouveaux documents</n-p>
        </div>
        <div class="flex items-center gap-3">
            <n-badge :value="activeFiltersCount" :show="activeFiltersCount > 0">
                <n-button @click="$emit('toggle-filters')" secondary
                    :class="{ 'bg-blue-50 border-[#005AC1]/30': showFilters }">
                    <template #icon>
                        <FunnelIcon class="w-4 h-4" />
                    </template>
                    Filtres
                </n-button>
            </n-badge>
            <n-button @click="$emit('create')" type="primary">
                <template #icon>
                    <PlusIcon class="w-5 h-5" />
                </template>
                Créer une facture
            </n-button>
        </div>
    </div>
</template>

<script setup>
import { NH1, NP, NButton, NBadge } from "naive-ui";
import { FunnelIcon, PlusIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    resultCount: Number,
    showFilters: Boolean,
    activeFiltersCount: { type: Number, default: 0 }
});

defineEmits(['toggle-filters', 'create']);
</script>
