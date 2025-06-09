import supabase from "../config/supabaseClient.js"; // Corrigez le nom du fichier

export const authenticateUser = async (req, res, next) => {
  console.log("🛂 Requête reçue - Headers:", req.headers);

  try {
    // 1. Vérifier la présence du header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("❌ Header Authorization manquant");
      return res.status(401).json({ error: "Authorization header manquant" });
    }

    // 2. Extraire le token
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("❌ Format de token invalide");
      return res.status(401).json({ error: "Format de token invalide" });
    }

    // 3. Vérifier le token avec Supabase
    console.log("🔐 Vérification du token...");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.log(
        "❌ Token invalide:",
        error?.message || "Utilisateur non trouvé"
      );
      return res.status(401).json({
        error: error?.message || "Token invalide",
        details: error,
      });
    }

    console.log("✅ Utilisateur authentifié:", user.email);
    req.user = user;
    next();
  } catch (err) {
    console.error("🔥 Erreur auth middleware:", err);
    res.status(500).json({
      error: "Erreur d'authentification",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
