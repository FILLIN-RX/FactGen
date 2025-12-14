<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
      <div class="p-4 sm:p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-slate-900">
              Confirmer la suppression
            </h3>
            <p class="text-xs sm:text-sm text-slate-600">
              Action irréversible
            </p>
          </div>
        </div>

        <p class="text-sm sm:text-base text-slate-700 mb-6">
          Supprimer la facture
          <span class="font-semibold">#{{ invoiceNumber }}</span>
          ?
        </p>

        <div class="flex gap-3">
          <button @click="$emit('cancel')"
            class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors text-sm sm:text-base"
            :disabled="isDeleting">
            Annuler
          </button>
          <button @click="$emit('confirm')"
            class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            :disabled="isDeleting">
            <div v-if="isDeleting"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {{ isDeleting ? "Suppression..." : "Supprimer" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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