<template>
  <section class="relative bg-blue-600 text-white overflow-hidden">

    <!-- HERO CONTENT -->
    <div class="container mx-auto px-6 lg:px-20 pt-24 pb-32 min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      
      <!-- TEXT -->
      <div class="space-y-10 max-w-xl">
        <h1 class="text-2xl sm:text-5xl lg:text-5xl font-extrabold leading-snug">
          Générateur de facture
          <span class="block text-pink-200 mt-2">professionnel</span>
        </h1>

        <p class="text-sm sm:text-xl text-white leading-relaxed">
          Créez des factures et devis professionnels en toute simplicité. 
          Solution complète avec CRM intégré pour une gestion optimale de votre activité.
        </p>

        <router-link to="/facture">
          <button class="bg-white text-blue-700 px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.05] transform transition-all duration-300">
            Créer ma facture gratuitement
          </button>
        </router-link>
      </div>

      <!-- ILLUSTRATION -->
      <div class="flex justify-center lg:justify-end mt-10 lg:mt-0">
        <img
          :src="heroIllustration"
          alt="Illustration facture"
          class="w-full max-w-md lg:max-w-xl drop-shadow-2xl"
        />
      </div>
    </div>

    <!-- WAVE SVG -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
      <svg
        class="relative block w-full h-28"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,160L60,165.3C120,171,240,181,360,186.7C480,192,600,192,720,176C840,160,960,128,1080,128C1200,128,1320,160,1380,176L1440,192V320H0V160Z"
        />
      </svg>
    </div>

  </section>

  <!-- STATISTICS SECTION -->
  <section class="bg-white py-24">
    <div class="container mx-auto px-6 lg:px-16 text-gray-700">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div class="space-y-4 stat-item">
            <div class="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
              {{ formattedInvoices }}
            </div>
            <div class="text-gray-600 dark:text-gray-400 text-lg">
              Factures créées
            </div>
          </div>
          <div class="space-y-4 stat-item">
            <div class="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {{ satisfaction }}%
            </div>
            <div class="text-gray-600 dark:text-gray-400 text-lg">
              Taux de satisfaction
            </div>
          </div>
          <div class="space-y-4 stat-item">
            <div class="text-5xl font-extrabold text-gray-700 dark:text-gray-300">
              {{ cost }}€
            </div>
            <div class="text-gray-600 dark:text-gray-400 text-lg">
              Coût d'utilisation
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import TrustIndicator from "./TrustIndicator.vue";
import heroIllustration from '../../assets/hand_drawn.png';
import { ref, onMounted, computed } from "vue";

const invoices = ref(0);
const satisfaction = ref(0);
const cost = ref(0);

// Valeurs finales
const finalInvoices = 10000; // pour le calcul
const finalSatisfaction = 99.9;
const finalCost = 0;

// Formatter pour afficher +10k
const formattedInvoices = computed(() => {
  return invoices.value >= 1000 ? `+${(invoices.value / 1000).toFixed(0)}k` : invoices.value;
});

// Fonction d'animation fluide
function animateCounter(target, finalValue, decimals = 0, duration = 2000) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = finalValue * progress;

    // arrondi selon les décimales
    target.value = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

onMounted(() => {
  animateCounter(invoices, finalInvoices, 0);       // entier pour factures
  animateCounter(satisfaction, finalSatisfaction, 1); // 1 decimal max
  animateCounter(cost, finalCost, 0);               // entier pour coût
});
</script>
