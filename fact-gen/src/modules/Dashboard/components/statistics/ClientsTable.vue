<template>
    <n-card>
        <template #header>
            <n-h3 class="text-lg font-semibold text-gray-900">Liste des clients</n-h3>
            <n-p class="text-sm text-gray-500">{{ clients.length }} clients au total</n-p>
        </template>
        <n-data-table :columns="columns" :data="clients" :bordered="false" :single-line="false" />
    </n-card>
</template>

<script setup>
import { h } from 'vue';

const props = defineProps({
    clients: {
        type: Array,
        required: true
    },
    formatDate: {
        type: Function,
        required: true
    }
});

const columns = [
    {
        title: 'Client',
        key: 'nom',
        render: (row) => h('span', { class: 'font-medium text-gray-900' }, row.nom)
    },
    {
        title: 'Email',
        key: 'email',
        render: (row) => h('span', { class: 'text-sm text-gray-500' }, row.email || '-')
    },
    {
        title: 'Téléphone',
        key: 'telephone',
        render: (row) => h('span', { class: 'text-sm text-gray-500' }, row.telephone || '-')
    },
    {
        title: 'Créé le',
        key: 'created_at',
        render: (row) => h('span', { class: 'text-sm text-gray-500' }, props.formatDate(row.created_at))
    }
];
</script>
