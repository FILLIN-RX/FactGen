const API_BASE_URL = "http://localhost:4000/api";

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
export async function getFacturesParClient(client_id) {
  const res = await fetch(`${API_BASE_URL}/factures/client/${client_id}`);
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
