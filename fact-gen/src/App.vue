<template>
  <div id="app">
    <NavBar />
    <div>
    <router-view></router-view>
  </div>
    
  
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue';
import HomePage from '../src/pages/HomePage.vue';
export default {
  components: {
    
    NavBar,
    HomePage,
  }
};
</script>

<style>
/* Styles généraux */

</style>
