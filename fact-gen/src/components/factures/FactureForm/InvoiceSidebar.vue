<template>
  <aside class="w-72 bg-white ml-6 rounded-lg shadow p-4 space-y-4">
    <!-- Logo + Modifier -->
    <div class="flex items-center justify-between">
      <div class="text-lg font-semibold">fillin</div>
      <button class="text-blue-600 text-sm hover:underline">Modifier</button>
    </div>

    <!-- Ajouter moyens de paiement -->
    <div class="p-3 border rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </div>
        <span class="text-sm font-medium">Ajouter des moyens de paiement</span>
      </div>
    </div>

    <!-- Options -->
    <div>
      <button class="w-full flex justify-between items-center py-2 text-sm font-medium border-b">
        <span>🎨 Personnaliser le design</span>
      </button>

      <details class="border-b">
        <summary class="py-2 text-sm font-medium cursor-pointer">⚙️ Paramètres</summary>
        <div class="pl-4 py-2 text-sm text-gray-600">Paramètres supplémentaires…</div>
      </details>

      <div class="flex justify-between items-center py-2 border-b">
        <span class="text-sm font-medium">💸 Remise</span>
        <span class="w-3 h-3 rounded-full bg-gray-300"></span>
      </div>

      <div class="flex justify-between items-center py-2 border-b">
        <span class="text-sm font-medium">🔁 Facture récurrente</span>
        <span class="w-3 h-3 rounded-full bg-green-500"></span>
      </div>

      <div class="flex justify-between items-center py-2 border-b">
        <span class="text-sm font-medium">💰 Acompte</span>
        <span class="w-3 h-3 rounded-full bg-green-500"></span>
      </div>

      <div class="flex justify-between items-center py-2">
        <span class="text-sm font-medium">📅 Calendrier de paiement</span>
        <span class="w-3 h-3 rounded-full bg-green-500"></span>
      </div>
    </div>
  </aside>
</template>

<script setup>
// Pas de logique lourde ici pour l’instant
</script>
