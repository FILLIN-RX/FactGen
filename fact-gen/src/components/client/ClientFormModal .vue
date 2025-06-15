<template>
    <div v-if="open" class="mt-4 bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-2">Nouveau client</h2>
        <form @submit.prevent="ajouterClient" class="space-y-2">
          <input
            v-model="clientForm.nom"
            type="text"
            placeholder="Nom"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.email"
            type="email"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.adresse"
            type="text"
            placeholder="Adresse"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.telephone"
            type="text"
            placeholder="+33 6 12 34 56 78"
            class="w-full p-2 border rounded"
          />
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded"
            >
              Ajouter
            </button>
            <button
              @click="open = false"
              type="button"
              class="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
</template>