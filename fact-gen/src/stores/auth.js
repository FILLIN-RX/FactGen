// ==================== AUTH STORE ====================
// src/stores/auth.js
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    userId: (state) => state.user?.id,
    userEmail: (state) => state.user?.email,
    accessToken: (state) => state.session?.access_token,
  },

  actions: {
    setUser(userData, sessionData = null) {
      this.user = userData;
      this.session = sessionData;
      this.isAuthenticated = !!userData;
      this.error = null;
      
      // Stocker le token pour les requêtes API
      if (sessionData?.access_token) {
        localStorage.setItem("supabase_token", sessionData.access_token);
      }
    },

    clearAuth() {
      this.user = null;
      this.session = null;
      this.isAuthenticated = false;
      localStorage.removeItem("supabase_token");
    },

    async signUp({ email, password }) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        this.setUser(data.user, data.session);
        return data.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async signIn({ email, password }) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        if (!data.session) {
          throw new Error("Aucune session retournée par Supabase");
        }
        
        this.setUser(data.user, data.session);
        return data.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async signInWithGoogle() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: "https://fact-gen.vercel.app/real",
          },
        });
        if (error) throw error;
        return data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async signOut() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.clearAuth();
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async initialize() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (data?.session?.user) {
          this.setUser(data.session.user, data.session);
        } else {
          this.clearAuth();
        }
      } catch (error) {
        this.error = error.message;
        this.clearAuth();
      } finally {
        this.isLoading = false;
      }
    },

    // Écouter les changements d'état d'authentification
    setupAuthListener() {
      supabase.auth.onAuthStateChange((event, session) => {
        switch (event) {
          case "SIGNED_IN":
          case "TOKEN_REFRESHED":
            if (session?.user) {
              this.setUser(session.user, session);
            }
            break;
          case "SIGNED_OUT":
            this.clearAuth();
            break;
        }
      });
    },
  },
});