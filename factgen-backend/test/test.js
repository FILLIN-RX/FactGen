import express from 'express';
import supabase from '../config/supabaseClient.js';

const router = express.Router();

router.get('/test-user', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  const token = authHeader.split(' ')[1];
  console.log("🔐 Token reçu:", token.substring(0, 10) + '...');

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      console.error("❌ Erreur de validation Supabase:", error);
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    console.log("✅ Utilisateur connecté:", data.user);

    res.json({ user: data.user });
  } catch (err) {
    console.error("💥 Erreur serveur:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
