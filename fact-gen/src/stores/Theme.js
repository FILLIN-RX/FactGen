// stores/theme.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: localStorage.getItem('theme') === 'dark'
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
        if (this.darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
      this.applyTheme()
    },
    applyTheme() {
      const root = document.documentElement
      if (this.darkMode) {
        root.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        root.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    },
    initTheme() {
      this.applyTheme()
    }
  }
})
