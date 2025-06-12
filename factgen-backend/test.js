import express from 'express';
import dotenv from 'dotenv';
import supabase from './config/supabaseClient.js';
dotenv.config();

async function testConnection() {
  const { data, error } = await supabase.from("clients").select("*").limit(1);
  if (error) console.error("❌ Supabase error:", error.message);
  else console.log("✅ Connexion réussie :", data);
}

testConnection();
