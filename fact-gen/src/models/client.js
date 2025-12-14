export default class Client {
  constructor(nom, address, email, telephone, user_id = null) {
    this.nom = nom;
    this.address = address;
    this.email = email;
    this.telephone = telephone;
    this.user_id = user_id;
  }

  toJSON() {
    return {
      nom: this.nom,
      address: this.address,
      email: this.email,
      telephone: this.telephone,
      user_id: this.user_id
    };
  }

  sauvegarder() {
    const clientData = this.toJSON();
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push(clientData);
    localStorage.setItem('clients', JSON.stringify(clients));
    alert('Client sauvegardé avec succès');
  }

  static all() {
    return JSON.parse(localStorage.getItem('clients')) || [];
  }
}
