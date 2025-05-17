<template>
  <div class="lg:flex  inset-shadow-sm inset-shadow-indigo-500/50 p-5 ">

  
  <div class="p-3 space-y-6 bg-white max-w-2xl mx-auto rounded shadow h-full">
    <!-- Client -->
    <h2 class="font-bold text-lg mb-2">Informations client</h2>
    <div class="grid lg:grid-cols-3 grid-rows-1">
     
      <div class="p-3">
        <label for="nom">NOM:</label>
        <input v-model="client.nom" placeholder="Nom" class=" flex input bg-blue-100  rounded-xl border  border-1px-gray-200 focus:border-0 py-4 text-center" />
      </div>
      <div class="p-3">
        <label for="email">
            EMAIL:
        </label>
        <input v-model="client.email" placeholder="Email" class=" flex input bg-blue-100 rounded-xl  border  border-1px-gray-200 focus:border-0 py-4 text-center" />
      </div>
      <div class="p-3">
        <label for="ADRESSE">
          ADDRESS:
        </label>
        <input v-model="client.adresse" placeholder="Adresse" class="flex input bg-blue-100 rounded-xl  border  border-1px-gray-200 focus:border-0 py-4 text-center" />
      </div>
      
      
      
     
    </div>

    <!-- Produits -->
    <div>
      <h2 class="font-bold text-lg mb-2">Produits</h2>
      <div v-for="(p, index) in produits" :key="index" class="flex mb-2 space-x-3">
        <input v-model="p.nom" placeholder="Nom" class="input w-1/3 border rounded border-2 border-orange-100 p-1 lg:w-1/4" />
        <input v-model.number="p.prix" placeholder="Prix" type="number" class="input w-1/3 border border-2 rounded border-orange-100 p-1 lg:w-1/4" />
        <input  v-model.number="p.quantite" placeholder="Quantité" type="number" class="input w-1/3 border-2 border rounded border-orange-100 p-1 lg:w-1/4" />
        <div class="lg:w-1/4">{{ (p.prix * p.quantite).toFixed(2) }} €</div>
        <button @click="supprimerLigne(index)"
              class=" -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-center shadow hover:bg-red-600">
        ×
      </button>
      </div>
      <button @click="ajouterProduit" class="btn outline-2 outline-offset-2 outline-green-200 bg-green-400 rounded-xl p-3 hover:bg-green-200">Ajouter un produit</button>
    </div>

    <!-- Réduction facultative -->
    <div>
      <h2 class="font-bold text-lg mb-2 space-x-5">Réduction</h2>
      <label>
        <input type="radio" value="oui" v-model="utiliseReduction" /> Oui
      </label>
      <label class="ml-4">
        <input type="radio" value="non" v-model="utiliseReduction" /> Non
      </label>

      <div v-if="utiliseReduction === 'oui'" class="mt-4 space-y-2 space-x-5">
        <select v-model="reduction.type" class="input p-5 px-6 bg-blue-100 rounded-xl">
          <option value="pourcentage" class="p-5 bg-blue-200 rounded">Pourcentage %</option>
          <option value="montant">Montant fixe</option>
        </select>
        <input v-model.number="reduction.valeur" placeholder="Valeur de la réduction" type="number" class="input border border-2 rounded-xl border-orange-300 p-4" />
      </div>
      <div>
        <input type="text" v-model="suplement" class="w-full outline-2 outline-offset outline-orange-200  p-3 rounded h-20" placeholder="Information supplementaire">
      </div>
      <button @click="sauvegarderFacture" class="mt-6 bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
      Sauvegarder la facture
    </button>

    </div>

    <!-- Aperçu facture -->
    
  </div>
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
