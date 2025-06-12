<template>
  <div class="lg:flex">
    <!-- Section : Formulaire de création de facture -->
    <section class="p-6 space-x-5 bg-white mx-auto rounded-2xl shadow-lg space-y-10">
      <div class="lg:grid grid-cols-2 flex justify-between">
        <input type="file" accept="image/*" placeholder="importer votre logo" @change="previewLogo"
          class="bg-black rounded-full h-20 flex item-center justify-center w-20 text-center text-white justify-center" />
        <div class="bg-black"></div>
      </div>
      <div class="justify-start bg-blue-200 rounded-xl p-5 w-1/2 space-y-5">
        <input v-model="societer.nom" type="text"
          class="w-full bg-blue-100 rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" />
        <input v-model="societer.email" type="email"
          class="w-full bg-blue-100 rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" />
        <input v-model="societer.adresse" type="text"
          class="w-full bg-blue-100 rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" />
      </div>
      <!-- Informations client -->
      <div>
        <h2 class="text-2xl font-bold text-blue-900 mb-4">
          Informations client
        </h2>
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
            <input v-model="client.address" id="adresse" placeholder="Adresse"
              class="w-full bg-blue-100 rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center" />
          </div>
        </div>
      </div>

      <!-- Produits -->
      <div>
        <h2 class="text-2xl font-bold text-blue-900 mb-4">Produits</h2>
        <div v-for="(p, index) in produits" :key="index" class="flex flex-wrap gap-3 items-center mb-4">
          <input v-model="p.nom" placeholder="Nom" class="w-full lg:w-1/4 border-2 border-orange-100 rounded-xl p-2" />
          <input v-model.number="p.prix" type="number" placeholder="Prix"
            class="w-full lg:w-1/4 border-2 border-orange-100 rounded-xl p-2" />
          <input v-model.number="p.quantite" type="number" placeholder="Quantité"
            class="w-full lg:w-1/4 border-2 border-orange-100 rounded-xl p-2" />
          <div class="text-blue-800 font-semibold lg:w-auto">
            {{ (p.prix * p.quantite).toFixed(2) }} €
          </div>
          <button @click="supprimerLigne(index)"
            class="bg-red-500 text-white rounded-full w-6 h-6 text-center hover:bg-red-600 shadow">
            ×
          </button>
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
          <select v-model="reduction.type" class="w-full lg:w-1/3 bg-blue-100 rounded-xl p-3 border border-gray-300">
            <option value="pourcentage">Pourcentage (%)</option>
            <option value="montant">Montant fixe (€)</option>
          </select>
          <input v-model.number="reduction.valeur" type="number" placeholder="Valeur de la réduction"
            class="w-full lg:w-1/3 border-2 border-orange-300 rounded-xl p-3" />
        </div>
      </div>

      <!-- Commentaire / Info -->
      <div>
        <h2 class="text-2xl font-bold text-blue-900 mb-4">
          Informations supplémentaires
        </h2>
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

    <div class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans">
      <h2 class="font-bold text-2xl mb-6 text-center text-gray-700">
        Aperçu de la facture
      </h2>

      <!-- En-tête -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-4">
          <div class="bg-white border rounded-full h-20 w-20 flex items-center justify-center overflow-hidden shadow">
            <img v-if="logoDataUrl" :src="logoDataUrl" alt="Logo" class="h-full w-full object-cover" />
          </div>
          <div>
            <h3 class="text-xl font-semibold">{{ societer.nom }}</h3>
            <p class="text-sm text-gray-600">{{ societer.email }}</p>
            <p class="text-sm text-gray-600">{{ societer.adresse }}</p>
          </div>
        </div>
      </div>

      <!-- Informations client -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 class="font-semibold mb-2 text-gray-800">Client :</h4>
        <p><strong>Nom :</strong> {{ client.nom }}</p>
        <p><strong>Email :</strong> {{ client.email }}</p>
        <p><strong>Adresse :</strong> {{ client.adresse }}</p>
      </div>

      <!-- Produits -->
      <div class="mb-8">
        <div
          class="grid grid-cols-4 gap-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
          <div class="truncate">Description</div>
          <div class="text-center">Quantité</div>
          <div class="text-center">Prix unitaire</div>
          <div class="text-right">Prix total</div>
        </div>
        <div v-for="(p, i) in produits" :key="i" class="grid grid-cols-4 p-3 border-b text-sm text-gray-800">
          <div class="whitespace-normal sm:whitespace-nowrap sm:truncate sm:overflow-hidden">
            {{ p.nom }}
          </div>

          <div class="text-center">{{ p.quantite }}</div>
          <div class="text-center">{{ p.prix.toFixed(2) }} €</div>
          <div class="text-right">{{ (p.prix * p.quantite).toFixed(2) }} €</div>
        </div>
      </div>

      <!-- Totaux -->
      <!-- Totaux -->
      <div class="grid grid-cols-2 gap-2 text-right text-gray-800 mb-4">
        <p><strong>Total HT :</strong></p>
        <p>{{ totalHT.toFixed(2) }} €</p>

        <template v-if="montantReduction > 0">
          <p class="text-red-500"><strong>Réduction :</strong></p>
          <p class="text-red-500">-{{ montantReduction.toFixed(2) }} €</p>
        </template>

        <p class="text-lg font-bold">Total TTC :</p>
        <p class="text-lg font-bold">{{ totalTTC.toFixed(2) }} €</p>
      </div>

      <!-- Supplément -->
      <div class="text-sm text-gray-600 italic">
        {{ suplement }}
      </div>
    </div>
  </div>
</template>

<script>
// Dans <script> de ton composant
import Facture from "../models/facture";
import societer from "../models/societer";
import Produit from "../models/produit";
import html2canvas from "html2canvas";
import { creerFacture, upsertClient } from "../services/api";
export default {
  data() {
    return {
      client: { nom: "", email: "", address: "" },
      produits: [new Produit("", 0, 1)],
      utiliseReduction: "non",
      reduction: { type: "pourcentage", valeur: 0 },
      suplement: "",
      logoDataUrl: null, // stores base64 image preview
      societer: new societer(
        "Mon Entreprise",
        "123 Rue Exemple",
        "contact@entreprise.com",
        "0123456789"
      ),
    };
  },
  computed: {
    factureInstance() {
      const reductionActive =
        this.utiliseReduction === "oui" ? this.reduction : null;
      return new Facture(
        this.societer,
        this.client,
        this.produits,
        reductionActive
      );
    },
    totalHT() {
      return this.factureInstance.getTotalHT();
    },
    montantReduction() {
      return this.factureInstance.getMontantReduction();
    },
    totalTTC() {
      return this.factureInstance.getTotalTTC();
    },
  },
  methods: {
    ajouterProduit() {
      this.produits.push(new Produit("", 0, 1));
    },
    supprimerLigne(index) {
      this.produits.splice(index, 1);
    },


    async sauvegarderFacture() {
      console.log('====================================');
      console.log(this.client);
      console.log('====================================');
      try {
        // 🧾 Étape 1 : création de la facture (en mémoire, sans l'enregistrer)
        const facture = new Facture(
          this.societer,
          this.client,
          this.produits,
          this.utiliseReduction === "oui" ? this.reduction : null,
          this.suplement
        );

        // ✅ Vérification des données de la facture
        facture.validate();
        const clientDataForUpsert = {
          nom: this.client.nom,
          email: this.client.email,
          address: this.client.address, // attention au nom ici : "address" et non "adresse"
        };

        if (!clientDataForUpsert.nom || !clientDataForUpsert.email || !clientDataForUpsert.address) {
          throw new Error("Le client doit avoir un nom, un email et une adresse valide.");
        }

        // 🔁 Étape 2 : upsert du client (envoie au back)
        const clientUpserted = await upsertClient(clientDataForUpsert);
        console.log("Client upserté :", clientUpserted);

        // 🧾 Étape 3 : création des données à envoyer pour la facture
        const factureData = {
          client_id: clientUpserted.id,       // Référence au client
          client_data: this.client,           // Données figées pour l'affichage
          societer: this.societer,
          produits: facture.produits,
          reduction: facture.reduction,
          suplement: facture.suplement,
          montant_total: facture.totalTTC,
          created_at: new Date().toISOString()
        };

        // 📤 Étape 4 : enregistrement de la facture
        await creerFacture(factureData);

        alert("✅ Facture enregistrée avec succès !");
      } catch (error) {
        console.error("Erreur :", error);
        alert("❌ Erreur lors de la sauvegarde : " + error.message);
      }
    },


    previewLogo(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.logoDataUrl = e.target.result;
      };

      reader.readAsDataURL(file); // converts file to base64 URL
    },
  },
};
</script>

<style scoped></style>
