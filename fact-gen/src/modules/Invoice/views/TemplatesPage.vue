<template>
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <n-h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Modèles de Factures Professionnels
                </n-h2>
                <n-p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                    Choisissez le style qui correspond le mieux à votre image de marque.
                </n-p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TemplateCard v-for="template in templateStore.templates" :key="template.id" :template="template" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { NH2, NP } from "naive-ui";
import { useTemplateStore } from '@/modules/Invoice/stores/template.store'
import TemplateCard from '@/modules/Invoice/components/templates/TemplateCard.vue'

const templateStore = useTemplateStore()
</script>
