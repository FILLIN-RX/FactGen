<template>
  <div class="p-6 max-w-6xl mx-auto bg-white shadow rounded">
    <!-- Filtres et recherche -->
    <div class="mb-6 flex gap-4 flex-wrap items-center">
      <input
        v-model="searchTerm"
        placeholder="Rechercher une facture ou client..."
        class="border rounded px-3 py-2 flex-1 min-w-64"
      />
       
      <select v-model="selectedClient" class="border rounded px-3 py-2 min-w-48">
        <option value="">Tous les clients</option>
        <option v-for="nom in clients" :key="nom" :value="nom">
          {{ nom }}
        </option>
      </select>

      <select v-model="selectedStatus" class="border rounded px-3 py-2">
        <option value="">Tous les statuts</option>
        <option value="en_attente" class="text-yellow-600">En attente</option>
        <option value="paye" class="text-green-600">Payé</option>
        <option value="annule" class="text-red-600">Annulé</option>
      </select>
    </div>

    <!-- Bouton créer facture -->
    <div class="mb-6">
      <button 
        @click="creer" 
        class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        ➕ Créer une facture
      </button>
    </div>

    <!-- Formulaire de création -->
    <div v-if="open" class="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <FactureTemp @close="open = false" @created="onFactureCreated" />
    </div>

    <!-- En-tête -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl text-blue-600 font-bold">
        📄 Liste des factures sauvegardées
      </h1>
      <div class="text-sm text-gray-500">
        {{ facturesFiltrees.length }} facture(s) trouvée(s)
      </div>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="text-sm text-blue-600 font-medium">Total factures</div>
        <div class="text-2xl font-bold text-blue-800">{{ invoiceStore.factures.length }}</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <div class="text-sm text-green-600 font-medium">Montant total</div>
        <div class="text-2xl font-bold text-green-800">{{ formatPrice(totalAmount) }} €</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg">
        <div class="text-sm text-orange-600 font-medium">En attente</div>
        <div class="text-2xl font-bold text-orange-800">{{ pendingCount }}</div>
      </div>
    </div>

    <!-- Message si aucune facture -->
    <div v-if="!invoiceStore.hasInvoices" class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">📄</div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">Aucune facture sauvegardée</h3>
      <p class="text-gray-500 mb-4">Commencez par créer votre première facture</p>
      <button 
        @click="creer" 
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
      >
        Créer une facture
      </button>
    </div>

    <!-- Message si aucun résultat de recherche -->
    <div v-else-if="facturesFiltrees.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-4xl mb-4">🔍</div>
      <h3 class="text-lg font-medium text-gray-600 mb-2">Aucune facture trouvée</h3>
      <p class="text-gray-500">Essayez de modifier vos critères de recherche</p>
      <button 
        @click="clearFilters" 
        class="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
      >
        Effacer les filtres
      </button>
    </div>

    <!-- Liste des factures -->
    <div v-else class="space-y-2">
      <InvoiceListItem
        v-for="(facture, index) in facturesFiltrees"
        :key="facture.id"
        :invoice="facture"
        @select="invoiceStore.selectionnerFacture(facture, index)"
        :societer="fetchEntreprise()"
      />
    </div>

    <!-- Modal de détail -->
    <InvoiceDetailModal
      v-if="invoiceStore.selectedFacture"
      :invoice="invoiceStore.selectedFacture"
      @close="invoiceStore.clearSelection()"
      @delete="confirmerSuppression"
     
      :is-downloading="isDownloading"
    />

    <!-- Modal de confirmation de suppression -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Confirmer la suppression</h3>
        <p class="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer la facture #{{ invoiceStore.selectedInvoice?.numero }} ?
          Cette action est irréversible.
        </p>
        <div class="flex gap-3 justify-end">
          <button
            @click="showDeleteConfirm = false"
            class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            :disabled="isDeleting"
          >
            Annuler
          </button>
          <button
            @click="supprimerFacture"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            :disabled="isDeleting"
          >
            <div v-if="isDeleting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {{ isDeleting ? 'Suppression...' : 'Supprimer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useFacturesStore } from "../stores/Facture";
import InvoiceListItem from "../components/factures/InvoiceListItem.vue";
import InvoiceDetailModal from "../components/factures/InvoiceDetailModal.vue";
import { telechargerPDF,getInfoEntreprise } from "@/services/api";
import FactureTemp from "../components/FactureTemp.vue";
import { useToast } from "vue-toastification";
import { useAppStore } from "../stores/app";

const toast = useToast();

// Variables réactives
const searchTerm = ref("");
const selectedClient = ref("");
const selectedStatus = ref("");
const clients = ref([]);
const open = ref(false);
const isDownloading = ref(false);
const showDeleteConfirm = ref(false);
const isDeleting = ref(false); // ✅ Variable spécifique pour la suppression

// Stores
const invoiceStore = useFacturesStore();
const appStore = useAppStore();
async function fetchEntreprise() {
  try {
    infoEntreprise.value = await getInfoEntreprise();
  } catch (error) {
    console.error("Erreur récupération infos entreprise", error);
  }
}
// Montage du composant
onMounted(async () => {
  appStore.setLoading(true); // ✅ Loader global pour le chargement initial
  try {
    await invoiceStore.chargerFactures();
    fetchEntreprise();
    
    // Extraire la liste unique des clients
    const uniqueClients = new Set(
      invoiceStore.factures
        .map((f) => f.client_data?.nom)
        .filter(Boolean)
    );
    clients.value = Array.from(uniqueClients).sort();
  } catch (error) {
    console.error("Erreur lors du chargement des factures:", error);
    toast.error("Erreur lors du chargement des factures");
  } finally {
    appStore.setLoading(false);
  }
});

// Fonctions utilitaires
function formatPrice(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}

function creer() {
  open.value = !open.value;
}

function clearFilters() {
  searchTerm.value = "";
  selectedClient.value = "";
  selectedStatus.value = "";
}

function onFactureCreated() {
  open.value = false;
  // Recharger les factures après création
  invoiceStore.chargerFactures();
}

// Gestion de la suppression
function confirmerSuppression() {
  showDeleteConfirm.value = true;
}

async function supprimerFacture() {
  try {
    isDeleting.value = true; // ✅ Loader local pour la suppression
    await invoiceStore.supprimerFacture(invoiceStore.selectedIndex);
    showDeleteConfirm.value = false;
    invoiceStore.clearSelection();
    toast.success("Facture supprimée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    toast.error("Erreur lors de la suppression de la facture");
  } finally {
    isDeleting.value = false;
  }
}

// Téléchargement PDF
const telecharger = async () => {
  try {
    isDownloading.value = true;
    await telechargerPDF(invoiceStore.selectedFacture.id);
    toast.success("Facture téléchargée avec succès !");
  } catch (error) {
    console.error("Erreur lors du téléchargement PDF :", error.message);
    toast.error("Erreur lors du téléchargement de la facture");
  } finally {
    isDownloading.value = false;
  }
};

// Computed properties
const facturesFiltrees = computed(() => {
  return invoiceStore.factures.filter((f) => {
    // Filtre par client
    const matchClient =
      selectedClient.value === "" ||
      f.client_data?.nom === selectedClient.value;

    // Filtre par statut
    const matchStatus =
      selectedStatus.value === "" ||
      f.statut === selectedStatus.value;

    // Filtre par terme de recherche
    const matchSearch =
      searchTerm.value === "" ||
      f.client_data?.nom
        ?.toLowerCase()
        .includes(searchTerm.value.toLowerCase()) ||
      f.id?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      f.numero?.toString().includes(searchTerm.value);

    return matchClient && matchStatus && matchSearch;
  });
});

// Statistiques
const totalAmount = computed(() => {
  return facturesFiltrees.value.reduce((total, facture) => {
    return total + (parseFloat(facture.montant_total) || 0);
  }, 0);
});

const pendingCount = computed(() => {
  return invoiceStore.factures.filter(f => f.statut === 'en_attente').length;
});
</script>