<template>
  <div class="p-8 space-y-8">
    <!-- Informations entreprise et client -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3
          class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3"
        >
          De
        </h3>
        <div v-if="societer" class="bg-slate-50 rounded-xl p-4">
          <h4 class="font-bold text-slate-800 text-lg mb-2">
            {{ societer.nom || "Nom de l'entreprise" }}
          </h4>
          <p class="text-slate-600 text-sm">
            {{ societer.email || "email@entreprise.com" }}
          </p>
          <p class="text-slate-600 text-sm whitespace-pre-line">
            {{ societer.adresse || "Adresse de l'entreprise" }}
          </p>
        </div>
        <div v-else class="bg-slate-50 rounded-xl p-4">
          <h4 class="font-bold text-slate-800 text-lg mb-2">
            Nom de l'entreprise
          </h4>
          <p class="text-slate-600 text-sm">email@entreprise.com</p>
          <p class="text-slate-600 text-sm whitespace-pre-line">
            Adresse de l'entreprise
          </p>
        </div>
      </div>

      <div>
        <h3
          class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3"
        >
          À
        </h3>
        <div class="bg-blue-50 rounded-xl p-4">
          <h4 class="font-bold text-slate-800 text-lg mb-2">
            {{ client.nom || "Nom du client" }}
          </h4>
          <p v-if="client.email" class="text-slate-600 text-sm">
            {{ client.email }}
          </p>
          <p
            v-if="client.address"
            class="text-slate-600 text-sm whitespace-pre-line"
          >
            {{ client.address }}
          </p>
        </div>
      </div>
    </div>

    <!-- Tableau des produits -->
    <div>
      <h3
        class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4"
      >
        Détail des prestations
      </h3>
      <div class="border border-slate-200 rounded-xl overflow-hidden">
        <div class="bg-slate-50 px-6 py-4">
          <div
            class="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-700"
          >
            <div class="col-span-6">Description</div>
            <div class="col-span-2 text-center">Qté</div>
            <div class="col-span-2 text-right">Prix unit.</div>
            <div class="col-span-2 text-right">Total</div>
          </div>
        </div>

        <div class="divide-y divide-slate-200">
          <div
            v-for="(produit, index) in produits"
            :key="index"
            class="px-6 py-4"
          >
            <div class="grid grid-cols-12 gap-4 text-sm">
              <div class="col-span-6 text-slate-800">
                {{ produit.nom || "Produit sans nom" }}
              </div>
              <div class="col-span-2 text-center text-slate-800">
                {{ produit.quantite }}
              </div>
              <div class="col-span-2 text-right text-slate-800">
                {{ Number(produit.prix).toFixed(2) }} {{setting.currency}}
              </div>
              <div class="col-span-2 text-right font-semibold text-slate-800">
                {{ (produit.prix * produit.quantite).toFixed(2) }} {{setting.currency}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Totaux -->
    <div class="bg-slate-50 rounded-xl p-6">
      <div class="space-y-3">
        <div class="flex justify-between text-slate-600">
          <span>Sous-total HT</span>
          <span class="font-medium">{{ totalHT.toFixed(2) }} {{setting.currency}}</span>
        </div>

        <div
          v-if="montantReduction > 0"
          class="flex justify-between text-red-600"
        >
          <span
            >Réduction
            {{
              reduction.type === "pourcentage" ? `(${reduction.valeur}%)` : ""
            }}</span
          >
          <span class="font-medium">-{{ montantReduction.toFixed(2) }} {{setting.currency}}</span>
        </div>

        <div class="border-t border-slate-200 pt-3">
          <div class="flex justify-between text-lg font-bold text-slate-800">
            <span>Total TTC</span>
            <span>{{ totalTTC.toFixed(2) }} {{setting.currency}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Informations supplémentaires -->
    <div
      v-if="suplement"
      class="bg-amber-50 border border-amber-200 rounded-xl p-6"
    >
      <h3 class="text-sm font-semibold text-amber-800 mb-3">
        Informations supplémentaires
      </h3>
      <p class="text-amber-700 text-sm whitespace-pre-line">{{ suplement }}</p>
    </div>

    <!-- Footer -->
    <div class="text-center pt-8 border-t border-slate-200">
      <p class="text-xs text-slate-500">
        Facture générée le
        {{ formatDate(new Date().toISOString().substring(0, 10)) }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import societer from "../models/societer";
import Facture from "../models/facture";
import { formatCurrency } from "../utils/format";
import { useSettingsStore } from "../stores/setting";
const setting = useSettingsStore();
// Props :
defineProps({
  societer: Object,
  client: Object,
  produits: Array,
  totalHT: Number,
  totalTTC: Number,
  montantReduction: Number,
  reduction: Object,
  suplement: String,
  date_emission: String,
  date_echeance: String,
});

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
