<template>
    <section class="py-20 bg-white transition-colors duration-300">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <!-- Header -->
            <div class="text-center mb-16">
                <n-h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    Pourquoi choisir Factgen ?
                </n-h2>
                <n-p class="text-xl text-gray-600">
                    La solution de facturation qui s'adapte à vos besoins
                </n-p>
            </div>

            <!-- Avantages -->
            <div class="space-y-12">
                <AdvantageItem title="Gain de temps considérable"
                    description="Créez vos factures en 2 minutes au lieu de 30. Notre interface intuitive et nos modèles pré-configurés vous font gagner un temps précieux à consacrer à votre activité principale."
                    icon="schedule" stat-value="2 min" stat-label="pour créer une facture" is-reversed="false" />

                <AdvantageItem title="Conformité garantie"
                    description="Toutes vos factures respectent automatiquement la réglementation en vigueur. Mentions obligatoires, numérotation, TVA... Tout est géré pour vous."
                    icon="verified_user" stat-value="100%" stat-label="conforme légalement" is-reversed="true" />

                <AdvantageItem title="Augmentez votre CA"
                    description="Un suivi client efficace et des factures professionnelles augmentent votre crédibilité et facilitent les paiements. Moins d'impayés, plus de recommandations."
                    icon="trending_up" stat-value="+25%" stat-label="de chiffre d'affaires en moyenne"
                    is-reversed="false" />
            </div>
        </div>
    </section>
</template>

<script setup>
import AdvantageItem from './AdvantageItem.vue';
import { NH2, NP } from "naive-ui";
</script>
