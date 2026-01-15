<template>
    <transition name="fade">
        <div v-if="open"
            class="fixed inset-0 bg-[#001C3B]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            @click.self="$emit('close')">
            <div
                class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant flex flex-col max-h-[90vh]">
                <!-- Header -->
                <div
                    class="px-8 py-6 border-b border-outline-variant flex items-center justify-between bg-white sticky top-0 z-10">
                    <div class="flex items-center space-x-4">
                        <div
                            class="w-12 h-12 bg-[#D3E4FF] rounded-xl flex items-center justify-center border border-[#005AC1]/10">
                            <UserIcon class="w-6 h-6 text-[#005AC1]" />
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-[#1A1C1E]">{{ client?.nom || 'Détails du client' }}</h2>
                            <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-widest mt-0.5">
                                Fiche Client #CLT-{{ String(client?.id || '0').padStart(3, '0') }}</p>
                        </div>
                    </div>
                    <button @click="$emit('close')"
                        class="p-2 rounded-full hover:bg-[#F8F9FA] text-surface-on-variant transition-colors">
                        <XMarkIcon class="w-5 h-5" />
                    </button>
                </div>

                <!-- Scrollable Content -->
                <div class="overflow-y-auto p-8 space-y-8">
                    <!-- Basic Info Grid -->
                    <section>
                        <h3 class="text-xs font-bold text-surface-on-variant uppercase tracking-widest mb-4">
                            Informations Générales</h3>
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F8F9FA] rounded-2xl p-6 border border-outline-variant">
                            <div>
                                <label class="block text-[10px] font-bold text-surface-on-variant uppercase mb-1">Email
                                    professionnel</label>
                                <p class="text-sm font-bold text-[#1A1C1E] break-all">{{ client?.email || 'Non renseigné' }}</p>
                            </div>
                            <div>
                                <label
                                    class="block text-[10px] font-bold text-surface-on-variant uppercase mb-1">Téléphone</label>
                                <p class="text-sm font-bold text-[#1A1C1E]">{{ client?.telephone || 'Non renseigné' }}
                                </p>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-[10px] font-bold text-surface-on-variant uppercase mb-1">Siège
                                    social / Adresse</label>
                                <p class="text-sm font-bold text-[#1A1C1E]">{{ client?.address || client?.adresse ||'Non renseignée' }}</p>
                            </div>
                        </div>
                    </section>

                    <!-- Financial Summary -->
                    <section>
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xs font-bold text-surface-on-variant uppercase tracking-widest">Résumé
                                Financier</h3>
                            <span class="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Compte
                                Actif</span>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div
                                class="card-outlined p-4 bg-white text-center group hover:border-[#005AC1]/30 transition-all">
                                <p class="text-2xl font-bold text-[#1A1C1E]">{{ stats?.total || 0 }}</p>
                                <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">
                                    Documents</p>
                            </div>
                            <div
                                class="card-outlined p-4 bg-white text-center group hover:border-amber-500/30 transition-all">
                                <p class="text-2xl font-bold text-amber-600">{{ stats?.en_attente || 0 }}</p>
                                <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">En
                                    attente</p>
                            </div>
                            <div
                                class="card-outlined p-4 bg-white text-center group hover:border-green-500/30 transition-all">
                                <p class="text-2xl font-bold text-green-600">{{ stats?.payees || 0 }}</p>
                                <p class="text-[10px] font-bold text-surface-on-variant uppercase tracking-wider">
                                    Règlements</p>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Footer Actions -->
                <div
                    class="px-8 py-5 border-t border-outline-variant bg-[#F8F9FA] flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button @click="$emit('delete')"
                        class="btn-text text-red-600 hover:bg-red-50 px-6 py-2.5 rounded-xl border border-transparent hover:border-red-100 transition-all font-bold text-sm">
                        <TrashIcon class="w-4 h-4 mr-2" />
                        Supprimer le client
                    </button>
                    <button @click="$emit('edit', client.id)"
                        class="btn-filled px-8 py-2.5 shadow-sm hover:shadow-md transition-all">
                        <PencilSquareIcon class="w-4 h-4 mr-2" />
                        Modifier la fiche
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import {
    UserIcon,
    XMarkIcon,
    TrashIcon,
    PencilSquareIcon
} from '@heroicons/vue/24/outline';

defineProps({
    open: Boolean,
    client: Object,
    stats: Object,
});

defineEmits(['close', 'delete', 'edit']);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
