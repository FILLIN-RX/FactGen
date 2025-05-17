<template>
  <div class="lg:flex p-5 ">

  
 <!-- Section : Formulaire de création de facture -->
<section class="p-6 bg-white max-w-4xl mx-auto rounded-2xl shadow-lg space-y-10">

<!-- Informations client -->
<div>
  <h2 class="text-2xl font-bold text-blue-900 mb-4">Informations client</h2>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div>
      <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
      <input v-model="client.nom" id="nom" placeholder="Nom"
        class="w-full bg-blue-100 rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="client.email" id="email" placeholder="Email"
        class="w-full bg-blue-100 rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" />
    </div>
    <div>
      <label for="adresse" class="block text-sm font-medium text-gray-700">Adresse</label>
      <input v-model="client.adresse" id="adresse" placeholder="Adresse"
        class="w-full bg-blue-100 rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" />
    </div>
  </div>
</div>

<!-- Produits -->
<div>
  <h2 class="text-2xl font-bold text-blue-900 mb-4">Produits</h2>
  <div v-for="(p, index) in produits" :key="index" class="flex flex-wrap gap-3 items-center mb-4">
    <input v-model="p.nom" placeholder="Nom"
      class="w-full lg:w-1/4 border-2 border-orange-100 rounded-xl p-2" />
    <input v-model.number="p.prix" type="number" placeholder="Prix"
      class="w-full lg:w-1/4 border-2 border-orange-100 rounded-xl p-2" />
    <input v-model.number="p.quantite" type="number" placeholder="Quantité"
      class="w-full lg:w-1/4 border-2 border-orange-100 rounded-xl p-2" />
    <div class="text-blue-800 font-semibold lg:w-auto">{{ (p.prix * p.quantite).toFixed(2) }} €</div>
    <button @click="supprimerLigne(index)"
      class="bg-red-500 text-white rounded-full w-6 h-6 text-center hover:bg-red-600 shadow">×</button>
  </div>
  <button @click="ajouterProduit"
    class="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition">
    Ajouter un produit
  </button>
</div>

<!-- Réduction -->
<div>
  <h2 class="text-2xl font-bold text-blue-900 mb-4">Réduction</h2>
  <div class="flex items-center gap-6">
    <label class="flex items-center gap-2">
      <input type="radio" value="oui" v-model="utiliseReduction" />
      <span>Oui</span>
    </label>
    <label class="flex items-center gap-2">
      <input type="radio" value="non" v-model="utiliseReduction" />
      <span>Non</span>
    </label>
  </div>

  <div v-if="utiliseReduction === 'oui'" class="mt-4 space-y-4">
    <select v-model="reduction.type"
      class="w-full lg:w-1/3 bg-blue-100 rounded-xl p-3 border border-gray-300">
      <option value="pourcentage">Pourcentage (%)</option>
      <option value="montant">Montant fixe (€)</option>
    </select>
    <input v-model.number="reduction.valeur" type="number" placeholder="Valeur de la réduction"
      class="w-full lg:w-1/3 border-2 border-orange-300 rounded-xl p-3" />
  </div>
</div>

<!-- Commentaire / Info -->
<div>
  <h2 class="text-2xl font-bold text-blue-900 mb-4">Informations supplémentaires</h2>
  <textarea v-model="suplement" placeholder="Informations additionnelles..."
    class="w-full border-2 border-orange-200 rounded-xl p-4 h-24 resize-none"></textarea>
</div>

<!-- Bouton sauvegarde -->
<div class="text-center">
  <button @click="sauvegarderFacture"
    class="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition">
    Sauvegarder la facture
  </button>
</div>
</section>


    <!-- Aperçu facture -->
    
  <div class="bg-gray-100 p-4 mt-3 rounded shadow lg:w-1/2 ">
      <h2 class="font-bold text-lg mb-2">Aperçu de la facture</h2>
      <div class="py-10 pl-5">

     
      <p><strong>Client :</strong>  </p>
      <p><strong>NOM:</strong>{{ client.nom }} </p>
      <p><strong>EMAIL:</strong>{{ client.email }}</p>
      <p><strong>ADRESSE:</strong>{{ client.adresse }}</p>

      </div>

      <ul class="list-disc pl-5">
        <li class="grid flex grid-cols-4 font-bold text-xl grid-rows-1">
          <div class=" shrink">Description</div> 
          <div class=" shrink">Quantite</div>
          <div class=" shrink">Prix unitaire</div> 
          <div class=" shrink">Prix total</div>
        </li>
        <li class="grid grid-cols-4 grid-rows-1" v-for="(p, i) in produits" :key="i">
          <div class="">{{ p.nom }}</div> 
          <div class="">{{ p.quantite }}</div>
          <div class="">{{ p.prix.toFixed(2) }} €</div> 
          <div class="">{{ (p.prix * p.quantite).toFixed(2) }} €</div>
        </li>
      </ul>

      <div class="text-right grid grid-cols-2">

      <p class="mt-2"><strong>Total HT :</strong> </p>
      <p>{{ totalHT.toFixed(2) }} €</p>
      <p v-if="montantReduction > 0" class="text-red-600">
        Réduction :
      </p>
      <p v-if="montantReduction">
        -{{ montantReduction.toFixed(2) }} €
      </p>
      <p class="font-bold text-lg mt-1 ">Total TTC : </p>
      <p>
        {{ totalTTC.toFixed(2) }} €
      </p>
    </div>
    {{ suplement }}
  </div>
</div>
</template>

<script>
// Dans <script> de ton composant
import Facture from '../models/facture';

export default {
  data() {
    return {
      client: { nom: '', email: '', adresse: '' },
      produits: [{ nom: '', prix: 0, quantite: 1 }],
      utiliseReduction: 'non',
      reduction: { type: 'pourcentage', valeur: 0 },
      suplement: ''
    };
  },
  computed: {
    factureInstance() {
      const reductionActive = this.utiliseReduction === 'oui' ? this.reduction : null;
      return new Facture(this.client, this.produits, reductionActive);
    },
    totalHT() {
      return this.factureInstance.getTotalHT();
    },
    montantReduction() {
      return this.factureInstance.getMontantReduction();
    },
    totalTTC() {
      return this.factureInstance.getTotalTTC();
    }
  },
  methods: {
    ajouterProduit() {
      this.produits.push({ nom: '', prix: 0, quantite: 1 });
    },
    supprimerLigne(index) {
      this.produits.splice(index, 1);
    },
    sauvegarderFacture() {
  const f = new Facture(
    this.client,
    this.produits,
    this.reduction,
    this.utiliseReduction,
    this.suplement
  );
  f.sauvegarder();
}

  }
};

</script>

<style scoped>

</style>
