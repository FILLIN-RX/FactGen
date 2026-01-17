import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import API from "./axios";
import Facture from "@/models/facture";

const API_BASE_URL = "http://localhost:4000/api";

export async function upsertClient(clientData) {
  const { data } = await API.post("/clients/upsert", clientData);
  return data;
}

// ✅ Facture : Télécharger PDF

// ✅ Facture : Télécharger PDF (méthode existante améliorée)
export async function telechargerPDF({ html, id, invoiceDate, clientName }) {
   console.log("Début de la génération du PDF...");
  console.log("ID Facture:", id);
  console.log("Date facture:", invoiceDate);
  console.log("Client:", clientName);
  
  try {
    const res = await API.post("/pdf/from-python", { html, id }, {
      responseType: "blob",
    });
    console.log("Réponse PDF reçue, création du blob...");
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    let filename;
    
    if (invoiceDate && clientName) {
      // Nettoyer le nom du client
      const cleanClientName = clientName
        .replace(/[^a-zA-Z0-9]/g, '_')
        .substring(0, 15);
      
      const date = new Date(invoiceDate).toISOString().split('T')[0];
      filename = `facture_${cleanClientName}_${date}.pdf`;
    } else {
      // Fallback simple
      const today = new Date().toISOString().split('T')[0];
      const shortId = id.substring(0, 8);
      filename = `facture_${today}_${shortId}.pdf`;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("PDF généré et téléchargé avec succès");
  } catch (err) {
    console.error("❌ Erreur génération PDF Flask :", err.message);
    throw err;
  }
}


// 🆕 Vérifier la disponibilité du service PDF
export async function verifierServicePDF() {
  try {
    const response = await API.get('/pdf/health');
    return response.data;
  } catch (error) {
    console.error('❌ Service PDF indisponible:', error);
    throw new Error('Service PDF indisponible');
  }
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
// ... votre code existant ...

// 🆕 Entreprise : Récupérer les informations de l'entreprise
export async function getInfoEntreprise() {
  try {
    const { data } = await API.get("/info");
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos entreprise:", error);
    throw error;
  }
}

// 🆕 Entreprise : Créer ou mettre à jour les informations de l'entreprise
export async function sauvegarderInfoEntreprise(infoData) {
  try {
    const { data } = await API.post("/info", infoData);
    return data;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des infos entreprise:", error);
    throw error;
  }
}

// 🆕 Entreprise : Mettre à jour les informations de l'entreprise par ID
export async function mettreAJourInfoEntreprise(id, infoData) {
  try {
    const { data } = await API.put(`/info/${id}`, infoData);
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des infos entreprise:", error);
    throw error;
  }
}

// 🆕 Utilitaire : Convertir un fichier en base64
export function convertirFichierEnBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
