<template>
  <div class="mb-4 sm:mb-6">
    <div class="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
      <div
        class="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 class="text-base sm:text-lg font-semibold text-slate-900">
          Nouvelle facture
        </h3>
        <button @click="$emit('close')" class="p-1 hover:bg-slate-200 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-3 sm:p-4 lg:p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close']);
</script>