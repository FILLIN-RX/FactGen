<template>
  <div class="item-row">
    <div class="nom">{{ produit.nom }}</div>
    <div class="quantite">{{ produit.quantite }}</div>
    <div class="prix-unitaire">{{ formatPrix(produit.prix) }}</div>
    <div class="prix-total">{{ formatPrix(produit.prix * produit.quantite) }}</div>
    <div v-if="produit.remise" class="remise">
      -{{ formatPrix(produit.remise) }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  produit: {
    type: Object,
    required: true,
    // Structure attendue : { nom, quantite, prix, remise? }
  },
});

function formatPrix(valeur) {
  if (valeur == null) return "-";
  // Par défaut, on met en XOF sans décimales
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valeur);
}
</script>

<style scoped>
.item-row {
  display: grid;
  grid-template-columns: 3fr 1fr 2fr 2fr 2fr;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.nom {
  font-weight: 600;
  color: #333;
}
.quantite,
.prix-unitaire,
.prix-total,
.remise {
  text-align: right;
  color: #555;
}
.remise {
  color: #b00;
  font-weight: 700;
}
</style>
