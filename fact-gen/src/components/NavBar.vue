<template>
  <nav :class="{ 'scrolled-nav': scrollNav }" class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/" class="logo-link">
          <div class="logo-content">
            <div class="logo-icon">
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
            <div class="logo-text">
              <span class="text-white font-bold">FACT</span><span class="text-blue-300">GEN</span>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Menu Mobile Toggle -->
      <button 
        @click="toggleMobileNav" 
        class="mobile-menu-btn lg:hidden"
        :class="{ 'active': mobileNav }"
        aria-label="Toggle navigation"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Desktop -->
      <div class="desktop-nav hidden lg:flex">
        <div class="nav-links">
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
        
        <div class="nav-buttons">
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
      <div v-if="mobileNav" class="mobile-nav lg:hidden">
        <div class="mobile-nav-content">
          <div class="mobile-nav-links">
            <router-link 
              to="/features" 
              class="mobile-nav-link"
              @click="closeMobileNav"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Fonctionnalités
            </router-link>
            
            <router-link 
              to="/pricing" 
              class="mobile-nav-link"
              @click="closeMobileNav"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              Tarifs
            </router-link>
            
            <router-link 
              to="/support" 
              class="mobile-nav-link"
              @click="closeMobileNav"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Support
            </router-link>
          </div>
          
          <div class="mobile-nav-buttons">
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease-in-out;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 80rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

@media (min-width: 640px) {
  .navbar-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .navbar-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Logo */
.logo {
  flex-shrink: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
}

.logo-link:hover {
  color: #bfdbfe;
}

.logo-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  color: #bfdbfe;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.text-white {
  color: white;
}

.font-bold {
  font-weight: 700;
}

.text-blue-300 {
  color: #93c5fd;
}

.w-8 {
  width: 2rem;
}

.h-8 {
  height: 2rem;
}

.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

.w-full {
  width: 100%;
}

/* Menu Mobile Toggle */
.mobile-menu-btn {
  position: relative;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  transition: color 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
}

.mobile-menu-btn:hover {
  color: #bfdbfe;
}

.mobile-menu-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.5);
  border-radius: 0.25rem;
}

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

.mobile-menu-btn.active .hamburger-line:first-child {
  transform: rotate(45deg) translateY(0.375rem);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:last-child {
  transform: rotate(-45deg) translateY(-0.375rem);
}

/* Navigation Desktop */
.desktop-nav {
  display: none;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
  position: relative;
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
.nav-buttons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border: none;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px transparent;
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
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  border-top: 1px solid #1d4ed8;
  min-height: calc(100vh - 4rem);
}

@media (min-width: 1024px) {
  .mobile-nav {
    display: none;
  }
}

.mobile-nav-content {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: color 0.2s ease;
}

.mobile-nav-link:hover {
  color: #bfdbfe;
  background-color: rgba(30, 64, 175, 0.5);
}

.mobile-nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid #1d4ed8;
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

.scrolled-nav .navbar-container {
  height: 3.5rem;
}

.scrolled-nav .logo-text {
  font-size: 1.125rem;
}

.scrolled-nav .logo-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Responsive Design */
@media (max-width: 640px) {
  .navbar-container {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 3.5rem;
  }
  
  .logo-text {
    font-size: 1.125rem;
  }
  
  .mobile-nav-content {
    padding: 1rem;
  }
}

/* Utilitaires Tailwind conservés */
.hidden {
  display: none;
}

@media (min-width: 1024px) {
  .lg\:hidden {
    display: none;
  }
  
  .lg\:flex {
    display: flex;
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
.nav-link:focus-visible,
.mobile-nav-link:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}
</style>