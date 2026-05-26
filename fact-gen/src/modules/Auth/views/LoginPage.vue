<template>
  <div class="min-h-screen flex items-center justify-center bg-surface p-4">
    <div class="w-full max-w-5xl">
      <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        <div class="p-4 hidden lg:block">
          <img src="/assets/undraw_personal-information_h7kf.svg" alt="" class="w-full h-auto" />
        </div>

        <div class="w-full">
          <div class="rounded-2xl bg-white p-8 sm:p-10 shadow-lg border border-gray-100">
            <div class="text-center mb-8">
              <n-icon size="48" color="#1E40AF">
                <ClipboardDocumentListIcon />
              </n-icon>
              <h2 class="text-2xl font-bold text-[#1A1C1E] mt-4">Connexion</h2>
              <p class="text-sm text-gray-500 mt-1">Accédez à votre espace de gestion FactGen</p>
            </div>

            <n-form @submit.prevent="onSubmit" :model="form">
              <n-form-item label="Adresse email" path="email">
                <n-input v-model:value="form.email" placeholder="votre@email.com" />
              </n-form-item>

              <n-form-item label="Mot de passe" path="password">
                <n-input
                  v-model:value="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  show-password-on="click"
                >
                  <template #password-visible-icon>
                    <n-icon><EyeSlashIcon /></n-icon>
                  </template>
                  <template #password-invisible-icon>
                    <n-icon><EyeIcon /></n-icon>
                  </template>
                </n-input>
              </n-form-item>

              <div class="flex items-center justify-between mb-4">
                <n-checkbox v-model:checked="rememberMe">Se souvenir</n-checkbox>
                <n-button text type="primary">Mot de passe oublié ?</n-button>
              </div>

              <n-button type="primary" attr-type="submit" block :loading="loading" size="large">
                {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
              </n-button>
            </n-form>

            <n-divider>ou</n-divider>

            <n-button @click="signInWithGoogle" block :loading="loading" size="large">
              <template #icon>
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </template>
              Continuer avec Google
            </n-button>

            <div class="mt-8 text-center">
              <p class="text-sm text-gray-500">
                Pas encore de compte ?
                <router-link to="/signUp" class="font-bold text-primary ml-1">Créer un compte</router-link>
              </p>
            </div>

            <n-alert v-if="errorMessage" type="error" :title="errorMessage" closable class="mt-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { showToastMessage } from "@/composables/useToast";
import { ClipboardDocumentListIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({ email: "", password: "" });
const errorMessage = ref("");
const loading = ref(false);
const showPassword = ref(false);
const rememberMe = ref(false);

authStore.initialize();

async function onSubmit() {
  errorMessage.value = "";
  loading.value = true;
  try {
    showToastMessage("Connexion en cours...", "level");
    await authStore.signIn({ email: form.email, password: form.password });
    showToastMessage("Connecté avec succès !", "success");
    router.push({ name: "Real" });
  } catch (error) {
    showToastMessage("Échec de la connexion.", "error");
    errorMessage.value = error.message || "Erreur de connexion";
  } finally {
    loading.value = false;
  }
}

async function signInWithGoogle() {
  errorMessage.value = "";
  loading.value = true;
  try {
    showToastMessage("Connexion Google...", "level");
    await authStore.signInWithGoogle();
    showToastMessage("Connecté avec Google !", "success");
  } catch (error) {
    showToastMessage("Échec de la connexion Google.", "error");
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>
