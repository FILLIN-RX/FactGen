<template>
  <section class="min-h-screen">
    <!-- Augmentation du padding vertical sur mobile -->
    <div class="container mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-6">
      <!-- Header réorganisé pour mobile -->
      <header class="mb-6 sm:mb-8">
        <div class="flex flex-col">
          <div class="mb-4">
            <h1
              class="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2"
            >
              Dashboard Analytics
            </h1>
            <p class="text-xs sm:text-base text-gray-600">
              Vue d'ensemble de vos performances
            </p>
          </div>

          <!-- Boutons en colonne sur mobile -->
        </div>
      </header>
<div class="space-y-4 xs:space-y-6">
      <!-- Statistiques avec moins d'espacement sur mobile -->
      <div class="mb-6 sm:mb-8">
        <div class="p-3 sm:p-6">
          <StatisTics />
        </div>
        <div class="p-3 sm:p-6">
          <StatStatus />
        </div>
      </div>

      <!-- Grille simplifiée sur mobile -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <!-- Graphique principal -->
        <div>
          <div class="glass-card p-3 sm:p-6">
            <div class="flex flex-col mb-4 sm:mb-6">
              <h2 class="text-base sm:text-xl font-semibold text-gray-900 mb-2">
                Évolution des revenus
              </h2>
              <select class="select-custom text-xs sm:text-sm">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
                <option>3 derniers mois</option>
              </select>
            </div>
            <div class="chart-container">
              <BarChart />
            </div>
          </div>
        </div>

        <!-- Panneau latéral avec comptes -->
      </div>

      <!-- Section activité récente -->
      <div class="glass-card p-3 sm:p-6" v-if="showRecentActivity">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <h2 class="text-base sm:text-xl font-semibold text-gray-900">
            Activité récente
          </h2>
          <button
            class="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium"
          >
            Voir tout
          </button>
        </div>
        <RecentActivity />
      </div>
    </div>
    <div>
      <ClientFormModal
        :open="operationsStore.showNewClientModal"
        @close="operationsStore.closeNewClientModal"
        :form="{}"
      />
    </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { supabase } from "../lib/supabase";
import StatStatus from "../components/StatStatus.vue";
import FactureTemp from "../components/FactureTemp.vue";
import ClientFormModal from "../components/client/ClientFormModal .vue";
import { useOperationsStore } from "../stores/ui";
import BarChart from "../components/BarChart.vue";
import RecentActivity from "../components/RecentActivity.vue";
import StatisTics from "../components/StatisTics.vue";
function creer() {
  open.value = !open.value;
}
const operationsStore = useOperationsStore();
const toast = useToast();
const router = useRouter();

// Données réactives
const utilisateur = ref(null);
const showRecentActivity = ref(false);

// Fonctions
function formatCurrency(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function handleExport() {
  toast.success("Export en cours...");
}

function handleNewReport() {
  toast.info("Nouveau rapport créé");
}

// Vérification de session
onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.push("/");
  } else {
    utilisateur.value = session.user;
    console.log("Utilisateur connecté :", session.user);
  }
});
</script>

<style scoped>
/* Glass Morphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(229, 231, 235, 0.8);
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

/* Boutons modernes */
.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1rem;
  background-color: #3b82f6;
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
  background-color: #2563eb;
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
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background-color: #f9fafb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-secondary:active {
  transform: scale(0.95);
}

/* Select personnalisé */
.select-custom {
  appearance: none;
  background-color: white;
  border: 1px solid #e5e7eb;
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
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Cards de comptes */
.account-card {
  padding: 1rem;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border: 1px solid #f3f4f6;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.account-card:hover {
  transform: translateY(-2px);
  border-color: #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Container pour graphiques */
.chart-container {
  position: relative;
  
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
    border: 1px solid #e5e7eb;
    box-shadow: none;
  }
}
</style>
