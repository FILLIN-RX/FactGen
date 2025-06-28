// ===== 1. controller/statistics.js (CORRIGÉ) =====
import supabase from "../config/supabaseClient.js";
import { getRevenusParMois } from "../service/totalMois.js";

export const getStatistiques = async (req, res) => {
  try {
    const user_id = req.userId;
    if (!user_id) throw new Error("Utilisateur non authentifié");

    // 🔧 CORRECTION: Déclaration correcte des variables d'erreur
    const { count: totalClients, error: err1 } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (err1) throw err1;

    const { data: factures, error: err2 } = await supabase
      .from("facture")
      .select("montant_total, reduction")
      .eq("user_id", user_id);

    if (err2) throw err2;

    let totalRevenu = 0;
    let totalReductions = 0;

    for (const facture of factures) {
      totalRevenu += facture.montant_total || 0;

      const red = facture.reduction;
      if (red && red.valeurCalculee) {
        totalReductions += red.valeurCalculee;
      }
    }

    res.json({
      totalClients,
      totalFactures: factures.length,
      totalRevenu,
      totalReductions,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Erreur stats :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};