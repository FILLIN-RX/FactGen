<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div class="w-full max-w-5xl">
            <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div class="p-4 hidden lg:block">
                    <img src="/assets/undraw_personal-information_h7kf.svg" alt="Illustration de données sécurisées"
                        class="w-full h-auto">
                </div>

                <div class="w-full">
                    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">

                        <div class="text-center mb-8">
                            <div class="inline-flex items-center space-x-2 mb-3">
                                <div
                                    class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <ClipboardDocumentListIcon class="text-white w-8 h-8" />
                                </div>
                                <h2 class="text-3xl font-bold text-gray-900">Connexion</h2>
                            </div>
                            <p class="text-gray-500 text-sm">Accédez à votre espace de gestion FactGen</p>
                        </div>

                        <form @submit.prevent="onSubmit" class="space-y-6">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Adresse
                                    email</label>
                                <input id="email" v-model="form.email" type="email" placeholder="votre@email.com"
                                    required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition shadow-sm" />
                            </div>

                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de
                                    passe</label>
                                <div class="relative">
                                    <input id="password" v-model="form.password"
                                        :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required
                                        minlength="6"
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10 transition shadow-sm" />
                                    <button type="button" @click="showPassword = !showPassword"
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                        <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
                                        <EyeIcon v-else class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember-me" v-model="rememberMe" type="checkbox"
                                        class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                    <label for="remember-me" class="ml-2 block text-sm text-gray-700">Se
                                        souvenir</label>
                                </div>
                                <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">Mot de passe
                                    oublié ?</a>
                            </div>

                            <button type="submit"
                                class="w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition shadow-md"
                                :disabled="loading">
                                <ArrowPathIcon v-if="loading" class="animate-spin -ml-1 mr-3 text-white w-5 h-5" />
                                {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
                            </button>
                        </form>

                        <div class="my-6 relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-200"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-3 bg-white text-gray-500">ou</span>
                            </div>
                        </div>

                        <button @click="signInWithGoogle"
                            class="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-sm"
                            :disabled="loading">
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
                            Continuer avec Google
                        </button>

                        <div class="mt-8 text-center">
                            <p class="text-sm text-gray-600">
                                Pas encore de compte ?
                                <router-link to="/signUp"
                                    class="font-semibold text-blue-600 hover:text-blue-700 transition ml-1">
                                    Créer un compte
                                </router-link>
                            </p>
                        </div>

                        <div v-if="errorMessage"
                            class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                            <p class="text-sm text-red-800 font-medium">{{ errorMessage }}</p>
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
import { useAuthStore } from '../stores/auth.store'
import { useToast } from "vue-toastification";
import { showToastMessage } from '@/composables/useToast';
import { ClipboardDocumentListIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

// NOTE IMPORTANTE : Le SVG de Google est réintégré directement dans le template.

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
        showToastMessage("Échec de la connexion. Réessayez.", 'error');
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
        showToastMessage("Échec de la connexion Google. Réessayez.", 'error');
        errorMessage.value = error.message;
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
/* Styles minimalistes pour l'animation et le look 'pro' */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}

/* Transitions plus courtes et pro */
* {
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
