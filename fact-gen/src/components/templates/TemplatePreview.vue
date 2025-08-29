<template>
  <section aria-label="Aperçu de la facture" class="w-full">
    <div class="flex justify-center">
      <div class="a4-wrapper">
        <div class="a4-page" role="document" aria-labelledby="invoice-title">
          <component
            :is="selectedTemplateComponent"
            v-bind="templateProps"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useTemplateSelection } from '@/composables/useTemplateSelection'

const props = defineProps({
  invoice: { type: Object, required: true },
  forceTemplateId: { type: String, default: null }
})

const { selectedTemplateComponent, selectedTemplateId, setTemplate } = useTemplateSelection()

if (props.forceTemplateId) {
  setTemplate(props.forceTemplateId)
}

const templateProps = computed(() => {
  const inv = props.invoice || {}
  const client = inv.client || inv.client_data || {}
  const produits = Array.isArray(inv.produits) ? inv.produits : []

  const totalHT = produits.reduce((sum, p) => sum + (Number(p.prix) || 0) * (Number(p.quantite) || 0), 0)
  let reductionVal = 0
  if (inv.reduction) {
    if (inv.reduction.type === 'montant') reductionVal = Number(inv.reduction.valeur) || 0
    if (inv.reduction.type === 'pourcentage') reductionVal = totalHT * ((Number(inv.reduction.valeur) || 0) / 100)
  }
  const totalTTC = typeof inv.montant_total === 'number' ? inv.montant_total : (totalHT - reductionVal)

  return {
    societer: inv.societer || inv.companyInfo || {},
    client,
    produits,
    totalHT,
    totalTTC,
    montantReduction: reductionVal,
    suplement: inv.suplement || '',
    date_emission: inv.date_emission || '',
    date_echeance: inv.date_echeance || '',
    factureId: inv.id || inv.factureId || ''
  }
})
</script>

<style scoped>
/* Outer wrapper maintains aspect and scales down on small screens */
.a4-wrapper {
  width: 100%;
  max-width: 900px;
  padding: 1rem;
}
.a4-page {
  width: 794px; /* A4 width @ 96dpi */
  min-height: 1123px; /* A4 height */
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  margin: 0 auto;
}

@media (max-width: 860px) {
  .a4-page { transform-origin: top center; transform: scale(0.9); }
}
@media (max-width: 760px) {
  .a4-page { transform-origin: top center; transform: scale(0.8); }
}
@media (max-width: 680px) {
  .a4-page { transform-origin: top center; transform: scale(0.7); }
}

@page { size: A4; margin: 10mm; }
</style>
