<template>
  <div class="flex h-screen flex-col bg-white shadow-md">
    <!-- Header -->
    <div class="px-6 py-8 text-center">
      <div class="mx-auto mb-4 w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-[#1E40AF] flex items-center justify-center shadow">
        <span class="text-white font-bold text-xl">F</span>
      </div>
      <h1 class="text-xl font-bold text-gray-900">FactGen</h1>
      <p class="text-xs text-gray-500 mt-1">Gestion de facturation</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto px-4">
      <div class="space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.id"
          :to="item.route"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group"
          :class="item.active 
            ? 'bg-[#E0E7FF] text-[#1E40AF] shadow-sm border-l-4 border-[#1E40AF]' 
            : 'text-gray-700 hover:bg-[#EEF2FF] hover:text-[#1E40AF]'"
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
               :class="item.active ? 'bg-[#c7d2fe] text-[#1E40AF]' : 'text-gray-500 group-hover:bg-[#E0E7FF] group-hover:text-[#1E40AF]'">
            <component :is="getIcon(item.icon)" class="w-5 h-5"/>
          </div>
          <span class="ml-3">{{ item.label }}</span>
        </router-link>
      </div>

      <!-- Séparateur -->
      <div class="my-6 border-t border-gray-200"></div>

      <!-- Raccourcis -->
      <div class="mb-6">
        <h3 class="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Raccourcis</h3>
        <div class="space-y-1">
          <div @click="openInvoice" class="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-[#EEF2FF] hover:text-[#1E40AF] rounded-lg cursor-pointer transition-colors">
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouvelle facture
          </div>
          <div @click="openClient" class="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-[#EEF2FF] hover:text-[#1E40AF] rounded-lg cursor-pointer transition-colors">
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            Nouveau client
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer avec profil -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex items-center mb-4 space-x-3">
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-[#1E40AF] flex items-center justify-center">
          <span class="text-white font-semibold text-sm">{{ utilisateur?.nom?.charAt(0) || 'U' }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">{{ utilisateur?.nom || 'Utilisateur' }}</p>
          <p class="text-xs text-gray-500 truncate">{{ auth.user?.email || 'email@example.com' }}</p>
        </div>
      </div>
      <button @click="handleLogout" class="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition shadow-sm">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useOperationsStore } from "../stores/ui";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const operationsStore = useOperationsStore();

const utilisateur = computed(() => auth.user);

// Menu Items
const menuItems = ref([
  { id: 2, icon: 'dashboard', label: 'Tableau de bord', route: '/real', active: false },
  { id: 3, icon: 'people', label: 'Gestion des clients', route: '/clientFact', active: false },
  { id: 5, icon: 'document', label: 'Gestion des factures', route: '/facture', active: false },
  { id: 6, icon: 'store', label: 'Templates', route: '/templates', active: false },
  { id: 7, icon: 'setting', label: 'Paramètres', route: '/setting', active: false },
]);

function updateActiveMenuItem() {
  menuItems.value.forEach(item => item.active = item.route === route.path);
}
watch(() => route.path, updateActiveMenuItem, { immediate: true });
onMounted(updateActiveMenuItem);

// Actions
function openInvoice() { operationsStore.openNewInvoiceModal(); }
function openClient() { operationsStore.openNewClientModal(); }
async function handleLogout() { await auth.signOut(); router.push("/login"); }

// Map icon string to component
function getIcon(name: string) {
  const icons: Record<string, any> = {
    dashboard: { template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/></svg>' },
    people: { template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' },
    document: { template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>' },
    store: { template: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5.535 7.677c.313-.98.687-2.023.926-2.677H17.46c.253.63.646 1.64.977 2.61.166.487.312.953.416 1.347.11.42.148.675.148.779 0 .18-.032.355-.09.515-.06.161-.144.3-.243.412-.1.111-.21.192-.324.245a.809.809 0 0 1-.686 0 1.004 1.004 0 0 1-.324-.245c-.1-.112-.183-.25-.242-.412a1.473 1.473 0 0 1-.091-.515 1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.401 1.401 0 0 1 13 9.736a1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.4 1.4 0 0 1 9 9.74v-.008a1 1 0 0 0-2 .003v.008a1.504 1.504 0 0 1-.18.712 1.22 1.22 0 0 1-.146.209l-.007.007a1.01 1.01 0 0 1-.325.248.82.82 0 0 1-.316.08.973.973 0 0 1-.563-.256 1.224 1.224 0 0 1-.102-.103A1.518 1.518 0 0 1 5 9.724v-.006a2.543 2.543 0 0 1 .029-.207c.024-.132.06-.296.11-.49.098-.385.237-.85.395-1.344ZM4 12.112a3.521 3.521 0 0 1-1-2.376c0-.349.098-.8.202-1.208.112-.441.264-.95.428-1.46.327-1.024.715-2.104.958-2.767A1.985 1.985 0 0 1 6.456 3h11.01c.803 0 1.539.481 1.844 1.243.258.641.67 1.697 1.019 2.72a22.3 22.3 0 0 1 .457 1.487c.114.433.214.903.214 1.286 0 .412-.072.821-.214 1.207A3.288 3.288 0 0 1 20 12.16V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-6.888ZM13 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" clip-rule="evenodd"/></svg>' },
    setting: { template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' },
  };
  return icons[name] || icons['dashboard'];
}
</script>

<style scoped>
/* Material-inspired scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
