<template>
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Wave background SVG -->
        <svg class="absolute top-0 left-0 w-full h-[700px]" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <path fill="#1E40AF" fill-opacity="1"
                d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,144C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
            </path>
        </svg>

        <!-- Form container -->
        <div
            class="relative z-10 w-full max-w-md sm:max-w-lg px-4 sm:px-6 py-6 sm:py-10 bg-white rounded-3xl shadow-lg sm:shadow-xl sm:border sm:border-gray-100">

            <!-- Header -->
            <div class="text-center mb-6">
                <router-link to="/"
                    class="inline-flex items-center justify-center w-14 h-14 bg-[#1E40AF] rounded-xl shadow-lg mb-4 text-white text-2xl transition-all">
                    <ClipboardDocumentListIcon class="text-white w-8 h-8" />
                </router-link>
                <h1 class="text-3xl font-extrabold text-gray-900">Créer un compte</h1>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-5">

                <!-- Email -->
                <div class="relative">
                    <input type="email" v-model="form.email" placeholder="Adresse email"
                        class="w-full border rounded-lg px-10 py-3 focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
                        :class="{ 'border-red-500': errors.email }" @blur="validateEmail" />
                    <EnvelopeIcon class="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <CheckCircleIcon v-if="!errors.email && form.email"
                        class="absolute right-3 top-3 text-green-500 w-5 h-5" />
                    <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
                </div>

                <!-- Password -->
                <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                        placeholder="Mot de passe (min. 8 caractères)"
                        class="w-full border rounded-lg px-10 py-3 focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
                        :class="{ 'border-red-500': errors.password }" @input="validatePassword" />
                    <LockClosedIcon class="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <button type="button" @click="showPassword = !showPassword"
                        class="absolute right-3 top-3 text-gray-500">
                        <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
                        <EyeIcon v-else class="w-5 h-5" />
                    </button>

                    <!-- Password Strength -->
                    <div v-if="form.password" class="h-1.5 rounded-full mt-2"
                        :class="getStrengthColor(passwordStrength)" :style="{ width: `${passwordStrength * 25}%` }">
                    </div>
                    <p class="text-xs mt-1" :class="getStrengthTextColor(passwordStrength)">Force : {{
                        getStrengthText(passwordStrength) }}</p>
                    <p v-if="errors.password" class="text-xs text-red-600 mt-1">{{ errors.password }}</p>
                </div>

                <!-- Confirm Password -->
                <div class="relative">
                    <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmPassword"
                        placeholder="Confirmer le mot de passe"
                        class="w-full border rounded-lg px-10 py-3 focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
                        :class="{ 'border-red-500': errors.confirmPassword }" @blur="validatePasswordMatch" />
                    <LockClosedIcon class="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute right-3 top-3 text-gray-500">
                        <EyeSlashIcon v-if="showConfirmPassword" class="w-5 h-5" />
                        <EyeIcon v-else class="w-5 h-5" />
                    </button>
                    <span
                        v-if="!errors.confirmPassword && form.confirmPassword && form.password === form.confirmPassword"
                        class="absolute right-10 top-3 text-green-500 w-5 h-5" />
                    <p v-if="errors.confirmPassword" class="text-xs text-red-600 mt-1">{{ errors.confirmPassword }}</p>
                </div>

                <!-- Terms -->
                <div class="flex items-center gap-2">
                    <input type="checkbox" v-model="form.acceptedTerms" class="w-4 h-4">
                    <span class="text-sm">J'accepte les <a href="#"
                            class="text-[#1E40AF] underline">conditions</a></span>
                </div>

                <!-- Submit -->
                <button type="submit"
                    class="w-full bg-[#1E40AF] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition">
                    Créer mon compte
                </button>

                <!-- Messages -->
                <p v-if="errorMessage" class="text-red-600 text-sm mt-1">{{ errorMessage }}</p>
                <p v-if="successMessage" class="text-green-600 text-sm mt-1">{{ successMessage }}</p>

                <!-- Google Login -->
                <div class="mt-4">
                    <button
                        class="w-full flex items-center justify-center py-3 border rounded-lg bg-white hover:bg-gray-50 transition">
                        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                </div>

                <!-- Already have account -->
                <div class="mt-6 text-center border-t pt-4 border-gray-100">
                    <p class="text-sm text-gray-600">
                        Déjà un compte ?
                        <router-link to="/login" class="font-semibold text-[#1E40AF] hover:text-blue-900 transition">
                            Se connecter ici
                        </router-link>
                    </p>
                </div>
            </form>
        </div>


    </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { ClipboardDocumentListIcon, EnvelopeIcon, CheckCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

// Redirection si déjà connecté
onMounted(() => {
    if (authStore.user) router.push({ name: 'Real' });
});

// Form state
const form = reactive({ email: "", password: "", confirmPassword: "", acceptedTerms: false });
const errors = reactive({ email: "", password: "", confirmPassword: "" });
const errorMessage = ref("");
const successMessage = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Password strength
const passwordStrength = computed(() => {
    if (!form.password) return 0;
    let s = 0;
    if (form.password.length >= 8) s++;
    if (/[a-z]/.test(form.password)) s++;
    if (/[A-Z]/.test(form.password)) s++;
    if (/[\d\W]/.test(form.password)) s++;
    return s;
});
const getStrengthColor = (s) => ["bg-gray-200", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"][s];
const getStrengthTextColor = (s) => ["text-gray-500", "text-red-600", "text-yellow-600", "text-blue-600", "text-green-600"][s];
const getStrengthText = (s) => ["Entrez un mot de passe", "Faible", "Moyen", "Fort", "Très fort"][s];

// Validation
const validateEmail = () => { const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; errors.email = !form.email ? "Email requis" : !r.test(form.email) ? "Email invalide" : ""; };
const validatePassword = () => { errors.password = !form.password ? "Mot de passe requis" : form.password.length < 8 ? "Minimum 8 caractères" : ""; validatePasswordMatch(); };
const validatePasswordMatch = () => { errors.confirmPassword = form.confirmPassword && form.password !== form.confirmPassword ? "Les mots de passe ne correspondent pas" : ""; };

// Submit
const handleSubmit = async () => {
    validateEmail(); validatePassword(); validatePasswordMatch();
    if (errors.email || errors.password || errors.confirmPassword || !form.acceptedTerms) {
        errorMessage.value = "Veuillez corriger le formulaire"; successMessage.value = ""; return;
    }
    errorMessage.value = ""; successMessage.value = "Inscription réussie !";
    try {
        await authStore.signUp({ email: form.email, password: form.password });
        setTimeout(() => router.push({ name: "Login" }), 2000);
        Object.assign(form, { email: "", password: "", confirmPassword: "", acceptedTerms: false });
    } catch (err) { errorMessage.value = err.message || "Erreur"; console.error(err); }
};
</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
