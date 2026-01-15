<template>
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div class="px-4 py-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <button @click="$emit('go-back')" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <ArrowLeftIcon class="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Statistiques détaillées</h1>
                        <p class="text-sm text-gray-500">Analyse complète de votre activité</p>
                    </div>
                </div>

                <button @click="$emit('refresh')" :disabled="isLoading"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ArrowPathIcon class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
                    Actualiser
                </button>
            </div>
        </div>

        <div class="border-t border-gray-200">
            <nav class="flex space-x-8 px-4 sm:px-6 lg:px-8" aria-label="Tabs">
                <button v-for="tab in tabs" :key="tab.id" @click="$emit('update:activeTab', tab.id)" :class="[
                    activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors'
                ]">
                    <component :is="tab.icon" class="w-4 h-4 mr-2" />
                    <span class="hidden sm:inline">{{ tab.label }}</span>
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

// Define props
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    activeTab: {
        type: String,
        required: true
    },
    tabs: {
        type: Array,
        required: true
    }
});

// Define emits
const emit = defineEmits(['refresh', 'update:activeTab', 'go-back']);

// This function needs to be passed down or replicated if it's not a global utility

</script>
