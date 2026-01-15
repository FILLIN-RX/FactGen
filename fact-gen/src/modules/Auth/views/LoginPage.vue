<template>
    <div class="min-h-screen flex items-center justify-center bg-surface p-4">
        <div class="w-full max-w-5xl">
            <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div class="p-4 hidden lg:block">
                    <img src="/assets/undraw_personal-information_h7kf.svg" alt="Illustration de données sécurisées"
                        class="w-full h-auto">
                </div>

                <div class="w-full">
                    <div class="card-elevated p-6 sm:p-10">

                        <div class="text-center mb-8">
                            <div class="inline-flex items-center space-x-3 mb-4">
                                <div
                                    class="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center shadow-elevation-1">
                                    <ClipboardDocumentListIcon class="text-primary-on-container w-7 h-7" />
                                </div>
                                <h2 class="text-headline-large text-surface-on">Connexion</h2>
                            </div>
                            <p class="text-body-medium text-surface-on-variant">Accédez à votre espace de gestion
                                FactGen</p>
                        </div>

                        <form @submit.prevent="onSubmit" class="space-y-5">
                            <div>
                                <label for="email" class="block text-label-large text-surface-on-variant mb-2">Adresse
                                    email</label>
                                <input id="email" v-model="form.email" type="email" placeholder="votre@email.com"
                                    required class="input-outlined" />
                            </div>

                            <div>
                                <label for="password" class="block text-label-large text-surface-on-variant mb-2">Mot de
                                    passe</label>
                                <div class="relative">
                                    <input id="password" v-model="form.password"
                                        :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required
                                        minlength="6" class="input-outlined pr-12" />
                                    <button type="button" @click="showPassword = !showPassword"
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-on-variant hover:text-surface-on transition-colors">
                                        <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
                                        <EyeIcon v-else class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember-me" v-model="rememberMe" type="checkbox"
                                        class="h-4 w-4 text-primary border-outline rounded" />
                                    <label for="remember-me" class="ml-2 block text-body-medium text-surface-on">Se
                                        souvenir</label>
                                </div>
                                <a href="#"
                                    class="text-label-large text-primary hover:text-primary/80 transition-colors">Mot de
                                    passe
                                    oublié ?</a>
                            </div>

                            <button type="submit" class="btn-filled w-full" :disabled="loading">
                                <ArrowPathIcon v-if="loading" class="animate-spin -ml-1 mr-3 w-5 h-5" />
                                {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
                            </button>
                        </form>

                        <div class="my-6 relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full divider"></div>
                            </div>
                            <div class="relative flex justify-center text-body-medium">
                                <span class="px-3 bg-surface-container text-surface-on-variant">ou</span>
                            </div>
                        </div>

                        <button @click="signInWithGoogle" class="btn-outlined w-full" :disabled="loading">
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
                            <p class="text-body-medium text-surface-on-variant">
                                Pas encore de compte ?
                                <router-link to="/signUp"
                                    class="text-label-large text-primary hover:text-primary/80 transition-colors ml-1 underline decoration-1">
                                    Créer un compte
                                </router-link>
                            </p>
                        </div>

                        <div v-if="errorMessage"
                            class="mt-6 p-4 bg-error-container border border-error rounded-lg animate-fade-in">
                            <p class="text-body-medium text-error-on-container font-medium">{{ errorMessage }}</p>
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
