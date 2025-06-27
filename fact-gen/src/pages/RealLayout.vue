<template>
    <section class=" ">
     
        <div class="mb-4">
          <StatisTics />
        </div>
        <!-- Graphique -->
        <div class=" p-4 shadow">
          <BarChart />
        </div>

        <!-- Activité récente -->
        <div class="w-full border rounded-lg p-4 shadow">
          
        </div>
      
        
      </section>
</template>
<script>

import RecentActivity from "../components/RecentActivity.vue";
import StatisTics from "../components/StatisTics.vue";
import BarChart from "../components/BarChart.vue";

// Exemple avec fetch dans un composant Vue


export default {

  components: {
    
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
};

</script>

<style scoped>
/* Ajoute ici ton style custom si nécessaire */
</style>
