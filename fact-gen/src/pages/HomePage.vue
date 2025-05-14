<template>
    <div class="bg-gradient-to-br from-blue-400 px-10 lg:px-60 to-purple-400 pt-30">

    
        <div class="grid lg:grid-cols-2 gap-5 rounded">
            <div class="">
                <div class="text-5xl font-bold">
                Générateur de facture professionelle en ligne
                </div>
                <div>
                Créez des factures et devis professionnels en toute simplicité avec notre générateur gratuit. Il vous permet de télécharger des documents conformes et personnalisés, en quelques minutes.
                </div>
                <button class="animate-bounce mt-3 transition-colors transform active:scale-115 duration-500 bg-black p-4 rounded-xl text-white hover:bg-green-400 hover:text-black">Cree ma facture</button>
        
            </div>
            <div class="image flex justify-center items-center">
                <img class="w-70" src="../assets/still-life-rendering-jackets-display.jpg" alt="">
            </div>
            
        </div>
        <div class="flex justify-center items-center ">

    
            <div class=" center lg:w-2/5 space-y-15 text-center justify-center align-middle">
                <h1 class="text-4xl">
                    Comment créer une facture ?
                </h1>
                <span>
                    Une facture doit comporter un certain nombre de mentions obligatoires pour être valide. Si vous oubliez de les mentionner, votre client peut refuser de vous payer et vous risquez de payer une amende. 
                </span><br><br>
                <span>
                    Notre générateur de facture gratuit vous permet de créer des factures conformes à la loi rapidement. Si vous souhaitez facturer encore plus rapidement et simplement, utilisez notre logiciel de facturation avec lequel vous pouvez sauvegarder les données de vos clients et produits et ainsi créer de nouvelles factures valides en seulement quelques secondes tout en évitant de faire des erreurs.
                </span>
            </div>
        </div>
        <div class=" lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-1  grid grid-cols-2 grid-rows-2">
            <div class="rounded text-4xl lg:row-span-2">
               <img class="w-full h-full" src="../assets/still-life-rendering-jackets-display.jpg" alt="">
            </div>
            <div class="bg-teal-100  rounded lg:row-span-1 ">
                 <img class=" h-full w-full" src="../assets/image (13).jpeg" alt="">
            </div>
            <div class="rounded ">
               <h1 class="text-5xl">Numérotation des factures</h1>
                <p>Tous les documents de facturation doivent comporter leur propre numéro. Les numéros de factures doivent être uniques, chronologiques, continus et sans interruption. Il est important de numéroter ses factures correctement puisque l’administration doit être en mesure d’examiner les factures d’une société de manière exhaustive afin d’éviter les fraudes.</p>
            </div>
            <div class="  rounded lg:row-span-1">
                
            </div>
            <div class="rounded">
                <img class="w-full h-full" src="../assets/still-life-rendering-jackets-display.jpg" alt="">
            </div>
        </div>
            <!--FAQ-->
            <div class="py-32 text-gray-400">
                <div class="container mx-auto px-10 lg:px-0">
                  <h2 class="text-3xl  text-black text-center font-bold mb-12">
                        Frequently Asked Questions
                  </h2>  
                  <div class="grid md:grid-cols-2 gap-5">
                    <div class="p-8 text-black border-2 border-gray-500 rounded-lg">
                        <h3 class="text-2xl">Qu’est-ce qu’une facture ?</h3>
                        <p>Une facture est un document détaillé de comptabilité générale prouvant un achat ou une vente. Émis par une structure juridique reconnue (auto-entrepreneur, société, etc.), la facture constate les conditions de l’achat et de la vente de biens ou prestations (nature, quantité, prix unitaire, conditions de paiement, échéances, etc).

                            Ce document a plusieurs utilités, à la fois juridique (constate le droit de créance du vendeur), commerciale (détaille le montant à régler), comptable (sert de justificatif comptable), et fiscale (support au contrôle des impôts et à l’exercice des droits sur la TVA).</p>

                    </div>
                    <div class="p-8 text-black border-2 border-gray-500 rounded-lg">
                        <h3 class="text-2xl">Is it support</h3>
                        <p>yes it is support</p>

                    </div>
                    <div class="p-8 text-black border-2 border-gray-500 rounded-lg">
                        <h3 class="text-2xl">Is it support</h3>
                        <p>yes it is support</p>

                    </div>
                    <div class="p-8 text-black border-2 border-gray-500 rounded-lg">
                        <h3 class="text-2xl">Is it support</h3>
                        <p>yes it is support</p>

                    </div>
                    <div class="p-8 text-black border-2 border-gray-500 rounded-lg">
                        <h3 class="text-2xl">Is it support</h3>
                        <p>yes it is support</p>

                    </div>
                    <div class="p-8 text-black border-2 border-gray-500 rounded-lg">
                        <h3 class="text-2xl">Is it support</h3>
                        <p>yes it is support</p>

                    </div>
                  </div>

                </div>
            </div>

            <ClientForm @client-ajoute="ajouterClient" />
            <ProduitForm @produit-ajoute="ajouterProduit" />
    
            <div v-if="facture?.client?.nom">

             <FacTure :facture="facture" />
             </div>
            <FactureTemp />

            <div>
                <h1>
                    Choisir le mode de paiement de la facture
                </h1>
                <p>Une facture peut être réglée de diverses manières :</p>
                <ul>
                    <li>Par carte bancaire</li>
                    <li>Par virement bancaire</li>
                    <li>Par chèque</li>
                    <li>En espèces</li>
                </ul>
            </div>
    </div>
</template>

<script>
import ClientForm from '../components/ClientForm.vue';
import ProduitForm from '../components/ProduitForm.vue';
import FacTure from '../components/FacTure.vue';
import Client from '../models/client';
import FactureTemp from '../components/FactureTemp.vue'
import Produit from '../models/produit';
import FactureModel from '../models/facture';
export default{
    components:{
        ClientForm,
        ProduitForm,
        FacTure,
        FactureTemp,
    },
  data() {
    return {
      facture: new FactureModel(new Client('', '', '')),
    };
  },
  methods: {
    ajouterClient(client) {
      this.facture.client = client;
    },
    ajouterProduit(produit) {
      this.facture.ajouterProduit(produit);
    }
  }
}
</script>


<style>



</style>