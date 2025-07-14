export default class Facture {
  constructor(
    societer,
    client,
    produits,
    reduction = null,
    suplement = null,
    user_id = null,
    date_emission,
    date_echeance,
    template
  ) {
    this.numero = this.genererNumero();
    this.client = client;
    this.societer = societer;
    this.produits = produits || {}; // objet produit
    this.reduction = reduction;
    this.suplement = suplement;
    this.user_id = user_id;
    this.date_emission = date_emission;
    this.date_echeance = date_echeance;
    this.template = template;
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
      base: total,
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
    if (!this.date_emission) {
      throw new Error("La date d'émission est requise.");
    }
    if (this.date_echeance < this.date_emission) {
      throw new Error(
        "La date d'échéance ne peut pas être antérieure à la date d'émission."
      );
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
      date_emission: this.date_emission,
      date_echeance: this.date_echeance,
      template: this.template,
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
      template: this.template,
    };

    let factures = JSON.parse(localStorage.getItem("factures")) || [];
    factures.push(factureData);
    localStorage.setItem("factures", JSON.stringify(factures));

    alert("✅ Facture sauvegardée avec succès !");
  }
}
