<template>
  <div id="app">
    <div>
      <NavBar v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false" />
      <div class="w-full">
        <router-view />
      </div>
      <div class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
        <Toast v-if="showToast" :message="toastMessage" :type="toastType" :duration="4000" />
      </div>
      <FooTer v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/shared/components/layout/NavBar.vue";
import FooTer from "@/shared/components/layout/Footer.vue";
import Toast from "@/shared/components/Toast.vue";
import { useToastState } from "@/composables/useToast";
import { useThemeStore } from "@/shared/stores/theme.store";

const route = useRoute();

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
const isLayoutProtege = computed(() => {
  return route.matched.some((r) => r.components?.default?.name === "AppLayout");
});

const { showToast, toastMessage, toastType } = useToastState();
</script>


<style>
/* Styles généraux */
</style>
