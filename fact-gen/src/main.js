import { createApp } from "vue";
import { createPinia } from 'pinia'
import { supabase } from "./lib/supabase";
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
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
    localStorage.setItem('sb_session', JSON.stringify(session));
  }
  
  if (event === 'SIGNED_OUT') {
    localStorage.removeItem('sb_session');
  }
});