<template>
  <div class="container max-w-3xl mx-auto space-y-8 py-8">
    <h1 class="text-3xl font-extrabold text-blue-600 text-center mb-6">
      Paramètres de l'entreprise
    </h1>

    <!-- Message de statut -->
    <div v-if="message.text" :class="[
      'p-4 rounded-lg text-center font-medium',
      message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    ]">
      {{ message.text }}
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Chargement...</p>
    </div>

    <section v-else class="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 class="text-2xl font-bold text-center text-blue-500 mb-6">
        Informations de base
      </h2>

      <form @submit.prevent="sauvegarderInformations" class="space-y-6">
        <div class="flex flex-col space-y-1">
          <label for="nom" class="font-medium text-gray-700">
            Nom de l'entreprise <span class="text-red-500">*</span>
          </label>
          <input type="text" id="nom" v-model="info.nom" required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="email" class="font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="info.email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="adresse" class="font-medium text-gray-700">Adresse</label>
          <textarea id="adresse" v-model="info.adresse" rows="3"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-vertical"></textarea>
        </div>

        <div class="flex flex-col space-y-1">
          <label for="telephone" class="font-medium text-gray-700">Téléphone</label>
          <input type="tel" id="telephone" v-model="info.telephone"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="siret" class="font-medium text-gray-700">SIRET (optionnel)</label>
          <input type="text" id="siret" v-model="info.siret" placeholder="Ex: 12345678901234"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
        </div>
      </form>
    </section>

    <section class="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4">
      <h3 class="text-center text-lg font-semibold text-gray-700">
        Logo de l'entreprise
      </h3>

      <div class="flex justify-center">
        <div v-if="logoPreview" class="max-w-64 max-h-64">
          <img :src="logoPreview" alt="Aperçu du logo" class="object-contain w-full h-full rounded-lg shadow-sm" />
        </div>
        <div v-else
          class="w-64 h-64 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="mt-2">Aperçu du logo</p>
          </div>
        </div>
      </div>

      <input type="file" accept="image/*" ref="fileInput" class="hidden" @change="onFileChange" />

      <!-- Boutons -->
      <div class="flex justify-center gap-4">
        <button type="button" @click="triggerFileInput" :disabled="isSaving"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
          Télécharger un logo
        </button>

        <button type="button" @click="removeLogo" :disabled="!logoPreview || isSaving"
          class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
          Supprimer le logo
        </button>
      </div>
    </section>

    <div class="flex justify-center">
      <button @click="sauvegarderInformations" :disabled="isSaving || !info.nom"
        class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
        {{ isSaving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getInfoEntreprise,
  sauvegarderInfoEntreprise,
  convertirFichierEnBase64
} from "../services/api";

// Données de l'entreprise
const info = ref({
  id: null,
  nom: "",
  email: "",
  adresse: "",
  telephone: "",
  siret: "",
  logo: ""
});

// États de l'interface
const logoPreview = ref("");
const fileInput = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);
const message = ref({ text: "", type: "" });

// Charger les informations existantes au montage du composant
onMounted(async () => {
  await chargerInformations();
});

// Charger les informations de l'entreprise
async function chargerInformations() {
  try {
    isLoading.value = true;
    const data = await getInfoEntreprise();

    if (data) {
      info.value = { ...data };
      if (data.logo) {
        logoPreview.value = data.logo;
      }
    }
  } catch (error) {
    console.error("Erreur lors du chargement:", error);
    afficherMessage("Erreur lors du chargement des informations", "error");
  } finally {
    isLoading.value = false;
  }
}

// Sauvegarder les informations
async function sauvegarderInformations() {
  if (!info.value.nom) {
    afficherMessage("Le nom de l'entreprise est requis", "error");
    return;
  }

  try {
    isSaving.value = true;

    const dataToSave = {
      ...info.value,
      logo: logoPreview.value
    };

    const result = await sauvegarderInfoEntreprise(dataToSave);

    // Mettre à jour les données locales avec la réponse du serveur
    if (result) {
      info.value = { ...result };
    }

    afficherMessage("Informations sauvegardées avec succès", "success");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    afficherMessage("Erreur lors de la sauvegarde", "error");
  } finally {
    isSaving.value = false;
  }
}

// Ouvre le sélecteur de fichiers
function triggerFileInput() {
  fileInput.value?.click();
}

// Gestion du changement de fichier
async function onFileChange(event) {
  const files = event.target.files;
  if (files && files[0]) {
    const file = files[0];

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      afficherMessage("Le fichier est trop volumineux (max 5MB)", "error");
      return;
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      afficherMessage("Veuillez sélectionner un fichier image", "error");
      return;
    }

    try {
      // Convertir en base64 pour la prévisualisation et le stockage
      const base64 = await convertirFichierEnBase64(file);
      logoPreview.value = base64;

      afficherMessage("Logo ajouté. N'oubliez pas d'enregistrer!", "success");
    } catch (error) {
      console.error("Erreur lors de la conversion du fichier:", error);
      afficherMessage("Erreur lors du traitement de l'image", "error");
    }
  }
}

// Supprimer le logo
function removeLogo() {
  logoPreview.value = "";
  if (fileInput.value) {
    fileInput.value.value = null;
  }
  afficherMessage("Logo supprimé. N'oubliez pas d'enregistrer!", "success");
}

// Afficher un message à l'utilisateur
function afficherMessage(text, type) {
  message.value = { text, type };
  setTimeout(() => {
    message.value = { text: "", type: "" };
  }, 5000);
}
</script>