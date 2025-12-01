<template>
  <div class="flex flex-col md:gap-12 items-center" :class="{ 'md:flex-row-reverse': isReversed === 'true', 'md:flex-row': isReversed === 'false' }">
    <div class="md:w-1/2">
      <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6 dark:from-blue-700 dark:to-indigo-800">
        <span class="material-symbols-outlined text-4xl text-blue-600 dark:text-blue-300">
          {{ icon }}
        </span>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ title }}</h3>
      <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{{ description }}</p>
    </div>
    <div class="md:w-1/2 w-full mt-6 md:mt-0">
      <div class="bg-gradient-to-br from-gray-100 to-blue-50 p-8 rounded-2xl dark:from-gray-700 dark:to-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg">
        <div class="text-center">
          <div class="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">{{ statValue }}</div>
          <div class="text-gray-600 dark:text-gray-300">{{ statLabel }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: String,
  statValue: String,
  statLabel: String,
  isReversed: String, // Utiliser String car Vue HTML attribs sont des strings
});
</script>