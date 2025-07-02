<template>
  <teleport to="body">
    <transition
      name="toast"
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        :class="[toastTypeClasses, positionClasses]"
        class="fixed z-50 flex items-start gap-3 p-4 max-w-sm w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-out cursor-pointer select-none backdrop-blur-[10px]"
        role="alert"
        :aria-live="type === 'error' ? 'assertive' : 'polite'"
        @click="handleClick"
      >
        <!-- Icon -->
        <div class="toast-icon" :class="iconColorClasses">
          <component :is="iconComponent" class="w-5 h-5" />
        </div>

        <!-- Content -->
        <div class="toast-content">
          <p class="toast-message">{{ message }}</p>
          <p v-if="description" class="toast-description">{{ description }}</p>
        </div>

        <!-- Close button -->
        <button
          v-if="closable"
          @click.stop="close"
          class="toast-close-btn"
          :aria-label="$t?.('close') || 'Fermer'"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>

        <!-- Progress bar -->
        <div
          v-if="showProgress && !persistent"
          class="toast-progress"
          :style="{ width: `${progress}%` }"
          :class="progressColorClasses"
        ></div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { toast } from "../composables/useToast";
// Récupération des props depuis le store

const message = computed(() => toast.value.message)
const type = computed(() => toast.value.type)
const description = computed(() => toast.value.description)
const duration = computed(() => toast.value.duration)
const persistent = computed(() => toast.value.persistent)
const closable = computed(() => toast.value.closable)

// Icons (you can replace with your preferred icon library)
const CheckCircleIcon = {
  template:
    '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.23a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>',
};
const ExclamationTriangleIcon = {
  template:
    '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>',
};
const InformationCircleIcon = {
  template:
    '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" /></svg>',
};
const XMarkIcon = {
  template:
    '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>',
};

// Props
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "info",
    validator: (value) =>
      ["success", "error", "warning", "info"].includes(value),
  },
  position: {
    type: String,
    default: "top-right",
    validator: (value) =>
      [
        "top-left",
        "top-right",
        "top-center",
        "bottom-left",
        "bottom-right",
        "bottom-center",
      ].includes(value),
  },
  duration: {
    type: Number,
    default: 4000,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
  clickToClose: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["close", "click"]);

// Reactive data
const visible = ref(false);
const progress = ref(100);
let progressInterval = null;
let hideTimeout = null;

// Computed
const iconComponent = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    error: ExclamationTriangleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon,
  };
  return icons[props.type];
});

const toastTypeClasses = computed(() => {
  const classes = {
    success: "toast-success",
    error: "toast-error",
    warning: "toast-warning",
    info: "toast-info",
  };
  return classes[props.type];
});

const iconColorClasses = computed(() => {
  const classes = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };
  return classes[props.type];
});

const progressColorClasses = computed(() => {
  const classes = {
    success: "bg-green-400",
    error: "bg-red-400",
    warning: "bg-yellow-400",
    info: "bg-blue-400",
  };
  return classes[props.type];
});

const positionClasses = computed(() => {
  const positions = {
    "top-left": "toast-top-left",
    "top-right": "toast-top-right",
    "top-center": "toast-top-center",
    "bottom-left": "toast-bottom-left",
    "bottom-right": "toast-bottom-right",
    "bottom-center": "toast-bottom-center",
  };
  return positions[props.position];
});

// Methods
const show = () => {
  visible.value = true;

  if (!props.persistent) {
    startProgress();
    hideTimeout = setTimeout(() => {
      close();
    }, props.duration);
  }
};

const close = () => {
  visible.value = false;
  clearTimers();
  emit("close");
};

const handleClick = () => {
  emit("click");
  if (props.clickToClose) {
    close();
  }
};

const startProgress = () => {
  if (!props.showProgress) return;

  progress.value = 100;
  const interval = 50; // Update every 50ms
  const decrement = (100 * interval) / props.duration;

  progressInterval = setInterval(() => {
    progress.value -= decrement;
    if (progress.value <= 0) {
      progress.value = 0;
      clearInterval(progressInterval);
    }
  }, interval);
};

const clearTimers = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
};

const pauseTimer = () => {
  clearTimers();
};

const resumeTimer = () => {
  if (!props.persistent && visible.value) {
    const remainingTime = (progress.value / 100) * props.duration;
    if (remainingTime > 0) {
      startProgress();
      hideTimeout = setTimeout(() => {
        close();
      }, remainingTime);
    }
  }
};

// Lifecycle
onMounted(() => {
  show();
});

onUnmounted(() => {
  clearTimers();
});

// Watch for message changes
watch(
  () => props.message,
  () => {
    if (visible.value) {
      clearTimers();
      if (!props.persistent) {
        startProgress();
        hideTimeout = setTimeout(() => {
          close();
        }, props.duration);
      }
    }
  }
);

// Expose methods for parent component
defineExpose({
  show,
  close,
  pauseTimer,
  resumeTimer,
});
</script>

<style scoped>

</style>
