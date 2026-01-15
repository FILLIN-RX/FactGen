<template>
    <div class="invoice-container">
        <!-- Votre template existant reste inchangé -->
        <div class="header">
            <div class="company-info">
                <div class="company-logo">
                    <img v-if="societer.logo" :src="societer.logo" alt="Logo de l'entreprise"
                        class="h-16 w-auto mb-2" />
                </div>
                <div class="company-details">
                    <div class="company-name">{{ societer.nom }}</div>
                    <div class="company-address">


                        <div>{{ societer.adresse }}</div>
                        <div>{{ societer.ville }}</div>
                        <div>{{ societer.telephone }}</div>
                    </div>
                </div>
            </div>

            <div class="invoice-info">
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-date">{{ date_emission }}</div>
            </div>
        </div>

        <div class="client-section">
            <div class="client-label">To :</div>
            <div class="client-info">
                <div class="client-name">{{ client?.nom || "Client Name" }}</div>
                <div class="client-address">{{ client?.address }}</div>
                <div class="client-details">{{ client?.details }}</div>
            </div>
        </div>

        <table class="products-table">
            <thead>
                <tr>
                    <th class="description-col">Items Description</th>
                    <th class="price-col">Unit Price</th>
                    <th class="qty-col">Qnt</th>
                    <th class="total-col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(produit, index) in produits" :key="index">
                    <td class="description-cell">
                        <div class="item-name">{{ produit.nom }}</div>
                        <div class="item-description">{{ produit.description }}</div>
                    </td>
                    <td class="price-cell">$ {{ format(produit.prix) }}</td>
                    <td class="qty-cell">{{ produit.quantite }}</td>
                    <td class="total-cell">
                        {{ format(produit.prix * produit.quantite) }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="totals-section">
            <div class="totals-container">
                <div class="subtotal-line">
                    <span>SUBTOTAL :</span>
                    <span>$ {{ sousTotal }}</span>
                </div>
                <div class="tax-line">
                    <span>Tax VAT 15% :</span>
                    <span>$ {{ Number(sousTotal * 0.15).toFixed(2) }}</span>
                </div>
                <div class="discount-line" v-if="montantReduction">
                    <span>DISCOUNT 5% :</span>
                    <span>$ {{ format(montantReduction) }}</span>
                </div>
                <div class="total-due">
                    <span>TOTAL DUE :</span>
                    <span>$ {{ Number(totalTTC).toFixed(2) }}</span>
                </div>
            </div>
        </div>

        <div class="note-section" v-if="suplement">
            <div class="note-title">Note:</div>
            <div class="note-content">{{ suplement }}</div>
        </div>

        <div class="thank-you">Thank you for your Business</div>

        <div class="footer-info">
            <div class="footer-section">
                <div class="footer-title">Questions?</div>
                <div class="footer-content">
                    <div>Email us : {{ societer.email }}</div>
                    <div>Call us : {{ societer.telephone }}</div>
                </div>
            </div>

            <div class="footer-section">
                <div class="footer-title">Payment Info :</div>
                <div class="footer-content">
                    <div>Account : {{ societer.compte || "123 456 789" }}</div>
                    <div>A/C Name : {{ societer.nom }}</div>
                    <div>Bank Details : {{ societer.banque || "Bank Principal" }}</div>
                </div>
            </div>

            <div class="footer-section">
                <div class="footer-title">Terms & Conditions/Note:</div>
                <div class="footer-content">
                    <div>
                        {{
                            conditions || `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh
                        euismod tincidunt.`
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

import { formatCurrency } from "@/utils/format";
import { useSettingsStore } from "@/shared/stores/setting.store";

const setting = useSettingsStore();
const format = (val) => formatCurrency(val, setting.currency)

const props = defineProps({
    societer: Object,
    client: Object,
    produits: Array,
    totalHT: Number,
    totalTTC: Number,
    montantReduction: Number,
    sousTotal: Number,
    suplement: String,
    conditions: String,
    date_emission: String,
    date_echeance: String,
    factureId: String,
});

// Fonctions utilitaires
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR");
};

const formatPrice = (price) => {
    return Number(price).toFixed(2);
};

// Fonction pour générer le HTML pur

// Expose la fonction pour l'utiliser depuis le parent
</script>

<style scoped>
@page {
    margin: 20mm;
    size: A4;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.invoice-container {
    max-width: 100%;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 20px;
    min-height: 100vh;
    font-family: "Arial", sans-serif;
}

/* Styles de base (mobile-first) */
.header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
}

.company-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.company-logo {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.company-name {
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 10px;
}

.company-address {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.5;
}

.invoice-info {
    text-align: left;
}

.invoice-title {
    font-size: 24px;
    font-weight: bold;
    color: #6b46c1;
    margin-bottom: 5px;
}

.invoice-date {
    font-size: 13px;
    color: #1f2937;
    font-weight: 500;
}

.client-section {
    margin-bottom: 25px;
}

.client-label {
    font-size: 13px;
    color: #1f2937;
    font-weight: 600;
    margin-bottom: 5px;
}

.client-name {
    font-size: 15px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 3px;
}

.client-address,
.client-details {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.4;
}

.products-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background: white;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    font-size: 12px;
}

.products-table thead {
    background: #6b46c1;
    color: white;
}

.products-table th {
    padding: 10px 8px;
    text-align: left;
    font-weight: 600;
}

.products-table td {
    padding: 12px 8px;
    border-bottom: 1px solid #e5e7eb;
    word-break: break-word;
}

.products-table tbody tr:last-child td {
    border-bottom: none;
}

.item-name {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 3px;
}

.item-description {
    color: #6b7280;
    font-size: 11px;
    line-height: 1.3;
}

.price-cell,
.qty-cell {
    text-align: center;
}

.total-cell {
    text-align: right;
}

.totals-section {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.totals-container {
    background: white;
    padding: 15px;
    border-radius: 6px;
    width: 100%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.subtotal-line,
.tax-line,
.discount-line {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 13px;
    color: #6b7280;
}

.total-due {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    margin-top: 8px;
    border-top: 2px solid #6b46c1;
    font-weight: bold;
    font-size: 14px;
    color: white;
    background: #6b46c1;
    margin: 8px -15px -15px -15px;
    padding: 12px 15px;
    border-radius: 0 0 6px 6px;
}

.note-section {
    margin-bottom: 20px;
}

.note-title {
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 5px;
}

.note-content {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.4;
}

.thank-you {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #6b46c1;
    margin: 25px 0;
    padding: 15px 0;
    border-top: 1px solid #e5e7eb;
}

.footer-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.footer-section {
    flex: 1;
}

.footer-title {
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
}

.footer-content {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.4;
}

.footer-content div {
    margin-bottom: 2px;
}

/* Styles pour tablettes */
@media (min-width: 600px) {
    .invoice-container {
        padding: 30px;
    }

    .header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .company-info {
        flex-direction: row;
        align-items: flex-start;
        gap: 15px;
    }

    .invoice-info {
        text-align: right;
    }

    .products-table {
        font-size: 13px;
    }

    .totals-container {
        width: auto;
        min-width: 300px;
    }

    .footer-info {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .footer-section {
        min-width: calc(50% - 15px);
    }
}

/* Styles pour desktop */
@media (min-width: 900px) {
    .invoice-container {
        padding: 40px;
        max-width: 800px;
    }

    .company-name {
        font-size: 24px;
    }

    .invoice-title {
        font-size: 32px;
    }

    .products-table th,
    .products-table td {
        padding: 15px;
    }

    .footer-section {
        min-width: auto;
        flex: 1;
    }
}

@media print {
    .invoice-container {
        padding: 20px;
        background: white;
        max-width: 100%;
    }

    body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
</style>
