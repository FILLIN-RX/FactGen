// auth.js
import supabase from '../config/supabaseClient.js';

// Middleware d'authentification
export const authenticateUser = async (req, res, next) => {
  console.log("🛂 Middleware d'authentification exécuté");

  // Récupère l'en-tête Authorization
  const authHeader = req.headers.authorization;

  // Vérifie la présence et le format du token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn("🚫 En-tête Authorization manquant ou invalide");
    return res.status(401).json({ error: "En-tête Authorization manquant ou invalide" });
  }

  // Extrait le token JWT de l'en-tête
  const token = authHeader.split(' ')[1];
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