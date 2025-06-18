<template>
  <div
    v-if="facture"
    class="bg-white p-6 mt-6  facture-container rounded-xl shadow-lg mx-auto font-sans"
  >
    <div class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans">
      <h2 class="font-bold text-2xl mb-6 text-center text-gray-700">
        Aperçu de la facture
      </h2>

      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div
            class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden shadow"
          >
            <img
              v-if="logoDataUrl"
              :src="logoDataUrl"
              alt="Logo"
              class="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 class="text-xl font-semibold">{{ societer.nom }}</h3>
            <p class="text-sm text-gray-600">{{ societer.email }}</p>
            <p class="text-sm text-gray-600">{{ societer.adresse }}</p>
          </div>
        </div>
      </div>

      <!-- Informations client -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
        <p><strong>Nom :</strong> {{ client.nom }}</p>
        <p><strong>Email :</strong> {{ client.email }}</p>
        <p><strong>Adresse :</strong> {{ client.adresse }}</p>
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
        <p>{{ totalHT.toFixed(2) }} €</p>

        <template v-if="montantReduction > 0">
          <p class="text-red-500"><strong>Réduction :</strong></p>
          <p class="text-red-500">-{{ montantReduction.toFixed(2) }} €</p>
        </template>

        <p class="text-lg font-bold">Total TTC :</p>
        <p class="text-lg font-bold">{{ totalTTC.toFixed(2) }} €</p>
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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const facture = ref(null)

// Style spécifique pour l'impression
const style = `
  @media print {
    body * {
      visibility: hidden;
    }
    .facture-container, .facture-container * {
      visibility: visible;
    }
    .facture-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }
`

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/factures/${route.params.id}`)
    facture.value = response.data
  } catch (error) {
    console.error("Erreur:", error)
  }
})
</script>

<style scoped>
.facture-container {
  width: 210mm; /* Format A4 */
  min-height: 297mm;
  margin: 0 auto;
  padding: 10mm;
  background: white;
}
</style>