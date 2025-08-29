<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <!-- Hero Section -->
    <section class=" hero bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16 md:py-24 dark:bg-black">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="text-center space-y-8">
          <!-- Titre principal -->
          <div class="space-y-6">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Générateur de 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                facture
              </span>
              professionnelle
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Créez des factures et devis professionnels en toute simplicité. 
              Solution complète avec CRM intégré pour une gestion optimale de votre activité.
            </p>
          </div>
          
          <!-- CTA Button -->
          <div class="flex justify-center pt-4">
            <router-link to="/facture">
              <button class="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center gap-3">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Créer ma facture gratuitement
              </button>
            </router-link>
          </div>

          <!-- Trust Indicators -->
          <div class="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm">
            <div class="flex items-center gap-2 text-gray-600">
              <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="font-medium">100% Gratuit</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="font-medium">Sécurisé</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <div class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="font-medium">Conforme légalement</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistiques -->
    <section class="py-16 bg-white dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-3xl font-bold text-emerald-600">+10k</div>
            <div class="text-gray-600">Factures créées</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-blue-600">99.9%</div>
            <div class="text-gray-600">Taux de satisfaction</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-teal-600">0€</div>
            <div class="text-gray-600">Coût d'utilisation</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités principales -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Solution complète de facturation
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Tous les outils nécessaires pour gérer votre facturation de manière professionnelle
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Fonctionnalité 1 -->
          <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 text-neutral-900 dark:text-neutral-100">
            <div class="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Création rapide</h3>
            <p class="text-gray-600 leading-relaxed">
              Générez vos factures en quelques minutes avec nos modèles professionnels et personnalisables.
            </p>
          </div>

          <!-- Fonctionnalité 2 -->
          <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 text-neutral-900 dark:text-neutral-100">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">CRM intégré</h3>
            <p class="text-gray-600 leading-relaxed">
              Gérez votre base clients avec un CRM simple et efficace. Historique et suivi inclus.
            </p>
          </div>

          <!-- Fonctionnalité 3 -->
          <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 text-neutral-900 dark:text-neutral-100">
            <div class="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Export PDF</h3>
            <p class="text-gray-600 leading-relaxed">
              Téléchargez vos factures au format PDF professionnel, prêtes à être envoyées.
            </p>
          </div>

          <!-- Fonctionnalité 4 -->
          <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 text-neutral-900 dark:text-neutral-100">
            <div class="w-14 h-14 bg-gradient-to-br from-emerald-100 to-blue-200 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Conformité légale</h3>
            <p class="text-gray-600 leading-relaxed">
              Toutes les mentions légales obligatoires incluses automatiquement selon la réglementation.
            </p>
          </div>

          <!-- Fonctionnalité 5 -->
          <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 text-neutral-900 dark:text-neutral-100">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-teal-200 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Suivi et analyse</h3>
            <p class="text-gray-600 leading-relaxed">
              Suivez vos performances avec des statistiques détaillées sur votre activité de facturation.
            </p>
          </div>

          <!-- Fonctionnalité 6 -->
          <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-md transition-shadow duration-300 text-neutral-900 dark:text-neutral-100">
            <div class="w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-200 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Sécurité totale</h3>
            <p class="text-gray-600 leading-relaxed">
              Vos données sont protégées avec un chiffrement de niveau bancaire. Aucune revente de données.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Avantages -->
    <section class="py-20 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Pourquoi choisir Factgen ?
          </h2>
          <p class="text-xl text-gray-600">
            La solution de facturation qui s'adapte à vos besoins
          </p>
        </div>

        <div class="space-y-12">
          <!-- Avantage 1 -->
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/2">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Gain de temps considérable</h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                Créez vos factures en 2 minutes au lieu de 30. Notre interface intuitive et nos modèles 
                pré-configurés vous font gagner un temps précieux à consacrer à votre activité principale.
              </p>
            </div>
            <div class="md:w-1/2">
              <div class="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-2xl">
                <div class="text-center">
                  <div class="text-4xl font-bold text-emerald-600 mb-2">2 min</div>
                  <div class="text-gray-600">pour créer une facture</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Avantage 2 -->
          <div class="flex flex-col md:flex-row-reverse items-center gap-8">
            <div class="md:w-1/2">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Conformité garantie</h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                Toutes vos factures respectent automatiquement la réglementation en vigueur. 
                Mentions obligatoires, numérotation, TVA... Tout est géré pour vous.
              </p>
            </div>
            <div class="md:w-1/2">
              <div class="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
                <div class="text-center">
                  <div class="text-4xl font-bold text-blue-600 mb-2">100%</div>
                  <div class="text-gray-600">conforme légalement</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Avantage 3 -->
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/2">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Augmentez votre CA</h3>
              <p class="text-gray-600 text-lg leading-relaxed">
                Un suivi client efficace et des factures professionnelles augmentent votre crédibilité 
                et facilitent les paiements. Moins d'impayés, plus de recommandations.
              </p>
            </div>
            <div class="md:w-1/2">
              <div class="bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-2xl">
                <div class="text-center">
                  <div class="text-4xl font-bold text-teal-600 mb-2">+25%</div>
                  <div class="text-gray-600">de chiffre d'affaires en moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Questions fréquentes
          </h2>
          <p class="text-xl text-gray-600">
            Tout ce que vous devez savoir sur Factgen
          </p>
        </div>

        <div class="space-y-4">
          <div v-for="(item, index) in sections" :key="index" class="bg-white dark:bg-neutral-900 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-neutral-800">
            <button
              @click="toggle(index)"
              :aria-expanded="isOpen[index]"
              class="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <span class="font-semibold text-gray-900 text-lg">{{ item.title }}</span>
              <div :class="{ 'rotate-180': isOpen[index] }" class="transition-transform duration-300 ml-4">
                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
            </button>

            <Transition name="collapse" mode="out-in">
              <div v-if="isOpen[index]" class="px-6 pb-6 text-gray-600 text-lg leading-relaxed">
                {{ item.content }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center text-white">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Prêt à transformer votre facturation ?
        </h2>
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Rejoignez des milliers de professionnels qui font confiance à Factgen pour leur facturation. 
          Gratuit, sans engagement.
        </p>
        <router-link to="/facture">
          <button class="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
            Commencer maintenant
          </button>
        </router-link>
        
        <div class="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm opacity-75">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>Aucune carte requise</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>Utilisation immédiate</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>Support inclus</span>
          </div>
        </div>
      </div>
    </section>
    <FactureForm />
  </div>

</template>

<script>
import { ref, reactive } from 'vue'

import FactureForm from '../components/FactureForm.vue'


export default {
 
  name: 'FactgenLanding',
  setup() {
    // État réactif pour la FAQ
    const isOpen = reactive({})
    component:{

    }
    // Données de la FAQ
    const sections = ref([
      {
        title: "Factgen est-il vraiment gratuit ?",
        content: "Oui, Factgen est 100% gratuit. Vous pouvez créer un nombre illimité de factures et devis sans aucune restriction. Aucun abonnement caché, aucune période d'essai limitée."
      },
      {
        title: "Mes données sont-elles sécurisées ?",
        content: "Absolument. Nous utilisons un chiffrement de niveau bancaire (SSL 256 bits) pour protéger toutes vos données. Nous ne vendons jamais vos informations et respectons strictement le RGPD."
      },
      {
        title: "Puis-je personnaliser mes factures ?",
        content: "Oui, vous pouvez personnaliser le design de vos factures avec votre logo, vos couleurs et vos informations d'entreprise. Plusieurs modèles professionnels sont disponibles."
      },
      {
        title: "Les factures sont-elles conformes à la loi ?",
        content: "Toutes les factures générées incluent automatiquement les mentions légales obligatoires : numérotation séquentielle, TVA, SIRET, conditions de paiement, etc."
      },
      {
        title: "Puis-je gérer mes clients ?",
        content: "Oui, Factgen inclut un CRM simple pour gérer votre base clients, suivre l'historique des factures et analyser vos performances commerciales."
      },
      {
        title: "Comment exporter mes factures ?",
        content: "Vos factures sont automatiquement générées au format PDF professionnel. Vous pouvez les télécharger, les imprimer ou les envoyer directement par email."
      },
      {
        title: "Y a-t-il une limite au nombre de factures ?",
        content: "Non, il n'y a aucune limite. Créez autant de factures et devis que nécessaire pour votre activité, sans restriction."
      },
      {
        title: "Puis-je utiliser Factgen sur mobile ?",
        content: "Oui, Factgen est entièrement responsive et s'adapte parfaitement aux smartphones et tablettes. Créez vos factures où que vous soyez."
      }
    ])

    // Fonction pour basculer l'état d'ouverture des sections FAQ
    const toggle = (index) => {
      isOpen[index] = !isOpen[index]
    }

    // Animation de scroll vers la section facture
    const scrollToFacture = () => {
      // Si vous utilisez Vue Router, cette fonction sera remplacée par une navigation
      console.log('Navigation vers /facture')
    }

    // Données pour les statistiques animées
    const stats = ref([
      { value: 10000, suffix: '+', label: 'Factures créées', color: 'emerald' },
      { value: 99.9, suffix: '%', label: 'Taux de satisfaction', color: 'blue' },
      { value: 0, suffix: '€', label: 'Coût d\'utilisation', color: 'teal' }
    ])

    // Animation des statistiques au chargement
    const animateStats = () => {
      // Cette fonction pourrait être utilisée pour animer les chiffres
      stats.value.forEach((stat, index) => {
        // Animation des compteurs (implémentation simplifiée)
        console.log(`Animating stat ${index}: ${stat.label}`)
      })
    }

    // Données des fonctionnalités
    const features = ref([
      {
        icon: 'credit-card',
        title: 'Création rapide',
        description: 'Générez vos factures en quelques minutes avec nos modèles professionnels et personnalisables.',
        color: 'emerald'
      },
      {
        icon: 'users',
        title: 'CRM intégré',
        description: 'Gérez votre base clients avec un CRM simple et efficace. Historique et suivi inclus.',
        color: 'blue'
      },
      {
        icon: 'download',
        title: 'Export PDF',
        description: 'Téléchargez vos factures au format PDF professionnel, prêtes à être envoyées.',
        color: 'teal'
      },
      {
        icon: 'shield-check',
        title: 'Conformité légale',
        description: 'Toutes les mentions légales obligatoires incluses automatiquement selon la réglementation.',
        color: 'emerald'
      },
      {
        icon: 'bar-chart',
        title: 'Suivi et analyse',
        description: 'Suivez vos performances avec des statistiques détaillées sur votre activité de facturation.',
        color: 'blue'
      },
      {
        icon: 'lock',
        title: 'Sécurité totale',
        description: 'Vos données sont protégées avec un chiffrement de niveau bancaire. Aucune revente de données.',
        color: 'teal'
      }
    ])

    // Gestion des événements de tracking (pour l'analytique)
    const trackEvent = (eventName, properties = {}) => {
      // Intégration avec Google Analytics ou autre outil d'analyse
      console.log(`Tracking event: ${eventName}`, properties)
    }

    // Gestion du clic sur le CTA principal
    const handleMainCTA = () => {
      trackEvent('cta_click', { location: 'hero' })
      scrollToFacture()
    }

    // Gestion du clic sur le CTA final
    const handleFinalCTA = () => {
      trackEvent('cta_click', { location: 'final' })
      scrollToFacture()
    }

    // Lifecycle - monté
    const onMounted = () => {
      animateStats()
      trackEvent('page_view', { page: 'landing' })
    }

    return {
      // État réactif
      isOpen,
      sections,
      stats,
      features,
      
      // Méthodes
      toggle,
      scrollToFacture,
      animateStats,
      trackEvent,
      handleMainCTA,
      handleFinalCTA,
      onMounted
    }
  },
  
  mounted() {
    this.onMounted()
  }
}
</script>

<style scoped>
/* Animations pour les transitions */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  opacity: 1;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* Animation pour les cartes de fonctionnalités */
.feature-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  transform: translateY(-4px);
}

/* Animation pour les boutons */
.btn-primary {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-1px);
}

/* Animation pour les statistiques */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-item {
  animation: countUp 0.8s ease-out forwards;
}

.stat-item:nth-child(2) {
  animation-delay: 0.2s;
}

.stat-item:nth-child(3) {
  animation-delay: 0.4s;
}

/* Responsive design améliorations */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
.dark .hero{
  background-color: black;
}
/* Animation de gradient pour les backgrounds */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-animated {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

/* Effet de survol pour les liens */
.nav-link {
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Animation de pulsation pour les éléments importants */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse-hover:hover {
  animation: pulse 2s infinite;
}

/* Amélioration de l'accessibilité */
.focus-visible:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Animation pour les icônes */
.icon-container {
  transition: all 0.3s ease;
}

.icon-container:hover {
  transform: rotate(5deg) scale(1.1);
}
</style>
