<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div 
        v-if="open" 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
        @click="handleBackdropClick"
      >
        <div 
          class="bg-white w-full sm:w-auto sm:min-w-[400px] sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Nouveau client</h2>
            </div>
            <button
              @click="$emit('close')"
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Fermer"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
            <!-- Nom -->
            <div class="space-y-2">
              <label for="nom" class="block text-sm font-medium text-gray-700">
                Nom complet <span class="text-red-500">*</span>
              </label>
              <input
                id="nom"
                v-model="form.nom"
                type="text"
                placeholder="Jean Dupont"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.nom }"
                required
              />
              <p v-if="errors.nom" class="text-sm text-red-600">{{ errors.nom }}</p>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="jean.dupont@example.com"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- Téléphone -->
            <div class="space-y-2">
              <label for="telephone" class="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                id="telephone"
                v-model="form.telephone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.telephone }"
              />
              <p v-if="errors.telephone" class="text-sm text-red-600">{{ errors.telephone }}</p>
            </div>

            <!-- Adresse -->
            <div class="space-y-2">
              <label for="adresse" class="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <textarea
                id="adresse"
                v-model="form.adresse"
                rows="3"
                placeholder="123 Rue de la Paix, 75001 Paris"
                class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 resize-none"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': errors.adresse }"
              />
              <p v-if="errors.adresse" class="text-sm text-red-600">{{ errors.adresse }}</p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                @click="$emit('close')"
                class="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              >
                <svg 
                  v-if="isSubmitting" 
                  class="w-4 h-4 animate-spin" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                {{ isSubmitting ? 'Ajout...' : 'Ajouter le client' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch ,nextTick } from 'vue';

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

// Validation des champs
const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });

  let isValid = true;

  // Validation nom
  if (!props.form.nom || props.form.nom.trim().length < 2) {
    errors.nom = 'Le nom doit contenir au moins 2 caractères';
    isValid = false;
  }

  // Validation email
  if (props.form.email && props.form.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(props.form.email)) {
      errors.email = 'Format d\'email invalide';
      isValid = false;
    }
  }

  // Validation téléphone
  if (props.form.telephone && props.form.telephone.trim()) {
    const phoneRegex = /^(?:\+33|0)[1-9](?:[0-9]{8})$/;
    const cleanPhone = props.form.telephone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.telephone = 'Format de téléphone invalide';
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
    console.error('Erreur lors de l\'ajout du client:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleBackdropClick = () => {
  if (!isSubmitting.value) {
    emit('close');
  }
};

// Focus sur le premier champ quand le modal s'ouvre
watch(() => props.open, (newVal) => {
  if (newVal) {
    nextTick(() => {
      const firstInput = document.getElementById('nom');
      if (firstInput) {
        firstInput.focus();
      }
    });
  }
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Animation pour mobile */
@media (max-width: 640px) {
  .modal-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }
  
  .modal-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>