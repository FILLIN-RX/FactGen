import { useAuthStore } from "../stores/auth";
import API from "../api/axios";

const API_BASE_URL = "http://localhost:4000/api";

export async function upsertClient(clientData) {
  const { data } = await API.post("/clients/upsert", clientData);
  return data;
}

// ✅ Facture : Télécharger PDF
export async function telechargerPDF(factureId) {
  const response = await API.get(`/pdf/${factureId}`, {
    responseType: "blob", // pour gérer le fichier
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `facture-${factureId}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
// 📌 Créer une nouvelle facture


export async function creerFacture(factureData) {
  const { data } = await API.post("/factures", factureData);
  return data;
}


// ✅ Factures : récupérer celles de l’utilisateur
export async function getFacturesParClient() {
  const { data } = await API.get("/factures");
  console.log("🔍 Données reçues depuis /factures:", data); // ← ← ← ICI
  return data;
}

//supprime toute les factures

// ✅ Facture : Supprimer une facture
export async function deleteFactures(factureId) {
  const { data } = await API.delete(`/factures/${factureId}`);
  return data;
}

// ✅ Clients : Créer un client
export async function creerClient(clientData) {
  const { data } = await API.post("/clients", clientData);
  return data;
}
// ✅ Clients : Récupérer tous les clients
export async function getClients() {
  const { data } = await API.get("/clients");
  return data;
}
// ✅ Clients : Supprimer un client
export async function deleteClient(clientId) {
  const { data } = await API.delete(`/clients/${clientId}`);
  return data;
}
// services/api.js


export async function getFactureById(id) {
  const { data } = await API.get(`/factures/${id}`);
  return data;
}

