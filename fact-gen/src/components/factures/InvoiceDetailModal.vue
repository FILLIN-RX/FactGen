<template>
  <div
    v-if="invoice"
    class="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    @click.self="$emit('close')"
  >
    <div
      ref="factureHtmlRef"
      class="bg-white w-full max-w-5xl max-h-[100vh] sm:max-h-[95vh] overflow-y-auto sm:rounded-2xl shadow-2xl animate-slideUp sm:animate-none"
    >
      <!-- Header Mobile/Desktop -->
      <div class="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40">
        <div class="flex items-center justify-between p-4 sm:p-6">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">
                Facture #{{ invoice.id }}
              </h2>
              <p class="text-xs sm:text-sm text-gray-500">
                {{ formatDate(invoice.date_emission) }}
              </p>
            </div>
          </div>
          <button
            @click="$emit('close')"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 sm:p-6 space-y-6">
        <!-- Status & Dates Card -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Date d'émission</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(invoice.date_emission) }}</p>
            </div>
            <div>
              <p class="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">Échéance</p>
              <p class="text-sm font-semibold text-red-700">{{ formatDate(invoice.date_echeance) }}</p>
            </div>
          </div>
        </div>

        <!-- Company Info Card -->
        <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  v-if="companyInfo.logo"
                  :src="companyInfo.logo"
                  alt="Logo entreprise"
                  class="w-full h-full object-cover"
                />
                <svg v-else class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-900 text-base sm:text-lg">{{ companyInfo.nom }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ companyInfo.email }}</p>
              <p class="text-sm text-gray-600">{{ companyInfo.adresse }}</p>
            </div>
          </div>
        </div>

        <!-- Client Info Card -->
        <div class="bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-6">
          <div class="flex items-center space-x-3 mb-3">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900">Informations client</h4>
          </div>
          <div class="space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide w-full sm:w-20">Nom</span>
              <span class="text-sm font-medium text-gray-900">{{ invoice.client_data.nom }}</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide w-full sm:w-20">Email</span>
              <span class="text-sm text-gray-700">{{ invoice.client_data.email }}</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-start">
              <span class="text-xs font-medium text-gray-500 uppercase tracking-wide w-full sm:w-20">Adresse</span>
              <span class="text-sm text-gray-700">{{ invoice.client_data.address }}</span>
            </div>
          </div>
        </div>

        <!-- Products Section -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div class="p-4 sm:p-6 border-b border-gray-200">
            <h4 class="font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Produits & Services
            </h4>
          </div>

          <!-- Mobile Products List -->
          <div class="block sm:hidden">
            <div
              v-for="(product, index) in invoice.produits || []"
              :key="index"
              class="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div class="flex justify-between items-start mb-2">
                <h5 class="font-medium text-gray-900 flex-1 mr-2">{{ product.nom }}</h5>
                <span class="font-bold text-gray-900">{{ formatPrice(calculateProductTotal(product)) }} €</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Qty: {{ product.quantite }}</span>
                <span>{{ formatPrice(product.prix) }} €/unité</span>
              </div>
            </div>
          </div>

          <!-- Desktop Products Table -->
          <div class="hidden sm:block overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(product, index) in invoice.produits || []"
                  :key="index"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ product.nom }}</td>
                  <td class="px-6 py-4 text-sm text-gray-700 text-center">{{ product.quantite }}</td>
                  <td class="px-6 py-4 text-sm text-gray-700 text-center">{{ formatPrice(product.prix) }} €</td>
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 text-right">{{ formatPrice(calculateProductTotal(product)) }} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Totals Card -->
        <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-4 sm:p-6">
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Sous-total HT</span>
              <span class="text-sm font-medium text-gray-900">{{ formatPrice(sousTotal) }} €</span>
            </div>

            <div v-if="invoice.reduction" class="flex justify-between items-center">
              <span class="text-sm text-red-600">Réduction</span>
              <span class="text-sm font-medium text-red-600">-{{ formatReduction() }}</span>
            </div>

            <div class="flex justify-between items-center border-t border-gray-200 pt-3">
              <span class="text-sm font-medium text-gray-900">Total HT</span>
              <span class="text-sm font-bold text-gray-900">{{ formatPrice(totalHt) }} €</span>
            </div>

            <div class="flex justify-between items-center bg-blue-600 text-white rounded-lg p-3 -m-1">
              <span class="font-semibold">Total TTC</span>
              <span class="text-lg font-bold">{{ formatPrice(invoice.montant_total) }} €</span>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div v-if="invoice.suplement" class="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h5 class="font-medium text-amber-900 mb-1">Informations supplémentaires</h5>
              <p class="text-sm text-amber-800">{{ invoice.suplement }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Actions -->
      <div class="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            @click="downloadPDF()"
            :disabled="isDownloading"
            class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
          >
            <svg v-if="!isDownloading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span v-if="isDownloading">Téléchargement...</span>
            <span v-else>Télécharger PDF</span>
          </button>
          <button
            @click="$emit('delete')"
            class="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 sm:px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span>Supprimer</span>
          </button>
        </div>
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
  societer: Object,
});

// Events
const emit = defineEmits(["close", "download", "delete"]);

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

// Computed pour les informations de l'entreprise
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

// Génération du template PDF (version améliorée)
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
          margin: 1.5cm;
          size: A4;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1f2937;
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
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #3b82f6;
        }
        
        .invoice-title {
          font-size: 28px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 10px;
        }
        
        .dates {
          text-align: right;
          font-size: 13px;
        }
        
        .emission-date {
          color: #6b7280;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .due-date {
          color: #dc2626;
          font-weight: 700;
          background: #fef2f2;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #fecaca;
        }
        
        .company-info {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        
        .logo {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          margin-right: 20px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
        }
        
        .logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .company-details h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #1f2937;
        }
        
        .company-details p {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
          font-weight: 500;
        }
        
        .client-info {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #bbf7d0;
          margin-bottom: 40px;
        }
        
        .client-info h4 {
          font-weight: 700;
          margin-bottom: 16px;
          color: #166534;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .client-info p {
          margin-bottom: 8px;
          font-size: 13px;
          color: #166534;
        }
        
        .products-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .products-table th {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 16px 12px;
          font-weight: 700;
          color: #374151;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .products-table td {
          padding: 16px 12px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
        }
        
        .products-table tr:last-child td {
          border-bottom: none;
        }
        
        .products-table tr:hover {
          background: #f8fafc;
        }
        
        .text-center {
          text-align: center;
        }
        
        .text-right {
          text-align: right;
        }
        
        .totals {
          background: linear-gradient(135deg, #f8fafc 0%, #e7f3ff 100%);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #bfdbfe;
          margin-bottom: 30px;
        }
        
        .total-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .total-line.reduction {
          color: #dc2626;
          background: #fef2f2;
          padding: 8px 12px;
          border-radius: 6px;
          margin: 8px 0;
        }
        
        .total-line.final {
          font-weight: 800;
          font-size: 18px;
          background: #3b82f6;
          color: white;
          padding: 16px 20px;
          border-radius: 8px;
          margin-top: 16px;
        }
        
        .additional-info {
          background: #fffbeb;
          border: 1px solid #fde68a;
          padding: 16px;
          border-radius: 8px;
          font-size: 12px;
          color: #92400e;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div>
            <h1 class="invoice-title">Facture #${props.invoice.id}</h1>
          </div>
          <div class="dates">
            <p class="emission-date">Émise le ${formatDate(props.invoice.date_emission)}</p>
            <p class="due-date">Échéance: ${formatDate(props.invoice.date_echeance)}</p>
          </div>
        </div>

        <div class="company-info">
          ${company.logo ? `<div class="logo"><img src="${company.logo}" alt="Logo" /></div>` : `<div class="logo"></div>`}
          <div class="company-details">
            <h3>${company.nom}</h3>
            <p>${company.email}</p>
            <p>${company.adresse}</p>
          </div>
        </div>

        <div class="client-info">
          <h4>Informations client</h4>
          <p><strong>Nom:</strong> ${props.invoice.client_data.nom}</p>
          <p><strong>Email:</strong> ${props.invoice.client_data.email}</p>
          <p><strong>Adresse:</strong> ${props.invoice.client_data.address}</p>
        </div>

        <table class="products-table">
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-center">Quantité</th>
              <th class="text-center">Prix unitaire</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${(props.invoice.produits || []).map(product => `
              <tr>
                <td><strong>${product.nom}</strong></td>
                <td class="text-center">${product.quantite}</td>
                <td class="text-center">${formatPrice(product.prix)} €</td>
                <td class="text-right"><strong>${formatPrice(calculateProductTotal(product))} €</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-line">
            <span>Sous-total HT:</span>
            <span>${formatPrice(sousTotal.value)} €</span>
          </div>
          
          ${props.invoice.reduction ? `
            <div class="total-line reduction">
              <span>Réduction:</span>
              <span>-${formatReduction()}</span>
            </div>
          ` : ""}
          
          <div class="total-line">
            <span>Total HT:</span>
            <span>${formatPrice(totalHt.value)} €</span>
          </div>
          
          <div class="total-line final">
            <span>Total TTC:</span>
            <span>${formatPrice(props.invoice.montant_total)} €</span>
          </div>
        </div>

        ${props.invoice.suplement ? `
          <div class="additional-info">
            <strong>Informations supplémentaires:</strong><br>
            ${props.invoice.suplement}
          </div>
        ` : ""}
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
    showToast("PDF téléchargé avec succès !", "success");
  } catch (error) {
    console.error("Erreur de téléchargement du PDF", error);
    showToast("Erreur lors du téléchargement du PDF", "error");
  } finally {
    isDownloading.value = false;
  }
};

// Fonctions utilitaires
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString('fr-FR');
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

<style scoped>
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

@media (max-width: 640px) {
  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }
}
</style>