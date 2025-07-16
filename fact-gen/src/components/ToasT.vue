<template>
  <transition name="duolingo-slide" appear>
    <div v-if="visible" :class="['duolingo-toast', type]" @click="handleClick">
      <div class="toast-content">
        <div class="icon-container">
          <div class="icon" :class="iconClass">
            {{ icon }}
          </div>
        </div>
        <div class="message-container">
          <div class="message">{{ message }}</div>
          <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
        </div>
        <button class="close-btn" @click.stop="close">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6 4.586L10.293.293l1.414 1.414L7.414 6l4.293 4.293-1.414 1.414L6 7.414 1.707 11.707.293 10.293 4.586 6 .293 1.707 1.707.293 6 4.586z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div class="progress-bar" :style="{ animationDuration: duration + 'ms' }"></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  subtitle: { type: String, default: '' },
  type: { type: String, default: 'success' }, // success, error, warning, info, streak
  duration: { type: Number, default: 4000 },
  persistent: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'click'])

const visible = ref(true)
let timeoutId = null

const icon = computed(() => {
  switch (props.type) {
    case 'success': return '🎉'
    case 'error': return '😰'
    case 'warning': return '⚠️'
    case 'info': return 'ℹ️'
    case 'streak': return '🔥'
    case 'level': return '⭐'
    default: return '✨'
  }
})

const iconClass = computed(() => {
  return {
    'bounce': props.type === 'success' || props.type === 'streak',
    'shake': props.type === 'error',
    'pulse': props.type === 'warning'
  }
})

const close = () => {
  visible.value = false
  emit('close')
}

const handleClick = () => {
  emit('click')
}

onMounted(() => {
  if (!props.persistent) {
    timeoutId = setTimeout(() => {
      close()
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.duolingo-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 320px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 9999;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid;
}

.duolingo-toast:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  position: relative;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 20px;
  flex-shrink: 0;
}

.message-container {
  flex: 1;
  min-width: 0;
}

.message {
  font-weight: 700;
  font-size: 16px;
  line-height: 1.3;
  margin: 0;
  color: #2b2b2b;
}

.subtitle {
  font-size: 14px;
  color: #777;
  margin-top: 4px;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  color: #666;
  background: rgba(0, 0, 0, 0.05);
}

.progress-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  animation: progress linear forwards;
  transform-origin: left;
}

/* Types de toast */
.success {
  border-color: #58cc02;
}

.success .icon-container {
  background: #58cc02;
  color: white;
}

.success .progress-bar {
  background: #58cc02;
}

.error {
  border-color: #ff4b4b;
}

.error .icon-container {
  background: #ff4b4b;
  color: white;
}

.error .progress-bar {
  background: #ff4b4b;
}

.warning {
  border-color: #ffc800;
}

.warning .icon-container {
  background: #ffc800;
  color: white;
}

.warning .progress-bar {
  background: #ffc800;
}

.info {
  border-color: #1cb0f6;
}

.info .icon-container {
  background: #1cb0f6;
  color: white;
}

.info .progress-bar {
  background: #1cb0f6;
}

.streak {
  border-color: #ff9600;
}

.streak .icon-container {
  background: #ff9600;
  color: white;
}

.streak .progress-bar {
  background: #ff9600;
}

.level {
  border-color: #ce82ff;
}

.level .icon-container {
  background: #ce82ff;
  color: white;
}

.level .progress-bar {
  background: #ce82ff;
}

/* Animations des icônes */
.icon.bounce {
  animation: bounce 0.6s ease-in-out;
}

.icon.shake {
  animation: shake 0.6s ease-in-out;
}

.icon.pulse {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes progress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

/* Transition d'entrée/sortie */
.duolingo-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.duolingo-slide-leave-active {
  transition: all 0.3s ease-in;
}

.duolingo-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.duolingo-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .duolingo-toast {
    width: calc(100vw - 32px);
    right: 16px;
    left: 16px;
    top: 16px;
  }
}
</style>