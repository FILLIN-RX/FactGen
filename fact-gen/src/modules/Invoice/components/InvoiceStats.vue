<template>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">

        <div
            class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 sm:p-4 lg:p-6 border border-blue-200/50">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs sm:text-sm font-medium text-blue-700">Total</p>
                    <p class="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mt-0.5">
                        {{ totalCount }}
                    </p>
                </div>
                <div
                    class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i class="material-symbols-outlined text-white text-lg sm:text-xl lg:text-2xl">
                        receipt_long
                    </i>
                </div>
            </div>
        </div>

        <div
            class="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 sm:p-4 lg:p-6 border border-emerald-200/50">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs sm:text-sm font-medium text-emerald-700">
                        Montant
                    </p>
                    <p class="text-sm sm:text-base lg:text-2xl font-bold text-emerald-900 mt-0.5">
                        {{ formatPrice(totalAmount) }}€
                    </p>
                </div>
                <div
                    class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <i class="material-symbols-outlined text-white text-lg sm:text-xl lg:text-2xl">
                        payments
                    </i>
                </div>
            </div>
        </div>

        <div
            class="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-3 sm:p-4 lg:p-6 border border-amber-200/50 col-span-2 lg:col-span-1">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-xs sm:text-sm font-medium text-amber-700">
                        En attente
                    </p>
                    <p class="text-lg sm:text-xl lg:text-2xl font-bold text-amber-900 mt-0.5">
                        {{ pendingCount }}
                    </p>
                </div>
                <div
                    class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                    <i class="material-symbols-outlined text-white text-lg sm:text-xl lg:text-2xl">
                        schedule
                    </i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    totalCount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    pendingCount: {
        type: Number,
        required: true,
    }
});

function formatPrice(val) {
    if (typeof val !== "number" || isNaN(val)) return "0.00";
    return val.toFixed(2);
}
</script>
