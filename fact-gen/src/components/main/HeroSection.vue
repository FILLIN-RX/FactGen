<template>
  <!-- HERO -->
  <section class="relative bg-[#1E40AF] text-white overflow-hidden">

    <div
      class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12
             pt-28 pb-36 min-h-[70vh]
             grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <!-- TEXT -->
      <div class="space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight">
          Générateur de factures
          <span class="block text-blue-200 mt-2">
            professionnel et gratuit
          </span>
        </h1>

        <p class="text-lg text-blue-100 leading-relaxed">
          Créez, gérez et exportez vos factures en toute simplicité.
          Une solution moderne avec CRM intégré.
        </p>

        <router-link to="/facture">
          <button
            class="mt-4 inline-flex items-center justify-center
                   rounded-full bg-white text-blue-700
                   px-10 py-4 text-base font-semibold
                   shadow-md hover:shadow-lg
                   transition-transform hover:scale-[1.03]"
          >
            Créer ma facture
          </button>
        </router-link>
      </div>

      <!-- IMAGE -->
      <div class="flex justify-center lg:justify-end">
        <img
          :src="heroIllustration"
          alt="Génération de facture Factgen"
          class="w-full max-w-md lg:max-w-xl"
          loading="eager"
        />
      </div>
    </div>

    <!-- WAVE -->
    <svg
      class="absolute bottom-0 left-0 w-full h-28"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M0,160L80,170C160,181,320,203,480,202.7C640,203,800,181,960,170.7C1120,160,1280,160,1360,160L1440,160V320H0Z"
      />
    </svg>
  </section>

  <!-- COUNTERS (SURFACE BLANCHE) -->
  <section class="bg-white py-24">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">

        <!-- FACTURES -->
        <div class="space-y-3">
          <div class="text-5xl font-bold text-blue-600">
            {{ formattedInvoices }}
          </div>
          <p class="text-gray-600 text-lg">
            Factures générées
          </p>
        </div>

        <!-- SATISFACTION -->
        <div class="space-y-3">
          <div class="text-5xl font-bold text-indigo-600">
            {{ satisfaction }}%
          </div>
          <p class="text-gray-600 text-lg">
            Satisfaction utilisateurs
          </p>
        </div>

        <!-- COÛT -->
        <div class="space-y-3">
          <div class="text-5xl font-bold text-gray-800">
            {{ cost }}€
          </div>
          <p class="text-gray-600 text-lg">
            Coût d’utilisation
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
<script setup>
import heroIllustration from '../../assets/hand_drawn.png'
import { ref, onMounted, computed } from 'vue'

const invoices = ref(0)
const satisfaction = ref(0)
const cost = ref(0)

const finalInvoices = 10000
const finalSatisfaction = 99.9
const finalCost = 0

const formattedInvoices = computed(() =>
  invoices.value >= 1000 ? `+${(invoices.value / 1000).toFixed(0)}k` : invoices.value
)

function animateCounter(target, finalValue, decimals = 0, duration = 2000) {
  const start = performance.now()

  function update(time) {
    const progress = Math.min((time - start) / duration, 1)
    const value = finalValue * progress
    target.value = decimals ? value.toFixed(decimals) : Math.round(value)

    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  animateCounter(invoices, finalInvoices)
  animateCounter(satisfaction, finalSatisfaction, 1)
  animateCounter(cost, finalCost)
})
</script>
