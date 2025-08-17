<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b">
        <h1 class="text-2xl font-bold">Nouvelle facture</h1>
        <div class="text-right">
          <div class="text-3xl font-bold">INVOICE</div>
          <div class="text-sm text-gray-500">{{ numeroFacture }}</div>
        </div>
      </div>

      <div class="p-6">
        <!-- Info facture -->
        <div class="grid grid-cols-3 gap-6 mb-8">
          <div>
            <label class="block text-sm font-medium mb-1">Date de facturation</label>
            <input 
              type="date" 
              v-model="dateEmission" 
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Échéance</label>
            <input 
              type="date" 
              v-model="dateEcheance" 
              class="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Client</label>
            <input
              v-model="client.nom"
              placeholder="Sélectionner ou créer un client"
              class="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <!-- Tableau produits -->
        <div class="mb-6">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="border p-3 text-left">Description</th>
                <th class="border p-3 text-left">Type de produit</th>
                <th class="border p-3 text-center">Qté</th>
                <th class="border p-3 text-center">Unité</th>
                <th class="border p-3 text-right">Prix</th>
                <th class="border p-3 text-right">Montant</th>
                <th class="border p-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produit, index) in produits" :key="index">
                <td class="border p-3">{{ produit.nom }}</td>
                <td class="border p-3">Service</td>
                <td class="border p-3 text-center">{{ produit.quantite }}</td>
                <td class="border p-3 text-center">h</td>
                <td class="border p-3 text-right">{{ produit.prix }} €</td>
                <td class="border p-3 text-right">{{ (produit.quantite * produit.prix).toFixed(2) }} €</td>
                <td class="border p-3 text-center">
                  <button @click="supprimerProduit(index)" class="text-red-500 hover:text-red-700">×</button>
                </td>
              </tr>
              <!-- Ligne d'ajout -->
              <tr class="bg-blue-50">
                <td class="border p-2">
                  <input 
                    v-model="newProduit.nom" 
                    placeholder="Entrez une description ou choisissez un produit"
                    class="w-full border-0 bg-transparent"
                  />
                </td>
                <td class="border p-2">Service</td>
                <td class="border p-2">
                  <input 
                    v-model.number="newProduit.quantite" 
                    type="number" 
                    class="w-full text-center border-0 bg-transparent"
                  />
                </td>
                <td class="border p-2 text-center">h</td>
                <td class="border p-2">
                  <input 
                    v-model.number="newProduit.prix" 
                    type="number" 
                    placeholder="0,00 €"
                    class="w-full text-right border-0 bg-transparent"
                  />
                </td>
                <td class="border p-2 text-right">{{ calculerMontantLigne() }} €</td>
                <td class="border p-2"></td>
              </tr>
            </tbody>
          </table>
          
          <button 
            @click="ajouterProduit" 
            class="mt-2 px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Ajouter une ligne
          </button>
        </div>

        <!-- Totaux -->
        <div class="flex justify-end">
          <div class="w-64 space-y-2">
            <div class="flex justify-between">
              <span>Total HT</span>
              <span class="font-medium">{{ calculerTotal().toFixed(2) }} €</span>
            </div>
            <div class="flex justify-between">
              <span>Total dû</span>
              <span class="font-medium">{{ calculerTotal().toFixed(2) }} €</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end mt-8 space-x-3">
          <button class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">
            Enregistrer le brouillon
          </button>
          <button 
            @click="creerFacture"
            class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voir l'aperçu et envoyer →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Facture from '@/models/facture.js'

// Données
const client = ref({ nom: '', address: '', email: '' })
const produits = ref([])
const newProduit = ref({ nom: '', quantite: 1, prix: 0 })

const today = new Date().toISOString().split('T')[0]
const dateEmission = ref(today)
const dateEcheance = ref(today)

const numeroFacture = ref('F-00001')

// Méthodes
function ajouterProduit() {
  if (!newProduit.value.nom || newProduit.value.prix <= 0) {
    alert('Veuillez remplir la description et le prix')
    return
  }
  
  produits.value.push({ ...newProduit.value })
  newProduit.value = { nom: '', quantite: 1, prix: 0 }
}

function supprimerProduit(index) {
  produits.value.splice(index, 1)
}

function calculerTotal() {
  return produits.value.reduce((sum, p) => sum + (p.quantite * p.prix), 0)
}

function calculerMontantLigne() {
  return (newProduit.value.quantite * newProduit.value.prix).toFixed(2)
}

function creerFacture() {
  if (!client.value.nom) {
    alert('Veuillez sélectionner un client')
    return
  }
  
  if (produits.value.length === 0) {
    alert('Veuillez ajouter au moins un produit')
    return
  }

  // Conversion pour la classe Facture
  const produitsObj = {}
  produits.value.forEach((p, index) => {
    produitsObj[index] = p
  })

  const facture = new Facture(
    { nom: 'Ma Société', address: 'Mon Adresse' },
    client.value,
    produitsObj,
    null, null, 1,
    dateEmission.value,
    dateEcheance.value,
    'default',
    'en_attente',
    'EUR'
  )

  facture.sauvegarder()
  
  // Reset
  client.value = { nom: '', address: '', email: '' }
  produits.value = []
}
</script>