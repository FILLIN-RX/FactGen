<template>
  <transition name="slide-fade">
    <div v-if="visible" :class="['duolingo-toast', type]">
      <span class="icon">{{ icon }}</span>
      <span class="message">{{ message }}</span>
      <button class="close" @click="visible = false">×</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  message: String,
  type: { type: String, default: 'success' }, // success, error, warning, info
  duration: { type: Number, default: 3000 }
})

const visible = ref(true)

const icon = computed(() => {
  switch (props.type) {
    case 'success': return '✅'
    case 'error': return '❌'
    case 'warning': return '⚠️'
    default: return 'ℹ️'
  }
})

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})
</script>

<style scoped>
.duolingo-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  z-index: 9999;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  min-width: 280px;
}

.success {
  background: linear-gradient(to right, #22c55e, #16a34a);
}
.error {
  background: linear-gradient(to right, #ef4444, #dc2626);
}
.warning {
  background: linear-gradient(to right, #f59e0b, #d97706);
}
.info {
  background: linear-gradient(to right, #3b82f6, #2563eb);
}

.icon {
  font-size: 1.2rem;
}

.close {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
