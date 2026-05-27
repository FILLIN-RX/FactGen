<template>
  <n-config-provider :locale="frFR" :date-locale="dateFrFR">
    <n-message-provider>
      <MessageInit />
      <n-dialog-provider>
        <n-notification-provider>
          <div id="app">
            <NavBar v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false" />
            <div class="w-full">
              <router-view />
            </div>
            <FooTer v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false" />
          </div>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { frFR, dateFrFR } from "naive-ui";
import NavBar from "@/shared/components/layout/NavBar.vue";
import FooTer from "@/shared/components/layout/Footer.vue";
import MessageInit from "@/shared/components/MessageInit.vue";
import { useThemeStore } from "@/shared/stores/theme.store";

const route = useRoute();
const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
});

const isLayoutProtege = computed(() => {
  return route.matched.some((r) => r.components?.default?.name === "AppLayout");
});
</script>
