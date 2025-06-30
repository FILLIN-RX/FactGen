<template>
  <div id="app">
    <div>
      <NavBar
        v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false"
      />

      <div class="">
        <router-view />
        <ToasT
          v-if="toast.message"
          :message="toast.message"
          :type="toast.type"
          :duration="toast.duration"
        />
      </div>

      <FooTer
        v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
import FooTer from "./components/FooTer.vue";
import ToasT from "./components/ToasT.vue";
import { toast } from "./composables/useToast";
import HomePage from "../src/pages/HomePage.vue";
import LoadinApp from "./components/LoadinApp.vue";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();

const isLayoutProtege = computed(() => {
  return route.matched.some((r) => r.components?.default?.name === "AppLayout");
});
</script>

<style>
/* Styles généraux */
</style>
