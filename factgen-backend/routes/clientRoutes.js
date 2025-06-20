// routes/clientRoutes.js
import express from "express";
import supabase from "../config/supabaseClient.js";
import { authenticateUser } from "../middleware/auth.js";
const router = express.Router(); // Crée un routeur Express

// Récupère tous les clients de l'utilisateur connecté
router.get("/",authenticateUser, async (req, res) => {
  const user_id = req.user.id
  try {
    // Requête Supabase pour récupérer les clients
    const { data, error } = await supabase
      .from("clients") // Table clients
      .select("*")// Sélectionne toutes les colonnes
      .eq("user_id",user_id) // Filtre par user_id
      .order("created_at", { ascending: true }); // Trie par nom ascendant

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
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { nom, email, address, telephone } = req.body;

    if (!nom) {
      return res.status(400).json({ error: "Le nom est requis" });
    }

    const { data, error } = await supabase
      .from("clients")
      .insert([{
        nom,
        email,
        address,
        telephone,
        user_id: req.user.id // Assurez-vous que ce champ existe dans votre table
      }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ 
      error: "Erreur lors de la création du client",
      details: err.message 
    });
  }
});
//verifie si le client existe
router.post("/upsert",authenticateUser, async (req, res) => {
  const { nom, email, address } = req.body;
  const user_id = req.user.id

  if (!nom || !email || !address) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  try {
    const { data, error } = await supabase
      .from("clients")
      .upsert([{ user_id , nom, email, address }], { onConflict: ["email"] })
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});


//update client by id 


router.put("/:id",authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { nom, email, address } = req.body;
  const user_id =  req.user.id

  if (!id) {
    return res.status(400).json({ error: "ID du client manquant" });
  }

  try {
    // Mise à jour du client dans Supabase
    const { data, error } = await supabase
      .from("clients")
      .update({ nom, email, address })
      .eq("id", id)
      .eq("user_id",user_id)
      .select(); // pour voir les données mises à jour

    console.log("🧾 Données Supabase:", data);
    console.log("⚠️ Erreur Supabase:", error);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Client non trouvé" });
    }

    res.json({ message: "Client mis à jour avec succès", client: data[0] });
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour du client" });
  }
});

//delete client by id
router.delete("/:id",authenticateUser, async (req, res) => {
  const  id  = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID du client manquant" });
  }
  try {
    const { data, error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id)
      .select(); 

   
    if (error) {
      console.error("Erreur Supabase:", error.message); // Ajouté
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: "Client non trouvé" });
    } else if (data.length === 0) {
      return res.status(404).json({ error: "Aucun client trouvé dans la liste: liste vide" });
    }

    res.status(200).json({ message: "Client supprimé avec succès", client: data[0] });
  } catch (err) {
    console.error("Erreur attrapée:", err.message); // Ajouté
    console.log(err.message);
    res.status(500).json({ error: "Erreur lors de la suppression du client" });
  }
});

export default router;
