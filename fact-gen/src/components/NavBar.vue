<template>
  <nav :class="{ 'scrolled-nav': scrollNav }" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out navbar">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <router-link to="/" class="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
          <div class="flex items-center space-x-2">
            <div class="text-blue-200">
              <svg viewBox="0 0 40 40" class="w-8 h-8">
                <rect x="8" y="6" width="20" height="26" rx="2" fill="currentColor" opacity="0.1"/>
                <rect x="8" y="6" width="20" height="26" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <path d="M 20 6 L 28 6 L 28 12 L 22 12 Z" fill="currentColor" opacity="0.3"/>
                <rect x="12" y="14" width="12" height="1" fill="currentColor" opacity="0.6"/>
                <rect x="12" y="17" width="8" height="1" fill="currentColor" opacity="0.6"/>
                <rect x="12" y="20" width="10" height="1" fill="currentColor" opacity="0.6"/>
                <circle cx="20" cy="26" r="3" fill="currentColor" opacity="0.8"/>
                <text x="20" y="28" text-anchor="middle" fill="white" font-size="4" font-weight="bold">€</text>
              </svg>
            </div>
            <div class="text-xl font-bold tracking-tight">
              <span class="text-white font-bold">FACT</span><span class="text-blue-300">GEN</span>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Menu Mobile Toggle -->
      <button 
        @click="toggleMobileNav" 
        class="relative w-8 h-8 flex flex-col justify-center items-center text-white hover:text-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded lg:hidden"
        :class="{ 'active': mobileNav }"
        aria-label="Toggle navigation"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Desktop -->
      <div class="hidden lg:flex items-center space-x-8">
        <div class="flex items-center space-x-6">
          <router-link to="/features" class="nav-link">
            Fonctionnalités
          </router-link>
          <router-link to="/pricing" class="nav-link">
            Tarifs
          </router-link>
          <router-link to="/support" class="nav-link">
            Support
          </router-link>
        </div>
        
        <div class="flex items-center space-x-3">
          <router-link to="/login" class="btn btn-outline">
            Connexion
          </router-link>
          <router-link to="/register" class="btn btn-primary">
            S'inscrire
          </router-link>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <transition name="mobile-nav">
      <div v-if="mobileNav" class="absolute top-full left-0 w-full mobile-nav lg:hidden">
        <div class="px-4 py-6 space-y-6">
          <div class="space-y-4">
            <router-link 
              to="/features" 
              class="flex items-center space-x-3 text-white hover:text-blue-200 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800 hover:bg-opacity-50"
              @click="closeMobileNav"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Fonctionnalités
            </router-link>
            
            <router-link 
              to="/pricing" 
              class="flex items-center space-x-3 text-white hover:text-blue-200 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800 hover:bg-opacity-50"
              @click="closeMobileNav"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              Tarifs
            </router-link>
            
            <router-link 
              to="/support" 
              class="flex items-center space-x-3 text-white hover:text-blue-200 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800 hover:bg-opacity-50"
              @click="closeMobileNav"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Support
            </router-link>
          </div>
          
          <div class="space-y-3 pt-6 border-t border-blue-700">
            <router-link 
              to="/login" 
              class="btn btn-outline w-full"
              @click="closeMobileNav"
            >
              Connexion
            </router-link>
            <router-link 
              to="/register" 
              class="btn btn-primary w-full"
              @click="closeMobileNav"
            >
              S'inscrire
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      scrollNav: false,
      mobileNav: false,
      windowWidth: 0,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
    window.removeEventListener("scroll", this.updateScroll);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
      
      // Empêcher le scroll du body quand le menu est ouvert
      if (this.mobileNav) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    
    closeMobileNav() {
      this.mobileNav = false;
      document.body.style.overflow = 'auto';
    },
    
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 1024) {
        this.mobileNav = false;
        document.body.style.overflow = 'auto';
      }
    },
    
    updateScroll() {
      const scrollPosition = window.scrollY;
      this.scrollNav = scrollPosition > 50;
    }
  },
};
</script>

<style scoped>
/* Variables CSS */
:root {
  --primary-blue: #1e3a8a;
  --secondary-blue: #3b82f6;
  --light-blue: #60a5fa;
  --accent-blue: #bfdbfe;
  --success-green: #10b981;
  --hover-green: #059669;
  --text-gray: #6b7280;
  --border-gray: #e5e7eb;
}

/* Navbar principale */
.navbar {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Hamburger Animation */
.hamburger-line {
  display: block;
  width: 1.5rem;
  height: 0.125rem;
  background-color: currentColor;
  margin-bottom: 0.25rem;
  transition: all 0.3s ease-in-out;
}

.hamburger-line:last-child {
  margin-bottom: 0;
}

.active .hamburger-line:first-child {
  transform: rotate(45deg) translateY(0.375rem);
}

.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.active .hamburger-line:last-child {
  transform: rotate(-45deg) translateY(-0.375rem);
}

/* Navigation Links */
.nav-link {
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  position: relative;
  transition: color 0.2s ease;
  text-decoration: none;
}

.nav-link:hover {
  color: #bfdbfe;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.125rem;
  background-color: #bfdbfe;
  transition: all 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: #bfdbfe;
}

.nav-link.router-link-active::after {
  width: 100%;
}

/* Boutons */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  border: none;
  cursor: pointer;
}

.btn:focus {
  outline: none;
}

.btn-outline {
  color: white;
  border: 1px solid white;
  background: transparent;
}

.btn-outline:hover {
  background-color: white;
  color: #1e3a8a;
}

.btn-outline:focus {
  box-shadow: 0 0 0 2px white;
}

.btn-primary {
  background-color: #10b981;
  color: white;
}

.btn-primary:hover {
  background-color: #059669;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.btn-primary:focus {
  box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.5);
}

/* Menu Mobile */
.mobile-nav {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  border-top: 1px solid #1d4ed8;
  min-height: calc(100vh - 4rem);
}

/* Animations */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.3s ease-in-out;
}

.mobile-nav-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}

.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

/* Navbar scrollée */
.scrolled-nav {
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%);
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.scrolled-nav .mx-auto {
  height: 3.5rem;
}

.scrolled-nav .text-xl {
  font-size: 1.125rem;
}

.scrolled-nav .w-8 {
  width: 1.5rem;
  height: 1.5rem;
}

/* Responsive Design */
@media (max-width: 640px) {
  .mx-auto {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 3.5rem;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
  
  .mobile-nav .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .mobile-nav .py-6 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

/* Amélioration de l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}

/* States focus améliorés */
.btn:focus-visible,
.nav-link:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}
</style>