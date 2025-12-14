<template>
  <div
    class="bg-white p-6 mt-6 facture-container mx-auto font-sans"
  >
    <div class="bg-white p-6 mt-6 mx-auto font-sans">
      <h2 class="font-bold text-2xl mb-6 text-center text-gray-700">
        Aperçu de la facture
      </h2>

      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div
            class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="logoDataUrl"
              :src="logoDataUrl"
              alt="Logo"
              class="h-full w-full object-cover"
              @load="onImageLoad"
              @error="onImageError"
            />
          </div>
          <div v-if="societer">
            <h3 class="text-xl font-semibold">{{ societer.nom }}</h3>
            <p class="text-sm text-gray-600">{{ societer.email }}</p>
            <p class="text-sm text-gray-600">{{ societer.adresse }}</p>
          </div>
        </div>
      </div>

      <!-- Informations client -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
        <p v-if="client_data.nom"><strong>Nom :</strong> {{ client_data.nom }}</p>
        <p v-if="client_data.email"><strong>Email :</strong> {{ client_data.email }}</p>
        <p v-if="client_data.adresse"><strong>Adresse :</strong> {{ client_data.adresse }}</p>
      </div>

      <!-- Produits -->
      <div class="mb-8">
        <div
          class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300"
        >
          <div class="truncate">Description</div>
          <div class="text-center">Quantité</div>
          <div class="text-center">Prix unitaire</div>
          <div class="text-right">Prix total</div>
        </div>
        <div
          v-for="(p, i) in produits"
          :key="i"
          class="grid grid-cols-4 p-3 border-b text-sm text-gray-800"
        >
          <div
            class="whitespace-normal sm:whitespace-nowrap sm:truncate sm:overflow-hidden"
          >
            {{ p.nom }}
          </div>
          <div class="text-center">{{ p.quantite }}</div>
          <div class="text-center">{{ p.prix?.toFixed(2) || '0.00' }} €</div>
          <div class="text-right">{{ ((p.prix || 0) * (p.quantite || 0)).toFixed(2) }} €</div>
        </div>
      </div>

      <!-- Totaux -->
      <div class="grid grid-cols-2 gap-2 text-right text-gray-800 mb-4">
        <p><strong>Total HT :</strong></p>
        <p>{{ totalHt }} €</p>

        <template v-if="montantReduction > 0">
          <p class="text-red-500"><strong>Réduction :</strong></p>
          <p class="text-red-500">-{{ montantReduction }} €</p>
        </template>

        <p class="text-lg font-bold">Total TTC :</p>
        <p class="text-lg font-bold">{{ totalTTC }} €</p>
      </div>

      <!-- Supplément -->
      <div class="text-sm text-gray-600 italic">
        {{ suplement }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, nextTick } from 'vue'
import { useFacturesStore } from '@/stores/Facture'

const route = useRoute()
const factureStore = useFacturesStore()

const facture = ref(null)
const isLoading = ref(true)
const imageLoaded = ref(false)

// Logo & société (statique pour l'instant)
const logoDataUrl = ref('/logo.png')
const societer = ref({
  nom: 'LegacyTech SARL',
  adresse: 'Douala, Cameroun',
  email: 'contact@legacytech.com',
  telephone: '+237 6 XX XX XX XX',
})

// ✅ Données dérivées avec gestion des valeurs nulles
const client_data = computed(() => facture.value?.client_data || {})
const produits = computed(() => facture.value?.produits || [])
const suplement = computed(() => facture.value?.suplement || '')

// Calculs
const totalTTC = computed(() => {
  const total = facture.value?.montant_total || 0
  return typeof total === 'number' ? total.toFixed(2) : '0.00'
})

const montantReduction = computed(() => {
  const reduction = facture.value?.reduction
  if (!reduction) return 0
  
  const totalValue = parseFloat(facture.value?.montant_total || 0)
  
  if (reduction.type === 'montant') {
    return parseFloat(reduction.valeur || 0).toFixed(2)
  }
  if (reduction.type === 'pourcentage') {
    const reductionValue = parseFloat(reduction.valeur || 0)
    return (totalValue * reductionValue / 100).toFixed(2)
  }
  return '0.00'
})

const totalHt = computed(() => {
  const ttc = parseFloat(totalTTC.value || 0)
  const reduction = parseFloat(montantReduction.value || 0)
  return (ttc + reduction).toFixed(2)
})

// ✅ Gestion du chargement des images
function onImageLoad() {
  console.log('✅ Logo chargé')
  imageLoaded.value = true
  checkIfReady()
}

function onImageError() {
  console.warn('⚠️ Erreur de chargement du logo')
  imageLoaded.value = true // Considérer comme "prêt" même en cas d'erreur
  checkIfReady()
}

// ✅ Vérifier si tout est prêt pour la génération PDF
function checkIfReady() {
  if (facture.value && !isLoading.value) {
    // Attendre le prochain tick pour s'assurer que le DOM est mis à jour
    nextTick(() => {
      console.log('✅ Facture prête pour PDF')
      
      
      // ✅ Déclencher un événement personnalisé pour plus de sécurité
      window.dispatchEvent(new CustomEvent('factureReady', {
        detail: { factureId: facture.value.id }
      }))
    })
  }
}

onMounted(async () => {
  try {
    console.log(`🔄 Chargement de la facture ${route.params.id}`)
    
    // ✅ Initialiser le flag à false
    
    
    await factureStore.chargerFactures()
    facture.value = factureStore.factures.find(f => f.id === route.params.id)
    
    if (facture.value) {
      console.log('✅ Facture trouvée:', facture.value)
      isLoading.value = false
      
      // ✅ Si pas de logo, considérer comme prêt immédiatement
      if (!logoDataUrl.value) {
        imageLoaded.value = true
      }
      
      checkIfReady()
    } else {
      console.error('❌ Facture non trouvée pour l\'ID:', route.params.id)
      console.log('📋 Factures disponibles:', factureStore.factures.map(f => f.id))
      
      // ✅ Marquer comme prêt même en cas d'erreur pour éviter le blocage
    
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement de la facture:', error)
    // ✅ Marquer comme prêt même en cas d'erreur
  }
})

// ✅ Debug pour vérifier l'état
if (process.env.NODE_ENV === 'development') {
  // Afficher l'état dans la console toutes les 2 secondes
  setInterval(() => {
    console.log('🔍 État actuel:', {
      
      factureLoaded: !!facture.value,
      imageLoaded: imageLoaded.value,
      isLoading: isLoading.value
    })
  }, 2000)
}
</script>

<style>
.facture-container {
  width: 794px;      /* largeur A4 */
  min-height: 1123px; /* hauteur A4 */
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px;
  
  /* ✅ S'assurer que tout le contenu est visible */
  overflow: visible;
}

/* ✅ Styles d'impression améliorés */
@media print {
  body {
    margin: 0;
    font-size: 12px;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  .facture-container {
    width: 100%;
    min-height: auto;
    margin: 0;
    padding: 10mm;
    box-shadow: none;
  }

  .page-break {
    page-break-before: always;
  }

  .no-break {
    page-break-inside: avoid;
  }
  
  /* ✅ Forcer l'affichage des arrière-plans */
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}

body {
  background: white;
  font-family: sans-serif;
}

/* ✅ S'assurer que les images sont bien redimensionnées */
img {
  max-width: 100%;
  height: auto;
}

/* ✅ Éviter les débordements */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ✅ Style pour les éléments qui doivent être visibles en PDF */
.pdf-visible {
  opacity: 1 !important;
  visibility: visible !important;
}
</style>