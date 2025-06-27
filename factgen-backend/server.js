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
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});
app.use(logger)
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.get('/api/health', async (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: Date.now(),
    supabase: {
      connected: false,
      error: null,
      latency: null
    }
  };

  try {
    const start = Date.now();
    const { success, error } = await testSupabaseConnection();
    healthCheck.supabase = {
      connected: success,
      error,
      latency: Date.now() - start
    };
  } catch (err) {
    healthCheck.supabase.error = err.message;
  }

  res.status(healthCheck.supabase.connected ? 200 : 503).json(healthCheck);
});
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
