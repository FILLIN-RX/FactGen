<template>
  <nav
    :class="{ 'scrolled-nav': scrollNav }"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 navbar"
  >
    <div
      class="mx-auto px-4 container flex items-center justify-between h-14 sm:h-16"
    >
      <!-- Logo -->
      <div class="flex-shrink-0">
        <router-link
          to="/"
          class="flex items-center space-x-2 sm:space-x-3 text-gray-900 hover:text-emerald-600 transition-colors duration-300"
        >
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
          >
            <svg
              class="w-4 h-4 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <span
            class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
            >FactGen</span
          >
        </router-link>
      </div>

      <!-- Menu mobile -->
      <div class="flex items-center space-x-2 md:hidden">
        <!-- Bouton thème mobile -->
        <button
          @click="themeStore.toggleTheme()"
          class="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300 dark:bg-neutral-800 dark:text-white"
          :title="themeStore.darkMode ? 'Mode clair' : 'Mode sombre'"
        >
          <svg
            v-if="themeStore.darkMode"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        </button>

        <!-- Bouton connexion mobile -->
        <router-link to="/login" class="btn-login-mobile">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>

        <!-- Menu hamburger -->
        <button
          @click="toggleMobileNav"
          class="p-2 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
          :aria-expanded="mobileNav"
          aria-label="Menu de navigation"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!mobileNav"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Navigation Desktop -->
      <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
        <router-link to="/features" class="nav-link">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
              />
            </svg>
            Fonctionnalités
          </span>
        </router-link>
        <router-link to="/support" class="nav-link">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C17.759 8.089 18 9.016 18 10z"
                clip-rule="evenodd"
              />
            </svg>
            Support
          </span>
        </router-link>
      </div>

      <!-- Actions Desktop -->
      <div class="hidden md:flex items-center space-x-3">
        <!-- Bouton thème desktop -->
        <button
          @click="themeStore.toggleTheme()"
          class="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300 dark:bg-neutral-800 dark:text-white"
          :title="themeStore.darkMode ? '' : ''"
        >
          <span class="flex items-center gap-2 text-sm">
            <svg
              v-if="themeStore.darkMode"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            {{ themeStore.darkMode ? "" : "" }}
          </span>
        </button>

        <router-link to="/login" class="btn-login-desktop">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          Connexion
        </router-link>

        <router-link to="/signUp" class="btn-primary-desktop">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
            />
          </svg>
          S'inscrire gratuitement
        </router-link>
      </div>
    </div>

    <!-- Menu Mobile -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileNav"
        class="md:hidden mobile-menu"
        @click.self="closeMobileNav"
      >
        <div class="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
          <router-link
            to="/features"
            class="mobile-nav-link"
            @click="closeMobileNav"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
              />
            </svg>
            Fonctionnalités
          </router-link>
          <router-link
            to="/support"
            class="mobile-nav-link"
            @click="closeMobileNav"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C17.759 8.089 18 9.016 18 10z"
                clip-rule="evenodd"
              />
            </svg>
            Support
          </router-link>

          <div
            class="pt-3 sm:pt-4 space-y-2 sm:space-y-3 border-t border-gray-200"
          >
            <router-link
              to="/signUp"
              class="btn-primary-mobile"
              @click="closeMobileNav"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                />
              </svg>
              S'inscrire gratuitement
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useThemeStore } from "../stores/Theme";

const scrollNav = ref(false);
const mobileNav = ref(false);
const themeStore = useThemeStore();

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

const closeMobileNav = () => {
  mobileNav.value = false;
};

const handleResize = () => {
  if (window.innerWidth >= 768) {
    mobileNav.value = false;
  }
};

const updateScroll = () => {
  scrollNav.value = window.scrollY > 20;
};

const handleClickOutside = (event) => {
  const nav = document.querySelector(".navbar");
  if (nav && !nav.contains(event.target)) {
    mobileNav.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
  window.addEventListener("resize", handleResize);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScroll);
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Navbar principale */
.navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.scrolled-nav {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

/* Menu mobile */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 40;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  color: #059669;
  background-color: rgba(16, 185, 129, 0.1);
}

.mobile-nav-link.router-link-active {
  color: #059669;
  background-color: rgba(16, 185, 129, 0.15);
}

.btn-primary-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #10b981, #3b82f6);
  color: white;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.btn-primary-mobile:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
}

/* Navigation desktop */
.nav-link {
  color: #374151;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #059669;
  background-color: rgba(16, 185, 129, 0.1);
}

.nav-link.router-link-active {
  color: #059669;
  background-color: rgba(16, 185, 129, 0.15);
}

/* Boutons desktop */
.btn-login-desktop {
  display: flex;
  align-items: center;
  color: #374151;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.btn-login-desktop:hover {
  color: #059669;
  border-color: #10b981;
  background-color: rgba(16, 185, 129, 0.05);
}

.btn-primary-desktop {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #10b981, #3b82f6);
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.btn-primary-desktop:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
}

/* Mode sombre */
.dark .navbar {
  background: rgba(17, 24, 39, 0.98);
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.dark .mobile-menu {
  background: rgba(17, 24, 39, 0.98);
  border-top-color: rgba(255, 255, 255, 0.05);
}

.dark .nav-link,
.dark .mobile-nav-link {
  color: #e5e7eb;
}

.dark .nav-link:hover,
.dark .mobile-nav-link:hover {
  color: #10b981;
  background-color: rgba(16, 185, 129, 0.15);
}

.dark .btn-login-desktop {
  color: #e5e7eb;
  border-color: rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
}

.dark .btn-login-desktop:hover {
  color: #10b981;
  border-color: #10b981;
}
</style>
