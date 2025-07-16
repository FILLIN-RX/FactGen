export function genererPDF(invoice) {
  const productsHTML = invoice.produits.map(produit => `
    <tr>
      <td class="description-cell">
        <div class="item-name">${produit.nom}</div>
        <div class="item-description">${produit.description || ''}</div>
      </td>
      <td class="price-cell">$ ${formatPrice(produit.prix)}</td>
      <td class="qty-cell">${produit.quantite}</td>
      <td class="total-cell">$ ${formatPrice(produit.prix * produit.quantite)}</td>
    </tr>
  `).join('');

  const discountHTML = props.montantReduction ? `
    <div class="discount-line">
      <span>DISCOUNT 5% :</span>
      <span>$ ${formatPrice(props.montantReduction)}</span>
    </div>
  ` : '';

  const noteHTML = props.suplement ? `
    <div class="note-section">
      <div class="note-title">Note:</div>
      <div class="note-content">${props.suplement}</div>
    </div>
  ` : '';

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
          .invoice-container {
            padding: 20px;
            background: white;
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
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#6B46C1" stroke-width="3"/>
                <circle cx="20" cy="20" r="10" fill="none" stroke="#6B46C1" stroke-width="3"/>
                <circle cx="20" cy="20" r="3" fill="#6B46C1"/>
              </svg>
            </div>
            <div class="company-details">
              <div class="company-name">${props.societer?.nom || "Business Name."}</div>
              <div class="company-address">
                <div>${props.societer?.adresse || ''}</div>
                <div>${props.societer?.ville || ''}</div>
                <div>${props.societer?.telephone || ''}</div>
              </div>
            </div>
          </div>

          <div class="invoice-info">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-date">${props.date_emission || ''}</div>
          </div>
        </div>

        <!-- Client Information -->
        <div class="client-section">
          <div class="client-label">To :</div>
          <div class="client-info">
            <div class="client-name">${props.client?.nom || "Client Name"}</div>
            <div class="client-address">${props.client?.address || ''}</div>
            <div class="client-details">${props.client?.details || ''}</div>
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
            ${productsHTML}
          </tbody>
        </table>

        <!-- Totals Section -->
        <div class="totals-section">
          <div class="totals-container">
            <div class="subtotal-line">
              <span>SUBTOTAL :</span>
              <span>$ ${formatPrice(props.sousTotal)}</span>
            </div>
            <div class="tax-line">
              <span>Tax VAT 15% :</span>
              <span>$ ${formatPrice(props.sousTotal * 0.15)}</span>
            </div>
            ${discountHTML}
            <div class="total-due">
              <span>TOTAL DUE :</span>
              <span>$ ${formatPrice(props.totalTTC)}</span>
            </div>
          </div>
        </div>

        <!-- Note Section -->
        ${noteHTML}

        <!-- Thank You -->
        <div class="thank-you">
          Thank you for your Business
        </div>

        <!-- Footer Information -->
        <div class="footer-info">
          <div class="footer-section">
            <div class="footer-title">Questions?</div>
            <div class="footer-content">
              <div>Email us : ${props.societer?.email || ''}</div>
              <div>Call us : ${props.societer?.telephone || ''}</div>
            </div>
          </div>
          
          <div class="footer-section">
            <div class="footer-title">Payment Info :</div>
            <div class="footer-content">
              <div>Account : ${props.societer?.compte || "123 456 789"}</div>
              <div>A/C Name : ${props.societer?.nom || ''}</div>
              <div>Bank Details : ${props.societer?.banque || "Bank Principal"}</div>
            </div>
          </div>
          
          <div class="footer-section">
            <div class="footer-title">Terms & Conditions/Note:</div>
            <div class="footer-content">
              <div>${props.conditions || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt."}</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
