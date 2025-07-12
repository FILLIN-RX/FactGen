<template>
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    <div
      v-for="tpl in templateStore.templates"
      :key="tpl.id"
      class="rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-md transition-all duration-200"
      :class="{ 'ring-2 ring-blue-500': modelValue === tpl.id }"
      @click="$emit('update:modelValue', tpl.id)"
    >
      <img :src="tpl.previewUrl" :alt="tpl.nom" class="w-full rounded-md mb-3 h-40 object-cover" />
      <h3 class="font-semibold text-lg mb-1">{{ tpl.nom }}</h3>
      <p class="text-sm text-gray-500">{{ tpl.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { useTemplateStore } from '@/stores/template'
const templateStore = useTemplateStore()

defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>
