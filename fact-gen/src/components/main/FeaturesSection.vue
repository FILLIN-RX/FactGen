<template>
  <section class="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      
      <!-- HEADER -->
      <div class="text-center mb-20">
        <h2 class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Solution complète de facturation
        </h2>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Tous les outils nécessaires pour gérer votre facturation de manière professionnelle, simple et rapide.
        </p>
      </div>

      <!-- FEATURE CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :feature="feature"
          class="transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue';

defineProps({
  features: {
    type: Array,
    required: true
  }
});
</script>
