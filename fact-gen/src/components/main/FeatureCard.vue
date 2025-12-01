<template>
  <div class="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 dark:bg-gray-700 dark:border-gray-600">
    <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mb-6 dark:from-blue-700 dark:to-indigo-800">
      <span class="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-300">
        {{ feature.icon }}
      </span>
    </div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ feature.title }}</h3>
    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ feature.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  feature: Object
});
</script>