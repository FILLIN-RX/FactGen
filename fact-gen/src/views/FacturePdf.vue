<template>
  <div
    v-if="facture"
    class="bg-white p-6 mt-6  facture-container  mx-auto font-sans"
  >
    <div class="bg-white p-6 mt-6  mx-auto font-sans">
      <h2 class="font-bold text-2xl mb-6 text-center text-gray-700">
        Aperçu de la facture
      </h2>

      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div
            class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden "
          >
            <img
              v-if="logoDataUrl"
              :src="logoDataUrl"
              alt="Logo"
              class="h-full w-full object-cover"
            />
          </div>
          <div v-if="societer">
            <h3 class="text-xl font-semibold">{{ societer.nom }}</h3>
            <p class="text-sm text-gray-600">{{ societer.email }}</p>
            <p class="text-sm text-gray-600">{{ societer.adresse }}</p>
          </div>
        </div>
      </div>

      <!-- Informations client -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
        <p v-if="client"><strong>Nom :</strong> {{ client.nom }}</p>
        <p v-if="client"><strong>Email :</strong> {{ client.email }}</p>
        <p v-if="client"><strong>Adresse :</strong> {{ client.adresse }}</p>
      </div>

      <!-- Produits -->
      <div class="mb-8">
        <div
          class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300"
        >
          <div class="truncate">Description</div>
          <div class="text-center">Quantité</div>
          <div class="text-center">Prix unitaire</div>
          <div class="text-right">Prix total</div>
        </div>
        <div
          v-for="(p, i) in produits"
          :key="i"
          class="grid grid-cols-4 p-3 border-b text-sm text-gray-800"
        >
          <div
            class="whitespace-normal sm:whitespace-nowrap sm:truncate sm:overflow-hidden"
          >
            {{ p.nom }}
          </div>

          <div class="text-center">{{ p.quantite }}</div>
          <div class="text-center">{{ p.prix.toFixed(2) }} €</div>
          <div class="text-right">{{ (p.prix * p.quantite).toFixed(2) }} €</div>
        </div>
      </div>

      <!-- Totaux -->
      <!-- Totaux -->
      <div class="grid grid-cols-2 gap-2 text-right text-gray-800 mb-4">
        <p><strong>Total HT :</strong></p>
        <p>{{ totalHt }} €</p>

        <template v-if="montantReduction > 0">
          <p class="text-red-500"><strong>Réduction :</strong></p>
          <p class="text-red-500">-{{ montantReduction }} €</p>
        </template>

        <p class="text-lg font-bold">Total TTC :</p>
        <p class="text-lg font-bold">{{ totalTTC }} €</p>
      </div>

      <!-- Supplément -->
      <div class="text-sm text-gray-600 italic">
        {{ suplement }}
      </div>
    </div>
  </div>
  <div v-else>Chargement de la facture...</div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useFacturesStore } from '@/stores/Facture'

const route = useRoute()
const factureStore = useFacturesStore()

const facture = ref(null)

// Logo & société (statique pour l’instant)
const logoDataUrl = ref('/logo.png')
const societer = ref({
  nom: 'LegacyTech SARL',
  adresse: 'Douala, Cameroun',
  email: 'contact@legacytech.com',
  telephone: '+237 6 XX XX XX XX',
})

// Données dérivées
const client = computed(() => facture.value?.client_data || {})
const produits = computed(() => facture.value?.produits || [])
const suplement = computed(() => facture.value?.suplement || '')

// Calculs
const totalTTC = computed(() => facture.value?.montant_total || 0)

const montantReduction = computed(() => {
  const reduction = facture.value?.reduction
  if (!reduction) return 0
  if (reduction.type === 'montant') return reduction.valeur
  if (reduction.type === 'pourcentage') {
    return parseFloat((totalTTC.value * reduction.valeur / 100).toFixed(2))
  }
  return 0
})

const totalHt = computed(() => {
  return parseFloat((totalTTC.value + montantReduction.value).toFixed(2))
})

onMounted(async () => {
  await factureStore.charger()
  facture.value = factureStore.factures.find(f => f.id === route.params.id)
})
</script>



<style>

.facture-container {
  width: 794px;      /* largeur A4 */
  min-height: 1123px; /* hauteur A4 */
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px; /* Ajuste si besoin */
}

@media print {
  body {
    margin: 0;
    font-size: 12px;
  }

  .page-break {
    page-break-before: always;
  }

  .no-break {
    page-break-inside: avoid;
  }
}

body {
  background: white;
  font-family: sans-serif;
}
</style>
