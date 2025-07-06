<template>
  <nav
    :class="{ 'scrolled-nav': scrollNav }"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out navbar"
  >
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-20"
    >
      <!-- Logo -->
      <div class="flex-shrink-0">
        <router-link
          to="/"
          class="flex items-center space-x-3 text-white hover:text-blue-100 transition-all duration-300 group"
        >
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"
              ></div>
              <div
                class="relative bg-white bg-opacity-10 p-2 rounded-xl backdrop-blur-sm border border-white border-opacity-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#2563eb"
                >
                  <rect width="24" height="24" rx="4" fill="#2563eb" />
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 10h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="text-2xl font-bold tracking-tight">
              <span class="text-white font-black">FACT</span>
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300"
                >GEN</span
              >
            </div>
          </div>
        </router-link>
      </div>

      <!-- Menu Mobile Toggle -->
      <button
        @click="toggleMobileNav"
        class="relative w-10 h-10 flex flex-col justify-center items-center text-white hover:text-blue-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-lg lg:hidden hover:bg-white hover:bg-opacity-10"
        :class="{ active: mobileNav }"
        aria-label="Toggle navigation"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Desktop -->
      <div class="hidden lg:flex items-center space-x-8">
        <div class="flex items-center space-x-8">
          <router-link to="/features" class="nav-link">
            <span class="nav-link-text">Fonctionnalités</span>
          </router-link>
          <router-link to="/pricing" class="nav-link">
            <span class="nav-link-text">Tarifs</span>
          </router-link>
          <router-link to="/support" class="nav-link">
            <span class="nav-link-text">Support</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <router-link to="/login" class="btn btn-outline">
            Connexion
          </router-link>
          <router-link to="/register" class="btn btn-primary">
            <span class="btn-text">S'inscrire</span>
            <svg
              class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <transition name="mobile-nav">
      <div
        v-if="mobileNav"
        class="absolute top-full left-0 w-full mobile-nav lg:hidden"
      >
        <div class="px-6 py-8 space-y-6">
          <div class="space-y-2">
            <router-link
              to="/features"
              class="mobile-nav-link"
              @click="closeMobileNav"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold">Fonctionnalités</div>
                  <div class="text-sm text-blue-200 opacity-70">
                    Découvrez nos outils
                  </div>
                </div>
              </div>
            </router-link>

            <router-link
              to="/pricing"
              class="mobile-nav-link"
              @click="closeMobileNav"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 bg-emerald-500 bg-opacity-20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold">Tarifs</div>
                  <div class="text-sm text-blue-200 opacity-70">
                    Plans et abonnements
                  </div>
                </div>
              </div>
            </router-link>

            <router-link
              to="/support"
              class="mobile-nav-link"
              @click="closeMobileNav"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold">Support</div>
                  <div class="text-sm text-blue-200 opacity-70">
                    Aide et assistance
                  </div>
                </div>
              </div>
            </router-link>
          </div>

          <div class="space-y-4 pt-6 border-t border-white border-opacity-20">
            <router-link
              to="/login"
              class="btn btn-outline w-full"
              @click="closeMobileNav"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="btn btn-primary w-full group"
              @click="closeMobileNav"
            >
              <span class="btn-text">S'inscrire</span>
              <svg
                class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
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

      if (this.mobileNav) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },

    closeMobileNav() {
      this.mobileNav = false;
      document.body.style.overflow = "auto";
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 1024) {
        this.mobileNav = false;
        document.body.style.overflow = "auto";
      }
    },

    updateScroll() {
      const scrollPosition = window.scrollY;
      this.scrollNav = scrollPosition > 50;
    },
  },
};
</script>

<style scoped>
/* Navbar principale */
.navbar {
  background: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.95) 0%,
    rgba(59, 130, 246, 0.9) 50%,
    rgba(16, 185, 129, 0.85) 100%
  );
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Navbar scrollée - Devient plus opaque et compacte */
.scrolled-nav {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.98) 100%
  );
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.scrolled-nav .mx-auto {
  height: 4rem;
}

.scrolled-nav .text-2xl {
  font-size: 1.5rem;
}

/* Changement de couleur du logo et texte quand scrollé */
.scrolled-nav .text-white {
  color: #1e293b !important;
}

.scrolled-nav .nav-link {
  color: #334155 !important;
}

.scrolled-nav .nav-link:hover {
  color: #1e40af !important;
}

.scrolled-nav .btn-outline {
  color: #1e40af !important;
  border-color: #1e40af !important;
}

.scrolled-nav .btn-outline:hover {
  background-color: #1e40af !important;
  color: white !important;
}

/* Hamburger pour mobile en mode scrolled */
.scrolled-nav .hamburger-line {
  background-color: #1e293b !important;
}

/* Navigation Links */
.nav-link {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.025em;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  color: #bfdbfe;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link-text {
  position: relative;
}

.nav-link-text::after {
  content: "";
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  width: 0;
  height: 0.125rem;
  background: linear-gradient(90deg, #60a5fa, #34d399);
  transition: width 0.3s ease;
}

.nav-link:hover .nav-link-text::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: #bfdbfe;
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-link.router-link-active .nav-link-text::after {
  width: 100%;
}

/* Boutons */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-outline {
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: 2px solid transparent;
  position: relative;
}

.btn-primary::after {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(135deg, #34d399, #10b981, #059669);
  border-radius: inherit;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4);
}

.btn-primary:active {
  transform: translateY(-1px);
}

/* Hamburger Animation */
.hamburger-line {
  display: block;
  width: 1.5rem;
  height: 0.125rem;
  background-color: currentColor;
  margin-bottom: 0.25rem;
  transition: all 0.3s ease;
  border-radius: 0.0625rem;
}

.hamburger-line:last-child {
  margin-bottom: 0;
}

.active .hamburger-line:first-child {
  transform: rotate(45deg) translateY(0.375rem);
}

.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-1rem);
}

.active .hamburger-line:last-child {
  transform: rotate(-45deg) translateY(-0.375rem);
}

/* Menu Mobile */
.mobile-nav {
  background: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.98) 0%,
    rgba(59, 130, 246, 0.95) 50%,
    rgba(16, 185, 129, 0.92) 100%
  );
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: calc(100vh - 5rem);
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  padding: 1rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  display: block;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
}

.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(0.5rem);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Animations */
.mobile-nav-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-nav-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.mobile-nav-enter-from {
  opacity: 0;
  transform: translateY(-2rem);
}

.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

/* Responsive Design */
@media (max-width: 640px) {
  .mx-auto {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 4rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .navbar {
    height: 4rem;
  }

  .scrolled-nav .mx-auto {
    height: 3.5rem;
  }
}

/* Amélioration de l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus states améliorés */
.btn:focus-visible,
.nav-link:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.3);
}

/* Ajout d'un effet de glassmorphism */
.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  pointer-events: none;
}
</style>
