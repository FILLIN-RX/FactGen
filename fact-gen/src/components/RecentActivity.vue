<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <div v-for="(stat,index) in statsData"
    :key="index"
    class="shadow">
    <div class="stat">
         
    </div>

    </div>
       
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const statsData = ref([
        {title:'Total des facture',value:'100',desc:' + 14% from last month'},
        {title:'Total des Revenue',value:'100,999.55',desc:' - 4% from last month'},
        {title:'Total des profit',value:'100',desc:' + 39% from last month'},
    ])


</script>