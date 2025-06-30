import { useAuthStore } from "../stores/auth";
import API from "../api/axios";
import Facture from "../models/facture";
const API_BASE_URL = "http://localhost:4000/api";

export async function upsertClient(clientData) {
  const { data } = await API.post("/clients/upsert", clientData);
  return data;
}

// ✅ Facture : Télécharger PDF

// ✅ Facture : Télécharger PDF (méthode existante améliorée)
export async function telechargerPDF({ html, id, invoiceDate, clientName }) {
  try {
    const res = await API.post("/pdf/from-python", { html, id }, {
      responseType: "blob",
    });

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
  } catch (err) {
    console.error("❌ Erreur génération PDF Flask :", err.message);
    throw err;
  }
}


// 🆕 Générer PDF depuis HTML
export async function genererPDFDepuisHTML(htmlContent, filename = 'document.pdf', options = {}) {
  try {
    console.log('🔄 Génération PDF depuis HTML');
    
    const response = await API.post('/pdf/from-html', {
      html: htmlContent,
      filename,
      options
    }, {
      responseType: "blob",
      timeout: 60000
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('✅ PDF généré et téléchargé avec succès depuis HTML');
    return true;
  } catch (error) {
    console.error('❌ Erreur génération PDF depuis HTML:', error);
    throw new Error(`Erreur lors de la génération du PDF: ${error.message}`);
  }
}

// 🆕 Générer PDF avec template
export async function genererPDFAvecTemplate(factureData, templateName = 'default') {
  try {
    console.log(`🔄 Génération PDF avec template ${templateName}`);
    
    const response = await API.post('/pdf/from-template', {
      factureData,
      templateName
    }, {
      responseType: "blob",
      timeout: 60000
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `facture-${factureData.id || 'template'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`✅ PDF généré avec succès avec template ${templateName}`);
    return true;
  } catch (error) {
    console.error('❌ Erreur génération PDF avec template:', error);
    throw new Error(`Erreur lors de la génération du PDF avec template: ${error.message}`);
  }
}

// 🆕 Prévisualiser PDF (retourne l'URL blob pour affichage)
export async function previsualiserPDF(factureId) {
  try {
    console.log(`🔄 Prévisualisation PDF pour facture ${factureId}`);
    
    const response = await API.get(`/pdf/${factureId}`, {
      responseType: "blob",
      timeout: 60000
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    console.log(`✅ PDF prévisualisé avec succès pour facture ${factureId}`);
    return url; // Retourne l'URL pour affichage dans un iframe ou viewer
  } catch (error) {
    console.error('❌ Erreur prévisualisation PDF:', error);
    throw new Error(`Erreur lors de la prévisualisation du PDF: ${error.message}`);
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

// 🆕 Génération batch de PDFs
export async function genererPDFsBatch(factures) {
  try {
    console.log(`🔄 Génération batch de ${factures.length} PDFs`);
    
    const promises = factures.map(facture => 
      telechargerPDF(facture.id).catch(error => ({
        id: facture.id,
        error: error.message
      }))
    );

    const results = await Promise.allSettled(promises);
    
    const successes = results.filter(r => r.status === 'fulfilled').length;
    const failures = results.filter(r => r.status === 'rejected').length;

    console.log(`✅ Génération batch terminée: ${successes} succès, ${failures} échecs`);
    
    return {
      total: factures.length,
      successes,
      failures,
      results
    };
  } catch (error) {
    console.error('❌ Erreur génération batch PDF:', error);
    throw new Error(`Erreur lors de la génération batch: ${error.message}`);
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

