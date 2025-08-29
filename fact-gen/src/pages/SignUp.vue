<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-center p-4">
    <!-- Background Elements -->
    <header class="relative z-10 p-4 sm:p-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <router-link to="/" class="flex items-center space-x-3 group transition-all duration-300 hover:scale-105">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="hidden sm:block">
            <span
              class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              FactGen
            </span>
            <div class="text-xs text-gray-500 -mt-1">Gestion de factures</div>
          </div>
        </router-link>

        <!-- Bouton retour mobile -->
        <router-link to="/"
          class="sm:hidden flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="text-sm font-medium">Accueil</span>
        </router-link>
      </div>
    </header>
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
    </div>
    <main class="flex-1 flex items-center justify-center p-4 pb-8">
      <div class="relative w-full max-w-6xl mx-auto">
        <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div class="hidden lg:block space-y-8">
            <div class="text-center lg:text-left space-y-6">
              <div class="relative inline-block">
                <img src="../assets/Facture_moderne_de_Factgen__1_-removebg-preview.png"
                  class="w-full max-w-md mx-auto lg:mx-0 drop-shadow-2xl" alt="FactGen - Gestion de factures moderne" />
                <div class="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl"></div>
              </div>

              <div class="space-y-4">
                <h1 class="text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  Bienvenue sur
                  <span
                    class="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent block lg:inline">
                    FactGen
                  </span>
                </h1>
                <p class="text-xl text-gray-600 leading-relaxed max-w-lg">
                  La solution moderne et intuitive pour gérer vos factures et
                  clients en toute simplicité
                </p>
              </div>
            </div>

            <!-- Features List -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4 group">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">
                    Factures professionnelles
                  </h3>
                  <p class="text-sm text-gray-600">
                    Création rapide et personnalisée
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-4 group">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Gestion clients</h3>
                  <p class="text-sm text-gray-600">
                    Suivi complet et historique
                  </p>
                </div>
              </div>

              <div class="flex items-center space-x-4 group">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Analyses avancées</h3>
                  <p class="text-sm text-gray-600">
                    Tableaux de bord et rapports
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative w-full max-w-md">
            <!-- Header -->
            <div class="text-center mb-8">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 class="text-2xl font-bold text-gray-900 mb-2">
                Créer un compte
              </h1>
              <p class="text-gray-600">
                Rejoignez FactGen et gérez vos factures facilement
              </p>
            </div>

            <!-- Form Card -->
            <div class="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-800 overflow-hidden">
              <div class="p-6">
                <form @submit.prevent="handleSubmit" class="space-y-5">
                  <!-- Email Field -->
                  <div class="space-y-2">
                    <label for="email" class="block text-sm font-medium text-gray-700">
                      Adresse email
                    </label>
                    <div class="relative">
                      <input id="email" v-model="form.email" type="email" required placeholder="votre@email.com"
                        class="block w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500 dark:bg-neutral-900"
                        :class="{
                          'border-red-300 focus:border-red-500 focus:ring-red-500':
                            errors.email,
                        }" @blur="validateEmail" />
                      <div v-if="!errors.email && form.email" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div v-if="errors.email" class="text-sm text-red-600 flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                      </svg>
                      {{ errors.email }}
                    </div>
                  </div>

                  <!-- Password Field -->
                  <div class="space-y-2">
                    <label for="password" class="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div class="relative">
                      <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                        minlength="8" placeholder="Minimum 8 caractères"
                        class="block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500 dark:bg-neutral-900"
                        :class="{
                          'border-red-300 focus:border-red-500 focus:ring-red-500':
                            errors.password,
                        }" @input="validatePassword" />
                      <button type="button" @click="showPassword = !showPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L7.758 7.758M12 12l2.122 2.122m-2.122-2.122L14.122 9.878m-2.12 2.122L9.88 14.12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>

                    <!-- Password strength indicator -->
                    <div v-if="form.password" class="mt-2">
                      <div class="flex items-center gap-1 mb-1">
                        <div v-for="i in 4" :key="i" class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                          :class="[
                            i <= passwordStrength
                              ? getStrengthColor(passwordStrength)
                              : 'bg-gray-200',
                          ]"></div>
                      </div>
                      <p class="text-xs" :class="getStrengthTextColor(passwordStrength)">
                        {{ getStrengthText(passwordStrength) }}
                      </p>
                    </div>

                    <div v-if="errors.password" class="text-sm text-red-600 flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                      </svg>
                      {{ errors.password }}
                    </div>
                  </div>

                  <!-- Password Confirmation -->
                  <div class="space-y-2">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                      Confirmer le mot de passe
                    </label>
                    <div class="relative">
                      <input id="confirmPassword" v-model="form.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'" required
                        placeholder="Confirmer votre mot de passe"
                        class="block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500 dark:bg-neutral-900"
                        :class="{
                          'border-red-300 focus:border-red-500 focus:ring-red-500':
                            errors.confirmPassword,
                        }" @blur="validatePasswordMatch" />
                      <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L7.758 7.758M12 12l2.122 2.122m-2.122-2.122L14.122 9.878m-2.12 2.122L9.88 14.12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div v-if="
                        !errors.confirmPassword &&
                        form.confirmPassword &&
                        form.password === form.confirmPassword
                      " class="absolute inset-y-0 right-12 pr-3 flex items-center">
                        <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div v-if="errors.confirmPassword" class="text-sm text-red-600 flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                      </svg>
                      {{ errors.confirmPassword }}
                    </div>
                  </div>

                  <!-- Terms Checkbox -->
                  <div class="flex items-start gap-3 pt-2">
                    <div class="flex items-center h-5 mt-1">
                      <input id="terms" v-model="form.acceptedTerms" type="checkbox" required
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    </div>
                    <label for="terms" class="text-sm text-gray-700 leading-5">
                      J'accepte les
                      <a href="#" class="text-blue-600 hover:text-blue-700 font-medium underline">
                        conditions d'utilisation
                      </a>
                      et la
                      <a href="#" class="text-blue-600 hover:text-blue-700 font-medium underline">
                        politique de confidentialité
                      </a>
                    </label>
                  </div>

                  <!-- Error Message -->
                  <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                      </svg>
                      <p class="text-sm text-red-700">{{ errorMessage }}</p>
                    </div>
                  </div>

                  <!-- Success Message -->
                  <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p class="text-sm text-green-700">{{ successMessage }}</p>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" :disabled="isSubmitting || !isFormValid"
                    class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    :class="{
                      'transform hover:scale-[1.02] active:scale-[0.98]':
                        !isSubmitting && isFormValid,
                    }">
                    <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Créer mon compte
                    </span>
                    <div v-else class="flex items-center justify-center gap-2">
                      <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      Création...
                    </div>
                  </button>
                </form>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 bg-gray-50 dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800">
                <p class="text-center text-sm text-gray-600">
                  Déjà un compte ?
                  <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Se connecter
                  </router-link>
                </p>
              </div>
            </div>

            <!-- Alternative Login Options -->
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-4 bg-transparent text-gray-500 dark:text-neutral-400">Ou continuer avec</span>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-3">
                <button
                  class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors duration-200">
                  <svg class="w-5 h-5 text-gray-700" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>

                <button
                  class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors duration-200">
                  <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

// Form state
const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
});

// UI state
const errors = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});
const errorMessage = ref("");
const successMessage = ref("");
const isSubmitting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Form validation
const isFormValid = computed(() => {
  return (
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.acceptedTerms &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    form.password === form.confirmPassword
  );
});

// Password strength indicator
const passwordStrength = computed(() => {
  if (!form.password) return 0;
  let strength = 0;

  if (form.password.length >= 8) strength++;
  if (/[a-z]/.test(form.password)) strength++;
  if (/[A-Z]/.test(form.password)) strength++;
  if (/[\d\W]/.test(form.password)) strength++;

  return strength;
});

// Helper functions for password strength
const getStrengthColor = (strength) => {
  switch (strength) {
    case 1:
      return "bg-red-400";
    case 2:
      return "bg-yellow-400";
    case 3:
      return "bg-blue-400";
    case 4:
      return "bg-green-400";
    default:
      return "bg-gray-200";
  }
};

const getStrengthTextColor = (strength) => {
  switch (strength) {
    case 1:
      return "text-red-600";
    case 2:
      return "text-yellow-600";
    case 3:
      return "text-blue-600";
    case 4:
      return "text-green-600";
    default:
      return "text-gray-500";
  }
};

const getStrengthText = (strength) => {
  switch (strength) {
    case 0:
      return "Entrez un mot de passe";
    case 1:
      return "Faible";
    case 2:
      return "Moyen";
    case 3:
      return "Fort";
    case 4:
      return "Très fort";
    default:
      return "";
  }
};

// Validation functions
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email) {
    errors.email = "Email requis";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Email invalide";
  } else {
    errors.email = "";
  }
};

const validatePassword = () => {
  if (!form.password) {
    errors.password = "Mot de passe requis";
  } else if (form.password.length < 8) {
    errors.password = "Minimum 8 caractères";
  } else {
    errors.password = "";
  }
  validatePasswordMatch();
};

const validatePasswordMatch = () => {
  if (form.confirmPassword && form.password !== form.confirmPassword) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas";
  } else {
    errors.confirmPassword = "";
  }
};

const validateForm = () => {
  validateEmail();
  validatePassword();
  validatePasswordMatch();
  return !Object.values(errors).some((error) => error);
};

// Form submission
const handleSubmit = async () => {
  errorMessage.value = "";

  if (!validateForm()) {
    errorMessage.value = "Veuillez corriger les erreurs dans le formulaire";
    return;
  }

  if (!form.acceptedTerms) {
    errorMessage.value = "Vous devez accepter les conditions d'utilisation";
    return;
  }

  isSubmitting.value = true;

  try {
    await authStore.signUp({
      email: form.email,
      password: form.password,
    });

    successMessage.value =
      "Inscription réussie! Vérifiez votre email pour confirmer votre compte.";

    // Reset form
    Object.assign(form, {
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    });

    // Optional: Redirect after delay
    setTimeout(() => {
      router.push({ name: "Login" });
    }, 2000);
  } catch (err) {
    errorMessage.value =
      err.message || "Une erreur est survenue lors de l'inscription";
    console.error("Signup error:", err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
