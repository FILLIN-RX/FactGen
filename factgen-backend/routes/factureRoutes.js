// ===== routes/factureRoutes.js (CORRIGÉ) =====
import supabase from "../config/supabaseClient.js";
import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// ✅ AMÉLIORATION : Fonction pour obtenir le taux de change
async function getExchangeRate(fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return 1;
  
  try {
    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`
    );
    const data = await response.json();
    
    if (data.success && data.rates && data.rates[toCurrency]) {
      return data.rates[toCurrency];
    }
    
    throw new Error(`Taux de change non disponible pour ${fromCurrency} → ${toCurrency}`);
  } catch (error) {
    console.error("Erreur récupération taux:", error);
    throw error;
  }
}

// Validation pour POST (création)
const factureValidationRules = [
  body("client_id").isUUID().withMessage("Client ID doit être un UUID valide"),
  body("client_data.nom").notEmpty().withMessage("Le nom du client est requis"),
  body("client_data.email").isEmail().withMessage("Email client invalide"),
  body("produits")
    .isArray({ min: 1 })
    .withMessage("Au moins un produit est requis"),
  body("produits.*.nom").notEmpty().withMessage("Le nom du produit est requis"),
  body("produits.*.quantite")
    .isInt({ min: 1 })
    .withMessage("La quantité doit être un entier supérieur ou égal à 1"),
  body("produits.*.prix")
    .isFloat({ min: 0 })
    .withMessage("Le prix doit être un nombre positif"),
  body("montant_total")
    .isFloat({ min: 0 })
    .withMessage("Montant total invalide"),
  // ✅ NOUVEAU : Validation de la devise
  body("devise")
    .optional()
    .isIn(['XOF', 'EUR', 'USD', 'GBP', 'CAD'])
    .withMessage("Devise non supportée")
];

// Récupère toutes les factures de l'utilisateur connecté
router.get("/", authenticateUser, async (req, res) => {
  const user_id = req.user.id;
  console.log("✅ REQUÊTE /factures autorisée");

  try {
    const { data, error } = await req.supabase
      .from("facture")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    console.log("📦 Résultat Supabase:", data);
    
    if (error) {
      console.error("Erreur Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Erreur dans GET /factures:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Crée une nouvelle facture
router.post(
  "/",
  authenticateUser,
  factureValidationRules,
  validateRequest,
  async (req, res) => {
    const {
      client_id,
      client_data,
      produits,
      reduction,
      suplement,
      montant_total,
      numero,
      date_emission,
      date_echeance,
      template,
      statut,
      devise = 'XOF'  // ✅ CORRECTION : XOF par défaut
    } = req.body;

    console.log("Données reçues:", req.body);
    console.log("✅ REQUÊTE POST /factures autorisée");

    try {
      // ✅ AMÉLIORATION : Calcul du montant en XOF et taux de change
      let taux_change = 1;
      let montant_xof = montant_total;

      if (devise !== "XOF") {
        try {
          taux_change = await getExchangeRate(devise, "XOF");
          montant_xof = montant_total * taux_change;
          
          console.log(`💱 Conversion ${devise} → XOF:`, {
            montant_original: montant_total,
            taux: taux_change,
            montant_xof
          });
        } catch (exchangeError) {
          console.error("Erreur taux de change:", exchangeError);
          return res.status(500).json({ 
            error: "Impossible de récupérer le taux de change" 
          });
        }
      }

      // ✅ AMÉLIORATION : Validation des données converties
      if (!montant_xof || isNaN(montant_xof) || montant_xof <= 0) {
        return res.status(400).json({ 
          error: "Montant converti invalide" 
        });
      }

      const { data, error } = await req.supabase
        .from("facture")
        .insert([
          {
            client_id,
            client_data,
            produits,
            reduction,
            suplement,
            montant_total,
            numero,
            date_emission,
            date_echeance,
            template,
            statut: statut || 'en_attente',
            user_id: req.user.id,
            created_at: new Date().toISOString(),
            devise,              // ✅ Devise originale
            taux_change,         // ✅ Taux de change appliqué
            montant_xof: Math.round(montant_xof)  // ✅ Montant converti en XOF
          },
        ])
        .select();

      if (error) {
        console.error("Erreur création facture:", error);
        return res.status(500).json({ error: error.message });
      }

      if (!data || data.length === 0) {
        return res.status(500).json({
          error: "Erreur lors de la création de la facture (aucune donnée retournée)",
        });
      }

      console.log("✅ Facture créée avec succès:", data[0]);
      res.status(201).json(data[0]);
    } catch (err) {
      console.error("Erreur dans POST /factures:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);

// Met à jour une facture par son ID
router.put(
  "/:id",
  authenticateUser,
  factureValidationRules,
  validateRequest,
  async (req, res) => {
    const { id } = req.params;
    const {
      client_id,
      client_data,
      produits,
      reduction,
      suplement,
      montant_total,
      numero,
      date_emission,
      date_echeance,
      template,
      statut,
      devise = 'XOF'  // ✅ CORRECTION
    } = req.body;

    const user_id = req.user.id;

    if (!id) {
      return res.status(400).json({ error: "ID de la facture manquant" });
    }

    try {
      // ✅ AMÉLIORATION : Recalcul du montant en XOF si nécessaire
      let taux_change = 1;
      let montant_xof = montant_total;

      if (devise !== "XOF") {
        try {
          taux_change = await getExchangeRate(devise, "XOF");
          montant_xof = montant_total * taux_change;
        } catch (exchangeError) {
          return res.status(500).json({ 
            error: "Impossible de récupérer le taux de change" 
          });
        }
      }

      const { data, error } = await req.supabase
        .from("facture")
        .update({
          client_id,
          client_data,
          produits,
          reduction,
          suplement,
          montant_total,
          numero,
          date_emission,
          date_echeance,
          template,
          statut,
          devise,              // ✅ Mise à jour de la devise
          taux_change,         // ✅ Mise à jour du taux
          montant_xof: Math.round(montant_xof)  // ✅ Mise à jour du montant XOF
        })
        .eq("id", id)
        .eq("user_id", user_id)
        .select();

      if (error) {
        console.error("Erreur mise à jour facture:", error);
        return res.status(500).json({ error: error.message });
      }

      if (!data || data.length === 0) {
        return res.status(404).json({ error: "Facture non trouvée" });
      }

      res.json({
        message: "Facture mise à jour avec succès",
        facture: data[0],
      });
    } catch (err) {
      console.error("Erreur dans PUT /factures:", err);
      res.status(500).json({ error: "Erreur lors de la mise à jour de la facture" });
    }
  }
);

// DELETE /api/factures/:id
router.delete("/:id", authenticateUser, async (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;

  try {
    const { data, error } = await req.supabase
      .from("facture")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id)
      .select();

    if (error) {
      console.error("Erreur Supabase:", error.message);
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Facture non trouvée ou non autorisée" });
    }

    res.status(200).json({ 
      message: "Facture supprimée avec succès", 
      data: data[0] 
    });
  } catch (err) {
    console.error("Erreur dans DELETE /factures:", err);
    res.status(500).json({ error: "Erreur lors de la suppression de la facture" });
  }
});

export default router;