import express from "express";

import createPDF from "../controller/pdf.js"
const router = express.Router(); // Crée un routeur Express



router.get("/getpdf/:id",async(req,res)=>{
    try{
       await createPDF(req,res); // Appel de la fonction pour générer le PDF
    }catch(error){
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
})

export default router;