<template>
    <div class="min-h-screen bg-surface">
        <!-- Page Header -->
        <div class="bg-surface-container border-b border-outline-variant shadow-elevation-1">
            <div class="px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-headline-large text-surface-on">
                            Gestion des Clients
                        </h1>
                        <p class="mt-1 text-body-medium text-surface-on-variant">
                            Gérez votre base de données clients et consultez leurs statistiques
                        </p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="chip chip-selected">
                            {{ clientStore.clients.length }} clients
                        </span>
                        <!-- Export/Import buttons -->
                        <div class="flex items-center space-x-2">
                            <button @click="exportClients" class="btn-outlined">
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
                <div class="card-filled p-4 sm:p-6 mb-6">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <!-- Search Input -->
                        <div class="flex-1 relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon class="h-5 w-5 text-surface-on-variant" />
                            </div>
                            <input v-model="clientStore.search" type="text"
                                placeholder="Rechercher un client par nom, téléphone, email..."
                                class="input-outlined pl-10 pr-10" @input="handleSearch" />
                            <!-- Clear search button -->
                            <button v-if="clientStore.search" @click="clearSearch"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200">
                                <XMarkIcon class="h-5 w-5 text-surface-on-variant hover:text-surface-on" />
                            </button>
                        </div>

                        <!-- Filters -->
                        <div class="flex items-center space-x-2">
                            <select v-model="sortBy" @change="handleSort" class="input-outlined text-body-medium">
                                <option value="nom">Trier par nom</option>
                                <option value="created_at">Date d'ajout</option>
                                <option value="telephone">Téléphone</option>
                            </select>

                            <button @click="toggleSortOrder"
                                class="p-3 border border-outline rounded-lg hover:bg-primary/8 transition-colors"
                                :title="sortOrder === 'asc' ? 'Ordre croissant' : 'Ordre décroissant'">
                                <BarsArrowUpIcon v-if="sortOrder === 'asc'" class="w-4 h-4 text-surface-on" />
                                <BarsArrowDownIcon v-else class="w-4 h-4 text-surface-on" />
                            </button>
                        </div>


                    </div>
                </div>

                <!-- Quick Stats -->
                <div v-if="clientStore.clients.length > 0"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                    <div class="card-filled p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="h-12 w-12 rounded-xl bg-primary-container flex items-center justify-center">
                                    <UserGroupIcon class="h-6 w-6 text-primary-on-container" />
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-body-medium text-surface-on-variant">Total Clients</p>
                                <p class="text-headline-medium text-surface-on">{{ clientStore.clients.length }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="card-filled p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div
                                    class="h-12 w-12 rounded-xl bg-tertiary-container flex items-center justify-center">
                                    <UserIcon class="h-6 w-6 text-tertiary-on-container" />
                                </div>
                            </div>
                            <div class="ml-4">
                                <p class="text-body-medium text-surface-on-variant">Clients Actifs</p>
                                <p class="text-headline-medium text-surface-on">{{ clientsActifs }}</p>
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
                    <div class="card-filled p-8 sm:p-12">
                        <div
                            class="mx-auto flex items-center justify-center h-16 w-16 rounded-xl bg-surface-variant mb-6">
                            <MagnifyingGlassIcon class="h-8 w-8 text-surface-on-variant" />
                        </div>
                        <h3 class="text-title-large text-surface-on mb-2">Aucun résultat trouvé</h3>
                        <p class="text-body-medium text-surface-on-variant mb-6">Aucun client ne correspond à votre
                            recherche "{{
                                clientStore.search }}"</p>
                        <button @click="clearSearch" class="btn-outlined">
                            Effacer la recherche
                        </button>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else-if="clientStore.clients.length === 0" class="text-center py-12">
                    <div class="card-filled p-8 sm:p-12">
                        <div
                            class="mx-auto flex items-center justify-center h-16 w-16 rounded-xl bg-surface-variant mb-6">
                            <UserGroupIcon class="h-8 w-8 text-surface-on-variant" />
                        </div>
                        <h3 class="text-title-large text-surface-on mb-2">Aucun client enregistré</h3>
                        <p class="text-body-medium text-surface-on-variant mb-6">Commencez par ajouter votre premier
                            client pour gérer vos
                            factures.</p>
                        <button @click="clientStore.ouvrirFormulaire()" class="btn-filled">
                            <PlusIcon class="w-5 h-5 mr-2" />
                            Ajouter votre premier client
                        </button>
                    </div>
                </div>

                <!-- Client Grid -->
                <div v-else class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(client, index) in clientStore.paginatedClients" :key="client.id || index"
                        @click="handleClientSelection(client, index)" class="card-elevated p-6 cursor-pointer group">
                        <!-- Client Header -->
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <div class="flex-shrink-0">
                                    <div
                                        class="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center shadow-elevation-1">
                                        <span class="text-primary-on font-semibold text-lg">
                                            {{ client.nom ? client.nom.charAt(0).toUpperCase() : '?' }}
                                        </span>
                                    </div>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <h3
                                        class="text-title-medium text-surface-on group-hover:text-primary transition-colors">
                                        {{ client.nom }}
                                    </h3>
                                    <p class="text-body-small text-surface-on-variant truncate">
                                        {{ client.telephone }}
                                    </p>
                                </div>
                            </div>

                        </div>


                    </div>

                    <!-- Enhanced Pagination -->
                    <div v-if="clientStore.clients.length > 0 && clientStore.filteredClients.length > clientStore.itemsPerPage"
                        class="mt-8">
                        <div class="card-filled p-4 sm:p-6">
                            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">

                                <div class="flex items-center space-x-2">
                                    <button @click="clientStore.pagePrecedente()" :disabled="clientStore.page === 1"
                                        class="btn-outlined px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed">
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

        <ClientDetailsPopup :open="clientStore.isDetailsOpen" :client="clientStore.selectedClient" :stats="statsClient"
            @close="clientStore.fermerDetails" @delete="confirmerSuppression" @edit="handleEdit" />

        <!-- Confirmation Dialog -->
        <div v-if="showDeleteConfirm"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
                <div class="p-4 sm:p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
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

        <!-- FAB (Floating Action Button) -->
        <button @click="clientStore.ouvrirFormulaire()" class="fab" title="Ajouter un client">
            <PlusIcon class="w-6 h-6" />
        </button>
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
