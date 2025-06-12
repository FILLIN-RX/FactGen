import { supabase } from '../lib/supabase';

export async function fetchFactures() {
  try {
    console.log("🔍 Récupération de la session...");
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error("❌ Erreur session:", error);
      throw error;
    }

    if (!session) {
      console.log("⚠️ Aucune session active");
      throw new Error('Veuillez vous connecter');
    }

    console.log("🔐 Token:", session.access_token.substring(0, 10) + '...');
    console.log("🌐 Envoi requête API...");

    const response = await fetch('http://localhost:4000/api/factures', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Erreur API:", response.status, errorData);
      throw new Error(errorData.error || 'Erreur serveur');
    }

    return await response.json();
  } catch (error) {
    console.error("💥 Erreur fetchFactures:", error);
    throw error;
  }
}