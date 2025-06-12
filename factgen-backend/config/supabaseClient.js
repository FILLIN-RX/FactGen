// config/supabaseClient.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config() // ⚠️ À mettre avant toute lecture des variables

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL ou SUPABASE_KEY manquant dans le fichier .env")
}
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase