<!-- components/templates/TemplateSelectorDialog.vue -->
<template>
  <div 
    v-if="isTemplateDialogOpen" 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    @click.self="closeTemplateDialog"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[80vh] overflow-hidden w-full mx-4">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800">Choisir un modèle</h2>
        <button 
          @click="closeTemplateDialog"
          class="text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>
      </div>
      
      <!-- Contenu -->
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="template in getAllTemplates"
            :key="template.id"
            class="group rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer"
            :class="{ 'ring-2 ring-blue-500 bg-blue-50': selectedTemplateId === template.id }"
            @click="selectAndCloseDialog(template.id)"
          >
            <div class="relative overflow-hidden">
              <img 
                :src="template.previewUrl" 
                :alt="template.nom" 
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div 
                v-if="selectedTemplateId === template.id"
                class="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            
            <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-gray-800">{{ template.nom }}</h3>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PRO</span>
              </div>
              <p class="text-gray-600 text-sm">{{ template.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
        <button
          @click="closeTemplateDialog"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Annuler
        </button>
        <button
          @click="closeTemplateDialog"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTemplateSelection } from '@/composables/useTemplateSelection'

const {
  selectedTemplateId,
  isTemplateDialogOpen,
  getAllTemplates,
  closeTemplateDialog,
  selectAndCloseDialog
} = useTemplateSelection()
</script>