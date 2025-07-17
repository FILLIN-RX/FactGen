<template>
  <div class="stat-status-container">
    <div class="header">
      <div class="title-section">
        <h2 class="title">Répartition des factures</h2>
        <div class="subtitle">Vue d'ensemble de vos factures</div>
      </div>
    </div>

    <!-- État de chargement -->
    <div v-if="facturesStore.loading" class="loading-state">
      <div class="loading-content">
        <div class="spinner"></div>
        <p class="loading-text">Chargement des données...</p>
      </div>
    </div>

    <!-- État vide -->
    <div v-else-if="!hasData" class="empty-state">
      <div class="empty-content">
        <div class="empty-icon">📊</div>
        <h3>Aucune facture</h3>
        <p>Commencez par créer votre première facture</p>
        <button class="cta-button">Créer une facture</button>
      </div>
    </div>

    <!-- Graphique -->
    <div v-else class="chart-container">
      <div class="chart-section">
        <div class="chart-wrapper">
          <Doughnut :data="chartData" :options="chartOptions" />
          <div class="chart-center">
            <div class="center-count">{{ totalFactures }}</div>
            <div class="center-label">Total</div>
          </div>
        </div>
      </div>
      
      <!-- Légende personnalisée -->
      <div class="legend-section">
        <h3 class="legend-title">Détails par statut</h3>
        <div class="legend-grid">
          <div 
            v-for="(item, index) in legendItems" 
            :key="item.label"
            class="legend-card"
            :class="{ 'legend-card--empty': item.count === 0 }"
          >
            <div class="legend-header">
              <div class="legend-indicator">
                <div 
                  class="legend-color" 
                  :style="{ backgroundColor: item.color }"
                ></div>
                <span class="legend-icon">{{ item.icon }}</span>
              </div>
              <span class="legend-label">{{ item.label }}</span>
            </div>
            <div class="legend-stats">
              <span class="legend-count">{{ item.count }}</span>
              <span class="legend-percentage">{{ item.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast de notification -->
    <Teleport to="body">
      <DuolingoToast 
        v-if="showToast"
        :message="toastMessage"
        :type="toastType"
        @close="showToast = false"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useFacturesStore } from "@/stores/Facture";
import { Doughnut } from "vue-chartjs";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const facturesStore = useFacturesStore();

// État pour les notifications
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("info");

// Configuration des statuts
const statutConfig = {
  paye: { label: "Payée", color: "#10b981", icon: "✅" },
  en_attente: { label: "En attente", color: "#f59e0b", icon: "⏳" },
  en_retard: { label: "En retard", color: "#ef4444", icon: "⚠️" },
  brouillon: { label: "Brouillon", color: "#6b7280", icon: "📝" },
  annule: { label: "Annulée", color: "#8b5cf6", icon: "❌" }
};

const statutKeys = Object.keys(statutConfig);
const labels = Object.values(statutConfig).map(s => s.label);
const colors = Object.values(statutConfig).map(s => s.color);

// Charger les données
onMounted(async () => {
  try {
    await facturesStore.chargerFactures();
    showNotification("Données chargées avec succès", "success");
    console.log("Statuts des factures:", facturesStore.factures.map(f => f.statut));
console.log("Comptage des statuts:", facturesStore.facturesParStatutCount);
  } catch (error) {
    showNotification("Erreur lors du chargement", "error");
    console.error("Erreur lors du chargement des factures:", error);
  }
});

// Fonction pour afficher les notifications
const showNotification = (message, type) => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
};

// Computed pour vérifier s'il y a des données
const hasData = computed(() => {
  const counts = facturesStore.facturesParStatutCount || {};
  return Object.values(counts).some(count => count > 0);
});



// Données du graphique
const chartData = computed(() => {
  const counts = facturesStore.facturesParStatutCount || {};
  
  return {
    labels,
    datasets: [
      {
        label: "Factures par statut",
        backgroundColor: colors,
        borderColor: '#ffffff',
        borderWidth: 3,
        data: statutKeys.map((key) => counts[key] || 0),
        hoverOffset: 12,
        hoverBorderWidth: 4,
      },
    ],
  };
});

// Options du graphique
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      titleFont: { size: 14, weight: 'bold' },
      bodyFont: { size: 13 },
      callbacks: {
        label: (context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = total > 0 ? ((context.parsed * 100) / total).toFixed(1) : 0;
          return `${context.label}: ${context.parsed} (${percentage}%)`;
        }
      }
    }
  },
  cutout: '70%',
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1200,
    easing: 'easeOutQuart'
  },
  elements: {
    arc: {
      borderRadius: 6,
    }
  }
};

// Items pour la légende personnalisée
const legendItems = computed(() => {
  const counts = facturesStore.facturesParStatutCount || {};
  const total = totalFactures.value;
  
  return statutKeys.map((key, index) => {
    const count = counts[key] || 0;
    const percentage = total > 0 ? ((count * 100) / total).toFixed(1) : 0;
    
    return {
      label: statutConfig[key].label,
      color: statutConfig[key].color,
      icon: statutConfig[key].icon,
      count,
      percentage
    };
  });
});

// Watcher pour détecter les changements importants
watch(
  () => facturesStore.facturesParStatutCount,
  (newCounts, oldCounts) => {
    if (oldCounts && newCounts) {
      const oldTotal = Object.values(oldCounts).reduce((a, b) => a + b, 0);
      const newTotal = Object.values(newCounts).reduce((a, b) => a + b, 0);
      
      if (newTotal > oldTotal) {
        showNotification(`${newTotal - oldTotal} nouvelle(s) facture(s)`, "success");
      }
    }
  },
  { deep: true }
);
</script>

<style scoped>
.stat-status-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 0;
  box-shadow: none;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.title-section {
  flex: 1;
}

.title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.total-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  flex-shrink: 0;
}

.count {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  line-height: 1;
}

.label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 32px 16px;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 32px 16px;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 280px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #374151;
}

.empty-state p {
  margin: 0 0 24px 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.cta-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.chart-section {
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

.chart-wrapper {
  height: 280px;
  position: relative;
}

.chart-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.center-count {
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1;
}

.center-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  margin-top: 4px;
}

.legend-section {
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.legend-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.legend-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.legend-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 12px;
  background: #f8fafc;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.legend-card:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.legend-card--empty {
  opacity: 0.5;
}

.legend-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.legend-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.legend-icon {
  font-size: 1rem;
}

.legend-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.legend-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.legend-count {
  font-weight: 700;
  color: #1f2937;
  font-size: 1.125rem;
}

.legend-percentage {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

/* Tablette */
@media (min-width: 640px) {
  .stat-status-container {
    padding: 24px;
    border-radius: 24px;
    margin: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    min-height: auto;
  }

  .title {
    font-size: 1.5rem;
  }

  .chart-wrapper {
    height: 320px;
  }

  .legend-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .chart-container {
    gap: 24px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .stat-status-container {
    max-width: 600px;
    margin: 24px auto;
    padding: 32px;
  }

  .title {
    font-size: 1.625rem;
  }

  .chart-wrapper {
    height: 360px;
  }

  .legend-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .chart-section,
  .legend-section {
    padding: 32px;
  }

  .chart-container {
    gap: 32px;
  }
}

/* Large desktop */
@media (min-width: 1280px) {
  .stat-status-container {
    max-width: 700px;
  }

  .legend-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>