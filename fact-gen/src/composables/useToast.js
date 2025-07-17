// src/composables/useToast.js
import { ref } from "vue";

const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success"); // success | error | warning | info

export function showToastMessage(message, type = "success", duration = 4000) {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, duration);
}

export function useToastState() {
  return {
    showToast,
    toastMessage,
    toastType,
  };
}
