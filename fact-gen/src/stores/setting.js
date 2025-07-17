// stores/settings.js
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    currency: 'XOF'  // Utiliser directement les codes ISO
  }),
  actions: {
    setCurrency(newCurrency) {
      this.currency = newCurrency
    }
  }
})