<template>
    <div class="mb-8">
        <div class="bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
            <div class="px-8 py-5 bg-[#F8F9FA] border-b border-outline-variant flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-bold text-[#1A1C1E]">Nouvelle facture</h3>
                    <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mt-0.5">Édition du
                        document</p>
                </div>
                <button @click="$emit('close')"
                    class="p-2 hover:bg-white rounded-full transition-all text-surface-on-variant hover:text-red-600">
                    <XMarkIcon class="w-5 h-5" />
                </button>
            </div>
            <div class="p-0">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';
defineEmits(['close']);
</script>
