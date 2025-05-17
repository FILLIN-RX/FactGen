<template>
  <div id="app">
    <Loading v-if="isLoading" />
    <div v-else>
    <NavBar />

    <div class="pt-16">
    
       <router-view></router-view>

    </div>
  </div>
    
  
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue';
import HomePage from '../src/pages/HomePage.vue';
import Loading from './components/LoadinApp.vue';
export default {
  components: {
    
    NavBar,
    HomePage,
    Loading
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
    }, 2000);
  },
};
</script>

<style>
@plugin "daisyui";
/* Styles généraux */

</style>
