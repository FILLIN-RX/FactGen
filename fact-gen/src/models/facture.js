export default class Facture {
  constructor(societer, client, produits, reduction = null, suplement = null) {
    this.numero = this.genererNumero();
    this.client = client;
    this.societer = societer;
    this.produits = produits || {}; // objet produit
    this.reduction = reduction;
    this.suplement = suplement;
  }

  getTotalHT() {
    return Object.values(this.produits).reduce((total, p) => total + p.prix * p.quantite, 0);
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

  genererNumero() {
    let dernier = parseInt(localStorage.getItem("dernierNumeroFacture") || "0");
    let nouveau = dernier + 1;
    localStorage.setItem("dernierNumeroFacture", nouveau.toString());
    return "F-" + String(nouveau).padStart(5, "0"); // Ex : F-00001
  }

  // ✅ Nouveaux getters
  get totalHT() {
    return this.getTotalHT();
  }

  get montantReduction() {
    return this.getMontantReduction();
  }

  get totalTTC() {
    return this.getTotalTTC();
  }

  toJSON() {
    return {
      societer: this.societer,
      client: this.client,
      produits: this.produits,
      reduction: this.reduction,
      totalHT: this.totalHT,
      montantReduction: this.montantReduction,
      totalTTC: this.totalTTC
    };
  }

  sauvegarder() {
    const factureData = {
      societer: this.societer,
      client: this.client,
      produits: this.produits,
      reduction: this.reduction,
      suplement: this.suplement,
      totalHT: this.totalHT,
      montantReduction: this.montantReduction,
      totalTTC: this.totalTTC,
      date: new Date().toISOString()
    };

    let factures = JSON.parse(localStorage.getItem('factures')) || [];
    factures.push(factureData);
    localStorage.setItem('factures', JSON.stringify(factures));

    alert("✅ Facture sauvegardée avec succès !");
  }
}
