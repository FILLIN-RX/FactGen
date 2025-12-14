<template>
  <section class="relative py-16 bg-primary overflow-hidden">
    
    <!-- SVG CIRCLE BACKGROUND -->
    <svg
      class="absolute -top-10 -right-0 w-76 h-96 opacity-20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <circle cx="100" cy="100" r="100" fill="#ffffff"/>
    </svg>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center text-white relative z-10">

      <!-- TITRE -->
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight whitespace-nowrap">
        Prêt à transformer votre facturation ?
      </h2>

      <!-- DESCRIPTION -->
      <p class="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto mb-8">
        Rejoignez des milliers de professionnels qui font confiance à Factgen pour leur facturation. Gratuit, sans engagement.
      </p>

      <!-- BOUTON PRINCIPAL -->
      <router-link to="/facture">
        <button
          class="md-btn-filled relative inline-flex items-center justify-center
                 px-10 py-4 rounded-xl font-semibold text-lg shadow-md
                 hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2"
        >
          Commencer maintenant
        </button>
      </router-link>

      <!-- TRUST INDICATORS -->
      <div class="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm opacity-90">
        <TrustIndicator icon="check_circle" text="Aucune carte requise" color="white" />
        <TrustIndicator icon="check_circle" text="Utilisation immédiate" color="white" />
        <TrustIndicator icon="check_circle" text="Support inclus" color="white" />
      </div>

    </div>
  </section>
</template>

<style scoped>
.bg-primary { background-color: #1E40AF; }

/* Bouton Material */
.md-btn-filled {
  background-color: #ffffff;
  color: #1E40AF;
  font-weight: 500;
  transition: all 0.2s ease;
}

.md-btn-filled:hover {
  background-color: #f3f4f6;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

/* Ripple effect léger */
.md-btn-filled::after {
  content: "";
  position: absolute;
  border-radius: 9999px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.15);
  opacity: 0;
  transition: opacity 0.3s;
}

.md-btn-filled:active::after {
  opacity: 1;
  transition: opacity 0s;
}
</style>
