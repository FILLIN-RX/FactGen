<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header mobile avec titre et actions -->
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
            ></path>
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
        <button class="p-2 hover:bg-gray-100 rounded-lg">
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            ></path>
          </svg>
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
                ></path>
              </svg>
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
                >Changer</label
              >
              <button
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-left text-gray-500 hover:bg-gray-50"
              >
                Message(0/3000)
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
                class="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option>30 jours</option>
                <option>15 jours</option>
                <option>60 jours</option>
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
                  placeholder="Ex: SERV5JE016"
                  class="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <!-- Tableau des produits -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Produits et services</h3>
            <thead>
              <tr class="bg-gray-50 border-b">
                <th class="text-left p-3 font-medium">Description</th>
                <th class="text-center p-3 font-medium">Type de produit</th>
                <th class="text-center p-3 font-medium">Qté</th>
                <th class="text-center p-3 font-medium">Unité</th>
                <th class="text-right p-3 font-medium">Prix</th>
                <th class="text-center p-3 font-medium">TVA</th>
                <th class="text-right p-3 font-medium">Montant</th>
                <th class="w-8"></th>
              </tr>
            </thead>
            <!-- Tableau responsive -->
            <tbody>
              <!-- Produits existants -->
              <tr
                v-for="(produit, index) in produits"
                :key="index"
                class="border-b hover:bg-gray-50"
              >
                <!-- Description -->
                <td class="p-3">
                  <input
                    v-model="produit.nom"
                    type="text"
                    placeholder="Description"
                    class="w-full border-0 bg-transparent text-sm"
                  />
                </td>

                <!-- Type de produit -->
                <td class="p-3 text-center">
                  <select
                    v-model="produit.type"
                    class="border-0 bg-transparent text-sm text-center"
                  >
                    <option value="Biens">Biens</option>
                    <option value="Services">Services</option>
                  </select>
                </td>

                <!-- Quantité -->
                <td class="p-3 text-center">
                  <input
                    v-model.number="produit.quantite"
                    type="number"
                    min="1"
                    class="w-12 text-center border-0 bg-transparent text-sm"
                  />
                </td>

                <!-- Unité -->
                <td class="p-3 text-center">
                  <input
                    v-model="produit.unite"
                    type="text"
                    placeholder="h"
                    class="w-12 text-center border-0 bg-transparent text-sm"
                  />
                </td>

                <!-- Prix -->
                <td class="p-3 text-right">
                  <input
                    v-model.number="produit.prix"
                    type="number"
                    step="0.01"
                    class="w-20 text-right border-0 bg-transparent text-sm"
                  />
                </td>

                <!-- TVA -->
                <td class="p-3 text-center">
                  <input
                    v-model="produit.tva"
                    type="text"
                    placeholder="0 %"
                    class="w-12 text-center border-0 bg-transparent text-sm"
                  />
                </td>

                <!-- Montant calculé -->
                <td class="p-3 text-right font-medium">
                  {{ (produit.quantite * produit.prix).toFixed(2) }} €
                </td>

                <!-- Bouton supprimer -->
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

            <!-- Bouton d'ajout -->
            <button
              @click="ajouterProduit"
              class="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>+</span>
              <span>Ajouter une ligne</span>
            </button>
          </div>
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

          <!-- Totaux -->
          <div class="flex justify-end">
            <div class="w-full sm:w-80 space-y-2 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between text-sm">
                <span>Total HT</span>
                <span class="font-medium"
                  >{{ formatPrix(totalHT) }} €</span
                >
              </div>
               <div v-if="montantReduction > 0" class="flex justify-between text-red-600">
                <span>Réduction</span>
                <span>-{{ formatPrix(montantReduction) }}</span>
              </div>
              <div class="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total dû</span>
                <span>{{ formatPrix(totalTTC) }} €</span>
              </div>
            </div>
          </div>
          
          </div>

          <!-- Notes -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Note de bas de page(0/250)</label
              >
              <textarea
                v-model="notesBasPage"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none"
                placeholder="Ajouter des notes..."
              ></textarea>
            </div>
          </div>

          <!-- Moyens de paiement -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Moyens de paiement</h3>
            <div class="flex items-center space-x-2 text-blue-600">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 6h18l-2 13H5L3 6z M3 6l-1-4h3l1 4"></path>
              </svg>
              <button class="text-sm hover:underline">
                Ajouter des moyens de paiement
              </button>
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
              class="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Enregistrer le brouillon
            </button>
          </div>

          <!-- Actions desktop -->
          <div class="hidden lg:flex justify-end space-x-3 pt-6 border-t">
            <button
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
              <button class="text-sm text-blue-600 hover:underline">
                Modifier
              </button>
            </div>
          </div>

          <!-- Aperçu de la facture -->
          <div class="bg-white rounded-lg hidden lg:block shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Prévisualisation</h3>
              <div class="flex space-x-2">
                <button
                  @click="openTemplateDialog"
                  class="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Changer de modèle
                </button>
                <button
                  @click="genererPDF"
                  class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  PDF
                </button>
              </div>
            </div>

            <!-- Rendu du template sélectionné -->
            <div class="border rounded-lg overflow-hidden bg-white">
              <!-- Modifier la partie prévisualisation dans InvoiceForm.vue -->

              <component
                v-if="selectedTemplateComponent"
                :is="selectedTemplateComponent"
                :societer="factureDataForPreview.entreprise"
                :client="factureDataForPreview.client"
                :produits="factureDataForPreview.produits"
                :totalHT="factureDataForPreview.total"
                :totalTTC="factureDataForPreview.total"
                :date_emission="factureDataForPreview.dateEmission"
                :date_echeance="factureDataForPreview.dateEcheance"
                :factureId="factureDataForPreview.numero"
              />
            </div>
          </div>

          <!-- Sidebar droite avec options -->
          <div class="mt-6 space-y-4">
            <!-- Options rapides -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium mb-3">Options</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="rounded text-blue-600 mr-2" />
                  <span class="text-sm">Ajouter des moyens de paiement</span>
                  <span
                    class="ml-auto w-2 h-2 bg-green-500 rounded-full"
                  ></span>
                </label>
                <label class="flex items-center">
                  <span class="text-sm">Personnaliser le design</span>
                  <span class="ml-auto text-blue-600 text-sm">></span>
                </label>
                <label class="flex items-center">
                  <span class="text-sm">Paramètres</span>
                  <span class="ml-auto text-blue-600 text-sm">></span>
                </label>
              </div>
            </div>

            <!-- Status -->
            <div class="space-y-2">
              <div class="flex items-center text-sm">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Remise</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Facture récurrente</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Acompte</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Calendrier de paiement</span>
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
          :date_emission="dateEmission"
          :date_echeance="dateEcheance"
          :factureId="numeroFacture"
        />
      </div>

      <!-- Actions mobiles pour preview -->
      <div class="sticky bottom-0 bg-white border-t p-4">
        <button
          @click="creerFacture"
          class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium"
        >
          Envoyer la facture →
        </button>
      </div>
    </div>

    <!-- Dialog de sélection de template -->
    <TemplateSelectorDialog />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTemplateSelection } from "@/composables/useTemplateSelection";
import TemplateSelectorDialog from "@/components/templates/TemplateSelectorDialog.vue";
import { useFacturesStore } from "@/stores/Facture";
import { showToastMessage } from "@/composables/useToast";

const router = useRouter();
const route = useRoute();
const factureStore = useFacturesStore();

// État réactif
const showPreviewMobile = ref(false);
const isSaving = ref(false);
const numeroFacture = ref("F-" + Date.now().toString().slice(-5));
const dateEmission = ref(new Date().toISOString().split('T')[0]);
const dateEcheance = ref(new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]);
const utiliseReduction = ref(false);
const notesBasPage = ref("");

// Données de la facture
const societer = ref({
  nom: "",
  adresse: "",
  email: "",
  telephone: "",
});

const client = ref({ 
  nom: "", 
  address: "", 
  email: "" 
});

const produits = ref([{ 
  nom: "", 
  quantite: 1, 
  prix: 0,
  type: "Biens",
  unite: "u",
  tva: "0%"
}]);

const reduction = ref({
  type: "pourcentage",
  valeur: 0
});

// Gestion des templates
const {
  selectedTemplate,
  selectedTemplateComponent,
  openTemplateDialog,
  setTemplate,
  initializeTemplate
} = useTemplateSelection();

// Calculs réactifs
const totalHT = computed(() => produits.value.reduce((total, p) => total + (p.prix * p.quantite), 0));
const montantReduction = computed(() => {
  if (!utiliseReduction.value) return 0;
  return reduction.value.type === "pourcentage" 
    ? totalHT.value * (reduction.value.valeur / 100)
    : reduction.value.valeur;
});
const totalTTC = computed(() => totalHT.value - montantReduction.value);

// Formatage des prix
function formatPrix(valeur) {
  if (!valeur) return "0,00 €";
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(valeur);
}

// Données pour la prévisualisation
const factureDataForPreview = computed(() => ({
  numero: numeroFacture.value,
  dateEmission: dateEmission.value,
  dateEcheance: dateEcheance.value,
  client: client.value,
  produits: produits.value,
  total: totalTTC.value,
  entreprise: societer.value,
  suplement: notesBasPage.value,
  montantReduction: montantReduction.value
}));

// ... (le reste de vos méthodes)
</script>