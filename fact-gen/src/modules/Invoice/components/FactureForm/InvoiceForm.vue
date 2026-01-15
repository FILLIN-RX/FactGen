<template>
    <div class="flex h-screen bg-[#F8F9FA] text-[#1A1C1E] font-sans overflow-hidden">
        
        <div class="w-full lg:w-[55%] h-full flex flex-col border-r border-gray-200 bg-[#F8F9FA] relative z-10">
            
            <header class="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
                <div class="flex items-center gap-4">
                    <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#005AC1]">
                        <ArrowLeftIcon class="w-5 h-5" />
                    </button>
                    <div>
                        <h1 class="text-base font-bold text-[#1A1C1E]">Éditeur de facture</h1>
                        <p class="text-xs text-gray-500 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Brouillon automatique
                        </p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                        <button 
                            v-for="t in templates" :key="t.id"
                            @click="selectedTemplate = t"
                            :class="['px-3 py-1.5 text-xs font-medium rounded-md transition-all', selectedTemplate.id === t.id ? 'bg-white text-[#005AC1] shadow-sm' : 'text-gray-500 hover:text-gray-700']"
                        >
                            {{ t.name }}
                        </button>
                    </div>

                    <button @click="sauvegarderFacture" :disabled="isSaving" 
                        class="flex items-center gap-2 bg-[#005AC1] hover:bg-[#004ba0] text-white px-5 py-2 rounded-full font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span v-else>Enregistrer</span>
                    </button>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                <section class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <CalendarIcon class="w-4 h-4 text-[#005AC1]" /> Informations
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="group">
                            <label class="block text-xs font-medium text-gray-500 mb-1.5">N° Facture</label>
                            <input v-model="numeroFacture" type="text" 
                                class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#005AC1] focus:bg-white focus:border-[#005AC1] transition-all outline-none" 
                                placeholder="FAC-2024-001" />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-gray-500 mb-1.5">Émission</label>
                                <input v-model="dateEmission" type="date" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#005AC1] transition-colors" />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-500 mb-1.5">Échéance</label>
                                <input v-model="dateEcheance" type="date" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#005AC1] transition-colors" />
                            </div>
                        </div>
                    </div>
                </section>

                <section class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-visible">
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <UserIcon class="w-4 h-4 text-[#005AC1]" /> Client
                    </h3>
                    
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            v-model="clientSearch"
                            @focus="showClientDropdown = true"
                            placeholder="Rechercher ou ajouter un client..." 
                            class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#005AC1] focus:bg-white focus:border-transparent outline-none transition-all"
                        />
                        
                        <div v-if="showClientDropdown && filteredClients.length > 0" 
                            class="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 max-h-60 overflow-y-auto">
                            <ul>
                                <li v-for="client in filteredClients" :key="client.id" 
                                    @click="selectClient(client)"
                                    class="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-center justify-between group">
                                    <div>
                                        <p class="font-medium text-sm text-gray-900 group-hover:text-[#005AC1]">{{ client.nom }}</p>
                                        <p class="text-xs text-gray-500">{{ client.email }}</p>
                                    </div>
                                    <PlusCircleIcon class="w-5 h-5 text-gray-300 group-hover:text-[#005AC1]" />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div v-if="clientSelectionne" class="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded-lg flex justify-between items-start animate-fade-in">
                        <div>
                            <p class="font-bold text-[#005AC1] text-sm">{{ clientSelectionne.nom }}</p>
                            <p class="text-xs text-gray-600 mt-1">{{ clientSelectionne.adresse }}</p>
                            <p class="text-xs text-gray-500">{{ clientSelectionne.email }}</p>
                        </div>
                        <button @click="clientSelectionne = null" class="text-xs text-red-500 hover:text-red-700 font-medium">Changer</button>
                    </div>
                </section>

                <section class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                            <TagIcon class="w-4 h-4 text-[#005AC1]" /> Articles & Services
                        </h3>
                    </div>

                    <div class="grid grid-cols-12 gap-3 text-xs font-semibold text-gray-500 uppercase mb-2 pl-1 pr-8">
                        <div class="col-span-6">Description</div>
                        <div class="col-span-2 text-right">Qté</div>
                        <div class="col-span-2 text-right">Prix</div>
                        <div class="col-span-2 text-right">Total</div>
                    </div>

                    <div class="space-y-3">
                        <div v-for="(ligne, index) in lignesFacture" :key="index" 
                            class="group relative grid grid-cols-12 gap-3 items-start p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                            
                            <div class="col-span-6">
                                <textarea v-model="ligne.description" rows="1" 
                                    class="w-full bg-transparent border-none p-0 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-0 resize-none" 
                                    placeholder="Description du produit..."></textarea>
                            </div>
                            
                            <div class="col-span-2">
                                <input v-model.number="ligne.quantite" type="number" min="1"
                                    class="w-full bg-white border border-gray-200 rounded px-2 py-1 text-right text-sm focus:border-[#005AC1] focus:ring-1 focus:ring-[#005AC1] outline-none" />
                            </div>

                            <div class="col-span-2">
                                <input v-model.number="ligne.prixUnitaire" type="number" min="0"
                                    class="w-full bg-white border border-gray-200 rounded px-2 py-1 text-right text-sm focus:border-[#005AC1] focus:ring-1 focus:ring-[#005AC1] outline-none" />
                            </div>

                            <div class="col-span-2 text-right pt-1 text-sm font-bold text-gray-700">
                                {{ formatPrice(ligne.quantite * ligne.prixUnitaire) }}
                            </div>

                            <button @click="supprimerLigne(index)" class="absolute -right-2 top-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity p-1 bg-white shadow-sm rounded-full border border-gray-100">
                                <XMarkIcon class="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <button @click="ajouterLigne" class="mt-4 w-full py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:text-[#005AC1] hover:border-[#005AC1] hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2">
                        <PlusIcon class="w-4 h-4" /> Ajouter une ligne
                    </button>
                </section>

                <section class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex flex-col items-end gap-3 text-sm">
                        <div class="flex justify-between w-full md:w-1/2 text-gray-600">
                            <span>Total HT</span>
                            <span class="font-medium">{{ formatPrice(totalHT) }}</span>
                        </div>
                        <div class="flex justify-between w-full md:w-1/2 text-gray-600 items-center">
                            <span>TVA ({{ tauxTVA }}%)</span>
                            <div class="flex items-center gap-2">
                                <input v-model="tauxTVA" type="number" class="w-16 text-right border border-gray-200 rounded px-2 py-1 text-xs" />
                                <span class="font-medium min-w-[80px] text-right">{{ formatPrice(montantTVA) }}</span>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 h-px bg-gray-100 my-1"></div>
                        <div class="flex justify-between w-full md:w-1/2 text-[#1A1C1E] text-lg font-bold">
                            <span>Total TTC</span>
                            <span class="text-[#005AC1]">{{ formatPrice(totalTTC) }}</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <div class="hidden lg:flex w-[45%] bg-[#E1E2EC] relative flex-col items-center justify-center p-8 overflow-hidden">
            <div class="absolute top-6 left-6 text-xs font-bold text-gray-500 uppercase tracking-widest pointer-events-none">Aperçu du document</div>
            
            <div class="bg-white shadow-2xl w-full max-w-[500px] h-auto min-h-[700px] rounded-sm p-8 text-[10px] leading-relaxed relative flex flex-col transform scale-95 origin-center transition-transform duration-300">
                
                <div class="flex justify-between items-start mb-8">
                    <div>
                        <div class="w-12 h-12 bg-gray-100 rounded mb-2 flex items-center justify-center text-gray-400">Logo</div>
                        <h2 class="font-bold text-lg text-gray-900">{{ settings.entrepriseName || 'Mon Entreprise' }}</h2>
                        <p class="text-gray-500 w-40">{{ settings.adresse || 'Adresse de l\'entreprise' }}</p>
                    </div>
                    <div class="text-right">
                        <h1 class="text-2xl font-light text-[#005AC1] uppercase mb-1">Facture</h1>
                        <p class="font-bold text-gray-800">#{{ numeroFacture }}</p>
                        <p class="text-gray-500 mt-1">Date : {{ formatDate(dateEmission) }}</p>
                    </div>
                </div>

                <div class="flex justify-between mb-8">
                    <div class="w-1/2 pr-4">
                        <p class="text-gray-400 uppercase text-[8px] font-bold mb-1">Facturé à</p>
                        <div v-if="clientSelectionne" class="text-gray-900">
                            <p class="font-bold text-sm">{{ clientSelectionne.nom }}</p>
                            <p>{{ clientSelectionne.adresse }}</p>
                            <p>{{ clientSelectionne.ville }}</p>
                        </div>
                        <div v-else class="text-gray-300 italic border border-dashed border-gray-200 p-2 rounded">
                            Sélectionnez un client...
                        </div>
                    </div>
                </div>

                <table class="w-full mb-8">
                    <thead>
                        <tr class="border-b-2 border-[#005AC1] text-[#005AC1]">
                            <th class="text-left py-2 w-1/2">Description</th>
                            <th class="text-right py-2">Qté</th>
                            <th class="text-right py-2">Prix</th>
                            <th class="text-right py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr v-for="(ligne, idx) in lignesFacture" :key="idx" class="border-b border-gray-100">
                            <td class="py-2">{{ ligne.description || 'Article...' }}</td>
                            <td class="text-right py-2">{{ ligne.quantite }}</td>
                            <td class="text-right py-2">{{ formatPrice(ligne.prixUnitaire) }}</td>
                            <td class="text-right py-2 font-medium">{{ formatPrice(ligne.quantite * ligne.prixUnitaire) }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex justify-end mt-auto">
                    <div class="w-1/2 space-y-1">
                        <div class="flex justify-between text-gray-500">
                            <span>Total HT</span>
                            <span>{{ formatPrice(totalHT) }}</span>
                        </div>
                        <div class="flex justify-between text-gray-500">
                            <span>TVA ({{ tauxTVA }}%)</span>
                            <span>{{ formatPrice(montantTVA) }}</span>
                        </div>
                        <div class="border-t border-gray-300 my-2 pt-2 flex justify-between text-base font-bold text-[#005AC1]">
                            <span>Total TTC</span>
                            <span>{{ formatPrice(totalTTC) }}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 pt-4 border-t border-gray-100 text-center text-gray-400 text-[8px]">
                    <p>Merci de votre confiance. Paiement dû sous 30 jours.</p>
                    <p>{{ settings.entrepriseName }} - SIRET: 123 456 789 00012</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useClientsStore } from '@/modules/Clients/stores/clients.store';
import { useFacturesStore } from '@/modules/Factures/stores/factures.store';
import { useSettingsStore } from '@/shared/stores/setting.store';
import { useToast } from '@/shared/composables/useToast';
import { 
    ArrowLeftIcon, 
    CalendarIcon, 
    UserIcon, 
    TagIcon, 
    MagnifyingGlassIcon, 
    PlusCircleIcon, 
    PlusIcon, 
    XMarkIcon 
} from '@heroicons/vue/24/outline';

// Stores
const router = useRouter();
const clientStore = useClientsStore();
const factureStore = useFacturesStore();
const settings = useSettingsStore();
const { showToastMessage } = useToast();

// State
const isSaving = ref(false);
const dateEmission = ref(new Date().toISOString().split('T')[0]);
const dateEcheance = ref('');
const numeroFacture = ref('FAC-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0'));
const tauxTVA = ref(20);

// Templates
const templates = [
    { id: 'moderne', name: 'Moderne' },
    { id: 'classique', name: 'Classique' },
    { id: 'minimaliste', name: 'Minimaliste' }
];
const selectedTemplate = ref(templates[0]);

// Client Logic
const clientSearch = ref('');
const showClientDropdown = ref(false);
const clientSelectionne = ref<any>(null);

const filteredClients = computed(() => {
    if (!clientSearch.value) return clientStore.clients.slice(0, 5);
    return clientStore.clients.filter(c => 
        c.nom.toLowerCase().includes(clientSearch.value.toLowerCase()) ||
        c.email.toLowerCase().includes(clientSearch.value.toLowerCase())
    );
});

function selectClient(client: any) {
    clientSelectionne.value = client;
    clientSearch.value = client.nom;
    showClientDropdown.value = false;
}

// Lignes Facture Logic
const lignesFacture = ref([
    { description: 'Consultation juridique', quantite: 1, prixUnitaire: 15000 },
    { description: 'Rédaction de contrat', quantite: 2, prixUnitaire: 25000 }
]);

function ajouterLigne() {
    lignesFacture.value.push({ description: '', quantite: 1, prixUnitaire: 0 });
}

function supprimerLigne(index: number) {
    lignesFacture.value.splice(index, 1);
}

// Calculs
const totalHT = computed(() => lignesFacture.value.reduce((acc, l) => acc + (l.quantite * l.prixUnitaire), 0));
const montantTVA = computed(() => totalHT.value * (tauxTVA.value / 100));
const totalTTC = computed(() => totalHT.value + montantTVA.value);

// Helpers
const formatPrice = (val: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(val);
const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR');

// Initialization
onMounted(async () => {
    await clientStore.fetchClients();
    // Set default due date (30 days)
    const d = new Date(dateEmission.value);
    d.setDate(d.getDate() + 30);
    dateEcheance.value = d.toISOString().split('T')[0];
});

// Save Function
async function sauvegarderFacture() {
    if (!clientSelectionne.value) return showToastMessage("Veuillez sélectionner un client", "error");
    if (lignesFacture.value.length === 0) return showToastMessage("Ajoutez au moins un article", "error");

    isSaving.value = true;
    try {
        const data = {
            numero: numeroFacture.value,
            clientId: clientSelectionne.value.id,
            clientNom: clientSelectionne.value.nom, // Snapshot
            items: lignesFacture.value,
            dateEmission: dateEmission.value,
            dateEcheance: dateEcheance.value,
            totalHT: totalHT.value,
            totalTTC: totalTTC.value,
            statut: "en_attente",
            template: selectedTemplate.value.id
        };
        
        await factureStore.creerFactureComplete(data);
        showToastMessage("Facture enregistrée avec succès", "success");
        router.push('/factures');
    } catch (e) {
        showToastMessage("Erreur lors de l'enregistrement", "error");
    } finally {
        isSaving.value = false;
    }
}
</script>

<style scoped>
/* Scrollbar personnalisée pour l'éditeur */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #E1E2EC;
    border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #C4C6D0;
}

/* Animation douce */
.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>