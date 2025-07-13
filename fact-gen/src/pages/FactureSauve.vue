<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
    <!-- Header mobile optimisé -->
    <div class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200/60">
      <div class="px-3 py-2.5 sm:px-6 sm:py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 sm:gap-3">
            <div
              class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg class="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-base font-bold text-slate-900 sm:text-lg">
                Factures
              </h1>
              <p class="text-xs text-slate-500 leading-none">
                {{ facturesFiltrees.length }} résultat(s)
              </p>
            </div>
          </div>

          <!-- Actions mobiles compactes -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            <button @click="showFilters = !showFilters"
              class="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              :class="{ 'bg-blue-100 text-blue-600': showFilters }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707L11 19.414V12.293a1 1 0 00-.293-.707L4.293 5.172A1 1 0 014 4.586V4z" />
              </svg>
            </button>

            <button @click="creer"
              class="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="text-sm">Créer</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-3 py-4 sm:px-6 sm:py-6 lg:px-8 max-w-7xl mx-auto">
      <!-- Filtres mobile optimisés -->
      <div class="mb-4 sm:mb-6 transition-all duration-300 overflow-hidden" :class="showFilters || !isMobile
          ? 'max-h-screen opacity-100'
          : 'max-h-0 opacity-0 lg:max-h-screen lg:opacity-100'
        ">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200/60 p-3 sm:p-4 lg:p-6">
          <div class="space-y-3 sm:space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4">
            <!-- Recherche mobile -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Rechercher</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input v-model="searchTerm" placeholder="Numéro, client..."
                  class="block w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
            </div>

            <!-- Filtres sur une ligne mobile -->
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-1 lg:grid-cols-1">
              <!-- Client -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Client</label>
                <select v-model="selectedClient"
                  class="block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">Tous</option>
                  <option v-for="nom in clients" :key="nom" :value="nom">
                    {{ nom }}
                  </option>
                </select>
              </div>

              <!-- Statut -->
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Statut</label>
                <select v-model="selectedStatus"
                  class="block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">Tous</option>
                  <option value="en_attente">🟡 En attente</option>
                  <option value="paye">🟢 Payé</option>
                  <option value="annule">🔴 Annulé</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Actions filtres compactes -->
          <div class="flex justify-between items-center mt-3 pt-3 border-t border-slate-200">
            <button @click="clearFilters"
              class="text-xs sm:text-sm text-slate-600 hover:text-slate-800 font-medium transition-colors">
              Effacer les filtres
            </button>
            <button @click="showFilters = false"
              class="lg:hidden text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Masquer
            </button>
          </div>
        </div>
      </div>

      <!-- Formulaire de création mobile optimisé -->
      <div v-if="open" class="mb-4 sm:mb-6">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div
            class="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 class="text-base sm:text-lg font-semibold text-slate-900">
              Nouvelle facture
            </h3>
            <button @click="open = false" class="p-1 hover:bg-slate-200 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-3 sm:p-4 lg:p-6">
            <FactureForm v-if="open" :template-id="selectedTemplateId" @close="open = false"
              @created="onFactureCreated" />
          </div>
        </div>
      </div>

      <!-- Statistiques mobile optimisées -->
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div
          class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 sm:p-4 lg:p-6 border border-blue-200/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-medium text-blue-700">Total</p>
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mt-0.5">
                {{ invoiceStore.factures.length }}
              </p>
            </div>
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 sm:p-4 lg:p-6 border border-emerald-200/50">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-medium text-emerald-700">
                Montant
              </p>
              <p class="text-sm sm:text-base lg:text-2xl font-bold text-emerald-900 mt-0.5">
                {{ formatPrice(totalAmount) }}€
              </p>
            </div>
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3 sm:p-4 lg:p-6 border border-amber-200/50 col-span-2 lg:col-span-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs sm:text-sm font-medium text-amber-700">
                En attente
              </p>
              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-amber-900 mt-0.5">
                {{ pendingCount }}
              </p>
            </div>
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-amber-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- États vides optimisés -->
      <div v-if="!invoiceStore.hasInvoices" class="text-center py-12 px-4">
        <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
          Aucune facture
        </h3>
        <p class="text-sm sm:text-base text-slate-600 mb-6 max-w-sm mx-auto">
          Commencez par créer votre première facture pour gérer vos finances.
        </p>
        <button @click="creer"
          class="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Créer une facture
        </button>
      </div>

      <div v-else-if="facturesFiltrees.length === 0" class="text-center py-12 px-4">
        <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
          Aucun résultat
        </h3>
        <p class="text-sm sm:text-base text-slate-600 mb-6">
          Modifiez vos critères de recherche.
        </p>
        <button @click="clearFilters"
          class="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors">
          Effacer les filtres
        </button>
      </div>

      <!-- Liste des factures -->
      <div v-else class="space-y-2 sm:space-y-3">
        <InvoiceListItem v-for="(facture, index) in facturesFiltrees" :key="facture.id" :invoice="facture"
          @select="invoiceStore.selectionnerFacture(facture, index)"
          class="hover:shadow-md transition-shadow duration-200" />
      </div>
    </div>

    <!-- Modal de détail -->
    <InvoiceDetailModal v-if="invoiceStore.selectedFacture" :invoice="invoiceStore.selectedFacture"
      @close="invoiceStore.clearSelection()" @delete="confirmerSuppression" :societer="infoEntreprise"
      :is-downloading="isDownloading" />

    <!-- Modal de confirmation de suppression mobile optimisé -->
    <div v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div class="p-4 sm:p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-slate-900">
                Confirmer la suppression
              </h3>
              <p class="text-xs sm:text-sm text-slate-600">
                Action irréversible
              </p>
            </div>
          </div>

          <p class="text-sm sm:text-base text-slate-700 mb-6">
            Supprimer la facture
            <span class="font-semibold">#{{ invoiceStore.selectedInvoice?.numero }}</span>
            ?
          </p>

          <div class="flex gap-3">
            <button @click="showDeleteConfirm = false"
              class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors text-sm sm:text-base"
              :disabled="isDeleting">
              Annuler
            </button>
            <button @click="supprimerFacture"
              class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              :disabled="isDeleting">
              <div v-if="isDeleting"
                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {{ isDeleting ? "Suppression..." : "Supprimer" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed,watch } from "vue";
import { useFacturesStore } from "../stores/Facture";
import InvoiceListItem from "../components/factures/InvoiceListItem.vue";
import InvoiceDetailModal from "../components/factures/InvoiceDetailModal.vue";
import { telechargerPDF, getInfoEntreprise } from "@/services/api";
import FactureTemp from "../components/FactureTemp.vue";
import { useToast } from "vue-toastification";
import { useAppStore } from "../stores/app";
import { showToast } from "../composables/useToast";
import FactureForm from "../components/FactureForm.vue";
import { useRoute } from "vue-router";

const toast = useToast();

// Variables réactives
const searchTerm = ref("");
const selectedClient = ref("");
const selectedStatus = ref("");
const clients = ref([]);
const open = ref(false);
const isDownloading = ref(false);
const showDeleteConfirm = ref(false);
const isDeleting = ref(false);
const infoEntreprise = ref(null);
const showFilters = ref(false);
const route = useRoute()

// Détection mobile améliorée
const isMobile = computed(() => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 1024;
  }
  return false;
});

// Stores
const invoiceStore = useFacturesStore();
const appStore = useAppStore();

// Fonction pour récupérer les infos de l'entreprise
async function fetchEntreprise() {
  try {
    const data = await getInfoEntreprise();
    infoEntreprise.value = data;
    return data;
  } catch (error) {
    console.error("Erreur récupération infos entreprise", error);
    return null;
  }
}
const selectedTemplateId = ref(null); // à placer en haut

// Montage du composant
onMounted(async () => {
  appStore.setLoading(true);
  try {
    await Promise.all([invoiceStore.chargerFactures(), fetchEntreprise()]);

    const uniqueClients = new Set(
      invoiceStore.factures.map((f) => f.client_data?.nom).filter(Boolean)
    );
    clients.value = Array.from(uniqueClients).sort();
    // 👇 Si un modèle est passé via l'URL
    
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    showToast("Erreur lors du chargement des données", "error");
  } finally {
    appStore.setLoading(false);
  }
});
watch(() => route.query.template, (newTemplateId) => {
  if (newTemplateId) {
    selectedTemplateId.value = newTemplateId
    open.value = true
  }
}, { immediate: true })

// Fonctions utilitaires
function formatPrice(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}

function creer() {
  open.value = !open.value;
}

function clearFilters() {
  searchTerm.value = "";
  selectedClient.value = "";
  selectedStatus.value = "";
}

async function onFactureCreated() {
  try {
    open.value = false;
    await invoiceStore.chargerFactures();
    const lastInvoice = invoiceStore.factures[invoiceStore.factures.length - 1];
    const invoiceNumber = lastInvoice?.numero || "";
    showToast(`Facture #${invoiceNumber} créée avec succès !`, "success");
  } catch (error) {
    showToast("Erreur lors de l'actualisation des factures", "error");
  }
}

// Gestion de la suppression
function confirmerSuppression() {
  showDeleteConfirm.value = true;
}

async function supprimerFacture() {
  try {
    isDeleting.value = true;
    await invoiceStore.supprimerFacture(invoiceStore.selectedIndex);
    showDeleteConfirm.value = false;
    invoiceStore.clearSelection();
    showToast("Facture supprimée avec succès !", "success");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    showToast("Erreur lors de la suppression de la facture", "error");
  } finally {
    isDeleting.value = false;
  }
}

// Computed properties
const facturesFiltrees = computed(() => {
  return invoiceStore.factures.filter((f) => {
    const matchClient =
      selectedClient.value === "" ||
      f.client_data?.nom === selectedClient.value;

    const matchStatus =
      selectedStatus.value === "" || f.statut === selectedStatus.value;

    const matchSearch =
      searchTerm.value === "" ||
      f.client_data?.nom
        ?.toLowerCase()
        .includes(searchTerm.value.toLowerCase()) ||
      f.id?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      f.numero?.toString().includes(searchTerm.value);

    return matchClient && matchStatus && matchSearch;
  });
});

const totalAmount = computed(() => {
  return facturesFiltrees.value.reduce((total, facture) => {
    return total + (parseFloat(facture.montant_total) || 0);
  }, 0);
});

const pendingCount = computed(() => {
  return invoiceStore.factures.filter((f) => f.statut === "en_attente").length;
});
</script>
