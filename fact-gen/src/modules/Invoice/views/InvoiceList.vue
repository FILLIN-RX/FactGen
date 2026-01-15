<template>
    <div class="space-y-8">
        <!-- Header Section -->
        <InvoiceHeader :resultCount="facturesFiltrees.length" :showFilters="showFilters"
            :activeFiltersCount="activeFiltersCount" @toggle-filters="showFilters = !showFilters" @create="creer" />

        <!-- Main Content Area -->
        <div class="max-w-7xl mx-auto">
            <!-- Stats Overview -->
            <InvoiceStats :totalCount="invoiceStore.factures.length" :totalAmount="totalAmount"
                :pendingCount="pendingCount" />

            <!-- Filters Panel -->
            <InvoiceFilters v-model:search-term="searchTerm" v-model:selected-client="selectedClient"
                v-model:selected-status="selectedStatus" :clients="clients" :showFilters="showFilters"
                :isMobile="isMobile" @clear-filters="clearFilters" @hide-filters="showFilters = false" />

            <!-- Loading State -->
            <div v-if="invoiceStore.loading"
                class="card-outlined p-12 bg-white flex flex-col items-center justify-center">
                <LoadinApp />
                <p class="text-xs text-surface-on-variant mt-4 font-medium uppercase tracking-widest">Connexion
                    sécurisée aux données...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="facturesFiltrees.length === 0" class="card-outlined p-16 bg-white text-center">
                <div class="w-20 h-20 mx-auto bg-[#F8F9FA] rounded-full flex items-center justify-center mb-6">
                    <MagnifyingGlassIcon class="w-10 h-10 text-surface-on-variant" />
                </div>
                <h3 class="text-xl font-bold text-[#1A1C1E] mb-2">Aucun document trouvé</h3>
                <p class="text-sm text-surface-on-variant mb-6 max-w-sm mx-auto">Ajustez vos filtres ou créez une
                    nouvelle facture pour commencer votre suivi financier.</p>
                <button @click="clearFilters" class="btn-outlined px-6 py-2 text-sm">Effacer tous les filtres</button>
            </div>

            <!-- Invoices List -->
            <div v-else class="space-y-4">
                <InvoiceListItem v-for="(facture, index) in facturesFiltrees" :key="facture.id" :invoice="facture"
                    @select="invoiceStore.selectionnerFacture(facture, index)" />
            </div>
        </div>

        <!-- Modals -->
        <InvoiceDetailModal v-if="invoiceStore.selectedFacture" :invoice="invoiceStore.selectedFacture"
            @close="invoiceStore.clearSelection()" @delete="confirmerSuppression" :societer="infoEntreprise"
            :is-downloading="isDownloading" />

        <transition name="fade">
            <InvoiceDeleteModal v-if="showDeleteConfirm" :invoice-number="invoiceStore.selectedFacture?.numero"
                :is-deleting="isDeleting" @cancel="showDeleteConfirm = false" @confirm="supprimerFacture" />
        </transition>

        <!-- Creation Form Wrapper (Slide-over / Modal) -->
        <InvoiceFormWrapper v-if="open" @close="open = false">
            <FactureForm :template-id="selectedTemplateId" @close="open = false" @created="onFactureCreated" />
        </InvoiceFormWrapper>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFacturesStore } from "@/modules/Invoice/stores/invoice.store";
import { useAppStore } from "@/shared/stores/app.store";
import { getInfoEntreprise } from "@/shared/services/api";
import { showToastMessage } from '@/composables/useToast';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

// Components
import InvoiceHeader from "../components/InvoiceHeader.vue";
import InvoiceFilters from "../components/InvoiceFilters.vue";
import InvoiceStats from "../components/InvoiceStats.vue";
import InvoiceFormWrapper from "../components/InvoiceFormWrapper.vue";
import InvoiceDeleteModal from "../components/InvoiceDeleteModal.vue";
import InvoiceListItem from "../components/InvoiceListItem.vue";
import InvoiceDetailModal from "../components/InvoiceDetailModal.vue";
import FactureForm from "../components/FactureForm/InvoiceForm.vue";
import LoadinApp from "@/shared/components/LoadinApp.vue";

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
const selectedTemplateId = ref(route.query.template || 'moderne');

const activeFiltersCount = computed(() => {
    let count = 0;
    if (searchTerm.value) count++;
    if (selectedClient.value) count++;
    if (selectedStatus.value) count++;
    return count;
});

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

function creer() { router.push('/NewInvoice'); }
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
