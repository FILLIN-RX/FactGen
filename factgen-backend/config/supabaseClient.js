// config/supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

export const supabaseUrl = process.env.SUPABASE_URL;
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL ou SUPABASE_ANON_KEY manquant dans le fichier .env")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
if (!supabase) {
  console.log("supabase connecter")
}else{
  console.log("supabase  connecter")
}
export default supabase;
