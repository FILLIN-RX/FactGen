// routes/factureRoutes.js
import supabase from "../config/supabaseClient.js";
import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { body, validationResult } from 'express-validator';

const router = express.Router(); // Crée un routeur Express
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Validation pour POST (création)
const factureValidationRules = [
  body("client_id")
    .isUUID()
    .withMessage("Client ID doit être un UUID valide"),
  body("client_data.nom")
    .notEmpty()
    .withMessage("Le nom du client est requis"),
  body("client_data.email")
    .isEmail()
    .withMessage("Email client invalide"),
  body("produits")
    .isArray({ min: 1 })
    .withMessage("Au moins un produit est requis"),
  body("produits.*.nom")
    .notEmpty()
    .withMessage("Le nom du produit est requis"),
  body("produits.*.quantite")
    .isInt({ min: 1 })
    .withMessage("La quantité doit être un entier supérieur ou égal à 1"),
  body("produits.*.prix")
    .isFloat({ min: 0 })
    .withMessage("Le prix doit être un nombre positif"),
  body("montant_total")
    .isFloat({ min: 0 })
    .withMessage("Montant total invalide"),
];
// Récupère toutes les factures de l'utilisateur connecté
router.get("/",authenticateUser, async (req, res) => {
  const user_id = req.user.id;
  
  console.log("✅ REQUÊTE /factures autorisée");

  // Requête Supabase pour récupérer les factures
  const { data, error } = await supabase
    .from("facture") // Table facture
    .select("*") // Sélectionne toutes les colonnes
    .eq("user_id",user_id)//filtre uniquement les facture de l'utilisateur
    .order("created_at",{ascending:false});

  console.log("📦 Résultat Supabase:", data);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data); // Renvoie les factures
  console.log(data);
});

// Crée une nouvelle facture
router.post("/",authenticateUser,factureValidationRules,validateRequest, async (req, res) => {
    
    
    const {
    client_id,
    client_data,
    produits,
    reduction,
    suplement,
    montant_total,
    numero
  } = req.body;
  const user_id = req.user.id;
   if (user_id !== req.user.id) {
    return res.status(403).json({ error: "Accès interdit : mauvais user_id" });
  }
  console.log("✅ REQUÊTE /factures autorisée");

  // Insère la nouvelle facture dans la base de données
  const { data, error } = await supabase
    .from("facture")
    .insert([{
      
      client_id,
      client_data,
      produits,
      reduction,
      suplement,
      montant_total,
      numero,
      user_id: req.user.id,
      created_at: new Date().toISOString()
    }])
    .select(); // Retourne les données insérées

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]); // Renvoie la facture créée avec statut 201
});
// Met à jour une facture par son ID
router.put("/:id",authenticateUser,factureValidationRules,validateRequest,[

], async (req, res) => {
  const { id } = req.params;
   const {
    client_id,
    client_data,
    produits,
    reduction,
    suplement,
    montant_total,
    numero
  } = req.body;

 const user_id = req.user.id;

  if (!id) {
    return res.status(400).json({ error: "ID de la facture manquant" });
  }

  try {
     const { data, error } = await supabase
    .from('facture')
    .update({
      client_id,
      client_data,
      produits,
      reduction,
      suplement,
      montant_total,
      numero
    })
    .eq('id', id)
    eq("user_id",user_id)
    .select();



    if (error) return res.status(500).json({error:error.message});

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Facture non trouvée" });
    }

    res.json({ message: "Facture mise à jour avec succès", facture: data[0] });
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ error: "Erreur lors de la mise à jour de la facture" });
  }
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
