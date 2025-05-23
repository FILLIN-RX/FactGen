<template>
  <!-- sur pc -->

  <div
    v-if="!isMobile"
    class="grid md:grid-cols-2 h-screen lg:p-5 lg:bg-blue-100"
  >
    <div class="p-4 bg-white rounded-xl lg:shadow">
      <div class="flex items-center space-x-5 justify-center">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un client..."
          class="w-full p-2 border justify-center items-center rounded"
        />
        <button
          @click="open = true"
          class="bg-blue-600 text-white text-[15px] px-4 justify-center rounded"
        >
          Ajouter un client
        </button>
      </div>
      <div v-if="clients.length === 0" class="text-gray-600 flex">
        Aucune facture sauvegardée pour le moment.
      </div>
      <ul v-else>
        <li
          v-for="(client, index) in clients"
          :key="index"
          @click="selectionnerClient(client, index)"
          :ref="(el) => setFactureRef(el, index)"
          class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans cursor-pointer hover:bg-gray-200 p-2"
        >
          <!-- Affichage résumé : numéro, client, date, total TTC -->
          #{{ client.nom }} - {{ client.telephone }}
        </li>
      </ul>

      <!-- Popup formulaire -->
      <div v-if="open" class="mt-4 bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-2">Nouveau client</h2>
        <form @submit.prevent="ajouterClient" class="space-y-2">
          <input
            v-model="clientForm.nom"
            type="text"
            placeholder="Nom"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.email"
            type="email"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.adresse"
            type="text"
            placeholder="Adresse"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.telephone"
            type="text"
            placeholder="+33 6 12 34 56 78"
            class="w-full p-2 border rounded"
          />
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded"
            >
              Ajouter
            </button>
            <button
              @click="open = false"
              type="button"
              class="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>

      <!-- Liste des clients -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <!-- Affichage des clients -->

        <div class="flex justify-center space-x-4 mt-6">
          <button
            @click="page--"
            :disabled="page === 1"
            class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span>Page {{ page }} / {{ totalPages }}</span>
          <button
            @click="page++"
            :disabled="page === totalPages"
            class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>

    <div class="apercu">
      <div
        v-if="clientSelectioner"
        class="hidden lg:block max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6"
      >
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Fiche Client</h2>
            <p class="text-sm text-gray-500">ID Client : #CLT-202505</p>
          </div>
          <div class="text-right">
            <span
              class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >Actif</span
            >
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Nom complet</label
            >
            <p class="text-lg font-semibold text-gray-900">
              {{ clientSelectioner.nom }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <p class="text-gray-800">{{ clientSelectioner.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Téléphone</label
            >
            <p class="text-gray-800">{{ clientSelectioner.telephone }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Adresse</label
            >
            <p class="text-gray-800">{{ clientSelectioner.adresse }}</p>
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
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            Historique des factures
          </h3>
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
          <button
            class="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
          >
            Modifier
          </button>
          <button
            @click="supprimerClient(index)"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- --------------------------------------------------------------------------------------------------------------------------------- -->
                                  <!-----------------------------------sur mobile-------------------------->
  <!-- ----------------------------------------------------------------------------------------------------------------------------------------- -->

  <div v-else class="p-4">
    <div class="p-4 bg-white rounded-xl lg:shadow">
      <div class="flex items-center space-x-5 justify-center">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un client..."
          class="w-full p-2 border justify-center items-center rounded"
        />
        <button
          @click="open = true"
          class="bg-blue-600 text-white text-[15px] px-4 justify-center rounded"
        >
          Ajouter un client
        </button>
      </div>
      <div v-if="clients.length === 0" class="text-gray-600 flex">
        Aucune facture sauvegardée pour le moment.
      </div>
      <ul v-else>
        <li 
          v-for="(client, index) in clients"
          :key="index"
          @click="openPopup"
          :ref="(el) => setFactureRef(el, index)"
          class="bg-white p-6 mt-6 rounded-xl shadow-lg mx-auto font-sans cursor-pointer hover:bg-gray-200 p-2"
        >
          <!-- Affichage résumé : numéro, client, date, total TTC -->
          #{{ client.nom }} - {{ client.telephone }}
        </li>
      </ul>

      <!-- Popup formulaire -->
      <div v-if="open" class="mt-4 bg-white p-6 rounded shadow-md">
        <h2 class="text-lg font-semibold mb-2">Nouveau client</h2>
        <form @submit.prevent="ajouterClient" class="space-y-2">
          <input
            v-model="clientForm.nom"
            type="text"
            placeholder="Nom"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.email"
            type="email"
            placeholder="Email"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.adresse"
            type="text"
            placeholder="Adresse"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="clientForm.telephone"
            type="text"
            placeholder="+33 6 12 34 56 78"
            class="w-full p-2 border rounded"
          />
          <div class="flex justify-end space-x-2">
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded"
            >
              Ajouter
            </button>
            <button
              @click="open = false"
              type="button"
              class="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>

      <!-- Liste des clients -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <!-- Affichage des clients -->

        <div class="flex justify-center space-x-4 mt-6">
          <button
            @click="page--"
            :disabled="page === 1"
            class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span>Page {{ page }} / {{ totalPages }}</span>
          <button
            @click="page++"
            :disabled="page === totalPages"
            class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
    <div >

    </div>
    <div
        v-if="clientSelectioner && showPopup"
        class="fixed inset-0 bg-black/10 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center space-y-6"

      >
      <div class="p-4 bg-white mt-6 rounded-xl shadow-lg ">

     
        <div class="flex items-center bg-white rounded justify-between border-b pb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Fiche Client</h2>
            <p class="text-sm text-gray-500">ID Client : #CLT-202505</p>
          </div>
          <div class="text-right">
            <span
              class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >Actif</span
            >
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Nom complet</label
            >
            <p class="text-lg font-semibold text-gray-900">
              {{ clientSelectioner.nom }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <p class="text-gray-800">{{ clientSelectioner.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Téléphone</label
            >
            <p class="text-gray-800">{{ clientSelectioner.telephone }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Adresse</label
            >
            <p class="text-gray-800">{{ clientSelectioner.adresse }}</p>
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
          <h3 class="text-lg font-semibold text-gray-800 mb-2">
            Historique des factures
          </h3>
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
          <button @click="closePopup" class="text-red-500 bg-green-300 rounded-xl p-3 ">fermer</button>
          <button
            class="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
          >
            Modifier
          </button>
          <button
            @click="supprimerClient(index)"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref } from "vue";
import Client from "../models/client";

export default {
  name: "ClientView",
  data() {
    return {
      nom: this.$route.params.nom,
      clients: [],
      clientElement: [],
      clientForm: {
        nom: "",
        email: "",
        adresse: "",
        telephone: "",
      },
      state: false,
      open: false,
      search: "",
      page: 1,
      pageSize: 6,
      clientSelectioner: null,
      indexSelectioner: null,
      isMobile: window.innerWidth <= 768, // ou 640 selon ton design
      showPopup: null,
    };
  },
  created() {
    this.clients = Client.chargerTous(); // Chargement automatique au démarrage
  },

  mounted() {
    window.addEventListener("resize", this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    ajouterClient() {
      this.state = true;

      const nouveauClient = new Client(
        this.clientForm.nom,
        this.clientForm.adresse,
        this.clientForm.email,
        this.clientForm.telephone
      );

      nouveauClient.sauvegarder(); // Enregistre dans localStorage
      this.clients.push(nouveauClient); // Met à jour la liste affichée

      this.clientForm = { nom: "", email: "", adresse: "", telephone: "" };
      this.open = false;
    },
    supprimerClient(index) {
      this.clients.splice(index, 1);
      localStorage.setItem("clients", JSON.stringify(this.clients));
    },
    selectionnerClient(client, index) {
      this.clientSelectioner = client;
      this.indexSelectioner = index;
    },
    setFactureRef(el, index) {
      if (el) {
        this.clientElement[index] = el;
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    openPopup() {
    this.showPopup = true;
  },
  closePopup() {
    this.showPopup = false;
  }
  },
  computed: {
    clientsFiltres() {
      // Filtrer selon la recherche
      const filtered = this.clients.filter((client) => {
        const searchLower = this.search.toLowerCase();
        return (
          client.nom.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower) ||
          client.adresse.toLowerCase().includes(searchLower)
        );
      });

      // Pagination
      const start = (this.page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return filtered.slice(start, end);
    },
    totalPages() {
      const filteredCount = this.clients.filter((client) => {
        const searchLower = this.search.toLowerCase();
        return (
          client.nom.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower) ||
          client.adresse.toLowerCase().includes(searchLower)
        );
      }).length;
      return Math.ceil(filteredCount / this.pageSize) || 1;
    },
  },
  watch: {
    search() {
      this.page = 1; // Revenir à la première page à chaque recherche
    },
  },
};
</script>
