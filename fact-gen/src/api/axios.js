// api/axios.js
import axios from 'axios';
import { supabase } from '../lib/supabase';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Interceptor to attach Supabase token (modern way)
API.interceptors.request.use(async (config) => {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Token fetch error:", error.message);
    return config;
  }

  const session = data?.session;
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
