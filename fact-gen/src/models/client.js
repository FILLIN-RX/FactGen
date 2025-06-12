export default class Client {
  constructor(nom, address, email) {
    this.nom = nom;
    this.address = address;
    this.email = email;
   
  }

  toJSON() {
    return {
      nom: this.nom,
      address: this.address,
      email: this.email,
      
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
        client.address,
        client.email,
        
      ));
    }
}
