import express from "express";
import cors from "cors";
import supabase, { testSupabaseConnection } from "./config/supabaseClient.js"; // 🔧 CORRECTION: Import ajouté
import clientRoutes from "./routes/clientRoutes.js";
import factureRoutes from "./routes/factureRoutes.js";
import statisticRoutes from "./routes/statisticRoutes.js";
import dotenv from "dotenv";
import pdfRoute from "./routes/pythonpdfRoute.js"
import pdfRoutes from "./routes/pdf.js";
import logger from './middleware/logger.js';

dotenv.config();

const app = express();

// Middleware global pour injecter supabase
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// Route de santé avec test Supabase
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

  const statusCode = healthCheck.supabase.connected ? 200 : 503;
  res.status(statusCode).json(healthCheck);
});

// Routes principales
app.use("/api/clients", clientRoutes);
app.use("/api/factures", factureRoutes);
app.use("/api/statistiques", statisticRoutes);
app.use("/api/pdf1", pdfRoutes);
app.use("/api/pdf",pdfRoute)
// Middleware 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Middleware de gestion d'erreurs globales
app.use((err, req, res, next) => {
  console.error("Erreur globale:", err.stack);
  res.status(500).json({ 
    error: "Erreur interne du serveur",
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Express démarré sur http://localhost:${PORT}`);
});