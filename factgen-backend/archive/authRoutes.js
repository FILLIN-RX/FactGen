/*import express from 'express';
import  supabase  from '../config/superbaseclient.js';

const router = express.Router();

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Erreur de connexion:', err);
    res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }
});

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { email, password, nom } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nom,
          role: 'user'
        }
      }
    });

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('Erreur d\'inscription:', err);
    res.status(400).json({ error: err.message });
  }
});

// Récupérer le profil utilisateur
router.get('/me', authenticateUser, async (req, res) => {
  res.json(req.user);
});

export default router;
*/