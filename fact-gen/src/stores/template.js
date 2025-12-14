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
        previewUrl: "/images/template-classique.jpeg",
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
      // Ajoute d'autres modèles ici si nécessaire
    ],
    currentTemplate: "moderne", // valeur par défaut
  }),

  getters: {
    /**
     * Retourne l'objet template à partir de son ID
     * @param {string} id - ID du template
     * @returns {object|null}
     */
    getTemplateById: (state) => (id) => {
      return state.templates.find((tpl) => tpl.id === id) || null;
    },

    /**
     * Retourne directement le composant Vue du template
     * @param {string} id - ID du template
     * @returns {object|null}
     */
    getComponentById: (state) => (id) => {
      const tpl = state.templates.find((tpl) => tpl.id === id);
      return tpl ? tpl.component : null;
    },
  },

  actions: {
    /**
     * Définit le template courant (si valide)
     * @param {string} id - ID du template
     */
    setCurrentTemplate(id) {
      const exists = this.templates.find((tpl) => tpl.id === id);
      if (exists) {
        this.currentTemplate = id;
      } else {
        console.warn(`Template "${id}" introuvable, aucun changement appliqué.`);
      }
    },
  },
});
