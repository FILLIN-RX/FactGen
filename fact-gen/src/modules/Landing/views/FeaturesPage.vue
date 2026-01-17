<template>
    <div class="bg-white min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            
            <div class="text-center mb-20">
                <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Avantages</h2>
                <p class="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    Fonctionnalités Puissantes
                </p>
                <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Tout ce dont vous avez besoin pour gérer votre facturation efficacement et professionnellement.
                </p>
            </div>

            <div class="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="feature in features" :key="feature.title" 
                     class="relative group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                     :class="{'opacity-75 border-dashed border-2': feature.comingSoon}">
                    
                    <div>
                        <div class="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-xl text-indigo-600 mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            <component :is="feature.icon" class="h-8 w-8" aria-hidden="true" />
                        </div>

                        <div class="flex items-center gap-3 mb-3">
                            <h3 class="text-xl font-bold text-gray-900 leading-6">
                                {{ feature.title }}
                            </h3>
                            <span v-if="feature.comingSoon" 
                                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Bientôt
                            </span>
                        </div>
                        
                        <p class="text-base text-gray-500 leading-relaxed">
                            {{ feature.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { 
    PencilIcon, 
    PaintBrushIcon, 
    ChartBarIcon, 
    UsersIcon, 
    EnvelopeIcon, 
    CreditCardIcon 
} from '@heroicons/vue/24/outline'

const features = [
    {
        title: 'Éditeur Intuitif',
        description: 'Créez des factures en quelques clics avec notre interface glisser-déposer simple et rapide.',
        icon: PencilIcon,
        comingSoon: false
    },
    {
        title: 'Modèles Professionnels',
        description: 'Choisissez parmi une variété de modèles élégants et personnalisables pour votre image de marque.',
        icon: PaintBrushIcon,
        comingSoon: false
    },
    {
        title: 'Tableau de Bord',
        description: 'Suivez vos revenus, vos factures en attente et l\'évolution de votre activité en temps réel.',
        icon: ChartBarIcon,
        comingSoon: false
    },
    {
        title: 'Gestion Clients',
        description: 'Gérez facilement votre base de clients, sauvegardez leurs infos pour une facturation encore plus rapide.',
        icon: UsersIcon,
        comingSoon: false
    },
    {
        title: 'Envoi par Email',
        description: 'Envoyez vos factures directement par email à vos clients depuis l\'application.',
        icon: EnvelopeIcon,
        comingSoon: true
    },
    {
        title: 'Paiement en Ligne',
        description: 'Permettez à vos clients de payer leurs factures directement en ligne via Stripe ou PayPal.',
        icon: CreditCardIcon,
        comingSoon: true
    }
]
</script>

<style scoped>
/* Optionnel : Ajout d'un effet de grain ou de dégradé subtil à l'arrière-plan */
</style>