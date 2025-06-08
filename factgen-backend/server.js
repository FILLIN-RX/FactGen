import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const router = express.Router();
import clientRoutes from "./routes/clientRoutes.js";
const facturesRoutes = require('./routes/factureRoutes');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);
app.use("/api/factures", facturesRoutes);
// Ajouter un client


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Express démarré sur http://localhost:${PORT}`);
});
