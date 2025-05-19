<template>
  <div class="p-6 max-w-3xl mx-auto bg-white shadow rounded">
    <button @click="popUp" class="btn outline-2 outline-offset-2 outline-green-200 bg-green-400 rounded-xl p-3 hover:bg-green-200">
      Ajouter un client
    </button>
    

    <div v-if="state">
      <h2 class="font-bold text-lg mb-2">client</h2>
    </div>

    <h1 class="text-2xl font-bold mb-4">👤 Détails du client</h1>

    <div v-if="!state">
      <p class="text-gray-600">Aucun client trouvé avec ce nom.</p>
    </div>

    <!-- Popup -->
    <div v-if="open" class="fixed inset-0 bg-black/10 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-xl max-w-4xl w-full relative">
        <button @click="open = false" class="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">×</button>

        <div>
          <div class="flex items-center justify-between border-b pb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Fiche Client</h2>
              <p class="text-sm text-gray-500">ID Client : #CLT-202505</p>
            </div>
            <div class="text-right">
              <span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Actif</span>
            </div>
          </div>

          <!-- Formulaire avec v-model sur clientForm -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">Nom complet</label>
              <input v-model="clientForm.nom" type="text" class="w-full text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Email</label>
              <input v-model="clientForm.email" type="email" class="w-full text-gray-800 border border-gray-300 rounded px-2 py-1" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Téléphone</label>
              <input type="text" placeholder="+33 6 12 34 56 78" class="w-full text-gray-800 border border-gray-300 rounded px-2 py-1" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Adresse</label>
              <input v-model="clientForm.adresse" type="text" class="w-full text-gray-800 border border-gray-300 rounded px-2 py-1" />
            </div>
          </div>
        </div>

        <div class="p-5 flex justify-center">
          <button @click="ajouterClient" class="bg-blue-300 rounded-xl hover:bg-blue-400 p-5">Sauvegarder</button>
        </div>
      </div>
    </div>

    <!-- Affichage des clients -->
    <div v-for="(client, i) in clients" :key="i" class="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
      <div class="flex items-center justify-between border-b pb-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">Fiche Client</h2>
          <p class="text-sm text-gray-500">ID Client : #CLT-202505</p>
        </div>
        <div class="text-right">
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Actif</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Nom complet</label>
          <p class="text-lg font-semibold text-gray-900">{{ client.nom }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Email</label>
          <p class="text-gray-800">{{ client.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Téléphone</label>
          <p class="text-gray-800">+33 6 12 34 56 78</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Adresse</label>
          <p class="text-gray-800">{{ client.adresse }}</p>
        </div>
      </div>

      <div class="px-6">
        <div class="flex items-center">
          <div class="border-r p-2">
            <h5 class="text-gray-400">Nombre de facture</h5>
            <p>18</p>
          </div>
          <div class="border-r text-red-900 p-2">
            <h5 class="text-red-400">facture en attente</h5>
            <p>8</p>
          </div>
          <div class="borde-r text-green-900 p-2">
            <h5 class="text-green-400">facture payer</h5>
            <p>10</p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Historique des factures</h3>
        <ul class="divide-y divide-gray-200">
          <li class="py-3 flex justify-between text-sm">
            <span>Facture #FCT-202401</span>
            <span class="text-green-600 font-medium">Payée</span>
          </li>
          <li class="py-3 flex justify-between text-sm">
            <span>Facture #FCT-202402</span>
            <span class="text-yellow-600 font-medium">En attente</span>
          </li>
        </ul>
      </div>

      <div class="flex justify-end space-x-3">
        <button class="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200">Modifier</button>
        <button @click="supprimerClient(index)" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
import Client from '../models/client.js';
import ClientForm from '../components/ClientForm.vue';

export default {
  name: 'Client',
  components: {
    ClientForm,
  },
  data() {
    return {
      nom: this.$route.params.nom,
      clients: [],
      clientForm: { nom: '', email: '', adresse: '' }, // 👈 Temp object
      state: false,
      open: false,
    };
  },
  methods: {
    formatPrix(val) {
      const num = Number(val);
      return isNaN(num) ? '0.00' : num.toFixed(2);
    },
    chercherClient(nom) {
      const data = JSON.parse(localStorage.getItem('factures')) || [];
      const facturesClient = data.filter(f => f.client?.nom === nom);
      this.clientFactures = facturesClient;

      if (facturesClient.length > 0) {
        const { nom, adresse, email } = facturesClient[0].client;
        this.client = new Client(nom, adresse, email);
      }
    },
    popUp() {
      this.open = true;
    },
    ajouterClient() {
      this.state = true;

      // ✅ Crée une instance de la classe avec les données du formulaire
      const nouveauClient = new Client(
        this.clientForm.nom,
        this.clientForm.adresse,
        this.clientForm.email
      );

      // ✅ Ajoute l’instance dans le tableau
      this.clients.push(nouveauClient);

      // ✅ Réinitialise le formulaire
      this.clientForm = { nom: '', email: '', adresse: '' };

      // ✅ Ferme le popup
      this.open = false;
    },
    supprimerClient(index){
    this.clients.splice(index,1)

  },
  },
 
  mounted() {
    this.chercherClient(this.nom);
  }
};
</script>
