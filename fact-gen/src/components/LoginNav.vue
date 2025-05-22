<template>
    <header class="navbar bg-white dark:bg-backgroundDark dark:border-b dark:border-primary/10 sticky top-0 z-10 shadow-sm">
      <nav class="flex-none lg:hidden">
        <label @click="$emit('toggle-drawer')" class="btn btn-square btn-ghost">
          <Icon icon="mdi:menu" class="inline-block w-15 h-5" />
        </label>
      </nav>
    </header>
  </template>
  
  <script setup>
  defineEmits(['toggle-drawer'])
  
  </script>
  