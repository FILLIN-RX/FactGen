<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Questions fréquentes
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400">
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
  </section>
</template>

<script setup>
import { reactive, defineProps } from 'vue';
import FAQItem from './FAQItem.vue';

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
});

const isOpen = reactive({});

const toggle = (index) => {
  isOpen[index] = !isOpen[index];
};
</script>