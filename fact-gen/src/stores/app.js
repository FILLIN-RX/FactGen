// stores/app.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(status) {
      console.log('🔄 setLoading appelé avec:', status); // Debug
      this.isLoading = status
      console.log('📊 État actuel isLoading:', this.isLoading); // Debug
    }
  },
  getters: {
    // Getter pour faciliter le debug
    getLoadingState: (state) => state.isLoading
  }
})