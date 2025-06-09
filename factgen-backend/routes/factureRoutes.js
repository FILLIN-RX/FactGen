// routes/factures.js

import supabase from "../config/supabaseClient.js";
import express from "express";
const router = express.Router();

import { authenticateUser } from "../middleware/auth.js";

// Lire toutes les factures de l'utilisateur connecté
router.get("/", authenticateUser, async (req, res) => {
  console.log("✅ REQUÊTE /factures autorisée");
  console.log("🧍 ID utilisateur:", req.user.id);
  const { data, error } = await supabase
    .from("facture")
    .select("*")
    .eq("user_id", req.user.id)
    .order("date", { ascending: false });
  console.log("📦 Résultat Supabase:", data);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Créer une facture
router.post("/", authenticateUser, async (req, res) => {
  const { client_id, montant, date } = req.body;

  const { data, error } = await supabase
    .from("facture")
    .insert([
      {
        client_id,
        montant,
        date,
        user_id: req.user.id,
      },
    ])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

export default router;
