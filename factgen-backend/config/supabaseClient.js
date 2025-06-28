import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    fetch: (url, options) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      
      return fetch(url, {
        ...options,
        signal: controller.signal
      }).finally(() => clearTimeout(timeout));
    }
  }
};

export const supabaseUrl = process.env.SUPABASE_URL;
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Configuration Supabase manquante dans .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

// Fonction de test de connexion
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .limit(1);
    
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
// À la fin du fichier supabaseClient.js
export default supabase;