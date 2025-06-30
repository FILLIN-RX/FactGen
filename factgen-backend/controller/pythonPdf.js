// controller/pythonPdf.js
import axios from "axios";

export async function createPDFFromFlask(req, res) {
  try {
    const {html,id} = req.body;
    if (!html) return res.status(400).json({ error: "HTML manquant" });

    const response = await axios.post("http://localhost:5000/generate-pdf", {
      html: html,
    }, {
      responseType: "arraybuffer",
    });
    const filename = `facture_${id}.pdf`;
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${filename}.pdf`,
    });

    return res.send(response.data);
  } catch (error) {
    console.error("❌ Erreur PDF Flask:", error.message);
    res.status(500).json({ error: "Erreur PDF Flask", details: error.message });
  }
}
