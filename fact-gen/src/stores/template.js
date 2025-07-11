// /src/stores/template.js
import { defineStore } from 'pinia'

// Importation des composants Vue des templates
import FactureClassique from '@/components/templates/FactureClassique.vue'
import FactureModerne from '@/components/templates/FactureModerne.vue'
import FactureMinimaliste from '@/components/templates/FactureMinimaliste.vue'

export const useTemplateStore = defineStore('template', {
  state: () => ({
    templates: [
      {
        id: 'classique',
        nom: 'Classique',
        description: 'Un modèle simple, clair et professionnel.',
        previewUrl: '/templates/classique.png',
        component: FactureClassique
      },
      {
        id: 'moderne',
        nom: 'Moderne',
        description: 'Design épuré, parfait pour les startups.',
        previewUrl: '/templates/moderne.png',
        component: FactureModerne
      },
      {
        id: 'minimaliste',
        nom: 'Minimaliste',
        description: 'Style compact, parfait pour mobile et impression rapide.',
        previewUrl: '/templates/minimaliste.png',
        component: FactureMinimaliste
      }
    ]
  }),

  getters: {
    getTemplateById: (state) => (id) => {
      return state.templates.find((tpl) => tpl.id === id) || state.templates[0]
    },

    getComponentById: (state) => (id) => {
      const found = state.templates.find((tpl) => tpl.id === id)
      return found ? found.component : state.templates[0].component
    }
  }
})
