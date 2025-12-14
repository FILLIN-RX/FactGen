<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
    <InvoiceHeader
      :resultCount="facturesFiltrees.length"
      :showFilters="showFilters"
      @toggle-filters="showFilters = !showFilters"
      @create="creer"
    />

    <div class="px-3 py-4 sm:px-6 sm:py-6 lg:px-8 max-w-7xl mx-auto">
      <InvoiceFilters
        v-model:search-term="searchTerm"
        v-model:selected-client="selectedClient"
        v-model:selected-status="selectedStatus"
        :clients="clients"
        :showFilters="showFilters"
        :isMobile="isMobile"
        @clear-filters="clearFilters"
        @hide-filters="showFilters = false"
      />

      <InvoiceFormWrapper v-if="open" @close="open = false">
        <FactureForm
          :template-id="selectedTemplateId"
          @close="open = false"
          @created="onFactureCreated"
        />
      </InvoiceFormWrapper>

      <InvoiceStats :totalCount="invoiceStore.factures.length" :totalAmount="totalAmount" :pendingCount="pendingCount" />

      <div v-if="invoiceStore.loading" class="text-center py-12 px-4">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <LoadinApp />
          <p class="text-center text-slate-600 mt-4">Chargement des facture...</p>
        </div>
      </div>

      <div v-else-if="facturesFiltrees.length === 0" class="text-center py-12 px-4">
        <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

      <div v-else class="space-y-2 sm:space-y-3">
        <InvoiceListItem 
          v-for="(facture, index) in facturesFiltrees" 
          :key="facture.id" 
          :invoice="facture"
          @select="invoiceStore.selectionnerFacture(facture, index)"
          class="hover:shadow-md transition-shadow duration-200" 
        />
      </div>
    </div>

    <InvoiceDetailModal 
      v-if="invoiceStore.selectedFacture" 
      :invoice="invoiceStore.selectedFacture"
      @close="invoiceStore.clearSelection()" 
      @delete="confirmerSuppression" 
      :societer="infoEntreprise"
      :is-downloading="isDownloading" 
    />

    <InvoiceDeleteModal
      v-if="showDeleteConfirm"
      :invoice-number="invoiceStore.selectedFacture?.numero"
      :is-deleting="isDeleting"
      @cancel="showDeleteConfirm = false"
      @confirm="supprimerFacture"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import router from "../router";
import { useFacturesStore } from "../stores/Facture";
import { useAppStore } from "../stores/app";
import { useRoute } from "vue-router";
import { getInfoEntreprise } from "@/services/api";
import { showToastMessage } from '../composables/useToast';

// --- Nouveaux Composants Importés ---
import InvoiceHeader from "../components/factures/InvoiceHeader.vue";
import InvoiceFilters from "../components/factures/InvoiceFilters.vue";
import InvoiceStats from "../components/factures/InvoiceStats.vue";
import InvoiceFormWrapper from "../components/factures/InvoiceFormWrapper.vue";
import InvoiceDeleteModal from "../components/factures/InvoiceDeleteModal.vue";
// --- Composants Existants/Shared ---
import InvoiceListItem from "../components/factures/InvoiceListItem.vue";
import InvoiceDetailModal from "../components/factures/InvoiceDetailModal.vue";
import FactureForm from "../components/FactureForm.vue";
import LoadinApp from "../components/LoadinApp.vue";
// ------------------------------------

const searchTerm = ref("");
const selectedClient = ref("");
const selectedStatus = ref("");
const clients = ref([]);
const open = ref(false); // État d'ouverture du formulaire de création
const isDownloading = ref(false);
const showDeleteConfirm = ref(false);
const isDeleting = ref(false);
const infoEntreprise = ref(null);
const showFilters = ref(false); // État d'ouverture des filtres en mobile
const route = useRoute();

// Stores
const invoiceStore = useFacturesStore();
const appStore = useAppStore();

// Détection mobile
const isMobile = computed(() => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 1024;
  }
  return false;
});

// Récupérer le template ID de l'URL pour le formulaire de création
const selectedTemplateId = ref(route.query.template || 'moderne');

// --- Fonctions de Data Fetching et Logique Principale ---

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

onMounted(async () => {
  appStore.setLoading(true);
  try {
    await Promise.all([invoiceStore.chargerFactures(), fetchEntreprise()]);

    const uniqueClients = new Set(
      invoiceStore.factures.map((f) => f.client_data?.nom).filter(Boolean)
    );
    clients.value = Array.from(uniqueClients).sort();
    
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    showToastMessage("Erreur lors du chargement des données", "error");
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

// --- Méthodes ---

function creer() {
  router.push('/NewInvoice');
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
    showToastMessage(`Facture #${invoiceNumber} créée avec succès !`, "success");
  } catch (error) {
    showToastMessage("Erreur lors de l'actualisation des factures", "error");
  }
}

function confirmerSuppression() {
  showDeleteConfirm.value = true;
}

async function supprimerFacture() {
  try {
    isDeleting.value = true;
    await invoiceStore.supprimerFacture(invoiceStore.selectedIndex);
    showDeleteConfirm.value = false;
    invoiceStore.clearSelection();
    showToastMessage("Facture supprimée avec succès !", "success");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    showToastMessage("Erreur lors de la suppression de la facture", "error");
  } finally {
    isDeleting.value = false;
  }
}

// --- Computed Properties ---

const facturesFiltrees = computed(() => {
  return invoiceStore.factures.filter((f) => {
    const matchClient =
      selectedClient.value === "" || f.client_data?.nom === selectedClient.value;

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