<template>
  <section class="relative bg-gray-50 overflow-hidden">

    <!-- TOP WAVE -->
    <svg
      class="absolute top-0 left-0 w-full h-24 sm:h-32 md:h-40 text-gray-100"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M0,96L80,117.3C160,139,320,181,480,202.7C640,224,800,224,960,213.3C1120,203,1280,181,1360,160L1440,139L1440,0L0,0Z"
      />
    </svg>

    <!-- CONTENT -->
    <div class="relative z-10 pt-32 md:pt-40 pb-32 md:pb-40
                container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Questions fréquentes
        </h2>
        <p class="text-xl text-gray-600">
          Tout ce que vous devez savoir sur Factgen
        </p>
      </div>

      <div class="space-y-4">
        <FAQItem
          v-for="(item, index) in sections"
          :key="index"
          :item="item"
          :is-open="isOpen[index]"
          @toggle="toggle(index)"
        />
      </div>
    </div>

<!-- BOTTOM WAVE -->
<svg
  class="absolute bottom-0 left-0 w-full h-24 sm:h-32 md:h-40"
  viewBox="0 0 1440 320"
  preserveAspectRatio="none"
  fill="#1E40AF"
  aria-hidden="true"
>
  <path
    d="M0,192L80,181.3C160,171,320,149,480,144C640,139,800,149,960,170.7C1120,192,1280,224,1360,234.7L1440,245L1440,320L0,320Z"
  />
</svg>


  </section>
</template>
<script setup>
import { reactive, defineProps } from 'vue'
import FAQItem from './FAQItem.vue'

defineProps({
  sections: {
    type: Array,
    required: true
  }
})

const isOpen = reactive({})

const toggle = (index) => {
  isOpen[index] = !isOpen[index]
}
</script>
