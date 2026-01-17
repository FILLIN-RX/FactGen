import axios from "axios";
import { supabase } from "@/lib/supabase"; // Corrected path to lib/supabase ? Previous was "../lib/supabase". src/lib/supabase.js exists?
// Layout check: src/shared/services/axios.js -> ../../../lib/supabase?
// Original: src/api/axios.js -> ../lib/supabase
// If I move to src/shared/services/axios.js, then ../../lib/supabase would be src/lib/supabase
// I should use @/lib/supabase to be safe.

const API = axios.create({
  baseURL: "https://factgen.onrender.com/api",
});
// http://localhost:4000/api
//
API.interceptors.request.use(
  async (config) => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Erreur récupération token:", error.message);
      return config;
    }

    const session = data?.session;
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    } else {
      console.warn("Token Supabase manquant.");
    }
 // 🐛 Debug : voir les headers envoyés à l’API
   
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
