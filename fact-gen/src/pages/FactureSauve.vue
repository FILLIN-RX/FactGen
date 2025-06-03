<template >
  <div class="p-6  max-w-4xl mx-auto bg-white shadow rounded " id="canvas">
    <h1 class="text-2xl text-blue-200 font-bold mb-4">📄 Liste des factures sauvegardées</h1>
    <FiltreSearch />
    <div v-if="factures.length === 0" class="text-gray-600 flex ">
      Aucune facture sauvegardée pour le moment.
    </div>
    <ul v-else >
      <li
         v-for="(facture, index) in factures"
        :key="facture.numero"
          @click="selectionnerFacture(facture, index)"
        :ref="el => setFactureRef(el, index)"
        class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans cursor-pointer hover:bg-gray-200 p-2"
      >
        <!-- Affichage résumé : numéro, client, date, total TTC -->
        #{{ facture.numero }} - {{ facture.client.nom }} - {{ facture.date }} - {{ facture.getTotalTTC().toFixed(2) }} €
      </li>
    </ul>
    <div  v-if="factureSelectionnee" class="fixed inset-0 bg-black/10 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center space-y-6" @click.self="factureSelectionnee = null">
      <div 
     class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans">

      
        <p class="text-lg font-semibold mb-2">Facture:{{factureSelectionnee.numero}}</p>
        <div class="flex justify-between items-center mb-8">
      <div class="flex items-center space-x-4">
        <div class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden shadow">
          <img v-if="logoDataUrl" :src="logoDataUrl" alt="Logo" class="h-full w-full object-cover" />
        </div>
        <div v-if="factureSelectionnee.societer">
          <h3 class="text-xl font-semibold"> {{  factureSelectionnee.societer.nom }}</h3>
          <p class="text-sm text-gray-600">{{ factureSelectionnee.societer.email }}</p>
          <p class="text-sm text-gray-600">{{ factureSelectionnee.societer?.adresse }}</p>
        </div>
      </div>

          </div>
          <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
      <p><strong>Nom :</strong> {{ factureSelectionnee.client?.nom  }}</p>
      <p><strong>Email :</strong>{{ factureSelectionnee.client?.email }}</p>
      <p><strong>Adresse :</strong> {{ factureSelectionnee.client?.adresse }}</p>
      <p><strong>Date :</strong> {{ formatDate(factureSelectionnee.date) }}</p>
      
    </div>
    
    
    <div class="mb-8">
      <div class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
        <div class="truncate">Description</div>
        <div class="text-center">Quantité</div>
        <div class="text-center">Prix unitaire</div>
        <div class="text-right">Prix total</div>
    </div>
      <div v-for="(p, i) in factureSelectionnee.produits || []" :key="i" class="grid grid-cols-4 p-3 border-b text-sm text-gray-800">
        <div class="truncate">{{ p.nom }}</div>
        <div class="text-center">{{ p.quantite }}</div>
        <div class="text-center">{{ p.prix }} €</div>
        <div class="text-right">{{ formatPrix(p.quantite * p.prix) }} €</div>
    </div>
      </div>
    
      <div class="grid grid-cols-2 gap-2 text-right text-gray-800 mb-4">
        <p class="mt-2">
          <strong>Total HT :</strong> {{ factureSelectionnee.totalHT.toFixed(2) }} €
        </p>
        
        <template v-if="factureSelectionnee.montantReduction > 0">
          
                <p class="text-red-500"><strong>Réduction :</strong>-{{ factureSelectionnee.montantReduction.toFixed(2) }} €</p>
        </template>
        
     
    </div>

        

        

            

        <p class="font-bold text-lg text-end">
          Total TTC : {{ factureSelectionnee.totalTTC.toFixed(2)  }} €
        </p>

        <p class="text-sm text-gray-500 mt-2">Info supp : {{ factureSelectionnee.suplement || '—' }}</p>
        <div class="flex justify-between">
          <button class="p-3 bg-primary rounded hover:bg-blue-300" @click="downloadPDF">
            Télécharger en PDF
        </button>
        <button popovertarget="suprimer" class="p-3 bg-red-200 rounded hover:bg-red-300" @click="supprimerFacture(index)">
          supprimer
        </button>
        <div popover id="my-popover" class="opacity-0 starting:open:opacity-0 ...">
            suprimer avec succès 
        </div>
        <button @click="factureSelectionnee = null" class="mt-4 btn btn-sm btn-danger">
        Fermer
      </button>




        </div>
        
       
      </div>
     
    </div>
    
    
  </div>
</template>

<script>
  import { ref } from 'vue'
  import jspdf from 'jspdf';
  import html2pdf from 'html2pdf.js';
  import Facture from '../models/facture';
  import societer from '../models/societer';
  import html2canvas from 'html2canvas';
 
import BarChart from '../components/BarChart.vue';
import FiltreSearch from '../components/FiltreSearch.vue';
export default {
  components: {
  
    FiltreSearch,
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
    
  },
  name: 'ListeFactures',
  data() {
    return {
      factures: [],
      factureElements: [],
      factureSelectionnee: null ,
      indexSelectionne: null,
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
  
    selectionnerFacture(facture, index) {
    this.factureSelectionnee = facture
    this.indexSelectionne = index
  },

  
    downloadPDF() {
  // Trouver l'élément canvas (ou l'élément racine à capturer)
  var canvas = document.getElementById('canvas');

  // Sauvegarder l'attribut style original
  const originalStyle = canvas.getAttribute('style') || '';

  // Appliquer un style qui écrase les couleurs problématiques (exemple)
  canvas.style.color = '#000';          // noir simple
  canvas.style.backgroundColor = '#fff'; // blanc simple

  // Lancer html2canvas
  html2canvas(canvas).then(function(canvas) {
    var imgData = canvas.toDataURL('image/png')
    var doc = new jspdf()
    doc.addImage(imgData,'PNG',10,10)
    doc.save('output.pdf')

    // Restaurer le style original
    canvas.setAttribute('style', originalStyle);
  });
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
    his.factureSelectionnee = null
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
