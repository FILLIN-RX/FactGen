<template>
  <div class="min-h-screen">
    <LoginNav />

        <router-view></router-view>

  </div>
</template>

<script>
 // ⚠️ Vérifie l'orthographe
import LoginNav from "../components/LoginNav.vue";




export default {
  name: "AppLayout",
  components: {
    LoginNav,
    
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
