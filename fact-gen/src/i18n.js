// src/i18n.js
import { createI18n } from 'vue-i18n'

import fr from './locales/fr.json'
import en from './locales/en.json'

export const i18n = createI18n({
  locale: 'fr', // langue par défaut
  fallbackLocale: 'en',
  legacy: false, // pour composition API
  messages: {
    fr,
    en
  }
})
