<template>
  <div class="min-h-screen">
    <LoginNav />

    <div class="flex text-black p-10 gap-6 overflow-hidden">

      <!-- Section principale -->
      <section class="flex-1 border-2 rounded-xl p-4 space-y-4 overflow-auto h-[calc(100vh-80px)]">
        <div class="mb-4">
          <StatisTics />
        </div>
        <!-- Graphique -->
        <div class=" p-4 shadow">
          <BarChart />
        </div>

        <!-- Activité récente -->
        <div class="w-full border rounded-lg p-4 shadow">
          <RecentActivity />
        </div>
      </section>

      <!-- Vue dynamique à droite -->
      <section class="w-[400px] border-2 rounded-xl p-4 h-[calc(100vh-80px)] overflow-auto shadow">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import AccountExpand from "../components/AcountExpend.vue"; // ⚠️ Vérifie l'orthographe
import LoginNav from "../components/LoginNav.vue";
import BarChart from "../components/BarChart.vue";
import RecentActivity from "../components/RecentActivity.vue";
import StatisTics from "../components/StatisTics.vue";



export default {
  name: "AppLayout",
  components: {
    LoginNav,
    AccountExpand,
    BarChart,
    RecentActivity,
    StatisTics,
  },
  data() {
    return {
      utilisateur: null,
      accounts: [
        {
          amount: 1000,
          currency: 'USD',
          names: 'Payer',
          percent: '10',
          color: '#3882F6'
        },
        {
          amount: 1000,
          currency: 'USD',
          names: 'Payer',
          percent: '80',
          color: '#3882F6'
        },
        {
          amount: 1000,
          currency: 'USD',
          names: 'Payer',
          percent: '40',
          color: '#3882F6'
        },
      ]
    };
  },
  mounted() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Tu peux faire quelque chose avec ces valeurs si besoin
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
