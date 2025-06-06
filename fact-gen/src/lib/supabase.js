// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Récupère ces valeurs depuis tes variables d'environnement (ou un .env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Création du client Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
