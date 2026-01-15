<template>
    <div class="mb-4 sm:mb-6 transition-all duration-300 overflow-hidden" :class="showFilters || !isMobile
        ? 'max-h-screen opacity-100'
        : 'max-h-0 opacity-0 lg:max-h-screen lg:opacity-100'
        ">
        <div class="bg-white rounded-xl shadow-sm border border-slate-200/60 p-3 sm:p-4 lg:p-6">
            <div class="space-y-3 sm:space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4">

                <div class="lg:col-span-2">
                    <label class="block text-sm font-medium text-slate-700 mb-1.5">Rechercher</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="material-symbols-outlined h-4 w-4 text-slate-400 text-base">
                                search
                            </i>
                        </div>
                        <input :value="searchTerm" @input="$emit('update:searchTerm', $event.target.value)"
                            placeholder="Numéro, client..."
                            class="block w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 sm:grid-cols-1 lg:grid-cols-1">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Client</label>
                        <select :value="selectedClient" @change="$emit('update:selectedClient', $event.target.value)"
                            class="block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                            <option value="">Tous</option>
                            <option v-for="nom in clients" :key="nom" :value="nom">
                                {{ nom }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1.5">Statut</label>
                        <select :value="selectedStatus" @change="$emit('update:selectedStatus', $event.target.value)"
                            class="block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                            <option value="">Tous</option>
                            <option value="en_attente">🟡 En attente</option>
                            <option value="payée">🟢 Payé</option>
                            <option value="annule">🔴 Annulé</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center mt-3 pt-3 border-t border-slate-200">
                <button @click="$emit('clear-filters')"
                    class="text-xs sm:text-sm text-slate-600 hover:text-slate-800 font-medium transition-colors">
                    Effacer les filtres
                </button>
                <button @click="$emit('hide-filters')"
                    class="lg:hidden text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Masquer
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    searchTerm: {
        type: String,
        required: true,
    },
    selectedClient: {
        type: String,
        required: true,
    },
    selectedStatus: {
        type: String,
        required: true,
    },
    clients: {
        type: Array,
        required: true,
    },
    showFilters: {
        type: Boolean,
        required: true,
    },
    isMobile: {
        type: Boolean,
        required: true,
    }
});

defineEmits(['update:searchTerm', 'update:selectedClient', 'update:selectedStatus', 'clear-filters', 'hide-filters']);
</script>
