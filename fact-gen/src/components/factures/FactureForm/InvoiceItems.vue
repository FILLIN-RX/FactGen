<template>
  <div class="mt-6">
    <h2 class="text-sm font-medium mb-2">Produits / Services</h2>
    <table class="w-full border text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="p-2">Description</th>
          <th class="p-2">Type</th>
          <th class="p-2">Date</th>
          <th class="p-2">Qté</th>
          <th class="p-2">Unité</th>
          <th class="p-2">Prix</th>
          <th class="p-2">TVA</th>
          <th class="p-2">Montant</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i" class="border-t">
          <td><input v-model="item.description" class="w-full border p-1" /></td>
          <td>
            <select v-model="item.type" class="w-full border p-1">
              <option>Biens</option>
              <option>Services</option>
            </select>
          </td>
          <td><input type="date" v-model="item.date" class="border p-1" /></td>
          <td><input type="number" v-model.number="item.qty" class="w-16 border p-1" /></td>
          <td><input v-model="item.unit" class="w-16 border p-1" /></td>
          <td><input type="number" v-model.number="item.price" class="w-20 border p-1" /></td>
          <td>
            <select v-model.number="item.vat" class="border p-1">
              <option value="0">0 %</option>
              <option value="5">5 %</option>
              <option value="20">20 %</option>
            </select>
          </td>
          <td class="text-right pr-2">
            {{ (item.qty * item.price * (1 + item.vat/100)).toFixed(2) }} €
          </td>
          <td><button @click="removeItem(i)" class="text-red-600">✕</button></td>
        </tr>
      </tbody>
    </table>

    <button @click="addItem" class="mt-3 px-3 py-1 bg-green-600 text-white rounded">
      Ajouter une ligne
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({ modelValue: Array });
const emit = defineEmits(["update:modelValue"]);

const items = props.modelValue;

function addItem() {
  items.push({ description: "", type: "Biens", date: new Date().toISOString().substr(0, 10), qty: 1, unit: "h", price: 0, vat: 0 });
  emit("update:modelValue", items);
}

function removeItem(index) {
  items.splice(index, 1);
  emit("update:modelValue", items);
}
</script>
