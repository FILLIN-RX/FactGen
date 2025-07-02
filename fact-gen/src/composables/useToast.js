// toast.js
import { ref } from 'vue'

const toast = ref({
  message: '',
  type: 'info',
  visible: false,
  duration: 4000,
  persistent: false,
  closable: true,
  description: '',
})

function showToast({ message, type = 'info', duration = 4000, description = '' }) {
  toast.value = {
    message,
    type,
    visible: true,
    duration,
    description,
    persistent: false,
    closable: true,
  }

  if (!toast.value.persistent) {
    setTimeout(() => {
      toast.value.visible = false
    }, duration)
  }
}

export { toast, showToast }
