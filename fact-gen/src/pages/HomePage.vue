<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <main>
      <HeroSection />
      <FeaturesSection :features="featuresData" />
      <AdvantagesSection />
      <FAQSection :sections="faqData" />
      <FinalCTASection />
      
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

// Importation des composants modulaires
import HeroSection from '../components/main/HeroSection.vue';
import StatsSection from '../components/main/StatsSection.vue';
import FeaturesSection from '../components/main/FeaturesSection.vue';
import AdvantagesSection from '../components/main/AdvantagesSection.vue';
import FAQSection from '../components/main/FAQSection.vue';
import FinalCTASection from '../components/main/FinalCTASection.vue';

// Supposons que FactureForm est un composant de formulaire
import FactureForm from '../components/FactureForm.vue'; 

// --- DONNÉES (Transférées ici ou passées aux composants) ---

const featuresData = ref([
  {
    title: 'Création rapide',
    description: 'Générez vos factures en quelques minutes avec nos modèles professionnels et personnalisables.',
    icon: 'credit_card', // Material Symbol
    color: 'blue'
  },
  {
    title: 'CRM intégré',
    description: 'Gérez votre base clients avec un CRM simple et efficace. Historique et suivi inclus.',
    icon: 'group',
    color: 'blue'
  },
  {
    title: 'Export PDF',
    description: 'Téléchargez vos factures au format PDF professionnel, prêtes à être envoyées.',
    icon: 'picture_as_pdf',
    color: 'blue'
  },
  {
    title: 'Conformité légale',
    description: 'Mentions légales obligatoires incluses automatiquement selon la réglementation.',
    icon: 'verified_user',
    color: 'blue'
  },
  {
    title: 'Suivi et analyse',
    description: 'Suivez vos performances avec des statistiques détaillées sur votre activité.',
    icon: 'bar_chart',
    color: 'blue'
  },
  {
    title: 'Sécurité totale',
    description: 'Vos données sont protégées avec un chiffrement de niveau bancaire.',
    icon: 'lock',
    color: 'blue'
  },
]);

const faqData = ref([
  {
    title: "Factgen est-il vraiment gratuit ?",
    content: "Oui, Factgen est 100% gratuit. Vous pouvez créer un nombre illimité de factures et devis sans aucune restriction."
  },
  {
    title: "Mes données sont-elles sécurisées ?",
    content: "Absolument. Nous utilisons un chiffrement de niveau bancaire pour protéger toutes vos données. Nous ne vendons jamais vos informations et respectons strictement le RGPD."
  },
  {
    title: "Puis-je personnaliser mes factures ?",
    content: "Oui, vous pouvez personnaliser le design de vos factures avec votre logo, vos couleurs et vos informations d'entreprise. Plusieurs modèles professionnels sont disponibles."
  },
  {
    title: "Les factures sont-elles conformes à la loi ?",
    content: "Toutes les factures générées incluent automatiquement les mentions légales obligatoires : numérotation, TVA, SIRET, conditions de paiement, etc."
  },
  {
    title: "Puis-je gérer mes clients ?",
    content: "Oui, Factgen inclut un CRM simple pour gérer votre base clients, suivre l'historique des factures et analyser vos performances commerciales."
  },
  {
    title: "Comment exporter mes factures ?",
    content: "Vos factures sont automatiquement générées au format PDF professionnel. Vous pouvez les télécharger, les imprimer ou les envoyer directement par email."
  },
]);

// Fonctionnalité de tracking (simulée)
const trackEvent = (eventName, properties = {}) => {
  console.log(`Tracking event: ${eventName}`, properties);
};

// Lifecycle
onMounted(() => {
  trackEvent('page_view', { page: 'landing' });
});

// Expose les données et méthodes si nécessaire pour l'extérieur, 
// mais ici on les gère en interne ou on les passe en props.
</script>

<style scoped>
/* Les styles globaux de la landing page peuvent rester ici si nécessaire,
   mais la plupart des styles spécifiques ont été déplacés dans les composants. */
</style>