<template>
  <n-layout class="min-h-screen" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      show-trigger="bar"
      :collapsed="collapsed"
      @update:collapsed="collapsed = $event"
      class="hidden lg:flex"
      native-scrollbar
    >
      <template #header>
        <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-100" :class="{ 'justify-center': collapsed }">
          <div class="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <n-icon size="20" color="white"><DocumentTextIcon /></n-icon>
          </div>
          <span v-if="!collapsed" class="text-lg font-semibold text-gray-900">FactGen</span>
        </div>
      </template>
      <n-menu
        :value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        @update:value="handleMenuSelect"
      />
      <template #footer>
        <div class="p-3 border-t border-gray-100">
          <n-button
            quaternary
            type="error"
            size="small"
            block
            @click="logout"
          >
            <template #icon>
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </n-icon>
            </template>
            <span v-if="!collapsed">Déconnexion</span>
          </n-button>
        </div>
      </template>
    </n-layout-sider>

    <n-layout>
      <n-layout-header bordered class="h-16 flex items-center justify-between px-4 lg:px-8 bg-white/80 backdrop-blur-md">
        <div class="flex items-center gap-4">
          <n-button quaternary class="lg:!hidden" @click="mobileMenuOpen = true">
            <template #icon><n-icon><BarsIcon /></n-icon></template>
          </n-button>
          <n-input
            placeholder="Rechercher une facture, un client..."
            clearable
            size="small"
            class="hidden md:inline-flex max-w-md"
          />
        </div>

        <div class="flex items-center gap-3">
          <n-badge dot type="error">
            <n-button quaternary circle>
              <template #icon><n-icon><BellIcon /></n-icon></template>
            </n-button>
          </n-badge>
          <n-avatar round :style="{ background: '#D3E4FF', color: '#001C3B' }">
            {{ userInitial }}
          </n-avatar>
          <div class="text-right hidden sm:block">
            <p class="text-xs font-bold">{{ utilisateur?.nom || 'Utilisateur' }}</p>
            <p class="text-[10px] text-gray-400 uppercase tracking-wider">Plan Expert</p>
          </div>
        </div>
      </n-layout-header>

      <n-layout-content class="bg-[#F8F9FA]" content-style="padding: 24px;">
        <div class="mx-auto max-w-7xl">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </n-layout-content>
    </n-layout>

    <n-drawer v-model:show="mobileMenuOpen" placement="left" width="260">
      <n-drawer-content body-content-style="padding: 0;">
        <n-menu :value="activeKey" :options="menuOptions" @update:value="handleMenuSelect" />
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<script setup>
import { ref, computed, onMounted, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";
import { useMessage, NIcon } from "naive-ui";
import {
  Squares2X2Icon,
  DocumentTextIcon,
  UsersIcon,
  RectangleGroupIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline';
// Use heroicons directly in NIcon for menu icons
function icon(component) {
  return () => h(NIcon, null, { default: () => h(component) });
}

const BarsIcon = () => h("svg", { class: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 }, [
  h("path", { "stroke-linecap": "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" })
]);

const BellIcon = () => h("svg", { class: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 }, [
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" })
]);

const message = useMessage();
const collapsed = ref(false);
const mobileMenuOpen = ref(false);
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const utilisateur = ref(JSON.parse(localStorage.getItem("utilisateurConnecte")));
const userInitial = computed(() => utilisateur.value?.nom?.charAt(0).toUpperCase() || "U");

const activeKey = computed(() => route.name);

const menuOptions = [
  { label: "Tableau de bord", key: "Real", icon: icon(Squares2X2Icon) },
  { label: "Factures", key: "Facture", icon: icon(DocumentTextIcon) },
  { label: "Clients", key: "Client", icon: icon(UsersIcon) },
  { label: "Templates", key: "Templates", icon: icon(RectangleGroupIcon) },
  { label: "Paramètres", key: "setting", icon: icon(Cog6ToothIcon) },
];

function handleMenuSelect(key) {
  const pathMap = {
    Real: "/real",
    Facture: "/facture",
    Client: "/clientFact",
    Templates: "/templates",
    setting: "/setting",
  };
  router.push(pathMap[key] || "/real");
  mobileMenuOpen.value = false;
}

onMounted(() => {
  auth.initialize();
});

async function logout() {
  try {
    await auth.signOut();
    localStorage.removeItem("utilisateurConnecte");
    router.push("/login");
    message.success("Déconnexion réussie.");
  } catch {
    message.error("Erreur lors de la déconnexion.");
  }
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-out;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
