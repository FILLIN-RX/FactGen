<template>
  <div class="flex items-center gap-2">
    <span
      class="material-symbols-outlined text-base"
      :style="{ color: color }"
    >
      {{ icon }}
    </span>
    <span :style="{ color: color }">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  text: String,
  color: String,
});
</script>