<template>
  <div class="min-h-screen grid lg:grid-cols-6">
    <div class="col-span-1">
      <LoginNav />
    </div>
   <div class="col-span-5">
    <HaeDer />
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
