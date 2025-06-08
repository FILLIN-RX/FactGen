// routes/factures.js
import express from 'express';
import supabase from '../config/superbaseclient.js';

const express = require('express');
const router = express.Router();
const { supabase } = require('../supabase/client');
const authenticateUser = require('../middleware/auth');

// Lire toutes les factures de l'utilisateur connecté
router.get('/', authenticateUser, async (req, res) => {
  const { data, error } = await supabase
    .from('factures')
    .select('*')
    .eq('user_id', req.user.id)
    .order('date', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Créer une facture
router.post('/', authenticateUser, async (req, res) => {
  const { client_id, montant, date } = req.body;

  const { data, error } = await supabase.from('factures').insert([{
    client_id,
    montant,
    date,
    user_id: req.user.id
  }]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

module.exports = router;
