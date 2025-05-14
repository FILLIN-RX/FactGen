export default class Facture {
    constructor(numero, Client) {
      this.numero = numero;
      this.Client = Client;
      this.produits = [];
    }
  
    ajouterProduit(produit) {
      this.produits.push(produit);
    }
  
    get total() {
      return this.produits.reduce((acc, p) => acc + p.total, 0);
    }
  }
  