export default class Facture {
  constructor(societer, client, produits, reduction = null, suplement = null,user_id = null) {
    this.numero = this.genererNumero();
    this.client = client;
    this.societer = societer;
    this.produits = produits || {}; // objet produit
    this.reduction = reduction;
    this.suplement = suplement;
    this.date = new Date().toISOString();
    this.user_id = user_id;
  }

  getTotalHT() {
    return Object.values(this.produits).reduce(
      (total, p) => total + p.prix * p.quantite,
      0
    );
  }

  getMontantReduction() {
    if (!this.reduction || this.reduction.valeur === 0) return 0;
    if (this.reduction.type === "montant") {
      return this.reduction.valeur;
    } else if (this.reduction.type === "pourcentage") {
      const total = this.getTotalHT();
      
      return total * (this.reduction.valeur / 100);
    }
    return 0;
  }
  getReductionFinale() {
  if (!this.reduction || this.reduction.valeur === 0) return null;

  const total = this.getTotalHT();

  return {
    type: this.reduction.type,
    valeurOriginale: this.reduction.valeur,
    valeurCalculee:
      this.reduction.type === "montant"
        ? this.reduction.valeur
        : total * (this.reduction.valeur / 100),
    base: total
  };
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
  validate() {
    if (!this.client || !this.client.nom) {
      throw new Error("Le client est requis");
    }
    if (!this.produits || this.produits.length === 0) {
      throw new Error("Au moins un produit est requis");
    }
    return true;
  }
  toJSON() {
    return {
      user_id: this.user_id,
      client_id: this.client.id, // ATTENTION : nécessite que client ait un .id
      client_data: {
        nom: this.client.nom,
        address: this.client.address,
        email: this.client.email,
      },
      produits: Object.values(this.produits).map((p) => ({
        nom: p.nom,
        prix: p.prix,
        quantite: p.quantite,
      })),
      reduction: this.getReductionFinale(),
      suplement: this.suplement || {},
      montant_total: this.totalTTC,
      created_at: new Date().toISOString(),
    };
  }

  sauvegarder() {
    this.validate();
    const factureData = {
      societer: this.societer,
      client: this.client,
      produits: this.produits,
      reduction: this.getReductionFinale(),
      suplement: this.suplement,
      totalHT: this.totalHT,
      montantReduction: this.montantReduction,
      totalTTC: this.totalTTC,
      date: new Date().toISOString(),
    };

    let factures = JSON.parse(localStorage.getItem("factures")) || [];
    factures.push(factureData);
    localStorage.setItem("factures", JSON.stringify(factures));

    alert("✅ Facture sauvegardée avec succès !");
  }
}
