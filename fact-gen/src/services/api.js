import { useAuthStore } from "../stores/auth";
const API_BASE_URL = "http://localhost:4000/api";
export async function upsertClient(client) {
  const token = localStorage.getItem("supabase_token");
  if (!token) throw new Error("uilisateur non connecter");
  const response = await fetch(`${API_BASE_URL}/clients/upsert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error("Erreur lors de l'upsert du client : " + message);
  }

  return await response.json(); // retourne le client avec son `id`
}
// fonction pour telecharger le pdf
export async function telechargerPDF(factureId) {
  const response = await fetch(`${API_BASE_URL}/pdf/${factureId}`);

  const contentType = response.headers.get("content-type");
  if (!response.ok || !contentType.includes("application/pdf")) {
    const text = await response.text();
    console.warn("❌ Contenu reçu :", text);
    throw new Error("Le serveur n’a pas retourné un fichier PDF.");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `facture-${factureId}.pdf`;
  link.click();
  URL.revokeObjectURL(url); // libère la mémoire
}

// 📌 Créer une nouvelle facture
export async function creerFacture(factureData) {
  const token = localStorage.getItem("supabase_token");
  if (!token) throw new Error("Utilisateur non connecter");

  const res = await fetch(`${API_BASE_URL}/factures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(factureData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors de la création");
  return data;
}

// 📌 Récupérer toutes les factures d’un client
export async function getFacturesParClient() {
  const token = localStorage.getItem("supabase_token");
  if (!token) throw new Error("uilisateur non connecter");
  const res = await fetch(`${API_BASE_URL}/factures/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors du chargement");
  return data;
}
//supprime toute les factures

export async function deleteFactures(factureId) {
  const token = localStorage.getItem("supabase_token");
  if (!token) throw new Error("uilisateur non connecter");
  const res = await fetch(`${API_BASE_URL}/factures/${factureId}`, {
    method: "DELETE",
    headers: {
      Authorization:`Bearer ${token}`
    }
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error("Erreur lors de la suppression des factures : " + message);
  }
  return await res.json(); // retourne un message de confirmation ou un objet vide
}

// 📌 Créer un nouveau client
export async function creerClient(clientData) {
  const token = localStorage.getItem("supabase_token");
  if (!token) throw new Error("uilisateur non connecter");
  const res = await fetch(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization:`Bearer ${token}` },
    body: JSON.stringify(clientData),
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(data.error || "Erreur lors de la création du client");
  return data;
}

// Recuper tous les clients
export async function getClients() {
  const token = localStorage.getItem("supabase_token");
  if (!token) throw new Error("uilisateur non connecter");
  const res = await fetch(`${API_BASE_URL}/clients`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error("Erreur lors de la récupération des clients : " + message);
  }
  return await res.json();
}
// Supprimer un client par son ID
export async function deleteClient(clientId) {
  const token = localStorage.getItem("supabase_token");
  if (!token) throw new Error("uilisateur non connecter");
  const res = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error("Erreur lors de la suppression du client : " + message);
  }
  return await res.json(); // retourne un message de confirmation ou un objet vide
}
export async function getFactureById(id) {
  const res = await fetch(`${API_BASE_URL}/factures/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors du chargement");
  return data;
}
