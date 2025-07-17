<template>
  <div class="flex flex-col lg:flex-row h-full">
    <!-- Formulaire -->
    <div
      class="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
      :class="{ 'hidden lg:block': showPreview }"
    >
      <div class="max-w-2xl mx-auto">
        <!-- Header Desktop -->
        <div class="hidden md:block mb-8">
          <h1 class="text-3xl font-bold text-slate-800 mb-2">
            Créer une facture
          </h1>
          <p class="text-slate-600">
            Remplissez les informations pour générer votre facture
            professionnelle
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="mb-8">
          <div
            class="flex items-center justify-between text-xs text-slate-500 mb-2"
          >
            <span>Progression</span>
            <span>{{ progressPercentage }}%</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>

        <form @submit.prevent="sauvegarderFacture" class="space-y-8">
          <h2 class="text-xl font-bold mb-4">
            Choisissez un modèle de facture
          </h2>
          <TemplateSelector v-model="selectedTemplate" />
          <!-- Toutes vos sections existantes restent identiques -->
          <!-- Section Dates -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2
              class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              Informations de facturation
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  for="date_emission"
                  class="block text-sm font-medium text-slate-700"
                >
                  Date d'émission *
                </label>
                <input
                  type="date"
                  id="date_emission"
                  v-model="date_emission"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div class="space-y-2">
                <label
                  for="date_echeance"
                  class="block text-sm font-medium text-slate-700"
                >
                  Date d'échéance
                </label>
                <input
                  type="date"
                  id="date_echeance"
                  v-model="date_echeance"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
          <label for="statut">Statut</label>
          <select id="statut" v-model="statut" required>
            <option value="en_attente">En attente</option>
            <option value="paye">Payé</option>
            <option value="annule">Annulé</option>
          </select>

          <!-- Section Entreprise -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2
              class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              Votre entreprise
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"
                  >Nom de l'entreprise *</label
                >
                <input
                  v-model="societer.nom"
                  type="text"
                  required
                  placeholder="Nom de votre entreprise"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"
                  >Email *</label
                >
                <input
                  v-model="societer.email"
                  type="email"
                  required
                  placeholder="contact@entreprise.com"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"
                  >Adresse *</label
                >
                <textarea
                  v-model="societer.adresse"
                  required
                  placeholder="123 Rue de l'Exemple, 75000 Paris"
                  rows="2"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Section Client -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2
              class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              Informations client
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"
                  >Nom du client *</label
                >
                <input
                  v-model="client.nom"
                  type="text"
                  required
                  placeholder="Nom du client"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"
                  >Email</label
                >
                <input
                  v-model="client.email"
                  type="email"
                  placeholder="client@example.com"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2"
                  >Adresse</label
                >
                <textarea
                  v-model="client.address"
                  placeholder="Adresse du client"
                  rows="2"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Section Produits -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2
              class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
              Produits et services
            </h2>

            <div class="space-y-4">
              <div
                v-for="(produit, index) in produits"
                :key="index"
                class="relative bg-slate-50 rounded-xl p-4 border border-slate-200"
              >
                <!-- Delete button -->
                <button
                  v-if="produits.length > 1"
                  @click="supprimerLigne(index)"
                  type="button"
                  class="absolute top-3 right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors flex items-center justify-center z-10"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>

                <div
                  class="grid grid-cols-1 md:grid-cols-12 gap-4 pr-12 md:pr-4"
                >
                  <div class="md:col-span-5">
                    <label class="block text-sm font-medium text-slate-700 mb-2"
                      >Description *</label
                    >
                    <input
                      v-model="produit.nom"
                      type="text"
                      required
                      placeholder="Description du produit/service"
                      class="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-2"
                      >Quantité *</label
                    >
                    <input
                      v-model.number="produit.quantite"
                      type="number"
                      min="1"
                      required
                      placeholder="1"
                      class="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-2"
                      >Prix unitaire *</label
                    >
                    <input
                      v-model.number="produit.prix"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      placeholder="0.00"
                      class="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  <div class="md:col-span-3 flex items-end">
                    <div class="w-full">
                      <label
                        class="block text-sm font-medium text-slate-700 mb-2"
                        >Total</label
                      >
                      <div
                        class="bg-slate-100 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800"
                      >
                        {{
                          (
                            Number(produit.prix) * Number(produit.quantite)
                          ).toFixed(2)
                        }}
                        €
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                @click="ajouterProduit"
                type="button"
                class="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Ajouter un produit
              </button>
            </div>
          </div>

          <!-- Section Réduction -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2
              class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  ></path>
                </svg>
              </div>
              Réduction
            </h2>

            <div class="space-y-4">
              <div class="flex gap-6">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="non"
                    v-model="utiliseReduction"
                    class="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span class="text-slate-700">Aucune réduction</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="oui"
                    v-model="utiliseReduction"
                    class="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span class="text-slate-700">Appliquer une réduction</span>
                </label>
              </div>

              <div
                v-if="utiliseReduction === 'oui'"
                class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-red-50 rounded-xl border border-red-200"
              >
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2"
                    >Type de réduction</label
                  >
                  <select
                    v-model="reduction.type"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="pourcentage">Pourcentage (%)</option>
                    <option value="montant">Montant fixe (€)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">
                    Valeur
                    {{ reduction.type === "pourcentage" ? "(%)" : "(€)" }}
                  </label>
                  <input
                    v-model.number="reduction.valeur"
                    type="number"
                    :step="reduction.type === 'pourcentage' ? '1' : '0.01'"
                    :min="0"
                    :max="reduction.type === 'pourcentage' ? 100 : undefined"
                    placeholder="0"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Section Informations supplémentaires -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2
              class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              Informations supplémentaires
            </h2>

            <textarea
              v-model="suplement"
              placeholder="Conditions de paiement, notes, informations complémentaires..."
              rows="4"
              class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <!-- Actions -->
          <div class="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              :disabled="isSaving || !isFormValid"
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <svg
                v-if="isSaving"
                class="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {{ isSaving ? "Enregistrement..." : "Créer la facture" }}
            </button>

            <button
              type="button"
              @click="togglePreview"
              class="bg-slate-100 text-slate-700 font-medium py-4 px-6 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-3"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              {{ showPreview ? "Masquer l'aperçu" : "Afficher l'aperçu" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Aperçu -->
    <div
      v-if="showPreview"
      class="flex-1 bg-white border-l border-slate-200 overflow-y-auto"
      :class="{
        'fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto': showPreview,
      }"
    >
      <div
        class="sticky top-0 bg-white border-b border-slate-200 p-4 lg:hidden"
      >
        <button
          @click="togglePreview"
          class="w-full bg-slate-100 text-slate-700 font-medium py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Fermer l'aperçu
        </button>
      </div>

      <component
        v-if="templateStore.getComponentById(selectedTemplate)"
        :is="templateStore.getComponentById(selectedTemplate)"
        :societer="societer"
        :client="client"
        :produits="produits"
        :totalHT="totalHT"
        :totalTTC="totalTTC"
        :montantReduction="montantReduction"
        :reduction="reduction"
        :suplement="suplement"
        :date_emission="date_emission"
        :date_echeance="date_echeance"
        ,
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, reactive } from "vue";
import Facture from "@/models/facture";
import Produit from "@/models/produit";
import Societer from "@/models/societer";
import { useTemplateStore } from "../stores/template";
import { useFacturesStore } from "@/stores/Facture";
import FacturePreview from "./FacturePreview.vue";
import TemplateSelector from "./templates/TemplateSelector.vue";
import FactureModerne from "./templates/FactureModerne.vue";
import FactureMinimaliste from "./templates/FactureMinimaliste.vue";
import FactureClassique from "./templates/FactureClassique.vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { showToastMessage } from "../composables/useToast";
const selectedTemplate = ref(route.query.template);
defineProps({
  templateId: String,
});

const factureStore = useFacturesStore();
const templateStore = useTemplateStore();

// Données réactives
const showPreview = ref(false);
const client = ref({ nom: "", email: "", address: "" });
const produits = ref([new Produit("", 0, 1)]);
const utiliseReduction = ref("non");
const reduction = ref({ type: "pourcentage", valeur: 0 });
const suplement = ref("");
const societer = ref(
  new Societer(
    "Mon Entreprise",
    "123 Rue Exemple, 75000 Paris",
    "contact@entreprise.com",
    "0123456789"
  )
);

const date_emission = ref(new Date().toISOString().substring(0, 10));
const date_echeance = ref("");
const isSaving = ref(false);
const statut = ref("en_attente");

// Générer numéro facture
const generateInvoiceNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rnd = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${y}${m}${d}${rnd}`;
};

// Facture instance
const factureInstance = computed(() => {
  const reductionData =
    utiliseReduction.value === "oui" ? reduction.value : null;
  return new Facture(
    societer.value,
    client.value,
    produits.value,
    reductionData
  );
});

// Totaux
const totalHT = computed(() => factureInstance.value.getTotalHT());
const montantReduction = computed(() =>
  factureInstance.value.getMontantReduction()
);
const totalTTC = computed(() => factureInstance.value.getTotalTTC());

// Validation
const isFormValid = computed(() => {
  const validSocieter =
    societer.value.nom && societer.value.email && societer.value.adresse;
  const validClient = client.value.nom;
  const validProduits = produits.value.some(
    (p) => p.nom && p.prix > 0 && p.quantite > 0
  );
  return validSocieter && validClient && validProduits && date_emission.value;
});

// Barre de progression
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

// Méthodes
const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

const ajouterProduit = () => {
  produits.value.push(new Produit("", 0, 1));
};

const supprimerLigne = (index) => {
  if (produits.value.length > 1) produits.value.splice(index, 1);
};

const resetForm = () => {
  client.value = { nom: "", email: "", address: "" };
  produits.value = [new Produit("", 0, 1)];
  utiliseReduction.value = "non";
  reduction.value = { type: "pourcentage", valeur: 0 };
  suplement.value = "";
  date_emission.value = new Date().toISOString().substring(0, 10);
  date_echeance.value = "";
};

const sauvegarderFacture = async () => {
  if (!isFormValid.value) {
    showToastMessage(
      "Veuillez remplir tous les champs obligatoires",
      "warning"
    );

    return;
  }

  try {
    console.log("Template sélectionné:", selectedTemplate.value);
    isSaving.value = true;
    await factureStore.creerFactureComplete({
      client: client.value,
      societer: societer.value,
      produits: produits.value,
      reduction: utiliseReduction.value === "oui" ? reduction.value : null,
      suplement: suplement.value,
      date_emission: date_emission.value,
      date_echeance: date_echeance.value,
      template: selectedTemplate.value,
      statut: statut.value,
    });

    showToastMessage("Facture créée avec succès !", "success");

    resetForm();
  } catch (error) {
    console.error("❌ Erreur :", error);
    showToastMessage("Erreur lors de la création de la facture", "error");
  } finally {
    isSaving.value = false;
  }
};

// Formatage date
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Watcher pour date d’échéance
watch(date_emission, (newDate) => {
  if (newDate && !date_echeance.value) {
    const d = new Date(newDate);
    d.setDate(d.getDate() + 30);
    date_echeance.value = d.toISOString().substring(0, 10);
  }
});
</script>
