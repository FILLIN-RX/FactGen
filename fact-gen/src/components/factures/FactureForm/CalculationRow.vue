<template>
  <div class="calculation-row">
    <span class="label">{{ label }}</span>
    <span class="value">{{ formatPrix(value) }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true },
});

function formatPrix(valeur) {
  if (valeur == null) return "-";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valeur);
}
</script>

<style scoped>
.calculation-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #ccc;
  font-weight: 600;
  font-size: 16px;
}
.label {
  color: #333;
}
.value {
  color: #111;
}
</style>
