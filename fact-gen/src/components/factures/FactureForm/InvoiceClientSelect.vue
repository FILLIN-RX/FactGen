<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:client"]);

const clientName = ref("");
const clientData = ref({});

function selectClient(client) {
  // client peut être un objet complet { id, nom, address, email }
  clientData.value = client;
  clientName.value = client.nom;
  emit("update:client", clientData.value);
}

function createClient() {
  // si l'utilisateur écrit un nom non existant
  const newClient = {
    id: Date.now(), // juste un id temporaire
    nom: clientName.value,
    address: "",
    email: "",
  };
  selectClient(newClient);
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium mb-2">Client</label>
    <div class="relative flex items-center">
      <input
        v-model="clientName"
        type="text"
        placeholder="Sélectionner ou créer un client"
        class="w-full border rounded-lg px-3 py-2 focus:ring focus:border-blue-500"
      />
      <button @click="createClient" class="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
        ✔
      </button>
    </div>
  </div>
</template>
