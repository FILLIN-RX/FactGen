<template>
  <div class="h-screen  w-full flex">
    <div >
      <LoginNav />
    </div>
   <div class="">
    <div class="container mx-auto px-6">
      <HaeDer />
    </div>
    
    <router-view></router-view>
   </div>

        

  </div>
</template>

<script>
 // ⚠️ Vérifie l'orthographe
import LoginNav from "../components/LoginNav.vue";

import HaeDer from "../components/HaeDer.vue";



export default {
  name: "AppLayout",
  components: {
    LoginNav,
    HaeDer,
    
  },

  created() {
    this.utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  },
  methods: {
    logout() {
      localStorage.removeItem("utilisateurConnecte");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Ajoute ici ton style custom si nécessaire */
</style>
