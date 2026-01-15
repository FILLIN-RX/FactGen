<template>
    <div v-if="open"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
        @click.self="$emit('close')">
        <div
            class="bg-white w-full max-w-lg sm:max-w-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up sm:animate-fade-in max-h-[95vh] sm:max-h-[90vh]">
            <!-- Header -->
            <div
                class="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <UserIcon class="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 class="text-lg sm:text-xl font-bold text-gray-900">Fiche Client</h2>
                        <p class="text-xs sm:text-sm text-gray-500 font-medium">#CLT-{{ String(client?.id ||
                            '0000').padStart(4, '0') }}</p>
                    </div>
                </div>
                <button @click="$emit('close')"
                    class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <XMarkIcon class="w-4 h-4 text-gray-600" />
                </button>
            </div>

            <!-- Content -->
            <div class="overflow-y-auto flex-1">
                <!-- Client Info -->
                <div class="px-4 sm:px-6 py-6">
                    <div class="space-y-4">
                        <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nom
                                        complet</label>
                                    <p class="text-lg font-bold text-gray-900">{{ client?.nom || 'Non renseigné' }}</p>
                                </div>
                                <div>
                                    <label
                                        class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</label>
                                    <p class="text-sm text-gray-700 break-all">{{ client?.email || 'Non renseigné' }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Téléphone</label>
                                    <p class="text-sm font-medium text-gray-900">{{ client?.telephone || 'Non renseigné'
                                        }}</p>
                                </div>
                                <div>
                                    <label
                                        class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Adresse</label>
                                    <p class="text-sm text-gray-700">{{ client?.address || client?.adresse || 'Non renseignée' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Statistics -->
                <div class="px-4 sm:px-6 pb-6">
                    <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center">
                        <ChartBarIcon class="w-4 h-4 mr-2 text-blue-500" />
                        Statistiques
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <!-- Total -->
                        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                            <div class="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <DocumentTextIcon class="w-4 h-4 text-white" />
                            </div>
                            <p class="text-2xl font-bold text-blue-900">{{ stats?.total || 0 }}</p>
                            <p class="text-xs font-medium text-blue-700">Total factures</p>
                        </div>

                        <!-- En attente -->
                        <div class="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                            <div class="w-8 h-8 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <ClockIcon class="w-4 h-4 text-white" />
                            </div>
                            <p class="text-2xl font-bold text-orange-900">{{ stats?.en_attente || 0 }}</p>
                            <p class="text-xs font-medium text-orange-700">En attente</p>
                        </div>

                        <!-- Payées -->
                        <div
                            class="bg-green-50 border border-green-200 rounded-xl p-4 text-center sm:col-span-1 col-span-1">
                            <div class="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <CheckIcon class="w-4 h-4 text-white" />
                            </div>
                            <p class="text-2xl font-bold text-green-900">{{ stats?.payees || 0 }}</p>
                            <p class="text-xs font-medium text-green-700">Payées</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
                <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button @click="$emit('delete')"
                        class="w-full sm:w-auto px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-xl border border-red-200 transition-colors flex items-center justify-center">
                        <TrashIcon class="w-4 h-4 mr-2" />
                        Supprimer
                    </button>
                    <button
                        class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center">
                        <PencilSquareIcon class="w-4 h-4 mr-2" />
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    open: Boolean,
    client: Object,
    stats: Object,
});

defineEmits(['close', 'delete']);
import {
    UserIcon,
    XMarkIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ClockIcon,
    CheckIcon,
    TrashIcon,
    PencilSquareIcon
} from '@heroicons/vue/24/outline';
</script>

<style scoped>
@keyframes slide-up {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-slide-up {
    animation: slide-up 0.3s ease-out;
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}
</style>
