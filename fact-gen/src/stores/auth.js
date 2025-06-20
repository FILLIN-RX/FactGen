import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";
import { ref } from "vue";
import { data } from "jquery";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  //
  //Etat: utilisateur courent
  function setUser(userData) {
    user.value = userData;
    isAuthenticated.value = !!userData;

 
  }
  //utilisateur courent
  async function getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(
        "Erreur lors de la récupération de l’utilisateur :",
        error.message
      );
      return null;
    }
    setUser(data.user);
    return data.user;
  }

  //peut etre null si non authentifie
  //Action: incription(email/password)
  async function signUp({ email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Sign up error:", error);
      throw error;
    }

    setUser(data.user);

    //supabase envoi l'email de confirmation
    return data.user;
  }

  //action:connexion
  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      throw error;
    }

    setUser(data.user);
    console.log("User logged in:", data.user);
    if (data.session) {
  localStorage.setItem('supabase_token', data.session.access_token);
}

    return data.user;
  }
  // 4. Action : déconnexion
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error);
    throw error;
  }
  setUser(null);  // Correction ici
  console.log("User logged out");
}


  //Purpose: Runs when the app starts to check for an active session.

  //supabase.auth.getSession(): Checks for an existing Supabase session.

  //If a session exists: Updates the store with the user.
  async function initialize() {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUser(data.session.user);
    }else {
      setUser(null);
    }
  }
//signe up with google
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin // or your custom redirect URL
    }
  })
  
  if (error) throw error
  return data
}
 return {
  user,
  isAuthenticated,
  getCurrentUser,
  setUser,
  signUp,
  signIn,
  signOut,
  initialize,
  signInWithGoogle
};
});
