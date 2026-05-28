<template>
  <div class="relative min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
    <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#005AC1_0.5px,transparent_0.5px)] [background-size:32px_32px]" />

    <div class="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-xl border overflow-hidden">
      <div class="h-2 bg-[#005AC1]" />

      <div class="p-8 sm:p-12">
        <div class="text-center mb-8">
          <n-icon size="48" color="#005AC1"><UserPlusIcon /></n-icon>
          <n-h1 class="text-2xl font-bold text-[#1A1C1E] mt-4">Ouvrir un compte</n-h1>
          <n-p class="text-sm text-gray-500 mt-1">Rejoignez la solution de facturation intelligente</n-p>
        </div>

        <n-form @submit.prevent="handleSubmit" :model="form">
          <n-form-item label="Adresse email professionnelle" path="email" :feedback="errors.email">
            <n-input v-model:value="form.email" placeholder="nom@entreprise.com" @blur="validateEmail" />
          </n-form-item>

          <n-form-item label="Mot de passe sécurisé" path="password">
            <n-input
              v-model:value="form.password"
              type="password"
              placeholder="8 caractères minimum"
              show-password-on="click"
              @input="validatePassword"
            />
            <template v-if="form.password" #extra>
              <n-progress
                :percentage="passwordStrength * 25"
                :color="strengthColor"
                :height="6"
                :show-indicator="false"
              />
              <span :style="{ color: strengthColor }" class="text-xs font-bold uppercase">
                Sécurité : {{ strengthText }}
              </span>
            </template>
          </n-form-item>

          <n-form-item label="Confirmation" path="confirmPassword" :feedback="errors.confirmPassword">
            <n-input
              v-model:value="form.confirmPassword"
              type="password"
              placeholder="Répétez le mot de passe"
              show-password-on="click"
              @blur="validatePasswordMatch"
            />
          </n-form-item>

          <n-checkbox v-model:checked="form.acceptedTerms" class="mb-4">
            <span class="text-xs">
              J'accepte les <a href="#" class="text-[#005AC1]">conditions générales</a> et la
              <a href="#" class="text-[#005AC1]">politique de confidentialité</a>
            </span>
          </n-checkbox>

          <n-button type="primary" attr-type="submit" block size="large" class="uppercase tracking-widest">
            Créer mon espace
          </n-button>

          <n-alert v-if="errorMessage" type="error" closable class="mt-4" :title="errorMessage" />
          <n-alert v-if="successMessage" type="success" closable class="mt-4" :title="successMessage" />

          <n-divider>ou s'inscrire via</n-divider>

          <n-button block size="large" @click="signInWithGoogle">
            <template #icon>
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </template>
            Compte Google
          </n-button>
        </n-form>

        <div class="mt-8 text-center border-t pt-6">
          <n-p class="text-sm text-gray-500">
            Déjà utilisateur ?
            <router-link to="/login" class="font-bold text-[#005AC1] ml-1">Se connecter ici</router-link>
          </n-p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { UserPlusIcon } from '@heroicons/vue/24/outline';
import { NH1, NP } from "naive-ui";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => { if (authStore.user) router.push({ name: 'Real' }); });

const form = reactive({ email: "", password: "", confirmPassword: "", acceptedTerms: false });
const errors = reactive({ email: "", password: "", confirmPassword: "" });
const errorMessage = ref("");
const successMessage = ref("");

const passwordStrength = computed(() => {
  if (!form.password) return 0;
  let s = 0;
  if (form.password.length >= 8) s++;
  if (/[a-z]/.test(form.password)) s++;
  if (/[A-Z]/.test(form.password)) s++;
  if (/[\d\W]/.test(form.password)) s++;
  return s;
});

const strengthColor = computed(() => ["#d9d9d9", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"][passwordStrength.value]);
const strengthText = computed(() => ["N/A", "Insuffisant", "Moyen", "Bon", "Excellent"][passwordStrength.value]);

const validateEmail = () => {
  const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  errors.email = !form.email ? "Email requis" : !r.test(form.email) ? "Format incorrect" : "";
};
const validatePassword = () => {
  errors.password = !form.password ? "Requis" : form.password.length < 8 ? "8 caractères min." : "";
  validatePasswordMatch();
};
const validatePasswordMatch = () => {
  errors.confirmPassword = form.confirmPassword && form.password !== form.confirmPassword ? "Différent" : "";
};

async function signInWithGoogle() {
  try {
    await authStore.signInWithGoogle();
  } catch (err) {
    errorMessage.value = err.message;
  }
}

const handleSubmit = async () => {
  validateEmail(); validatePassword(); validatePasswordMatch();
  if (errors.email || errors.password || errors.confirmPassword || !form.acceptedTerms) {
    errorMessage.value = "Formulaire incomplet";
    return;
  }
  errorMessage.value = "";
  try {
    await authStore.signUp({ email: form.email, password: form.password });
    successMessage.value = "Compte créé ! Redirection...";
    setTimeout(() => router.push({ name: "Login" }), 2000);
  } catch (err) {
    errorMessage.value = err.message || "Erreur lors de l'inscription";
  }
};
</script>
