<template>
  <button
    :class="[
      baseClasses,
      colorClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-90 active:scale-95',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="flex items-center justify-center space-x-2">
      <component v-if="icon" :is="icon" class="w-5 h-5 fill-current" />
      <span>{{ label }}</span>
    </span>
  </button>
</template>

<script setup>
import { computed, defineEmits } from 'vue';

const props = defineProps({
  label: { type: String, default: 'Bouton' },
  color: { type: String, default: 'blue' },
  icon: { type: [Object, Function], default: null }, // Composant SVG
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['click']);

const baseClasses = 'px-5 py-2 rounded-md font-semibold text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none';

const colorClasses = computed(() => {
  switch (props.color) {
    case 'green': return 'bg-green-600 focus:ring-green-500';
    case 'red': return 'bg-red-600 focus:ring-red-500';
    case 'gray': return 'bg-gray-600 focus:ring-gray-500';
    case 'purple': return 'bg-purple-600 focus:ring-purple-500';
    case 'blue': 
    default: return 'bg-blue-600 focus:ring-blue-500';
  }
});
</script>
