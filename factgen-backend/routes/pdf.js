import express from "express";
import createPDF from "../controller/pdf.js";

const router = express.Router();

// Modifiez cette route pour correspondre à ce que vous appelez
router.get("/:id", async (req, res) => {
    try {
       await createPDF(req, res);
    } catch(error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
});

export default router;