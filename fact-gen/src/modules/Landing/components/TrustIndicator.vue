<template>
    <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-base" :style="{ color: color }">
            {{ icon }}
        </span>
        <n-text :style="{ color: color }">{{ text }}</n-text>
    </div>
</template>

<script setup>
import { NText } from "naive-ui";

defineProps({
    icon: String,
    text: String,
    color: String,
});
</script>
