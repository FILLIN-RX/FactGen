import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseServiceRoleKey } from "../config/supabaseClient.js"; // attention : clé service role utilisée uniquement en interne

export async function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token manquant" });

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    console.error("🚫 Token invalide:", error);
    return res.status(401).json({ error: "Token invalide ou utilisateur non trouvé" });
  }

  req.user = user;
  req.supabase = supabase; // injecte un supabase contextuel avec token
  next();
}
