import express from 'express'
import supabase from './config/supabaseClient.js'

const app = express()
app.use(express.json())

// Route de test : récupère l'utilisateur Supabase depuis le token
app.get('/api/test-user', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Token invalide", details: error });
    }

    console.log("✅ Utilisateur récupéré:", user.email);

    return res.json({ user });
  } catch (err) {
    console.error("💥 Erreur lors de la récupération utilisateur:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
})

// Lancer le serveur
app.listen(4000, () => {
  console.log("✅ Serveur Express démarré sur http://localhost:4000");
})
