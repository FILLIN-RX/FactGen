<template>
    <Teleport to="body">
        <Transition name="fade" appear>
            <div v-if="open"
                class="fixed inset-0 bg-[#001C3B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                @click="handleBackdropClick">
                <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-outline-variant flex flex-col"
                    @click.stop>
                    <!-- Header -->
                    <div
                        class="px-8 py-6 border-b border-outline-variant flex items-center justify-between bg-white sticky top-0 z-10">
                        <div class="flex items-center space-x-4">
                            <div
                                class="w-10 h-10 bg-[#D3E4FF] rounded-xl flex items-center justify-center border border-[#005AC1]/10">
                                <UserPlusIcon class="w-5 h-5 text-[#005AC1]" />
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-[#1A1C1E]">{{ form.id ? 'Modifier le client' :
                                    'Nouveau client' }}</h2>
                                <p
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mt-0.5">
                                    Saisie des informations</p>
                            </div>
                        </div>
                        <button @click="$emit('close')"
                            class="p-2 rounded-full hover:bg-[#F8F9FA] text-surface-on-variant transition-colors">
                            <XMarkIcon class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- Form -->
                    <form @submit.prevent="handleSubmit" class="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                        <!-- Nom -->
                        <div class="space-y-1.5">
                            <label for="nom"
                                class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider block">
                                Nom complet ou Entreprise <span class="text-red-500 font-bold">*</span>
                            </label>
                            <input id="nom" v-model="form.nom" type="text" placeholder="Ex: Tech Solutions SAS"
                                class="input-outlined h-12 text-sm"
                                :class="{ 'border-red-500 bg-red-50/10': errors.nom }" required />
                            <p v-if="errors.nom" class="text-[10px] font-bold text-red-600 uppercase">{{ errors.nom }}
                            </p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <!-- Email -->
                            <div class="space-y-1.5">
                                <label for="email"
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider block">
                                    Email de contact
                                </label>
                                <input id="email" v-model="form.email" type="email" placeholder="contact@client.com"
                                    class="input-outlined h-12 text-sm"
                                    :class="{ 'border-red-500 bg-red-50/10': errors.email }" />
                                <p v-if="errors.email" class="text-[10px] font-bold text-red-600 uppercase">{{
                                    errors.email }}</p>
                            </div>

                            <!-- Téléphone -->
                            <div class="space-y-1.5">
                                <label for="telephone"
                                    class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider block">
                                    Téléphone
                                </label>
                                <input id="telephone" v-model="form.telephone" type="tel" placeholder="+33 6 ..."
                                    class="input-outlined h-12 text-sm"
                                    :class="{ 'border-red-500 bg-red-50/10': errors.telephone }" />
                                <p v-if="errors.telephone" class="text-[10px] font-bold text-red-600 uppercase">{{
                                    errors.telephone }}</p>
                            </div>
                        </div>

                        <!-- Adresse -->
                        <div class="space-y-1.5">
                            <label for="adresse"
                                class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider block">
                                Adresse de facturation
                            </label>
                            <textarea id="adresse" v-model="form.adresse" rows="3"
                                placeholder="Numéro, rue, code postal et ville..."
                                class="input-outlined py-3 text-sm resize-none"
                                :class="{ 'border-red-500 bg-red-50/10': errors.adresse }" />
                            <p v-if="errors.adresse" class="text-[10px] font-bold text-red-600 uppercase">{{
                                errors.adresse }}</p>
                        </div>
                    </form>

                    <!-- Footer Actions -->
                    <div
                        class="px-8 py-5 border-t border-outline-variant bg-[#F8F9FA] flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button type="button" @click="$emit('close')"
                            class="btn-text px-6 py-2.5 rounded-xl border border-transparent hover:border-outline-variant transition-all font-bold text-sm text-surface-on-variant">
                            Annuler
                        </button>
                        <button type="submit" @click="handleSubmit" :disabled="isSubmitting"
                            class="btn-filled px-8 py-2.5 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                            <ArrowPathIcon v-if="isSubmitting" class="w-4 h-4 animate-spin" />
                            {{ isSubmitting ? 'Traitement...' : (form.id ? 'Mettre à jour' : 'Enregistrer le client') }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue';
import { UserPlusIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    open: Boolean,
    form: Object
});

const emit = defineEmits(['submit', 'close']);

const isSubmitting = ref(false);
const errors = reactive({
    nom: '',
    email: '',
    telephone: '',
    adresse: ''
});

const validateForm = () => {
    Object.keys(errors).forEach(key => errors[key] = '');
    let isValid = true;

    if (!props.form.nom || props.form.nom.trim().length < 2) {
        errors.nom = 'Le nom est requis';
        isValid = false;
    }

    if (props.form.email && props.form.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(props.form.email)) {
            errors.email = 'Email invalide';
            isValid = false;
        }
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
        isSubmitting.value = true;
        await emit('submit');
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        isSubmitting.value = false;
    }
};

const handleBackdropClick = () => {
    if (!isSubmitting.value) emit('close');
};

watch(() => props.open, (newVal) => {
    if (newVal) {
        nextTick(() => {
            const firstInput = document.getElementById('nom');
            if (firstInput) firstInput.focus();
        });
    }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
