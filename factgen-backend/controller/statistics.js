import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseServiceRoleKey } from "../config/supabaseClient.js";

// Créer une instance Supabase pour les requêtes
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export const getStatistiques = async (req, res) => {
  try {
    const user_id = req.userId;
    if (!user_id) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    console.log("🔍 Récupération des stats pour user_id:", user_id);

    // 1. Compter les clients
    const { count: totalClients, error: clientsError } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (clientsError) {
      console.error("Erreur clients:", clientsError);
      throw clientsError;
    }

    // 2. Compter les factures
    const { count: totalFactures, error: facturesCountError } = await supabase
      .from("facture")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (facturesCountError) {
      console.error("Erreur count factures:", facturesCountError);
      throw facturesCountError;
    }

    // 3. Calculer le total des revenus
    const { data: revenusData, error: revenusError } = await supabase
      .from("facture")
      .select("montant_total")
      .eq("user_id", user_id);

    if (revenusError) {
      console.error("Erreur revenus:", revenusError);
      throw revenusError;
    }

    // 4. Calculer le total des réductions
    const { data: reductionsData, error: reductionsError } = await supabase
      .from("facture")
      .select("reduction")
      .eq("user_id", user_id)
      .not("reduction", "is", null);

    if (reductionsError) {
      console.error("Erreur réductions:", reductionsError);
    }

    // Calculs côté JavaScript
    const totalRevenu = revenusData?.reduce((sum, facture) => {
      return sum + (parseFloat(facture.montant_total) || 0);
    }, 0) || 0;

    const totalReductions = reductionsData?.reduce((sum, facture) => {
      if (facture.reduction && typeof facture.reduction === 'object') {
        return sum + (parseFloat(facture.reduction.valeurCalculee) || 0);
      }
      return sum;
    }, 0) || 0;

    const response = {
      totalClients: totalClients || 0,
      totalFactures: totalFactures || 0,
      totalRevenu: Math.round(totalRevenu * 100) / 100, // Arrondir à 2 décimales
      totalReductions: Math.round(totalReductions * 100) / 100,
      lastUpdated: new Date().toISOString(),
    };

    console.log("✅ Statistiques calculées:", response);
    res.json(response);

  } catch (err) {
    console.error("❌ Erreur dans getStatistiques:", err);
    res.status(500).json({ 
      error: "Erreur serveur lors du calcul des statistiques",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};