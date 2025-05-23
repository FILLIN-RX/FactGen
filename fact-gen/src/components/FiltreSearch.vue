<script setup>
import { useFacturesStore } from '../stores/Facture'
const store = useFacturesStore()

function onRechercheChange(event) {
  store.setRecherche(event.target.value)
}
function onDateMinChange(event) {
  store.setDateMin(event.target.value)
}
function onDateMaxChange(event) {
  store.setDateMax(event.target.value)
}
function onStatutChange(event) {
  store.setStatut(event.target.value)
}
</script>

<template>
  <div class="p-4 bg-white rounded shadow mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
    <input
      type="text"
      placeholder="Rechercher numéro ou client..."
      class="border rounded px-3 py-2"
      :value="store.recherche"
      @input="onRechercheChange"
    />

    <input
      type="date"
      :value="store.dateMin"
      @input="onDateMinChange"
      class="border rounded px-3 py-2"
    />

    <input
      type="date"
      :value="store.dateMax"
      @input="onDateMaxChange"
      class="border rounded px-3 py-2"
    />

    <select
      :value="store.statut"
      @change="onStatutChange"
      class="border rounded px-3 py-2"
    >
      <option value="tous">Tous statuts</option>
      <option value="payée">Payée</option>
      <option value="en attente">En attente</option>
    </select>
  </div>
</template>
