import { genererPDF as genererPDFMinimaliste } from "./pdf/minimaliste";
import { genererPDF as genererPDFClassique } from "./pdf/classique";
import { genererPDF as genererPDFModerne } from "./pdf/moderne";
function normaliserDonneesFacture(data) {
  return {
    id: data.id || data.factureId || '',
    societer: data.societer || data.companyInfo || {},
    client: data.client || data.client_data || {},
    produits: data.produits || [],
    totalHT: data.totalHT || 0,
    totalTTC: data.totalTTC || data.montant_total || 0,
    montantReduction: data.montantReduction || 0,
    reduction: data.reduction || null,
    suplement: data.suplement || '',
    date_emission: data.date_emission || '',
    date_echeance: data.date_echeance || ''
  };
}
export function genererPDFs(templateName, data) {
  const normalizedData = normaliserDonneesFacture(data);
  switch (templateName) {
    case "minimaliste":
      return genererPDFMinimaliste(normalizedData);
    case "classique":
      return genererPDFClassique(normalizedData);
    case "moderne":
      return genererPDFModerne(normalizedData);
    default:
      throw new Error("Template inconnu : " + templateName);
  }
}