<template>
  <div class="p-4 space-y-8">
    <!-- Saisie client -->
    <ClientForm @client-ajoute="ajouterClient" />

    <!-- Saisie produits -->
    <ProduitListForm @produits-valides="ajouterProduits" />

    <!-- Aperçu facture -->
    <FacturePreview
      v-if="facture.client.nom && facture.produits.length > 0"
      :client="facture.client"
      :produits="facture.produits"
    />
  </div>
</template>

<script>
import ClientForm from './ClientForm.vue'
import ProduitListForm from './ProduitListForm.vue'
import FacturePreview from './FacturePreview.vue'
import Client from '../models/client'
import FactureModel from '../models/facture'

export default {
  components: {
    ClientForm,
    ProduitListForm,
    FacturePreview
  },
  data() {
    return {
      facture: new FactureModel(new Client('', '', ''))
    }
  },
  methods: {
    ajouterClient(client) {
      this.facture.client = client
    },
    ajouterProduits(produits) {
      produits.forEach(p => this.facture.ajouterProduit(p))
    }
  }
}
</script>

  