<template>
    <div class="bg-white rounded-xl hover:shadow p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
        <ul class="space-y-2">
            <li v-for="notif in notifications" :key="notif.id" class="text-sm text-gray-600">
                📢 {{ notif.message }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const notifications = [
    { id: 1, message: 'Nouvelle facture générée : #F-102' },
    { id: 2, message: 'Client ajouté : Dupont SARL' },
    { id: 3, message: 'Rappel : Facture #F-099 en retard' }
]
</script>
