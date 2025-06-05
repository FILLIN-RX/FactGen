import express from 'express';
import supabase from '../config/superbaseclient.js';

const router = express.Router();

// Récupérer tous les clients
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('clients').select('*');


  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Ajouter un client
router.post('/', async (req, res) => {
    const { nom, email, address } = req.body;
  
    // Vérification rapide
    if (!nom || !email) {
      return res.status(400).json({ error: 'Nom et email sont requis.' });
    }
  
    const { data, error } = await supabase.from('clients').insert([
      { nom, email, address }
    ]).select();
  
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]); // On retourne le nouveau client
  });
  

export default router;
