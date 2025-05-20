<template >
  <div class="p-6  max-w-4xl mx-auto bg-white shadow rounded ">
    <h1 class="text-2xl text-blue-200 font-bold mb-4">📄 Liste des factures sauvegardées</h1>

    <div v-if="factures.length === 0" class="text-gray-600 flex ">
      Aucune facture sauvegardée pour le moment.
    </div>

    <div v-else class="space-y-6">
      <div v-for="(facture, index) in factures"
     :key="index"
     :ref="el => setFactureRef(el, index)"
     class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans">

        <p class="text-lg font-semibold mb-2">Facture {{ index + 1 }}</p>
        <div class="flex justify-between items-center mb-8">
      <div class="flex items-center space-x-4">
        <div class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden shadow">
          <img v-if="logoDataUrl" :src="logoDataUrl" alt="Logo" class="h-full w-full object-cover" />
        </div>
        <div v-if="facture.societer">
          <h3 class="text-xl font-semibold"> {{  facture.societer.nom }}</h3>
          <p class="text-sm text-gray-600">{{ facture.societer.email }}</p>
          <p class="text-sm text-gray-600">{{ facture.societer?.adresse }}</p>
        </div>
      </div>

          </div>
          <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
      <p><strong>Nom :</strong> {{ facture.client?.nom  }}</p>
      <p><strong>Email :</strong>{{ facture.client?.email }}</p>
      <p><strong>Adresse :</strong> {{ facture.client?.adresse }}</p>
      <p><strong>Date :</strong> {{ formatDate(facture.date) }}</p>
      
    </div>
    
    
    <div class="mb-8">
      <div class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
        <div class="truncate">Description</div>
        <div class="text-center">Quantité</div>
        <div class="text-center">Prix unitaire</div>
        <div class="text-right">Prix total</div>
    </div>
      <div v-for="(p, i) in facture.produits || []" :key="i" class="grid grid-cols-4 p-3 border-b text-sm text-gray-800">
        <div class="truncate">{{ p.nom }}</div>
        <div class="text-center">{{ p.quantite }}</div>
        <div class="text-center">{{ p.prix }} €</div>
        <div class="text-right">{{ formatPrix(p.quantite * p.prix) }} €</div>
    </div>
      </div>
    
      <div class="grid grid-cols-2 gap-2 text-right text-gray-800 mb-4">
        <p class="mt-2">
          <strong>Total HT :</strong> {{ formatPrix(facture.totalHT) }} €
        </p>

        <p v-if="isNumber(facture.montantReduction) && facture.montantReduction > 0">
          <strong>Réduction :</strong> -{{ formatPrix(facture.montantReduction) }} €
        </p>
      <p class="font-bold text-lg">
          Total TTC : {{ formatPrix(facture.totalTTC || facture.totalHT) }} €
        </p>
    </div>

        

        

        <p v-if="isNumber(facture.montantReduction) && facture.montantReduction > 0">
          <strong>Réduction :</strong> -{{ formatPrix(facture.montantReduction) }} €
        </p>

        <p class="font-bold text-lg">
          Total TTC : {{ formatPrix(facture.totalTTC || facture.totalHT) }} €
        </p>

        <p class="text-sm text-gray-500 mt-2">Info supp : {{ facture.suplement || '—' }}</p>
        <div class="flex justify-between">
          <button class="p-3 bg-primary rounded hover:bg-blue-300" @click="downloadPDF(index)">
            Télécharger en PDF
        </button>
        <button popovertarget="suprimer" class="p-3 bg-red-200 rounded hover:bg-red-300" @click="supprimerFacture(index)">
          supprimer
        </button>
        <div popover id="my-popover" class="opacity-0 starting:open:opacity-0 ...">
            suprimer avec succès 
        </div>




        </div>
        
        
      </div>
     
    </div>
    
    
  </div>
</template>

<script>
  import { ref } from 'vue'
  import {jsPDF} from 'jspdf';
  import html2pdf from 'html2pdf.js';
  import Facture from '../models/facture';
  import societer from '../models/societer';
export default {
  setup() {
    const isOpen = ref(false);
    return { isOpen };
    
  },
  name: 'ListeFactures',
  data() {
    return {
      factures: [],
      factureElements: []
      
    };
  },
  created() {
  const data = localStorage.getItem('factures')
  if (data) {
    const facturesBrutes = JSON.parse(data)

    this.factures = facturesBrutes.map(factureData => {
      // Sécuriser l'accès à societer
      const socData = factureData.societer || {
        
      }

      const soc = new societer(
        socData.nom,
        socData.adresse,
        socData.email,
        socData.telephone
      )

      const client = factureData.client || { nom: '', email: '', adresse: '' }
      const produits = factureData.produits || []
      const reduction = factureData.reduction || null

      const facture = new Facture(
        soc,
        client,
        produits,
        reduction
      )

      if (factureData.date) {
        facture.date = factureData.date
      }

      if (factureData.suplement) {
        facture.suplement = factureData.suplement
      }

      return facture
    })
  }
}
,
  methods: {
  
    downloadPDF(index) {
  const element = this.factureElements[index]

  if (!element) {
    console.error(`❌ Élément DOM introuvable pour la facture index: ${index}`)
    alert("Erreur : la facture n'a pas pu être localisée.")
    return
  }

  html2pdf()
    .from(element)
    .set({
      margin: 10,
      filename: `facture-${index + 1}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .save()
}
,
  // Fonction pour définir la référence de l'élément de la facture
setFactureRef(el, index) {
  if (el) this.factureElements[index] = el
}
,
  // Fonction pour supprimer une facture
supprimerFacture(index) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
    this.factures.splice(index, 1);
    localStorage.setItem('factures', JSON.stringify(this.factures));
    alert("Facture supprimée avec succès !");
  }
},
  
  // Fonction pour formater la date

  
  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  },
  isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  },
  formatPrix(value) {
    const num = Number(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  },
  

},



  
};
</script>

<style scoped>
</style>
