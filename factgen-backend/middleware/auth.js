// middleware/auth.js
import  supabase  from '../config/superbaseclient.js';

export const authenticateUser = async (req, res, next) => {
  try {
    // 1. Récupérer le token depuis le header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: "Token d'authentification manquant" });
    }

    // 2. Vérifier le format du header
    const [bearer, token] = authHeader.split(' ');
    
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ error: "Format de token invalide" });
    }

    // 3. Vérifier le token avec Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: "Token invalide ou expiré" });
    }

    // 4. Ajouter l'utilisateur à la requête
    req.user = user;
    next();
  } catch (err) {
    console.error('Erreur d\'authentification:', err);
    res.status(500).json({ error: 'Erreur serveur lors de l\'authentification' });
  }
};