import express from "express";
import puppeteer from "puppeteer"; // Importation de Puppeteer pour la génération de PDF
const router = express.Router(); // Crée un routeur Express

router.use("/",async(req,res)=>{
    res.json({ message: "Hello from PDF route!" })
})

export default router;