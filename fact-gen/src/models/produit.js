export default class Produit {
    constructor(nom, prix, quantite) {
      this.nom = nom;
      this.prix = prix;
      this.quantite = quantite;
    }
  
    get total() {
      return this.prix * this.quantite;
    }
  }
  