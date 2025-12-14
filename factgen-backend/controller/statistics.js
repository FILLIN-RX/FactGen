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

    const uneSemaineEnArriere = new Date();
    uneSemaineEnArriere.setDate(uneSemaineEnArriere.getDate() - 7);

    // --- CLIENTS ACTUELS ---
    const { count: totalClients, error: clientsError } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (clientsError) throw clientsError;

    // --- CLIENTS semaine dernière ---
    const { count: totalClientsSemaineDerniere, error: clientsLastWeekError } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id)
      .lt("created_at", uneSemaineEnArriere.toISOString());

    if (clientsLastWeekError) throw clientsLastWeekError;

    // --- FACTURES ACTUELLES ---
    const { count: totalFactures, error: facturesError } = await supabase
      .from("facture")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (facturesError) throw facturesError;

    // --- FACTURES semaine dernière ---
    const { count: totalFacturesSemaineDerniere, error: facturesLastWeekError } = await supabase
      .from("facture")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id)
      .lt("created_at", uneSemaineEnArriere.toISOString());

    if (facturesLastWeekError) throw facturesLastWeekError;

    // --- REVENUS actuels ---
    const { data: revenusData, error: revenusError } = await supabase
      .from("facture")
      .select("montant_total, created_at")
      .eq("user_id", user_id);

    if (revenusError) throw revenusError;

    let totalRevenu = 0;
    let totalRevenuSemaineDerniere = 0;

    revenusData.forEach(({ montant_total, created_at }) => {
      const montant = parseFloat(montant_total) || 0;
      totalRevenu += montant;
      if (new Date(created_at) < uneSemaineEnArriere) {
        totalRevenuSemaineDerniere += montant;
      }
    });

    // --- RÉDUCTIONS ---
    const { data: reductionsData, error: reductionsError } = await supabase
      .from("facture")
      .select("reduction")
      .eq("user_id", user_id)
      .not("reduction", "is", null);

    const totalReductions = (reductionsData || []).reduce((sum, facture) => {
      if (facture.reduction && typeof facture.reduction === 'object') {
        return sum + (parseFloat(facture.reduction.valeurCalculee) || 0);
      }
      return sum;
    }, 0);

    // --- PROSPECTS (pour taux de conversion) ---
    const { count: totalProspects, error: prospectsError } = await supabase
      .from("prospects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (prospectsError) throw prospectsError;

    // ✅ Envoi final
    const response = {
      totalClients,
      totalClientsSemaineDerniere,
      totalFactures,
      totalFacturesSemaineDerniere,
      totalRevenu: Math.round(totalRevenu * 100) / 100,
      totalRevenuSemaineDerniere: Math.round(totalRevenuSemaineDerniere * 100) / 100,
      totalReductions: Math.round(totalReductions * 100) / 100,
      totalProspects,
      lastUpdated: new Date().toISOString()
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
