<template>
    <n-card class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-shadow duration-300">
        <n-button @click="$emit('toggle')" :aria-expanded="isOpen"
            class="w-full px-6 py-3 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200">
            <n-text class="font-semibold text-md text-gray-900">{{ item.title }}</n-text>
            <div :class="{ 'rotate-180': isOpen }" class="transition-transform duration-300 ml-4">
                <span class="material-symbols-outlined text-gray-500 dark:text-gray-300">
                    expand_more
                </span>
            </div>
        </n-button>

        <Transition name="collapse">
            <div v-if="isOpen" class="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                {{ item.content }}
            </div>
        </Transition>
    </n-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { NCard, NButton, NText } from "naive-ui";

defineProps({
    item: Object,
    isOpen: Boolean
});

defineEmits(['toggle']);
</script>

<style scoped>
/* Styles de transition pour la FAQ */
.collapse-enter-active,
.collapse-leave-active {
    transition: all 0.3s ease-out;
    max-height: 500px;
    /* Grande valeur pour le déroulement */
    opacity: 1;
}

.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>
