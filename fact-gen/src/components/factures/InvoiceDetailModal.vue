<template>
  <div
    v-if="invoice"
    class="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    @click.self="$emit('close')"
  >

  <!-- Aperçu dynamique du template -->
<component
  :is="currentTemplateComponent"
  :invoice="invoice"
  :client="client"
  :produits="produits"
  :totalHT="totalHT"
  :totalTTC="totalTTC"
  :montantReduction="montantReduction"
  :reduction="reduction"
  :suplement="suplement"
  :date_emission="date_emission"
  :date_echeance="date_echeance"
  :societer="companyInfo" 
/>


  </div>
</template>

<script setup>
import { telechargerPDF, getInfoEntreprise } from "../../services/api";
import { computed, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { showToast } from "../../composables/useToast";
import { templateComponents } from "../../components/templates";
import { useFacturesStore } from "../../stores/Facture";
import Client from "../../models/client";

const toast = useToast();
const isDownloading = ref(false);
const factureHtmlRef = ref(null);
const infoEntreprise = ref(null);
const currentTemplateComponent = computed(() => {
  return templateComponents[props.invoice.template || 'moderne'];
});
defineProps({
  facture: Object,
  societer: Object
})
// Props

// ...existing code...
const date_emission = computed(() => props.invoice?.date_emission || "");
const date_echeance = computed(() => props.invoice?.date_echeance || "");
// ...existing code...
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