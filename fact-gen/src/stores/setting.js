// stores/settings.js
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    currency: 'XOF'  // Synchronisé avec le reste du système
  }),
  actions: {
    setCurrency(newCurrency) {
      this.currency = newCurrency
    }
  }
})