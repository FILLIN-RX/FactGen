import { createApp } from "vue";
import { createPinia } from 'pinia'
import './style.css'
import { Icon } from '@iconify/vue'

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(createPinia())
app.component('Icon', Icon)
app.mount("#app");
// 🔐 Gestion du token Supabase
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    localStorage.setItem("supabase_token", session.access_token);
  }
  if (event === 'SIGNED_OUT') {
    localStorage.removeItem("supabase_token");
  }
});