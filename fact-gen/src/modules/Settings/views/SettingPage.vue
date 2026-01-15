<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-800">Paramètres de l'entreprise</h1>
            <button @click="sauvegarder"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                :disabled="isSaving">
                <span v-if="isSaving" class="loading loading-spinner loading-xs"></span>
                {{ isSaving ? 'Sauvegarde...' : 'Sauvegarder' }}
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Informations générales -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 class="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                    <span class="material-symbols-outlined">business</span>
                    Informations générales
                </h2>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                        <input v-model="entreprise.nom" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ex: Ma Société SAS">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
                        <input v-model="entreprise.email" type="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="contact@entreprise.com">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input v-model="entreprise.telephone" type="tel"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+33 1 23 45 67 89">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                        <textarea v-model="entreprise.adresse" rows="3"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123 Rue du Commerce..."></textarea>
                    </div>
                </div>
            </div>

            <!-- Informations légales -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 class="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                    <span class="material-symbols-outlined">gavel</span>
                    Informations légales & Bancaires
                </h2>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">SIRET</label>
                        <input v-model="entreprise.siret" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123 456 789 00012">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Numéro de TVA</label>
                        <input v-model="entreprise.tva" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="FR 12 345678901">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                        <input v-model="entreprise.iban" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="FR76 ....">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">BIC/SWIFT</label>
                        <input v-model="entreprise.bic" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="BANKFRPP">
                    </div>
                </div>
            </div>

            <!-- Logo & Branding -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                <h2 class="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                    <span class="material-symbols-outlined">palette</span>
                    Logo & Apparence
                </h2>

                <div class="flex items-start gap-6">
                    <div
                        class="w-32 h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                        <img v-if="entreprise.logo" :src="entreprise.logo" class="w-full h-full object-contain">
                        <div v-else class="text-gray-400 flex flex-col items-center">
                            <span class="material-symbols-outlined text-3xl">image</span>
                            <span class="text-xs mt-1">Aucun logo</span>
                        </div>

                        <label
                            class="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span class="text-sm font-medium">Modifier</span>
                            <input type="file" class="hidden" accept="image/*" @change="handleLogoUpload">
                        </label>
                    </div>

                    <div class="flex-1">
                        <p class="text-sm text-gray-500 mb-2">
                            Le logo apparaîtra sur toutes vos factures et devis.
                            Taille recommandée : 500x500px. Format : PNG ou JPG.
                        </p>
                        <div class="flex gap-2">
                            <button v-if="entreprise.logo" @click="entreprise.logo = null"
                                class="text-red-600 text-sm hover:underline">
                                Supprimer le logo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alertes -->
        <div v-if="message.content"
            :class="`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} shadow-sm`">
            <span class="material-symbols-outlined">{{ message.type === 'success' ? 'check_circle' : 'error' }}</span>
            <span>{{ message.content }}</span>
            <button @click="message.content = ''" class="btn btn-sm btn-ghost">✕</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/modules/Auth/stores/auth.store';
import { getInfoEntreprise, sauvegarderInfoEntreprise, mettreAJourInfoEntreprise, convertirFichierEnBase64 } from '@/shared/services/api';

const authStore = useAuthStore();
const isSaving = ref(false);
const message = ref({ type: '', content: '' });

const entreprise = ref({
    id: null,
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    code_postal: '',
    pays: '',
    siret: '',
    tva: '',
    iban: '',
    bic: '',
    logo: null
});

onMounted(async () => {
    try {
        const data = await getInfoEntreprise();
        if (data) {
            entreprise.value = { ...entreprise.value, ...data };
        }
    } catch (error) {
        console.error('Erreur chargement infos:', error);
    }
});

const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const base64 = await convertirFichierEnBase64(file);
        entreprise.value.logo = base64;
    } catch (error) {
        showMessage('error', "Erreur lors du traitement du logo");
    }
};

const sauvegarder = async () => {
    isSaving.value = true;
    message.value = { type: '', content: '' };

    try {
        if (entreprise.value.id) {
            await mettreAJourInfoEntreprise(entreprise.value.id, entreprise.value);
        } else {
            const result = await sauvegarderInfoEntreprise(entreprise.value);
            if (result && result.id) {
                entreprise.value.id = result.id;
            }
        }

        // Mettre à jour le store auth si nécessaire
        // authStore.updateCompanyInfo(entreprise.value);

        showMessage('success', "Informations enregistrées avec succès !");
    } catch (error) {
        console.error('Erreur sauvegarde:', error);
        showMessage('error', "Une erreur est survenue lors de la sauvegarde.");
    } finally {
        isSaving.value = false;
    }
};

const showMessage = (type, content) => {
    message.value = { type, content };
    setTimeout(() => {
        message.value.content = '';
    }, 5000);
};
</script>
