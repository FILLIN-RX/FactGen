<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <div class="bg-white border-b sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button @click="handleBack" class="p-2 hover:bg-gray-100 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl font-semibold">
              {{ isEditing ? "Modifier" : "Nouvelle" }} facture
            </h1>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="togglePreview" class="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              {{ showPreview ? "Masquer" : "Aperçu" }}
            </button>
            <button @click="sauvegarderFacture" :disabled="!isFormValid || isSaving"
              class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {{
                isSaving
                  ? "Enregistrement..."
                  : isEditing
                    ? "Mettre à jour"
                    : "Créer"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Left Column - Main Form -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Basic Info -->
          <div class="bg-white rounded-lg border p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Modèle</label>
                <router-link to="/templates"
                  class="flex items-center justify-between p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 group">
                  <!-- Texte qui s'adapte -->
                  <span class="text-sm" :class="!templateStore.getTemplateById(selectedTemplate)
                      ? 'text-red-600'
                      : 'group-hover:text-blue-600'
                    ">
                    {{ getTemplateName(selectedTemplate) }}
                  </span>

                  <!-- Icône -->
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Date d'émission *</label>
                <input v-model="date_emission" type="date" required
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Date d'échéance</label>
                <input v-model="date_echeance" type="date"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Statut *</label>
                <select v-model="statut" required
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="en_attente">En attente</option>
                  <option value="paye">Payé</option>
                  <option value="annule">Annulé</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Company & Client Info -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Company -->
            <div class="bg-white rounded-lg border p-6">
              <h3 class="text-lg font-medium mb-4">De</h3>
              <div class="space-y-4">
                <input v-model="societer.nom" type="text" required placeholder="Nom de la société *"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <input v-model="societer.email" type="email" required placeholder="Email *"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <textarea v-model="societer.adresse" required placeholder="Adresse *" rows="2"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                <input v-model="societer.telephone" type="tel" placeholder="Téléphone"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <SelectedDevise v-model="devise" />
              </div>
            </div>

            <!-- Client -->
            <div class="bg-white rounded-lg border p-6">
              <h3 class="text-lg font-medium mb-4">Pour</h3>
              <div class="space-y-4">
                <input v-model="client.nom" type="text" required placeholder="Nom du client *"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <input v-model="client.email" type="email" placeholder="Email"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                <textarea v-model="client.adresse" placeholder="Adresse" rows="3"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
            </div>
          </div>

          <!-- Items -->
          <div class="bg-white rounded-lg border p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium">Articles</h3>
              <button @click="ajouterProduit"
                class="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>Ajouter</span>
              </button>
            </div>

            <div v-if="produits.length === 0" class="text-center py-12 text-gray-500">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p>Aucun article ajouté</p>
            </div>

            <div v-else class="space-y-3">
              <!-- Header -->
              <div class="hidden md:grid grid-cols-12 gap-3 text-sm font-medium text-gray-600 pb-2 border-b">
                <div class="col-span-5">Description</div>
                <div class="col-span-2 text-center">Qté</div>
                <div class="col-span-2 text-center">Prix unit.</div>
                <div class="col-span-2 text-center">Total</div>
                <div class="col-span-1"></div>
              </div>

              <!-- Items -->
              <div v-for="(produit, index) in produits" :key="index"
                class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 bg-gray-50 rounded-lg">
                <div class="md:col-span-5">
                  <input v-model="produit.nom" type="text" placeholder="Description" required
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div class="md:col-span-2">
                  <input v-model.number="produit.quantite" type="number" min="1" required
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center" />
                </div>
                <div class="md:col-span-2">
                  <input v-model.number="produit.prix" type="number" min="0" step="0.01" required
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center" />
                </div>
                <div class="md:col-span-2 flex items-center justify-center font-medium">
                  {{ formatPrix(produit.prix * produit.quantite) }}
                </div>
                <div class="md:col-span-1 flex justify-center">
                  <button v-if="produits.length > 1" @click="supprimerLigne(index)"
                    class="p-2 text-red-600 hover:bg-red-100 rounded">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-white rounded-lg border p-6">
            <h3 class="text-lg font-medium mb-4">Notes</h3>
            <textarea v-model="suplement" placeholder="Conditions de paiement, notes..." rows="3"
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
        </div>

        <!-- Right Column - Summary -->
        <div class="space-y-6">
          <!-- Progress -->
          <div class="bg-white rounded-lg border p-6">
            <div class="flex items-center justify-between text-sm mb-2">
              <span>Progression</span>
              <span>{{ progressPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: progressPercentage + '%' }"></div>
            </div>
          </div>

          <!-- Discount -->
          <div class="bg-white rounded-lg border p-6">
            <h3 class="text-lg font-medium mb-4">Réduction</h3>
            <div class="space-y-4">
              <label class="flex items-center">
                <input v-model="utiliseReduction" type="checkbox" true-value="oui" false-value="non"
                  class="h-4 w-4 text-blue-600 rounded" />
                <span class="ml-2 text-sm">Appliquer une réduction</span>
              </label>

              <div v-if="utiliseReduction === 'oui'" class="space-y-3">
                <select v-model="reduction.type" class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
                  <option value="montant">Montant fixe</option>
                  <option value="pourcentage">Pourcentage</option>
                </select>
                <div class="relative">
                  <input v-model.number="reduction.valeur" type="number" min="0"
                    :step="reduction.type === 'pourcentage' ? '1' : '0.01'"
                    :max="reduction.type === 'pourcentage' ? '100' : undefined"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
                  <span v-if="reduction.type === 'pourcentage'" class="absolute right-3 top-2 text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 class="text-lg font-medium mb-4">Total</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span>Sous-total</span>
                <span class="font-medium">{{ formatPrix(totalHT) }}</span>
              </div>
              <div v-if="montantReduction > 0" class="flex justify-between text-red-600">
                <span>Réduction</span>
                <span>-{{ formatPrix(montantReduction) }}</span>
              </div>
              <div class="border-t pt-3">
                <div class="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{{ formatPrix(totalTTC) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InvoiceForm />

    <!-- Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div class="sticky top-0 bg-white border-b p-4">
        <button @click="togglePreview"
          class="w-full bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Fermer l'aperçu</span>
        </button>
      </div>

      <component v-if="templateStore.getComponentById(selectedTemplate)"
        :is="templateStore.getTemplateById(selectedTemplate)" :societer="societer" :client="client" :produits="produits"
        :totalHT="totalHT" :totalTTC="totalTTC" :montantReduction="montantReduction" :reduction="reduction"
        :suplement="suplement" :date_emission="date_emission" :date_echeance="date_echeance" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "../stores/template";
import { useFacturesStore } from "../stores/Facture";
import SelectedDevise from "./SelectedDevise.vue";
import { showToastMessage } from "../composables/useToast";
import InvoiceForm from "./factures/FactureForm/InvoiceForm.vue";

const router = useRouter();
const factureStore = useFacturesStore();
const templateStore = useTemplateStore();

// État réactif
const showPreview = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
//const selectedTemplate = ref('');
const selectedTemplate = ref(templateStore.currentTemplate || "moderne");
// Données de la facture
const societer = ref({
  nom: "",
  adresse: "",
  email: "",
  telephone: "",
});
const devise = ref({
  code: "XOF",
  symbole: "CFA",
  nom: "Franc CFA",
});
const client = ref({
  nom: "",
  email: "",
  adresse: "",
});

const produits = ref([
  {
    nom: "",
    quantite: 1,
    prix: 0,
  },
]);

const utiliseReduction = ref("non");
const reduction = ref({
  type: "pourcentage",
  valeur: 0,
});

const suplement = ref("");

const date_emission = ref(new Date().toISOString().split("T")[0]);
const date_echeance = ref("");
const statut = ref("en_attente");

// Calculs réactifs
const totalHT = computed(() => {
  return produits.value.reduce((total, produit) => {
    return total + produit.prix * produit.quantite;
  }, 0);
});

const montantReduction = computed(() => {
  if (utiliseReduction.value !== "oui") return 0;

  return reduction.value.type === "pourcentage"
    ? totalHT.value * (reduction.value.valeur / 100)
    : reduction.value.valeur;
});

const totalTTC = computed(() => {
  return totalHT.value - montantReduction.value;
});

const progressPercentage = computed(() => {
  let progress = 0;
  if (date_emission.value) progress += 20;
  if (societer.value.nom && societer.value.email && societer.value.adresse)
    progress += 20;
  if (client.value.nom) progress += 20;
  if (produits.value.some((p) => p.nom && p.prix > 0 && p.quantite > 0))
    progress += 20;
  if (isFormValid.value) progress += 20;
  return Math.min(progress, 100);
});

const isFormValid = computed(() => {
  return (
    societer.value.nom &&
    societer.value.email &&
    societer.value.adresse &&
    client.value.nom &&
    date_emission.value &&
    produits.value.length > 0 &&
    produits.value.every((p) => p.nom && p.quantite > 0 && p.prix >= 0)
  );
});

// Méthodes
function getTemplateName(templateId) {
  if (!templateId) {
    return "Sélectionner un modèle"; // aucun ID choisi
  }

  const template = templateStore.getTemplateById(templateId);

  if (template) {
    return `Modèle ${template.nom}`;
  } else {
    return "⚠️ Modèle introuvable";
  }
}

function formatPrix(valeur) {
  if (valeur == null) return "-";
  const currency = devise.value?.code || "XOF";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(valeur);
}

function ajouterProduit() {
  produits.value.push({ nom: "", quantite: 1, prix: 0 });
}

function supprimerLigne(index) {
  if (produits.value.length > 1) produits.value.splice(index, 1);
}

function togglePreview() {
  showPreview.value = !showPreview.value;
}

function handleBack() {
  router.go(-1);
}

function resetForm() {
  client.value = { nom: "", email: "", adresse: "" };
  produits.value = [{ nom: "", quantite: 1, prix: 0 }];
  utiliseReduction.value = "non";
  reduction.value = { type: "pourcentage", valeur: 0 };
  suplement.value = "";
  date_emission.value = new Date().toISOString().split("T")[0];
  date_echeance.value = "";
}

async function sauvegarderFacture() {
  if (!isFormValid.value) {
    showToastMessage(
      "Veuillez remplir tous les champs obligatoires",
      "warning"
    );
    return;
  }

  try {
    isSaving.value = true;
    const factureData = {
      client: client.value,
      societer: societer.value,
      produits: produits.value,
      reduction: utiliseReduction.value === "oui" ? reduction.value : null,
      suplement: suplement.value,
      date_emission: date_emission.value,
      date_echeance: date_echeance.value,
      template: selectedTemplate.value,
      statut: statut.value,
      devise: devise.value,
    };

    await factureStore.creerFactureComplete(factureData);

    showToastMessage("Facture créée avec succès !", "success");
    resetForm();
    router.push("/factures");
  } catch (error) {
    console.error("Erreur lors de la création de la facture:", error);
    showToastMessage("Erreur lors de la création de la facture", "error");
  } finally {
    isSaving.value = false;
  }
}

// Watchers
watch(date_emission, (newDate) => {
  if (newDate && !date_echeance.value) {
    const d = new Date(newDate);
    d.setDate(d.getDate() + 30);
    date_echeance.value = d.toISOString().split("T")[0];
  }
});

// Initialisation
onMounted(() => {
  const savedCompany = localStorage.getItem("companyInfo");
  if (savedCompany) {
    const company = JSON.parse(savedCompany);
    societer.value = {
      nom: company.nom || "",
      adresse: company.adresse || "",
      email: company.email || "",
      telephone: company.telephone || "",
    };
  }
});
</script>
