export default class Client {
  constructor(nom, adresse, email, telephone) {
    this.nom = nom;
    this.adresse = adresse;
    this.email = email;
    this.telephone = telephone;
  }

  toJSON() {
    return {
      nom: this.nom,
      adresse: this.adresse,
      email: this.email,
      telephone: this.telephone
    };
  }

  sauvegarder() {
    const clientData = this.toJSON();
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(clientData);
    localStorage.setItem('clients', JSON.stringify(clients));

    alert('Client sauvegardé avec succès');
  }
    // Méthode statique pour charger tous les clients
    static chargerTous() {
      const data = JSON.parse(localStorage.getItem('clients')) || [];
      return data.map(client => new Client(
        client.nom,
        client.adresse,
        client.email,
        client.telephone
      ));
    }
}
