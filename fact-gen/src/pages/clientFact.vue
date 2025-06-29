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
          @click="clientStore.ouvrirFormulaire()"
          class="bg-blue-600 text-white text-[15px] px-4 py-2 rounded"
        >
          Ajouter un client
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="clientStore.loading || facturesStore.loading" class="text-center py-4">
        <LoadinApp />
      </div>

      <!-- Client List -->
      <div v-else-if="clientStore.clients.length === 0" class="text-gray-600 py-4">
        Aucun client sauvegardé pour le moment.
      </div>
      <ul v-else class="mt-4 space-y-4">
        <li
          v-for="(client, index) in clientStore.paginatedClients"
          :key="client.id || index"
          @click="handleClientSelection(client, index)"
          class="bg-white p-4 rounded-xl shadow hover:bg-gray-100 cursor-pointer transition"
        >
          #{{ client.nom }} - {{ client.telephone }}
        </li>
      </ul>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-4 mt-6">
        <button
          @click="clientStore.pagePrecedente()"
          :disabled="clientStore.page === 1"
          class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span>Page {{ clientStore.page }} / {{ clientStore.totalPages }}</span>
        <button
          @click="clientStore.pageSuivante()"
          :disabled="clientStore.page === clientStore.totalPages"
          class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>

    <!-- Client Form Modal -->
    <ClientFormModal 
      :open="clientStore.isFormOpen"
      :form="clientStore.clientForm"
      @submit="handleSubmit"
      @close="clientStore.fermerFormulaire"
    />

    <!-- Client Details -->
    <ClientDetailsPopup
      :open="clientStore.isDetailsOpen"
      :client="clientStore.selectedClient"
      :stats="statsClient"
      @close="clientStore.fermerDetails"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useClientsStore } from '../stores/client';
import ClientFormModal from '../components/client/ClientFormModal .vue';
import ClientDetailsPopup from '../components/client/ClientDetailsPopup.vue';
import { useToast } from "vue-toastification";
import { useFacturesStore } from '../stores/Facture';
import LoadinApp from '../components/LoadinApp.vue';

const toast = useToast();
const router = useRouter();
const clientStore = useClientsStore();
const facturesStore = useFacturesStore();

// ✅ CORRECTION : Calcul des statistiques avec vérification
const statsClient = computed(() => {
  if (!clientStore.selectedClient) {
    return { total: 0, payees: 0, en_attente: 0 };
  }
  
  // Vérifier que facturesStore.statistiquesParClient est bien une fonction
  if (typeof facturesStore.statistiquesParClient !== 'function') {
    console.error('statistiquesParClient n\'est pas une fonction');
    return { total: 0, payees: 0, en_attente: 0 };
  }
  
  try {
    return facturesStore.statistiquesParClient(clientStore.selectedClient.id);
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    return { total: 0, payees: 0, en_attente: 0 };
  }
});

// ✅ CORRECTION : Gérer la sélection client avec debug
const handleClientSelection = (client, index) => {
  console.log('Client sélectionné:', client);
  console.log('Factures disponibles:', facturesStore.factures);
  clientStore.selectionnerClient(client, index);
};

// ✅ CORRECTION : Charger les factures au montage
onMounted(async () => {
  try {
    await clientStore.chargerClients();
    await facturesStore.chargerFactures(); // Important pour les statistiques
  } catch (error) {
    console.error('Erreur lors du chargement initial:', error);
    toast.error('Erreur lors du chargement des données');
  }
});

const handleSubmit = async () => {
  try {
    await clientStore.ajouterClient();
    toast.success("Client enregistré avec succès !");
  } catch (error) {
    if (error.message.includes("session")) {
      toast.error("Votre session a expiré, veuillez vous reconnecter");
      router.push('/login');
    } else {
      toast.error("Erreur lors de la création du client");
    }
  }
};

const handleDelete = async () => {
  try {
    await clientStore.supprimerClient();
    toast.success("Client supprimé avec succès !");
  } catch (error) {
    toast.error("Erreur lors de la suppression du client");
  }
};
</script>