<template>
    <nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        :class="scrollNav ? 'bg-white shadow-md' : 'bg-white/90'">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

            <!-- LOGO -->
            <router-link to="/" class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                    <DocumentTextIcon class="w-5 h-5 text-white" />
                </div>
                <span class="text-xl font-semibold text-gray-900">
                    FactGen
                </span>
            </router-link>

            <!-- DESKTOP NAV -->
            <div class="hidden md:flex items-center gap-6">
                <router-link to="/features" class="md-nav-link">
                    Fonctionnalités
                </router-link>
                <router-link to="/support" class="md-nav-link">
                    Support
                </router-link>
            </div>

            <!-- ACTIONS -->
            <div class="hidden md:flex items-center gap-2">
                <router-link to="/login" class="md-btn-text">
                    Connexion
                </router-link>

                <router-link to="/signUp" class="md-btn-filled">
                    S’inscrire
                </router-link>
            </div>

            <!-- MOBILE -->
            <button @click="toggleMobileNav" class="md:hidden p-2 rounded-full hover:bg-gray-100" aria-label="Menu">
                <Bars3Icon class="w-6 h-6 text-gray-700" />
            </button>
        </div>

        <!-- MOBILE MENU -->
        <Transition name="fade">
            <div v-if="mobileNav" class="md:hidden bg-white border-t">
                <div class="px-4 py-4 space-y-2">
                    <router-link to="/features" class="md-mobile-link" @click="closeMobileNav">
                        Fonctionnalités
                    </router-link>
                    <router-link to="/support" class="md-mobile-link" @click="closeMobileNav">
                        Support
                    </router-link>

                    <div class="pt-3 border-t space-y-2">
                        <router-link to="/login" class="md-mobile-link" @click="closeMobileNav">
                            Connexion
                        </router-link>
                        <router-link to="/signUp" class="md-btn-filled w-full text-center" @click="closeMobileNav">
                            S’inscrire
                        </router-link>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { DocumentTextIcon, Bars3Icon } from '@heroicons/vue/24/outline';

const scrollNav = ref(false);
const mobileNav = ref(false);

const handleScroll = () => {
    scrollNav.value = window.scrollY > 50;
};

const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
};

const closeMobileNav = () => {
    mobileNav.value = false;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.md-nav-link {
    color: #374151;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    border-radius: 9999px;
    transition: background-color 0.2s;
}

.md-nav-link:hover {
    background-color: rgba(59, 130, 246, 0.08);
}

.md-btn-text {
    color: #1e40af;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
}

.md-btn-text:hover {
    background-color: rgba(30, 64, 175, 0.08);
}

.md-btn-filled {
    background-color: #1e40af;
    color: white;
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
}

.md-btn-filled:hover {
    background-color: #1c3aa9;
}

.md-mobile-link {
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    color: #374151;
}

.md-mobile-link:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
