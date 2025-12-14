// ===== 5. routes/clientRoutes.js (AMÉLIORÉ) =====
import express from "express";
import supabase from "../config/supabaseClient.js";
import { authenticateUser } from "../middleware/auth.js";
import { validateClient } from "../middleware/ValiderClient.js";

const router = express.Router();

// Récupère tous les clients de l'utilisateur connecté
router.get('/', authenticateUser, async (req, res) => {
  try {
    const supabase = req.supabase;
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout Supabase")), 10000)
    );

    const fetchPromise = supabase
      .from('clients')
      .select('*')
      .eq('user_id', req.user.id);

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Erreur dans GET /clients:', err);
    res.status(500).json({ 
      error: 'Erreur serveur',
      details: err.message 
    });
  }
});

// Crée un nouveau client
router.post("/", authenticateUser, validateClient, async (req, res) => {
  const { nom, email, address, telephone } = req.body;
  const user_id = req.user.id;

  try {
    if (!nom) {
      return res.status(400).json({ error: "Le nom est requis" });
    }

    const { data, error } = await req.supabase
      .from("clients")
      .insert([{ nom, email, address, telephone, user_id }])
      .select();

    if (error) {
      console.error("Erreur Supabase:", error);
      throw error;
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Erreur dans POST /clients:", err);
    res.status(500).json({
      error: "Erreur lors de la création du client",
      details: err.message,
    });
  }
});

// Upsert client (créer ou mettre à jour)
router.post("/upsert", authenticateUser, async (req, res) => {
  const { nom, email, address } = req.body;
  const user_id = req.user.id;

  if (!nom || !email || !address) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  try {
    const { data, error } = await req.supabase
      .from("clients")
      .upsert([{ user_id, nom, email, address }], { onConflict: ["email"] })
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    console.error("Erreur dans POST /clients/upsert:", err);
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Mettre à jour un client par ID
router.put("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { nom, email, address } = req.body;
  const user_id = req.user.id;

  if (!id) {
    return res.status(400).json({ error: "ID du client manquant" });
  }

  try {
    const { data, error } = await req.supabase
      .from("clients")
      .update({ nom, email, address })
      .eq("id", id)
      .eq("user_id", user_id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Client non trouvé" });
    }

    res.json({ message: "Client mis à jour avec succès", client: data[0] });
  } catch (err) {
    console.error("Erreur dans PUT /clients:", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour du client" });
  }
});

// Supprimer un client par ID
router.delete("/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id; // 🔧 AMÉLIORATION: Variable explicite

  if (!id) {
    return res.status(400).json({ error: "ID du client manquant" });
  }

  try {
    const { data, error } = await req.supabase
      .from("clients")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id)
      .select(); 

    if (error) {
      console.error("Erreur Supabase:", error.message);
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Client non trouvé ou non autorisé" });
    }

    res.status(200).json({ 
      message: "Client supprimé avec succès", 
      client: data[0] 
    });
  } catch (err) {
    console.error("Erreur dans DELETE /clients:", err);
    res.status(500).json({ error: "Erreur lors de la suppression du client" });
  }
});

export default router;