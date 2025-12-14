<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  invoiceNumber: { type: String, default: "TEST-1" },
  billingDate: { type: String, default: "" },   // date de facturation
  dueDate: { type: String, default: "" },       // date d'échéance
});

const emit = defineEmits(["update:billingDate", "update:dueDate"]);
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <!-- Gauche -->
    <div class="space-y-3">
      <!-- Numéro de facture -->
      <div>
        <label class="block text-xs text-gray-500">Numéro de facture</label>
        <div class="flex items-center space-x-2">
          <input
            type="text"
            :value="invoiceNumber"
            class="border rounded px-2 py-1 w-32"
            readonly
          />
          <button class="text-blue-600 text-xs hover:underline">Changer</button>
        </div>
      </div>

      <!-- Date de facturation -->
      <div>
        <label class="block text-xs text-gray-500">Date de facturation</label>
        <input
          type="date"
          :value="billingDate"
          @input="emit('update:billingDate', $event.target.value)"
          class="border rounded px-2 py-1 w-full"
        />
      </div>

      <!-- Conditions de paiement -->
      <div>
        <label class="block text-xs text-gray-500">Conditions de paiement</label>
        <select class="border rounded px-2 py-1 w-full">
          <option>30 jours</option>
          <option>60 jours</option>
          <option>À réception</option>
        </select>
      </div>

      <!-- Échéance -->
      <div>
        <label class="block text-xs text-gray-500">Échéance</label>
        <input
          type="date"
          :value="dueDate"
          @input="emit('update:dueDate', $event.target.value)"
          class="border rounded px-2 py-1 w-full"
        />
      </div>

      <!-- Numéro d'engagement -->
      <div>
        <label class="block text-xs text-gray-500">Numéro d'engagement</label>
        <input type="text" placeholder="Ex: BC12345" class="border rounded px-2 py-1 w-full" />
      </div>

      <!-- Code service -->
      <div>
        <label class="block text-xs text-gray-500">Code service</label>
        <input type="text" placeholder="Ex: PRPTLTF974" class="border rounded px-2 py-1 w-full" />
      </div>
    </div>

    <!-- Droite -->
    <div>
      <label class="block text-xs text-gray-500">Message (0/3000)</label>
      <textarea class="w-full h-40 border rounded px-2 py-1"></textarea>
    </div>
  </div>
</template>
