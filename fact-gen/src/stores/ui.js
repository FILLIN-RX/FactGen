// src/stores/operations.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOperationsStore = defineStore('operations', () => {
  // State for controlling the visibility of the new invoice modal
  const showNewInvoiceModal = ref(false);

  // State for controlling the visibility of the new client modal
  const showNewClientModal = ref(false);

  // Action to open the new invoice modal
  function openNewInvoiceModal() {
    showNewInvoiceModal.value = true;
  }

  // Action to close the new invoice modal
  function closeNewInvoiceModal() {
    showNewInvoiceModal.value = false;
  }

  // Action to open the new client modal
  function openNewClientModal() {
    showNewClientModal.value = true;
  }

  // Action to close the new client modal
  function closeNewClientModal() {
    showNewClientModal.value = false;
  }

  return {
    showNewInvoiceModal,
    showNewClientModal,
    openNewInvoiceModal,
    closeNewInvoiceModal,
    openNewClientModal,
    closeNewClientModal
  };
});