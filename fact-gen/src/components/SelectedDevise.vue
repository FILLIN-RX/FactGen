<template>
  <div class="space-y-2">
    <label for="devise" class="block text-sm font-medium text-gray-700">
      Devise *
    </label>
    <select
      id="devise"
      v-model="selectedDevise"
      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      required
    >
      <option v-for="devise in devises" :key="devise.code" :value="devise">
        {{ devise.symbole }} - {{ devise.nom }} ({{ devise.code }})
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ code: 'EUR', symbole: '€', nom: 'Euro' })
  }
});

const emit = defineEmits(['update:modelValue']);

const devises = ref([
  { code: 'EUR', symbole: '€', nom: 'Euro' },
  { code: 'USD', symbole: '$', nom: 'Dollar américain' },
  { code: 'GBP', symbole: '£', nom: 'Livre sterling' },
  { code: 'JPY', symbole: '¥', nom: 'Yen japonais' },
  { code: 'CAD', symbole: '$', nom: 'Dollar canadien' },
  { code: 'CHF', symbole: 'CHF', nom: 'Franc suisse' },
  { code: 'AUD', symbole: '$', nom: 'Dollar australien' },
  { code: 'CNY', symbole: '¥', nom: 'Yuan chinois' },
  // Ajoutez d'autres devises au besoin
]);

const selectedDevise = ref(
  devises.value.find(d => d.code === props.modelValue.code) || devises.value[0]
);

watch(selectedDevise, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>