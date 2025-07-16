export function genererPDF(invoice) {
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : '';
  const formatPrice = (n) => Number(n).toFixed(2).replace('.', ',');
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Facture ${invoice.factureId || ''}</title>
  <style>
    @page {
      margin: 15mm;
      size: A4;
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
      margin-bottom: 40px;
    }

    .company-info {
      display: flex;
      align-items: flex-start;
      gap: 15px;
    }

    .company-logo {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, #FFA500, #FF8C00);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .logo-text {
      color: white;
      font-weight: bold;
      font-size: 14px;
    }

    .company-details {
      padding-top: 5px;
    }

    .company-name {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .company-address {
      font-size: 11px;
      color: #666;
      line-height: 1.4;
    }

    .invoice-info {
      text-align: right;
    }

    .invoice-title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    .invoice-dates {
      font-size: 11px;
      color: #666;
      line-height: 1.5;
    }

    .client-section {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
    }

    .client-info {
      font-size: 12px;
      line-height: 1.5;
      color: #333;
    }

    .client-additional {
      font-size: 11px;
      color: #666;
      text-align: right;
      line-height: 1.5;
    }

    .products-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
      font-size: 11px;
    }

    .products-table th {
      background: #f8f9fa;
      color: #333;
      padding: 12px 8px;
      text-align: left;
      font-weight: bold;
      border-bottom: 2px solid #ddd;
      font-size: 10px;
    }

    .products-table th:nth-child(3),
    .products-table th:nth-child(4),
    .products-table th:nth-child(5),
    .products-table th:nth-child(6),
    .products-table th:nth-child(7) {
      text-align: center;
    }

    .products-table th:nth-child(5),
    .products-table th:nth-child(7) {
      text-align: right;
    }

    .products-table td {
      padding: 10px 8px;
      border-bottom: 1px solid #eee;
      font-size: 11px;
    }

    .text-center {
      text-align: center;
    }

    .text-right {
      text-align: right;
    }

    .totals-section {
      margin-bottom: 30px;
      display: flex;
      justify-content: flex-end;
    }

    .totals-container {
      min-width: 300px;
      border: 1px solid #ddd;
    }

    .total-line {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;
      border-bottom: 1px solid #eee;
      font-size: 12px;
    }

    .total-line:last-child {
      border-bottom: none;
    }

    .total-final {
      background: #f8f9fa;
      font-weight: bold;
      color: #333;
      border-top: 2px solid #ddd;
    }

    .payment-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      font-size: 11px;
    }

    .payment-info,
    .payment-terms {
      flex: 1;
    }

    .payment-terms {
      margin-left: 40px;
    }

    .payment-title {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
      margin-top: 15px;
    }

    .payment-title:first-child {
      margin-top: 0;
    }

    .payment-details {
      color: #666;
      line-height: 1.4;
    }

    .notes-section {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 30px;
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
      border-top: 1px solid #ddd;
      padding-top: 20px;
      text-align: center;
    }

    .footer-company {
      font-size: 10px;
      color: #666;
      line-height: 1.4;
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
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <div class="company-logo">
          <span class="logo-text">Logo</span>
        </div>
        <div class="company-details">
          <div class="company-name">${invoice.societer?.nom || ''}</div>
          <div class="company-address">
            ${invoice.societer?.adresse || ''}<br />
            ${invoice.societer?.email || ''}
          </div>
        </div>
      </div>

      <div class="invoice-info">
        <div class="invoice-title">FACTURE - ${invoice.factureId || ''}</div>
        <div class="invoice-dates">
          <div>Date de facturation: ${formatDate(invoice.date_emission)}</div>
          <div>Échéance: ${formatDate(invoice.date_echeance)}</div>
        </div>
      </div>
    </div>

    <!-- Client Information -->
    <div class="client-section">
      <div class="client-info">
        <strong>${invoice.client?.nom || "Nom du client"}</strong><br />
        ${invoice.client?.address || ''}<br />
        ${invoice.client?.email || ''}
      </div>
      
      ${invoice.client?.siret || invoice.client?.tva ? `
      <div class="client-additional">
        ${invoice.client?.siret ? `<div>Numéro de SIRET: ${invoice.client.siret}</div>` : ''}
        ${invoice.client?.tva ? `<div>Numéro de TVA: ${invoice.client.tva}</div>` : ''}
      </div>
      ` : ''}
    </div>

    <!-- Products Table -->
    <table class="products-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Qté</th>
          <th>Unité</th>
          <th>Prix unitaire</th>
          <th>TVA</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>
        ${invoice.produits?.map(produit => `
        <tr>
          <td>${produit.nom || ''}</td>
          <td>${formatDate(produit.date) || formatDate(invoice.date_emission)}</td>
          <td class="text-center">${produit.quantite || 0}</td>
          <td class="text-center">${produit.unite || 'h'}</td>
          <td class="text-right">${formatPrice(produit.prix || 0)} €</td>
          <td class="text-center">${produit.tva || '20,0'} %</td>
          <td class="text-right">${formatPrice((produit.prix || 0) * (produit.quantite || 0))} €</td>
        </tr>
        `).join('') || ''}
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals-section">
      <div class="totals-container">
        <div class="total-line">
          <span>Total HT</span>
          <span>${formatPrice(invoice.totalHT || 0)} €</span>
        </div>
        <div class="total-line">
          <span>TVA 20,0 %</span>
          <span>${formatPrice((invoice.totalTTC || 0) - (invoice.totalHT || 0))} €</span>
        </div>
        <div class="total-line total-final">
          <span><strong>Total (TTC)</strong></span>
          <span><strong>${formatPrice(invoice.totalTTC || 0)} €</strong></span>
        </div>
      </div>
    </div>

    <!-- Payment Information -->
    <div class="payment-section">
      <div class="payment-info">
        <div class="payment-title">Moyens de paiement:</div>
        <div class="payment-details">
          Paypal:<br />
          Banque: BNP Paribas<br />
          SWIFT/BIC: BNPAFRPP<br />
          IBAN: FR12 2132 1313 2131 2312 2131 2312 12
        </div>
      </div>
      
      <div class="payment-terms">
        <div class="payment-title">Conditions de paiement:</div>
        <div class="payment-details">30 jours</div>
        <div class="payment-title">Échéance:</div>
        <div class="payment-details">${formatDate(invoice.date_echeance)}</div>
      </div>
    </div>

    <!-- Notes -->
    ${invoice.suplement ? `
    <div class="notes-section">
      <div class="notes-title">Informations complémentaires:</div>
      <div class="notes-content">${invoice.suplement}</div>
    </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <div class="footer-company">
        <strong>${invoice.societer?.nom || ''}</strong><br />
        ${invoice.societer?.adresse || ''}<br />
        ${invoice.societer?.siret ? `<span>Numéro de SIRET: ${invoice.societer.siret}</span>` : ''}
        ${invoice.societer?.tva ? `<span> - Numéro de TVA: ${invoice.societer.tva}</span>` : ''}
      </div>
    </div>
  </div>
</body>
</html>`;
}
