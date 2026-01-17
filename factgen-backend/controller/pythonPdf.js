// controller/pythonPdf.js
import axios from "axios";

export async function createPDFFromFlask(req, res) {
  console.log("📥 [createPDFFromFlask] Début de la requête PDF");

  try {
    const { html, id } = req.body;

    console.log("🧾 Données reçues :", { htmlPreview: html?.substring(0, 200), id });

    // Vérification du HTML
    if (!html) {
      console.warn("⚠️ HTML manquant dans la requête !");
      return res.status(400).json({ error: "HTML manquant" });
    }

    console.log("🌐 Envoi de la requête à Flask...");
    const response = await axios.post(
      "https://invoiceapi-lfca.onrender.com/pdf/",
      { html },
      { responseType: "arraybuffer" }
    );

    console.log("✅ Réponse reçue de Flask (taille du PDF) :", response.data?.byteLength, "octets");

    const filename = `facture_${id}.pdf`;
    console.log("📄 Nom du fichier PDF :", filename);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${filename}.pdf`,
    });

    console.log("⬇️ Envoi du PDF au client...");
    return res.send(response.data);
  } catch (error) {
    console.error("❌ Erreur PDF Flask :", error);

    // Si Axios a renvoyé une réponse, loguer le status + data
    if (error.response) {
      console.error("📡 Response Status:", error.response.status);
      console.error("📡 Response Data:", error.response.data);
    } else {
      console.error("📡 Pas de réponse du serveur Flask");
    }

    res.status(500).json({
      error: "Erreur PDF Flask",
      details: error.message,
      stack: error.stack,
    });
  } finally {
    console.log("🔚 [createPDFFromFlask] Fin du traitement PDF");
  }
}
