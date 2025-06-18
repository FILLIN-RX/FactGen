<template>
  <div class="p-6 max-w-4xl mx-auto bg-white shadow rounded">
    <h1 class="text-2xl text-blue-600 font-bold mb-4">📄 Liste des factures sauvegardées</h1>
    
    <div v-if="!invoiceStore.hasInvoices" class="text-gray-600 py-4">
      Aucune facture sauvegardée pour le moment.
    </div>
    
    <ul v-else>
      <InvoiceListItem
        v-for="(invoice, index) in invoiceStore.factures"
        :key="invoice.id"
        :invoice="invoice"
        @select="invoiceStore.selectInvoice(invoice, index)"
      />
    </ul>

    <InvoiceDetailModal
      v-if="invoiceStore.selectedInvoice"
      :invoice="invoiceStore.selectedInvoice"
      @close="invoiceStore.clearSelection()"
      @delete="invoiceStore.deleteInvoice(invoiceStore.selectedIndex)"
      @download="telechargerPDF"
      :is-downloading="isDownloading"
    />
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
import { useFacturesStore } from '../stores/Facture';
import InvoiceListItem from '../components/factures/InvoiceListItem.vue';
import InvoiceDetailModal from '../components/factures/InvoiceDetailModal.vue';

const invoiceStore = useFacturesStore();
const isDownloading = ref(false);

onMounted(() => {
  invoiceStore.charger();
});

const telechargerPDF = async () => {
  const response = await axios.get(`/api/pdf/getpdf/${facture.id}`, {
    responseType: 'blob'
  });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `facture-${facture.id}.pdf`;
  link.click();
};

</script>