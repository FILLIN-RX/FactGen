import { useMessage } from "naive-ui";

let messageApi = null;

export function initMessage(message) {
  messageApi = message;
}

export function showToastMessage(message, type = "success", duration = 4000) {
  if (!messageApi) {
    console.warn("Naive UI message not initialized", message);
    return;
  }
  const types = {
    success: () => messageApi.success(message, { duration }),
    error: () => messageApi.error(message, { duration }),
    warning: () => messageApi.warning(message, { duration }),
    info: () => messageApi.info(message, { duration }),
    level: () => messageApi.loading(message, { duration }),
  };
  (types[type] || types.success)();
}

export function useToastState() {
  return { showToast: false, toastMessage: "", toastType: "success" };
}
