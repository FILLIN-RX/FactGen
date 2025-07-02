<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header Mobile -->
    <div class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3 md:hidden">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold text-slate-800">Nouvelle Facture</h1>
        <button
          @click="togglePreview"
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Aperçu
        </button>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Formulaire Principal -->
      <div 
        class="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
        :class="{ 'hidden lg:block': showPreview }"
      >
        <div class="max-w-2xl mx-auto">
          <!-- Header Desktop -->
          <div class="hidden md:block mb-8">
            <h1 class="text-3xl font-bold text-slate-800 mb-2">Créer une facture</h1>
            <p class="text-slate-600">Remplissez les informations pour générer votre facture professionnelle</p>
          </div>

          <!-- Progress Bar -->
          <div class="mb-8">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
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

          <form @submit.prevent="sauvegarderFacture" class="space-y-8">
            <!-- Section Dates -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                Informations de facturation
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="date_emission" class="block text-sm font-medium text-slate-700">
                    Date d'émission *
                  </label>
                  <input
                    type="date"
                    id="date_emission"
                    v-model="date_emission"
                    required
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="date_echeance" class="block text-sm font-medium text-slate-700">
                    Date d'échéance
                  </label>
                  <input
                    type="date"
                    id="date_echeance"
                    v-model="date_echeance"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <!-- Section Entreprise -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                Votre entreprise
              </h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Nom de l'entreprise *</label>
                  <input
                    v-model="societer.nom"
                    type="text"
                    required
                    placeholder="Nom de votre entreprise"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input
                    v-model="societer.email"
                    type="email"
                    required
                    placeholder="contact@entreprise.com"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Adresse *</label>
                  <textarea
                    v-model="societer.adresse"
                    required
                    placeholder="123 Rue de l'Exemple, 75000 Paris"
                    rows="2"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Section Client -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                Informations client
              </h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Nom du client *</label>
                  <input
                    v-model="client.nom"
                    type="text"
                    required
                    placeholder="Nom du client"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    v-model="client.email"
                    type="email"
                    placeholder="client@example.com"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Adresse</label>
                  <textarea
                    v-model="client.address"
                    placeholder="Adresse du client"
                    rows="2"
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Section Produits -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                Produits et services
              </h2>
              
              <div class="space-y-4">
                <div
                  v-for="(produit, index) in produits"
                  :key="index"
                  class="relative bg-slate-50 rounded-xl p-4 border border-slate-200"
                >
                  <!-- Delete button -->
                  <button
                    v-if="produits.length > 1"
                    @click="supprimerLigne(index)"
                    type="button"
                    class="absolute top-3 right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors flex items-center justify-center z-10"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                  
                  <div class="grid grid-cols-1 md:grid-cols-12 gap-4 pr-12 md:pr-4">
                    <div class="md:col-span-5">
                      <label class="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                      <input
                        v-model="produit.nom"
                        type="text"
                        required
                        placeholder="Description du produit/service"
                        class="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-slate-700 mb-2">Quantité *</label>
                      <input
                        v-model.number="produit.quantite"
                        type="number"
                        min="1"
                        required
                        placeholder="1"
                        class="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-slate-700 mb-2">Prix unitaire *</label>
                      <input
                        v-model.number="produit.prix"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        placeholder="0.00"
                        class="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    
                    <div class="md:col-span-3 flex items-end">
                      <div class="w-full">
                        <label class="block text-sm font-medium text-slate-700 mb-2">Total</label>
                        <div class="bg-slate-100 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800">
                          {{ (Number(produit.prix) * Number(produit.quantite)).toFixed(2) }} €
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  @click="ajouterProduit"
                  type="button"
                  class="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Ajouter un produit
                </button>
              </div>
            </div>

            <!-- Section Réduction -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                Réduction
              </h2>
              
              <div class="space-y-4">
                <div class="flex gap-6">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="non"
                      v-model="utiliseReduction"
                      class="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span class="text-slate-700">Aucune réduction</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="oui"
                      v-model="utiliseReduction"
                      class="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span class="text-slate-700">Appliquer une réduction</span>
                  </label>
                </div>
                
                <div v-if="utiliseReduction === 'oui'" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-red-50 rounded-xl border border-red-200">
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Type de réduction</label>
                    <select
                      v-model="reduction.type"
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="pourcentage">Pourcentage (%)</option>
                      <option value="montant">Montant fixe (€)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">
                      Valeur {{ reduction.type === 'pourcentage' ? '(%)' : '(€)' }}
                    </label>
                    <input
                      v-model.number="reduction.valeur"
                      type="number"
                      :step="reduction.type === 'pourcentage' ? '1' : '0.01'"
                      :min="0"
                      :max="reduction.type === 'pourcentage' ? 100 : undefined"
                      placeholder="0"
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Section Informations supplémentaires -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                Informations supplémentaires
              </h2>
              
              <textarea
                v-model="suplement"
                placeholder="Conditions de paiement, notes, informations complémentaires..."
                rows="4"
                class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <!-- Actions -->
            <div class="flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                :disabled="isSaving || !isFormValid"
                class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <svg
                  v-if="isSaving"
                  class="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ isSaving ? 'Enregistrement...' : 'Créer la facture' }}
              </button>
              
              <button
                type="button"
                @click="togglePreview"
                class="md:hidden bg-slate-100 text-slate-700 font-medium py-4 px-6 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-3"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Voir l'aperçu
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Aperçu Facture -->
      <div 
        class="lg:flex-1 lg:max-w-2xl bg-white lg:border-l border-slate-200 overflow-y-auto"
        :class="{ 'block': showPreview, 'hidden lg:block': !showPreview }"
      >
        <div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 lg:hidden">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-800">Aperçu</h2>
            <button
              @click="togglePreview"
              class="w-8 h-8 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6 lg:p-8">
          <div class="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
            <!-- Header de la facture -->
            <div class="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-8">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <h1 class="text-3xl font-bold mb-2">FACTURE</h1>
                  <p class="text-slate-300">Numéro: #{{ generateInvoiceNumber() }}</p>
                  <p class="text-slate-300">Date: {{ formatDate(date_emission) }}</p>
                  <p v-if="date_echeance" class="text-slate-300">Échéance: {{ formatDate(date_echeance) }}</p>
                </div>
                
                <div class="text-right">
                  <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div class="text-2xl font-bold">{{ totalTTC.toFixed(2) }} €</div>
                    <div class="text-slate-300 text-sm">Montant total TTC</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8 space-y-8">
              <!-- Informations entreprise et client -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">De</h3>
                  <div class="bg-slate-50 rounded-xl p-4">
                    <h4 class="font-bold text-slate-800 text-lg mb-2">{{ societer.nom || 'Nom de l\'entreprise' }}</h4>
                    <p class="text-slate-600 text-sm">{{ societer.email || 'email@entreprise.com' }}</p>
                    <p class="text-slate-600 text-sm whitespace-pre-line">{{ societer.adresse || 'Adresse de l\'entreprise' }}</p>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">À</h3>
                  <div class="bg-blue-50 rounded-xl p-4">
                    <h4 class="font-bold text-slate-800 text-lg mb-2">{{ client.nom || 'Nom du client' }}</h4>
                    <p v-if="client.email" class="text-slate-600 text-sm">{{ client.email }}</p>
                    <p v-if="client.address" class="text-slate-600 text-sm whitespace-pre-line">{{ client.address }}</p>
                  </div>
                </div>
              </div>

              <!-- Tableau des produits -->
              <div>
                <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Détail des prestations</h3>
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                  <div class="bg-slate-50 px-6 py-4">
                    <div class="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-700">
                      <div class="col-span-6">Description</div>
                      <div class="col-span-2 text-center">Qté</div>
                      <div class="col-span-2 text-right">Prix unit.</div>
                      <div class="col-span-2 text-right">Total</div>
                    </div>
                  </div>
                  
                  <div class="divide-y divide-slate-200">
                    <div
                      v-for="(produit, index) in produits"
                      :key="index"
                      class="px-6 py-4"
                    >
                      <div class="grid grid-cols-12 gap-4 text-sm">
                        <div class="col-span-6 text-slate-800">{{ produit.nom || 'Produit sans nom' }}</div>
                        <div class="col-span-2 text-right font-semibold text-slate-800">
                          {{ (Number(produit.prix || 0) * Number(produit.quantite || 0)).toFixed(2) }} €
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Totaux -->
              <div class="bg-slate-50 rounded-xl p-6">
                <div class="space-y-3">
                  <div class="flex justify-between text-slate-600">
                    <span>Sous-total HT</span>
                    <span class="font-medium">{{ totalHT.toFixed(2) }} €</span>
                  </div>
                  
                  <div v-if="montantReduction > 0" class="flex justify-between text-red-600">
                    <span>Réduction {{ reduction.type === 'pourcentage' ? `(${reduction.valeur}%)` : '' }}</span>
                    <span class="font-medium">-{{ montantReduction.toFixed(2) }} €</span>
                  </div>
                  
                  <div class="border-t border-slate-200 pt-3">
                    <div class="flex justify-between text-lg font-bold text-slate-800">
                      <span>Total TTC</span>
                      <span>{{ totalTTC.toFixed(2) }} €</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Informations supplémentaires -->
              <div v-if="suplement" class="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 class="text-sm font-semibold text-amber-800 mb-3">Informations supplémentaires</h3>
                <p class="text-amber-700 text-sm whitespace-pre-line">{{ suplement }}</p>
              </div>

              <!-- Footer -->
              <div class="text-center pt-8 border-t border-slate-200">
                <p class="text-xs text-slate-500">
                  Facture générée le {{ formatDate(new Date().toISOString().substring(0, 10)) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import Facture from "../models/facture";
import societer from "../models/societer";
import Produit from "../models/produit";
import { useFacturesStore } from "../stores/Facture";
import { showToast } from "../composables/useToast";

export default {
  data() {
    return {
      showPreview: false,
      client: { nom: "", email: "", address: "" },
      produits: [new Produit("", 0, 1)],
      utiliseReduction: "non",
      reduction: { type: "pourcentage", valeur: 0 },
      suplement: "",
      societer: new societer(
        "Mon Entreprise",
        "123 Rue Exemple, 75000 Paris",
        "contact@entreprise.com",
        "0123456789"
      ),
      date_emission: new Date().toISOString().substring(0, 10),
      date_echeance: "",
      isSaving: false,
    };
  },
  computed: {
    factureInstance() {
      const reductionActive = this.utiliseReduction === "oui" ? this.reduction : null;
      return new Facture(this.societer, this.client, this.produits, reductionActive);
    },
    totalHT() {
      return this.factureInstance.getTotalHT();
    },
    montantReduction() {
      return this.factureInstance.getMontantReduction();
    },
    totalTTC() {
      return this.factureInstance.getTotalTTC();
    },
    progressPercentage() {
      let progress = 0;
      const steps = 5;
      
      // Dates
      if (this.date_emission) progress += 20;
      
      // Entreprise
      if (this.societer.nom && this.societer.email && this.societer.adresse) progress += 20;
      
      // Client
      if (this.client.nom) progress += 20;
      
      // Produits
      const validProducts = this.produits.filter(p => p.nom && p.prix > 0 && p.quantite > 0);
      if (validProducts.length > 0) progress += 20;
      
      // Formulaire complet
      if (this.isFormValid) progress += 20;
      
      return Math.min(progress, 100);
    },
    isFormValid() {
      const hasValidCompany = this.societer.nom && this.societer.email && this.societer.adresse;
      const hasValidClient = this.client.nom;
      const hasValidProducts = this.produits.some(p => p.nom && p.prix > 0 && p.quantite > 0);
      const hasValidDates = this.date_emission;
      
      return hasValidCompany && hasValidClient && hasValidProducts && hasValidDates;
    }
  },
  methods: {
    togglePreview() {
      this.showPreview = !this.showPreview;
    },
    ajouterProduit() {
      this.produits.push(new Produit("", 0, 1));
    },
    supprimerLigne(index) {
      if (this.produits.length > 1) {
        this.produits.splice(index, 1);
      }
    },
    async sauvegarderFacture() {
      if (!this.isFormValid) {
        showToast("Veuillez remplir tous les champs obligatoires", "error");
        return;
      }

      const invoiceStore = useFacturesStore();
      
      try {
        this.isSaving = true;
        await invoiceStore.creerFactureComplete({
          client: this.client,
          societer: this.societer,
          produits: this.produits,
          reduction: this.utiliseReduction === "oui" ? this.reduction : null,
          suplement: this.suplement,
          date_emission: this.date_emission,
          date_echeance: this.date_echeance,
        });

        showToast("Facture créée avec succès !", "success");
        
        // Reset form after successful creation
        this.resetForm();
        
      } catch (error) {
        console.error("❌ Erreur :", error);
        showToast("Erreur lors de la création de la facture", "error");
      } finally {
        this.isSaving = false;
      }
    },
    resetForm() {
      this.client = { nom: "", email: "", address: "" };
      this.produits = [new Produit("", 0, 1)];
      this.utiliseReduction = "non";
      this.reduction = { type: "pourcentage", valeur: 0 };
      this.suplement = "";
      this.date_emission = new Date().toISOString().substring(0, 10);
      this.date_echeance = "";
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    generateInvoiceNumber() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${year}${month}${day}${random}`;
    }
  },
  mounted() {
    // Auto-calculate due date (30 days from emission date)
    this.$watch('date_emission', (newDate) => {
      if (newDate && !this.date_echeance) {
        const emission = new Date(newDate);
        emission.setDate(emission.getDate() + 30);
        this.date_echeance = emission.toISOString().substring(0, 10);
      }
    });
  }
};
</script>

<style scoped>
/* Animations personnalisées */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Scrollbar personnalisée */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Focus styles améliorés */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Animation de la barre de progression */
@keyframes progressFill {
  from { width: 0%; }
  to { width: var(--progress-width); }
}
</style> 