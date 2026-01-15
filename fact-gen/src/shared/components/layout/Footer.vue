<template>
    <footer class="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <!-- Section principale -->
        <div class="px-4 py-12 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-7xl">
                <!-- Mobile: Stack vertical, Desktop: Grid -->
                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    <!-- Branding -->
                    <div class="lg:col-span-1">
                        <div class="flex items-center space-x-2 mb-4">
                            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                            </div>
                            <h2 class="text-xl font-bold">FactGen</h2>
                        </div>
                        <p class="text-slate-300 text-sm leading-relaxed mb-4">
                            La solution complète pour gérer vos factures, devis et clients en toute simplicité.
                        </p>
                        <!-- Réseaux sociaux -->
                        <div class="flex space-x-4">
                            <a href="#" class="text-slate-400 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" class="text-slate-400 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                            </a>
                            <a href="#" class="text-slate-400 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Produit -->
                    <div>
                        <h3 class="font-semibold text-white mb-4">Produit</h3>
                        <ul class="space-y-3 text-sm">
                            <li><a href="/facturation"
                                    class="text-slate-300 hover:text-white transition-colors">Facturation</a></li>
                            <li><a href="/devis" class="text-slate-300 hover:text-white transition-colors">Devis</a>
                            </li>
                            <li><a href="/clients" class="text-slate-300 hover:text-white transition-colors">Gestion
                                    clients</a></li>
                            <li><a href="/reporting"
                                    class="text-slate-300 hover:text-white transition-colors">Reporting</a></li>
                            <li><a href="/integration"
                                    class="text-slate-300 hover:text-white transition-colors">Intégrations</a></li>
                        </ul>
                    </div>

                    <!-- Support -->
                    <div>
                        <h3 class="font-semibold text-white mb-4">Support</h3>
                        <ul class="space-y-3 text-sm">
                            <li><a href="/aide" class="text-slate-300 hover:text-white transition-colors">Centre
                                    d'aide</a></li>
                            <li><a href="/documentation"
                                    class="text-slate-300 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="/tutoriels"
                                    class="text-slate-300 hover:text-white transition-colors">Tutoriels</a></li>
                            <li><a href="/api" class="text-slate-300 hover:text-white transition-colors">API</a></li>
                            <li><a href="/statut" class="text-slate-300 hover:text-white transition-colors">Statut
                                    service</a></li>
                        </ul>
                    </div>

                    <!-- Contact & Entreprise -->
                    <div>
                        <h3 class="font-semibold text-white mb-4">Contact</h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                    </path>
                                </svg>
                                <a href="mailto:support@factgen.com"
                                    class="text-slate-300 hover:text-white transition-colors">
                                    support@factgen.com
                                </a>
                            </div>
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                    </path>
                                </svg>
                                <span class="text-slate-300">+237 674 376 524</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span class="text-slate-300">Yaounde, Cameroun</span>
                            </div>
                        </div>

                        <!-- Sélecteur de langue -->
                        <div class="mt-6">
                            <label for="langue" class="block text-sm font-medium text-slate-300 mb-2">Langue</label>
                            <select id="langue" name="langue"
                                class="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent custom-select"
                                @change="changeLanguage" v-model="selectedLanguage">
                                <option value="fr">🇫🇷 Français</option>
                                <option value="en">🇬🇧 English</option>
                                <option value="es">🇪🇸 Español</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Séparateur -->
        <div class="border-t border-slate-700"></div>

        <!-- Section bottom -->
        <div class="px-4 py-6 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-7xl">
                <div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
                        <p class="text-sm text-slate-400">
                            © 2025 FactGen. Tous droits réservés.
                        </p>
                        <div class="flex space-x-4 text-sm">
                            <a href="/mentions-legales" class="text-slate-400 hover:text-white transition-colors">
                                Mentions légales
                            </a>
                            <a href="/confidentialite" class="text-slate-400 hover:text-white transition-colors">
                                Confidentialité
                            </a>
                            <a href="/cookies" class="text-slate-400 hover:text-white transition-colors">
                                Cookies
                            </a>
                            <a href="/cgu" class="text-slate-400 hover:text-white transition-colors">
                                CGU
                            </a>
                        </div>
                    </div>

                    <!-- Badge de sécurité -->
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.372 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                            </path>
                        </svg>
                        <span class="text-xs text-slate-400">Sécurisé SSL</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            selectedLanguage: 'fr'
        }
    },
    methods: {
        changeLanguage(event) {
            this.selectedLanguage = event.target.value;
            // Ici vous pouvez ajouter la logique pour changer la langue
            this.$emit('language-changed', this.selectedLanguage);
        }
    }
}
</script>

<style scoped>
/* Animations pour les liens */
footer a {
    transition: all 0.2s ease-in-out;
    border-radius: 4px;
    /* Added for better focus ring appearance */
}

footer a:hover {
    transform: translateY(-1px);
}

/* Style personnalisé pour le select */
.custom-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .grid {
        gap: 2rem;
    }

    footer h3 {
        font-size: 1rem;
        line-height: 1.5rem;
    }
}
</style>
