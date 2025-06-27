import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseServiceRoleKey } from "../config/supabaseClient.js";

export async function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("Aucun token fourni");
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        headers: { Authorization: `Bearer ${token}` },
        fetch: (url, options) => {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          
          return fetch(url, {
            ...options,
            signal: controller.signal
          }).finally(() => clearTimeout(timeout));
        }
      }
    });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    // 🔧 AMÉLIORATION: Gestion d'erreurs plus précise
    if (error) {
      console.error("Erreur d'authentification:", error);
      return res.status(401).json({ 
        error: "Token invalide",
        type: "auth_error",
        details: error.message
      });
    }

    if (!user) {
      console.error("Utilisateur non trouvé");
      return res.status(401).json({ 
        error: "Utilisateur non trouvé",
        type: "user_not_found"
      });
    }

    req.user = user;
    req.supabase = supabase;
    next();
  } catch (err) {
    console.error("Erreur fatale dans authenticateUser:", err);
    return res.status(503).json({
      error: "Service d'authentification indisponible",
      details: err.message,
      code: err.code,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}