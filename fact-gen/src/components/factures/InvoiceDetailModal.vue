<template>
  <div v-if="invoice"
    class="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex flex-col sm:items-center sm:justify-center p-0 sm:p-4"
    @click.self="$emit('close')">
    
    <!-- Header Mobile uniquement -->
    <div class="sm:hidden bg-white/90 backdrop-blur-sm border-b border-gray-200 px-3 py-2 flex items-center justify-between">
      <h2 class="text-sm font-semibold text-gray-800 truncate">Facture #{{ invoice.numero || invoice.id }}</h2>
      <button @click="$emit('close')"
        class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-2">
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Contenu principal -->
    <div ref="factureHtmlRef"
      class="bg-white flex-1 sm:flex-none w-full sm:max-w-6xl sm:max-h-[85vh] overflow-y-auto sm:rounded-2xl shadow-2xl animate-slideUp sm:animate-scaleIn relative">
      
      <!-- Header Desktop -->
      <div class="hidden sm:flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Facture #{{ invoice.numero || invoice.id }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ formatDate(invoice.date_emission) }}</p>
        </div>
        <button @click="$emit('close')"
          class="w-10 h-10 rounded-full bg-white/80 hover:bg-white hover:shadow-md flex items-center justify-center transition-all duration-200 group">
          <svg class="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Contenu de la facture -->
      <div class="p-2 sm:p-6 pb-16 sm:pb-6 text-xs sm:text-base">
        <component :is="currentTemplateComponent" 
          :invoice="invoice" 
          :client="client" 
          :produits="produits"
          :totalHT="totalHT" 
          :totalTTC="totalTTC" 
          :montantReduction="montantReduction" 
          :reduction="reduction"
          :suplement="suplement" 
          :date_emission="date_emission" 
          :date_echeance="date_echeance" 
          :societer="companyInfo" />
      </div>
    </div>

    <!-- Actions flottantes pour mobile / fixes pour desktop -->
    <div class="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2 safe-area-pb">
      <div class="grid grid-cols-3 gap-2">
        <button @click="downloadPDF()" :disabled="isDownloading"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-1 shadow-lg min-h-[45px] text-xs">
          <svg v-if="!isDownloading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
          <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span class="font-medium leading-tight">{{ isDownloading ? 'En cours' : 'PDF' }}</span>
        </button>

        <button @click="shareInvoice"
          class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-1 shadow-lg min-h-[45px] text-xs">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
          </svg>
          <span class="font-medium leading-tight">Partager</span>
        </button>

        <button @click="$emit('delete')"
          class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-2 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-1 shadow-lg min-h-[45px] text-xs">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
            </path>
          </svg>
          <span class="font-medium leading-tight">Supprimer</span>
        </button>
      </div>
    </div>

    <!-- Actions Desktop -->
    <div class="hidden sm:flex justify-center space-x-4 mt-6">
      <button @click="downloadPDF()" :disabled="isDownloading"
        class="min-w-[140px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        <svg v-if="!isDownloading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
          </path>
        </svg>
        <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>{{ isDownloading ? 'Téléchargement...' : 'Télécharger PDF' }}</span>
      </button>

      <button @click="shareInvoice"
        class="min-w-[120px] bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
        </svg>
        <span>Partager</span>
      </button>

      <button @click="$emit('delete')"
        class="min-w-[120px] bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
          </path>
        </svg>
        <span>Supprimer</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { telechargerPDF, getInfoEntreprise } from "../../services/api";
import { computed, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { showToastMessage } from "../../composables/useToast";
import { templateComponents } from "../../components/templates";
import { useFacturesStore } from "../../stores/Facture";
import { genererPDFs } from "../templates/utils/generateTemplates";

const factureStore = useFacturesStore();
const invoice = computed(() => factureStore.selectedFacture);
const client = computed(() => props.invoice?.client_data || {});
const produits = computed(() => props.invoice?.produits || []);
const totalHT = computed(() => sousTotal.value - montantReduction.value);
const totalTTC = computed(() => props.invoice?.montant_total || 0);

const reduction = computed(() => props.invoice?.reduction || null);
const suplement = computed(() => props.invoice?.suplement || "");
const date_emission = computed(() => props.invoice?.date_emission || "");
const date_echeance = computed(() => props.invoice?.date_echeance || "");
const toast = useToast();
const isDownloading = ref(false);
const factureHtmlRef = ref(null);

const currentTemplateComponent = computed(() => {
  return templateComponents[props.invoice.template || "moderne"];
});

const props = defineProps({
  invoice: Object,
  societer: Object,
});

// Events
const emit = defineEmits(["close", "download", "delete"]);

const infoEntreprise = ref(null);

// Si l'info n'est pas passée en props, on la récupère
onMounted(async () => {
  try {
    const data = await getInfoEntreprise();
    if (data) {
      infoEntreprise.value = data;
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'entreprise :", err);
  }
});

// Computed pour les informations de l'entreprise
const companyInfo = computed(() => {
  return (
    props.societer ||
    infoEntreprise.value ||
    props.invoice.societer || {
      nom: "Nom de l'entreprise",
      email: "email@entreprise.com",
      adresse: "Adresse de l'entreprise",
    }
  );
});

// Fonction de partage
const shareInvoice = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: `Facture #${invoice.value.numero || invoice.value.id}`,
        text: `Facture de ${companyInfo.value.nom} pour ${client.value.nom || 'Client'}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copier dans le presse-papier
      await navigator.clipboard.writeText(window.location.href);
      showToastMessage("Lien copié dans le presse-papier !", "success");
    }
  } catch (error) {
    console.error('Erreur lors du partage:', error);
    showToastMessage("Erreur lors du partage", "error");
  }
};

// Fonction de téléchargement PDF
const downloadPDF = async () => {
  try {
    isDownloading.value = true;
    console.log("template utilisé pour PDF :", props.invoice?.template);
    
    // Génération du HTML
    const htmlContent = genererPDFs(props.invoice.template, {
      ...props.invoice,
      client_data: props.invoice.client_data || {},
      societer: companyInfo.value,
    });

    await telechargerPDF({
      html: htmlContent,
      id: props.invoice.id,
      invoiceDate: props.invoice.date_emission,
      clientName: props.invoice.client_data?.nom,
    });

    emit("close");
    showToastMessage("PDF téléchargé avec succès !", "success");
  } catch (error) {
    console.error("Erreur de téléchargement du PDF", error);
    showToastMessage("Erreur lors du téléchargement du PDF", "error");
  } finally {
    isDownloading.value = false;
  }
};

// Fonctions utilitaires
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR");
}

function formatPrice(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}

function calculateProductTotal(product) {
  const quantite = parseFloat(product.quantite) || 0;
  const prix = parseFloat(product.prix) || 0;
  return quantite * prix;
}

// Calculs des totaux
const sousTotal = computed(() => {
  if (!props.invoice?.produits) return 0;
  return props.invoice.produits.reduce((total, product) => {
    return total + calculateProductTotal(product);
  }, 0);
});

const montantReduction = computed(() => {
  if (!props.invoice?.reduction) return 0;

  const reduction = props.invoice.reduction;
  if (reduction.type === "montant") {
    return parseFloat(reduction.valeur) || 0;
  } else if (reduction.type === "pourcentage") {
    const pourcentage = parseFloat(reduction.valeur) || 0;
    return sousTotal.value * (pourcentage / 100);
  }
  return 0;
});

const totalHt = computed(() => {
  return sousTotal.value - montantReduction.value;
});

function formatReduction() {
  if (!props.invoice?.reduction) return "";

  const reduction = props.invoice.reduction;
  if (reduction.type === "montant") {
    return `${formatPrice(reduction.valeur)} €`;
  } else if (reduction.type === "pourcentage") {
    return `${reduction.valeur}% (${formatPrice(montantReduction.value)} €)`;
  }
  return "";
}
</script>

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}

/* Support pour les zones de sécurité sur mobile */
.safe-area-pb {
  padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
}

/* Amélioration des performances d'animation */
@media (prefers-reduced-motion: reduce) {
  .animate-slideUp,
  .animate-scaleIn {
    animation: none;
  }
  
  button {
    transform: none !important;
  }
}

/* Scrollbar personnalisée pour webkit */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Styles pour les écrans très petits */
@media (max-width: 375px) {
  .grid-cols-3 > button {
    padding: 0.4rem 0.3rem;
    min-height: 40px;
    font-size: 0.65rem;
  }
  
  .grid-cols-3 > button svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  .sm\:hidden .px-3 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .text-xs {
    font-size: 0.7rem;
  }
}

/* Styles pour petits écrans (iPhone SE, etc.) */
@media (max-width: 320px) {
  .grid-cols-3 > button {
    padding: 0.3rem 0.2rem;
    min-height: 35px;
    font-size: 0.6rem;
    gap: 0.125rem;
  }
  
  .grid-cols-3 > button svg {
    width: 0.8rem;
    height: 0.8rem;
  }
}

/* Optimisation de la taille du contenu sur mobile */
@media (max-width: 640px) {
  /* Le contenu de la facture aura une taille de police plus petite */
  .text-xs {
    line-height: 1.3;
  }
  
  /* Réduction des marges internes */
  .p-2 {
    padding: 0.4rem;
  }
  
  /* Espacement réduit pour les boutons */
  .pb-16 {
    padding-bottom: 3.5rem;
  }
}

/* Styles pour les grands écrans */
@media (min-width: 1024px) {
  .sm\:max-w-6xl {
    max-width: 80rem;
  }
}

/* Style pour le titre tronqué sur mobile */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>