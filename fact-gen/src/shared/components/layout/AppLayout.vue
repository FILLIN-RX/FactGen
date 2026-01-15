<template>
    <div class="min-h-screen  flex flex-col bg-slate-50">
        <header class="sticky top-0 z-50 bg-white shadow-md"
            :class="{ 'border-b border-slate-200': !isMobileMenuOpen }">
            <div class="px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-14 lg:h-16">
                    <button @click="toggleMobileMenu"
                        class="lg:hidden p-2 -ml-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors duration-200"
                        :aria-expanded="isMobileMenuOpen" aria-controls="mobile-sidebar">
                        <Bars3Icon v-if="!isMobileMenuOpen" class="w-6 h-6 text-slate-600" />
                        <XMarkIcon v-else class="w-6 h-6 text-slate-600" />
                    </button>

                    <router-link to="/real" class="flex items-center space-x-2">
                        <span
                            class="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            FactGen
                        </span>
                    </router-link>

                    <div class="hidden lg:flex items-center space-x-4">
                        <nav class="hidden lg:flex space-x-1">
                            <DesktopNavItem v-for="item in navItems" :key="item.name" :to="item.path"
                                :label="item.label" :icon="item.icon" :isActive="$route.name === item.routeName" />
                        </nav>

                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                                title="Mon Compte">
                                <span class="text-white font-medium text-sm">
                                    {{ userInitial }}
                                </span>
                            </div>
                            <button @click="logout"
                                class="p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                                title="Se déconnecter">
                                <ArrowRightOnRectangleIcon class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="flex flex-1 overflow-hidden">
            <transition name="fade">
                <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    @click="toggleMobileMenu" />
            </transition>

            <transition name="slide-from-left">
                <nav v-if="isMobileMenuOpen" id="mobile-sidebar"
                    class="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col">
                    <div class="flex items-center justify-between p-4 border-b">
                        <h2 class="text-lg font-bold text-slate-800">Navigation</h2>
                        <button @click="toggleMobileMenu"
                            class="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
                            <XMarkIcon class="w-6 h-6" />
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto p-4 space-y-2">
                        <MobileNavItem v-for="item in navItems" :key="item.name" :to="item.path" :label="item.label"
                            :icon="item.icon" :isActive="$route.name === item.routeName" @click="toggleMobileMenu" />
                    </div>

                    <div class="p-4 border-t bg-slate-50">
                        <div class="flex items-center space-x-3 mb-3">
                            <div
                                class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                                <span class="text-white font-semibold text-sm">
                                    {{ userInitial }}
                                </span>
                            </div>
                            <div class="min-w-0">
                                <p class="text-sm font-medium text-slate-900 truncate">
                                    {{ utilisateur?.nom || "Utilisateur" }}
                                </p>
                                <p class="text-xs text-slate-500 truncate">
                                    {{ auth.user.email || "email@example.com" }}
                                </p>
                            </div>
                        </div>
                        <button @click="logout"
                            class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-xl transition-colors shadow-sm">
                            <ArrowRightOnRectangleIcon class="w-5 h-5 mr-2" />
                            Se déconnecter
                        </button>
                    </div>
                </nav>
            </transition>

            <main class="flex-1 overflow-x-hidden overflow-y-auto">
                <div class="p-4 sm:p-6 lg:p-8">
                    <div class="mx-auto max-w-7xl">
                        <router-view v-slot="{ Component }">
                            <transition name="fade-slide" mode="out-in"
                                enter-active-class="transition-all duration-300 ease-out"
                                enter-from-class="opacity-0 transform translate-y-2"
                                enter-to-class="opacity-100 transform translate-y-0"
                                leave-active-class="transition-all duration-200 ease-in"
                                leave-from-class="opacity-100 transform translate-y-0"
                                leave-to-class="opacity-0 transform -translate-y-2">
                                <component :is="Component" />
                            </transition>
                        </router-view>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed, shallowRef } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import { useToast } from "vue-toastification";
import {
    Bars3Icon,
    XMarkIcon,
    Squares2X2Icon,
    DocumentTextIcon,
    UsersIcon,
    RectangleGroupIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline';

// --- Components (Stubs for demonstration) ---
// IMPORTANT: Updated to use <i> tag for Material Symbols
const DesktopNavItem = {
    props: ['to', 'label', 'icon', 'isActive'],
    template: `
    <router-link
      :to="to"
      class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 space-x-2"
      :class="isActive 
        ? 'text-blue-700 bg-blue-50 shadow-inner' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'"
    >
      <component :is="icon" class="w-5 h-5" />
      <span>{{ label }}</span>
    </router-link>
  `
};

const MobileNavItem = {
    props: ['to', 'label', 'icon', 'isActive'],
    template: `
    <router-link
      :to="to"
      class="flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 shadow-sm"
      :class="isActive 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'"
    >
      <component :is="icon" class="w-6 h-6 mr-4" />
      {{ label }}
    </router-link>
  `
};
// ---------------------------------------------

const isMobileMenuOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const utilisateur = ref(null);

// Get user on creation
utilisateur.value = JSON.parse(localStorage.getItem("utilisateurConnecte"));

// Computed property for user initial
const userInitial = computed(() => utilisateur.value?.nom?.charAt(0).toUpperCase() || "U");

// Centralized Navigation Items: Icons changed to Material Symbol names
const navItems = [
    { path: "/real", label: "Tableau de bord", routeName: "Real", icon: Squares2X2Icon },
    { path: "/facture", label: "Gestion des factures", routeName: "Facture", icon: DocumentTextIcon },
    { path: "/clientFact", label: "Gestion des clients", routeName: "Client", icon: UsersIcon },
    { path: "/templates", label: "Templates", routeName: "Templates", icon: RectangleGroupIcon },
    { path: "/setting", label: "Paramètres", routeName: "setting", icon: Cog6ToothIcon },
];


// --- Functions ---

// Initialize auth on mount
onMounted(() => {
    auth.initialize();
});

// Toggle mobile menu
function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    // Manage body overflow to prevent background scrolling
    document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
}

// Logout
function logout() {
    try {
        localStorage.removeItem("utilisateurConnecte");
        // Ensure mobile menu is closed and body scroll is restored
        isMobileMenuOpen.value = false;
        document.body.style.overflow = "";

        router.push("/login");
        toast.success("Déconnexion réussie. À bientôt !");
    } catch (error) {
        toast.error("Erreur lors de la déconnexion. Réessayez.");
    }
}

// Watch route changes to close menu
watch(
    () => route.fullPath,
    () => {
        // Only act if menu is open
        if (isMobileMenuOpen.value) {
            isMobileMenuOpen.value = false;
            document.body.style.overflow = "";
        }
    }
);

// Clean up on unmount
onUnmounted(() => {
    document.body.style.overflow = "";
});
</script>

<style scoped>
/* Transition styles for mobile menu (Material Design Slide and Fade) */
.slide-from-left-enter-active,
.slide-from-left-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-from-left-enter-from,
.slide-from-left-leave-to {
    transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
    /* slate-100 */
}

::-webkit-scrollbar-thumb {
    background: #94a3b8;
    /* slate-400 */
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #64748b;
    /* slate-500 */
}

/* Improved Touch Interactions */
@media (hover: none) and (pointer: coarse) {

    .transition-all,
    .transition-colors {
        /* Slightly faster transition for better feel on touch devices */
        transition-duration: 0.1s;
    }

    button,
    a {
        -webkit-tap-highlight-color: transparent;
    }
}
</style>
