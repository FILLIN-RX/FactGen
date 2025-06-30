import { ref } from "vue";

const toast = ref({
  message: "",
  type: "info",
});

function showToast(message, type = "info", duration = 3000) {
  toast.value = { message, type, duration };
}

export { toast, showToast };
