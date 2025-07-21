<template>
  <div class="invoice-editor">
    <!-- En-tête -->
    <div class="header">
      <button @click="$router?.go(-1)" class="back-btn">
        ← Retour
      </button>
      <h1>{{ isEditing ? 'Modifier' : 'Nouvelle' }} facture</h1>
      <div class="actions">
        <button @click="previewInvoice" class="btn-secondary">Aperçu</button>
        <button @click="saveInvoice" class="btn-primary" :disabled="!canSave">
          {{ isEditing ? 'Mettre à jour' : 'Créer' }}
        </button>
      </div>
    </div>

    <!-- Informations générales -->
    <div class="section">
      <h2>Informations générales</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>Numéro de facture</label>
          <input 
            v-model="invoiceData.numero" 
            type="text" 
            :disabled="isEditing"
            placeholder="Auto-généré"
          />
        </div>
        <div class="form-group">
          <label>Date d'émission *</label>
          <input 
            v-model="invoiceData.date_emission" 
            type="date" 
            required
          />
        </div>
        <div class="form-group">
          <label>Date d'échéance *</label>
          <input 
            v-model="invoiceData.date_echeance" 
            type="date" 
            required
          />
        </div>
        <div class="form-group">
          <label>Devise</label>
          <select v-model="invoiceData.devise">
            <option value="XOF">XOF (Franc CFA)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="USD">USD (Dollar)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Informations société -->
    <div class="section">
      <h2>Informations société</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>Nom de la société *</label>
          <input 
            v-model="invoiceData.societer.nom" 
            type="text" 
            required
            placeholder="Nom de votre société"
          />
        </div>
        <div class="form-group">
          <label>Adresse</label>
          <textarea 
            v-model="invoiceData.societer.adresse" 
            placeholder="Adresse complète"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="invoiceData.societer.email" 
            type="email"
            placeholder="contact@societe.com"
          />
        </div>
        <div class="form-group">
          <label>Téléphone</label>
          <input 
            v-model="invoiceData.societer.telephone" 
            type="tel"
            placeholder="+225 XX XX XX XX"
          />
        </div>
      </div>
    </div>

    <!-- Informations client -->
    <div class="section">
      <h2>Informations client</h2>
      <div class="client-selector">
        <button @click="showClientModal = true" class="btn-secondary">
          {{ invoiceData.client.nom ? 'Changer de client' : 'Sélectionner un client' }}
        </button>
        <button v-if="!invoiceData.client.nom" @click="createNewClient" class="btn-outline">
          Nouveau client
        </button>
      </div>
      
      <div v-if="invoiceData.client.nom" class="client-info">
        <h3>{{ invoiceData.client.nom }}</h3>
        <p v-if="invoiceData.client.address">{{ invoiceData.client.address }}</p>
        <p v-if="invoiceData.client.email">{{ invoiceData.client.email }}</p>
      </div>
    </div>

    <!-- Produits/Services -->
    <div class="section">
      <div class="section-header">
        <h2>Produits / Services</h2>
        <button @click="addProduct" class="btn-secondary">
          + Ajouter un produit
        </button>
      </div>

      <div v-if="productList.length === 0" class="empty-state">
        <p>Aucun produit ajouté. Cliquez sur "Ajouter un produit" pour commencer.</p>
      </div>

      <div v-else class="products-table">
        <div class="table-header">
          <div class="col-name">Produit/Service</div>
          <div class="col-qty">Qté</div>
          <div class="col-price">Prix unitaire</div>
          <div class="col-total">Total</div>
          <div class="col-actions">Actions</div>
        </div>
        
        <div 
          v-for="(product, index) in productList" 
          :key="index" 
          class="product-row"
        >
          <div class="col-name">
            <input 
              v-model="product.nom" 
              type="text" 
              placeholder="Nom du produit/service"
              class="input-inline"
            />
          </div>
          <div class="col-qty">
            <input 
              v-model.number="product.quantite" 
              type="number" 
              min="1"
              class="input-inline input-number"
            />
          </div>
          <div class="col-price">
            <input 
              v-model.number="product.prix" 
              type="number" 
              min="0"
              step="0.01"
              class="input-inline input-number"
            />
          </div>
          <div class="col-total">
            {{ formatPrix(product.prix * product.quantite) }}
          </div>
          <div class="col-actions">
            <button @click="removeProduct(index)" class="btn-danger-small">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Réductions et suppléments -->
    <div class="section">
      <h2>Réductions et suppléments</h2>
      
      <!-- Réduction -->
      <div class="form-group">
        <label>
          <input 
            v-model="hasReduction" 
            type="checkbox"
          /> Appliquer une réduction
        </label>
        
        <div v-if="hasReduction" class="reduction-form">
          <div class="form-grid">
            <div class="form-group">
              <label>Type de réduction</label>
              <select v-model="invoiceData.reduction.type">
                <option value="montant">Montant fixe</option>
                <option value="pourcentage">Pourcentage</option>
              </select>
            </div>
            <div class="form-group">
              <label>Valeur</label>
              <input 
                v-model.number="invoiceData.reduction.valeur" 
                type="number" 
                min="0"
                :step="invoiceData.reduction.type === 'pourcentage' ? '1' : '0.01'"
                :max="invoiceData.reduction.type === 'pourcentage' ? '100' : undefined"
              />
              <span v-if="invoiceData.reduction.type === 'pourcentage'">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Récapitulatif -->
    <div class="section summary-section">
      <h2>Récapitulatif</h2>
      <div class="calculations">
        <CalculationRow 
          label="Sous-total HT" 
          :value="totalHT" 
        />
        <CalculationRow 
          v-if="hasReduction && montantReduction > 0"
          label="Réduction" 
          :value="-montantReduction" 
        />
        <CalculationRow 
          label="Total TTC" 
          :value="totalTTC" 
          class="total-row"
        />
      </div>
    </div>

    <!-- Modal de sélection client (simplifiée) -->
    <div v-if="showClientModal" class="modal-overlay" @click="showClientModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Sélectionner un client</h3>
          <button @click="showClientModal = false" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input 
              v-model="newClient.nom" 
              type="text" 
              placeholder="Nom du client *"
              required
            />
          </div>
          <div class="form-group">
            <input 
              v-model="newClient.address" 
              type="text" 
              placeholder="Adresse"
            />
          </div>
          <div class="form-group">
            <input 
              v-model="newClient.email" 
              type="email" 
              placeholder="Email"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showClientModal = false" class="btn-secondary">
            Annuler
          </button>
          <button @click="selectClient" class="btn-primary" :disabled="!newClient.nom">
            Sélectionner
          </button>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import Facture from '../../../models/facture'
import CalculationRow from './CalculationRow.vue'

// Props
const props = defineProps({
  factureId: {
    type: String,
    default: null
  }
})

// État réactif
const isEditing = computed(() => !!props.factureId)
const showClientModal = ref(false)
const hasReduction = ref(false)
const message = ref('')
const messageType = ref('success')

// Données de la facture
const invoiceData = reactive({
  numero: '',
  date_emission: new Date().toISOString().split('T')[0],
  date_echeance: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
  devise: 'XOF',
  societer: {
    nom: '',
    adresse: '',
    email: '',
    telephone: ''
  },
  client: {
    nom: '',
    address: '',
    email: ''
  },
  reduction: {
    type: 'pourcentage',
    valeur: 0
  },
  statut: 'en_attente',
  template: 'default'
})

// Liste des produits
const productList = ref([])

// Nouveau client (pour le modal)
const newClient = reactive({
  nom: '',
  address: '',
  email: ''
})

// Calculs réactifs
const totalHT = computed(() => {
  return productList.value.reduce((total, p) => {
    return total + (p.prix || 0) * (p.quantite || 0)
  }, 0)
})

const montantReduction = computed(() => {
  if (!hasReduction.value || !invoiceData.reduction.valeur) return 0
  
  if (invoiceData.reduction.type === 'montant') {
    return invoiceData.reduction.valeur
  } else {
    return totalHT.value * (invoiceData.reduction.valeur / 100)
  }
})

const totalTTC = computed(() => {
  return totalHT.value - montantReduction.value
})

const canSave = computed(() => {
  return invoiceData.client.nom && 
         invoiceData.date_emission && 
         invoiceData.date_echeance &&
         productList.value.length > 0 &&
         productList.value.every(p => p.nom && p.quantite > 0 && p.prix >= 0)
})

// Méthodes
function addProduct() {
  productList.value.push({
    nom: '',
    quantite: 1,
    prix: 0
  })
}

function removeProduct(index) {
  productList.value.splice(index, 1)
}

function createNewClient() {
  newClient.nom = ''
  newClient.address = ''
  newClient.email = ''
  showClientModal.value = true
}

function selectClient() {
  if (!newClient.nom) return
  
  Object.assign(invoiceData.client, {
    nom: newClient.nom,
    address: newClient.address,
    email: newClient.email
  })
  
  showClientModal.value = false
}

function formatPrix(valeur) {
  if (valeur == null) return "-"
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: invoiceData.devise,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valeur)
}

function showMessage(text, type = 'success') {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

function saveInvoice() {
  try {
    // Convertir la liste en objet pour la classe Facture
    const produitsObj = {}
    productList.value.forEach((p, index) => {
      produitsObj[index] = { ...p }
    })

    // Créer l'instance de facture
    const facture = new Facture(
      invoiceData.societer,
      invoiceData.client,
      produitsObj,
      hasReduction.value ? invoiceData.reduction : null,
      null, // supplément
      null, // user_id
      invoiceData.date_emission,
      invoiceData.date_echeance,
      invoiceData.template,
      invoiceData.statut,
      invoiceData.devise
    )

    // Sauvegarder
    facture.sauvegarder()
    showMessage('✅ Facture sauvegardée avec succès !', 'success')
    
  } catch (error) {
    showMessage(`❌ Erreur: ${error.message}`, 'error')
  }
}

function previewInvoice() {
  // Ici vous pourriez implémenter un aperçu
  showMessage('Aperçu en cours de développement', 'info')
}

// Initialisation
onMounted(() => {
  // Charger les données de la société depuis localStorage si disponible
  const savedCompany = localStorage.getItem('companyInfo')
  if (savedCompany) {
    const company = JSON.parse(savedCompany)
    Object.assign(invoiceData.societer, company)
  }

  // Si on modifie une facture existante
  if (isEditing.value) {
    // Ici vous chargeriez les données de la facture existante
    // const factureData = loadFacture(props.factureId)
  } else {
    // Nouvelle facture - ajouter un produit par défaut
    addProduct()
  }
})
</script>

<style scoped>
.invoice-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e5e5;
}

.header h1 {
  margin: 0;
  color: #333;
  font-weight: 700;
}

.back-btn {
  padding: 8px 16px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
}

.actions {
  display: flex;
  gap: 12px;
}

.section {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-weight: 600;
  font-size: 18px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Client */
.client-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.client-info {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
}

.client-info h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.client-info p {
  margin: 4px 0;
  color: #666;
}

/* Produits */
.products-table {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 3fr 1fr 2fr 2fr 1fr;
  background: #f8f9fa;
  padding: 12px;
  font-weight: 600;
  color: #555;
  border-bottom: 1px solid #ddd;
}

.product-row {
  display: grid;
  grid-template-columns: 3fr 1fr 2fr 2fr 1fr;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.product-row:last-child {
  border-bottom: none;
}

.input-inline {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}

.input-number {
  text-align: right;
}

.col-total {
  text-align: right;
  font-weight: 600;
  color: #333;
}

.col-actions {
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

/* Réductions */
.reduction-form {
  margin-top: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

/* Récapitulatif */
.summary-section {
  background: #f8f9fa;
}

.calculations {
  max-width: 400px;
  margin-left: auto;
}

/* Boutons */
.btn-primary,
.btn-secondary,
.btn-outline,
.btn-danger-small {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #4F46E5;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #4338CA;
}

.btn-primary:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6B7280;
  color: white;
}

.btn-secondary:hover {
  background: #555;
}

.btn-outline {
  background: none;
  color: #4F46E5;
  border: 1px solid #4F46E5;
}

.btn-outline:hover {
  background: #4F46E5;
  color: white;
}

.btn-danger-small {
  padding: 6px 8px;
  background: #EF4444;
  color: white;
  font-size: 12px;
}

.btn-danger-small:hover {
  background: #DC2626;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #eee;
}

/* Messages */
.message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 500;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.message.success {
  background: #10B981;
  color: white;
}

.message.error {
  background: #EF4444;
  color: white;
}

.message.info {
  background: #3B82F6;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .invoice-editor {
    padding: 16px;
  }
  
  .header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .actions {
    justify-content: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .products-table,
  .table-header,
  .product-row {
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr 0.5fr;
  }
  
  .client-selector {
    flex-direction: column;
  }
}
</style>