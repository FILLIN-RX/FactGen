<template>
  <section class="min-h-screen bg-gray-50">
    <!-- Container principal avec padding adaptatif -->
    <div class="container mx-auto px-4 py-6 max-w-6xl">
      
      <!-- Header avec titre et actions -->
      <header class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="mb-4 sm:mb-0">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Dashboard Analytics
            </h1>
            <p class="text-gray-600 text-sm sm:text-base">
              Vue d'ensemble de vos performances en temps réel
            </p>
          </div>
          
          <!-- Actions rapides -->
          <div class="flex flex-wrap gap-2 sm:gap-3">
            <button class="btn-secondary">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"/>
              </svg>
              Exporter
            </button>
            <button class="btn-primary">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Nouveau rapport
            </button>
          </div>
        </div>
      </header>

      <!-- Statistiques avec grid responsive -->
      <div class="mb-8">
        <div class="glass-card p-4 sm:p-6">
          <StatisTics />
        </div>
      </div>

      <!-- Section graphiques -->
      <div class="grid grid-cols-1  gap-6 mb-8">
        <!-- Graphique principal -->
        <div class="">
          <div class="glass-card p-4 sm:p-6 h-full">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                Évolution des revenus
              </h2>
              <div class="flex gap-2">
                <select class="select-custom">
                  <option>7 derniers jours</option>
                  <option>30 derniers jours</option>
                  <option>3 derniers mois</option>
                </select>
              </div>
            </div>
            <div class="chart-container">
              <BarChart />
            </div>
          </div>
        </div>

        <!-- Panneau latéral avec comptes -->
        <div class="">
          <div class="glass-card p-4 sm:p-6 h-full">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">
              Comptes actifs
            </h2>
            
            <div class="space-y-4">
              <div 
                v-for="(account, index) in accounts" 
                :key="index"
                class="account-card"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div 
                      class="w-3 h-3 rounded-full mr-3"
                      :style="{ backgroundColor: account.color }"
                    ></div>
                    <span class="font-medium text-gray-900 text-sm">
                      {{ account.names }}
                    </span>
                  </div>
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    +{{ account.percent }}%
                  </span>
                </div>
                
                <div class="flex items-end justify-between">
                  <div>
                    <p class="text-2xl font-bold text-gray-900">
                      {{ formatCurrency(account.amount) }}
                    </p>
                    <p class="text-xs text-gray-500 uppercase tracking-wide">
                      {{ account.currency }}
                    </p>
                  </div>
                  
                  <!-- Mini graphique de progression -->
                  <div class="w-16 h-8">
                    <div class="h-full bg-gray-200 rounded relative overflow-hidden">
                      <div 
                        class="absolute bottom-0 left-0 bg-blue-500 rounded transition-all duration-300"
                        :style="{ 
                          width: '100%', 
                          height: `${Math.min(parseInt(account.percent), 100)}%` 
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bouton d'action -->
            <button class="w-full mt-6 py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200 flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Ajouter un compte
            </button>
          </div>
        </div>
      </div>

      <!-- Section activité récente (optionnelle) -->
      <div class="glass-card p-4 sm:p-6" v-if="showRecentActivity">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
            Activité récente
          </h2>
          <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Voir tout
          </button>
        </div>
        <RecentActivity />
      </div>
    </div>
  </section>
</template>

<script>
import RecentActivity from "../components/RecentActivity.vue";
import StatisTics from "../components/StatisTics.vue";
import BarChart from "../components/BarChart.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: "RealLayout",
  
  components: {
    BarChart,
    RecentActivity,
    StatisTics,
  },
  
  data() {
    return {
      utilisateur: null,
      showRecentActivity: false,
      accounts: [
        {
          amount: 15420,
          currency: 'EUR',
          names: 'Compte Principal',
          percent: '12',
          color: '#3B82F6'
        },
        {
          amount: 8750,
          currency: 'USD',
          names: 'Épargne Plus',
          percent: '8',
          color: '#10B981'
        },
        {
          amount: 3200,
          currency: 'EUR',
          names: 'Investissements',
          percent: '24',
          color: '#F59E0B'
        },
      ]
    };
  },
  
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    },
    
    handleExport() {
      toast.success('Export en cours...');
    },
    
    handleNewReport() {
      toast.info('Nouveau rapport créé');
    }
  },
  
  mounted() {
    console.log('Dashboard monté avec succès');
  }
};
</script>

<style scoped>
/* Glass Morphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(229, 231, 235, 0.8);
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

/* Boutons modernes */
.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1rem;
  background-color: #3B82F6;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background-color: #2563EB;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-primary:active {
  transform: scale(0.95);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1rem;
  background-color: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.75rem;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background-color: #F9FAFB;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-secondary:active {
  transform: scale(0.95);
}

/* Select personnalisé */
.select-custom {
  appearance: none;
  background-color: white;
  border: 1px solid #E5E7EB;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1rem;
}

.select-custom:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Cards de comptes */
.account-card {
  padding: 1rem;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border: 1px solid #F3F4F6;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.account-card:hover {
  transform: translateY(-2px);
  border-color: #E5E7EB;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Container pour graphiques */
.chart-container {
  position: relative;
  min-height: 300px;
}

@media (min-width: 640px) {
  .chart-container {
    min-height: 400px;
  }
}

/* Responsive utilities */
@media (max-width: 640px) {
  .glass-card {
    border-radius: 0.75rem;
  }
  
  .account-card {
    padding: 0.75rem;
  }
}

/* Animation d'entrée */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Focus states pour l'accessibilité */
button:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

/* Print styles */
@media print {
  .glass-card {
    background: white;
    border: 1px solid #E5E7EB;
    box-shadow: none;
  }
}
</style>