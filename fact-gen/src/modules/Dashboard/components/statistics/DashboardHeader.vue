<template>
    <div class="bg-white border-b border-outline-variant sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-6 py-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <!-- Title and Back -->
                <div class="flex items-center space-x-5">
                    <button @click="$emit('go-back')"
                        class="p-2.5 rounded-xl border border-outline-variant bg-white hover:bg-[#F8F9FA] transition-all text-surface-on-variant hover:text-[#005AC1] shadow-sm">
                        <ArrowLeftIcon class="w-5 h-5" />
                    </button>
                    <div>
                        <h1 class="text-2xl font-bold text-[#1A1C1E] tracking-tight">Espace Analytics</h1>
                        <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-[0.2em] mt-0.5">
                            Performance financière et indicateurs clés</p>
                    </div>
                </div>

                <!-- Global Actions -->
                <div class="flex items-center gap-3">
                    <button @click="$emit('refresh')" :disabled="isLoading"
                        class="btn-outlined px-5 py-2.5 text-sm font-bold bg-white">
                        <ArrowPathIcon class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
                        {{ isLoading ? 'Analyse...' : 'Actualiser' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Secondary Nav (Tabs) -->
        <div class="max-w-7xl mx-auto px-6">
            <nav class="flex space-x-8 -mb-px overflow-x-auto no-scrollbar" aria-label="Analyse Tabs">
                <button v-for="tab in tabs" :key="tab.id" @click="$emit('update:activeTab', tab.id)"
                    class="group relative whitespace-nowrap py-4 px-1 flex items-center gap-2 border-b-2 font-bold text-xs uppercase tracking-widest transition-all"
                    :class="[
                        activeTab === tab.id
                            ? 'border-[#005AC1] text-[#005AC1]'
                            : 'border-transparent text-surface-on-variant hover:text-[#1A1C1E]'
                    ]">
                    <component :is="tab.icon" class="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{{ tab.label }}</span>
                    <!-- Active Indicator -->
                    <div v-if="activeTab === tab.id" class="absolute inset-x-0 -bottom-px h-0.5 bg-[#005AC1]"></div>
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    isLoading: Boolean,
    activeTab: String,
    tabs: Array
});

defineEmits(['refresh', 'update:activeTab', 'go-back']);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
