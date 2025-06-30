import { createApp } from "vue";
import { createPinia } from "pinia";
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
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  icon: false,  // Désactive les icônes SVG
  // Utilisez des emojis à la place
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️"
});
// 💡 Initialisation du store AVANT le mount
const authStore = useAuthStore();

// ⚠️ On attend que l’utilisateur soit chargé avant de monter l’app
authStore.initialize().then(() => {
  app.mount("#app");
  authStore.setupAuthListener(); // Ecoute des événements après le mount
});
