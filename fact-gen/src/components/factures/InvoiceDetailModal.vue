<template>
  <div
    v-if="invoice"
    class="fixed inset-0 bg-black/10 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div
      ref="factureHtmlRef"
      class="bg-white p-6 rounded-xl shadow-lg mx-auto font-sans max-w-4xl w-full max-h-[90vh] overflow-y-auto"
    >
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <div class="grid grid-cols-4">
          <h2 class="text-2xl font-bold col-span-3">
            Facture: {{ invoice.id }}
          </h2>
          <div>
            <p class="text-xl text-gray-600 justify-center">
              Fait le: {{ formatDate(invoice.date_emission) }}
            </p>
            <p class="text-red-500 text-xl">
              A payer avant le: {{ formatDate(invoice.date_echeance) }}
            </p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <!-- Company Info -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div
            class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden shadow"
          >
            <img
              v-if="companyInfo.logo"
              :src="companyInfo.logo"
              alt="Logo entreprise"
              class="h-full w-full object-cover"
            />
          </div>
          <!-- Utilisation des données de l'entreprise (priorité aux props, puis aux données de la facture) -->
          <div>
            <h3 class="text-xl font-semibold">{{ companyInfo.nom }}</h3>
            <p class="text-sm text-gray-600">{{ companyInfo.email }}</p>
            <p class="text-sm text-gray-600">{{ companyInfo.adresse }}</p>
          </div>
        </div>
      </div>

      <!-- Client Info -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
        <p><strong>Nom :</strong> {{ invoice.client_data.nom }}</p>
        <p><strong>Email :</strong> {{ invoice.client_data.email }}</p>
        <p><strong>Adresse :</strong> {{ invoice.client_data.address }}</p>
      </div>

      <!-- Products Table -->
      <div class="mb-8">
        <div
          class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300"
        >
          <div>Description</div>
          <div class="text-center">Quantité</div>
          <div class="text-center">Prix unitaire</div>
          <div class="text-right">Prix total</div>
        </div>
        <div
          v-for="(product, index) in invoice.produits || []"
          :key="index"
          class="grid grid-cols-4 p-3 border-b text-sm text-gray-800"
        >
          <div class="truncate">{{ product.nom }}</div>
          <div class="text-center">{{ product.quantite }}</div>
          <div class="text-center">{{ formatPrice(product.prix) }} €</div>
          <div class="text-right">
            {{ formatPrice(calculateProductTotal(product)) }} €
          </div>
        </div>
      </div>

      <!-- Totals -->
      <div class="text-right text-gray-800 mb-4 space-y-2">
        <div class="flex justify-between">
          <span>Sous-total HT :</span>
          <span>{{ formatPrice(sousTotal) }} €</span>
        </div>

        <div v-if="invoice.reduction" class="flex justify-between text-red-500">
          <span>Réduction :</span>
          <span>-{{ formatReduction() }}</span>
        </div>

        <div class="flex justify-between">
          <span><strong>Total HT :</strong></span>
          <span
            ><strong>{{ formatPrice(totalHt) }} €</strong></span
          >
        </div>

        <div class="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total TTC :</span>
          <span>{{ formatPrice(invoice.montant_total) }} €</span>
        </div>
      </div>

      <!-- Additional Info -->
      <p class="text-sm text-gray-500 mt-2" v-if="invoice.suplement">
        Info supp : {{ invoice.suplement }}
      </p>

      <!-- Actions -->
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="downloadPDF()"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          :disabled="isDownloading"

        >
          <span v-if="isDownloading">Téléchargement en cours...</span>
          <span v-else>Télécharger PDF</span>
        </button>
        <button
          @click="$emit('delete')"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { telechargerPDF, getInfoEntreprise } from "../../services/api";
import { computed, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { showToast } from "../../composables/useToast";
const toast = useToast();
const isDownloading = ref(false);
const factureHtmlRef = ref(null);
const infoEntreprise = ref(null);

// Props
const props = defineProps({
  invoice: Object,
  logoDataUrl: String,
  isDownloading: Boolean,
  societer: Object, // Données de l'entreprise passées depuis le parent
});

// Events
defineEmits(["close", "download", "delete"]);

// Récupération des infos entreprise si pas passées en props
onMounted(async () => {
  if (!props.societer) {
    try {
      infoEntreprise.value = await getInfoEntreprise();
    } catch (error) {
      console.error("Erreur récupération infos entreprise", error);
    }
  }
});

// Computed pour les informations de l'entreprise (priorité aux props)
const companyInfo = computed(() => {
  return (
    props.societer ||
    infoEntreprise.value ||
    props.invoice.societer || {
      nom: "Nom de l'entreprise",
      email: "email@entreprise.com",
      adresse: "Adresse de l'entreprise",
    }
  );
});

// Génération du template PDF
const generatePDFTemplate = () => {
  const company = companyInfo.value;

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Facture ${props.invoice.id}</title>
      <style>
        @page {
          margin: 2cm;
          size: A4;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          font-size: 14px;
        }
        
        .invoice-container {
          max-width: 100%;
          margin: 0 auto;
          background: white;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 20px;
        }
        
        .invoice-title {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 10px;
        }
        
        .dates {
          text-align: right;
          font-size: 12px;
        }
        
        .emission-date {
          color: #6b7280;
          margin-bottom: 5px;
        }
        
        .due-date {
          color: #dc2626;
          font-weight: 600;
        }
        
        .company-info {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid #d1d5db;
          margin-right: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .company-details h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .company-details p {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 3px;
        }
        
        .client-info {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-bottom: 30px;
        }
        
        .client-info h4 {
          font-weight: 600;
          margin-bottom: 10px;
          color: #374151;
        }
        
        .client-info p {
          margin-bottom: 5px;
          font-size: 12px;
        }
        
        .products-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        
        .products-table th {
          background: #f3f4f6;
          padding: 12px 8px;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #d1d5db;
          font-size: 12px;
        }
        
        .products-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 12px;
        }
        
        .text-center {
          text-align: center;
        }
        
        .text-right {
          text-align: right;
        }
        
        .totals {
          text-align: right;
          margin-bottom: 20px;
        }
        
        .total-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 12px;
        }
        
        .total-line.reduction {
          color: #dc2626;
        }
        
        .total-line.final {
          font-weight: bold;
          font-size: 16px;
          border-top: 2px solid #e5e7eb;
          padding-top: 10px;
          margin-top: 10px;
        }
        
        .additional-info {
          font-size: 11px;
          color: #6b7280;
          margin-top: 20px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div>
            <h1 class="invoice-title">Facture: ${props.invoice.id}</h1>
          </div>
          <div class="dates">
            <p class="emission-date">Fait le: ${formatDate(
              props.invoice.date_emission
            )}</p>
            <p class="due-date">À payer avant le: ${formatDate(
              props.invoice.date_echeance
            )}</p>
          </div>
        </div>

        <div class="company-info">
  ${
    company.logo
      ? `
    <div class="logo">
      <img src="${company.logo}" alt="Logo" />
    </div>
  `
      : ""
  }
  <div class="company-details">
    <h3>${company.nom}</h3>
    <p>${company.email}</p>
    <p>${company.adresse}</p>
  </div>
</div>


        <div class="client-info">
          <h4>Client :</h4>
          <p><strong>Nom :</strong> ${props.invoice.client_data.nom}</p>
          <p><strong>Email :</strong> ${props.invoice.client_data.email}</p>
          <p><strong>Adresse :</strong> ${props.invoice.client_data.address}</p>
        </div>

        <table class="products-table">
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-center">Quantité</th>
              <th class="text-center">Prix unitaire</th>
              <th class="text-right">Prix total</th>
            </tr>
          </thead>
          <tbody>
            ${(props.invoice.produits || [])
              .map(
                (product) => `
              <tr>
                <td>${product.nom}</td>
                <td class="text-center">${product.quantite}</td>
                <td class="text-center">${formatPrice(product.prix)} €</td>
                <td class="text-right">${formatPrice(
                  calculateProductTotal(product)
                )} €</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-line">
            <span>Sous-total HT :</span>
            <span>${formatPrice(sousTotal.value)} €</span>
          </div>
          
          ${
            props.invoice.reduction
              ? `
            <div class="total-line reduction">
              <span>Réduction :</span>
              <span>-${formatReduction()}</span>
            </div>
          `
              : ""
          }
          
          <div class="total-line">
            <span><strong>Total HT :</strong></span>
            <span><strong>${formatPrice(totalHt.value)} €</strong></span>
          </div>
          
          <div class="total-line final">
            <span>Total TTC :</span>
            <span>${formatPrice(props.invoice.montant_total)} €</span>
          </div>
        </div>

        ${
          props.invoice.suplement
            ? `
          <p class="additional-info">Info supp : ${props.invoice.suplement}</p>
        `
            : ""
        }
      </div>
    </body>
    </html>
  `;
};

// Fonction de téléchargement PDF
const downloadPDF = async () => {
  try {
    isDownloading.value = true;
    const htmlContent = generatePDFTemplate();
    await telechargerPDF({
      html: htmlContent,
      id: props.invoice.id,
      invoiceDate: props.invoice.date_emission,
      clientName: props.invoice.client_data?.nom,
    });
     emit("close");
    showToast("PDF téléchargé avec succès !","success");
  } catch (error) {
    console.error("Erreur de téléchargement du PDF", error);
    showToast("Erreur lors du téléchargement du PDF","error");
  } finally {
    isDownloading.value = false;
  }
};

// Fonctions utilitaires
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
}

function formatPrice(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}

function calculateProductTotal(product) {
  const quantite = parseFloat(product.quantite) || 0;
  const prix = parseFloat(product.prix) || 0;
  return quantite * prix;
}

// Calculs des totaux
const sousTotal = computed(() => {
  if (!props.invoice?.produits) return 0;
  return props.invoice.produits.reduce((total, product) => {
    return total + calculateProductTotal(product);
  }, 0);
});

const montantReduction = computed(() => {
  if (!props.invoice?.reduction) return 0;

  const reduction = props.invoice.reduction;
  if (reduction.type === "montant") {
    return parseFloat(reduction.valeur) || 0;
  } else if (reduction.type === "pourcentage") {
    const pourcentage = parseFloat(reduction.valeur) || 0;
    return sousTotal.value * (pourcentage / 100);
  }
  return 0;
});

const totalHt = computed(() => {
  return sousTotal.value - montantReduction.value;
});

function formatReduction() {
  if (!props.invoice?.reduction) return "";

  const reduction = props.invoice.reduction;
  if (reduction.type === "montant") {
    return `${formatPrice(reduction.valeur)} €`;
  } else if (reduction.type === "pourcentage") {
    return `${reduction.valeur}% (${formatPrice(montantReduction.value)} €)`;
  }
  return "";
}
</script>
