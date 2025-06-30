<template>
  <div class="container max-w-3xl mx-auto space-y-8 py-8">
    <h1 class="text-3xl font-extrabold text-blue-600 text-center mb-6">
      Paramètres de l'entreprise
    </h1>

    <section class="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h2 class="text-2xl font-bold text-center text-blue-500 mb-6">
        Informations de base
      </h2>

      <form class="space-y-6">
        <div class="flex flex-col space-y-1">
          <label for="nom" class="font-medium text-gray-700"
            >Nom de l'entreprise</label
          >
          <input
            type="text"
            id="nom"
            v-model="Info.nom"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="email" class="font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="Info.email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="adresse" class="font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            id="adresse"
            v-model="Info.addresse"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label for="telephone" class="font-medium text-gray-700"
            >Contact</label
          >
          <input
            type="text"
            id="telephone"
            v-model="Info.telephone"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      </form>
    </section>

    <section
      class="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-4"
    >
      <h3 class="text-center text-lg font-semibold text-gray-700">
        Logo de l'entreprise
      </h3>
      <img
        v-if="logoPreview"
        :src="logoPreview"
        alt="Apercu du logo"
        class="object-contain w-full"
      />
      <div
        v-else
        class="w-64 h-64 mx-auto border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400"
      >
        Aperçu logo
      </div>
      <input
        type="file"
        accept="image/*"
        ref="fileInput"
        class="hidden"
        @change="onFileChange"
      />

      <!-- Boutons -->
      <div class="flex justify-center gap-4">
        <button
          type="button"
          @click="triggerFileInput"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Télécharger un logo
        </button>

        <button
          type="button"
          @click="removeLogo"
          :disabled="!logoPreview"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Supprimer le logo
        </button>
      </div>
    </section>

    <div class="flex justify-center">
      <ButtonPro label="Enregistrer les modifications" color="gray" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonPro from "../components/ButtonPro.vue";

// Données métier
const Info = ref({
  nom: "",
  email: "",
  addresse: "",
  telephone: "",
});

// Réfs séparées pour l'aperçu logo et input file DOM
const logoPreview = ref("");
const fileInput = ref(null);

// Ouvre le sélecteur de fichiers quand on clique sur le bouton
function triggerFileInput() {
  fileInput.value?.click();
}

// Quand l'utilisateur choisit un fichier
function onFileChange(event) {
  const files = event.target.files;
  if (files && files[0]) {
    // Crée une URL locale pour l'image choisie
    logoPreview.value = URL.createObjectURL(files[0]);
  }
}

// Supprime le logo (vide l'aperçu et reset l'input)
function removeLogo() {
  logoPreview.value = "";
  if (fileInput.value) {
    fileInput.value.value = null; // Reset input file
  }
}
</script>
