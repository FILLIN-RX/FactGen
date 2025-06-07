<template>
  <div
    class="max-w-lg h-150 mx-auto mt-20 pt-16 text-center space-y-5 p-6 bg-white rounded shadow-md"
  >
    <h2 class="text-2xl font-bold mb-4">Connexion a factgen</h2>
  <form @submit.prevent="onSubmit">
    <div class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full border p-2 rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="w-full border p-2 rounded"
      />

      <button
        @click="login"
        class="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-800 transition duration-400"
      >
        Se connecter
      </button>
    </div>
  </form>
  <p class="mt-4">
      Pas encore de compte ?
      <router-link to="/signUp" class="text-blue-600 underline">Inscription</router-link>
    </p>
    <span class="font-bold text-3xl">ou</span>
    <div class="text-center p-5">
      <button
        class="p-3 text- bg-green-400 rounded-md shadow hover:bg-gray-200 duration-300"
      >
        Connexion par google
      </button>
    </div>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase' // assure-toi que ce chemin est correct
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

// Vérifie si l'utilisateur est déjà connecté (optionnel)
onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    router.push({ name: 'accueil' }) // redirection si déjà connecté
  }
})
 
async function onSubmit() {
  errorMessage.value = ''
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMessage.value = error.message
  } else {
    authStore.setUser(data.user) // si tu veux stocker l’utilisateur dans Pinia
    router.push({ name: 'accueil' }) // redirection vers la route nommée "accueil"
  }
}
</script>
