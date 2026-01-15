<template>
    <div class="flex flex-col md:gap-12 items-center"
        :class="isReversed === 'true' ? 'md:flex-row-reverse' : 'md:flex-row'">
        <!-- Icon + Text -->
        <div class="md:w-1/2 flex flex-col justify-center space-y-4">
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 flex items-center justify-center rounded-full bg-[#1E40AF] shadow-md">
                    <span class="material-symbols-outlined text-white text-3xl">
                        {{ icon }}
                    </span>
                </div>
                <h3 class="text-2xl font-semibold text-gray-900">{{ title }}</h3>
            </div>
            <p class="text-gray-600 text-base leading-relaxed">{{ description }}</p>
        </div>

        <!-- Stat Card -->
        <div class="md:w-1/2 w-full mt-6 md:mt-0">
            <div
                class="relative p-8 rounded-2xl bg-white shadow hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center justify-center">
                <!-- Accent Circle derrière la statistique -->
                <div class="absolute -top-6 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
                <div class="text-center relative z-10">
                    <div class="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-1">{{ statValue }}</div>
                    <div class="text-gray-500 text-sm sm:text-base">{{ statLabel }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    description: String,
    icon: String,
    statValue: String,
    statLabel: String,
    isReversed: String,
});
</script>

<style scoped></style>
