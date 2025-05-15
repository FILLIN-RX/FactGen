<template>
    <div class="pt-30  bg-blue-100">

    
        <div class="grid space-y-5 mb-6 lg:grid-cols-2 lg:px-60 gap-5 rounded">
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
                <img class="w-100" src="../assets/laptop_phone_invoice_fr-adaa258f801e92da219a492188c8b14983c39eb6983220b455e7efa2b9e9271f.webp" alt="">
            </div>
            
        </div>
        
        <div class="space-y-5 w-3/3 center  lg:px-60">
            <h1 class="font-bold">Qu’est-ce qu’une facture ?</h1>
            <p>Une facture est un document détaillé de comptabilité générale prouvant un achat ou une vente. Émis par une structure juridique reconnue (auto-entrepreneur, société, etc.), la facture constate les conditions de l’achat et de la vente de biens ou prestations (nature, quantité, prix unitaire, conditions de paiement, échéances, etc).</p>
            <p>Ce document a plusieurs utilités, à la fois juridique (constate le droit de créance du vendeur), commerciale (détaille le montant à régler), comptable (sert de justificatif comptable), et fiscale (support au contrôle des impôts et à l’exercice des droits sur la TVA).</p>
        </div>
        <div class="flex justify-center items-center ">

            
        <div class="lg:px-60 center lg:w-5/5 space-y-15 text-center justify-center align-middle">
            <h1 class="text-4xl">
                Comment créer une facture ?
            </h1>
            <div class="lg:flex">
                <span class="lg:w-1/2">
                    Notre générateur de facture gratuit vous permet de créer des factures conformes à la loi rapidement. Si vous souhaitez facturer encore plus rapidement et simplement, utilisez notre logiciel de facturation avec lequel vous pouvez sauvegarder les données de vos clients et produits et ainsi créer de nouvelles factures valides en seulement quelques secondes tout en évitant de faire des erreurs.
                </span>
                <span class="lg:w-1/2">
                Une facture doit comporter un certain nombre de mentions obligatoires pour être valide. Si vous oubliez de les mentionner, votre client peut refuser de vous payer et vous risquez de payer une amende. 
                </span>
                
            </div>
            
        </div>
        </div>
        
        <div class=" lg:px-60 mt-4 p-5 bg-blue-200 shadow rounded-xl">

             <FactureTemp />
             <ClientForm @client-ajoute="ajouterClient" />
        </div>
        <div class="lg:px-60 text-center flex justify-center items-center centered">
            <div class="rounded text-4xl">
               <img class="h-150" src="../assets/phone_tilted_invoice_fr-a091cfaa3c5f700e0e9ce75a2ceeab02d2e347740c20f32d92fb26e19882fbbb.webp" alt="">
            </div>
            
            
        </div>
        <div class="lg:px-60 w-4/5 space-y-5 space-x-5 ">
            <h1 class="text-2xl">Que doit contenir une facture ?</h1>
            <ul class="space-y-3">
                <li>La date et le numéro de la facture</li>
                <li>La date de la vente du service ou du bien</li>
                <li>Des éléments permettant d’identifier l'émetteur (dénomination sociale, adresse du siège social et de facturation, SIREN, forme juridique et capital social). L’identité du client (dénomination sociale, adresses de facturation et de livraison)</li>
                <li>L’identité du client (dénomination sociale, adresses de facturation et de livraison)</li>
                <li>La date et l’échéance du règlement</li>
                <li>Le taux de pénalité de retard</li>
                <li>La mention “autoliquidation de la TVA” dans les cas applicables (facture intracommunautaire, etc)</li>
                
            </ul>
        </div>

            <!--FAQ-->
            <div class="py-32 bg-blue-400 lg:px-60  text-gray-400">
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

            

            <div class="p-3 space-y-5">
                <h1 class="text-4xl " >
                    Choisir le mode de paiement de la facture
                </h1>
                <p>Une facture peut être réglée de diverses manières :</p>
                <ul class="list">
                    <li>.Par carte bancaire</li>
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
import factureSauve from './FactureSauve.vue';

export default{
    components:{
        ClientForm,
        ProduitForm,
        FacTure,
        FactureTemp,
        factureSauve
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