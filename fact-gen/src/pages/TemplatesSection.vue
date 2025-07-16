<!-- components/templates/TemplatesSection.vue -->
<template>
  <section class="py-12 px-4 h-screen max-w-7xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">📚 Modèles de facture professionnels</h2>
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      <TemplateCard
        v-for="tpl in templateStore.templates"
        :key="tpl.id"
        :template="tpl"
        @select="choisirModele"
      />
    </div>
  </section>
</template>

<script setup>
import { useTemplateStore } from '@/stores/template'
import TemplateCard from '@/components/templates/TemplateCard.vue'

const templateStore = useTemplateStore()

// Emit l'ID sélectionné vers le parent
const emit = defineEmits(['select'])
const choisirModele = (id) => emit('select', id)
</script>
