import { defineStore } from "pinia";
import { markRaw } from "vue";

// Importation des composants Vue des templates
import FactureClassique from "../components/templates/FactureClassique.vue";
import FactureModerne from "../components/templates/FactureModerne.vue";
import FactureMinimaliste from "../components/templates/FactureMinimaliste.vue";

export const useTemplateStore = defineStore("template", {
  state: () => ({
    templates: [
      {
        id: "classique",
        nom: "Classique",
        description: "Un modèle simple, clair et professionnel avec une structure traditionnelle bien organisée.",
        previewUrl: "/images/template-classique.jpg", // Assurez-vous que le chemin est correct
        component: markRaw(FactureClassique),
      },
      {
        id: "moderne",
        nom: "Moderne",
        description: "Design épuré avec des éléments graphiques contemporains, parfait pour les startups innovantes.",
        previewUrl: "/images/template-moderne.jpg",
        component: markRaw(FactureModerne),
      },
      {
        id: "minimaliste",
        nom: "Minimaliste",
        description: "Style compact et ultra-lisible, optimisé pour l'affichage mobile et l'impression rapide.",
        previewUrl: "/images/template-minimaliste.jpg",
        component: markRaw(FactureMinimaliste),
      },
      // Vous pouvez ajouter plus de templates ici
    ],
  }),

  getters: {
    getTemplateById: (state) => (id) => {
      return state.templates.find((tpl) => tpl.id === id) || state.templates[0];
    },
    getComponentById: (state) => (id) => {
      const found = state.templates.find((tpl) => tpl.id === id);
      return found ? found.component : state.templates[0].component;
    },
  },
});