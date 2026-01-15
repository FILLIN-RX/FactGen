<template>
    <div class="sticky top-0 z-40">
        <div class="px-3 py-2.5 sm:px-6 sm:py-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 sm:gap-3">
                    <div
                        class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <i class="material-symbols-outlined text-white text-base sm:text-xl">
                            receipt_long
                        </i>
                    </div>
                    <div>
                        <h1 class="text-base font-bold text-slate-900 sm:text-lg">
                            Factures
                        </h1>
                        <p class="text-xs text-slate-500 leading-none">
                            {{ resultCount }} résultat(s)
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-1.5 sm:gap-2">
                    <button @click="$emit('toggle-filters')"
                        class="lg:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                        :class="{ 'bg-blue-100 text-blue-600': showFilters }">
                        <i class="material-symbols-outlined text-base">
                            filter_alt
                        </i>
                    </button>

                    <button @click="$emit('create')"
                        class="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5">
                        <i class="material-symbols-outlined text-base">
                            add
                        </i>
                        <span class="text-sm">Créer</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    resultCount: {
        type: Number,
        required: true,
    },
    showFilters: {
        type: Boolean,
        required: true,
    }
});

defineEmits(['toggle-filters', 'create']);
</script>

<style>
/* Assurez-vous que cette importation est présente globalement dans votre projet
  (par exemple, dans votre fichier CSS principal ou index.html) 
*/
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    /* Utilisation du style Outline par défaut */
}
</style>
