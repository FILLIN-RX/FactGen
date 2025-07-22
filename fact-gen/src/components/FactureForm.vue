<template>
  <div class="invoice-editor">
    <!-- En-tête -->
    <div class="header">
      <button @click="$router?.go(-1)" class="back-btn">
        ← Retour
      </button>
      <h1>{{ isEditing ? 'Modifier' : 'Nouvelle' }} facture</h1>
      <div class="actions">
        <button @click="togglePreview" class="btn-secondary">
          {{ showPreview ? "Masquer l'aperçu" : "Afficher l'aperçu" }}
        </button>
        <button 
          @click="sauvegarderFacture" 
          class="btn-primary" 
          :disabled="!isFormValid || isSaving"
        >
          <span v-if="isSaving">Enregistrement...</span>
          <span v-else>{{ isEditing ? 'Mettre à jour' : 'Créer' }}</span>
        </button>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="section">
      <div class="flex items-center justify-between text-sm text-slate-700 mb-2">
        <span>Progression</span>
        <span>{{ progressPercentage }}%</span>
      </div>
      <div class="w-full bg-slate-200 rounded-full h-2">
        <div
          class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>

    <!-- Informations générales -->
    <div class="section">
      <h2>Informations générales</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>Modèle de facture</label>
          <TemplateSelector v-model="selectedTemplate" />
        </div>
        <div class="form-group">
          <label>Date d'émission *</label>
          <input 
            v-model="date_emission" 
            type="date" 
            required
            class="w-full"
          />
        </div>
        <div class="form-group">
          <label>Date d'échéance</label>
          <input 
            v-model="date_echeance" 
            type="date" 
            class="w-full"
          />
        </div>
        <div class="form-group">
          <label>Devise</label>
          <SelectedDevise v-model="devise" />
        </div>
        <div class="form-group">
          <label>Statut *</label>
          <select v-model="statut" required class="w-full">
            <option value="en_attente">En attente</option>
            <option value="paye">Payé</option>
            <option value="annule">Annulé</option>
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
            v-model="societer.nom" 
            type="text" 
            required
            placeholder="Nom de votre société"
            class="w-full"
          />
        </div>
        <div class="form-group">
          <label>Adresse *</label>
          <textarea 
            v-model="societer.adresse" 
            required
            placeholder="Adresse complète"
            rows="3"
            class="w-full"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Email *</label>
          <input 
            v-model="societer.email" 
            type="email"
            required
            placeholder="contact@societe.com"
            class="w-full"
          />
        </div>
        <div class="form-group">
          <label>Téléphone</label>
          <input 
            v-model="societer.telephone" 
            type="tel"
            placeholder="+225 XX XX XX XX"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Informations client -->
    <div class="section">
      <h2>Informations client</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>Nom du client *</label>
          <input 
            v-model="client.nom" 
            type="text" 
            required
            placeholder="Nom du client"
            class="w-full"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="client.email" 
            type="email"
            placeholder="client@example.com"
            class="w-full"
          />
        </div>
        <div class="form-group">
          <label>Adresse</label>
          <textarea 
            v-model="client.address" 
            placeholder="Adresse du client"
            rows="3"
            class="w-full"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Produits/Services -->
    <div class="section">
      <div class="section-header">
        <h2>Produits / Services</h2>
        <button @click="ajouterProduit" class="btn-secondary">
          + Ajouter un produit
        </button>
      </div>

      <div v-if="produits.length === 0" class="empty-state">
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
          v-for="(produit, index) in produits" 
          :key="index" 
          class="product-row"
        >
          <div class="col-name">
            <input 
              v-model="produit.nom" 
              type="text" 
              placeholder="Nom du produit/service"
              class="input-inline"
              required
            />
          </div>
          <div class="col-qty">
            <input 
              v-model.number="produit.quantite" 
              type="number" 
              min="1"
              required
              class="input-inline input-number"
            />
          </div>
          <div class="col-price">
            <input 
              v-model.number="produit.prix" 
              type="number" 
              min="0"
              step="0.01"
              required
              class="input-inline input-number"
            />
          </div>
          <div class="col-total">
            {{ formatPrix(produit.prix * produit.quantite) }}
          </div>
          <div class="col-actions">
            <button 
              v-if="produits.length > 1"
              @click="supprimerLigne(index)" 
              class="btn-danger-small"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Réductions -->
    <div class="section">
      <h2>Réductions</h2>
      
      <div class="form-group">
        <label>
          <input 
            v-model="utiliseReduction" 
            type="checkbox"
            true-value="oui"
            false-value="non"
          /> Appliquer une réduction
        </label>
        
        <div v-if="utiliseReduction === 'oui'" class="reduction-form">
          <div class="form-grid">
            <div class="form-group">
              <label>Type de réduction</label>
              <select v-model="reduction.type" class="w-full">
                <option value="montant">Montant fixe</option>
                <option value="pourcentage">Pourcentage</option>
              </select>
            </div>
            <div class="form-group">
              <label>Valeur</label>
              <div class="flex items-center">
                <input 
                  v-model.number="reduction.valeur" 
                  type="number" 
                  min="0"
                  :step="reduction.type === 'pourcentage' ? '1' : '0.01'"
                  :max="reduction.type === 'pourcentage' ? '100' : undefined"
                  class="w-full"
                />
                <span v-if="reduction.type === 'pourcentage'" class="ml-2">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Informations supplémentaires -->
    <div class="section">
      <h2>Informations supplémentaires</h2>
      <textarea
        v-model="suplement"
        placeholder="Conditions de paiement, notes, informations complémentaires..."
        rows="4"
        class="w-full"
      ></textarea>
    </div>

    <!-- Récapitulatif -->
    <div class="section summary-section">
      <h2>Récapitulatif</h2>
      <div class="calculations">
        <div class="calculation-row">
          <span>Sous-total HT</span>
          <span>{{ formatPrix(totalHT) }}</span>
        </div>
        <div v-if="montantReduction > 0" class="calculation-row">
          <span>Réduction</span>
          <span class="text-red-600">-{{ formatPrix(montantReduction) }}</span>
        </div>
        <div class="calculation-row total-row">
          <span>Total TTC</span>
          <span class="font-bold">{{ formatPrix(totalTTC) }}</span>
        </div>
      </div>
    </div>

    <!-- Aperçu -->
    <div
      v-if="showPreview"
      class="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      <div class="sticky top-0 bg-white border-b border-slate-200 p-4">
        <button
          @click="togglePreview"
          class="w-full bg-slate-100 text-slate-700 font-medium py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Fermer l'aperçu
        </button>
      </div>

      <component
        v-if="templateStore.getComponentById(selectedTemplate)"
        :is="templateStore.getComponentById(selectedTemplate)"
        :societer="societer"
        :client="client"
        :produits="produits"
        :totalHT="totalHT"
        :totalTTC="totalTTC"
        :montantReduction="montantReduction"
        :reduction="reduction"
        :suplement="suplement"
        :date_emission="date_emission"
        :date_echeance="date_echeance"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import Facture from "@/models/facture";
import Produit from "@/models/produit";
import Societer from "@/models/societer";
import { useTemplateStore } from "../stores/template";
import { useFacturesStore } from "../stores/Facture";
import TemplateSelector from "./templates/TemplateSelector.vue";
import SelectedDevise from "./SelectedDevise.vue";
import { showToastMessage } from "../composables/useToast";

const router = useRouter();
const factureStore = useFacturesStore();
const templateStore = useTemplateStore();

// État réactif
const showPreview = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const selectedTemplate = ref('moderne');

// Données de la facture
const societer = ref(new Societer("", "", "", ""));
const client = ref({ nom: "", email: "", address: "" });
const produits = ref([new Produit("", 0, 1)]);
const utiliseReduction = ref("non");
const reduction = ref({ type: "pourcentage", valeur: 0 });
const suplement = ref("");
const devise = ref(null);
const date_emission = ref(new Date().toISOString().split('T')[0]);
const date_echeance = ref("");
const statut = ref("en_attente");

// Calculs réactifs
const factureInstance = computed(() => {
  return new Facture(
    societer.value,
    client.value,
    produits.value,
    utiliseReduction.value === "oui" ? reduction.value : null,
    suplement.value,
    null,
    date_emission.value,
    date_echeance.value,
    selectedTemplate.value,
    statut.value,
    devise.value
  );
});

const totalHT = computed(() => factureInstance.value.getTotalHT());
const montantReduction = computed(() => factureInstance.value.getMontantReduction());
const totalTTC = computed(() => factureInstance.value.getTotalTTC());

const progressPercentage = computed(() => {
  let progress = 0;
  if (date_emission.value) progress += 20;
  if (societer.value.nom && societer.value.email && societer.value.adresse) progress += 20;
  if (client.value.nom) progress += 20;
  if (produits.value.some(p => p.nom && p.prix > 0 && p.quantite > 0)) progress += 20;
  if (isFormValid.value) progress += 20;
  return Math.min(progress, 100);
});

const isFormValid = computed(() => {
  return societer.value.nom && 
         societer.value.email && 
         societer.value.adresse &&
         client.value.nom &&
         date_emission.value &&
         produits.value.length > 0 &&
         produits.value.every(p => p.nom && p.quantite > 0 && p.prix >= 0);
});

// Méthodes
function formatPrix(valeur) {
  if (valeur == null) return "-";
  const currency = devise.value?.code || 'XOF';
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(valeur);
}

function ajouterProduit() {
  produits.value.push(new Produit("", 0, 1));
}

function supprimerLigne(index) {
  if (produits.value.length > 1) produits.value.splice(index, 1);
}

function togglePreview() {
  showPreview.value = !showPreview.value;
}

function resetForm() {
  client.value = { nom: "", email: "", address: "" };
  produits.value = [new Produit("", 0, 1)];
  utiliseReduction.value = "non";
  reduction.value = { type: "pourcentage", valeur: 0 };
  suplement.value = "";
  date_emission.value = new Date().toISOString().split('T')[0];
  date_echeance.value = "";
}

async function sauvegarderFacture() {
  if (!isFormValid.value) {
    showToastMessage("Veuillez remplir tous les champs obligatoires", "warning");
    return;
  }

  try {
    isSaving.value = true;
    await factureStore.creerFactureComplete({
      client: client.value,
      societer: societer.value,
      produits: produits.value,
      reduction: utiliseReduction.value === "oui" ? reduction.value : null,
      suplement: suplement.value,
      date_emission: date_emission.value,
      date_echeance: date_echeance.value,
      template: selectedTemplate.value,
      statut: statut.value,
      devise: devise.value,
    });

    showToastMessage("Facture créée avec succès !", "success");
    resetForm();
    router.push('/factures');
  } catch (error) {
    console.error("Erreur :", error);
    showToastMessage("Erreur lors de la création de la facture", "error");
  } finally {
    isSaving.value = false;
  }
}

// Watchers
watch(date_emission, (newDate) => {
  if (newDate && !date_echeance.value) {
    const d = new Date(newDate);
    d.setDate(d.getDate() + 30);
    date_echeance.value = d.toISOString().split('T')[0];
  }
});

// Initialisation
onMounted(() => {
  const savedCompany = localStorage.getItem('companyInfo');
  if (savedCompany) {
    const company = JSON.parse(savedCompany);
    societer.value = new Societer(
      company.nom || "",
      company.adresse || "",
      company.email || "",
      company.telephone || ""
    );
  }
});
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
  font-size: 24px;
}

.back-btn {
  padding: 8px 16px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #f5f5f5;
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
  transition: all 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Produits */
.products-table {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1.5fr 0.5fr;
  background: #f8f9fa;
  padding: 12px;
  font-weight: 600;
  color: #555;
  border-bottom: 1px solid #ddd;
}

.product-row {
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1.5fr 0.5fr;
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

.calculation-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.calculation-row.total-row {
  font-size: 1.1em;
  border-top: 2px solid #ddd;
  margin-top: 8px;
  padding-top: 16px;
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
}
</style>