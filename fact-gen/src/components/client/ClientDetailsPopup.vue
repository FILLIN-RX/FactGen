<template>
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

</template>