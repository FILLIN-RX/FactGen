import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";
import { ref } from "vue";
import { data } from "jquery";

export const useAuthStore = defineStore("auth", () => {
  //Etat: utilisateur courent


 async function getCurrentUser()   {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Erreur lors de la récupération de l’utilisateur :', error.message);
    return null;
  }
  return data.user;
}

 //peut etre null si non authentifie
  //Action: incription(email/password)
  async function signUp({ email, password }) {
    const { error, user: newUser } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
      console.log(error);
      
    }else{
        console.log(data)
    }
     console.log('registere');
    // Supabase envoie un email de confirmation si activé.
    return newUser;
  }

  //action:connexion
  async function signIn({ email, password }) {
    const { error, user: loggedUser } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    user.value = loggedUser;
    return loggedUser;
  
     console.log('logged in')
    
  }
  // 4. Action : déconnexion
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    user.value = null;
  }

  // 5. Écouteur de session : mise à jour de `user` automatiquement
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
    console.log('disconnected')
  });


  return{
    
    signIn,
    signUp,
    signOut,
  }
});
