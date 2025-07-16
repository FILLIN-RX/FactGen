export function genererPDF(invoice) {
  const formatDate = (d) => new Date(d).toLocaleDateString();
  const formatPrice = (n) => {
    const num = Number(n);
    return isNaN(num) ? "0,00" : num.toFixed(2).replace(".", ",");
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @page {
          margin: 20mm;
          size: A4;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .invoice-container {
          max-width: 100%;
          margin: 0 auto;
          background: #F8F9FA;
          padding: 40px;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 50px;
        }

        .company-info {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .company-logo {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .company-name {
          font-size: 24px;
          font-weight: bold;
          color: #1F2937;
          margin-bottom: 15px;
        }

        .company-address {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.6;
        }

        .invoice-info {
          text-align: right;
        }

        .invoice-title {
          font-size: 32px;
          font-weight: bold;
          color: #6B46C1;
          margin-bottom: 8px;
        }

        .invoice-date {
          font-size: 14px;
          color: #1F2937;
          font-weight: 500;
        }

        .client-section {
          margin-bottom: 40px;
        }

        .client-label {
          font-size: 14px;
          color: #1F2937;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .client-name {
          font-size: 16px;
          font-weight: bold;
          color: #1F2937;
          margin-bottom: 5px;
        }

        .client-address, .client-details {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.5;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .products-table thead {
          background: #6B46C1;
          color: white;
        }

        .products-table th {
          padding: 15px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }

        .description-col {
          width: 50%;
        }

        .price-col, .qty-col, .total-col {
          width: 16.66%;
          text-align: center;
        }

        .total-col {
          text-align: right;
        }

        .products-table td {
          padding: 20px 15px;
          border-bottom: 1px solid #E5E7EB;
          font-size: 13px;
        }

        .products-table tbody tr:last-child td {
          border-bottom: none;
        }

        .item-name {
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 5px;
        }

        .item-description {
          color: #6B7280;
          font-size: 12px;
          line-height: 1.4;
        }

        .price-cell, .qty-cell {
          text-align: center;
          font-weight: 500;
          color: #1F2937;
        }

        .total-cell {
          text-align: right;
          font-weight: 600;
          color: #1F2937;
        }

        .totals-section {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 30px;
        }

        .totals-container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          min-width: 300px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .subtotal-line, .tax-line, .discount-line {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          color: #6B7280;
        }

        .total-due {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          margin-top: 10px;
          border-top: 2px solid #6B46C1;
          font-weight: bold;
          font-size: 16px;
          color: white;
          background: #6B46C1;
          margin: 10px -20px -20px -20px;
          padding: 15px 20px;
          border-radius: 0 0 8px 8px;
        }

        .note-section {
          margin-bottom: 30px;
        }

        .note-title {
          font-size: 14px;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 8px;
        }

        .note-content {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.5;
        }

        .thank-you {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #6B46C1;
          margin: 40px 0;
          padding: 20px 0;
          border-top: 2px solid #E5E7EB;
        }

        .footer-info {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          margin-top: 30px;
        }

        .footer-section {
          flex: 1;
        }

        .footer-title {
          font-size: 14px;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 10px;
        }

        .footer-content {
          font-size: 12px;
          color: #6B7280;
          line-height: 1.5;
        }

        .footer-content div {
          margin-bottom: 3px;
        }

        @media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 12pt;
    line-height: 1.4;
  }
  
  .invoice-container {
    padding: 0;
    background: white;
  }
  
  .no-print {
    display: none !important;
  }
  
  /* Éviter les coupures dans les tableaux */
  table {
    page-break-inside: avoid;
  }
  
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  /* Espacement pour l'impression */
  .page-break {
    page-break-after: always;
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
  ${
    invoice.societer?.logo
      ? `<img src="${invoice.societer.logo}" alt="Logo" style="height: 60px; max-width: 200px;" />`
      : ""
  }
</div>
            <div class="company-details">
              <div class="company-name">${invoice.societer?.nom || "Business Name."
    }</div>
              <div class="company-address">
                <div>${invoice.societer?.adresse || ""}</div>
                <div>${invoice.societer?.ville || ""}</div>
                <div>${invoice.societer?.telephone || ""}</div>
              </div>
            </div>
          </div>

          <div class="invoice-info">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-date">${invoice.date_emission || ""}</div>
          </div>
        </div>

        <!-- Client Information -->
        <div class="client-section">
          <div class="client-label">To :</div>
          <div class="client-info">
            <div class="client-name">${invoice.client?.nom || "Client Name"
    }</div>
            <div class="client-address">${invoice.client?.address || ""}</div>
            <div class="client-details">${invoice.client?.details || ""}</div>
          </div>
        </div>

        <!-- Products Table -->
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
            ${invoice.produits
      ?.map(
        (produit) => `
        <tr>
          <td>${produit.nom || ""}</td>
          <td class="text-right">${formatPrice(produit.prix || 0)} €</td>
          <td class="text-center">${produit.quantite || 0}</td>
          <td class="text-right">${formatPrice(
          (produit.prix || 0) * (produit.quantite || 0)
        )} €</td>
        </tr>
        `
      )
      .join("") || ""
    }
          </tbody>
        </table>

        <!-- Totals Section -->
        <div class="totals-section">
          <div class="totals-container">
            <div class="subtotal-line">
              <span>SUBTOTAL :</span>
              <span>$ ${formatPrice(invoice.totalHT)}</span>
            </div>
           ${invoice.montantReduction
      ? `
        <div class="total-line reduction-line">
          <span>Réduction:</span>
          <span>-${formatPrice(invoice.montantReduction)} €</span>
        </div>
      `
      : ""
    }
            <div class="total-due">
              <span>TOTAL DUE :</span>
              <span>$ ${formatPrice(invoice.totalTTC)}</span>
            </div>
          </div>
        </div>

       <!-- Notes -->
    ${invoice.suplement
      ? `
      <div class="notes-section">
        <div class="notes-title">Informations complémentaires:</div>
        <div class="notes-content">${invoice.suplement}</div>
      </div>
    `
      : ""
    }

        <!-- Thank You -->
        <div class="thank-you">
          Thank you for your Business
        </div>

        <!-- Footer Information -->
        <div class="footer-info">
          <div class="footer-section">
            <div class="footer-title">Questions?</div>
            <div class="footer-content">
              <div>Email us : ${invoice.societer?.email || ""}</div>
              <div>Call us : ${invoice.societer?.telephone || ""}</div>
            </div>
          </div>
          
          <div class="footer-section">
            <div class="footer-title">Payment Info :</div>
            <div class="footer-content">
              <div>Account : ${invoice.societer?.compte || "123 456 789"}</div>
              <div>A/C Name : ${invoice.societer?.nom || ""}</div>
              <div>Bank Details : ${invoice.societer?.banque || "Bank Principal"
    }</div>
            </div>
          </div>
          
          <div class="footer-section">
            <div class="footer-title">Terms & Conditions/Note:</div>
            <div class="footer-content">
              <div>${invoice.conditions ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt."
    }</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}