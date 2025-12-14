<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header mobile -->
    <div
      class="bg-white border-b px-4 py-3 flex items-center justify-between lg:hidden"
    >
      <div class="flex items-center space-x-3">
        <button
          @click="$router.back()"
          class="p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 class="text-lg font-semibold">Nouvelle facture</h1>
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="showPreviewMobile = true"
          class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
        >
          Aperçu
        </button>
      </div>
    </div>

    <!-- Layout principal -->
    <div class="lg:grid lg:grid-cols-2 lg:gap-6 lg:p-6">
      <!-- Formulaire principal -->
      <div class="bg-white lg:rounded-lg lg:shadow-sm">
        <!-- Header desktop -->
        <div class="hidden lg:flex justify-between items-center p-6 border-b">
          <h1 class="text-2xl font-bold">Nouvelle facture</h1>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Modèle:</span>
              <button
                @click="openTemplateDialog"
                class="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
              >
                <span>{{ selectedTemplate.nom }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="p-4 lg:p-6 space-y-6">
          <!-- Section Client -->
          <div class="space-y-4">
            <h2 class="text-lg font-semibold flex items-center space-x-2">
              <span>Client</span>
            </h2>
            <div class="relative">
              <input
                v-model="client.nom"
                placeholder="Sélectionner ou créer un client"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @focus="showClientDropdown = true"
                @blur="handleClientBlur"
              />
              <svg
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <!-- Dropdown clients -->
              <div
                v-if="showClientDropdown && filteredClients.length > 0"
                class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-auto"
              >
                <div
                  v-for="clientItem in filteredClients"
                  :key="clientItem.id"
                  @mousedown.prevent="selectClient(clientItem)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {{ clientItem.nom }} - {{ clientItem.email }}
                </div>
                <div
                  @mousedown.prevent="createNewClient()"
                  class="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
                >
                  + Créer un nouveau client
                </div>
              </div>
            </div>
          </div>

          <!-- Informations de facture -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Numéro de facture</label
              >
              <input
                v-model="numeroFacture"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                readonly
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Message</label
              >
              <button
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-left text-gray-500 hover:bg-gray-50"
              >
                Message({{ notesBasPage.length }}/3000)
              </button>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Date de facturation</label
              >
              <input
                type="date"
                v-model="dateEmission"
                class="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Conditions de paiement</label
              >
              <select
                v-model="conditionsPaiement"
                class="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="30">30 jours</option>
                <option value="15">15 jours</option>
                <option value="60">60 jours</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Échéance</label
              >
              <input
                type="date"
                v-model="dateEcheance"
                class="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Numéro d'engagement</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="numeroEngagement"
                  placeholder="Ex: ENG2345"
                  class="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Code service</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="codeService"
                  placeholder="Ex: SERV5JE016"
                  class="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <!-- Tableau des produits -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Produits et services</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-50 border-b">
                    <th class="text-left p-3 font-medium">Description</th>
                    <th class="text-center p-3 font-medium">Type</th>
                    <th class="text-center p-3 font-medium">Qté</th>
                    <th class="text-center p-3 font-medium">Unité</th>
                    <th class="text-right p-3 font-medium">Prix</th>
                    <th class="text-center p-3 font-medium">TVA</th>
                    <th class="text-right p-3 font-medium">Montant</th>
                    <th class="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(produit, index) in produits"
                    :key="index"
                    class="border-b hover:bg-gray-50"
                  >
                    <td class="p-3">
                      <input
                        v-model="produit.nom"
                        type="text"
                        placeholder="Description"
                        class="w-full border-0 bg-transparent text-sm focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td class="p-3 text-center">
                      <select
                        v-model="produit.type"
                        class="border-0 bg-transparent text-sm text-center focus:ring-1 focus:ring-blue-500 rounded"
                      >
                        <option value="Biens">Biens</option>
                        <option value="Services">Services</option>
                      </select>
                    </td>
                    <td class="p-3 text-center">
                      <input
                        v-model.number="produit.quantite"
                        type="number"
                        min="1"
                        class="w-12 text-center border-0 bg-transparent text-sm focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td class="p-3 text-center">
                      <input
                        v-model="produit.unite"
                        type="text"
                        placeholder="h"
                        class="w-12 text-center border-0 bg-transparent text-sm focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td class="p-3 text-right">
                      <input
                        v-model.number="produit.prix"
                        type="number"
                        step="0.01"
                        class="w-20 text-right border-0 bg-transparent text-sm focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td class="p-3 text-center">
                      <select
                        v-model="produit.tva"
                        class="w-12 text-center border-0 bg-transparent text-sm focus:ring-1 focus:ring-blue-500 rounded"
                      >
                        <option value="0%">0%</option>
                        <option value="5.5%">5.5%</option>
                        <option value="10%">10%</option>
                        <option value="20%">20%</option>
                      </select>
                    </td>
                    <td class="p-3 text-right font-medium">
                      {{ formatPrix(produit.quantite * produit.prix) }}
                    </td>
                    <td class="p-3 text-center">
                      <button
                        @click="supprimerLigne(index)"
                        class="text-red-500 hover:text-red-700 p-1"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Bouton d'ajout -->
            <button
              @click="ajouterProduit"
              class="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>+</span>
              <span>Ajouter une ligne</span>
            </button>
          </div>

          <!-- Réduction et Totaux -->
          <div class="bg-white rounded-lg border p-6">
            <h3 class="text-lg font-medium mb-4">Réduction</h3>
            <div class="space-y-4">
              <label class="flex items-center">
                <input
                  v-model="utiliseReduction"
                  type="checkbox"
                  true-value="oui"
                  false-value="non"
                  class="h-4 w-4 text-blue-600 rounded"
                />
                <span class="ml-2 text-sm">Appliquer une réduction</span>
              </label>

              <div v-if="utiliseReduction === 'oui'" class="space-y-3">
                <select
                  v-model="reduction.type"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="montant">Montant fixe</option>
                  <option value="pourcentage">Pourcentage</option>
                </select>
                <div class="relative">
                  <input
                    v-model.number="reduction.valeur"
                    type="number"
                    min="0"
                    :step="reduction.type === 'pourcentage' ? '1' : '0.01'"
                    :max="reduction.type === 'pourcentage' ? '100' : undefined"
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span
                    v-if="reduction.type === 'pourcentage'"
                    class="absolute right-3 top-2 text-gray-500"
                    >%</span
                  >
                </div>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <div class="w-full sm:w-80 space-y-2 bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between text-sm">
                  <span>Total HT</span>
                  <span class="font-medium">{{ formatPrix(totalHT) }}</span>
                </div>
                <div
                  v-if="montantReduction > 0"
                  class="flex justify-between text-red-600"
                >
                  <span>Réduction</span>
                  <span>-{{ formatPrix(montantReduction) }}</span>
                </div>
                <div
                  class="flex justify-between text-lg font-bold border-t pt-2"
                >
                  <span>Total dû</span>
                  <span>{{ formatPrix(totalTTC) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Note de bas de page({{ notesBasPage.length }}/250)</label
              >
              <textarea
                v-model="notesBasPage"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ajouter des notes..."
                maxlength="250"
              ></textarea>
            </div>
          </div>

          <!-- Actions mobiles -->
          <div
            class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-3"
          >
            <button
              @click="creerFacture"
              class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Voir l'aperçu et envoyer →
            </button>
            <button
              @click="sauvegarderBrouillon"
              class="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Enregistrer le brouillon
            </button>
          </div>

          <!-- Actions desktop -->
          <div class="hidden lg:flex justify-end space-x-3 pt-6 border-t">
            <button
              @click="sauvegarderBrouillon"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Enregistrer le brouillon
            </button>
            <button
              @click="creerFacture"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voir l'aperçu et envoyer →
            </button>
          </div>
        </div>
      </div>

      <!-- Prévisualisation desktop -->
      <div class="hidden lg:block bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Prévisualisation</h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">Fillin</span>
              <button
                @click="openTemplateDialog"
                class="text-sm text-blue-600 hover:underline"
              >
                Modifier
              </button>
            </div>
          </div>

          <!-- Aperçu de la facture -->
          <div class="border rounded-lg overflow-hidden bg-white">
            <component
              v-if="selectedTemplateComponent"
              :is="selectedTemplateComponent"
              :societer="societer"
              :client="client"
              :produits="produits"
              :totalHT="totalHT"
              :totalTTC="totalTTC"
              :montantReduction="montantReduction"
              :date_emission="dateEmission"
              :date_echeance="dateEcheance"
              :factureId="numeroFacture"
              :suplement="notesBasPage"
            />
          </div>

          <!-- Options -->
          <div class="mt-6 space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium mb-3">Options</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="ajouterMoyensPaiement"
                    class="rounded text-blue-600 mr-2"
                  />
                  <span class="text-sm">Ajouter des moyens de paiement</span>
                </label>
                <button
                  @click="genererPDF"
                  class="w-full flex items-center justify-between px-3 py-2 border rounded-lg hover:bg-gray-100"
                >
                  <span class="text-sm">Générer PDF</span>
                  <svg
                    class="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Prévisualisation mobile plein écran -->
    <div
      v-if="showPreviewMobile"
      class="lg:hidden fixed inset-0 bg-white z-50 overflow-auto"
    >
      <div
        class="flex justify-between items-center p-4 border-b bg-white sticky top-0"
      >
        <h3 class="text-lg font-semibold">Prévisualisation</h3>
        <div class="flex items-center space-x-2">
          <button
            @click="genererPDF"
            class="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
          >
            PDF
          </button>
          <button
            @click="showPreviewMobile = false"
            class="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm"
          >
            Fermer
          </button>
        </div>
      </div>

      <div class="p-4">
        <component
          v-if="selectedTemplateComponent"
          :is="selectedTemplateComponent"
          :societer="societer"
          :client="client"
          :produits="produits"
          :totalHT="totalHT"
          :totalTTC="totalTTC"
          :montantReduction="montantReduction"
          :date_emission="dateEmission"
          :date_echeance="dateEcheance"
          :factureId="numeroFacture"
          :suplement="notesBasPage"
        />
      </div>

      <!-- Actions mobiles pour preview -->
      <div class="sticky bottom-0 bg-white border-t p-4">
        <button
          @click="envoyerFacture"
          class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium"
        >
          Envoyer la facture →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useTemplateSelection } from "@/composables/useTemplateSelection";
import { useFacturesStore } from "@/stores/Facture";
import { useClientsStore } from "../../../stores/client";
import { showToastMessage } from "@/composables/useToast";
import { formatCurrency } from "@/utils/format";

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

// Gestion des templates
const {
  selectedTemplate,
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
      selectedTemplate.value,
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
</style>
