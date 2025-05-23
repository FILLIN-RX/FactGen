export default class Client {
    constructor(nom, adresse, email) {
      this.nom = nom;
      this.adresse = adresse;
      this.email = email;
    }








    toJSON(){
      return{
        nom:this.nom,
        adresse:this.adresse,
        email:this.email
      };
    }
    sauvegarder(){
      const clientData={
        nom:this.nom,
        adresse:this.adresse,
        email:this.email
      }
    }
  }
  