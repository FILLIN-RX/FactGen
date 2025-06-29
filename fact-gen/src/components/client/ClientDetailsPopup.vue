<template>
  <div v-if="open" class="fixed inset-0 bg-black/10 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Fiche Client</h2>
          <p class="text-sm text-gray-500">ID Client : #CLT-{{ client?.id || '0000' }}</p>
        </div>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Client Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Nom complet</label>
          <p class="text-lg font-semibold text-gray-900">{{ client?.nom }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Email</label>
          <p class="text-gray-800">{{ client?.email || 'N/A' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Téléphone</label>
          <p class="text-gray-800">{{ client?.telephone }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Adresse</label>
          <p class="text-gray-800">{{ client?.address || client?.adresse || 'N/A' }}</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-6 px-2">
        <div class="flex divide-x border rounded-lg">
          <div class="flex-1 p-3 text-center">
            <h5 class="text-gray-400">Nombre de facture</h5>
            <p class="font-medium">{{ stats?.total || 0 }}</p>
          </div>
          <div class="flex-1 p-3 text-center text-red-900">
            <h5 class="text-red-400">Factures en attente</h5>
            <p class="font-medium">{{ stats?.en_attente || 0 }}</p>
          </div>
          <div class="flex-1 p-3 text-center text-green-900">
            <h5 class="text-green-400">Factures payées</h5>
            <p class="font-medium">{{ stats?.payees || 0 }}</p>
          </div>
        </div>
      </div>

      <!-- Debug info (à supprimer en production) -->
      <div class="mt-4 p-2 bg-gray-100 rounded text-xs" v-if="true">
        <strong>Debug:</strong> {{ JSON.stringify(stats, null, 2) }}
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="$emit('delete')"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer
        </button>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Modifier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  client: Object,
  stats: Object,
});

defineEmits(['close', 'delete']);
</script>