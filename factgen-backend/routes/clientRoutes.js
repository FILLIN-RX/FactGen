import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import  supabase  from '../config/superbaseclient.js';

const router = express.Router();

// Récupérer tous les clients
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', req.user.id)
      .order('nom', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des clients' });
  }
});

// Créer un nouveau client
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { nom, email, adresse, telephone } = req.body;

    if (!nom) {
      return res.status(400).json({ error: 'Le nom du client est requis' });
    }

    const { data, error } = await supabase
      .from('clients')
      .insert([{
        nom,
        email,
        adresse,
        telephone,
        user_id: req.user.id
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur lors de la création du client' });
  }
});

// Autres routes (mettre à jour, supprimer, etc.)
// ...

export default router;