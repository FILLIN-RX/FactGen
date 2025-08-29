<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
    <!-- Header avec logo/bouton retour -->
    <header class="relative z-10 p-4 sm:p-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <router-link 
          to="/" 
          class="flex   items-center space-x-3 group transition-all duration-300 hover:scale-105"
        >
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="hidden sm:block">
            <span class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              FactGen
            </span>
            <div class="text-xs ext-gray-500 -mt-1">Gestion de factures</div>
          </div>
        </router-link>
        
        <!-- Bouton retour mobile -->
        <router-link 
          to="/" 
          class="sm:hidden flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span class="text-sm font-medium">Accueil</span>
        </router-link>
      </div>
    </header>

    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80  rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"></div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center p-4 pb-8">
      <div class="relative w-full max-w-6xl mx-auto">
        <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
         

          <!-- Right Side - Login Form -->
          <div class="w-full">
            <div class="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <!-- Decorative elements -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <!-- Mobile Logo -->
              <div class="lg:hidden text-center mb-8">
                <div class="inline-flex items-center space-x-3 mb-3">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    FactGen
                  </h1>
                </div>
                <p class="text-gray-600 text-sm sm:text-base">Gestion moderne de factures</p>
              </div>

              <!-- Form Header -->
              <div class="text-center lg:mb-8 relative">
                <h2 class="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
                  Connectez-vous
                </h2>
                <p class="text-gray-600 text-sm sm:text-base">
                  Accédez à votre espace de gestion personnalisé
                </p>
              </div>

              <!-- Login Form -->
              <form @submit.prevent="onSubmit" class="space-y-6">
                <!-- Email Input -->
                <div class="space-y-1 lg:space-y-2">
                  <label for="email" class="text-sm font-semibold text-gray-700">
                    Adresse email
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                      </svg>
                    </div>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      class="block w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm focus:shadow-md"
                    />
                  </div>
                </div>

                <!-- Password Input -->
                <div class="space-y-2 lg:space-y-2">
                  <label for="password" class="text-sm font-semibold text-gray-700">
                    Mot de passe
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <input
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••"
                      required
                      minlength="6"
                      class="block w-full pl-12 pr-14 py-4 border border-gray-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm focus:shadow-md"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-2xl transition-colors duration-200"
                    >
                      <svg v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                      </svg>
                      <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      v-model="rememberMe"
                      type="checkbox"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                    />
                    <label for="remember-me" class="ml-3 block text-sm text-gray-700 font-medium">
                      Se souvenir de moi
                    </label>
                  </div>
                  <a href="#" class="text-sm text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-200">
                    Mot de passe oublié ?
                  </a>
                </div>

                <!-- Login Button -->
                <button
                  type="submit"
                  class="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  :disabled="loading"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
                </button>
              </form>

              <!-- Divider -->
              <div class="lg:my-8 my-3">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-6 bg-white dark:bg-neutral-900 text-gray-500 dark:text-neutral-400 font-medium">ou continuer avec</span>
                  </div>
                </div>
              </div>

              <!-- Google Login -->
              <button
                @click="signInWithGoogle"
                class="w-full flex justify-center items-center py-4 px-6 border border-gray-200 dark:border-neutral-700 rounded-2xl text-sm font-semibold text-gray-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md"
                :disabled="loading"
              >
                <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
              </button>

              <!-- Signup Link -->
              <div class="mt-8 text-center">
                <p class="text-sm text-gray-600">
                  Pas encore de compte ?
                  <router-link 
                    to="/signUp" 
                    class="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 ml-1"
                  >
                    Créer un compte gratuit
                  </router-link>
                </p>
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="mt-6">
                <div class="bg-red-50 border border-red-200 rounded-2xl p-4 animate-fade-in">
                  <div class="flex items-start">
                    <svg class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="ml-3">
                      <p class="text-sm text-red-800 font-medium">{{ errorMessage }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <!-- Left Side - Branding (Desktop) -->
          <div class="p-4 hidden lg:block">
              <img src="/assets/undraw_personal-information_h7kf.svg" alt="">
          </div>
        </div>
        
      </div>
    </main>
  </div>
 
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from "vue-toastification";
import { showToastMessage } from '../composables/useToast';

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

// Form state
const form = reactive({
  email: '',
  password: ''
});

// UI state
const errorMessage = ref('');
const loading = ref(false);
const showPassword = ref(false);
const rememberMe = ref(false);

// Check if user is already logged in
authStore.initialize();

// Email/password login
async function onSubmit() {
  errorMessage.value = '';
  loading.value = true;
  
  try {
     showToastMessage("Connexion  en cours...", 'level');
    await authStore.signIn({
      email: form.email,
      password: form.password
    });
    showToastMessage("Connecté avec succès !", 'success');

    router.push({ name: 'Real' });
  } catch (error) {
     showToastMessage("Échec de la connexion Google. Réessayez.",'error');
    errorMessage.value = error.message || 'Erreur de connexion';

  } finally {
    loading.value = false;
  }
}

async function signInWithGoogle() {
  errorMessage.value = '';
  loading.value = true;
  
  try {
    showToastMessage("Connexion Google en cours...", 'level');
    await authStore.signInWithGoogle();
    showToastMessage("Connecté avec Google !", 'success');

  } catch (error) {
    showToastMessage("Échec de la connexion Google. Réessayez.",'error');
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Animations personnalisées */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Transitions fluides */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Responsive font sizing */
@media (max-width: 640px) {
  html {
    font-size: 14px;
  }
}

@media (min-width: 641px) {
  html {
    font-size: 16px;
  }
}

/* Focus states améliorés */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Hover states pour mobile */
@media (hover: hover) {
  button:hover {
    transform: translateY(-2px);
  }
  
  .group:hover .group-hover\:shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}
</style>
