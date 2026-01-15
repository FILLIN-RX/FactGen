<template>
    <div class="flex h-screen bg-[#0F172A] text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30">
        <!-- Left Panel: Editor (Scrollable) -->
        <div class="w-full lg:w-[55%] h-full flex flex-col border-r border-slate-800/50">
            <!-- Sticky Header -->
            <header
                class="h-16 shrink-0 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20">
                <div class="flex items-center gap-4">
                    <button @click="$router.back()"
                        class="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                        <ArrowLeftIcon class="w-5 h-5" />
                    </button>
                    <div>
                        <h1 class="text-base font-semibold text-white tracking-wide">Éditeur</h1>
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span class="text-xs text-slate-500 font-medium">Brouillon auto-sauvegardé</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <!-- Template Switcher Pill -->
                    <button @click="openTemplateDialog"
                        class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-all group">
                        <span
                            class="text-xs font-medium text-slate-400 uppercase tracking-wider group-hover:text-indigo-400">Modèle</span>
                        <div class="w-px h-3 bg-slate-700"></div>
                        <span class="text-sm font-semibold text-white">{{ selectedTemplate.nom }}</span>
                        <ChevronDownIcon class="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </button>

                    <div class="h-6 w-px bg-slate-800 mx-1"></div>

                    <button @click="sauvegarderBrouillon"
                        class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                        title="Enregistrer">
                        <DocumentArrowDownIcon class="w-5 h-5" />
                    </button>
                    <button @click="creerFacture"
                        class="group relative flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.7)]">
                        <span>Envoyer</span>
                        <PaperAirplaneIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <!-- Mobile Preview Toggle -->
                    <button @click="showPreviewMobile = true"
                        class="lg:hidden p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg ml-2">
                        <EyeIcon class="w-6 h-6" />
                    </button>
                </div>
            </header>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 space-y-10">

                <!-- Section: Client -->
                <section class="space-y-4 animate-slideIn" style="animation-delay: 0.1s">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-medium text-white flex items-center gap-2">
                            <span class="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
                                <UserIcon class="w-4 h-4" />
                            </span>
                            Informations Client
                        </h2>
                        <button @click="createNewClient"
                            class="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">+
                            Nouveau client</button>
                    </div>

                    <div class="bg-[#1E293B] rounded-xl border border-slate-700/50 p-1 relative shadow-sm">
                        <div class="relative">
                            <MagnifyingGlassIcon
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input v-model="client.nom" placeholder="Rechercher un client ou une entreprise..."
                                class="w-full pl-11 pr-4 py-4 bg-transparent text-white placeholder-slate-500 border-none rounded-lg focus:ring-0 text-sm font-medium"
                                @focus="showClientDropdown = true" @blur="handleClientBlur" />
                        </div>

                        <!-- Auto-complete Dropdown -->
                        <div v-if="showClientDropdown && filteredClients.length > 0"
                            class="absolute z-20 left-0 right-0 top-full mt-2 bg-[#1E293B] border border-slate-700 rounded-xl shadow-xl py-2 max-h-60 overflow-y-auto">
                            <div v-for="clientItem in filteredClients" :key="clientItem.id"
                                @mousedown.prevent="selectClient(clientItem)"
                                class="px-4 py-3 hover:bg-slate-800 cursor-pointer flex items-center justify-between group">
                                <div>
                                    <div
                                        class="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                                        {{ clientItem.nom }}</div>
                                    <div class="text-xs text-slate-500">{{ clientItem.email }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Selected Client Quick View (Optional) -->
                    <div v-if="client.email"
                        class="flex gap-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-200">
                        <EnvelopeIcon class="w-4 h-4 opacity-70" />
                    </div>
                </section>

                <hr class="border-slate-800/80" />

                <!-- Section: Invoice Details -->
                <section class="space-y-4 animate-slideIn" style="animation-delay: 0.2s">
                    <h2 class="text-lg font-medium text-white flex items-center gap-2">
                        <span class="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
                            <DocumentTextIcon class="w-4 h-4" />
                        </span>
                        Détails
                    </h2>

                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1E293B]/50 p-6 rounded-2xl border border-slate-800">
                        <div class="space-y-2">
                            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Numéro de
                                facture</label>
                            <input v-model="numeroFacture" readonly
                                class="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2.5 text-slate-400 font-mono text-sm focus:outline-none cursor-not-allowed" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date
                                d'émission</label>
                            <input type="date" v-model="dateEmission"
                                class="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" />
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conditions de
                                paiement</label>
                            <div class="relative">
                                <select v-model="conditionsPaiement"
                                    class="appearance-none w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none cursor-pointer">
                                    <option value="30">30 jours net</option>
                                    <option value="15">15 jours net</option>
                                    <option value="60">60 jours net</option>
                                    <option value="0">À réception</option>
                                </select>
                                <ChevronDownIcon
                                    class="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date
                                d'échéance</label>
                            <input type="date" v-model="dateEcheance"
                                class="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" />
                        </div>

                        <!-- Optional Fields -->
                        <div class="md:col-span-2 grid grid-cols-2 gap-6 pt-2 border-t border-slate-800/50 mt-2">
                            <div class="space-y-2">
                                <label class="text-xs font-semibold text-slate-600 uppercase tracking-wider">Réf.
                                    Engagement (Opt.)</label>
                                <input v-model="numeroEngagement" placeholder="PO-XXXXX"
                                    class="w-full bg-transparent border-b border-slate-700 rounded-none px-0 py-2 text-white text-sm focus:ring-0 focus:border-indigo-500 transition-colors placeholder-slate-700" />
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-semibold text-slate-600 uppercase tracking-wider">Code
                                    Service (Opt.)</label>
                                <input v-model="codeService" placeholder="SERV-XXXX"
                                    class="w-full bg-transparent border-b border-slate-700 rounded-none px-0 py-2 text-white text-sm focus:ring-0 focus:border-indigo-500 transition-colors placeholder-slate-700" />
                            </div>
                        </div>
                    </div>
                </section>

                <hr class="border-slate-800/80" />

                <!-- Section: Products -->
                <section class="space-y-4 animate-slideIn" style="animation-delay: 0.3s">
                    <h2 class="text-lg font-medium text-white flex items-center gap-2">
                        <span class="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
                            <CubeIcon class="w-4 h-4" />
                        </span>
                        Produits & Services
                    </h2>

                    <div class="border border-slate-800 rounded-2xl overflow-hidden bg-[#1E293B]/30">
                        <table class="w-full text-left">
                            <thead>
                                <tr
                                    class="bg-[#0F172A] border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                    <th class="px-4 py-4 w-[40%]">Description</th>
                                    <th class="px-2 py-4 text-center w-[12%]">Type</th>
                                    <th class="px-2 py-4 text-center w-[12%]">Qté</th>
                                    <th class="px-2 py-4 text-right w-[15%]">Prix U.</th>
                                    <th class="px-2 py-4 text-center w-[10%]">TVA</th>
                                    <th class="px-4 py-4 text-right w-[15%]">Total</th>
                                    <th class="px-2 py-4 w-[5%]"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-800/50">
                                <tr v-for="(produit, index) in produits" :key="index"
                                    class="group hover:bg-slate-800/50 transition-colors">
                                    <td class="px-4 py-2">
                                        <input v-model="produit.nom" type="text" placeholder="Description..."
                                            class="w-full bg-transparent border-none p-2 text-white placeholder-slate-600 focus:ring-0 text-sm font-medium rounded-md focus:bg-slate-800" />
                                    </td>
                                    <td class="px-2 py-2">
                                        <select v-model="produit.type"
                                            class="w-full bg-transparent border-none text-sm text-slate-300 focus:ring-0 cursor-pointer text-center p-1 rounded-md hover:bg-slate-800">
                                            <option value="Biens" class="bg-slate-900">Biens</option>
                                            <option value="Services" class="bg-slate-900">Services</option>
                                        </select>
                                    </td>
                                    <td class="px-2 py-2">
                                        <div class="flex items-center justify-center">
                                            <input v-model.number="produit.quantite" type="number" min="1"
                                                class="w-16 bg-[#0F172A] border border-slate-700 rounded px-2 py-1 text-center text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                                        </div>
                                    </td>
                                    <td class="px-2 py-2 text-right">
                                        <input v-model.number="produit.prix" type="number" step="0.01"
                                            class="w-20 bg-[#0F172A] border border-slate-700 rounded px-2 py-1 text-right text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                                    </td>
                                    <td class="px-2 py-2 text-center">
                                        <select v-model="produit.tva"
                                            class="w-full bg-transparent border-none text-sm text-slate-300 focus:ring-0 cursor-pointer text-center p-1 rounded-md hover:bg-slate-800">
                                            <option value="0%" class="bg-slate-900">0%</option>
                                            <option value="5.5%" class="bg-slate-900">5.5%</option>
                                            <option value="10%" class="bg-slate-900">10%</option>
                                            <option value="20%" class="bg-slate-900">20%</option>
                                        </select>
                                    </td>
                                    <td class="px-4 py-2 text-right text-sm font-semibold text-emerald-400">
                                        {{ formatPrix(produit.quantite * produit.prix) }}
                                    </td>
                                    <td class="px-2 py-2 text-center">
                                        <button @click="supprimerLigne(index)"
                                            class="p-1.5 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all opacity-0 group-hover:opacity-100">
                                            <TrashIcon class="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="ajouterProduit"
                            class="w-full py-3 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-2 border-t border-slate-800">
                            <PlusIcon class="w-4 h-4" />
                            Ajouter une ligne
                        </button>
                    </div>
                </section>

                <hr class="border-slate-800/80" />

                <!-- Section: Footer & Totals -->
                <section class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideIn" style="animation-delay: 0.4s">
                    <div class="space-y-4">
                        <h2 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Notes & Conditions
                        </h2>
                        <textarea v-model="notesBasPage"
                            placeholder="Ajouter un message personnel, des instructions de virement ou des remerciements..."
                            class="w-full h-32 bg-[#1E293B] border border-slate-700 rounded-xl p-4 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none placeholder-slate-600"></textarea>
                    </div>

                    <div class="bg-[#1E293B] rounded-2xl p-6 border border-slate-800 space-y-4 shadow-lg">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-slate-400">Réduction</span>
                            <div class="flex items-center gap-4">
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" v-model="utiliseReduction" true-value="oui" false-value="non"
                                        class="sr-only peer">
                                    <div
                                        class="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500">
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div v-if="utiliseReduction === 'oui'" class="flex gap-2">
                            <select v-model="reduction.type"
                                class="bg-[#0F172A] border border-slate-700 rounded-lg text-xs text-white px-2 py-1 outline-none">
                                <option value="montant">Montant</option>
                                <option value="pourcentage">%</option>
                            </select>
                            <input v-model.number="reduction.valeur" type="number"
                                class="flex-1 bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-1 text-sm text-white outline-none focus:border-indigo-500" />
                        </div>

                        <div class="h-px bg-slate-700/50 my-2"></div>

                        <div class="space-y-2">
                            <div class="flex justify-between text-sm text-slate-400">
                                <span>Total HT</span>
                                <span>{{ formatPrix(totalHT) }}</span>
                            </div>
                            <div v-if="montantReduction > 0" class="flex justify-between text-sm text-emerald-400">
                                <span>Réduction</span>
                                <span>-{{ formatPrix(montantReduction) }}</span>
                            </div>
                            <div
                                class="flex justify-between text-lg font-bold text-white pt-2 border-t border-slate-700/50">
                                <span>Total TTC</span>
                                <span class="text-indigo-400">{{ formatPrix(totalTTC) }}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="h-10"></div> <!-- Spacer -->
            </div>
        </div>

        <!-- Right Panel: Live Preview (Static/Sticky) -->
        <div
            class="hidden lg:flex lg:w-[45%] h-full bg-[#020617] relative items-center justify-center p-8 overflow-hidden">
            <!-- Preview Background Decoration -->
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617]">
            </div>

            <!-- Floating Action Bar for Preview -->
            <div
                class="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur rounded-full px-4 py-2 border border-slate-700/50 flex items-center gap-4 shadow-2xl z-20">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aperçu en direct</span>
                <div class="w-px h-3 bg-slate-600"></div>
                <button @click="genererPDF"
                    class="text-xs text-white hover:text-indigo-400 transition-colors flex items-center gap-1">
                    <ArrowDownTrayIcon class="w-3.5 h-3.5" />
                    PDF
                </button>
            </div>

            <!-- The Invoice Paper -->
            <div class="relative w-full h-full flex items-center justify-center">
                <div
                    class="scale-[0.6] xl:scale-[0.7] transition-all duration-300 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
                    <!-- Component is rendered here -->
                    <component v-if="selectedTemplateComponent" :is="selectedTemplateComponent" :societer="societer"
                        :client="client" :produits="produits" :totalHT="totalHT" :totalTTC="totalTTC"
                        :montantReduction="montantReduction" :date_emission="dateEmission" :date_echeance="dateEcheance"
                        :factureId="numeroFacture" :suplement="notesBasPage" />
                </div>
            </div>
        </div>

        <!-- Mobile Preview Modal Container -->
        <div v-if="showPreviewMobile" class="lg:hidden fixed inset-0 z-50 bg-[#0F172A] flex flex-col animate-fadeIn">
            <div class="flex items-center justify-between px-4 py-3 bg-[#1E293B] border-b border-slate-700">
                <h3 class="font-medium text-white">Aperçu</h3>
                <button @click="showPreviewMobile = false"
                    class="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                    <XMarkIcon class="w-5 h-5" />
                </button>
            </div>

            <div class="flex-1 overflow-auto p-4 flex justify-center bg-[#020617]">
                <div class="scale-[0.8] origin-top mt-4">
                    <component v-if="selectedTemplateComponent" :is="selectedTemplateComponent" :societer="societer"
                        :client="client" :produits="produits" :totalHT="totalHT" :totalTTC="totalTTC"
                        :montantReduction="montantReduction" :date_emission="dateEmission" :date_echeance="dateEcheance"
                        :factureId="numeroFacture" :suplement="notesBasPage" />
                </div>
            </div>

            <div class="p-4 bg-[#1E293B] border-t border-slate-700">
                <button @click="genererPDF"
                    class="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-500 transition-colors">
                    Télécharger
                </button>
            </div>
        </div>

        <TemplateSelectorDialog />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useTemplateSelection } from "@/composables/useTemplateSelection";
import { useFacturesStore } from "@/modules/Invoice/stores/invoice.store";
import { useClientsStore } from "@/modules/Client/stores/client.store";
import { showToastMessage } from "@/composables/useToast";
import { formatCurrency } from "@/shared/utils/format";
import Facture from "@/models/facture";
import {
    ArrowLeftIcon,
    ChevronDownIcon,
    DocumentArrowDownIcon,
    PaperAirplaneIcon,
    EyeIcon,
    UserIcon,
    MagnifyingGlassIcon,
    EnvelopeIcon,
    DocumentTextIcon,
    CubeIcon,
    TrashIcon,
    PlusIcon,
    ArrowDownTrayIcon,
    XMarkIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const factureStore = useFacturesStore();
const clientsStore = useClientsStore();

// État réactif
const showPreviewMobile = ref(false);
const isSaving = ref(false);
const showClientDropdown = ref(false);
const ajouterMoyensPaiement = ref(false);
const numeroFacture = ref("F-" + Date.now().toString().slice(-5));
const dateEmission = ref(new Date().toISOString().split("T")[0]);
const dateEcheance = ref(
    new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .split("T")[0]
);
const conditionsPaiement = ref("30");
const numeroEngagement = ref("");
const codeService = ref("");
const utiliseReduction = ref("non");
const notesBasPage = ref("");

// Données de la facture
const societer = ref({
    nom: "Ma Société",
    adresse: "123 Rue des Entrepreneurs\n75001 Paris",
    email: "contact@masociete.com",
    telephone: "+33 1 23 45 67 89",
});

const client = ref({
    nom: "",
    address: "",
    email: "",
    telephone: "",
});

const produits = ref([
    {
        nom: "",
        quantite: 1,
        prix: 0,
        type: "Biens",
        unite: "u",
        tva: "0%",
    },
]);

const reduction = ref({
    type: "pourcentage",
    valeur: 0,
});

import TemplateSelectorDialog from "@/modules/Invoice/components/templates/TemplateSelectorDialog.vue";

// Gestion des templates
const {
    selectedTemplate,
    selectedTemplateId,
    selectedTemplateComponent,
    openTemplateDialog,
    setTemplate,
    initializeTemplate,
} = useTemplateSelection();

// Charger les clients
onMounted(async () => {
    await clientsStore.chargerClients();

    // Charger les infos de la société depuis le localStorage si disponibles
    const savedCompany = localStorage.getItem("companyInfo");
    if (savedCompany) {
        societer.value = JSON.parse(savedCompany);
    }
});

// Calculs réactifs
const totalHT = computed(() => {
    return produits.value.reduce((total, p) => {
        const tva = parseFloat(p.tva) || 0;
        return total + p.prix * p.quantite * (1 + tva / 100);
    }, 0);
});

const montantReduction = computed(() => {
    if (utiliseReduction.value !== "oui") return 0;
    return reduction.value.type === "pourcentage"
        ? totalHT.value * (reduction.value.valeur / 100)
        : reduction.value.valeur;
});

const totalTTC = computed(() => totalHT.value - montantReduction.value);

const filteredClients = computed(() => {
    if (!client.value.nom) return clientsStore.paginatedClients;
    const searchTerm = client.value.nom.toLowerCase();
    return clientsStore.paginatedClients.filter(
        (c) =>
            c.nom.toLowerCase().includes(searchTerm) ||
            c.email.toLowerCase().includes(searchTerm)
    );
});

// Formatage des prix
function formatPrix(valeur) {
    return formatCurrency(valeur);
}

// Méthodes
function ajouterProduit() {
    produits.value.push({
        nom: "",
        quantite: 1,
        prix: 0,
        type: "Biens",
        unite: "u",
        tva: "0%",
    });
}

function supprimerLigne(index) {
    if (produits.value.length > 1) {
        produits.value.splice(index, 1);
    }
}

function selectClient(clientItem) {
    client.value = {
        nom: clientItem.nom,
        address: clientItem.adresse,
        email: clientItem.email,
        telephone: clientItem.telephone,
    };
    showClientDropdown.value = false;
}

function createNewClient() {
    // Ici vous pourriez ouvrir un modal pour créer un nouveau client
    // Pour l'exemple, on crée un client basique
    client.value = {
        nom: client.value.nom,
        address: "",
        email: "",
        telephone: "",
    };
    showClientDropdown.value = false;
}

function handleClientBlur() {
    setTimeout(() => {
        showClientDropdown.value = false;
    }, 200);
}

async function creerFacture() {
    if (!client.value.nom) {
        showToastMessage("Veuillez sélectionner un client", "warning");
        return;
    }

    if (produits.value.some((p) => !p.nom || p.prix <= 0)) {
        showToastMessage(
            "Veuillez remplir tous les produits correctement",
            "warning"
        );
        return;
    }

    // Sur mobile, on montre l'aperçu
    if (window.innerWidth < 1024) {
        showPreviewMobile.value = true;
        return;
    }

    // Sinon on continue avec la création
    await envoyerFacture();
}

async function envoyerFacture() {
    isSaving.value = true;

    try {
        const factureData = {
            client: client.value,
            societer: societer.value,
            produits: produits.value,
            reduction: utiliseReduction.value === "oui" ? reduction.value : null,
            suplement: notesBasPage.value,
            date_emission: dateEmission.value,
            date_echeance: dateEcheance.value,
            template: selectedTemplate.value,
            statut: "en_attente",
            devise: { code: "XOF", symbole: "FCFA" },
        };

        await factureStore.creerFactureComplete(factureData);

        showToastMessage("Facture créée avec succès !", "success");
        router.push("/factures");
    } catch (error) {
        console.error("Erreur lors de la création de la facture:", error);
        showToastMessage("Erreur lors de la création de la facture", "error");
    } finally {
        isSaving.value = false;
    }
}

async function sauvegarderBrouillon() {
    isSaving.value = true;

    try {
        const brouillon = {
            numero: numeroFacture.value,
            client: client.value,
            societer: societer.value,
            produits: produits.value,
            reduction: reduction.value,
            notes: notesBasPage.value,
            dateEmission: dateEmission.value,
            dateEcheance: dateEcheance.value,
            template: selectedTemplate.value,
        };

        localStorage.setItem("brouillonFacture", JSON.stringify(brouillon));
        showToastMessage("Brouillon enregistré", "success");
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du brouillon:", error);
        showToastMessage("Erreur lors de l'enregistrement du brouillon", "error");
    } finally {
        isSaving.value = false;
    }
}

async function genererPDF() {
    try {
        const facture = new Facture(
            societer.value,
            client.value,
            produits.value,
            utiliseReduction.value === "oui" ? reduction.value : null,
            notesBasPage.value,
            null,
            dateEmission.value,
            dateEcheance.value,
            selectedTemplate.value.id,
            "en_attente",
            { code: "XOF", symbole: "FCFA" }
        );

        // Dans une application réelle, vous utiliseriez une librairie comme jsPDF
        // ou enverriez une requête au backend pour générer le PDF
        console.log("Génération PDF pour la facture:", facture);
        showToastMessage("PDF généré avec succès", "success");

        // Simulation de téléchargement
        const blob = new Blob([JSON.stringify(facture, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `facture-${numeroFacture.value}.json`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        showToastMessage("Erreur lors de la génération du PDF", "error");
    }
}

// Watchers
watch(conditionsPaiement, (newValue) => {
    if (dateEmission.value) {
        const days = parseInt(newValue);
        const newDate = new Date(dateEmission.value);
        newDate.setDate(newDate.getDate() + days);
        dateEcheance.value = newDate.toISOString().split("T")[0];
    }
});

watch(dateEmission, (newDate) => {
    if (newDate) {
        const days = parseInt(conditionsPaiement.value);
        const newDateObj = new Date(newDate);
        newDateObj.setDate(newDateObj.getDate() + days);
        dateEcheance.value = newDateObj.toISOString().split("T")[0];
    }
});
</script>

<style scoped>
/* Styles spécifiques au composant */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #0F172A;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #475569;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
}

.animate-slideIn {
    opacity: 0;
    animation: slideIn 0.5s ease-out forwards;
}
</style>
