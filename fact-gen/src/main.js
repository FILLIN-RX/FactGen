import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { Icon } from "@iconify/vue";

import App from './App.vue'
import router from './router';

const app = createApp(App);
app.use(router);
app.component('Icon',Icon)
app.mount('#app');

