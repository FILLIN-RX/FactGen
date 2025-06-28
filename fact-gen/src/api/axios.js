// api/axios.js
import axios from "axios";
import { supabase } from "../lib/supabase";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

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
    console.log("🔐 Headers envoyés :", config.headers);
    console.log("➡️ Requête vers :", config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
