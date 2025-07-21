<template>
  <header class="invoice-header">
    <h2>Facture {{ facture.numero }}</h2>
    <div class="dates">
      <div>
        <strong>Date d'émission :</strong> {{ formatDate(facture.date_emission) }}
      </div>
      <div>
        <strong>Date d'échéance :</strong> {{ formatDate(facture.date_echeance) }}
      </div>
    </div>
  </header>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  facture: {
    type: Object,
    required: true,
  },
});

// Méthode simple pour formater la date en français, format JJ/MM/AAAA
function formatDate(date) {
  if (!date) return "-";
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR");
}
</script>

<style scoped>
.invoice-header {
  padding: 16px;
  border-bottom: 2px solid #333;
  margin-bottom: 16px;
}
.invoice-header h2 {
  margin: 0 0 8px;
  font-weight: 700;
  color: #222;
}
.dates div {
  margin-bottom: 4px;
  color: #555;
}
</style>
