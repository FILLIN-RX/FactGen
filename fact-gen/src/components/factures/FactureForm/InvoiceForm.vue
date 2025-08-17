<template>
  <div class="flex">
    <!-- Form principal -->
    <div class="flex-1 bg-white p-6 rounded-lg shadow">
      <h1 class="text-xl font-semibold mb-6">Nouvelle facture</h1>

      <!-- Client -->
      <InvoiceClientSelect v-model="form.client" />

      <!-- Infos facture -->
      <InvoiceDetails v-model="form" />

      <!-- Lignes -->
      <InvoiceItems v-model="form.items" />

      <!-- Note -->
      <InvoiceNotes v-model="form.notes" />

      <!-- Paiement -->
      <InvoicePayments v-model="form.payments" />

      <!-- Totaux -->
      <div class="flex justify-end mt-6 text-right space-y-1">
        <div>
          <p class="text-sm">Total HT : {{ totalHT.toFixed(2) }} €</p>
          <p class="text-lg font-bold">Total dû : {{ totalTTC.toFixed(2) }} €</p>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <InvoiceSidebar />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InvoiceClientSelect from "./InvoiceClientSelect.vue";
import InvoiceDetails from "./InvoiceDetails.vue";
import InvoiceItems from "./InvoiceItems.vue";
import InvoiceNotes from "./InvoiceNotes.vue";
import InvoicePayments from "./InvoicePayments.vue";
import InvoiceSidebar from "./InvoiceSidebar.vue";

const form = ref({
  client: null,
  number: "TEST-3",
  date: new Date().toISOString().substring(0, 10),
  dueDate: "",
  items: [],
  notes: "",
  payments: [],
});

const totalHT = computed(() =>
  form.value.items.reduce((sum, item) => sum + item.qty * item.price, 0)
);

const totalTTC = computed(() =>
  form.value.items.reduce(
    (sum, item) => sum + item.qty * item.price * (1 + item.vat / 100),
    0
  )
);
</script>
