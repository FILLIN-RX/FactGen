// routes/clientRoutes.js
import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import supabase from "../config/supabaseClient.js";

const router = express.Router(); // Crée un routeur Express

// Récupère tous les clients de l'utilisateur connecté
router.get("/", async (req, res) => {
  try {
    // Requête Supabase pour récupérer les clients
    const { data, error } = await supabase
      .from("clients") // Table clients
      .select("*") // Sélectionne toutes les colonnes
     // .eq("user_id", req.user.id) // Filtre par user_id
      //.order("nom", { ascending: true }); // Trie par nom ascendant

    if (error) throw error;
    res.json(data); // Renvoie les données
    console.log(data)
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ error: "Erreur lors de la récupération des clients" });
  }
});

// Crée un nouveau client
router.post("/", async (req, res) => {
  try {
    const { nom, email, adresse, telephone } = req.body;

    // Validation: vérifie que le nom est présent
    if (!nom) {
      return res.status(400).json({ error: "Le nom du client est requis" });
    }

    // Insère le nouveau client dans la base de données
    const { data, error } = await supabase
      .from("clients")
      .insert([{
        nom,
        email,
        adresse,
        telephone,
        user_id: req.user.id // Associe le client à l'utilisateur connecté
      }])
      .select(); // Retourne les données insérées

    if (error) throw error;
    res.status(201).json(data[0]); // Renvoie le client créé avec statut 201
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ error: "Erreur lors de la création du client" });
  }
});

export default router;