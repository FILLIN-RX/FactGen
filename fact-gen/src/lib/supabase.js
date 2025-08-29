// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Récupère ces valeurs depuis tes variables d'environnement (ou un .env)
const SUPABASE_URL = import.meta.env.VITE_SUPAURL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPAKEY

// Création du client Supabase avec repli si non configuré
let supabase

if (typeof SUPABASE_URL === 'string' && SUPABASE_URL && typeof SUPABASE_ANON_KEY === 'string' && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
} else {
  // Empêche le crash en dev si les variables ne sont pas présentes
  console.warn('[Supabase] VITE_SUPAURL/VITE_SUPAKEY manquantes. Les fonctionnalités d\'auth sont désactivées.')
  const notConfigured = async () => ({ data: null, error: new Error('Supabase non configuré. Définissez VITE_SUPAURL et VITE_SUPAKEY.') })
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: notConfigured,
      signUp: notConfigured,
      signInWithOAuth: notConfigured,
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  }
}

export { supabase }
