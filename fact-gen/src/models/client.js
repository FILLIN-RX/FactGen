export default class Client {
  constructor(nom, address, email,user_id=null) {
    this.nom = nom;
    this.address = address;
    this.email = email;
    this.user_id = user_id;
   
  }

  toJSON() {
    return {
      nom: this.nom,
      address: this.address,
      email: this.email,
      user_id:this.user_id
      
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
        client.user_id,
        
      ));
    }
}
