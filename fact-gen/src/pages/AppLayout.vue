<template>
    <div>
      <!-- Topbar -->
      <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 class="text-lg font-bold">🧾 FactGen</h1>
  
        <div class="flex items-center gap-4">
          <span class="text-sm">👋 {{ utilisateur?.email }}</span>
          <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">
            Se déconnecter
          </button>
        </div>
      </header>
  
      <!-- Page content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppLayout',
    data() {
      return {
        utilisateur: null
      }
    },
    created() {
      this.utilisateur = JSON.parse(localStorage.getItem('utilisateurConnecte'))
    },
    methods: {
      logout() {
        localStorage.removeItem('utilisateurConnecte')
        this.$router.push('/login')
      }
    }
  }
  </script>
  