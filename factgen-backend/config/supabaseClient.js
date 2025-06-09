// supabaseClient.js
import 'dotenv/config'; // Charge automatiquement les variables d'environnement
import { createClient } from '@supabase/supabase-js'; // Client Supabase

// Crée et exporte une instance du client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL, // URL de votre projet Supabase
  process.env.SUPABASE_ANON_KEY // Clé publique (anon key) de Supabase
);

export default supabase;