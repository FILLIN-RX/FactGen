<template>
  <div v-if="facture" class="p-4 sm:p-6">
    <h2 id="invoice-title" class="sr-only">Aperçu de la facture</h2>
    <TemplatePreview :invoice="facture" />
  </div>
  <div v-else class="text-center p-8" role="status" aria-live="polite">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" aria-hidden="true"></div>
    <p class="mt-4 text-gray-600">Chargement de la facture...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import TemplatePreview from "@/components/templates/TemplatePreview.vue";

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
