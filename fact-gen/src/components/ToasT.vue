<template>
<transition name="fade">
  <div
    v-if="visible"
    :class="toastClass"
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-xl shadow-xl text-white z-[9999] bg-black bg-opacity-80"
  >
    {{ message }}
  </div>
</transition>


</template>

<script setup>
import { ref, computed, watch } from "vue";

// Props
const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "info", // success | error | info
  },
  duration: {
    type: Number,
    default: 3000, // durée en ms
  },
});

// Réactivité
const visible = ref(true);

// Cacher après la durée
watch(
  () => props.message,
  () => {
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  },
  { immediate: true }
);

// Couleur selon type
const toastClass = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
    case "info":
    default:
      return "bg-blue-500";
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
