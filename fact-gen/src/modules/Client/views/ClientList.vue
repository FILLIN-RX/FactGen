<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <!-- Page Header -->
        <div class="bg-white border-b border-slate-200 shadow-sm">
            <div class="px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">
                            Gestion des Clients
                        </h1>
                        <p class="mt-1 text-sm text-slate-600">
                            Gérez votre base de données clients et consultez leurs statistiques
                        </p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span
                            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {{ clientStore.clients.length }} clients
                        </span>
                        <!-- Export/Import buttons -->
                        <div class="flex items-center space-x-2">
                            <button @click="exportClients"
                                class="inline-flex items-center px-3 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200">
                                <ArrowDownTrayIcon class="w-4 h-4 mr-1" />
                                Exporter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="px-4 sm:px-6 lg:px-8 py-6">
            <div class="max-w-7xl mx-auto">
                <!-- Search and Actions Bar -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <!-- Search Input -->
                        <div class="flex-1 relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon class="h-5 w-5 text-slate-400" />
                            </div>
                            <input v-model="clientStore.search" type="text"
                                placeholder="Rechercher un client par nom, téléphone, email..."
                                class="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                @input="handleSearch" />
                            <!-- Clear search button -->
                            <button v-if="clientStore.search" @click="clearSearch"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-slate-50 rounded-r-xl transition-colors duration-200">
                                <XMarkIcon class="h-5 w-5 text-slate-400 hover:text-slate-600" />
                            </button>
                        </div>

                        <!-- Filters -->
                        <div class="flex items-center space-x-2">
                            <select v-model="sortBy" @change="handleSort"
                                class="border border-slate-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="nom">Trier par nom</option>
                                <option value="created_at">Date d'ajout</option>
                                <option value="telephone">Téléphone</option>
                            </select>

                            <button @click="toggleSortOrder"
                                class="p-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                                :title="sortOrder === 'asc' ? 'Ordre croissant' : 'Ordre décroissant'">
                                <BarsArrowUpIcon v-if="sortOrder === 'asc'" class="w-4 h-4 text-slate-600" />
                                <BarsArrowDownIcon v-else class="w-4 h-4 text-slate-600" />
                            </button>
                        </div>

                        <!-- Add Client Button -->
                        <button @click="clientStore.ouvrirFormulaire()"
                            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <PlusIcon class="w-5 h-5 mr-2" />
                            <span class="hidden sm:inline">Ajouter un client</span>
                            <span class="sm:hidden">Ajouter</span>
                        </button>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div v-if="clientStore.clients.length > 0"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <UserGroupIcon class="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-slate-600">Total Clients</p>
                                <p class="text-2xl font-bold text-slate-900">{{ clientStore.clients.length }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <UserIcon class="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-slate-600">Clients Actifs</p>
                                <p class="text-2xl font-bold text-slate-900">{{ clientsActifs }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="clientStore.loading || facturesStore.loading" class="flex justify-center items-center py-12">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <LoadinApp />
                        <p class="text-center text-slate-600 mt-4">Chargement des clients...</p>
                    </div>
                </div>

                <!-- No Search Results -->
                <div v-else-if="clientStore.search && clientStore.filteredClients.length === 0"
                    class="text-center py-12">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
                        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-6">
                            <MagnifyingGlassIcon class="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 class="text-lg font-medium text-slate-900 mb-2">Aucun résultat trouvé</h3>
                        <p class="text-slate-600 mb-6">Aucun client ne correspond à votre recherche "{{
                            clientStore.search }}"</p>
                        <button @click="clearSearch"
                            class="inline-flex items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200">
                            Effacer la recherche
                        </button>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else-if="clientStore.clients.length === 0" class="text-center py-12">
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
                        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-6">
                            <UserGroupIcon class="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 class="text-lg font-medium text-slate-900 mb-2">Aucun client enregistré</h3>
                        <p class="text-slate-600 mb-6">Commencez par ajouter votre premier client pour gérer vos
                            factures.</p>
                        <button @click="clientStore.ouvrirFormulaire()"
                            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                            <PlusIcon class="w-5 h-5 mr-2" />
                            Ajouter votre premier client
                        </button>
                    </div>
                </div>

                <!-- Client Grid -->
                <div v-else class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(client, index) in clientStore.paginatedClients" :key="client.id || index"
                        @click="handleClientSelection(client, index)"
                        class="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                        <div class="p-6">
                            <!-- Client Header -->
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-center space-x-3">
                                    <div class="flex-shrink-0">
                                        <div
                                            class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span class="text-white font-semibold text-lg">
                                                {{ client.nom ? client.nom.charAt(0).toUpperCase() : '?' }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h3
                                            class="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                                            {{ client.nom }}
                                        </h3>
                                        <p class="text-sm text-slate-600 truncate">
                                            {{ client.telephone }}
                                        </p>
                                    </div>
                                </div>

                            </div>


                        </div>

                        <!-- Enhanced Pagination -->
                        <div v-if="clientStore.clients.length > 0 && clientStore.filteredClients.length > clientStore.itemsPerPage"
                            class="mt-8">
                            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
                                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">

                                    <div class="flex items-center space-x-2">
                                        <button @click="clientStore.pagePrecedente()" :disabled="clientStore.page === 1"
                                            class="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                                            <ChevronLeftIcon class="h-4 w-4 mr-1" />
                                            Précédent
                                        </button>

                                        <!-- Page Numbers -->
                                        <div class="hidden sm:flex items-center space-x-1">
                                            <template v-for="pageNum in getVisiblePages()" :key="pageNum">
                                                <button v-if="typeof pageNum === 'number'"
                                                    @click="clientStore.page = pageNum" :class="[
                                                        'px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                                                        pageNum === clientStore.page
                                                            ? 'bg-blue-600 text-white'
                                                            : 'text-slate-700 hover:bg-slate-100'
                                                    ]">
                                                    {{ pageNum }}
                                                </button>
                                                <span v-else class="px-2 text-slate-400">...</span>
                                            </template>
                                        </div>

                                        <!-- Mobile page indicator -->
                                        <div
                                            class="sm:hidden bg-slate-100 px-3 py-2 rounded-lg text-sm font-medium text-slate-700">
                                            {{ clientStore.page }} / {{ clientStore.totalPages }}
                                        </div>

                                        <button @click="clientStore.pageSuivante()"
                                            :disabled="clientStore.page === clientStore.totalPages"
                                            class="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                                            Suivant
                                            <ChevronRightIcon class="h-4 w-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modals -->
            <ClientFormModal :open="clientStore.isFormOpen" :form="clientStore.clientForm" @submit="handleSubmit"
                @close="clientStore.fermerFormulaire" />

            <ClientDetailsPopup :open="clientStore.isDetailsOpen" :client="clientStore.selectedClient"
                :stats="statsClient" @close="clientStore.fermerDetails" @delete="confirmerSuppression"
                @edit="handleEdit" />

            <!-- Confirmation Dialog -->
            <div v-if="showDeleteConfirm"
                class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
                    <div class="p-4 sm:p-6">
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <ExclamationTriangleIcon class="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 class="text-base sm:text-lg font-semibold text-slate-900">
                                    Confirmer la suppression
                                </h3>
                                <p class="text-xs sm:text-sm text-slate-600">
                                    Action irréversible
                                </p>
                            </div>
                        </div>

                        <p class="text-sm sm:text-base text-slate-700 mb-6">
                            Supprimer le client
                            <span class="font-semibold">#{{ clientStore.selectedClient?.nom }}</span>
                            ?
                        </p>

                        <div class="flex gap-3">
                            <button @click="showDeleteConfirm = false"
                                class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors text-sm sm:text-base"
                                :disabled="isDeleting">
                                Annuler
                            </button>
                            <button @click="supprimerClient"
                                class="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                                :disabled="isDeleting">
                                <div v-if="isDeleting"
                                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                                </div>
                                {{ isDeleting ? "Suppression..." : "Supprimer" }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useClientsStore } from '../stores/client.store';
import ClientFormModal from '../components/ClientFormModal.vue';
import ClientDetailsPopup from '../components/ClientDetailsPopup.vue';
import { showToastMessage } from '@/composables/useToast';
import { useFacturesStore } from '@/modules/Invoice/stores/invoice.store';
import LoadinApp from '@/shared/components/LoadinApp.vue';
import Toast from '@/shared/components/Toast.vue';
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    BarsArrowUpIcon,
    BarsArrowDownIcon,
    PlusIcon,
    UserGroupIcon,
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const clientStore = useClientsStore();
const facturesStore = useFacturesStore();
const sortBy = ref('date')        // Défini la variable
const sortOrder = ref('asc')
const clientsActifs = ref(0)
const showDeleteConfirm = ref(false)
const isDeleting = ref(false);

function confirmerSuppression() {
    showDeleteConfirm.value = true;
}


function handleEdit(id) {
    console.log('Edit client', id)
}


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
        await facturesStore.chargerFactures();
        showToastMessage("Client charger avec success", "success")
        // Toast si liste vide
        if (clientStore.clients.length === 0) {
            showToastMessage("Aucun client trouvé. Ajoutez-en un !", "info");
        }
    } catch (error) {
        showToastMessage("Erreur lors du chargement des clients", "error");
        console.error(error);
    }
});

const handleSubmit = async () => {
    try {
        await clientStore.ajouterClient();
        showToastMessage("Client enregistré avec succès !", "success");
    } catch (error) {
        if (error.message.includes("session")) {
            showToastMessage("Votre session a expiré, veuillez vous reconnecter", "error");
            router.push('/login');
        } else {
            showToastMessage("Erreur lors de la création du client", "error");
        }
    }
};

async function supprimerClient() {

    try {
        isDeleting.value = true;
        await clientStore.supprimerClient();
        showDeleteConfirm.value = false
        clientStore.fermerDetails()
        showToastMessage("Client supprimé avec succès !", "success");
    } catch (error) {
        showToastMessage("Erreur lors de la suppression du client", "error");
    } finally {
        isDeleting.value = false
    }
};
</script>
