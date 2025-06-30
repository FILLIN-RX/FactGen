<template>
  <div class="flex lg:p-5 justify-between items-center lg:m-10 m-2 lg:mt-40 lg:bg-blue-100  rounded-xl lg:shadow">
    <div class="lg:w-1/2 hidden lg:block ">
        <img src="../assets/Facture_moderne_de_Factgen__1_-removebg-preview.png" class="w-full" alt="">
    </div>
  
  <div class="max-w-lg h-150 mx-auto mt-20 pt-16 text-center space-y-5 p-6 bg-white rounded shadow-md ">
    <h2 class="text-2xl font-bold mb-4">Connexion à Factgen</h2>
    
    <!-- Login Form -->
    <form @submit.prevent="onSubmit">
      <div class="space-y-4">
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="w-full border p-2 rounded"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Mot de passe"
          required
          minlength="6"
          class="w-full border p-2 rounded"
        />

        <button
          type="submit"
          class="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-800 transition duration-400"
          :disabled="loading"
        >
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </div>
    </form>

    <!-- Signup Link -->
    <p class="mt-4">
      Pas encore de compte ?
      <router-link to="/signUp" class="text-blue-600 underline">Inscription</router-link>
    </p>

    <!-- Separator -->
    <span class="font-bold text-3xl">ou</span>

    <!-- Google Login -->
    <div class="text-center p-5">
      <button
        @click="signInWithGoogle"
        class="p-3 text-white bg-green-400 rounded-md shadow hover:bg-green-500 duration-300"
        :disabled="loading"
      >
        Connexion par Google
      </button>
    </div>

    <!-- Error Message -->
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from "vue-toastification";
// Exemple avec fetch dans un composant Vue
const toast=useToast();
const router = useRouter()
const authStore = useAuthStore()

// Form state
const form = reactive({
  email: '',
  password: ''
})

// UI state
const errorMessage = ref('')
const loading = ref(false)

// Check if user is already logged in
authStore.initialize()

// Email/password login
async function onSubmit() {
  errorMessage.value = ''
  loading.value = true
  
  try {
    await authStore.signIn({
      email: form.email,
      password: form.password
    })
    router.push({ name: 'Real' })
  } catch (error) {
    errorMessage.value = error.message || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}

async function signInWithGoogle() {
  errorMessage.value = '';
  loading.value = true;
  try {
    toast.info("Connexion Google en cours...", { timeout: 2000 });
    await authStore.signInWithGoogle();
    toast.success("Connecté avec Google !", { timeout: 3000 });
    router.push({ name: 'Real' });
  } catch (error) {
    toast.error("Échec de la connexion Google. Réessayez.", { 
      timeout: 5000,
    });
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>