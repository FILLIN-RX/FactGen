<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Mobile Header -->
    <header
      class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div class="px-4 sm:px-6 lg:hidden lg:px-8">
        <div class="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <!-- Logo Section -->
          <div class="flex items-center">
            <button
              @click="toggleMobileMenu"
              class="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              :class="{ 'text-blue-600': isMobileMenuOpen }"
            >
              <svg
                class="w-6 h-6 transition-transform duration-200"
                :class="{ 'rotate-90': isMobileMenuOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
                />
              </svg>
            </button>
            
            <h1
              class="ml-2 lg:ml-0 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              FactGen
            </h1>
          </div>

          <!-- Desktop Header Content -->
          <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
          </div>

          <!-- Mobile Header Actions -->
          <div class="flex items-center lg:hidden">
            <button
              @click="logout"
              class="p-2 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <transition
      name="mobile-overlay"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/50 lg:hidden"
        @click="toggleMobileMenu"
      />
    </transition>

    <div class="flex min-h-screen">
      <!-- Mobile Sidebar -->
      <transition
        name="mobile-sidebar"
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-300 ease-in"
        enter-from-class="-translate-x-full"
        leave-to-class="-translate-x-full"
      >
        <div
          v-show="isMobileMenuOpen"
          class="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:hidden"
        >
          <div class="flex flex-col h-full">
            <!-- Mobile Menu Header -->
            <div class="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 class="text-lg font-semibold text-slate-900">Navigation</h2>
              <button
                @click="toggleMobileMenu"
                class="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Mobile Navigation -->
            <nav class="flex-1 px-4 py-6 overflow-y-auto">
              <div class="space-y-2">
                <router-link
                  to="/real"
                  @click="toggleMobileMenu"
                  class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                  :class="
                    $route.name === 'Real'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  "
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                  </svg>
                  Tableau de bord
                </router-link>

                <router-link
                  to="/facture"
                  @click="toggleMobileMenu"
                  class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                  :class="
                    $route.name === 'Facture'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  "
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Gestion des factures
                </router-link>

                <router-link
                  to="/clientFact"
                  @click="toggleMobileMenu"
                  class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                  :class="
                    $route.name === 'Client'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  "
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Gestion des clients
                </router-link>

                <router-link
                  to="/setting"
                  @click="toggleMobileMenu"
                  class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                  :class="
                    $route.name === 'setting'
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  "
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Paramètres
                </router-link>
              </div>
            </nav>

            <!-- Mobile Menu Footer -->
            <div class="p-4 border-t border-slate-200">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-semibold text-sm">
                    {{ utilisateur?.nom?.charAt(0) || 'U' }}
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-900">
                    {{ utilisateur?.nom || 'Utilisateur' }}
                  </p>
                  <p class="text-xs text-slate-500">
                    {{  auth.user.email || 'email@example.com' }}
                  </p>
                </div>
              </div>
              <button
                @click="logout"
                class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Desktop Sidebar -->
      <div class="hidden lg:flex lg:w-72 xl:w-80">
        <div class="w-full bg-white border-r border-slate-200 shadow-sm">
         <LoginNav />
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex flex-col flex-1 min-h-screen">
        <!-- Desktop Header -->
        <div class="hidden lg:block">
          <div class="bg-white border-b border-slate-200 px-6 lg:px-8 py-4">
            <HaeDer />
          </div>
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-hidden">
          <div class="h-full">
            <div class="p-3 sm:p-4 lg:p-6 xl:p-8 h-full">
              <div class="max-w-7xl mx-auto h-full">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoginNav from "../components/LoginNav.vue";
import HaeDer from "../components/HaeDer.vue";
import { useAuthStore } from "../stores/auth";
import { useToast } from "vue-toastification";

const isMobileMenuOpen = ref(false);
const utilisateur = ref(null);
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

// Get user on creation
utilisateur.value = JSON.parse(localStorage.getItem("utilisateurConnecte"));

// Initialize auth on mount
onMounted(() => {
  auth.initialize();
});

// Toggle mobile menu
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
}

// Logout
function logout() {
  try {
    localStorage.removeItem("utilisateurConnecte");
    isMobileMenuOpen.value = false;
    document.body.style.overflow = '';
    router.push("/login");
    toast.success("Déconnexion réussie. À bientôt !", {
      timeout: 3000,
    });
  } catch (error) {
    toast.error("Erreur lors de la déconnexion. Réessayez.", {
      timeout: 5000,
    });
  }
}

// Watch route changes to close menu
watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
});

// Clean up on unmount
onUnmounted(() => {
  document.body.style.overflow = '';
});
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

/* Mobile sidebar transitions */
.mobile-sidebar-enter-active,
.mobile-sidebar-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-sidebar-enter-from,
.mobile-sidebar-leave-to {
  transform: translateX(-100%);
}

/* Mobile overlay transitions */
.mobile-overlay-enter-active,
.mobile-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-overlay-enter-from,
.mobile-overlay-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
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

/* Safe area for mobile devices */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Améliorer les interactions tactiles */
@media (hover: none) and (pointer: coarse) {
  .transition-all {
    transition-duration: 0.15s;
  }
  
  button,
  .router-link-active {
    -webkit-tap-highlight-color: transparent;
  }
}

/* Responsive improvements */
@media (max-width: 640px) {
  .min-w-0 {
    min-width: 0;
  }
}
</style>