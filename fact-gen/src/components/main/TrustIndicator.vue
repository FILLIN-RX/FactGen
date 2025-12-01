<template>
  <div class="flex items-center gap-2" :class="[isDarkBg ? 'text-white' : 'text-gray-600']">
    <div v-if="!isDarkBg" class="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
      <span class="material-symbols-outlined text-base" :class="`text-${color}-600`">
        {{ icon }}
      </span>
    </div>
    <span v-else class="material-symbols-outlined text-base">
      {{ icon }}
    </span>
    <span class="font-medium text-sm">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  text: String,
  color: {
    type: String,
    default: 'blue'
  },
  isDarkBg: {
    type: Boolean,
    default: false
  }
});
</script>