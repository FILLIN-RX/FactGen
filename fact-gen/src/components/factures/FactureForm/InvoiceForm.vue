<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header avec sélecteur de template -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Nouvelle facture</h1>
          <div class="flex items-center space-x-4">
            <!-- Sélecteur de template -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Modèle:</span>
              <button
                @click="openTemplateDialog"
                class="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border"
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
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  ></path>
                </svg>
                <span>{{ selectedTemplate.nom }}</span>
              </button>
            </div>
            <div class="text-right">
              <div class="text-3xl font-bold">INVOICE</div>
              <div class="text-sm text-gray-500">{{ numeroFacture }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Layout principal avec formulaire et prévisualisation -->
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Formulaire à gauche -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <!-- Info facture -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label class="block text-sm font-medium mb-1"
                >Date de facturation</label
              >
              <input
                type="date"
                v-model="dateEmission"
                class="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Échéance</label>
              <input
                type="date"
                v-model="dateEcheance"
                class="w-full border rounded px-3 py-2"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-1">Client</label>
              <input
                v-model="client.nom"
                placeholder="Sélectionner ou créer un client"
                class="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <!-- Tableau produits -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">Produits et services</h3>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse text-sm">
                <thead>
                  <tr class="bg-gray-50">
                    <th class="border p-2 text-left">Description</th>
                    <th class="border p-2 text-center">Qté</th>
                    <th class="border p-2 text-right">Prix</th>
                    <th class="border p-2 text-right">Montant</th>
                    <th class="border p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(produit, index) in produits" :key="index">
                    <td class="border p-2">{{ produit.nom }}</td>
                    <td class="border p-2 text-center">
                      {{ produit.quantite }}
                    </td>
                    <td class="border p-2 text-right">{{ produit.prix }} €</td>
                    <td class="border p-2 text-right">
                      {{ (produit.quantite * produit.prix).toFixed(2) }} €
                    </td>
                    <td class="border p-2 text-center">
                      <button
                        @click="supprimerProduit(index)"
                        class="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                  <!-- Ligne d'ajout -->
                  <tr class="bg-blue-50">
                    <td class="border p-2">
                      <input
                        v-model="newProduit.nom"
                        placeholder="Description du produit/service"
                        class="w-full border-0 bg-transparent text-sm"
                      />
                    </td>
                    <td class="border p-2">
                      <input
                        v-model.number="newProduit.quantite"
                        type="number"
                        class="w-full text-center border-0 bg-transparent text-sm"
                      />
                    </td>
                    <td class="border p-2">
                      <input
                        v-model.number="newProduit.prix"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        class="w-full text-right border-0 bg-transparent text-sm"
                      />
                    </td>
                    <td class="border p-2 text-right text-sm">
                      {{ calculerMontantLigne() }} €
                    </td>
                    <td class="border p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              @click="ajouterProduit"
              class="mt-3 px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
            >
              + Ajouter une ligne
            </button>
          </div>

          <!-- Totaux -->
          <div class="flex justify-end mb-8">
            <div class="w-64 space-y-2 bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between">
                <span>Total HT</span>
                <span class="font-medium"
                  >{{ calculerTotal().toFixed(2) }} €</span
                >
              </div>
              <div class="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total dû</span>
                <span>{{ calculerTotal().toFixed(2) }} €</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <button
              class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Enregistrer le brouillon
            </button>
            <button
              @click="creerFacture"
              class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Voir l'aperçu et envoyer →
            </button>
          </div>
        </div>

        <!-- Prévisualisation à droite -->
        <div class="bg-white rounded-lg shadow-sm p-6">
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
      </div>
    </div>

    <!-- Dialog de sélection de template -->
    <TemplateSelectorDialog />
  </div>
</template>

<script setup>
import { ref, readonly, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTemplateSelection } from "@/composables/useTemplateSelection";
import TemplateSelectorDialog from "@/components/templates/TemplateSelectorDialog.vue";
import Facture from "@/models/facture.js";

// Router
const router = useRouter();
const route = useRoute();

// Template selection
const {
  selectedTemplate,
  selectedTemplateComponent,
  openTemplateDialog,
  setTemplate,
  initializeTemplate,
} = useTemplateSelection();

// Données du formulaire
const client = ref({ nom: "", address: "", email: "" });
const produits = ref([]);
const newProduit = ref({ nom: "", quantite: 1, prix: 0 });

const today = new Date().toISOString().split("T")[0];
const dateEmission = ref(today);
const dateEcheance = ref(today);
const numeroFacture = ref("F-00001");

// Données formatées pour la prévisualisation
const factureDataForPreview = computed(() => {
  return {
    numero: numeroFacture.value,
    dateEmission: dateEmission.value,
    dateEcheance: dateEcheance.value,
    client: {
      nom: client.value.nom || "Nom du client",
      email: client.value.email || "",
      address: client.value.address || ""
    },
    produits: produits.value,
    total: calculerTotal(),
    entreprise: {
      nom: "Ma Société",
      adresse: "Mon Adresse",
      email: "contact@masociete.com",
      telephone: "01 23 45 67 89",
      logo: null // ou URL si disponible
    },
    suplement: "", // Ajoutez si nécessaire
    montantReduction: 0 // Ajoutez si nécessaire
  };
});

// Méthodes
function ajouterProduit() {
  if (!newProduit.value.nom || newProduit.value.prix <= 0) {
    alert("Veuillez remplir la description et le prix");
    return;
  }

  produits.value.push({ ...newProduit.value });
  newProduit.value = { nom: "", quantite: 1, prix: 0 };
}

function supprimerProduit(index) {
  produits.value.splice(index, 1);
}

function calculerTotal() {
  return produits.value.reduce((sum, p) => sum + p.quantite * p.prix, 0);
}

function calculerMontantLigne() {
  return (newProduit.value.quantite * newProduit.value.prix).toFixed(2);
}

function genererPDF() {
  if (produits.value.length === 0) {
    alert("Veuillez ajouter au moins un produit pour générer le PDF");
    return;
  }

  // Créer la facture temporairement pour générer le PDF
  const facture = creerFactureObject();

  // Ouvrir la vue PDF avec le template sélectionné
  const pdfUrl = `/facture/${facture.id}/pdf?template=${selectedTemplate.value.id}`;
  window.open(pdfUrl, "_blank");
}

function creerFactureObject() {
  const produitsObj = {};
  produits.value.forEach((p, index) => {
    produitsObj[index] = p;
  });

  return new Facture(
    { nom: "Ma Société", address: "Mon Adresse" },
    client.value,
    produitsObj,
    null,
    null,
    1,
    dateEmission.value,
    dateEcheance.value,
    selectedTemplate.value.id, // Utiliser le template sélectionné
    "en_attente",
    "EUR"
  );
}

function creerFacture() {
  if (!client.value.nom) {
    alert("Veuillez sélectionner un client");
    return;
  }

  if (produits.value.length === 0) {
    alert("Veuillez ajouter au moins un produit");
    return;
  }

  const facture = creerFactureObject();
  facture.sauvegarder();

  // Rediriger vers la page de détail avec le template sélectionné
  router.push({
    name: "FactureDetail",
    params: { id: facture.id },
    query: { template: selectedTemplate.value.id },
  });
}

// Initialisation
onMounted(() => {
  initializeTemplate();

  // Si un template est passé en paramètre de route
  if (route.query.template) {
    setTemplate(route.query.template);
  }
});
</script>
