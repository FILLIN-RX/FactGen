import express from 'express'
import cors from 'cors'
import supabase from './config/supabaseClient.js'
import clientRoutes from './routes/clientRoutes.js'
import factureRoutes from './routes/factureRoutes.js'
import statisticRoutes from './routes/statisticRoutes.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors());

 app.use("/api/clients", clientRoutes);
 app.use("/api/factures",factureRoutes);
 app.use("/api/statistiques", statisticRoutes);

// Lancer le serveur
app.listen(4000, () => {
  console.log("✅ Serveur Express démarré sur http://localhost:4000");
})
