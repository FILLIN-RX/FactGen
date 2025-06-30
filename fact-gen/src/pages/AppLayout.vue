<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Mobile Navigation Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 z-50 lg:hidden"
      @click="toggleMobileMenu"
    >
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div class="relative w-80 h-full bg-white shadow-2xl transform transition-transform duration-300">
        <LoginNav @close="toggleMobileMenu" />
      </div>
    </div>

    <div class="flex min-h-screen">
      <!-- Desktop Sidebar -->
      <div class="hidden lg:flex lg:w-72 xl:w-80">
        <div class="w-full bg-white border-r border-slate-200 shadow-sm">
          <LoginNav />
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex flex-col flex-1 min-h-screen">
        <!-- Enhanced Header -->
        <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 sm:h-20">
              <!-- Mobile Menu Button -->
              <button
                @click="toggleMobileMenu"
                class="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
              >
                <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              <!-- Logo/Title (Mobile) -->
              <div class="lg:hidden">
                <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FactGen
                </h1>
              </div>

              <!-- Header Content -->
              <div class="flex-1 lg:flex lg:items-center lg:justify-between">
                <HaeDer />
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 overflow-hidden">
          <div class="h-full">
            <!-- Content Container with proper spacing -->
            <div class="p-4 sm:p-6 lg:p-8 h-full">
              <div class="max-w-7xl mx-auto h-full">
                <!-- Page transition wrapper -->
                <transition 
                  name="page" 
                  mode="out-in"
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0 transform translate-y-4"
                  enter-to-class="opacity-100 transform translate-y-0"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 transform translate-y-0"
                  leave-to-class="opacity-0 transform -translate-y-4"
                >
                  <router-view />
                </transition>
              </div>
            </div>
          </div>
        </main>

        <!-- Mobile Bottom Navigation (Optional) -->
        <nav class="lg:hidden bg-white border-t border-slate-200 px-4 py-2">
          <div class="flex justify-around">
            <router-link 
              to="/real" 
              class="flex flex-col items-center py-2 px-3 rounded-xl transition-colors duration-200"
              :class="$route.name === 'Real' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'"
            >
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              </svg>
              <span class="text-xs font-medium">Tableau</span>
            </router-link>
            
            <router-link 
              to="/facture" 
              class="flex flex-col items-center py-2 px-3 rounded-xl transition-colors duration-200"
              :class="$route.name === 'Facture' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'"
            >
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="text-xs font-medium">Factures</span>
            </router-link>
            
            <router-link 
              to="/clientFact" 
              class="flex flex-col items-center py-2 px-3 rounded-xl transition-colors duration-200"
              :class="$route.name === 'Client' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'"
            >
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span class="text-xs font-medium">Clients</span>
            </router-link>
            
            <router-link 
              to="/setting" 
              class="flex flex-col items-center py-2 px-3 rounded-xl transition-colors duration-200"
              :class="$route.name === 'setting' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'"
            >
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-xs font-medium">Réglages</span>
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import LoginNav from "../components/LoginNav.vue";
import HaeDer from "../components/HaeDer.vue";

export default {
  name: "AppLayout",
  components: {
    LoginNav,
    HaeDer,
  },
  data() {
    return {
      isMobileMenuOpen: false,
      utilisateur: null
    };
  },
  created() {
    this.utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    logout() {
      try {
        localStorage.removeItem("utilisateurConnecte");
        this.$router.push("/login");
        this.$toast.success("Déconnexion réussie. À bientôt !", {
          timeout: 3000,
        });
      } catch (error) {
        this.$toast.error("Erreur lors de la déconnexion. Réessayez.", {
          timeout: 5000,
        });
      }
    },
  },
  // Close mobile menu when route changes
  watch: {
    $route() {
      this.isMobileMenuOpen = false;
    }
  }
};
</script>

<style scoped>
/* Page transition styles */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Mobile menu animation */
@media (max-width: 1023px) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    transform: translateX(-100%);
  }
}
</style>