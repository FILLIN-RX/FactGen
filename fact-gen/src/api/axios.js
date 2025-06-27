// src/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // ← adresse de ton serveur Express
  timeout: 5000,
})
 API.interceptors.request.use((config)=>{
  const token = localStorage.getItem("supabase_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
 });
export default API;
