import { genererPDF as genererPDFMinimaliste } from "./pdf/classique";
import { genererPDF as genererPDFClassique } from "./pdf/classique";
import { genererPDF as genererPDFModerne } from "./pdf/moderne";

export function genererPDFs(templateName, data) {
  switch (templateName) {
    case "minimaliste":
      return genererPDFMinimaliste(data);
    case "classique":
      return genererPDFClassique(data);
    case "moderne":
      return genererPDFModerne(data);
    default:
      throw new Error("Template inconnu : " + templateName);
  }
}