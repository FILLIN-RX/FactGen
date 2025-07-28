<!-- components/templates/TemplatesSection.vue -->
<template>
  <section class="py-12 px-4 max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-2">Modèles de facture professionnels</h2>
      <p class="text-gray-600">Choisissez le design qui correspond à votre entreprise</p>
    </div>
    
    <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      <TemplateCard
        v-for="tpl in templateStore.templates"
        :key="tpl.id"
        :template="tpl"
        class="break-inside-avoid"
      />
    </div>
  </section>
</template>

<script setup>
import { useTemplateStore } from '@/stores/template'
import TemplateCard from '@/components/templates/TemplateCard.vue'

const templateStore = useTemplateStore()
</script>