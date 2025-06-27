<template>
  <div
    v-if="facture"
    class="bg-white p-6 mt-6 facture-container rounded-xl shadow-lg mx-auto font-sans"
  >
    <div class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans">
      <h2 class="font-bold text-2xl mb-6 text-center text-gray-700">
        Aperçu de la facture
      </h2>
      <h2 class="text-underline">
        Date: {{ facture?.date_emission ? formatDate(facture.date_emission) : "" }}
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
          <div v-if="facture.societer">
            <h3 class="text-xl font-semibold">{{ facture.societer.nom }}</h3>
            <p class="text-sm text-gray-600">{{ facture.societer.email }}</p>
            <p class="text-sm text-gray-600">{{ facture.societer.adresse }}</p>
          </div>
        </div>
      </div>

      <!-- Informations client -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
        <div v-if="facture.client_data">
          <p><strong>Nom :</strong> {{ facture.client_data.nom }}</p>
          <p><strong>Email :</strong> {{ facture.client_data.email }}</p>
          <p><strong>Adresse :</strong> {{ facture.client_data.adresse }}</p>
        </div>
      </div>

      <!-- Produits -->
      <div class="mb-8" v-if="facture.produits && facture.produits.length > 0">
        <div
          class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300"
        >
          <div class="truncate">Description</div>
          <div class="text-center">Quantité</div>
          <div class="text-center">Prix unitaire</div>
          <div class="text-right">Prix total</div>
        </div>
        <div
          v-for="(p, i) in facture.produits"
          :key="i"
          class="grid grid-cols-4 p-3 border-b text-sm text-gray-800"
        >
          <div
            class="whitespace-normal sm:whitespace-nowrap sm:truncate sm:overflow-hidden"
          >
            {{ p.nom }}
          </div>
          <div class="text-center">{{ p.quantite }}</div>
          <div class="text-center">{{ formatPrice(p.prix) }} €</div>
          <div class="text-right">{{ formatPrice(p.prix * p.quantite) }} €</div>
        </div>
      </div>

      <!-- Totaux -->
      <div class="grid grid-cols-2 gap-2 text-right text-gray-800 mb-4">
        <p><strong>Total HT :</strong></p>
        <p>{{ formatPrice(totalHT) }} €</p>

        <template v-if="montantReduction > 0">
          <p class="text-red-500"><strong>Réduction :</strong></p>
          <p class="text-red-500">-{{ formatPrice(montantReduction) }} €</p>
        </template>

        <p class="text-lg font-bold">Total TTC :</p>
        <p class="text-lg font-bold">{{ formatPrice(totalTTC) }} €</p>
      </div>

      <!-- Supplément -->
      <div class="text-sm text-gray-600 italic" v-if="facture.suplement">
        {{ facture.suplement }}
      </div>
    </div>
  </div>
  <div v-else class="text-center p-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    <p class="mt-4 text-gray-600">Chargement de la facture...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const facture = ref(null);
const loading = ref(true);
const error = ref(null);

const props = defineProps({
  invoice: Object,
  logoDataUrl: String,
  isDownloading: Boolean,
});

const emit = defineEmits(["close", "download", "delete"]);

// Fonctions utilitaires
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString('fr-FR');
}

function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) return '0.00';
  return price.toFixed(2);
}

// Calculs des totaux
const totalHT = computed(() => {
  if (!facture.value?.produits) return 0;
  return facture.value.produits.reduce((total, produit) => {
    return total + (produit.prix * produit.quantite);
  }, 0);
});

const montantReduction = computed(() => {
  if (!facture.value?.reduction) return 0;
  
  const reduction = facture.value.reduction;
  if (reduction.type === 'montant') {
    return reduction.valeur;
  } else if (reduction.type === 'pourcentage') {
    return totalHT.value * (reduction.valeur / 100);
  }
  return 0;
});

const totalTTC = computed(() => {
  return totalHT.value - montantReduction.value;
});

// Chargement des données
onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get(
      `http://localhost:4000/api/factures/${route.params.id}`
    );
    facture.value = response.data;
    console.log("Facture reçue :", response.data);
  } catch (err) {
    console.error("Erreur lors du chargement de la facture:", err);
    error.value = "Erreur lors du chargement de la facture";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
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

.facture-container {
  page-break-inside: avoid !important;
  width: 794px; /* largeur A4 */
  min-height: 1123px; /* hauteur A4 */
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px;
}
</style>