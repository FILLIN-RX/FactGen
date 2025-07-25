<!-- components/templates/TemplateCard.vue -->
<template>
  <div class="rounded-xl border shadow-sm p-4 flex flex-col hover:shadow-md transition-all duration-200">
    <img :src="template.previewUrl" :alt="template.nom" class="w-full rounded-md mb-3 h-70 object-cover border" />
    <h3 class="text-lg font-bold mb-1">{{ template.nom }}</h3>
    <p class="text-sm text-gray-500 mb-4">{{ template.description }}</p>
    <button
      @click="essayerModele"
      class="mt-auto bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors"
    >
      Essayer ce modèle
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  template: Object
})
const router = useRouter()

const essayerModele = () => {
  router.push({ name: 'FactureForm', query: { template: props.template.id } })
}


</script>
