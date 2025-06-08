// middleware/auth.js
const { supabase } = require('../supabase/client');

async function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json({ error: 'Token invalide' });
  }

  req.user = data.user;
  next();
}

module.exports = authenticateUser;
