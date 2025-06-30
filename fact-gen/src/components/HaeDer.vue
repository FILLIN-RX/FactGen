<script setup >
import { useAuthStore } from '../stores/auth'
import { onMounted } from 'vue'
const auth = useAuthStore()

onMounted(() => {
  auth.initialize()
})
const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});
</script>

<template>
  <header class="flex  justify-between items-center py-6">
    <div>
      <h1 class="text-3xl font-bold text-neutral-900">Factgen</h1>
    </div>
    <div class="flex items-center space-x-6">
      <span class="text-neutral-600">{{ today }}</span>
      
      <button class="text-neutral-600 hover:text-neutral-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      <button class="text-neutral-600 hover:text-neutral-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
      
      <button class="text-neutral-600 hover:text-neutral-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
      <div>
    <p v-if="auth.user">
      Bonjour {{ auth.user.user_metadata.nom }} ({{ auth.user.email }})
    </p>
  </div>
    </div>
  </header>
</template>