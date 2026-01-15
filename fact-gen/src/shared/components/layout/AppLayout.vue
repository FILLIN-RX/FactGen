<template>
    <div class="min-h-screen flex bg-surface">
        <!-- Sidebar Navigation -->
        <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-outline-variant fixed inset-y-0 z-50">
            <div class="flex items-center h-16 px-6 border-b border-outline-variant">
                <router-link to="/real" class="flex items-center space-x-2">
                    <span class="text-xl font-bold text-[#005AC1]">FactGen</span>
                </router-link>
            </div>

            <nav class="flex-1 overflow-y-auto p-4 space-y-1">
                <router-link v-for="item in navItems" :key="item.name" :to="item.path"
                    class="flex items-center px-4 py-3 rounded-lg text-surface-on-variant hover:bg-[#F8F9FA] transition-all group"
                    :class="{ 'bg-[#D3E4FF] text-[#001C3B] font-medium': $route.name === item.routeName }">
                    <component :is="item.icon" class="w-5 h-5 mr-3"
                        :class="{ 'text-[#005AC1]': $route.name === item.routeName }" />
                    <span>{{ item.label }}</span>
                </router-link>
            </nav>

            <div class="p-4 border-t border-outline-variant">
                <button @click="logout"
                    class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3" />
                    Se déconnecter
                </button>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col lg:pl-64">
            <!-- Header -->
            <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-outline-variant">
                <div class="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div class="flex items-center lg:hidden">
                        <button @click="toggleMobileMenu" class="p-2 -ml-2 text-surface-on-variant">
                            <Bars3Icon class="w-6 h-6" />
                        </button>
                        <router-link to="/real" class="ml-4 flex items-center">
                            <span class="text-xl font-bold text-[#005AC1]">FactGen</span>
                        </router-link>
                    </div>

                    <!-- Search Bar -->
                    <div class="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <MagnifyingGlassIcon
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-on-variant" />
                        <input type="text" placeholder="Rechercher une facture, un client..."
                            class="input-outlined pl-10 h-10 py-0 text-sm" />
                    </div>

                    <div class="flex items-center space-x-4">
                        <button
                            class="p-2 text-surface-on-variant hover:bg-[#F8F9FA] rounded-full transition-colors relative">
                            <BellIcon class="w-5 h-5" />
                            <span
                                class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div class="h-8 w-px bg-outline-variant"></div>

                        <div class="flex items-center space-x-3">
                            <div class="text-right hidden sm:block">
                                <p class="text-xs font-bold text-[#1A1C1E]">{{ utilisateur?.nom || "Utilisateur" }}</p>
                                <p class="text-[10px] text-surface-on-variant uppercase tracking-wider">Plan Expert</p>
                            </div>
                            <div
                                class="w-9 h-9 bg-[#D3E4FF] rounded-full flex items-center justify-center border border-[#005AC1]/10 cursor-pointer shadow-sm transition-transform hover:scale-105 overflow-hidden">
                                <span class="text-[#001C3B] font-bold text-sm">
                                    {{ userInitial }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F8F9FA]">
                <div class="mx-auto max-w-7xl">
                    <router-view v-slot="{ Component }">
                        <transition name="page" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </main>
        </div>

        <!-- Mobile Sidebar Overlay -->
        <transition name="fade">
            <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[60] bg-black/50 lg:hidden" @click="toggleMobileMenu">
            </div>
        </transition>

        <!-- Mobile Sidebar -->
        <transition name="slide">
            <aside v-if="isMobileMenuOpen" class="fixed inset-y-0 left-0 z-[70] w-72 bg-white flex flex-col lg:hidden">
                <div class="flex items-center justify-between h-16 px-6 border-b border-outline-variant">
                    <span class="text-xl font-bold text-[#005AC1]">FactGen</span>
                    <button @click="toggleMobileMenu" class="p-2 -mr-2 text-surface-on-variant">
                        <XMarkIcon class="w-6 h-6" />
                    </button>
                </div>
                <nav class="flex-1 overflow-y-auto p-4 space-y-1">
                    <router-link v-for="item in navItems" :key="item.name" :to="item.path"
                        class="flex items-center px-4 py-3 rounded-lg text-surface-on-variant hover:bg-[#F8F9FA] transition-all"
                        :class="{ 'bg-[#D3E4FF] text-[#001C3B] font-medium': $route.name === item.routeName }">
                        <component :is="item.icon" class="w-5 h-5 mr-4" />
                        <span>{{ item.label }}</span>
                    </router-link>
                </nav>
                <div class="p-4 border-t border-outline-variant">
                    <button @click="logout"
                        class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                        <ArrowRightOnRectangleIcon class="w-5 h-5 mr-4" />
                        Se déconnecter
                    </button>
                </div>
            </aside>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
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
    ArrowRightOnRectangleIcon,
    MagnifyingGlassIcon,
    BellIcon
} from '@heroicons/vue/24/outline';

const isMobileMenuOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const utilisateur = ref(null);

utilisateur.value = JSON.parse(localStorage.getItem("utilisateurConnecte"));
const userInitial = computed(() => utilisateur.value?.nom?.charAt(0).toUpperCase() || "U");

const navItems = [
    { path: "/real", label: "Tableau de bord", routeName: "Real", icon: Squares2X2Icon },
    { path: "/facture", label: "Factures", routeName: "Facture", icon: DocumentTextIcon },
    { path: "/clientFact", label: "Clients", routeName: "Client", icon: UsersIcon },
    { path: "/templates", label: "Templates", routeName: "Templates", icon: RectangleGroupIcon },
    { path: "/setting", label: "Paramètres", routeName: "setting", icon: Cog6ToothIcon },
];

onMounted(() => {
    auth.initialize();
});

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
}

function logout() {
    try {
        localStorage.removeItem("utilisateurConnecte");
        isMobileMenuOpen.value = false;
        document.body.style.overflow = "";
        router.push("/login");
        toast.success("Déconnexion réussie.");
    } catch (error) {
        toast.error("Erreur lors de la déconnexion.");
    }
}

watch(
    () => route.fullPath,
    () => {
        if (isMobileMenuOpen.value) {
            isMobileMenuOpen.value = false;
            document.body.style.overflow = "";
        }
    }
);

onUnmounted(() => {
    document.body.style.overflow = "";
});
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s ease-out;
}

.page-enter-from {
    opacity: 0;
    transform: translateY(4px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
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
</style>
