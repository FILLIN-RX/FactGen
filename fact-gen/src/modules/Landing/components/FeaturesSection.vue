<template>
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">

            <!-- HEADER -->
            <div class="text-center max-w-3xl mx-auto mb-16">
                <n-h2 class="text-3xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
                    Solution complète de facturation
                </n-h2>
                <n-p class="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                    Tous les outils nécessaires pour gérer votre facturation de manière professionnelle,
                    simple et rapide.
                </n-p>
            </div>

            <!-- FEATURES GRID -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard v-for="feature in features" :key="feature.title" :feature="feature" />
            </div>

        </div>
    </section>
</template>
<script setup>
import FeatureCard from './FeatureCard.vue'
import { NH2, NP } from "naive-ui";

defineProps({
    features: {
        type: Array,
        required: true
    }
})
</script>
