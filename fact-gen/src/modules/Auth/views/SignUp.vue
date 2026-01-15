<template>
    <div class="relative min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
        <!-- Background Decoration -->
        <div
            class="absolute inset-0 opacity-40 bg-[radial-gradient(#005AC1_0.5px,transparent_0.5px)] [background-size:32px_32px]">
        </div>

        <div
            class="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-xl border border-outline-variant overflow-hidden animate-in fade-in zoom-in duration-500">
            <!-- Top Accent Bar -->
            <div class="h-2 bg-[#005AC1]"></div>

            <div class="p-8 sm:p-12">
                <!-- Header -->
                <div class="text-center mb-10">
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 bg-[#D3E4FF] rounded-2xl shadow-sm mb-6 border border-[#005AC1]/10">
                        <UserPlusIcon class="text-[#005AC1] w-8 h-8" />
                    </div>
                    <h1 class="text-3xl font-black text-[#1A1C1E] tracking-tight">Ouvrir un compte</h1>
                    <p class="text-sm text-surface-on-variant mt-2 font-medium">Rejoignez la solution de facturation
                        intelligente</p>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <!-- Email -->
                    <div class="space-y-1.5">
                        <label
                            class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest ml-1">Adresse
                            email professionnelle</label>
                        <div class="relative">
                            <EnvelopeIcon
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-on-variant" />
                            <input type="email" v-model="form.email" placeholder="nom@entreprise.com"
                                class="w-full h-12 pl-12 pr-10 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                :class="{ 'border-red-500 bg-red-50/10': errors.email }" @blur="validateEmail" />
                            <CheckCircleIcon v-if="!errors.email && form.email"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                        </div>
                        <p v-if="errors.email" class="text-[10px] font-bold text-red-600 uppercase ml-1">{{ errors.email
                            }}</p>
                    </div>

                    <!-- Password -->
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest ml-1">Mot
                            de passe sécurisé</label>
                        <div class="relative">
                            <LockClosedIcon
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-on-variant" />
                            <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                placeholder="8 caractères minimum"
                                class="w-full h-12 pl-12 pr-12 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                :class="{ 'border-red-500 bg-red-50/10': errors.password }" @input="validatePassword" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-surface-on-variant hover:text-[#005AC1]">
                                <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
                                <EyeIcon v-else class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- Password Strength Indicator -->
                        <div v-if="form.password" class="px-1 pt-2">
                            <div class="h-1.5 bg-[#F8F9FA] border border-outline-variant rounded-full overflow-hidden">
                                <div class="h-full transition-all duration-500"
                                    :class="getStrengthColor(passwordStrength)"
                                    :style="{ width: `${passwordStrength * 25}%` }">
                                </div>
                            </div>
                            <div class="flex justify-between items-center mt-1.5">
                                <span class="text-[9px] font-black uppercase tracking-tighter"
                                    :class="getStrengthTextColor(passwordStrength)">Sécurité : {{
                                    getStrengthText(passwordStrength) }}</span>
                                <span v-if="errors.password" class="text-[9px] font-bold text-red-600 uppercase">{{
                                    errors.password }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-1.5">
                        <label
                            class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest ml-1">Confirmation</label>
                        <div class="relative">
                            <LockClosedIcon
                                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-on-variant" />
                            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmPassword"
                                placeholder="Répétez le mot de passe"
                                class="w-full h-12 pl-12 pr-12 bg-[#F8F9FA] border border-outline-variant rounded-xl focus:ring-2 focus:ring-[#005AC1]/20 focus:border-[#005AC1] text-sm font-bold transition-all"
                                :class="{ 'border-red-500 bg-red-50/10': errors.confirmPassword }"
                                @blur="validatePasswordMatch" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-surface-on-variant hover:text-[#005AC1]">
                                <EyeSlashIcon v-if="showConfirmPassword" class="w-5 h-5" />
                                <EyeIcon v-else class="w-5 h-5" />
                            </button>
                        </div>
                        <p v-if="errors.confirmPassword" class="text-[10px] font-bold text-red-600 uppercase ml-1">{{
                            errors.confirmPassword }}</p>
                    </div>

                    <!-- Terms -->
                    <label class="flex items-start gap-3 cursor-pointer group">
                        <div class="relative flex items-center pt-0.5">
                            <input type="checkbox" v-model="form.acceptedTerms" class="sr-only peer">
                            <div
                                class="w-5 h-5 bg-[#F8F9FA] border border-outline-variant rounded-md peer-checked:bg-[#005AC1] peer-checked:border-[#005AC1] transition-all">
                            </div>
                            <CheckIcon
                                class="absolute inset-0 w-3.5 h-3.5 text-white mx-auto my-auto hidden peer-checked:block" />
                        </div>
                        <span class="text-[11px] font-bold text-surface-on-variant leading-tight">
                            J'accepte les <a href="#" class="text-[#005AC1] hover:underline">conditions générales</a> et
                            la <a href="#" class="text-[#005AC1] hover:underline">politique de confidentialité</a>
                        </span>
                    </label>

                    <!-- Submit -->
                    <button type="submit"
                        class="w-full h-14 bg-[#005AC1] hover:bg-[#004494] text-white font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-sm hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                        Créer mon espace
                    </button>

                    <!-- Messages -->
                    <div v-if="errorMessage" class="bg-red-50 border border-red-100 p-3 rounded-xl text-center">
                        <p class="text-[10px] font-bold text-red-600 uppercase">{{ errorMessage }}</p>
                    </div>
                    <div v-if="successMessage" class="bg-green-50 border border-green-100 p-3 rounded-xl text-center">
                        <p class="text-[10px] font-bold text-green-600 uppercase">{{ successMessage }}</p>
                    </div>

                    <!-- Divider -->
                    <div class="relative py-4">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-outline-variant/50"></div>
                        </div>
                        <div
                            class="relative flex justify-center text-[10px] font-bold text-surface-on-variant uppercase px-2 bg-white">
                            ou s'inscrire via</div>
                    </div>

                    <!-- Google Login -->
                    <button type="button"
                        class="w-full flex items-center justify-center h-12 border border-outline-variant rounded-xl bg-white hover:bg-[#F8F9FA] transition-all shadow-sm group">
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
                        <span class="text-sm font-bold text-[#1A1C1E]">Compte Google</span>
                    </button>
                </form>

                <!-- Footer -->
                <div class="mt-10 text-center border-t border-outline-variant/30 pt-6">
                    <p class="text-xs font-medium text-surface-on-variant">
                        Déjà utilisateur ?
                        <router-link to="/login" class="font-bold text-[#005AC1] hover:underline ml-1">
                            Se connecter ici
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import {
    UserPlusIcon, EnvelopeIcon, CheckCircleIcon, LockClosedIcon,
    EyeIcon, EyeSlashIcon, CheckIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => { if (authStore.user) router.push({ name: 'Real' }); });

const form = reactive({ email: "", password: "", confirmPassword: "", acceptedTerms: false });
const errors = reactive({ email: "", password: "", confirmPassword: "" });
const errorMessage = ref("");
const successMessage = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordStrength = computed(() => {
    if (!form.password) return 0;
    let s = 0;
    if (form.password.length >= 8) s++;
    if (/[a-z]/.test(form.password)) s++;
    if (/[A-Z]/.test(form.password)) s++;
    if (/[\d\W]/.test(form.password)) s++;
    return s;
});

const getStrengthColor = (s) => ["bg-outline-variant", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-green-500"][s];
const getStrengthTextColor = (s) => ["text-surface-on-variant", "text-red-600", "text-amber-600", "text-blue-600", "text-green-600"][s];
const getStrengthText = (s) => ["N/A", "Insuffisant", "Moyen", "Bon", "Excellent"][s];

const validateEmail = () => { const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; errors.email = !form.email ? "Email requis" : !r.test(form.email) ? "Format incorrect" : ""; };
const validatePassword = () => { errors.password = !form.password ? "Requis" : form.password.length < 8 ? "8 caractères min." : ""; validatePasswordMatch(); };
const validatePasswordMatch = () => { errors.confirmPassword = form.confirmPassword && form.password !== form.confirmPassword ? "Différent" : ""; };

const handleSubmit = async () => {
    validateEmail(); validatePassword(); validatePasswordMatch();
    if (errors.email || errors.password || errors.confirmPassword || !form.acceptedTerms) {
        errorMessage.value = "Formulaire incomplet"; return;
    }
    errorMessage.value = "";
    try {
        await authStore.signUp({ email: form.email, password: form.password });
        successMessage.value = "Compte créé ! Redirection...";
        setTimeout(() => router.push({ name: "Login" }), 2000);
    } catch (err) { errorMessage.value = err.message || "Erreur lors de l'inscription"; }
};
</script>
