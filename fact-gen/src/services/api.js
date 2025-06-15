const API_BASE_URL = "http://localhost:4000/api";
export async function upsertClient(client) {
  const response = await fetch(`${API_BASE_URL}/clients/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error("Erreur lors de l'upsert du client : " + message);
  }

  return await response.json(); // retourne le client avec son `id`
}


// 📌 Créer une nouvelle facture
export async function creerFacture(factureData) {
  const res = await fetch(`${API_BASE_URL}/factures`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(factureData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors de la création");
  return data;
}

// 📌 Récupérer toutes les factures d’un client
export async function getFacturesParClient() {
  const res = await fetch(`${API_BASE_URL}/factures/`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors du chargement");
  return data;
}

// 📌 Créer un nouveau client
export async function creerClient(clientData) {
  const res = await fetch(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientData),
  });
 
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors de la création du client");
  return data;
}
 export async function getClients() {
    const res = await fetch(`${API_BASE_URL}/clients`);
    if (!res.ok) {
      const message = await res.text();
      throw new Error("Erreur lors de la récupération des clients : " + message); 
    }
    return await res.json();
  }
