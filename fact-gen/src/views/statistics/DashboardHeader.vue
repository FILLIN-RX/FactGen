<template>
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div class="px-4 py-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <button @click="$emit('go-back')" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <div>
                        <h1 class="text-xl font-bold text-gray-900 sm:text-2xl">Statistiques détaillées</h1>
                        <p class="text-sm text-gray-500">Analyse complète de votre activité</p>
                    </div>
                </div>

                <button @click="$emit('refresh')" :disabled="isLoading"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                    </svg>
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
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            :d="getIcon(tab.icon)"></path>
                    </svg>
                    <span class="hidden sm:inline">{{ tab.label }}</span>
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'; // Assuming getIcon might be a computed property or a simple function

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
const getIcon = (iconName) => {
    const icons = {
        'chart-bar': 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
        'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239',
        'document-text': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        'trending-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
    };
    return icons[iconName] || icons['chart-bar'];
};
</script>