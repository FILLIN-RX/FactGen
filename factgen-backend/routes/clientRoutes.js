// routes/clientRoutes.js
import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router(); // Crée un routeur Express

// Récupère tous les clients de l'utilisateur connecté
router.get("/", async (req, res) => {
  try {
    // Requête Supabase pour récupérer les clients
    const { data, error } = await supabase
      .from("clients") // Table clients
      .select("*"); // Sélectionne toutes les colonnes
    // .eq("user_id", req.user.id) // Filtre par user_id
    //.order("nom", { ascending: true }); // Trie par nom ascendant

    if (error) throw error;
    res.json(data); // Renvoie les données
    console.log(data);
  } catch (err) {
    console.error("Erreur:", err);
    console.log(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des clients" });
  }
});

// Crée un nouveau client
router.post("/", async (req, res) => {
  try {
    const { nom, email, address } = req.body;

    if (!nom) {
      return res.status(400).json({ error: "Le nom est requis" });
    }

    // Insère le nouveau client dans la base de données
    const { data, error } = await supabase
      .from("clients")
      .insert([
        {
          nom,
          email,
          address,
        },
      ])
      .select(); // Retourne les données insérées

    if (error) throw error;
    res.status(201).json(data[0]); // Renvoie le client créé avec statut 201
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ error: "Erreur lors de la création du client" });
  }
});

//delete client by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID du client manquant" });
  }
  try {
    const { data, error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);

    console.log("🧾 Données Supabase:", data);
    console.log("⚠️ Erreur Supabase:", error);
    if (error) {
      console.error("Erreur Supabase:", error.message); // Ajouté
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: "Client non trouvé" });
    } else if (data.length === 0) {
      return res.status(404).json({ error: "Aucun client trouvé avec cet ID" });
    }

    res.status(200).json({ message: "Client supprimé avec succès", data });
  } catch (err) {
    console.error("Erreur attrapée:", err.message); // Ajouté
    console.log(err.message);
    res.status(500).json({ error: "Erreur lors de la suppression du client" });
  }
});

export default router;
