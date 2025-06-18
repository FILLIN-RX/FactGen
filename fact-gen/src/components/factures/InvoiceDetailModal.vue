<template>
  <div
    v-if="invoice"
    class="fixed inset-0 bg-black/10 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-lg mx-auto font-sans max-w-4xl w-full max-h-[90vh] overflow-y-auto"
    >
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-2xl font-bold">Facture: {{ invoice.id }}</h2>
          <p class="text-sm text-gray-500">{{ formatDate(invoice.date) }}</p>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <!-- Company Info -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div
            class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden shadow"
          >
            <img
              v-if="logoDataUrl"
              :src="logoDataUrl"
              alt="Logo"
              class="h-full w-full object-cover"
            />
          </div>
          <div v-if="invoice.societer">
            <h3 class="text-xl font-semibold">{{ invoice.societer.nom }}</h3>
            <p class="text-sm text-gray-600">{{ invoice.societer.email }}</p>
            <p class="text-sm text-gray-600">{{ invoice.societer.adresse }}</p>
          </div>
        </div>
      </div>

      <!-- Client Info -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
        <p><strong>Nom :</strong> {{ invoice.client_data.nom }}</p>
        <p><strong>Email :</strong> {{ invoice.client_data.email }}</p>
        <p><strong>Adresse :</strong> {{ invoice.client_data.address }}</p>
      </div>

      <!-- Products Table -->
      <div class="mb-8">
        <div
          class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300"
        >
          <div>Description</div>
          <div class="text-center">Quantité</div>
          <div class="text-center">Prix unitaire</div>
          <div class="text-right">Prix total</div>
        </div>
        <div
          v-for="(product, index) in invoice.produits || []"
          :key="index"
          class="grid grid-cols-4 p-3 border-b text-sm text-gray-800"
        >
          <div class="truncate">{{ product.nom }}</div>
          <div class="text-center">{{ product.quantite }}</div>
          <div class="text-center">{{ product.prix }} €</div>
          <div class="text-right">
            {{ formatPrice(product.quantite * product.prix) }} €
          </div>
        </div>
      </div>

      <!-- Totals -->
      <div class="grid grid-cols-2 gap-2 text-right text-gray-800 mb-4">
        <p><strong>Total HT :</strong> {{ invoice.montant_total }} €</p>
        <p v-if="invoice.reduction" class="text-red-500">
          <strong>Réduction :</strong> -{{ invoice.reduction.valeur }} €
        </p>
        <p class="col-span-2 font-bold text-lg">
          Total TTC : {{ invoice.montant_total }} €
        </p>
      </div>

      <!-- Additional Info -->
      <p class="text-sm text-gray-500 mt-2" v-if="invoice.suplement">
        Info supp : {{ invoice.suplement }}
      </p>

      <!-- Actions -->
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="$emit('download')"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          :disabled="isDownloading"
        >
          <span v-if="isDownloading">Téléchargement en cours...</span>
          <span v-else>Télécharger PDF</span>
        </button>
        <button
          @click="$emit('delete')"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
//import { formatDate, formatPrice } from '@/utils/formatters';

defineProps({
  invoice: Object,
  logoDataUrl: String,
  isDownloading: Boolean,
});

defineEmits(["close", "download", "delete"]);
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
}

function formatPrice(val) {
  if (typeof val !== "number") return "";
  return val.toFixed(2);
}
</script>
