import { body, validationResult } from 'express-validator';

export const validateClient = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('email').optional().isEmail().withMessage('Email invalide'),
 
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];