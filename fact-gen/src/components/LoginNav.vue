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
    label: "Dashboard",
    route: "/real",
    active: false,
  },
  {
    id: 3,
    icon: "people",
    label: "Client",
    route: "/clientFact",
    active: false,
  },
  {
    id: 5,
    icon: "document",
    label: "Facture",
    route: "/facture",
    active: false,
  },
  {
    id: 6,
    icon: "setting",
    label: "Setting",
    route: "/setting",
    active: false,
  },
  { id: 9, icon: "logout", label: "Logout", route: "/login", active: false },
]);

const utilisateur = computed(() => auth.user);
const isSidebarOpen = ref(false);

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

// Supprimez l'initialisation de l'auth listener d'ici
onMounted(() => {
  // Ne pas initialiser l'auth ici si c'est déjà fait dans App.vue ou main.js
  updateActiveMenuItem();
});

async function handleLogout() {
  try {
    isSidebarOpen.value = false; // Fermer la sidebar avant de déconnecter
    await auth.signOut();
    await router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

async function navigateToRoute(item: any) {
  if (item.route === "/login") {
    await handleLogout();
  } else {
    isSidebarOpen.value = false;
    // Utiliser router.push avec await pour s'assurer que la navigation est complète
    try {
      await router.push(item.route);
    } catch (error) {
      console.error("Navigation failed:", error);
      // Forcer la navigation si nécessaire
      window.location.href = item.route;
    }
  }
}
</script>
<template>
  <!-- Bouton Burger pour mobile -->
  <button @click="toggleSidebar" class="lg:hidden p-2 m-2 text-gray-700">
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <aside
    :class="[
      'fixed w-64 top-0 bg-white flex flex-col py-6 left-0 z-10 shadow-md text-red-900 h-full transition-transform duration-300 group',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'w-64',
      'lg:relative lg:translate-x-0 lg:w-64  lg:',
    ]"
  >
    <div class="mb-8 px-4">
      <h1 class="font-bold text-xl text-primary-700">
        <span class="block group-hover:hidden">F</span>
        <span class="hidden group-hover:block">Factgen</span>
      </h1>
    </div>

    <nav class="flex-1">
      <ul class="space-y-6 px-3">
        <router-link
          v-for="item in menuItems"
          :key="item.id"
          :to="item.route"
          custom
          v-slot="{ navigate, isActive }"
        >
          <li
            @click="item.route === '/login' ? handleLogout() : navigate()"
            :class="[
              'flex items-center rounded-lg transition-all duration-300 cursor-pointer px-2 py-2',
              isActive
                ? 'bg-neutral-100 text-red-400'
                : 'text-neutral-500 hover:bg-neutral-100',
            ]"
          >
            <div class="min-w-[40px] h-10 flex items-center justify-center">
              <!-- Menu icon -->
             

              <!-- Dashboard icon -->
              <svg
                v-if="item.icon === 'dashboard'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>

              <!-- People icon -->
              <svg
                v-else-if="item.icon === 'people'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>

              <!-- Folder icon -->

              <!-- Document icon -->
              <svg
                v-else-if="item.icon === 'document'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <svg
                v-else-if="item.icon === 'setting'"
                xmlns="http://www.w3.org/2000/svg"
                 class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                />
              </svg>

              <!-- Logout icon -->
              <svg
                v-else-if="item.icon === 'logout'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>

            <span
              class=" ml-3 text-blue-400 whitespace-nowrap"
            >
              {{ item.label }}
            </span>
          </li>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>
