<template>
    <div class="fixed inset-0 bg-[#001C3B]/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        @click.self="$emit('cancel')">
        <div
            class="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-200">
            <div class="p-8 text-center">
                <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ExclamationTriangleIcon class="w-8 h-8 text-red-600" />
                </div>

                <h3 class="text-xl font-bold text-[#1A1C1E] mb-2">Supprimer la facture ?</h3>
                <p class="text-sm text-surface-on-variant mb-8 px-4">
                    Êtes-vous sûr de vouloir supprimer la facture <span class="font-bold text-[#1A1C1E]">#{{
                        invoiceNumber }}</span> ? Cette action est définitive.
                </p>

                <div class="flex flex-col gap-3">
                    <button @click="$emit('confirm')" :disabled="isDeleting"
                        class="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        <ArrowPathIcon v-if="isDeleting" class="w-4 h-4 animate-spin" />
                        {{ isDeleting ? "Suppression en cours..." : "Confirmer la suppression" }}
                    </button>
                    <button @click="$emit('cancel')"
                        class="w-full btn-text py-3 text-surface-on-variant font-bold hover:bg-[#F8F9FA] rounded-xl transition-all">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

defineProps({
    invoiceNumber: {
        type: [String, Number],
        required: true,
    },
    isDeleting: {
        type: Boolean,
        required: true,
    }
});

defineEmits(['cancel', 'confirm']);
</script>
