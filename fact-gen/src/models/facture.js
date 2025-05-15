// src/models/Facture.js
export default class Facture {
  constructor(client, produits, reduction = null) {
    this.client = client;
    this.produits = produits;
    this.reduction = reduction;
    this.suplement = null;
  }

  getTotalHT() {
    return this.produits.reduce((total, p) => total + p.prix * p.quantite, 0);
  }

  getMontantReduction() {
    if (!this.reduction || this.reduction.valeur === 0) return 0;
    if (this.reduction.type === 'montant') {
      return this.reduction.valeur;
    } else if (this.reduction.type === 'pourcentage') {
      return this.getTotalHT() * (this.reduction.valeur / 100);
    }
    return 0;
  }

  getTotalTTC() {
    return this.getTotalHT() - this.getMontantReduction();
  }

  toJSON() {
    return {
      client: this.client,
      produits: this.produits,
      reduction: this.reduction,
      totalHT: this.getTotalHT(),
      montantReduction: this.getMontantReduction(),
      totalTTC: this.getTotalTTC()
    };
  }
  sauvegarder() {
    const factureData = {
      client: this.client,
      produits: this.produits,
      utiliseReduction: this.utiliseReduction,
      reduction: this.reduction,
      suplement: this.suplement,
      totalHT: this.getTotalHT(),
      montantReduction: this.getMontantReduction(),
      totalTTC: this.getTotalTTC(),
      date: new Date().toISOString()
    };

    let factures = JSON.parse(localStorage.getItem('factures')) || [];
    factures.push(factureData);
    localStorage.setItem('factures', JSON.stringify(factures));

    alert("✅ Facture sauvegardée avec succès !");
}
}
