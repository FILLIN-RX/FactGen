<template>
        <div class="w-full h-full border-2 p-3 flex flex-col items-center justify-center" >
            <p class="text-2xl">{{ amount }}
                <span class="text-gray-400">{{ currency }}</span>
            </p>
            <div class="flex-center">
                <span class="w-4 h-4" :style="{ backgroundColor: color}">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                </span>
                <h3>{{ names }}</h3>
            </div>
            <div class="relative h-2 w-full bg-black/10 rounded-xl overflow-hidden">
                    <span class="absolute top-0 left-0 h-full rounded-xl" :style="{width:percent + '%',backgroundColor:color}">
                        

                    </span>
            </div>
            
        </div>
</template>


<script setup lang="ts">



    defineProps < {
        amount: Number,
        currency:String,
        names:String,
        percent:Number,
        color:String
    }>()

</script>
<style>


</style>