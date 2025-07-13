<template>
  <section class="py-16 bg-white">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-4 text-slate-900">Toutes les fonctionnalités dont vous avez besoin</h2>
    <p class="text-slate-600 mb-12">Factgen vous accompagne dans la création de factures professionnelles, claires et personnalisées, en quelques minutes.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <div>
        <h3 class="text-xl font-semibold text-blue-700 mb-2">🧾 Création de factures intelligente</h3>
        <p class="text-slate-600">Remplissez un formulaire simple et complet pour générer automatiquement une facture professionnelle prête à être envoyée.</p>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-blue-700 mb-2">🎨 Modèles personnalisables</h3>
        <p class="text-slate-600">Choisissez parmi plusieurs modèles de facture modernes, minimalistes ou classiques selon votre image de marque.</p>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-blue-700 mb-2">📈 Calculs automatiques</h3>
        <p class="text-slate-600">Totaux HT, TVA, réduction et TTC sont calculés automatiquement selon vos produits ou services ajoutés.</p>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-blue-700 mb-2">📤 Export PDF professionnel</h3>
        <p class="text-slate-600">Générez des fichiers PDF propres et prêts à être envoyés à vos clients. Compatible impression & envoi digital.</p>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-blue-700 mb-2">📁 Historique & gestion</h3>
        <p class="text-slate-600">Retrouvez toutes vos factures précédentes, suivez vos revenus et gérez vos documents depuis un tableau de bord clair.</p>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-blue-700 mb-2">🔐 Compte sécurisé</h3>
        <p class="text-slate-600"> Vos données sont privées, sécurisées, et liées à votre compte personnel.</p>
      </div>
    </div>
  </div>
</section>
<section class="py-16 bg-slate-50">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-4 text-slate-900">Fonctionnalités à venir</h2>
    <p class="text-slate-600 mb-12">Nous travaillons activement pour rendre Factgen encore plus puissant et complet.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
      <div v-for="(feature, index) in upcomingFeatures" :key="index">
        <h3 class="text-xl font-semibold text-indigo-700 mb-2">🔧 {{ feature.title }}</h3>
        <p class="text-slate-600">{{ feature.desc }}</p>
      </div>
    </div>
  </div>
</section>


</template>

<script setup>
const upcomingFeatures = [
  { title: "Paiement en ligne", desc: "Permettez à vos clients de payer directement leurs factures par carte ou mobile money." },
  { title: "Rappels automatiques", desc: "Recevez ou envoyez des rappels lorsque l’échéance approche." },
  { title: "Gestion des devis", desc: "Créez, envoyez et convertissez vos devis en factures." },
  { title: "Mode multi-utilisateur", desc: "Ajoutez des collaborateurs à votre espace de travail." },
  { title: "Traduction multilingue", desc: "Créez vos factures en plusieurs langues." },
  { title: "Catalogue & importation", desc: "Importez clients/produits et créez un catalogue prêt à l’emploi." },
  { title: "Statistiques avancées", desc: "Analysez vos revenus, vos meilleurs clients, et plus encore." },
  { title: "Application mobile", desc: "Facturez vos clients depuis votre smartphone (iOS & Android)." }
]

</script>

