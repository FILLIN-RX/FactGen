<template>
  <div class="flex">
    <!-- toute la hauteur de l'écran -->
    <!-- Sidebar -->
    <div class="w-64 text-white">
      <LoginNav />
    </div>

    <!-- Contenu principal -->
    <div class="flex flex-col flex-1 pr-20">
      <!-- Header -->
      <div class="sticky top-0 z-10">
        <HaeDer />
      </div>

      <!-- Contenu -->
      <div class="bg-white">
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
      try {
        localStorage.removeItem("utilisateurConnecte");
        this.$router.push("/login");
        // Toast de succès
        this.$toast.success("Déconnexion réussie. À bientôt !", {
          timeout: 3000,
        });
      } catch (error) {
        this.$toast.error("Erreur lors de la déconnexion. Réessayez.", {
          timeout: 5000,
        });
      }
    },
  },
};
</script>

<style scoped>
/* Ajoute ici ton style custom si nécessaire */
</style>
