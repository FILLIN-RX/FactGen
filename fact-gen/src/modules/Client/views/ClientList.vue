<template>
    <div class="space-y-8">
        <!-- Page Header -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-[#1A1C1E]">Clients</h1>
                <p class="text-sm text-surface-on-variant">Gérez votre base de données et consultez les soldes</p>
            </div>
            <div class="flex items-center gap-3">
                <button @click="exportClients" class="btn-outlined px-4 py-2 text-sm">
                    <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
                    Exporter la liste
                </button>
                <button @click="clientStore.ouvrirFormulaire()" class="btn-filled px-5 py-2">
                    <PlusIcon class="w-5 h-5 mr-2" />
                    Nouveau client
                </button>
            </div>
        </header>

        <!-- Search and Quick Stats Bar -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="lg:col-span-2 relative">
                <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-on-variant" />
                <input v-model="clientStore.search" type="text" placeholder="Rechercher par nom, email, téléphone..."
                    class="input-outlined pl-10 h-10 py-0 text-sm" @input="handleSearch" />
                <button v-if="clientStore.search" @click="clearSearch"
                    class="absolute inset-y-0 right-3 flex items-center">
                    <XMarkIcon class="h-4 w-4 text-surface-on-variant hover:text-[#1A1C1E]" />
                </button>
            </div>

            <!-- Stats Mini -->
            <div class="card-outlined p-0 flex items-center px-4 bg-white lg:col-span-1">
                <div class="p-2 rounded bg-blue-50 mr-3">
                    <UserGroupIcon class="w-4 h-4 text-[#005AC1]" />
                </div>
                <div>
                    <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">Total</p>
                    <p class="text-sm font-bold text-[#1A1C1E]">{{ clientStore.clients.length }} clients</p>
                </div>
            </div>

            <div class="card-outlined p-0 flex items-center px-4 bg-white lg:col-span-1">
                <div class="p-2 rounded bg-green-50 mr-3">
                    <CheckCircleIcon class="w-4 h-4 text-green-600" />
                </div>
                <div>
                    <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">Actifs</p>
                    <p class="text-sm font-bold text-[#1A1C1E]">{{ clientsActifs }} actifs</p>
                </div>
            </div>
        </div>

        <!-- Clients Desktop Table / Cards Mobile -->
        <div class="card-outlined p-0 overflow-hidden bg-white">
            <!-- Loading -->
            <div v-if="clientStore.loading" class="p-12 flex flex-col items-center justify-center">
                <LoadinApp />
                <p class="text-xs text-surface-on-variant mt-4 font-medium">Chargement des données sécurisées...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="clientStore.clients.length === 0" class="p-16 text-center">
                <div class="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-6">
                    <UsersIcon class="w-8 h-8 text-surface-on-variant" />
                </div>
                <h3 class="text-lg font-bold text-[#1A1C1E] mb-2">Aucun client pour le moment</h3>
                <p class="text-sm text-surface-on-variant mb-6 max-w-sm mx-auto">Commencez à bâtir votre réseau. Ajoutez
                    vos clients pour générer des factures professionnelles en quelques secondes.</p>
                <button @click="clientStore.ouvrirFormulaire()" class="btn-filled px-6 py-2.5">
                    Ajouter mon premier client
                </button>
            </div>

            <!-- No search results -->
            <div v-else-if="clientStore.search && clientStore.filteredClients.length === 0" class="p-16 text-center">
                <p class="text-sm text-surface-on-variant">Aucun client trouvé pour "<span
                        class="font-bold text-[#1A1C1E]">{{ clientStore.search }}</span>"</p>
                <button @click="clearSearch" class="text-xs font-bold text-[#005AC1] mt-2 hover:underline">Réinitialiser
                    la recherche</button>
            </div>

            <!-- Client Table -->
            <div v-else class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-[#F8F9FA] text-[11px] uppercase tracking-wider text-surface-on-variant font-bold">
                        <tr>
                            <th class="px-6 py-4">Client</th>
                            <th class="px-6 py-4">Contact</th>
                            <th class="px-6 py-3">Statistiques</th>
                            <th class="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-outline-variant">
                        <tr v-for="(client, index) in clientStore.paginatedClients" :key="client.id || index"
                            @click="handleClientSelection(client, index)"
                            class="hover:bg-[#F8F9FA]/50 transition-colors cursor-pointer group">
                            <td class="px-6 py-4">
                                <div class="flex items-center space-x-3">
                                    <div
                                        class="w-10 h-10 rounded-lg bg-[#D3E4FF] flex items-center justify-center text-[#001C3B] font-bold text-sm shadow-sm border border-[#005AC1]/10">
                                        {{ client.nom ? client.nom.charAt(0).toUpperCase() : '?' }}
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-bold text-[#1A1C1E] group-hover:text-[#005AC1] transition-colors">
                                            {{ client.nom }}</p>
                                        <p class="text-[10px] text-surface-on-variant uppercase tracking-widest">
                                            Entreprise</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <p class="text-xs font-medium text-[#1A1C1E]">{{ client.telephone || 'Non renseigné' }}
                                </p>
                                <p class="text-[10px] text-surface-on-variant">{{ client.email || 'Pas d\'email' }}</p>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-4">
                                    <div>
                                        <p class="text-[10px] text-surface-on-variant uppercase">Factures</p>
                                        <p class="text-xs font-bold">0</p>
                                    </div>
                                    <div class="w-px h-6 bg-outline-variant"></div>
                                    <div>
                                        <p class="text-[10px] text-surface-on-variant uppercase">Total HT</p>
                                        <p class="text-xs font-bold">0,00 €</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button class="btn-text p-2 hover:bg-[#D3E4FF]/50 rounded-lg">
                                    <ChevronRightIcon class="w-4 h-4 text-[#005AC1]" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer / Pagination -->
            <footer v-if="clientStore.clients.length > 0 && clientStore.totalPages > 1"
                class="px-6 py-4 bg-[#F8F9FA] border-t border-outline-variant flex items-center justify-between">
                <p class="text-[11px] font-bold text-surface-on-variant uppercase">Page {{ clientStore.page }} sur {{
                    clientStore.totalPages }}</p>
                <div class="flex gap-2">
                    <button @click="clientStore.pagePrecedente()" :disabled="clientStore.page === 1"
                        class="btn-outlined py-1 px-3 text-xs disabled:opacity-30">
                        Précédent
                    </button>
                    <button @click="clientStore.pageSuivante()" :disabled="clientStore.page === clientStore.totalPages"
                        class="btn-outlined py-1 px-3 text-xs disabled:opacity-30">
                        Suivant
                    </button>
                </div>
            </footer>
        </div>

        <!-- Modals -->
        <ClientFormModal :open="clientStore.isFormOpen" :form="clientStore.clientForm" @submit="handleSubmit"
            @close="clientStore.fermerFormulaire" />

        <ClientDetailsPopup :open="clientStore.isDetailsOpen" :client="clientStore.selectedClient" :stats="statsClient"
            @close="clientStore.fermerDetails" @delete="confirmerSuppression" @edit="handleEdit" />

        <!-- Confirm suppression -->
        <transition name="fade">
            <div v-if="showDeleteConfirm"
                class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div
                    class="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center border border-outline-variant">
                    <div class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExclamationTriangleIcon class="w-6 h-6 text-red-600" />
                    </div>
                    <h3 class="text-lg font-bold text-[#1A1C1E] mb-2">Supprimer le client ?</h3>
                    <p class="text-sm text-surface-on-variant mb-6">Cette action est définitive. Toutes les factures
                        liées à ce client resteront mais ne seront plus associées.</p>
                    <div class="flex gap-3">
                        <button @click="showDeleteConfirm = false"
                            class="flex-1 btn-outlined py-2 text-sm">Annuler</button>
                        <button @click="supprimerClient" :disabled="isDeleting"
                            class="flex-1 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors">
                            {{ isDeleting ? '...' : 'Supprimer' }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <!-- FAB for Mobile -->
        <button @click="clientStore.ouvrirFormulaire()" class="fab lg:hidden">
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
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    PlusIcon,
    UserGroupIcon,
    ChevronRightIcon,
    ExclamationTriangleIcon,
    UsersIcon,
    CheckCircleIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const clientStore = useClientsStore();
const facturesStore = useFacturesStore();
const clientsActifs = ref(0);
const showDeleteConfirm = ref(false);
const isDeleting = ref(false);

const clearSearch = () => clientStore.search = "";
const handleSearch = () => { clientStore.page = 1; };

function confirmerSuppression() {
    showDeleteConfirm.value = true;
}

function handleEdit(id) {
    console.log('Edit client', id);
}

const statsClient = computed(() => {
    if (!clientStore.selectedClient) return { total: 0, payees: 0, en_attente: 0 };
    return facturesStore.statistiquesParClient(clientStore.selectedClient.id);
});

const handleClientSelection = (client, index) => {
    clientStore.selectionnerClient(client, index);
};

onMounted(async () => {
    try {
        await clientStore.chargerClients();
        await facturesStore.chargerFactures();
    } catch (error) {
        showToastMessage("Erreur de chargement", "error");
    }
});

const handleSubmit = async () => {
    try {
        await clientStore.ajouterClient();
        showToastMessage("Client ajouté !", "success");
    } catch (error) {
        showToastMessage("Erreur de création", "error");
    }
};

async function supprimerClient() {
    try {
        isDeleting.value = true;
        await clientStore.supprimerClient();
        showDeleteConfirm.value = false;
        clientStore.fermerDetails();
        showToastMessage("Client supprimé.", "success");
    } catch (error) {
        showToastMessage("Erreur de suppression", "error");
    } finally {
        isDeleting.value = false;
    }
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}

.page-enter-from {
    opacity: 0;
    transform: translateY(4px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
