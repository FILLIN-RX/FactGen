<template>
    <div class="bg-white rounded-xl border border-gray-100
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
        <h3 class="text-lg font-semibold text-gray-900">
            {{ feature.title }}
        </h3>

        <!-- DESCRIPTION -->
        <p class="text-sm text-gray-600 leading-relaxed">
            {{ feature.description }}
        </p>

    </div>
</template>

<script setup>
defineProps({
    feature: {
        type: Object,
        required: true
    }
})
</script>
