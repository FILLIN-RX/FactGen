<template>
  <div class="invoice-container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <div class="company-logo">
          <!-- Logo ici si disponible -->
          <span style="font-weight: bold; color: #007acc">LOGO</span>
        </div>
        <div class="company-name">{{ societer.nom }}</div>
        <div class="company-details">
          {{ societer.email }}<br />
          {{ societer.adresse }}
        </div>
      </div>

      <div class="invoice-info">
        <div class="invoice-title">FACTURE</div>
        <div class="invoice-details">
          <strong>N° {{ factureId }}</strong
          ><br />
          Émise le: {{ date_emission }}<br />
          <span class="important">À payer avant le: {{ date_echeance }}</span>
        </div>
      </div>
    </div>

    <!-- Client Information -->
    <div class="client-section">
      <div class="client-title">FACTURÉ À:</div>
      <div class="client-info">
        <strong>{{ client.nom || "Nom du client" }}</strong
        ><br />
        {{ client.email }}<br />
        {{ client.address }}
      </div>
    </div>

    <!-- Products Table -->
    <table class="products-table">
      <thead>
        <tr>
          <th style="width: 40%">DESCRIPTION</th>
          <th style="width: 15%">QTÉ</th>
          <th style="width: 20%">PRIX UNIT.</th>
          <th style="width: 25%">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(produit, index) in produits" :key="index">
        <td style="width: 40%">{{ produit.nom }}</td>
        <td style="width: 15%">{{ produit.quantite }}</td>
        <td style="width: 20%">{{ Number(produit.prix).toFixed(2) }} $</td>
        <td style="width: 25%">
          {{ (produit.prix * produit.quantite).toFixed(2) }} €
        </td>
      </tr>
      </tbody>
      
    </table>

    <!-- Totals -->
    <div class="totals-section">
      <div style="width: 300px; margin-left: auto">
        <div class="total-line">
          <span>Sous-total HT:</span>
          <span>{{ totalHT.toFixed(2) }} €</span>
        </div>

        <div
          v-if="montantReduction"
          class="total-line reduction-line"
          :style="{ display: reductionDisplay }"
        >
          <span>Réduction:</span>
          <span>-{{ montantReduction.toFixed(2) }} €</span>
        </div>

        <div class="total-line">
          <span>Total HT:</span>
          <span>{{ totalHT.toFixed(2) }} €</span>
        </div>

        <div class="total-line">
          <span><strong>TOTAL TTC:</strong></span>
          <span
            ><strong>{{ totalTTC.toFixed(2) }} €</strong></span
          >
        </div>
      </div>
    </div>

    <!-- Notes -->
    <div
      v-if="suplement"
      class="notes-section"
      :style="{ display: notesDisplay }"
    >
      <div class="notes-title">Informations complémentaires:</div>
      <div class="notes-content">{{ suplement }}</div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Merci pour votre confiance !</p>
      <!-- <p class="text-xs">
        Document généré automatiquement le {{ dateGeneration }}
      </p> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const invoice = defineProps([
  'societer',
  'client', 
  'produits',
  'totalHT',
  'totalTTC',
  'montantReduction',
  'suplement',
  'date_emission',
  'date_echeance',
  'factureId'
]);

// Cette fonction va générer le HTML pour ce template spécifique



</script>
<style scoped>
@page {
  margin: 15mm;
  /* size: A4; */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.4;
  color: #333;
  font-size: 12px;
}

.invoice-container {
  max-width: 100%;
  margin: 0 auto;
  background: white;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  border-bottom: 2px solid #007acc;
  padding-bottom: 20px;
}

.company-info {
  flex: 1;
}

.company-logo {
  width: 60px;
  height: 60px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 2px solid #ddd;
}

.company-name {
  font-size: 18px;
  font-weight: bold;
  color: #007acc;
  margin-bottom: 5px;
}

.company-details {
  font-size: 11px;
  color: #666;
  line-height: 1.3;
}

.invoice-info {
  text-align: right;
  flex: 1;
}

.invoice-title {
  font-size: 24px;
  font-weight: bold;
  color: #007acc;
  margin-bottom: 10px;
}

.invoice-details {
  font-size: 11px;
  color: #666;
}

.invoice-details .important {
  color: #e74c3c;
  font-weight: bold;
}

.client-section {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 25px;
  border-left: 4px solid #007acc;
}

.client-title {
  font-weight: bold;
  color: #007acc;
  margin-bottom: 8px;
  font-size: 13px;
}

.client-info {
  font-size: 11px;
  line-height: 1.4;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 25px;
  font-size: 11px;
}

.products-table th {
  background: #007acc;
  color: white;
  padding: 10px 8px;
  text-align: left;
  font-weight: bold;
  font-size: 11px;
}

.products-table th:nth-child(2),
.products-table th:nth-child(3),
.products-table th:nth-child(4) {
  text-align: center;
}

.products-table th:last-child {
  text-align: right;
}

.products-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.products-table td:nth-child(2),
.products-table td:nth-child(3),
.products-table td:nth-child(4) {
  text-align: center;
}

.products-table td:last-child {
  text-align: right;
  font-weight: bold;
}

.products-table tbody tr:hover {
  background: #f8f9fa;
}

.totals-section {
  text-align: right;
  margin-bottom: 25px;
}

.total-line {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.total-line:last-child {
  border-bottom: 2px solid #007acc;
  font-weight: bold;
  font-size: 14px;
  color: #007acc;
  padding-top: 10px;
  margin-top: 10px;
}

.reduction-line {
  color: #e74c3c;
}

.notes-section {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.notes-title {
  font-weight: bold;
  color: #856404;
  margin-bottom: 5px;
}

.notes-content {
  font-size: 11px;
  color: #856404;
}

.footer {
  text-align: center;
  font-size: 10px;
  color: #666;
  border-top: 1px solid #ddd;
  padding-top: 15px;
  margin-top: 30px;
}

.page-break {
  page-break-after: always;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .no-print {
    display: none;
  }
}

.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.font-bold {
  font-weight: bold;
}
.text-sm {
  font-size: 11px;
}
.text-xs {
  font-size: 10px;
}
</style>
