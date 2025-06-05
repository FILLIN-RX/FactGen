// routes/factures.js
import express from 'express';
import supabase from '../config/superbaseclient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { client_id, lignes } = req.body;

  // 1. Créer la facture
  const { data: facture, error: factureError } = await supabase
    .from('factures')
    .insert({ client_id })
    .select()
    .single();

  if (factureError) {
    return res.status(500).json({ error: factureError.message });
  }

  // 2. Créer les lignes de facture
  const lignesData = lignes.map(ligne => ({
    facture_id: facture.id,
    produit_id: ligne.produit_id,
    quantite: ligne.quantity,
    prix_unitaire: ligne.price,
  }));

  const { error: lignesError } = await supabase
    .from('lignes_facture')
    .insert(lignesData);

  if (lignesError) {
    return res.status(500).json({ error: lignesError.message });
  }

  res.status(201).json({ facture });
});

export default router;
