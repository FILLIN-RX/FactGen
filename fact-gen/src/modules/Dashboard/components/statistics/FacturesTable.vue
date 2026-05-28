<template>
    <n-card>
        <template #header>
            <n-h3 class="text-lg font-semibold text-gray-900">Liste des factures</n-h3>
            <n-p class="text-sm text-gray-500">{{ factures.length }} factures au total</n-p>
        </template>
        <n-data-table :columns="columns" :data="factures" :bordered="false" :single-line="false" />
    </n-card>
</template>

<script setup>
import { h } from 'vue';
import { NTag } from 'naive-ui';

const props = defineProps({
    factures: {
        type: Array,
        required: true
    },
    formatCurrency: {
        type: Function,
        required: true
    },
    formatDate: {
        type: Function,
        required: true
    },
    getStatusColor: {
        type: Function,
        required: true
    }
});

const statusTagType = (status) => {
    const map = {
        paye: 'success',
        impayée: 'error',
        en_attente: 'warning',
        en_retard: 'error',
        brouillon: 'default',
        annule: 'warning'
    };
    return map[status] || 'default';
};

const columns = [
    {
        title: 'Numéro',
        key: 'numero',
        render: (row) => h('span', { class: 'font-medium text-gray-900' }, row.numero)
    },
    {
        title: 'Client',
        key: 'client_nom',
        render: (row) => h('span', { class: 'text-sm text-gray-500' }, row.client_nom || '-')
    },
    {
        title: 'Montant',
        key: 'montant_total',
        render: (row) => h('span', { class: 'text-sm text-gray-900 font-medium' }, props.formatCurrency(row.montant_total))
    },
    {
        title: 'Statut',
        key: 'statut',
        render: (row) => h(NTag, { type: statusTagType(row.statut), size: 'small' }, () => row.statut)
    },
    {
        title: 'Date',
        key: 'created_at',
        render: (row) => h('span', { class: 'text-sm text-gray-500' }, props.formatDate(row.created_at))
    }
];
</script>
