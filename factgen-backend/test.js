import express from 'express';
import dotenv from 'dotenv';
import supabase from './config/supabaseClient.js';
dotenv.config();


app.get('/test-error', (req, res, next) => {
  const err = new Error("Erreur test middleware !");
  next(err);  // envoie l'erreur au middleware de gestion d'erreur
});


export default test
