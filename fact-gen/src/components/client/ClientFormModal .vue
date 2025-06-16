<template>
  <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Nouveau client</h2>
      
      <form @submit.prevent="$emit('submit')" class="space-y-4">
        <input
          v-model="form.nom"
          type="text"
          placeholder="Nom"
          class="w-full p-2 border rounded"
          required
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="form.adresse"
          type="text"
          placeholder="Adresse"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="form.telephone"
          type="text"
          placeholder="+33 6 12 34 56 78"
          class="w-full p-2 border rounded"
        />
        
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  form: Object
});

defineEmits(['submit', 'close']);
</script>