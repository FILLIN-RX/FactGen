<script setup>
import { computed, watch } from "vue";
import { useFacturesStore } from "@/stores/Facture";

import { Doughnut } from "vue-chartjs";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const facturesStore = useFacturesStore();

// Charger les factures au montage du composant (ou ailleurs avant)
await facturesStore.chargerFactures();

// Dans StatStatus.vue
const statutKeys = ["paye", "en_attente", "en_retard", "brouillon", "annule"];
const labels = ["Payée", "En attente", "En retard", "Brouillon", "Annulée"];

const data = computed(() => {
  const counts = facturesStore.facturesParStatutCount || {};
  
  return {
    labels,
    datasets: [
      {
        label: "Factures par statut",
       backgroundColor: [
  "#4ade80", // paye - vert
  "#facc15", // en_attente - jaune
  "#f87171", // en_retard - rouge
  "#9ca3af", // brouillon - gris
  "#d946ef", // annule - violet
],
        data: statutKeys.map((key) => counts[key] || 0),
        borderWidth: 1,
      },
    ],
  };
});
</script>

<template>
  <div class="max-w-sm mx-auto p-4">
    <h2 class="text-lg font-semibold mb-4">Répartition des factures</h2>
    <div v-if="facturesStore.loading">Chargement...</div>
    <Doughnut v-else :data="data" />
  </div>
</template>

<style scoped>
/* Optionnel : styles pour centrer le graphique, etc. */
</style>
