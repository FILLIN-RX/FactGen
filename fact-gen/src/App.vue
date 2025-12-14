<template>
  <div id="app">
    <div>
      <NavBar
        v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false"
      />
      <div class="w-full">
        <router-view />
      </div>
      <div
        class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      >
        <Toast
          v-if="showToast"
          :message="toastMessage"
          :type="toastType"
          :duration="4000"
        />
      </div>
      <FooTer
        v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false"
      />
    </div>
  </div>
</template>

<script setup>
import { computed,onMounted } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
import FooTer from "./components/FooTer.vue";
import Toast from "./components/ToasT.vue";
import { useToastState } from "@/composables/useToast";
import { useThemeStore } from "./stores/Theme";

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
