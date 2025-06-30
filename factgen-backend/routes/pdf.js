// routes/pdf.js
import express from "express";
import { createPDF, createPDFFromHTML, createPDFFromTemplate } from "../controller/pdf.js";

const router = express.Router();

// Route existante - Générer PDF depuis URL de facture
router.get("/:id", async (req, res) => {
    try {
        console.log(`📄 Demande de génération PDF pour facture ${req.params.id}`);
        await createPDF(req, res);
    } catch(error) {
        console.error("❌ Erreur lors de la génération PDF:", error);
        res.status(500).json({ 
            error: "Échec de la génération du PDF",
            details: error.message 
        });
    }
});

// Nouvelle route - Générer PDF depuis HTML
router.post("/from-html", async (req, res) => {
    try {
        console.log("📄 Demande de génération PDF depuis HTML");
        await createPDFFromHTML(req, res);
    } catch(error) {
        console.error("❌ Erreur lors de la génération PDF depuis HTML:", error);
        res.status(500).json({ 
            error: "Échec de la génération du PDF depuis HTML",
            details: error.message 
        });
    }
});

// Nouvelle route - Générer PDF avec template
router.post("/from-template", async (req, res) => {
    try {
        console.log("📄 Demande de génération PDF avec template");
        await createPDFFromTemplate(req, res);
    } catch(error) {
        console.error("❌ Erreur lors de la génération PDF avec template:", error);
        res.status(500).json({ 
            error: "Échec de la génération du PDF avec template",
            details: error.message 
        });
    }
});

// Route pour tester la disponibilité du service PDF
router.get("/health", (req, res) => {
    res.json({ 
        status: "OK", 
        service: "PDF Generator",
        timestamp: new Date().toISOString()
    });
});

export default router;