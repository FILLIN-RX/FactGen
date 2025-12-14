import express from "express";
import  {authenticateUser}  from "../middleware/auth.js";

const router = express.Router();

// Récupérer les informations de l'entreprise
router.get("/", authenticateUser, async (req, res) => {
  try {
    const supabase = req.supabase;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout Supabase")), 10000)
    );
    const fetchPromise = supabase
      .from("entreprises")
      .select("*")
      .eq("user_id", req.user.id)
      .single(); // Utiliser single() car on attend une seule entreprise par utilisateur

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

    if (error) {
      if (error.code === 'PGRST116') {
        // Aucune entreprise trouvée, retourner un objet vide
        return res.json(null);
      }
      throw error;
    }

    res.json(data);
  } catch (e) {
    console.error('Erreur dans GET /info:', e);
    res.status(500).json({ 
      error: 'Erreur serveur',
      details: e.message 
    });
  }
});

// Créer ou mettre à jour les informations de l'entreprise
router.post("/", authenticateUser, async (req, res) => {
  const { nom, email, adresse, telephone, logo, siret } = req.body;
  const user_id = req.user.id;
  
  try {
    if (!nom) {
      return res.status(400).json({ error: "Le nom de l'entreprise est requis" });
    }

    // Vérifier si l'entreprise existe déjà
    const { data: existingData, error: checkError } = await req.supabase
      .from("entreprises")
      .select("id")
      .eq("user_id", user_id)
      .single();

    let result;
    
    if (existingData) {
      // Mettre à jour l'entreprise existante
      const { data, error } = await req.supabase
        .from("entreprises")
        .update({ 
          nom, 
          email, 
          adresse, 
          telephone, 
          logo, 
          siret,
          updated_at: new Date().toISOString()
        })
        .eq("user_id", user_id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Créer une nouvelle entreprise
      const { data, error } = await req.supabase
        .from("entreprises")
        .insert([{ nom, email, adresse, telephone, logo, siret, user_id }])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur dans POST /info:", error);
    res.status(500).json({
      error: "Erreur lors de l'enregistrement des informations",
      details: error.message,
    });
  }
});

// Mettre à jour les informations de l'entreprise par PUT
router.put("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { nom, email, adresse, telephone, logo, siret } = req.body;
  const user_id = req.user.id;

  if (!id) {
    return res.status(400).json({ error: "ID de l'entreprise manquant" });
  }

  try {
    const { data, error } = await req.supabase
      .from("entreprises")
      .update({ 
        nom, 
        email, 
        adresse, 
        telephone, 
        logo, 
        siret,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .eq("user_id", user_id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: "Entreprise non trouvée" });
    }

    res.json({ 
      message: "Informations de l'entreprise mises à jour avec succès", 
      entreprise: data 
    });

  } catch (err) {
    console.error("Erreur dans PUT /info:", err);
    res.status(500).json({ 
      error: "Erreur lors de la mise à jour des informations" 
    });
  }
});

export default router;