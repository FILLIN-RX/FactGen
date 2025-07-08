<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const menuItems = ref([
  {
    id: 2,
    icon: "dashboard",
    label: "Tableau de bord",
    route: "/real",
    active: false,
  },
  {
    id: 3,
    icon: "people",
    label: "Gestion des clients",
    route: "/clientFact",
    active: false,
  },
  {
    id: 5,
    icon: "document",
    label: "Gestion des factures",
    route: "/facture",
    active: false,
  },
  {
    id: 6,
    icon: "setting",
    label: "Paramètres",
    route: "/setting",
    active: false,
  },
]);

const utilisateur = computed(() => auth.user);

// Fonction pour mettre à jour l'élément actif basé sur la route courante
function updateActiveMenuItem() {
  menuItems.value.forEach((item) => {
    item.active = item.route === route.path;
  });
}

// Watcher pour surveiller les changements de route
watch(
  () => route.path,
  () => {
    updateActiveMenuItem();
  },
  { immediate: true }
);

onMounted(() => {
  updateActiveMenuItem();
});

async function handleLogout() {
  try {
    await auth.signOut();
    await router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

async function navigateToRoute(item: any) {
  try {
    await router.push(item.route);
  } catch (error) {
    console.error("Navigation failed:", error);
    window.location.href = item.route;
  }
}
</script>

<template>
  <div class="flex h-screen fixed flex-col h-full bg-white">
    <!-- Header Section -->
    <div class="px-6 py-8">
      <div class="text-center">
        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-xl">F</span>
        </div>
        <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FactGen
        </h1>
        <p class="text-xs text-slate-500 mt-1">Gestion de facturation</p>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 overflow-y-auto">
      <div class="space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.id"
          :to="item.route"
          class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group"
          :class="
            $route.path === item.route
              ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-500 shadow-sm'
              : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:translate-x-1 hover:shadow-sm'
          "
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
               :class="$route.path === item.route 
                 ? 'bg-blue-100 text-blue-600' 
                 : 'text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'">
            <!-- Dashboard icon -->
            <svg
              v-if="item.icon === 'dashboard'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
            </svg>

            <!-- People icon -->
            <svg
              v-else-if="item.icon === 'people'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            <!-- Document icon -->
            <svg
              v-else-if="item.icon === 'document'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <!-- Setting icon -->
            <svg
              v-else-if="item.icon === 'setting'"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <span class="ml-3 whitespace-nowrap font-medium">
            {{ item.label }}
          </span>
        </router-link>
      </div>

      <!-- Séparateur -->
      <div class="my-6 border-t border-slate-200"></div>

      <!-- Section Raccourcis -->
      <div class="mb-6">
        <h3 class="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Raccourcis
        </h3>
        <div class="space-y-1">
          <div class="px-4 py-2 text-sm text-slate-600 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-slate-50 transition-colors">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Nouvelle facture
            </div>
          </div>
          <div class="px-4 py-2 text-sm text-slate-600 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-slate-50 transition-colors">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              Nouveau client
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer Section avec profil utilisateur -->
    <div class="border-t border-slate-200 p-4">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-white font-semibold text-sm">
            {{ utilisateur?.nom?.charAt(0) || 'U' }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-900 truncate">
            {{ utilisateur?.nom || 'Utilisateur' }}
          </p>
          <p class="text-xs text-slate-500 truncate">
            {{ auth.user?.email || 'email@example.com' }}
          </p>
        </div>
      </div>

      <button
        @click="handleLogout"
        class="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-sm group"
      >
        <svg class="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar pour la navigation */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Améliorer les interactions tactiles */
@media (hover: none) and (pointer: coarse) {
  .transition-all {
    transition-duration: 0.15s;
  }
  
  button,
  .router-link-active {
    -webkit-tap-highlight-color: transparent;
  }
}

/* Animation d'apparition */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.space-y-2 > * {
  animation: slideIn 0.3s ease-out forwards;
}

.space-y-2 > *:nth-child(2) { animation-delay: 0.1s; }
.space-y-2 > *:nth-child(3) { animation-delay: 0.2s; }
.space-y-2 > *:nth-child(4) { animation-delay: 0.3s; }
.space-y-2 > *:nth-child(5) { animation-delay: 0.4s; }
</style>