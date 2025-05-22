<template>
  <div id="app">
    <Loading v-if="isLoading" />
    <div v-else>
      <NavBar v-if="!isLayoutProtege" />
      
      <div class="pt-16">
        <router-view />
      </div>

      <FooTer v-if="!isLayoutProtege && $route.meta.showNavbarAndFooter !== false" />
    </div>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue';
import FooTer from  './components/FooTer.vue';
import HomePage from '../src/pages/HomePage.vue';
import Loading from './components/LoadinApp.vue';
export default {
  components: {
    
    NavBar,
    HomePage,
    Loading,
    FooTer
  },
  data() {
    return {
      isLoading: true,  // On démarre sur loading actif
    };
  },
  mounted() {
    // Simuler chargement (ex: récupération initiale de données)
    setTimeout(() => {
      this.isLoading = false; // Fin du chargement => afficher l'app
    }, 1000);
  },
  computed: {
  isLayoutProtege() {
    // AppLayout sera utilisé uniquement sur les routes enfants protégées
    return this.$route.matched.some(r => r.components?.default?.name === 'AppLayout');
  }
}

};
</script>

<style>
@import "tailwindcss";
@plugin "daisyui" {
  themes: false;
}
/* Styles généraux */

</style>
