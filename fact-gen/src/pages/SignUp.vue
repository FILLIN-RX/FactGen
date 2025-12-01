<template>
  <div class="h-full bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

    <div class="w-full max-w-md mx-auto">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">

        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl shadow-lg mb-4 transition-all duration-300">
            <router-link to="/">
              <span class="material-symbols-outlined text-white text-2xl">
                assignment
              </span>
            </router-link>

          </div>
          <h1 class="text-3xl font-extrabold text-gray-900 mb-2">Créer un compte</h1>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">

          <div class="space-y-1">
            <label for="email" class="sr-only">Adresse email</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                mail
              </span>
              <input id="email" v-model="form.email" type="email" required placeholder="Adresse email"
                class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }"
                @blur="validateEmail" />

              <span v-if="!errors.email && form.email"
                class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xl">
                check_circle
              </span>
            </div>
            <p v-if="errors.email" class="text-xs text-red-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-base">error</span>
              {{ errors.email }}
            </p>
          </div>

          <div class="space-y-1">
            <label for="password" class="sr-only">Mot de passe</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                lock
              </span>
              <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                minlength="8" placeholder="Mot de passe (min. 8 caractères)"
                class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.password }"
                @input="validatePassword" />

              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <span :class="showPassword ? 'visibility_off' : 'visibility'" class="material-symbols-outlined text-xl">
                </span>
              </button>
            </div>

            <div v-if="form.password" class="pt-1">
              <div class="h-1.5 rounded-full transition-colors duration-300" :class="getStrengthColor(passwordStrength)"
                :style="{ width: `${passwordStrength * 25}%` }">
              </div>
              <p class="text-xs pt-1" :class="getStrengthTextColor(passwordStrength)">
                Force du mot de passe : {{ getStrengthText(passwordStrength) }}
              </p>
            </div>

            <p v-if="errors.password" class="text-xs text-red-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-base">error</span>
              {{ errors.password }}
            </p>
          </div>

          <div class="space-y-1">
            <label for="confirmPassword" class="sr-only">Confirmer le mot de passe</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                lock_reset
              </span>
              <input id="confirmPassword" v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'" required placeholder="Confirmer le mot de passe"
                class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.confirmPassword }"
                @blur="validatePasswordMatch" />

              <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                <span :class="showConfirmPassword ? 'visibility_off' : 'visibility'"
                  class="material-symbols-outlined text-xl">
                </span>
              </button>

              <span v-if="
                !errors.confirmPassword &&
                form.confirmPassword &&
                form.password === form.confirmPassword
              " class="material-symbols-outlined absolute right-12 top-1/2 -translate-y-1/2 text-green-500 text-xl">
                check_circle
              </span>
            </div>
            <p v-if="errors.confirmPassword" class="text-xs text-red-600 flex items-center gap-1">
              <span class="material-symbols-outlined text-base">error</span>
              {{ errors.confirmPassword }}
            </p>
          </div>

          <div class="flex items-start gap-3 pt-2">
            <input id="terms" v-model="form.acceptedTerms" type="checkbox" required
              class="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
            <label for="terms" class="text-sm text-gray-700 leading-5">
              J'accepte les
              <a href="#" class="text-blue-600 hover:text-blue-700 font-medium underline">conditions</a>
              et la
              <a href="#" class="text-blue-600 hover:text-blue-700 font-medium underline">politique de
                confidentialité</a>
            </label>
          </div>

          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-red-500 mr-2 flex-shrink-0 text-xl">warning</span>
              <p class="text-sm text-red-700">{{ errorMessage }}</p>
            </div>
          </div>
          <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-3">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-green-500 mr-2 flex-shrink-0 text-xl">check_circle</span>
              <p class="text-sm text-green-700">{{ successMessage }}</p>
            </div>
          </div>

          <button type="submit" :disabled="isSubmitting || !isFormValid"
            class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200">
            <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-xl">
                how_to_reg
              </span>
              Créer mon compte
            </span>
            <div v-else class="flex items-center justify-center gap-2">
              <span class="material-symbols-outlined animate-spin h-5 w-5 text-white">
                autorenew
              </span>
              Création en cours...
            </div>
          </button>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Ou continuer avec</span>
            </div>
          </div>

          <div class="mt-4">
            <button
              class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-gray-700 font-medium shadow-sm">
              <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </div>
        </div>

        <div class="mt-8 text-center border-t pt-6 border-gray-100">
          <p class="text-sm text-gray-600">
            Déjà un compte ?
            <router-link to="/login" class="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Se connecter ici
            </router-link>
          </p>
        </div>
      </div>
    </div>
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

<style scoped>
/* Assurez-vous d'avoir les styles pour Material Symbols inclus via CDN dans votre index.html */
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  user-select: none;
  /* Empêche la sélection de l'icône */
}

/* Fix pour l'icône visibility_off et visibility */
.material-symbols-outlined.visibility_off::before {
  content: 'visibility_off';
}

.material-symbols-outlined.visibility::before {
  content: 'visibility';
}

/* Animation de transition */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>