<!-- components/templates/TemplateCard.vue -->
<template>
    <div
        class="group rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
        <div class="relative overflow-hidden">
            <img :src="template.previewUrl" :alt="template.nom"
                class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        </div>

        <div class="p-5">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-gray-800">{{ template.nom }}</h3>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PRO</span>
            </div>
            <p class="text-gray-600 mb-4">{{ template.description }}</p>

            <button @click="essayerModele"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md">
                Essayer ce modèle
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
    template: Object
})
const router = useRouter()

const essayerModele = () => {
    router.push({ name: 'FactureForm', query: { template: props.template.id } })
}
</script>

<style scoped>
.break-inside-avoid {
    break-inside: avoid;
}
</style>
