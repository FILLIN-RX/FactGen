<template>
  <div class="max-w-md mx-auto pt-40 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">Créer un compte</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="votre@email.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.email }"
          @blur="validateEmail"
        >
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          minlength="8"
          placeholder="••••••••"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.password }"
          @input="validatePassword"
        >
        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
        <div class="mt-2">
          <div class="flex items-center gap-2 mb-1">
            <div :class="[passwordStrength >= 1 ? 'bg-green-500' : 'bg-gray-200']" class="h-1 w-1/4 rounded-full"></div>
            <div :class="[passwordStrength >= 2 ? 'bg-green-500' : 'bg-gray-200']" class="h-1 w-1/4 rounded-full"></div>
            <div :class="[passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200']" class="h-1 w-1/4 rounded-full"></div>
            <div :class="[passwordStrength >= 4 ? 'bg-green-500' : 'bg-gray-200']" class="h-1 w-1/4 rounded-full"></div>
          </div>
          <p class="text-xs text-gray-500">
            Le mot de passe doit contenir au moins 8 caractères avec des majuscules, minuscules et chiffres
          </p>
        </div>
      </div>

      <!-- Password Confirmation -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          required
          placeholder="••••••••"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.confirmPassword }"
          @blur="validatePasswordMatch"
        >
        <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
      </div>

      <!-- Terms Checkbox -->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="terms"
            v-model="form.acceptedTerms"
            type="checkbox"
            required
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          >
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="font-medium text-gray-700">
            J'accepte les <a href="#" class="text-blue-600 hover:underline">conditions d'utilisation</a>
          </label>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="p-3 text-sm text-red-700 bg-red-100 rounded-md">
        {{ errorMessage }}
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="p-3 text-sm text-green-700 bg-green-100 rounded-md">
        {{ successMessage }}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isSubmitting">S'inscrire</span>
        <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </form>

    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Déjà un compte ?
        <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          Se connecter
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form state
const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false
})

// UI state
const errors = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})
const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

// Password strength indicator
const passwordStrength = computed(() => {
  if (!form.password) return 0
  let strength = 0
  
  // Length check
  if (form.password.length >= 8) strength++
  
  // Contains lowercase
  if (/[a-z]/.test(form.password)) strength++
  
  // Contains uppercase
  if (/[A-Z]/.test(form.password)) strength++
  
  // Contains number
  if (/\d/.test(form.password)) strength++
  
  return strength
})

// Validation functions
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Email requis'
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Email invalide'
  } else {
    errors.email = ''
  }
}

const validatePassword = () => {
  if (!form.password) {
    errors.password = 'Mot de passe requis'
  } else if (form.password.length < 8) {
    errors.password = 'Minimum 8 caractères'
  } else {
    errors.password = ''
  }
  validatePasswordMatch()
}

const validatePasswordMatch = () => {
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
  } else {
    errors.confirmPassword = ''
  }
}

const validateForm = () => {
  validateEmail()
  validatePassword()
  validatePasswordMatch()
  return !Object.values(errors).some(error => error)
}

// Form submission
const handleSubmit = async () => {
  errorMessage.value = ''
  
  if (!validateForm()) {
    errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire'
    return
  }

  if (!form.acceptedTerms) {
    errorMessage.value = 'Vous devez accepter les conditions d\'utilisation'
    return
  }

  isSubmitting.value = true

  try {
    await authStore.signUp({
      email: form.email,
      password: form.password
    })
    
    successMessage.value = 'Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte.'
    
    // Reset form
    form.email = ''
    form.password = ''
    form.confirmPassword = ''
    form.acceptedTerms = false
    
    // Optional: Redirect after delay
    setTimeout(() => {
      router.push({ name: 'Login' })
    }, 3000)
    
  } catch (err) {
    errorMessage.value = err.message || 'Une erreur est survenue lors de l\'inscription'
    console.error('Signup error:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>