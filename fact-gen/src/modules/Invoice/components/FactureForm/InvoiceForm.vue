<template>
    <div class="flex h-screen bg-[#F8F9FA] text-[#1A1C1E] font-sans overflow-hidden selection:bg-[#D3E4FF]">
        <!-- Left Panel: Editor (Scrollable) -->
        <div class="w-full lg:w-[55%] h-full flex flex-col border-r border-outline-variant bg-white">
            <!-- Sticky Header -->
            <header
                class="h-16 shrink-0 bg-white/80 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-6 sticky top-0 z-20">
                <div class="flex items-center gap-4">
                    <button @click="$router.back()"
                        class="p-2 hover:bg-[#F8F9FA] rounded-full transition-colors text-surface-on-variant hover:text-[#005AC1]">
                        <ArrowLeftIcon class="w-5 h-5" />
                    </button>
                    <div>
                        <h1 class="text-base font-bold text-[#1A1C1E] tracking-tight">Configuration Document</h1>
                        <div class="flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            <span
                                class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest">Sauvegarde
                                active</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <button @click="openTemplateDialog"
                        class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#F8F9FA] hover:bg-[#D3E4FF]/30 border border-outline-variant rounded-lg transition-all group">
                        <span
                            class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">Modèle</span>
                        <div class="w-px h-3 bg-outline-variant"></div>
                        <span class="text-xs font-bold text-[#005AC1]">{{ selectedTemplate.nom }}</span>
                        <ChevronDownIcon class="w-4 h-4 text-surface-on-variant" />
                    </button>

                    <div class="h-6 w-px bg-outline-variant mx-1"></div>

                    <button @click="creerFacture"
                        class="group relative flex items-center gap-2 px-6 py-2 bg-[#005AC1] hover:bg-[#004494] text-white rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md">
                        <span>Finaliser</span>
                        <PaperAirplaneIcon class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <!-- Mobile Preview Toggle -->
                    <button @click="showPreviewMobile = true"
                        class="lg:hidden p-2 text-[#005AC1] hover:bg-[#D3E4FF]/30 rounded-lg ml-2">
                        <EyeIcon class="w-6 h-6" />
                    </button>
                </div>
            </header>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 space-y-10">

                <!-- Section: Client -->
                <section class="space-y-4">
                    <div class="flex items-center justify-between">
                        <h2
                            class="text-sm font-bold text-surface-on-variant uppercase tracking-widest flex items-center gap-2">
                            <span class="p-1.5 rounded-md bg-[#D3E4FF] text-[#005AC1]">
                                <UserIcon class="w-4 h-4" />
                            </span>
                            Informations Client
                        </h2>
                        <button @click="createNewClient"
                            class="text-xs font-bold text-[#005AC1] hover:underline transition-colors">+ Nouveau
                            client</button>
                    </div>

                    <div class="relative">
                        <MagnifyingGlassIcon
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-on-variant" />
                        <input v-model="client.nom" placeholder="Rechercher un client existant..."
                            class="w-full pl-12 pr-4 h-12 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-medium transition-all"
                            @focus="showClientDropdown = true" @blur="handleClientBlur" />

                        <!-- Auto-complete Dropdown -->
                        <div v-if="showClientDropdown && filteredClients.length > 0"
                            class="absolute z-20 left-0 right-0 top-full mt-2 bg-white border border-outline-variant rounded-xl shadow-xl py-2 max-h-60 overflow-y-auto">
                            <div v-for="clientItem in filteredClients" :key="clientItem.id"
                                @mousedown.prevent="selectClient(clientItem)"
                                class="px-6 py-3 hover:bg-[#F8F9FA] cursor-pointer flex items-center justify-between group">
                                <div>
                                    <div
                                        class="text-sm font-bold text-[#1A1C1E] group-hover:text-[#005AC1] transition-colors">
                                        {{ clientItem.nom }}</div>
                                    <div class="text-xs text-surface-on-variant">{{ clientItem.email }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="client.email"
                        class="flex gap-4 p-4 rounded-xl bg-[#F8F9FA] border border-outline-variant text-[11px] font-medium text-surface-on-variant">
                        <div class="flex items-center gap-2">
                            <EnvelopeIcon class="w-3.5 h-3.5" />
                            <span>{{ client.email }}</span>
                        </div>
                        <div class="flex items-center gap-2 ml-4">
                            <MapPinIcon class="w-3.5 h-3.5" />
                            <span class="truncate">{{ client.address }}</span>
                        </div>
                    </div>
                </section>

                <hr class="border-outline-variant/50" />

                <!-- Section: Invoice Details -->
                <section class="space-y-4">
                    <h2
                        class="text-sm font-bold text-surface-on-variant uppercase tracking-widest flex items-center gap-2">
                        <span class="p-1.5 rounded-md bg-[#D3E4FF] text-[#005AC1]">
                            <DocumentTextIcon class="w-4 h-4" />
                        </span>
                        Détails du document
                    </h2>

                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F8F9FA] p-6 rounded-2xl border border-outline-variant">
                        <div class="space-y-1.5">
                            <label
                                class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Référence
                                document</label>
                            <input v-model="numeroFacture" readonly
                                class="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-[#1A1C1E] font-bold text-sm focus:outline-none cursor-not-allowed" />
                        </div>

                        <div class="space-y-1.5">
                            <label
                                class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Date
                                d'émission</label>
                            <input type="date" v-model="dateEmission"
                                class="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-[#1A1C1E] text-sm font-bold focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] transition-all outline-none" />
                        </div>

                        <div class="space-y-1.5">
                            <label
                                class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Conditions
                                de règlement</label>
                            <div class="relative">
                                <select v-model="conditionsPaiement"
                                    class="appearance-none w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-[#1A1C1E] text-sm font-bold focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] transition-all outline-none cursor-pointer">
                                    <option value="30">30 jours net</option>
                                    <option value="15">15 jours net</option>
                                    <option value="60">60 jours net</option>
                                    <option value="0">À réception</option>
                                </select>
                                <ChevronDownIcon
                                    class="w-4 h-4 text-surface-on-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div class="space-y-1.5">
                            <label
                                class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Date
                                d'échéance estimée</label>
                            <input type="date" v-model="dateEcheance"
                                class="w-full bg-white border border-outline-variant rounded-xl px-4 py-2.5 text-[#1A1C1E] text-sm font-bold focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] transition-all outline-none" />
                        </div>
                    </div>
                </section>

                <hr class="border-outline-variant/50" />

                <!-- Section: Products -->
                <section class="space-y-4">
                    <h2
                        class="text-sm font-bold text-surface-on-variant uppercase tracking-widest flex items-center gap-2">
                        <span class="p-1.5 rounded-md bg-[#D3E4FF] text-[#005AC1]">
                            <CubeIcon class="w-4 h-4" />
                        </span>
                        Lignes de facturation
                    </h2>

                    <div class="border border-outline-variant rounded-2xl overflow-hidden bg-white shadow-sm">
                        <table class="w-full text-left">
                            <thead>
                                <tr
                                    class="bg-[#F8F9FA] border-b border-outline-variant text-[10px] text-surface-on-variant uppercase tracking-widest font-bold">
                                    <th class="px-6 py-4 w-[45%]">Description</th>
                                    <th class="px-2 py-4 text-center w-[10%]">Qté</th>
                                    <th class="px-2 py-4 text-right w-[15%]">Prix Unitaire</th>
                                    <th class="px-2 py-4 text-center w-[12%]">TVA</th>
                                    <th class="px-6 py-4 text-right w-[18%]">Total</th>
                                    <th class="px-2 py-4 w-[5%]"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant/30">
                                <tr v-for="(produit, index) in produits" :key="index" class="group transition-colors">
                                    <td class="px-6 py-3">
                                        <input v-model="produit.nom" type="text"
                                            placeholder="Désignation du produit ou service..."
                                            class="w-full bg-transparent border-none p-2 text-[#1A1C1E] placeholder-surface-on-variant/50 focus:ring-0 text-sm font-bold rounded-lg focus:bg-[#F8F9FA]" />
                                    </td>
                                    <td class="px-2 py-3">
                                        <input v-model.number="produit.quantite" type="number" min="1"
                                            class="w-16 bg-[#F8F9FA] border border-outline-variant rounded-lg px-2 py-1.5 text-center text-[#1A1C1E] text-sm font-bold focus:border-[#005AC1] outline-none transition-all" />
                                    </td>
                                    <td class="px-2 py-3 text-right">
                                        <input v-model.number="produit.prix" type="number" step="0.01"
                                            class="w-24 bg-[#F8F9FA] border border-outline-variant rounded-lg px-2 py-1.5 text-right text-[#1A1C1E] text-sm font-bold focus:border-[#005AC1] outline-none transition-all" />
                                    </td>
                                    <td class="px-2 py-3 text-center">
                                        <select v-model="produit.tva"
                                            class="bg-transparent border-none text-xs font-bold text-[#005AC1] focus:ring-0 cursor-pointer text-center p-1 rounded-lg hover:bg-[#D3E4FF]/30 transition-all">
                                            <option value="0%">0%</option>
                                            <option value="5.5%">5.5%</option>
                                            <option value="10%">10%</option>
                                            <option value="20%">20%</option>
                                        </select>
                                    </td>
                                    <td class="px-6 py-3 text-right text-sm font-bold text-[#1A1C1E]">
                                        {{ formatPrix(produit.quantite * produit.prix) }}
                                    </td>
                                    <td class="px-2 py-3 text-center">
                                        <button @click="supprimerLigne(index)"
                                            class="p-2 text-surface-on-variant hover:text-red-600 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100">
                                            <TrashIcon class="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click="ajouterProduit"
                            class="w-full py-4 text-[10px] uppercase tracking-widest font-bold text-[#005AC1] hover:bg-[#D3E4FF]/10 transition-all flex items-center justify-center gap-2 border-t border-outline-variant">
                            <PlusIcon class="w-4 h-4" />
                            Ajouter un item
                        </button>
                    </div>
                </section>

                <hr class="border-outline-variant/50" />

                <!-- Section: Footer & Totals -->
                <section class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="space-y-4">
                        <h2 class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest ml-1">Notes
                            complémantaires</h2>
                        <textarea v-model="notesBasPage"
                            placeholder="Coordonnées bancaires, remerciements ou mentions légales spécifiques..."
                            class="w-full h-32 bg-white border border-outline-variant rounded-2xl p-4 text-sm font-medium text-[#1A1C1E] focus:ring-2 focus:ring-[#005AC1]/10 focus:border-[#005AC1] transition-all outline-none resize-none placeholder-surface-on-variant/40 shadow-sm"></textarea>
                    </div>

                    <div class="bg-white rounded-2xl p-8 border border-outline-variant space-y-4 shadow-sm">
                        <div class="flex items-center justify-between">
                            <span
                                class="text-xs font-bold text-surface-on-variant uppercase tracking-wider">Réduction</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" v-model="utiliseReduction" true-value="oui" false-value="non"
                                    class="sr-only peer">
                                <div
                                    class="w-10 h-6 bg-[#F8F9FA] border border-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-surface-on-variant after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#005AC1] peer-checked:after:bg-white">
                                </div>
                            </label>
                        </div>

                        <div v-if="utiliseReduction === 'oui'"
                            class="flex gap-2 animate-in slide-in-from-top-2 duration-200">
                            <select v-model="reduction.type"
                                class="bg-[#F8F9FA] border border-outline-variant rounded-xl text-xs font-bold text-[#1A1C1E] px-4 py-2 outline-none focus:border-[#005AC1]">
                                <option value="montant">Fixe (EUR)</option>
                                <option value="pourcentage">Poucentage (%)</option>
                            </select>
                            <input v-model.number="reduction.valeur" type="number"
                                class="flex-1 bg-[#F8F9FA] border border-outline-variant rounded-xl px-4 py-2 text-sm font-bold text-[#1A1C1E] outline-none focus:border-[#005AC1]" />
                        </div>

                        <div class="h-px bg-outline-variant/30 my-4"></div>

                        <div class="space-y-3">
                            <div class="flex justify-between text-xs font-bold text-surface-on-variant uppercase">
                                <span>Sous-total HT</span>
                                <span class="text-[#1A1C1E]">{{ formatPrix(totalHT) }}</span>
                            </div>
                            <div v-if="montantReduction > 0"
                                class="flex justify-between text-xs font-bold text-green-600 uppercase">
                                <span>Remise commerciale</span>
                                <span>-{{ formatPrix(montantReduction) }}</span>
                            </div>
                            <div
                                class="flex justify-between text-lg font-black text-[#1A1C1E] pt-4 border-t border-outline-variant/50">
                                <span class="uppercase tracking-tighter">Total à régler</span>
                                <span class="text-[#005AC1]">{{ formatPrix(totalTTC) }}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="h-10"></div>
            </div>
        </div>

        <!-- Right Panel: Live Preview (Sticky) -->
        <div
            class="hidden lg:flex lg:w-[45%] h-full bg-[#F1F3F5] relative items-center justify-center p-8 overflow-hidden">
            <!-- Background Accent -->
            <div
                class="absolute inset-0 opacity-40 bg-[radial-gradient(#005AC1_0.5px,transparent_0.5px)] [background-size:24px_24px]">
            </div>

            <div
                class="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-6 py-2.5 border border-outline-variant shadow-lg flex items-center gap-4 z-20">
                <span class="text-[10px] font-bold text-surface-on-variant uppercase tracking-[0.2em]">Aperçu en temps
                    réel</span>
                <div class="w-px h-3 bg-outline-variant"></div>
                <button @click="genererPDF"
                    class="text-[10px] font-bold text-[#005AC1] hover:underline uppercase">Télécharger PDF</button>
            </div>

            <!-- The Document Canvas -->
            <div class="relative w-full h-full flex items-center justify-center drop-shadow-2xl">
                <div
                    class="scale-[0.55] xl:scale-[0.65] 2xl:scale-[0.75] transition-all duration-500 origin-center bg-white">
                    <component v-if="selectedTemplateComponent" :is="selectedTemplateComponent" :societer="societer"
                        :client="client" :produits="produits" :totalHT="totalHT" :totalTTC="totalTTC"
                        :montantReduction="montantReduction" :date_emission="dateEmission" :date_echeance="dateEcheance"
                        :factureId="numeroFacture" :suplement="notesBasPage" />
                </div>
            </div>
        </div>

        <!-- Mobile Preview Sheet -->
        <transition name="slide-up">
            <div v-if="showPreviewMobile" class="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
                <div class="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
                    <h3 class="font-bold text-[#1A1C1E]">Aperçu du document</h3>
                    <button @click="showPreviewMobile = false"
                        class="p-2 bg-[#F8F9FA] rounded-full text-surface-on-variant">
                        <XMarkIcon class="w-5 h-5" />
                    </button>
                </div>

                <div class="flex-1 overflow-auto bg-[#F1F3F5] p-4 flex justify-center">
                    <div class="scale-[0.75] origin-top mt-8 bg-white shadow-xl">
                        <component v-if="selectedTemplateComponent" :is="selectedTemplateComponent" :societer="societer"
                            :client="client" :produits="produits" :totalHT="totalHT" :totalTTC="totalTTC"
                            :montantReduction="montantReduction" :date_emission="dateEmission"
                            :date_echeance="dateEcheance" :factureId="numeroFacture" :suplement="notesBasPage" />
                    </div>
                </div>

                <div class="p-6 bg-white border-t border-outline-variant">
                    <button @click="genererPDF" class="w-full btn-filled py-4 shadow-lg">Générer le PDF final</button>
                </div>
            </div>
        </transition>

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
    XMarkIcon,
    MapPinIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const factureStore = useFacturesStore();
const clientsStore = useClientsStore();

// État
const showPreviewMobile = ref(false);
const isSaving = ref(false);
const showClientDropdown = ref(false);
const numeroFacture = ref("F-" + Date.now().toString().slice(-5));
const dateEmission = ref(new Date().toISOString().split("T")[0]);
const dateEcheance = ref(new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0]);
const conditionsPaiement = ref("30");
const utiliseReduction = ref("non");
const notesBasPage = ref("");

const societer = ref({
    nom: "Ma Société",
    adresse: "123 Rue des Entrepreneurs, 75001 Paris",
    email: "contact@masociete.com",
    telephone: "+33 1 23 45 67 89",
});

const client = ref({ nom: "", address: "", email: "", telephone: "" });
const produits = ref([{ nom: "", quantite: 1, prix: 0, type: "Services", unite: "u", tva: "0%" }]);
const reduction = ref({ type: "pourcentage", valeur: 0 });

import TemplateSelectorDialog from "@/modules/Invoice/components/templates/TemplateSelectorDialog.vue";

const {
    selectedTemplate,
    selectedTemplateComponent,
    openTemplateDialog,
} = useTemplateSelection();

onMounted(async () => {
    await clientsStore.chargerClients();
    const savedCompany = localStorage.getItem("companyInfo");
    if (savedCompany) societer.value = JSON.parse(savedCompany);
});

const totalHT = computed(() => produits.value.reduce((total, p) => total + (p.prix * p.quantite), 0));
const montantReduction = computed(() => {
    if (utiliseReduction.value !== "oui") return 0;
    return reduction.value.type === "pourcentage" ? totalHT.value * (reduction.value.valeur / 100) : reduction.value.valeur;
});
const totalTTC = computed(() => totalHT.value - montantReduction.value);

const filteredClients = computed(() => {
    if (!client.value.nom) return clientsStore.paginatedClients;
    const term = client.value.nom.toLowerCase();
    return clientsStore.paginatedClients.filter(c => c.nom.toLowerCase().includes(term) || c.email.toLowerCase().includes(term));
});

function formatPrix(val) { return formatCurrency(val); }
function ajouterProduit() { produits.value.push({ nom: "", quantite: 1, prix: 0, type: "Services", unite: "u", tva: "0%" }); }
function supprimerLigne(idx) { if (produits.value.length > 1) produits.value.splice(idx, 1); }

function selectClient(item) {
    client.value = { nom: item.nom, address: item.adresse, email: item.email, telephone: item.telephone };
    showClientDropdown.value = false;
}

function createNewClient() { showToastMessage("Ajout rapide non implémenté. Utilisez le module Client.", "info"); }
function handleClientBlur() { setTimeout(() => showClientDropdown.value = false, 200); }

async function creerFacture() {
    if (!client.value.nom) { showToastMessage("Client requis", "warning"); return; }
    if (produits.value.some(p => !p.nom || p.prix <= 0)) { showToastMessage("Vérifiez vos produits", "warning"); return; }
    await envoyerFacture();
}

async function envoyerFacture() {
    isSaving.value = true;
    try {
        const data = {
            client_data: client.value,
            societer: societer.value,
            produits: produits.value,
            reduction: utiliseReduction.value === "oui" ? reduction.value : null,
            suplement: notesBasPage.value,
            date_emission: dateEmission.value,
            date_echeance: dateEcheance.value,
            template: selectedTemplate.value?.id || 'moderne',
            statut: "en_attente"
        };
        await factureStore.creerFactureComplete(data);
        showToastMessage("Facture éditée !", "success");
        router.push("/factures");
    } catch (e) {
        showToastMessage("Échec de création", "error");
    } finally { isSaving.value = false; }
}

async function genererPDF() { showToastMessage("Génération PDF en cours...", "info"); }

watch(conditionsPaiement, (val) => {
    const days = parseInt(val);
    const date = new Date(dateEmission.value);
    date.setDate(date.getDate() + days);
    dateEcheance.value = date.toISOString().split("T")[0];
});

watch(dateEmission, (val) => {
    const days = parseInt(conditionsPaiement.value);
    const date = new Date(val);
    date.setDate(date.getDate() + days);
    dateEcheance.value = date.toISOString().split("T")[0];
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #F8F9FA;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #DEE2E6;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #ADB5BD;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}
</style>
