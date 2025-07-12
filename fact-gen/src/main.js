import { createApp } from "vue";
import { createPinia } from "pinia";
const { createI18n, useI18n } = VueI18n;
import { supabase } from "./lib/supabase";
import Toast, { POSITION } from 'vue-toastification';
import "./style.css";
import { Icon } from "@iconify/vue";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component("Icon", Icon);

// 💡 Initialisation du store AVANT le mount
const authStore = useAuthStore();

// ⚠️ On attend que l’utilisateur soit chargé avant de monter l’app
authStore.initialize().then(() => {
  app.mount("#app");
  authStore.setupAuthListener(); // Ecoute des événements après le mount
});
