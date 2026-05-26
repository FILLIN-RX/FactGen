<template>
  <div class="max-w-5xl mx-auto space-y-8 py-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h1 class="text-2xl font-bold text-[#1A1C1E]">Configuration Business</h1>
        <p class="text-xs text-gray-500 uppercase tracking-wider mt-1">Gérez votre identité visuelle et informations légales</p>
      </div>
      <n-button type="primary" size="large" @click="sauvegarder" :loading="isSaving">
        <template #icon><n-icon><CheckIcon /></n-icon></template>
        Enregistrer les modifications
      </n-button>
    </div>

    <n-grid :cols="3" :x-gap="24">
      <n-grid-item :span="1">
        <n-card title="Sommaire" size="small" :bordered="false" class="sticky top-24">
          <n-menu :value="activeSection" :options="sectionMenu" @update:value="scrollToSection" />
        </n-card>
      </n-grid-item>

      <n-grid-item :span="2">
        <n-card id="general" title="Informations Générales" class="mb-6">
          <n-form>
            <n-form-item label="Raison Sociale">
              <n-input v-model:value="entreprise.nom" placeholder="Ex: FactGen Solutions Inc." />
            </n-form-item>
            <n-grid :cols="2" :x-gap="12">
              <n-grid-item>
                <n-form-item label="Email de Facturation">
                  <n-input v-model:value="entreprise.email" placeholder="billing@company.com" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="Ligne Directe">
                  <n-input v-model:value="entreprise.telephone" placeholder="+33 1 00 00 00 00" />
                </n-form-item>
              </n-grid-item>
            </n-grid>
            <n-form-item label="Siège Social">
              <n-input v-model:value="entreprise.adresse" type="textarea" :rows="3"
                placeholder="Numéro, Rue, Ville, Code Postal..." />
            </n-form-item>
          </n-form>
        </n-card>

        <n-card id="legal" title="Juridique & Bancaire" class="mb-6">
          <n-grid :cols="2" :x-gap="12">
            <n-grid-item>
              <n-form-item label="Numéro SIRET / Identifiant">
                <n-input v-model:value="entreprise.siret" placeholder="123 456 789 00012" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="N° de TVA Intracommunautaire">
                <n-input v-model:value="entreprise.tva" placeholder="FR 12 345678901" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item :span="2">
              <n-form-item label="IBAN Principal">
                <n-input v-model:value="entreprise.iban" placeholder="FR76 ...." />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="Code BIC/SWIFT">
                <n-input v-model:value="entreprise.bic" placeholder="BANKFRPP" />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-card>

        <n-card id="branding" title="Identité Visuelle">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="relative">
              <n-upload :max="1" accept="image/*" @finish="handleLogoUpload" :show-file-list="false">
                <n-upload-dragger>
                  <div v-if="entreprise.logo" class="w-40 h-40 flex items-center justify-center">
                    <img :src="entreprise.logo" class="max-w-full max-h-full object-contain" />
                  </div>
                  <div v-else class="w-40 h-40 flex flex-col items-center justify-center text-gray-400 gap-2">
                    <n-icon size="40"><PhotoIcon /></n-icon>
                    <span class="text-xs">Aucun Logo</span>
                  </div>
                </n-upload-dragger>
              </n-upload>
              <n-button v-if="entreprise.logo" size="tiny" circle type="error"
                class="absolute -top-2 -right-2" @click="entreprise.logo = null">
                <template #icon><n-icon><XMarkIcon /></n-icon></template>
              </n-button>
            </div>
            <div class="flex-1">
              <h4 class="font-bold mb-2">Logo de l'organisation</h4>
              <p class="text-sm text-gray-500">Ce logo sera apposé sur toutes vos factures, devis et communications officielles.</p>
            </div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getInfoEntreprise, sauvegarderInfoEntreprise, mettreAJourInfoEntreprise, convertirFichierEnBase64 } from "@/shared/services/api";
import { showToastMessage } from "@/composables/useToast";
import { CheckIcon, PhotoIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const isSaving = ref(false);
const activeSection = ref("general");

const sectionMenu = [
  { label: "Profil Public", key: "general" },
  { label: "Juridique & Bancaire", key: "legal" },
  { label: "Identité Visuelle", key: "branding" },
];

const entreprise = ref({
  id: null, nom: "", email: "", telephone: "", adresse: "",
  siret: "", tva: "", iban: "", bic: "", logo: null,
});

onMounted(async () => {
  try {
    const data = await getInfoEntreprise();
    if (data) entreprise.value = { ...entreprise.value, ...data };
  } catch (error) {
    console.error("Erreur chargement infos:", error);
  }
});

function scrollToSection(key) {
  activeSection.value = key;
  document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
}

async function handleLogoUpload({ file }) {
  try {
    const base64 = await convertirFichierEnBase64(file.file);
    entreprise.value.logo = base64;
    showToastMessage("Logo mis à jour.", "success");
  } catch {
    showToastMessage("Format d'image non supporté.", "error");
  }
}

const sauvegarder = async () => {
  isSaving.value = true;
  try {
    if (entreprise.value.id) {
      await mettreAJourInfoEntreprise(entreprise.value.id, entreprise.value);
    } else {
      const result = await sauvegarderInfoEntreprise(entreprise.value);
      if (result?.id) entreprise.value.id = result.id;
    }
    showToastMessage("Modifications synchronisées !", "success");
  } catch {
    showToastMessage("Échec de la synchronisation.", "error");
  } finally {
    isSaving.value = false;
  }
};
</script>
