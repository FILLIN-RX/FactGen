// composables/useTemplateSelection.js
import { ref,readonly, computed,defineAsyncComponent , watch } from 'vue'
import { useTemplateStore } from '@/stores/template'

// État global réactif
const selectedTemplateId = ref('moderne') // Template par défaut
const isTemplateDialogOpen = ref(false)

export function useTemplateSelection() {
  const templateStore = useTemplateStore()

  // Template sélectionné calculé
  const selectedTemplate = computed(() => {
    return templateStore.templates.find(t => t.id === selectedTemplateId.value) || templateStore.templates[0]
  })

  // Composant du template sélectionné
  const selectedTemplateComponent = computed(() => {
  const templateComponents = {
    moderne: defineAsyncComponent(() => import('@/components/templates/FactureModerne.vue')),
    minimaliste: defineAsyncComponent(() => import('@/components/templates/FactureMinimaliste.vue')),
    classique: defineAsyncComponent(() => import('@/components/templates/FactureClassique.vue')),
  }
  return templateComponents[selectedTemplateId.value] || templateComponents.moderne
})


  // Actions
  const setTemplate = (templateId) => {
    if (templateStore.templates.find(t => t.id === templateId)) {
      selectedTemplateId.value = templateId
      localStorage.setItem('selected-template', templateId)
    }
  }

  const openTemplateDialog = () => {
    isTemplateDialogOpen.value = true
  }

  const closeTemplateDialog = () => {
    isTemplateDialogOpen.value = false
  }

  const selectAndCloseDialog = (templateId) => {
    setTemplate(templateId)
    closeTemplateDialog()
  }

  // Initialisation depuis localStorage
  const initializeTemplate = () => {
    const saved = localStorage.getItem('selected-template')
    if (saved && templateStore.templates.find(t => t.id === saved)) {
      selectedTemplateId.value = saved
    }
  }

  // Sauvegarder automatiquement les changements
  watch(selectedTemplateId, (newValue) => {
    localStorage.setItem('selected-template', newValue)
  })

  return {
    // État
    selectedTemplateId: readonly(selectedTemplateId),
    selectedTemplate,
    selectedTemplateComponent,
    isTemplateDialogOpen: readonly(isTemplateDialogOpen),
    
    // Actions
    setTemplate,
    openTemplateDialog,
    closeTemplateDialog,
    selectAndCloseDialog,
    initializeTemplate,
    
    // Getters utilitaires
    getTemplateById: (id) => templateStore.templates.find(t => t.id === id),
    getAllTemplates: computed(() => templateStore.templates)
  }
}