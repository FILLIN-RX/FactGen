<template>
  <li
    @click="$emit('select')"
    class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans cursor-pointer hover:bg-gray-50 transition-colors duration-200"
  >
    <div class="flex justify-between items-center">
      <div class="flex-1">
        <div class="flex items-center space-x-4">
          <span class="font-semibold text-blue-600">#{{ invoice.numero }}</span>
          <span class="text-gray-600">{{ formatDate(invoice.date) }}</span>
          <span class="text-sm text-gray-500" v-if="clientName">{{ clientName }}</span>
        </div>
      </div>
      <div class="text-right">
        <span class="text-lg font-bold text-green-600">{{ formatPrice(invoice.montant_total) }} €</span>
        <div class="text-xs text-gray-400" v-if="invoice.statut">
          {{ invoice.statut }}
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useClientsStore } from '@/stores/client.js'

const clientsStore = useClientsStore();

const props = defineProps({
  invoice: Object
});

defineEmits(['select']);

// Fonction pour formater le prix
function formatPrice(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}

// Fonction pour formater la date
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString('fr-FR');
}

// Récupérer le nom du client
const clientName = computed(() => {
  if (!props.invoice?.client_id) return "";
  
  const client = clientsStore.clients.find(c => c.id === props.invoice.client_id);
  return client ? client.nom : props.invoice.client_data?.nom || "";
});
</script>