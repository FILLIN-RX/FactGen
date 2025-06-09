// routes/factureRoutes.js
import supabase from "../config/supabaseClient.js";
import express from "express";
const router = express.Router(); // Crée un routeur Express


// Récupère toutes les factures de l'utilisateur connecté
router.get("/", async (req, res) => {
  console.log("✅ REQUÊTE /factures autorisée");
  console.log("🧍 ID utilisateur:", req.user.id);
  
  // Requête Supabase pour récupérer les factures
  const { data, error } = await supabase
    .from("facture") // Table facture
    .select("*") // Sélectionne toutes les colonnes
    .eq("user_id", req.user.id) // Filtre par user_id
    .order("date", { ascending: false }); // Trie par date décroissante

  console.log("📦 Résultat Supabase:", data);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data); // Renvoie les factures
});

// Crée une nouvelle facture
router.post("/", async (req, res) => {
  const { client_id, montant, date } = req.body;

  // Insère la nouvelle facture dans la base de données
  const { data, error } = await supabase
    .from("facture")
    .insert([{
      client_id,
      montant,
      date,
      user_id: req.user.id // Associe la facture à l'utilisateur connecté
    }])
    .select(); // Retourne les données insérées

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]); // Renvoie la facture créée avec statut 201
});

export default router;