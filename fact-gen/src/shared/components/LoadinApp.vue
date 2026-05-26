<template>
  <div class="flex flex-col items-center py-8">
    <n-spin size="large" />
    <p class="mt-4 text-sm text-gray-500">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({ message: { type: String, default: "Chargement..." } });
</script>
