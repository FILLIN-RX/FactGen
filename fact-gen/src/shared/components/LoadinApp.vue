<template>
    <div class="">
        <div class="flex flex-col items-center">
            <!-- Spinner -->
            <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>

            <!-- Message optionnel -->
            <div class="text-white text-sm font-medium">
                {{ message || 'Chargement...' }}
            </div>
        </div>
    </div>
</template>

<script setup>
// Props optionnelles pour personnaliser le loader
defineProps({
    message: {
        type: String,
        default: 'Chargement...'
    }
});
</script>

<style scoped>
/* Animation personnalisée si nécessaire */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
