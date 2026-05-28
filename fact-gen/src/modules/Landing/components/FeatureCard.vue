<template>
    <n-card class="bg-white rounded-xl border border-gray-100
           shadow-sm hover:shadow-md
           transition-all duration-300
           lg:p-6 p-3 flex flex-col gap-4">

        <!-- ICON (Material style) -->
        <div class="w-12 h-12 rounded-full bg-indigo-50
             flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl text-indigo-600">
                {{ feature.icon }}
            </span>
        </div>

        <!-- TITLE -->
        <n-h3 class="text-lg font-semibold text-gray-900">
            {{ feature.title }}
        </n-h3>

        <!-- DESCRIPTION -->
        <n-p class="text-sm text-gray-600 leading-relaxed">
            {{ feature.description }}
        </n-p>

    </n-card>
</template>

<script setup>
import { NCard, NH3, NP } from "naive-ui";

defineProps({
    feature: {
        type: Object,
        required: true
    }
})
</script>
