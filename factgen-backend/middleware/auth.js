import  supabase  from '../config/superbaseclient.js';

export async function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token d\'authentification manquant' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Token invalide ou expiré' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Erreur d\'authentification:', err);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
}

export async function requireRole(role) {
  return async (req, res, next) => {
    if (!req.user?.user_metadata?.role === role) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }
    next();
  };
}