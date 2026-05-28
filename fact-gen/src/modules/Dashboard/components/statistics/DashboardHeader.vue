<template>
    <div class="bg-white border-b border-outline-variant sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-6 py-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="flex items-center space-x-5">
                    <n-button @click="$emit('go-back')" quaternary circle class="border border-outline-variant">
                        <template #icon>
                            <ArrowLeftIcon class="w-5 h-5" />
                        </template>
                    </n-button>
                    <div>
                        <n-h1 class="text-2xl font-bold text-[#1A1C1E] tracking-tight">Espace Analytics</n-h1>
                        <n-p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-[0.2em] mt-0.5">
                            Performance financière et indicateurs clés</n-p>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <n-button @click="$emit('refresh')" :disabled="isLoading" ghost>
                        <template #icon>
                            <ArrowPathIcon class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
                        </template>
                        {{ isLoading ? 'Analyse...' : 'Actualiser' }}
                    </n-button>
                </div>
            </div>
        </div>

        <n-tabs type="line" :value="activeTab" @update:value="$emit('update:activeTab', $event)" class="max-w-7xl mx-auto px-6" :tabs-panel-style="{ display: 'none' }">
            <n-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id">
                <template #tab>
                    <component :is="tab.icon" class="w-4 h-4" />
                    <span>{{ tab.label }}</span>
                </template>
            </n-tab-pane>
        </n-tabs>
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
