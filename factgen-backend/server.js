import express from "express";
import cors from "cors";
import supabase from "./config/supabaseClient.js";
import clientRoutes from "./routes/clientRoutes.js";
import factureRoutes from "./routes/factureRoutes.js";
import statisticRoutes from "./routes/statisticRoutes.js";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdf.js";

import logger from './middleware/logger.js'
dotenv.config();

const app = express();
app.use(logger)
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use("/api/clients", clientRoutes);
app.use("/api/factures", factureRoutes);
app.use("/api/statistiques", statisticRoutes);
app.use("/api/pdf", pdfRoutes);
app.use((req, res, next) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

// Lancer le serveur
app.listen(4000, () => {
  console.log("✅ Serveur Express démarré sur http://localhost:4000");
});
