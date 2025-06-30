// routes/pythonpdfRoute.js
import express from "express";
import { createPDFFromFlask } from "../controller/pythonPdf.js"; // <-- vérifier extension .js

const router = express.Router();

router.post("/from-python", createPDFFromFlask);

export default router;
