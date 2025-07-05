<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-6xl mx-auto">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <!-- Left Side - Branding (Hidden on mobile) -->
        <div class="hidden lg:block">
          <div class="text-center lg:text-left">
            <div class="relative">
              <img 
                src="../assets/Facture_moderne_de_Factgen__1_-removebg-preview.png" 
                class="w-full max-w-lg mx-auto lg:mx-0" 
                alt="FactGen - Gestion de factures moderne"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
            </div>
            
            <div class="mt-8 space-y-4">
              <h1 class="text-4xl xl:text-5xl font-bold text-slate-900">
                Bienvenue sur 
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FactGen
                </span>
              </h1>
              <p class="text-xl text-slate-600 leading-relaxed">
                La solution moderne pour gérer vos factures et clients en toute simplicité
              </p>
              
              <!-- Features List -->
              <div class="mt-8 space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-slate-700">Création de factures professionnelles</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-slate-700">Gestion complète des clients</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="text-slate-700">Tableaux de bord et statistiques</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="w-full">
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10">
            <!-- Mobile Logo -->
            <div class="lg:hidden text-center mb-8">
              <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FactGen
              </h1>
              <p class="text-slate-600 mt-2">Gestion moderne de factures</p>
            </div>

            <!-- Form Header -->
            <div class="text-center mb-8">
              <h2 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                Connexion à votre espace
              </h2>
              <p class="text-slate-600">
                Accédez à votre tableau de bord et gérez vos factures
              </p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Email Input -->
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-slate-700">
                  Adresse email
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                    class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white/50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <!-- Password Input -->
              <div class="space-y-2">
                <label for="password" class="text-sm font-medium text-slate-700">
                  Mot de passe
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Votre mot de passe"
                    required
                    minlength="6"
                    class="block w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl bg-white/50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg v-if="showPassword" class="h-5 w-5 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                    </svg>
                    <svg v-else class="h-5 w-5 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-slate-700">
                    Se souvenir de moi
                  </label>
                </div>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-500 font-medium">
                  Mot de passe oublié ?
                </a>
              </div>

              <!-- Login Button -->
              <button
                type="submit"
                class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
            <div class="my-8">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-4 bg-white text-slate-600 font-medium">ou continuer avec</span>
                </div>
              </div>
            </div>

            <!-- Google Login -->
            <button
              @click="signInWithGoogle"
              class="w-full flex justify-center items-center py-3 px-4 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
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
              <p class="text-sm text-slate-600">
                Pas encore de compte ?
                <router-link 
                  to="/signUp" 
                  class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Créer un compte gratuit
                </router-link>
              </p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mt-6">
              <div class="bg-red-50 border border-red-200 rounded-xl p-4">
                <div class="flex">
                  <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm text-red-800">{{ errorMessage }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from "vue-toastification";

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
    await authStore.signIn({
      email: form.email,
      password: form.password
    });
    
    toast.success("Connexion réussie ! Bienvenue.", { timeout: 3000 });
    router.push({ name: 'Real' });
  } catch (error) {
    errorMessage.value = error.message || 'Erreur de connexion';
    toast.error("Échec de la connexion. Vérifiez vos identifiants.", { timeout: 5000 });
  } finally {
    loading.value = false;
  }
}

async function signInWithGoogle() {
  errorMessage.value = '';
  loading.value = true;
  
  try {
    toast.info("Connexion Google en cours...", { timeout: 2000 });
    await authStore.signInWithGoogle();
    toast.success("Connecté avec Google !", { timeout: 3000 });

  } catch (error) {
    toast.error("Échec de la connexion Google. Réessayez.", { timeout: 5000 });
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}

/* Glassmorphism effect */
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>