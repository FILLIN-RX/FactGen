<template>
  <li
    @click="$emit('select')"
    class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans cursor-pointer hover:bg-gray-200 transition"
  >
    #{{ invoice.numero }} -  - {{ invoice.date }} - {{ invoice.montant_total}} €
  </li>
</template>

<script setup>
import { onMounted } from 'vue'
import { useClientsStore } from '@/stores/client.js'
import { useFacturesStore } from '@/stores/Facture.js'
const clientsStore = useClientsStore();   // AJOUTE CETTE LIGNE
const facturesStore = useFacturesStore();
onMounted(async () => {
  await clientsStore.charger()
  await facturesStore.charger()


})
defineProps({
  invoice: Object
});

defineEmits(['select']);
</script>