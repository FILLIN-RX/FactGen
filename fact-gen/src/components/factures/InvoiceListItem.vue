<template>
  <li
    @click="$emit('select')"
    class="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 rounded-xl p-4 sm:p-6 mb-3 sm:mb-4 cursor-pointer transition-all duration-200 hover:shadow-lg active:transform active:scale-[0.98] touch-manipulation"
  >
    <!-- Mobile Layout -->
    <div class="block sm:hidden space-y-3">
      <!-- Header with invoice number and date -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <span class="font-bold text-blue-600 text-lg">#{{ invoice.numero }}</span>
            <p class="text-xs text-gray-500 mt-0.5">{{ formatDate(invoice.date) }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <StatusBadge :status="invoice.statut" />
          <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Client and amount -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2 min-w-0 flex-1">
          <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span class="text-sm text-gray-600 truncate" v-if="clientName">{{ clientName }}</span>
          <span class="text-sm text-gray-400 italic" v-else>Client non spécifié</span>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="text-xl font-bold text-gray-900">{{ formatPrice(invoice.montant_total) }} €</div>
          <div class="text-xs text-gray-500">TTC</div>
        </div>
      </div>

      <!-- Due date indicator for mobile -->
      <div v-if="invoice.date_echeance" class="flex items-center justify-between text-xs">
        <span class="text-gray-500">Échéance</span>
        <span :class="getDueDateClass(invoice.date_echeance)">
          {{ formatDate(invoice.date_echeance) }}
        </span>
      </div>
    </div>

    <!-- Desktop Layout -->
    <div class="hidden sm:block">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6 flex-1">
          <!-- Invoice Icon & Number -->
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span class="font-bold text-blue-600 text-lg">#{{ invoice.numero }}</span>
              <p class="text-sm text-gray-500">{{ formatDate(invoice.date) }}</p>
            </div>
          </div>

          <!-- Client Info -->
          <div class="flex items-center space-x-2 min-w-0 flex-1">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-gray-900 truncate" v-if="clientName">{{ clientName }}</p>
              <p class="text-sm text-gray-400 italic" v-else>Client non spécifié</p>
            </div>
          </div>

          <!-- Due Date -->
          <div v-if="invoice.date_echeance" class="text-sm">
            <p class="text-gray-500 mb-1">Échéance</p>
            <p :class="getDueDateClass(invoice.date_echeance)">
              {{ formatDate(invoice.date_echeance) }}
            </p>
          </div>
        </div>

        <!-- Right side: Status, Amount, Arrow -->
        <div class="flex items-center space-x-4">
          <StatusBadge :status="invoice.statut" />
          
          <div class="text-right">
            <div class="text-2xl font-bold text-gray-900">{{ formatPrice(invoice.montant_total) }} €</div>
            <div class="text-sm text-gray-500">TTC</div>
          </div>
          
          <svg class="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useClientsStore } from '@/stores/client.js'

const clientsStore = useClientsStore();

const props = defineProps({
  invoice: Object
});
const StatusBadge = {
  props: { status: String },
  setup(props) {
    const getStatusConfig = (status) => {
     const configs = {
  'paye': { // ou 'payee' selon ce que vous standardisez
    label: 'Payée',
    classes: 'bg-green-100 text-green-800 border-green-200',
    icon: 'M5 13l4 4L19 7'
  },
  'en_attente': {
    label: 'En attente',
    classes: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  'annule': {
    label: 'Annulée',
    classes: 'bg-red-100 text-red-800 border-red-200',
    icon: 'M6 18L18 6M6 6l12 12'
  },
  'brouillon': {
    label: 'Brouillon',
    classes: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
  }
};
      return configs[status] || {
        label: status || 'Non défini',
        classes: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      };
    };
    return { getStatusConfig };
  },
  template: `
    <div class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
         :class="getStatusConfig(status).classes">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getStatusConfig(status).icon" />
      </svg>
      <span>{{ getStatusConfig(status).label }}</span>
    </div>
  `
};
defineExpose({ StatusBadge });

defineEmits(['select']);

// Fonction pour formater le prix
function formatPrice(val) {
  if (typeof val !== "number" || isNaN(val)) return "0.00";
  return val.toFixed(2);
}

// Fonction pour formater la date
function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Fonction pour déterminer la classe CSS de la date d'échéance
function getDueDateClass(dueDate) {
  if (!dueDate) return "text-gray-500";
  
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return "text-red-600 font-semibold"; // En retard
  } else if (diffDays <= 7) {
    return "text-amber-600 font-semibold"; // Échéance proche
  } else {
    return "text-green-600 font-medium"; // OK
  }
}

// Récupérer le nom du client
const clientName = computed(() => {
  if (!props.invoice?.client_id) return "";
  
  const client = clientsStore.clients.find(c => c.id === props.invoice.client_id);
  return client ? client.nom : props.invoice.client_data?.nom || "";
});
</script>

<!-- Composant StatusBadge intégré -->
<script>
// Composant StatusBadge en tant que composant inline
const StatusBadge = {
  props: {
    status: String
  },
  setup(props) {
    const getStatusConfig = (status) => {
      const configs = {
        'payee': {
          label: 'Payée',
          classes: 'bg-green-100 text-green-800 border-green-200',
          icon: 'M5 13l4 4L19 7' // Checkmark
        },
        'en_attente': {
          label: 'En attente',
          classes: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' // Clock
        },
        'en_retard': {
          label: 'En retard',
          classes: 'bg-red-100 text-red-800 border-red-200',
          icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' // Warning
        },
        'brouillon': {
          label: 'Brouillon',
          classes: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' // Edit
        }
      };
      
      return configs[status] || {
        label: status || 'Non défini',
        classes: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' // Question mark
      };
    };

    return {
      getStatusConfig
    };
  },
  template: `
    <div class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
         :class="getStatusConfig(status).classes">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getStatusConfig(status).icon" />
      </svg>
      <span>{{ getStatusConfig(status).label }}</span>
    </div>
  `
};

export default {
  components: {
    StatusBadge
  }
};
</script>

<style scoped>
/* Amélioration du feedback tactile sur mobile */
@media (max-width: 640px) {
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(59, 130, 246, 0.1);
  }
}

/* Animation de hover plus fluide */
.group {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover {
  transform: translateY(-1px);
}

.group:active {
  transform: translateY(0) scale(0.98);
}

/* Effet de focus pour l'accessibilité */
.group:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>