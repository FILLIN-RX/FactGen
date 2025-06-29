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


export const getStatsMensuelles = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log("User ID dans getStatsMensuelles:", user_id);

    if (!user_id) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    console.log("📅 Récupération des revenus mensuels pour:", user_id);

    // ⚠️ Regrouper les revenus par mois
    const { data, error } = await supabase
      .from("facture")
      .select("montant_total, created_at")
      .eq("user_id", user_id);

    if (error) {
      console.error("❌ Erreur Supabase:", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des revenus" });
    }

    // 📊 Regrouper les revenus par mois (année-mois)
    const revenusParMois = {};

    data.forEach((facture) => {
      const date = new Date(facture.created_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!revenusParMois[key]) revenusParMois[key] = 0;
      revenusParMois[key] += parseFloat(facture.montant_total) || 0;
    });

    // ✅ Transformer en tableau [{ mois: "2024-01", total_revenu: 10000 }]
    const revenusArray = Object.entries(revenusParMois).map(([mois, total]) => ({
      mois,
      total_revenu: Math.round(total * 100) / 100,
    }));
    
    // 🟢 Réponse envoyée
    res.json({ revenusParMois: revenusArray });
    console.log("mois et revenu",revenusArray)
  } catch (err) {
    console.error("❌ Erreur serveur:", err);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
};
export const getStatsJournalières = async (req, res) => {
  try {
    const user_id = req.userId;
    if (!user_id) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    console.log("📅 Récupération des revenus journaliers pour:", user_id);

    // Récupérer toutes les factures
    const { data, error } = await supabase
      .from("facture")
      .select("montant_total, created_at")
      .eq("user_id", user_id);

    if (error) {
      console.error("❌ Erreur Supabase:", error);
      return res.status(500).json({ error: "Erreur lors de la récupération des revenus" });
    }

    // Regrouper les revenus par jour (année-mois-jour)
    const revenusParJour = {};

    data.forEach((facture) => {
      const date = new Date(facture.created_at);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      if (!revenusParJour[key]) revenusParJour[key] = 0;
      revenusParJour[key] += parseFloat(facture.montant_total) || 0;
    });

    // Transformer en tableau [{ jour: "2025-06-28", total_revenu: 1234.56 }]
    const revenusArray = Object.entries(revenusParJour).map(([jour, total]) => ({
      jour,
      total_revenu: Math.round(total * 100) / 100,
    }));

    // Envoyer la réponse
    res.json({ revenusParJour: revenusArray });
    console.log("Revenus par jour:", revenusArray);
  } catch (err) {
    console.error("❌ Erreur serveur:", err);
    res.status(500).json({ error: "Erreur serveur interne" });
  }
};
