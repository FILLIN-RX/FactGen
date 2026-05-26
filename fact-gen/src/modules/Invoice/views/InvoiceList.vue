<template>
  <div class="space-y-6">
    <InvoiceHeader :resultCount="facturesFiltrees.length" :showFilters="showFilters"
      :activeFiltersCount="activeFiltersCount" @toggle-filters="showFilters = !showFilters" @create="creer" />

    <InvoiceStats :totalCount="invoiceStore.factures.length" :totalAmount="totalAmount"
      :pendingCount="pendingCount" />

    <InvoiceFilters v-model:search-term="searchTerm" v-model:selected-client="selectedClient"
      v-model:selected-status="selectedStatus" :clients="clients" :showFilters="showFilters"
      :isMobile="isMobile" @clear-filters="clearFilters" @hide-filters="showFilters = false" />

    <n-card v-if="invoiceStore.loading">
      <n-spin size="large" class="flex justify-center py-12" />
    </n-card>

    <n-card v-else-if="facturesFiltrees.length === 0">
      <n-empty description="Aucun document trouvé">
        <template #extra>
          <n-button @click="clearFilters">Effacer tous les filtres</n-button>
        </template>
      </n-empty>
    </n-card>

    <div v-else class="space-y-3">
      <n-card v-for="facture in facturesFiltrees" :key="facture.id" size="small" hoverable
        @click="invoiceStore.selectionnerFacture(facture, invoiceStore.factures.indexOf(facture))">
        <div class="flex items-center justify-between">
          <div>
            <n-text strong>{{ facture.client_data?.nom || 'Client' }}</n-text>
            <n-tag :type="statutType(facture.statut)" size="small" class="ml-2">{{ facture.statut }}</n-tag>
          </div>
          <div class="text-right">
            <n-text strong>{{ formatPrice(facture.montant_total) }}</n-text>
            <n-text depth="3" class="block text-xs">{{ facture.date_emission }}</n-text>
          </div>
        </div>
      </n-card>
    </div>

    <invoice-detail-modal v-if="invoiceStore.selectedFacture" :invoice="invoiceStore.selectedFacture"
      @close="invoiceStore.clearSelection()" @delete="confirmerSuppression"
      :societer="infoEntreprise" :is-downloading="isDownloading" />

    <n-modal v-model:show="showDeleteConfirm" preset="dialog" type="warning"
      title="Confirmer la suppression" content="Cette action est irréversible."
      positive-text="Supprimer" negative-text="Annuler"
      @positive-click="supprimerFacture"
      @negative-click="showDeleteConfirm = false"
    />

    <invoice-form-wrapper v-if="open" @close="open = false">
      <facture-form :template-id="selectedTemplateId" @close="open = false" @created="onFactureCreated" />
    </invoice-form-wrapper>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFacturesStore } from "@/modules/Invoice/stores/invoice.store";
import { useAppStore } from "@/shared/stores/app.store";
import { getInfoEntreprise } from "@/shared/services/api";
import { showToastMessage } from "@/composables/useToast";

import InvoiceHeader from "../components/InvoiceHeader.vue";
import InvoiceFilters from "../components/InvoiceFilters.vue";
import InvoiceStats from "../components/InvoiceStats.vue";
import InvoiceFormWrapper from "../components/InvoiceFormWrapper.vue";
import InvoiceDetailModal from "../components/InvoiceDetailModal.vue";
import FactureForm from "../components/FactureForm/InvoiceForm.vue";

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
const route = useRoute();
const router = useRouter();

const invoiceStore = useFacturesStore();
const appStore = useAppStore();

const isMobile = computed(() => typeof window !== "undefined" && window.innerWidth < 1024);
const selectedTemplateId = ref(route.query.template || "moderne");

const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchTerm.value) count++;
  if (selectedClient.value) count++;
  if (selectedStatus.value) count++;
  return count;
});

function statutType(statut) {
  return { payee: "success", paye: "success", en_attente: "warning", en_retard: "error" }[statut] || "default";
}

function formatPrice(val) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(val || 0);
}

async function fetchEntreprise() {
  try {
    const data = await getInfoEntreprise();
    infoEntreprise.value = data;
  } catch (error) {
    console.error("Erreur entreprise", error);
  }
}

onMounted(async () => {
  try {
    await Promise.all([invoiceStore.chargerFactures(), fetchEntreprise()]);
    const uniqueClients = new Set(invoiceStore.factures.map((f) => f.client_data?.nom).filter(Boolean));
    clients.value = Array.from(uniqueClients).sort();
  } catch (error) {
    showToastMessage("Erreur de chargement", "error");
  }
});

watch(() => route.query.template, (newT) => {
  if (newT) {
    selectedTemplateId.value = newT;
    open.value = true;
  }
}, { immediate: true });

function creer() { router.push("/NewInvoice"); }

function clearFilters() {
  searchTerm.value = "";
  selectedClient.value = "";
  selectedStatus.value = "";
}

async function onFactureCreated() {
  open.value = false;
  await invoiceStore.chargerFactures();
  showToastMessage("Document créé avec succès !", "success");
}

function confirmerSuppression() { showDeleteConfirm.value = true; }

async function supprimerFacture() {
  try {
    isDeleting.value = true;
    await invoiceStore.supprimerFacture(invoiceStore.selectedIndex);
    showDeleteConfirm.value = false;
    invoiceStore.clearSelection();
    showToastMessage("Facture supprimée.", "success");
  } catch (error) {
    showToastMessage("Erreur de suppression", "error");
  } finally {
    isDeleting.value = false;
  }
}

const facturesFiltrees = computed(() => {
  return invoiceStore.factures.filter((f) => {
    const matchClient = !selectedClient.value || f.client_data?.nom === selectedClient.value;
    const matchStatus = !selectedStatus.value || f.statut === selectedStatus.value;
    const matchSearch = !searchTerm.value ||
      f.client_data?.nom?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      f.numero?.toString().includes(searchTerm.value);
    return matchClient && matchStatus && matchSearch;
  });
});

const totalAmount = computed(() => {
  return facturesFiltrees.value.reduce((total, f) => total + (parseFloat(f.montant_total) || 0), 0);
});

const pendingCount = computed(() => {
  return invoiceStore.factures.filter((f) => f.statut === "en_attente").length;
});
</script>
