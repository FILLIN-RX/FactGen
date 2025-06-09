import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import clientRoutes from './routes/clientRoutes.js';
import factureRoutes from './routes/factureRoutes.js';

dotenv.config();

const app = express();

// Middlewares de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());



// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/factures', factureRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Express démarré sur http://localhost:${PORT}`);
});