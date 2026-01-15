<template>
    <div class="max-w-5xl mx-auto space-y-10 py-4 pb-20">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
                <h1 class="text-3xl font-black text-[#1A1C1E] tracking-tight">Configuration Business</h1>
                <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-[0.2em] mt-1">Gérez votre
                    identité visuelle et informations légales</p>
            </div>
            <button @click="sauvegarder"
                class="btn-filled px-8 py-3 shadow-md hover:shadow-lg transition-all flex items-center gap-3 active:scale-95"
                :disabled="isSaving">
                <ArrowPathIcon v-if="isSaving" class="w-5 h-5 animate-spin" />
                <CheckIcon v-else class="w-5 h-5" />
                <span>{{ isSaving ? 'Synchronisation...' : 'Enregistrer les modifications' }}</span>
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <!-- Sidebar Navigation (Optional internal anchors) -->
            <div class="lg:col-span-1 space-y-4">
                <div class="card-outlined bg-white p-6 sticky top-24">
                    <h3
                        class="text-xs font-black text-[#1A1C1E] uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">
                        Sommaire</h3>
                    <nav class="space-y-1">
                        <a href="#general"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F8F9FA] text-[#005AC1] font-bold text-xs ring-1 ring-[#005AC1]/10">
                            <BuildingOfficeIcon class="w-4 h-4" /> Profil Public
                        </a>
                        <a href="#legal"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl text-surface-on-variant font-bold text-xs hover:bg-[#F8F9FA] transition-all">
                            <ScaleIcon class="w-4 h-4" /> Juridique & Bancaire
                        </a>
                        <a href="#branding"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl text-surface-on-variant font-bold text-xs hover:bg-[#F8F9FA] transition-all">
                            <SwatchIcon class="w-4 h-4" /> Identité Visuelle
                        </a>
                    </nav>
                </div>
            </div>

            <!-- Content -->
            <div class="lg:col-span-2 space-y-10">
                <!-- Section: Profil -->
                <section id="general" class="space-y-6">
                    <div class="flex items-center gap-3 text-[#005AC1]">
                        <BuildingOfficeIcon class="w-5 h-5" />
                        <h2 class="text-xs font-black uppercase tracking-widest">Informations Générales</h2>
                    </div>

                    <div class="card-outlined bg-white p-8 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-1.5 md:col-span-2">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Raison
                                    Sociale</label>
                                <input v-model="entreprise.nom" type="text"
                                    class="w-full h-12 px-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                    placeholder="Ex: FactGen Solutions Inc.">
                            </div>

                            <div class="space-y-1.5">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Email
                                    de Facturation</label>
                                <input v-model="entreprise.email" type="email"
                                    class="w-full h-12 px-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                    placeholder="billing@company.com">
                            </div>

                            <div class="space-y-1.5">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Ligne
                                    Directe</label>
                                <input v-model="entreprise.telephone" type="tel"
                                    class="w-full h-12 px-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                    placeholder="+33 1 00 00 00 00">
                            </div>

                            <div class="space-y-1.5 md:col-span-2">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Siège
                                    Social</label>
                                <textarea v-model="entreprise.adresse" rows="3"
                                    class="w-full p-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all resize-none"
                                    placeholder="Numéro, Rue, Ville, Code Postal..."></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section: Légal -->
                <section id="legal" class="space-y-6">
                    <div class="flex items-center gap-3 text-[#005AC1]">
                        <ScaleIcon class="w-5 h-5" />
                        <h2 class="text-xs font-black uppercase tracking-widest">Juridique & Bancaire</h2>
                    </div>

                    <div class="card-outlined bg-white p-8 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-1.5">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Numéro
                                    SIRET / Identifiant</label>
                                <input v-model="entreprise.siret" type="text"
                                    class="w-full h-12 px-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                    placeholder="123 456 789 00012">
                            </div>

                            <div class="space-y-1.5">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">N°
                                    de TVA Intracommunautaire</label>
                                <input v-model="entreprise.tva" type="text"
                                    class="w-full h-12 px-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                    placeholder="FR 12 345678901">
                            </div>

                            <div class="space-y-1.5 md:col-span-2">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">IBAN
                                    Principal</label>
                                <input v-model="entreprise.iban" type="text"
                                    class="w-full h-12 px-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-mono font-bold transition-all uppercase"
                                    placeholder="FR76 ....">
                            </div>

                            <div class="space-y-1.5">
                                <label
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider ml-1">Code
                                    BIC/SWIFT</label>
                                <input v-model="entreprise.bic" type="text"
                                    class="w-full h-12 px-4 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                    placeholder="BANKFRPP">
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section: Branding -->
                <section id="branding" class="space-y-6 pb-12">
                    <div class="flex items-center gap-3 text-[#005AC1]">
                        <SwatchIcon class="w-5 h-5" />
                        <h2 class="text-xs font-black uppercase tracking-widest">Identité Visuelle</h2>
                    </div>

                    <div class="card-outlined bg-white p-8">
                        <div class="flex flex-col md:flex-row items-center gap-10">
                            <div class="relative group">
                                <div
                                    class="w-40 h-40 bg-[#F1F3F5] rounded-2xl border-2 border-dashed border-outline-variant flex items-center justify-center overflow-hidden transition-all group-hover:border-[#005AC1]">
                                    <img v-if="entreprise.logo" :src="entreprise.logo"
                                        class="w-full h-full object-contain p-2">
                                    <div v-else class="text-surface-on-variant flex flex-col items-center gap-2">
                                        <PhotoIcon class="w-10 h-10 opacity-30" />
                                        <span class="text-[9px] font-black uppercase tracking-tighter">Aucun Logo</span>
                                    </div>

                                    <!-- Overlay -->
                                    <label
                                        class="absolute inset-0 bg-[#005AC1]/90 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                        <ArrowUpTrayIcon class="w-6 h-6 mb-2" />
                                        <span class="text-[10px] font-black uppercase">Importer</span>
                                        <input type="file" class="hidden" accept="image/*" @change="handleLogoUpload">
                                    </label>
                                </div>
                                <button v-if="entreprise.logo" @click="entreprise.logo = null"
                                    class="absolute -top-3 -right-3 w-8 h-8 bg-white border border-outline-variant text-red-600 rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors">
                                    <XMarkIcon class="w-4 h-4" />
                                </button>
                            </div>

                            <div class="flex-1 space-y-4">
                                <h4 class="text-sm font-black text-[#1A1C1E]">Logo de l'organisation</h4>
                                <p class="text-xs text-surface-on-variant leading-relaxed">
                                    Ce logo sera apposé sur toutes vos factures, devis et communications
                                    officielles.<br>
                                    <span class="font-bold">Format recommandé :</span> PNG transparent, 800x800px max.
                                </p>
                                <div class="pt-2">
                                    <label
                                        class="btn-outlined px-6 py-2 text-[11px] font-bold inline-flex items-center gap-2 cursor-pointer transition-all">
                                        <PhotoIcon class="w-4 h-4" />
                                        Sélectionner un fichier
                                        <input type="file" class="hidden" accept="image/*" @change="handleLogoUpload">
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- Feedback Messages -->
        <transition name="scale">
            <div v-if="message.content"
                class="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300"
                :class="message.type === 'success' ? 'bg-[#1A1C1E] text-white' : 'bg-red-600 text-white'">
                <CheckCircleIcon v-if="message.type === 'success'" class="w-6 h-6 text-green-400" />
                <ExclamationTriangleIcon v-else class="w-6 h-6 text-white" />
                <span class="text-sm font-bold tracking-tight">{{ message.content }}</span>
                <button @click="message.content = ''" class="ml-4 p-1 hover:bg-white/10 rounded-full">
                    <XMarkIcon class="w-4 h-4" />
                </button>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
    BuildingOfficeIcon, ScaleIcon, SwatchIcon,
    ArrowPathIcon, CheckIcon, PhotoIcon,
    ArrowUpTrayIcon, XMarkIcon, CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';
import { getInfoEntreprise, sauvegarderInfoEntreprise, mettreAJourInfoEntreprise, convertirFichierEnBase64 } from '@/shared/services/api';

const isSaving = ref(false);
const message = ref({ type: '', content: '' });

const entreprise = ref({
    id: null,
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    siret: '',
    tva: '',
    iban: '',
    bic: '',
    logo: null
});

onMounted(async () => {
    try {
        const data = await getInfoEntreprise();
        if (data) entreprise.value = { ...entreprise.value, ...data };
    } catch (error) { console.error('Erreur chargement infos:', error); }
});

const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
        const base64 = await convertirFichierEnBase64(file);
        entreprise.value.logo = base64;
        showMessage('success', "Logo mis à jour temporairement.");
    } catch (error) { showMessage('error', "Format d'image non supporté."); }
};

const sauvegarder = async () => {
    isSaving.value = true;
    message.value = { type: '', content: '' };
    try {
        if (entreprise.value.id) {
            await mettreAJourInfoEntreprise(entreprise.value.id, entreprise.value);
        } else {
            const result = await sauvegarderInfoEntreprise(entreprise.value);
            if (result?.id) entreprise.value.id = result.id;
        }
        showMessage('success', "Modifications synchronisées avec succès !");
    } catch (error) {
        showMessage('error', "Échec de la synchronisation.");
    } finally { isSaving.value = false; }
};

const showMessage = (type, content) => {
    message.value = { type, content };
    setTimeout(() => { message.value.content = ''; }, 5000);
};
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px) scale(0.9);
}
</style>
