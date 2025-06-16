// controllers/statistiquesController.js
import  supabase  from '../config/supabaseClient.js';

export const getStatistiques = async (req, res) => {
  try {
    const { count: totalClients } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });

    const { data: facture, error } = await supabase
      .from('facture')
      .select('totalTTC, reduction');

    if (error) throw error;

    let totalRevenu = 0;
    let totalReductions = 0;

    for (const facture of factures) {
      totalRevenu += facture.totalTTC || 0;

      const red = facture.reduction;
      if (red && red.valeurCalculee) {
        totalReductions += red.valeurCalculee;
      }
    }

    res.json({
      totalClients,
      totalFactures: facture.length,
      totalRevenu,
      totalReductions
    });
  } catch (err) {
    console.error('Erreur stats :', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
