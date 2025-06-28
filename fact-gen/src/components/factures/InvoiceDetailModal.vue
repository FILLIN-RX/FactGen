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
        <div class="grid grid-cols-4">
          <h2 class="text-2xl font-bold col-span-3">
            Facture: {{ invoice.id }}
          </h2>
          <div>
            <p class="text-xl text-gray-600 justify-center">
              Fait le:{{ formatDate(invoice.date_emission) }}
            </p>
            <p class="text-red-500 text-xl">
              A payer avant le:{{ formatDate(invoice.date_echeance) }}
            </p>
          </div>
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
          <div class="text-center">{{ formatPrice(product.prix) }} €</div>
          <div class="text-right">
            {{ formatPrice(calculateProductTotal(product)) }} €
          </div>
        </div>
      </div>

      <!-- Totals -->
      <div class="text-right text-gray-800 mb-4 space-y-2">
        <div class="flex justify-between">
          <span>Sous-total HT :</span>
          <span>{{ formatPrice(sousTotal) }} €</span>
        </div>

        <div v-if="invoice.reduction" class="flex justify-between text-red-500">
          <span>Réduction :</span>
          <span>-{{ formatReduction() }}</span>
        </div>

        <div class="flex justify-between">
          <span><strong>Total HT :</strong></span>
          <span
            ><strong>{{ formatPrice(totalHt) }} €</strong></span
          >
        </div>

        <div class="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total TTC :</span>
          <span>{{ formatPrice(invoice.montant_total) }} €</span>
        </div>
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
import { computed } from "vue";

const props = defineProps({
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
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}

function calculateProductTotal(product) {
  const quantite = parseFloat(product.quantite) || 0;
  const prix = parseFloat(product.prix) || 0;
  return quantite * prix;
}

// Calcul du sous-total des produits
const sousTotal = computed(() => {
  if (!props.invoice?.produits) return 0;
  return props.invoice.produits.reduce((total, product) => {
    return total + calculateProductTotal(product);
  }, 0);
});

// Calcul du montant de la réduction
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

// Calcul du total HT (après réduction)
const totalHt = computed(() => {
  return sousTotal.value - montantReduction.value;
});

// Formatage de l'affichage de la réduction
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
