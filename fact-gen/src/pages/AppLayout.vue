<template>
  <div class="flex h-screen"> <!-- toute la hauteur de l'écran -->
    <!-- Sidebar -->
    <div class="w-64  text-white">
      <LoginNav />
    </div>

    <!-- Contenu principal -->
    <div class="flex flex-col flex-1 pr-20">
      <!-- Header -->
      <div class="sticky top-0 z-10 ">
        <HaeDer />
      </div>

      <!-- Contenu -->
      <div class="flex-1 overflow-auto p-4 bg-gray-50">
        <router-view />
      </div>
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
