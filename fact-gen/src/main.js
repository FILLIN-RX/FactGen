import { createApp } from "vue";
import { createPinia } from "pinia";
import naive from "naive-ui";
import { supabase } from "./lib/supabase";
import "./style.css";
import "./styles/m3-design-system.css";
import { Icon } from "@iconify/vue";
import { i18n } from "./i18n";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";

const app = createApp(App);
const pinia = createPinia();
app.use(i18n);
app.use(pinia);
app.use(router);
app.use(naive);
app.component("Icon", Icon);

const authStore = useAuthStore();

authStore.initialize().then(() => {
  app.mount("#app");
  authStore.setupAuthListener();
});
