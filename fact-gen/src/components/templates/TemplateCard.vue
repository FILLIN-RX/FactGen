<!-- components/templates/TemplateCard.vue -->
<template>
  <div class="group rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
  <div class="relative overflow-hidden">
    <img
      :src="template.previewUrl"
      :alt="template.nom"
      loading="lazy"
      class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>

  <div class="p-5">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-xl font-bold text-gray-800">{{ template.nom }}</h3>
      <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PRO</span>
    </div>
    <p class="text-gray-600 mb-4">{{ template.description }}</p>

    <div class="grid grid-cols-2 gap-2">
      <button
        @click="showPreview = true"
        class="w-full bg-white border border-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
        aria-label="Aperçu en direct du modèle"
      >
        Aperçu
      </button>
      <button
        @click="essayerModele"
        class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-sm"
        aria-label="Utiliser ce modèle"
      >
        Utiliser
      </button>
    </div>
  </div>

  <Transition name="fade">
    <div v-if="showPreview" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" @click.self="showPreview = false">
      <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-800">
          <h4 class="text-lg font-semibold">Aperçu — {{ template.nom }}</h4>
          <button @click="showPreview = false" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800" aria-label="Fermer l'aperçu">×</button>
        </div>
        <div class="p-4">
          <TemplatePreview :invoice="sampleInvoice" :forceTemplateId="template.id" />
        </div>
      </div>
    </div>
  </Transition>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TemplatePreview from '@/components/templates/TemplatePreview.vue'

const props = defineProps({
  template: Object
})
const router = useRouter()
const showPreview = ref(false)

const sampleInvoice = {
  id: 'INV-2025-001',
  societer: { nom: 'Votre Société', email: 'contact@exemple.com', adresse: '12 Rue Exemple, Paris', logo: '' },
  client: { nom: 'Client Démo', email: 'client@demo.com', address: '5 Avenue Demo, Lyon' },
  produits: [
    { nom: 'Service A', quantite: 2, prix: 50 },
    { nom: 'Produit B', quantite: 1, prix: 99.9 }
  ],
  reduction: { type: 'montant', valeur: 10 },
  suplement: 'Merci pour votre confiance.',
  date_emission: new Date().toLocaleDateString('fr-FR'),
  date_echeance: new Date(Date.now() + 7*24*3600*1000).toLocaleDateString('fr-FR')
}

const essayerModele = () => {
  router.push({ name: 'FactureForm', query: { template: props.template.id } })
}
</script>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
</style>
