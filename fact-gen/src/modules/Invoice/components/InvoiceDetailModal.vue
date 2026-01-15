<template>
    <div v-if="invoice"
        class="fixed inset-0 bg-[#001C3B]/40 backdrop-blur-md z-50 flex flex-col items-center justify-center p-0 sm:p-4"
        @click.self="$emit('close')">

        <!-- Main Modal Container -->
        <div
            class="bg-white flex flex-col w-full sm:max-w-6xl h-full sm:h-[90vh] sm:rounded-2xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-300">

            <!-- Header -->
            <div
                class="px-8 py-5 border-b border-outline-variant flex items-center justify-between bg-white sticky top-0 z-10">
                <div class="flex items-center space-x-4">
                    <div
                        class="w-10 h-10 bg-[#D3E4FF] rounded-xl flex items-center justify-center border border-[#005AC1]/10">
                        <DocumentTextIcon class="w-5 h-5 text-[#005AC1]" />
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-[#1A1C1E]">Facture #{{ invoice.numero || invoice.id }}</h2>
                        <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mt-0.5">Émise
                            le {{ formatDate(invoice.date_emission) }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <!-- Status Badge (Optional duplicate or just in template) -->
                    <button @click="$emit('close')"
                        class="p-2 rounded-full hover:bg-[#F8F9FA] text-surface-on-variant transition-colors">
                        <XMarkIcon class="w-6 h-6" />
                    </button>
                </div>
            </div>

            <!-- Scrollable Invoice Content -->
            <div class="flex-1 overflow-y-auto bg-[#F8F9FA] p-4 sm:p-8">
                <div class="max-w-4xl mx-auto shadow-elevation-1 rounded-sm overflow-hidden bg-white">
                    <component :is="currentTemplateComponent" :invoice="invoice" :client="client" :produits="produits"
                        :totalHT="totalHT" :totalTTC="totalTTC" :montantReduction="montantReduction"
                        :reduction="reduction" :suplement="suplement" :date_emission="date_emission"
                        :date_echeance="date_echeance" :societer="companyInfo" />
                </div>
            </div>

            <!-- Footer Actions -->
            <div
                class="px-8 py-5 border-t border-outline-variant bg-white flex flex-col sm:flex-row gap-3 justify-between items-center">
                <!-- Share/Delete group -->
                <div class="flex gap-2 w-full sm:w-auto">
                    <button @click="shareInvoice"
                        class="flex-1 sm:flex-none btn-text px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-[#F8F9FA] transition-all font-bold text-sm">
                        <ShareIcon class="w-4 h-4 mr-2" />
                        Partager
                    </button>
                    <button @click="$emit('delete')"
                        class="flex-1 sm:flex-none btn-text text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl border border-red-100 transition-all font-bold text-sm">
                        <TrashIcon class="w-4 h-4 mr-2" />
                        Supprimer
                    </button>
                </div>

                <!-- Primary Action (Download) -->
                <button @click="downloadPDF()" :disabled="isDownloading"
                    class="w-full sm:w-auto btn-filled px-10 py-3 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3">
                    <ArrowDownTrayIcon v-if="!isDownloading" class="w-5 h-5" />
                    <div v-else class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin">
                    </div>
                    <span>{{ isDownloading ? 'Génération...' : 'Télécharger le PDF' }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { telechargerPDF, getInfoEntreprise } from "@/shared/services/api";
import { computed, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { showToastMessage } from "@/composables/useToast";
import { templateComponents } from "@/modules/Invoice/components/templates";
import { useFacturesStore } from "../stores/invoice.store.js";
import { genererPDFs } from "@/modules/Invoice/components/templates/utils/generateTemplates";
import { XMarkIcon, ArrowDownTrayIcon, ShareIcon, TrashIcon, DocumentTextIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    invoice: Object,
    societer: Object,
});

const emit = defineEmits(["close", "download", "delete"]);

const factureStore = useFacturesStore();
const isDownloading = ref(false);
const infoEntreprise = ref(null);

const client = computed(() => props.invoice?.client_data || {});
const produits = computed(() => props.invoice?.produits || []);
const totalTTC = computed(() => props.invoice?.montant_total || 0);
const reduction = computed(() => props.invoice?.reduction || null);
const suplement = computed(() => props.invoice?.suplement || "");
const date_emission = computed(() => props.invoice?.date_emission || "");
const date_echeance = computed(() => props.invoice?.date_echeance || "");

const currentTemplateComponent = computed(() => {
    return templateComponents[props.invoice.template || "moderne"];
});

onMounted(async () => {
    try {
        const data = await getInfoEntreprise();
        if (data) infoEntreprise.value = data;
    } catch (err) {
        console.error("Erreur societer:", err);
    }
});

const companyInfo = computed(() => {
    return props.societer || infoEntreprise.value || props.invoice.societer || {
        nom: "Entreprise", email: "contact@entreprise.com", adresse: "Adresse"
    };
});

const shareInvoice = async () => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: `Facture #${props.invoice.numero}`,
                text: `Document de ${companyInfo.value.nom}`,
                url: window.location.href,
            });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            showToastMessage("Lien copié !", "success");
        }
    } catch (error) {
        console.error('Share error:', error);
    }
};

const downloadPDF = async () => {
    try {
        isDownloading.value = true;
        const htmlContent = genererPDFs(props.invoice.template, {
            ...props.invoice,
            client_data: props.invoice.client_data || {},
            societer: companyInfo.value,
        });

        await telechargerPDF({
            html: htmlContent,
            id: props.invoice.id,
            invoiceDate: props.invoice.date_emission,
            clientName: props.invoice.client_data?.nom,
        });

        showToastMessage("Téléchargement réussi !", "success");
    } catch (error) {
        showToastMessage("Erreur PDF", "error");
    } finally {
        isDownloading.value = false;
    }
};

const formatDate = (date) => date ? new Date(date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }) : "";

// Simple calculated totals for the template container
const sousTotal = computed(() => {
    if (!props.invoice?.produits) return 0;
    return props.invoice.produits.reduce((total, p) => total + (parseFloat(p.quantite) || 0) * (parseFloat(p.prix) || 0), 0);
});

const montantReduction = computed(() => {
    if (!props.invoice?.reduction) return 0;
    const r = props.invoice.reduction;
    return r.type === "montant" ? (parseFloat(r.valeur) || 0) : (sousTotal.value * (parseFloat(r.valeur) || 0) / 100);
});

const totalHT = computed(() => sousTotal.value - montantReduction.value);
</script>
