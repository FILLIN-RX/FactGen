// routes/factureRoutes.js
import supabase from "../config/supabaseClient.js";
import express from "express";
const router = express.Router(); // Crée un routeur Express

// Récupère toutes les factures de l'utilisateur connecté
router.get("/", async (req, res) => {
  console.log("✅ REQUÊTE /factures autorisée");

  // Requête Supabase pour récupérer les factures
  const { data, error } = await supabase
    .from("facture") // Table facture
    .select("*"); // Sélectionne toutes les colonnes

  console.log("📦 Résultat Supabase:", data);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data); // Renvoie les factures
  console.log(data);
});

// Crée une nouvelle facture
router.post("/", async (req, res) => {
  const { client_id, montant_total } = req.body;

  // Insère la nouvelle facture dans la base de données
  const { data, error } = await supabase
    .from("facture")
    .insert([
      {
        client_id,
        montant_total,
      },
    ])
    .select(); // Retourne les données insérées

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]); // Renvoie la facture créée avec statut 201
});

// DELETE /api/factures/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { data, error } = await supabase
      .from("facture")
      .delete()
      .eq("id", id)
      .select(); // 🔥 AJOUTER CECI

    console.log("🧾 Données Supabase:", data);
    console.log("⚠️ Erreur Supabase:", error);
    if (error) {
      console.error("Erreur Supabase:", error.message); // Ajouté
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: "facture non trouvé" });
    } else if (data.length === 0) {
      return res.status(404).json({ error: "Aucun facture trouvé avec cet ID" });
    }

    res.status(200).json({ message: "facture supprimé avec succès", data });
  } catch (err) {
    console.error("Erreur attrapée:", err.message); // Ajouté
    console.log(err.message);
    res.status(500).json({ error: "Erreur lors de la suppression de la facture" });
  }
});

export default router;
