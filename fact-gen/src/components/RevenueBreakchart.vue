<script setup>
import { computed } from "vue";
import { useFacturesStore } from "@/stores/Facture";
import { Doughnut } from "vue-chartjs";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

const facturesStore = useFacturesStore();
await facturesStore.chargerFactures();

const keys = ["paye", "en_attente", "en_retard", "brouillon", "annule"];
const labels = ["Payée", "En attente", "En retard", "Brouillon", "Annulée"];
const colors = ["#10B981", "#F59E0B", "#EF4444", "#9CA3AF", "#D946EF"];

const counts = computed(() => {
  const data = facturesStore.facturesParStatutCount || {};
  return keys.map((k) => data[k] || 0);
});

const total = computed(() => counts.value.reduce((a, b) => a + b, 0));

const stats = computed(() =>
  keys.map((k, i) => ({
    label: labels[i],
    count: counts.value[i],
    color: colors[i],
    percent: total.value > 0 ? Math.round((counts.value[i] / total.value) * 100) : 0,
  }))
);

const chartData = computed(() => ({
  labels,
  datasets: [
    {
      backgroundColor: colors,
      data: counts.value,
      borderColor: "#fff",
      borderWidth: 1,
    },
  ],
}));

const options = {
  responsive: true,
  cutout: "75%",
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.raw} (${Math.round((ctx.raw / total.value) * 100)}%)`,
      },
    },
  },
};
</script>

<template>
  <div class="p-4 bg-white rounded-xl shadow-sm">
    <h2 class="text-sm font-semibold text-gray-800 mb-4">Répartition des factures</h2>

    <div v-if="facturesStore.loading" class="text-center text-sm text-gray-500 py-6">Chargement...</div>

    <div v-else class="flex flex-col sm:flex-row items-center gap-4">
      <!-- Doughnut Chart -->
      <div class="relative w-24 h-24 sm:w-32 sm:h-32">
        <Doughnut :data="chartData" :options="options" />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-gray-700 text-sm sm:text-base">
            <div class="font-semibold text-lg sm:text-xl">{{ total }}</div>
            <div class="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="w-full space-y-1 text-sm">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex justify-between items-center"
        >
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: stat.color }" />
            <span class="text-gray-700">{{ stat.label }}</span>
          </div>
          <div class="text-gray-800 font-medium">{{ stat.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
