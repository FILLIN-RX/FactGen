<template>
    <!-- HERO -->
    <section class="relative bg-white text-[#1A1C1E] overflow-hidden">
        <!-- Background Decoration -->
        <div
            class="absolute inset-0 opacity-40 bg-[radial-gradient(#005AC1_0.5px,transparent_0.5px)] [background-size:40px_40px]">
        </div>
        <div
            class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-32 min-h-[75vh] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- TEXT -->
            <div class="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-10 duration-700">
                <div
                    class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D3E4FF] text-[#005AC1] text-[10px] font-black uppercase tracking-widest border border-[#005AC1]/10">
                    <SparklesIcon class="w-3.5 h-3.5" />
                    Solution 100% Gratuite
                </div>
                <h1 class="text-4xl sm:text-6xl font-black tracking-tighter leading-[1.1]">
                    Gérez votre <br>
                    <span class="text-[#005AC1]">Facturation</span> <br>
                    avec intelligence.
                </h1>
                <p class="text-lg text-surface-on-variant leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                    Une plateforme moderne, sécurisée et intuitive pour automatiser vos documents financiers et piloter
                    votre CRM en temps réel.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <router-link to="/facture">
                        <button
                            class="w-full sm:w-auto px-10 py-4 bg-[#005AC1] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-[#004494] transition-all active:scale-95 flex items-center justify-center gap-3">
                            Démarrer maintenant
                            <ArrowRightIcon class="w-4 h-4" />
                        </button>
                    </router-link>
                    <button
                        class="w-full sm:w-auto px-10 py-4 bg-white text-[#1A1C1E] border border-outline-variant rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#F8F9FA] transition-all">
                        Voir la démo
                    </button>
                </div>
            </div>
            <!-- IMAGE / ILLUSTRATION -->
            <div class="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000">
                <div class="absolute -inset-4 bg-[#D3E4FF]/30 blur-3xl rounded-full"></div>
                <img :src="heroIllustration" alt="Interface FactGen"
                    class="relative w-full max-w-md lg:max-w-xl drop-shadow-2xl hover:translate-y-[-10px] transition-transform duration-500"
                    loading="eager" />
            </div>
        </div>
    </section>
    <!-- COUNTERS -->
    <section class="bg-[#F8F9FA] border-y border-outline-variant py-20 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <!-- KPI 1 -->
                <div class="space-y-2 text-center md:text-left border-l-2 border-[#005AC1]/20 pl-6">
                    <div class="text-4xl font-black text-[#1A1C1E] tracking-tighter">
                        {{ formattedInvoices }}
                    </div>
                    <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest">
                        Factures Émises
                    </p>
                </div>
                <!-- KPI 2 -->
                <div class="space-y-2 text-center md:text-left border-l-2 border-[#005AC1]/20 pl-6">
                    <div class="text-4xl font-black text-[#005AC1] tracking-tighter">
                        {{ satisfaction }}%
                    </div>
                    <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest">
                        Satisfaction Client
                    </p>
                </div>
                <!-- KPI 3 -->
                <div class="space-y-2 text-center md:text-left border-l-2 border-[#005AC1]/20 pl-6">
                    <div class="text-4xl font-black text-[#1A1C1E] tracking-tighter">
                        {{ cost }}€
                    </div>
                    <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest">
                        Frais de Service
                    </p>
                </div>
                <!-- KPI 4 -->
                <div class="space-y-2 text-center md:text-left border-l-2 border-[#005AC1]/20 pl-6">
                    <div class="text-4xl font-black text-[#1A1C1E] tracking-tighter">
                        24/7
                    </div>
                    <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest">Disponibilité</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import heroIllustration from '@/assets/hand_drawn.png'
import { SparklesIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted, computed } from 'vue'
const invoices = ref(0)
const satisfaction = ref(0)
const cost = ref(0)
const finalInvoices = 10000
const finalSatisfaction = 99.9
const finalCost = 0
const formattedInvoices = computed(() =>
    invoices.value >= 1000 ? `+${(invoices.value / 1000).toFixed(0)}k` : invoices.value
)
function animateCounter(target, finalValue, decimals = 0, duration = 2000) {
    const start = performance.now()
    function update(time) {
        const progress = Math.min((time - start) / duration, 1)
        const value = finalValue * progress
        target.value = decimals ? value.toFixed(decimals) : Math.round(value)
        if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
}
onMounted(() => {
    animateCounter(invoices, finalInvoices)
    animateCounter(satisfaction, finalSatisfaction, 1)
    animateCounter(cost, finalCost)
})
</script>