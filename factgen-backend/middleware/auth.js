export async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Vérifiez ET rafraîchissez le token si nécessaire
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error("Supabase auth error:", error.message);
      return res.status(401).json({ error: "Token invalid or expired" });
    }

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attachez l'utilisateur à la requête
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}