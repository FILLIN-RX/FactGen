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
import { useToast } from "vue-toastification";

// Exemple avec fetch dans un composant Vue
const toast=useToast();

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
 
}
};

</script>

<style scoped>
/* Ajoute ici ton style custom si nécessaire */
</style>
