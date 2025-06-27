import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";
import { ref, watch } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  function setUser(userData) {
    user.value = userData;
    isAuthenticated.value = !!userData;
  }

  // 🔐 SignUp
  async function signUp({ email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setUser(data.user);
    return data.user;
  }

  // 🔐 SignIn
 async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  
  // Stocker le token pour les requêtes API
  if (data.session) {
    localStorage.setItem("supabase_token", data.session.access_token);
    setUser(data.user);
    console.log("🔐 Token stocké:", data.session.access_token);
    return data.user;
  }
  throw new Error("Aucune session retournée par Supabase");
}

  // 🔄 Initialize (au démarrage de l'app)
  async function initialize() {
    const { data, error } = await supabase.auth.getSession();
    if (data?.session?.user) {
      setUser(data.session.user);
    } else {
      setUser(null);
    }
  }

  // 🔓 SignOut
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    localStorage.removeItem("supabase_token"); // nettoyage
  }

  // 🔁 Garde le token à jour
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      localStorage.setItem("supabase_token", session?.access_token);
    }
    if (event === "SIGNED_OUT") {
      localStorage.removeItem("supabase_token");
    }
  });

  // 🔐 Google
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  }

  return {
    user,
    isAuthenticated,
    setUser,
    getCurrentUser: initialize,
    signUp,
    signIn,
    signOut,
    initialize,
    signInWithGoogle,
  };
});
