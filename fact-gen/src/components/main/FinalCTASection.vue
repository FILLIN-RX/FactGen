<template>
  <section class="py-20 bg-blue-600 dark:bg-indigo-700 transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center text-white">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
        Prêt à transformer votre facturation ?
      </h2>
      <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
        Rejoignez des milliers de professionnels qui font confiance à Factgen pour leur facturation. 
        Gratuit, sans engagement.
      </p>
      <router-link to="/facture">
        <button class="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.03] transform transition-all duration-300 focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2">
          Commencer maintenant
        </button>
      </router-link>
      
      <div class="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm opacity-80">
        <TrustIndicator icon="check_circle" text="Aucune carte requise" color="white" is-dark-bg="true" />
        <TrustIndicator icon="check_circle" text="Utilisation immédiate" color="white" is-dark-bg="true" />
        <TrustIndicator icon="check_circle" text="Support inclus" color="white" is-dark-bg="true" />
      </div>
    </div>
  </section>
</template>

<script setup>
import TrustIndicator from './TrustIndicator.vue';
</script>