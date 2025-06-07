<!-- src/components/Signup.vue -->
<template>
  <div class="max-w-md pt-26 mx-auto p-4">
    <h2 class="text-2xl mb-4">Inscription</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="block mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="border rounded px-2 py-1 w-full"
        />
      </div>
      <div class="mb-3">
        <label class="block mb-1">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          required
          class="border rounded px-2 py-1 w-full"
        />
      </div>
      <div v-if="errorMessage" class="text-red-500 mb-2">{{ errorMessage }}</div>
      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        S’inscrire
      </button>
    </form>
    <p class="mt-4">
      Déjà un compte ?
      <router-link to="/login" class="text-blue-600 underline">Connexion</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const auth = useAuthStore()

async function onSubmit() {
  errorMessage.value = ''
  try {
    await auth.signUp({ email: email.value, password: password.value })
    // Optionnel : tu peux afficher un message “Vérifie ta boîte mail”
    // Redirige vers login ou directement vers Dashboard si tu as auto-connexion
    router.push({ name: 'Login' })
  } catch (err) {
    errorMessage.value = err.message
  }
}
</script>
