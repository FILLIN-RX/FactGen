<template>
  <n-config-provider :locale="frFR" :date-locale="dateFrFR">
    <n-message-provider>
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
import { frFR, dateFrFR, useMessage } from "naive-ui";
import NavBar from "@/shared/components/layout/NavBar.vue";
import FooTer from "@/shared/components/layout/Footer.vue";
import { useThemeStore } from "@/shared/stores/theme.store";

import { initMessage } from "@/composables/useToast";

const route = useRoute();
const themeStore = useThemeStore();
const message = useMessage();
initMessage(message);

onMounted(() => {
  themeStore.initTheme();
});

const isLayoutProtege = computed(() => {
  return route.matched.some((r) => r.components?.default?.name === "AppLayout");
});
</script>
