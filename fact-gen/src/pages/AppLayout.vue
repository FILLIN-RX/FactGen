<template>
  <div>
    <LoginNav />

    <div class="flex text-black overflow-y-scroll h-full p-10">
      <section class="flex-1 border-2 h-screen">
        <div class="w-full border-2 grid grid-cols-4 h-32">
          <AcountExpend 
          v-for="(account , index) in accounts"
          :key="index"
          v-bind="account"
          />
          
        </div>
        <div class="w-full border-2">
          <BarChart />
        </div>
        <div class="w-full border-2">
          <RecentActivity />
        </div>
      
      </section>
      <section class="w-[500px] border-2 h-screen">aside</section>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import AcountExpend from "../components/AcountExpend.vue";
import LoginNav from "../components/LoginNav.vue";
import BarChart from "../components/BarChart.vue";
import RecentActivity from "../components/RecentActivity.vue";


export default {
  name: "AppLayout",
  components: {
    LoginNav,
    AcountExpend,
    BarChart,
    RecentActivity
  },
  data() {
    return {
      utilisateur: null,
      
      accounts:[
        {
          amount:1000,
          currency:'USD',
          names:'payer',
          percent:'10',
          color: '#3882F6'
        },
        {
          amount:1000,
          currency:'USD',
          names:'payer',
          percent:'80',
          color: '#3882F6'
        },
        {
          amount:1000,
          currency:'USD',
          names:'payer',
          percent:'40',
          color: '#3882F6'
        },
      ]
    };
  },
  onMounted() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
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
