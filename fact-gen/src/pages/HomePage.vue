<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 md:py-20 overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <!-- Left Content -->
          <div class="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div class="space-y-4">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Générateur de 
                <span class="text-blue-600 relative">
                  facture
                  <svg class="absolute -bottom-2 left-0 w-full h-3 text-blue-200" viewBox="0 0 100 12" fill="currentColor">
                    <path d="M0 8c30-6 70-6 100 0v4H0z"/>
                  </svg>
                </span>
                professionnelle
              </h1>
              <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Créez des factures et devis professionnels en toute simplicité. 
                Téléchargez des documents conformes et personnalisés en quelques minutes.
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             <router-link to="/facture">
              <button class="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out">
                <span class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Créer ma facture
                </span>
              </button>
              </router-link> 

            </div>

            <!-- Trust Indicators -->
            <div class="flex items-center justify-center lg:justify-start gap-6 pt-4">
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                Gratuit
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                Sécurisé
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                Conforme
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative">
            <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                class="w-full h-auto rounded-lg"
                src="../assets/Facture_moderne_de_Factgen__1_-removebg-preview.png"
                alt="Aperçu de facture"
                loading="lazy"
              />
            </div>
            <!-- Decorative elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
            <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-12 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Des modèles professionnels
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez parmi notre collection de modèles conçus pour impressionner vos clients
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
            <img
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              src="../assets/9305906.jpg"
              alt="Modèle de facture moderne"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 text-white">
                <p class="font-semibold">Modèle Moderne</p>
                <p class="text-sm opacity-90">Design épuré et professionnel</p>
              </div>
            </div>
          </div>
          
          <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
            <img
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              src="../assets/8414110.jpg"
              alt="Modèle de facture classique"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 text-white">
                <p class="font-semibold">Modèle Classique</p>
                <p class="text-sm opacity-90">Traditionnel et élégant</p>
              </div>
            </div>
          </div>
          
          <div class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 md:col-span-2 lg:col-span-1">
            <img
              class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              src="../assets/8056759.jpg"
              alt="Modèle de facture créatif"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 text-white">
                <p class="font-semibold">Modèle Créatif</p>
                <p class="text-sm opacity-90">Original et distinctif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 md:py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Toutes les fonctionnalités dont vous avez besoin
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Factgen combine simplicité et puissance pour vous offrir une solution complète de facturation
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group bg-white p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <svg class="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Création rapide</h3>
            <p class="text-gray-600 leading-relaxed">
              Générez des factures personnalisées en quelques clics avec logo, mentions légales et export PDF instantané.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group bg-white p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
              <svg class="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Gestion clients</h3>
            <p class="text-gray-600 leading-relaxed">
              Centralisez toutes les informations clients, suivez leur historique et ajoutez des notes personnalisées.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group bg-white p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
              <svg class="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Suivi et statistiques</h3>
            <p class="text-gray-600 leading-relaxed">
              Visualisez vos performances avec un tableau de bord clair et intuitif pour suivre votre activité.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CRM Section -->
    <section class="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
            <!-- Decorative background -->
            <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 transform translate-x-16 -translate-y-16"></div>
            
            <div class="relative z-10">
              <div class="text-center mb-8">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  CRM intégré pour une gestion complète
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                  Centralisez et gérez tous vos clients avec notre solution CRM professionnelle
                </p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 mb-1">Fiches clients complètes</h3>
                      <p class="text-gray-600">Coordonnées, historique et notes personnalisées</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 mb-1">Historique des factures</h3>
                      <p class="text-gray-600">Suivi complet de toutes vos transactions</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 mb-1">Suivi personnalisé</h3>
                      <p class="text-gray-600">Notes internes et rappels automatiques</p>
                    </div>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                  <div class="text-center">
                    <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Gestion centralisée</h3>
                    <p class="text-gray-600 text-sm">
                      Tous vos clients et factures au même endroit pour une meilleure organisation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How to create invoice -->
    <section class="py-12 md:py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comment créer une facture professionnelle ?
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Suivez ces étapes simples pour créer des factures conformes et professionnelles
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h3 class="text-xl font-bold text-gray-900">Création simplifiée</h3>
              </div>
              <p class="text-gray-700 leading-relaxed">
                Utilisez notre générateur de factures gratuit pour créer des documents conformes rapidement. 
                Notre logiciel vous permet de sauvegarder vos données client/produit et de générer une facture 
                en quelques secondes, sans erreur.
              </p>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h3 class="text-xl font-bold text-gray-900">Mentions obligatoires</h3>
              </div>
              <p class="text-gray-700 leading-relaxed">
                Une facture légale doit comporter certaines mentions obligatoires. L'oubli de celles-ci 
                peut entraîner un refus de paiement ou des sanctions. Factgen s'assure que toutes les 
                mentions sont présentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why choose us -->
    <section class="py-12 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Factgen ?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les avantages qui font de Factgen la solution de facturation préférée des professionnels
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Advantage 1 -->
          <div class="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Gain de temps</h3>
              <p class="text-gray-600 leading-relaxed">
                Outil gratuit de facturation avec CRM intégré. Regroupez clients et factures au même endroit 
                pour une efficacité maximale.
              </p>
            </div>
          </div>

          <!-- Advantage 2 -->
          <div class="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Sécurité garantie</h3>
              <p class="text-gray-600 leading-relaxed">
                Gérez vos devis et factures en toute sécurité. Paiements sécurisés et données protégées 
                selon les normes les plus strictes.
              </p>
            </div>
          </div>

          <!-- Advantage 3 -->
          <div class="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Boostez votre CA</h3>
              <p class="text-gray-600 leading-relaxed">
                Ne ratez plus d'opportunités grâce à notre module CRM simple et visuel. Suivez l'activité 
                de vos clients et optimisez votre chiffre d'affaires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Document Management -->
    <section class="py-12 md:py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 shadow-lg">
          <div class="text-center mb-12">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tous vos documents sécurisés au même endroit
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Une solution complète pour gérer, archiver et retrouver facilement vos documents
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Feature 1 -->
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Simplicité</h3>
              <p class="text-gray-600 text-sm">
                Interface intuitive pour créer et gérer vos factures en quelques clics
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Sécurité</h3>
              <p class="text-gray-600 text-sm">
                Protection maximale de vos données avec chiffrement avancé
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Archivage</h3>
              <p class="text-gray-600 text-sm">
                Stockage automatique et accès rapide à vos documents à tout moment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Protection -->
    <section class="py-12 md:py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Vos données sont <span class="text-blue-600">protégées</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Chez Factgen, la confidentialité et la transparence sont au cœur de notre engagement
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <!-- Promise 1 -->
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">Aucune revente de données</h3>
              <p class="text-gray-600">
                Nous garantissons la confidentialité complète de vos informations. Vos données ne seront jamais revendues.
              </p>
            </div>
          </div>

          <!-- Promise 2 -->
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">Aucune publicité ciblée</h3>
              <p class="text-gray-600">
                Vos données ne sont jamais utilisées à des fins publicitaires. Zéro traçage, zéro profilage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Invoice Requirements -->
    <section class="py-12 md:py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Contenu obligatoire d'une facture
              </h2>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Date et numéro de facture</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Identité de l'émetteur et du client</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Montant total et détails ligne par ligne</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Date d'échéance et taux de pénalité</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Modes de paiement disponibles
              </h2>
              <ul class="space-y-3 text-gray-700">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Carte bancaire</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Virement bancaire</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Chèque</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Espèces</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-12 md:py-20 bg-blue-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Foire aux questions
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions les plus fréquentes
            </p>
          </div>

          <div class="space-y-4">
            <div v-for="(item, index) in sections" :key="index" class="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                @click="toggle(index)"
                :aria-expanded="isOpen[index]"
                class="w-full px-6 py-4 flex justify-between items-center text-left text-gray-900 font-semibold hover:bg-blue-50 transition"
              >
                <span>{{ item.title }}</span>
                <span :class="{ 'rotate-180': isOpen[index] }" class="transition-transform duration-300">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </span>
              </button>

              <Transition name="collapse" mode="out-in">
                <div v-if="isOpen[index]" class="px-6 pb-4 text-gray-600">
                  {{ item.content }}
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à simplifier votre facturation ?
          </h2>
          <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Créez votre première facture en moins de 2 minutes. Aucune carte de crédit requise.
          </p>
          <button class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Commencer gratuitement
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProduitForm from "../components/ProduitForm.vue";
import Client from "../models/client";
import FactureTemp from "../components/FactureTemp.vue";
import Produit from "../models/produit";
import FactureModel from "../models/facture";
import factureSauve from "./FactureSauve.vue";
import { ref } from "vue";

export default {
  components: {
    ProduitForm,
    FactureTemp,
    factureSauve,
  },
  data() {
    return {
      facture: new FactureModel(new Client("", "", "")),
      sections: [
        {
          title: "Puis-je mettre mon propre logo sur le modèle de facture?",
          content: "Oui. Sélectionnez la case du logo dans le coin supérieur droit. Ensuite, vous pouvez télécharger votre logo ou le glisser-déposer en place. Les images JPEG et PNG sont prises en charge.",
        },
        {
          title: "Comment puis-je ajouter des remises à ma facture ?",
          content: "Avec Factgen, vous pouvez facilement ajouter une remise à votre facture en saisissant simplement le montant ou le pourcentage dans le champ prévu. Indiquez le type de remise (montant fixe ou pourcentage), et Factgen calculera automatiquement le total réduit pour vous.",
        },
        {
          title: "Puis-je générer une facture PDF?",
          content: "Sur Factgen, un bouton 'Télécharger en PDF' est disponible directement sur chaque facture. Il vous permet de générer instantanément un fichier PDF que vous pouvez enregistrer pour vos dossiers ou envoyer à votre client",
        },
        {
          title: "Puis-je changer la devise?",
          content: "Factgen utilise actuellement une devise par défaut pour vos factures. Si vous souhaitez créer une facture dans une autre devise, cette fonctionnalité est disponible et pout être activée dans les paramètres de votre compte. Vous pouvez choisir parmi plusieurs devises, y compris l'euro, le dollar américain et d'autres.",
        },
        {
          title: "Comment puis-je ajouter des taxes à ma facture?",
          content: "Factgen vous permet d'ajouter facilement des taxes à vos factures. Il vous suffit de sélectionner le type de taxe applicable (TVA, TVA intracommunautaire, etc.) et d'indiquer le taux correspondant. Le montant total sera automatiquement mis à jour pour refléter la taxe appliquée.",
        },
        {
          title: "Comment puis-je envoyer ma facture par e-mail?",
          content: "Une fois que vous avez créé votre facture sur Factgen, vous pouvez l'envoyer directement par e-mail à votre client depuis la plateforme. Il vous suffit de saisir l'adresse e-mail du destinataire et d'ajouter un message personnalisé si nécessaire.",
        },
      ],
      isOpen: [],
    };
  },
  mounted() {
    this.open = this.sections.map(() => false);
  },
  methods: {
    ajouterClient(client) {
      this.facture.client = client;
    },
    ajouterProduit(produit) {
      this.facture.ajouterProduit(produit);
    },
    toggle(index) {
      this.isOpen[index] = !this.isOpen[index];
    },
  },
};
</script>

<style>
/* Animation collapse simple */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>