<template>
  <nav
    :class="{ 'scrolled-nav': scrollNav }"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 navbar"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8 container  flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <router-link to="/" class="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors">
           <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
          <span class="text-xl font-bold">FactGen</span>
        </router-link>
      </div>

      <!-- Navigation Desktop -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link to="/features" class="nav-link">Fonctionnalités</router-link>
        <router-link to="/pricing" class="nav-link">Tarifs</router-link>
        <router-link to="/support" class="nav-link">Support</router-link>
       
      </div>

      <!-- Boutons d'action -->
      <div class="flex items-center space-x-3">
        <router-link to="/login" class="btn-login">
          Connexion
        </router-link>
      
        <!-- Menu mobile toggle -->
        <button
          @click="toggleMobileNav"
          class="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileNav" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div v-if="mobileNav" class="md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div class="px-4 py-4 space-y-2">
        <router-link
          to="/features"
          class="mobile-nav-link"
          @click="closeMobileNav"
        >
          Fonctionnalités
        </router-link>
        <router-link
          to="/pricing"
          class="mobile-nav-link"
          @click="closeMobileNav"
        >
          Tarifs
        </router-link>
        <router-link
          to="/support"
          class="mobile-nav-link"
          @click="closeMobileNav"
        >
          Support
        </router-link>
           <router-link to="/signUp" class="btn-primary">
          S'inscrire
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      scrollNav: false,
      mobileNav: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.updateScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeMobileNav() {
      this.mobileNav = false;
    },
    handleResize() {
      if (window.innerWidth >= 768) {
        this.mobileNav = false;
      }
    },
    updateScroll() {
      this.scrollNav = window.scrollY > 10;
    },
  },
};
</script>

<style scoped>
/* Navbar principale */
.navbar {
  background:#4E71FF;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.scrolled-nav {
  background: #5EABD6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Navigation Links */
.nav-link {
  color: #4b5563;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #1f2937;
  background-color: #f3f4f6;
}

.nav-link.router-link-active {
  color: #2563eb;
  background-color: #eff6ff;
}

/* Boutons */
.btn-login {
  color: #4b5563;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: 1px solid #d1d5db;
  background: white;
}

.btn-login:hover {
  color: #1f2937;
  border-color: #9ca3af;
  background: #f9fafb;
}

.btn-primary {
  background: #2563eb;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: 1px solid #2563eb;
}

.btn-primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

/* Menu mobile */
.mobile-nav-link {
  display: block;
  color: #4b5563;
  font-weight: 500;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  color: #1f2937;
  background-color: #f3f4f6;
}

.mobile-nav-link.router-link-active {
  color: #2563eb;
  background-color: #eff6ff;
}

/* Responsive */
@media (max-width: 640px) {
  .btn-login,
  .btn-primary {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
}

/* Focus states */
.nav-link:focus-visible,
.btn-login:focus-visible,
.btn-primary:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>