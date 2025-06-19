<template>
  <div class="p-6 max-w-4xl mx-auto bg-white shadow rounded">
    <div class="mb-4 flex gap-4 flex-wrap items-center">
      <input
        v-model="searchTerm"
        placeholder="Rechercher une facture ou client..."
        class="border rounded px-3 py-2"
      />

      <select v-model="selectedClient" class="border rounded px-3 py-2">
        <option value="">Tous les factures</option>
        <option  value="" class="text-yellow-300">En attente</option>
        <option value="" class="text-green-400">Payer</option>
        <option v-for="nom in clients" :key="nom" :value="nom">
          {{ nom }}
        </option>
      </select>
    </div>

    <h1 class="text-2xl text-blue-600 font-bold mb-4">
      📄 Liste des factures sauvegardées
    </h1>

    <div v-if="!invoiceStore.hasInvoices" class="text-gray-600 py-4">
      Aucune facture sauvegardée pour le moment.
    </div>

    <ul v-else>
      <InvoiceListItem
        v-for="(facture, index) in facturesFiltrees"
        :key="facture.id"
        :invoice="facture"
        @select="invoiceStore.selectInvoice(facture, index)"
      />
    </ul>

    <InvoiceDetailModal
      v-if="invoiceStore.selectedInvoice"
      :invoice="invoiceStore.selectedInvoice"
      @close="invoiceStore.clearSelection()"
      @delete="invoiceStore.deleteInvoice(invoiceStore.selectedIndex)"
      @download="telecharger"
      :is-downloading="isDownloading"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useFacturesStore } from "../stores/Facture";
import InvoiceListItem from "../components/factures/InvoiceListItem.vue";
import InvoiceDetailModal from "../components/factures/InvoiceDetailModal.vue";
import { telechargerPDF } from "@/services/api";
const searchTerm = ref("");
const selectedClient = ref(""); // par défaut tous les clients
const clients = ref([]);

const invoiceStore = useFacturesStore();
const isDownloading = ref(false);
defineProps({
  invoice: Object,
});

onMounted(async() => {
 await invoiceStore.charger();
  const uniqueClients = new Set(
    invoiceStore.factures.map((f) => f.client_data?.nom)
  );
  clients.value = Array.from(uniqueClients).filter(Boolean);


});

const telecharger = async () => {
  try {
    isDownloading.value = true;
    await telechargerPDF(invoiceStore.selectedInvoice.id);
  } catch (error) {
    console.error("Erreur lors du téléchargement PDF :", error.message);
  } finally {
    isDownloading.value = false;
  }
};

// Liste filtrée des factures
const facturesFiltrees = computed(() => {
  return invoiceStore.factures.filter((f) => {
    const matchClient =
      selectedClient.value === "" ||
      f.client_data?.nom === selectedClient.value;
    const matchSearch =
      searchTerm.value === "" ||
      f.client_data?.nom
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchClient && matchSearch;
  });
});
</script>
