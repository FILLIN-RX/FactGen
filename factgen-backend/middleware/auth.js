// auth.js
import supabase from '../config/supabaseClient.js';

// Middleware d'authentification
export async function authenticateUser(req, res, next){
  console.log("🛂 Middleware d'authentification exécuté");

   // Extrait le token JWT de l'en-tête
  const token = req.headers.authorization?.split('Bearer')[1];

  // Vérifie la présence et le format du token
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  console.log("🔐 Token reçu (partiel):", token.substring(0, 10) + '...');

  try {
    // Vérifie le token via l'API Supabase
    const { data, error } = await supabase.auth.getUser(token);

    // Si erreur ou utilisateur non trouvé
    if (error || !data?.user) {
      console.error("🚫 Token invalide ou utilisateur non trouvé:", error);
      return res.status(401).json({ error: "Token invalide ou utilisateur non trouvé" });
    }

    console.log("✅ Utilisateur authentifié:", data.user.email);

    // Attache les données de l'utilisateur à l'objet req
    req.user = data.user;

    next(); // Passe au middleware/route suivant
  } catch (err) {
    console.error("💥 Erreur serveur lors de l'authentification:", err);
    res.status(500).json({ error: "Erreur serveur lors de l'authentification" });
  }
};