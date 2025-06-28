<template>
  <div class="p-4 lg:p-5 lg:bg-blue-100 min-h-screen">
    <!-- Main Content -->
    <div class="p-4 bg-white rounded-xl lg:shadow">
      <!-- Search and Add -->
      <div class="flex items-center space-x-5 justify-center">
        <input
          v-model="clientStore.search"
          type="text"
          placeholder="Rechercher un client..."
          class="w-full p-2 border rounded"
          @input="clientStore.page = 1"
        />
        <button
          @click="clientStore.openForm()"
          class="bg-blue-600 text-white text-[15px] px-4 py-2 rounded"
        >
          Ajouter un client
        </button>
      </div>

      <!-- Client List -->
      <div v-if="clientStore.clients.length === 0" class="text-gray-600 py-4">
        Aucune client sauvegardée pour le moment.
      </div>
      <ul v-else class="mt-4 space-y-4">
        <li
          v-for="(client, index) in clientStore.paginatedClients"
          :key="index"
          @click="clientStore.selectClient(client, index)"
          class="bg-white p-4 rounded-xl shadow hover:bg-gray-100 cursor-pointer transition"
        >
          #{{ client.nom }} - {{ client.telephone }}
        </li>
      </ul>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-4 mt-6">
        <button
          @click="clientStore.prevPage()"
          :disabled="clientStore.page === 1"
          class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span>Page {{ clientStore.page }} / {{ clientStore.totalPages }}</span>
        <button
          @click="clientStore.nextPage()"
          :disabled="clientStore.page === clientStore.totalPages"
          class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>

    <!-- Client Form Modal -->
    <ClientFormModal 
      v-model:open="clientStore.isFormOpen"
      @submit="handleSubmit"
      v-model:form="clientStore.clientForm"
      @close="clientStore.closeForm"
    />

    <!-- Client Details -->
    <ClientDetailsPopup
      v-model:open="clientStore.isDetailsOpen"
      :client="clientStore.selectedClient"
      @close="clientStore.closeDetails"
      @delete="clientStore.deleteClient"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useClientsStore } from '../stores/client';
import ClientFormModal from '../components/client/ClientFormModal .vue';
import ClientDetailsPopup from '../components/client/ClientDetailsPopup.vue';

const clientStore = useClientsStore();

onMounted(() => {
  clientStore.chargerClients();
})
const handleSubmit = async () => {
  try {
    await clientStore.addClient();
    // Fermer le modal si succès
    emit('update:open', false);
  } catch (error) {
    // Affichez un message d'erreur spécifique
    if (error.message.includes("session")) {
      alert("Votre session a expiré, veuillez vous reconnecter");
      router.push('/login');
    } else {
      alert(`Erreur: ${error.message}`);
    }
  }
};
</script>