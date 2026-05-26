<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1A1C1E]">Clients</h1>
        <p class="text-sm text-gray-500">Gérez votre base de données et consultez les soldes</p>
      </div>
      <n-button-group>
        <n-button @click="exportClients">
          <template #icon><n-icon><ArrowDownTrayIcon /></n-icon></template>
          Exporter
        </n-button>
        <n-button type="primary" @click="clientStore.ouvrirFormulaire()">
          <template #icon><n-icon><PlusIcon /></n-icon></template>
          Nouveau client
        </n-button>
      </n-button-group>
    </div>

    <n-grid :cols="4" :x-gap="12">
      <n-grid-item :span="2">
        <n-input v-model:value="clientStore.search" placeholder="Rechercher par nom, email, téléphone..." clearable
          @input="clientStore.page = 1">
          <template #prefix><n-icon><MagnifyingGlassIcon /></n-icon></template>
        </n-input>
      </n-grid-item>
      <n-grid-item :span="1">
        <n-statistic label="Total" :value="clientStore.clients.length">
          <template #prefix><n-icon color="#005AC1"><UserGroupIcon /></n-icon></template>
        </n-statistic>
      </n-grid-item>
      <n-grid-item :span="1">
        <n-statistic label="Actifs" :value="clientsActifs">
          <template #prefix><n-icon color="#22c55e"><CheckCircleIcon /></n-icon></template>
        </n-statistic>
      </n-grid-item>
    </n-grid>

    <n-card>
      <n-data-table
        v-if="!clientStore.loading && clientStore.clients.length > 0"
        :columns="columns"
        :data="clientStore.paginatedClients"
        :bordered="false"
        :single-line="false"
        @row-click="handleRowClick"
      />
      <n-empty v-else-if="!clientStore.loading && clientStore.clients.length === 0" description="Aucun client pour le moment">
        <template #extra>
          <n-button type="primary" @click="clientStore.ouvrirFormulaire()">Ajouter mon premier client</n-button>
        </template>
      </n-empty>
      <n-spin v-else size="large" />
    </n-card>

    <div v-if="clientStore.totalPages > 1" class="flex justify-between items-center">
      <span class="text-xs text-gray-500">Page {{ clientStore.page }} sur {{ clientStore.totalPages }}</span>
      <n-pagination
        :page="clientStore.page"
        :page-count="clientStore.totalPages"
        @update:page="clientStore.allerALaPage"
      />
    </div>

    <client-form-modal :open="clientStore.isFormOpen" :form="clientStore.clientForm"
      @submit="handleSubmit" @close="clientStore.fermerFormulaire" />

    <client-details-popup :open="clientStore.isDetailsOpen" :client="clientStore.selectedClient"
      :stats="statsClient" @close="clientStore.fermerDetails" @delete="showDeleteConfirm = true" @edit="handleEdit" />

    <n-modal v-model:show="showDeleteConfirm" preset="card" title="Supprimer le client ?"
      :bordered="false" :style="{ maxWidth: '400px' }">
      <p class="text-sm text-gray-600 mb-6">Cette action est définitive.</p>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showDeleteConfirm = false">Annuler</n-button>
          <n-button type="error" :loading="isDeleting" @click="supprimerClient">Supprimer</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, h } from "vue";
import { useRouter } from "vue-router";
import { useClientsStore } from "../stores/client.store";
import ClientFormModal from "../components/ClientFormModal.vue";
import ClientDetailsPopup from "../components/ClientDetailsPopup.vue";
import { showToastMessage } from "@/composables/useToast";
import { useFacturesStore } from "@/modules/Invoice/stores/invoice.store";
import {
  ArrowDownTrayIcon, MagnifyingGlassIcon, PlusIcon, UserGroupIcon,
  ChevronRightIcon, UsersIcon, CheckCircleIcon
} from "@heroicons/vue/24/outline";

const router = useRouter();
const clientStore = useClientsStore();
const facturesStore = useFacturesStore();
const clientsActifs = ref(0);
const showDeleteConfirm = ref(false);
const isDeleting = ref(false);

const columns = [
  {
    title: "Client",
    key: "nom",
    render(row) {
      return h("div", { class: "flex items-center gap-3" }, [
        h("div", {
          class: "w-10 h-10 rounded-lg bg-[#D3E4FF] flex items-center justify-center text-[#001C3B] font-bold text-sm",
        }, row.nom ? row.nom.charAt(0).toUpperCase() : "?"),
        h("div", [
          h("p", { class: "text-sm font-bold" }, row.nom),
          h("p", { class: "text-[10px] text-gray-500 uppercase tracking-widest" }, "Entreprise"),
        ]),
      ]);
    },
  },
  { title: "Email", key: "email" },
  { title: "Téléphone", key: "telephone" },
  {
    title: "Actions",
    width: 80,
    render() {
      return h(ChevronRightIcon, { class: "w-4 h-4 text-[#005AC1] ml-auto" });
    },
  },
];

const statsClient = computed(() => {
  if (!clientStore.selectedClient) return { total: 0, payees: 0, en_attente: 0 };
  return facturesStore.statistiquesParClient(clientStore.selectedClient.id);
});

function handleRowClick(row) {
  const index = clientStore.clients.findIndex((c) => c.id === row.id);
  clientStore.selectionnerClient(row, index);
}

function handleEdit(id) {
  console.log("Edit client", id);
}

function exportClients() {}

onMounted(async () => {
  try {
    await clientStore.chargerClients();
    await facturesStore.chargerFactures();
  } catch (error) {
    showToastMessage("Erreur de chargement", "error");
  }
});

const handleSubmit = async () => {
  try {
    await clientStore.ajouterClient();
    showToastMessage("Client ajouté !", "success");
  } catch (error) {
    showToastMessage("Erreur de création", "error");
  }
};

async function supprimerClient() {
  try {
    isDeleting.value = true;
    await clientStore.supprimerClient();
    showDeleteConfirm.value = false;
    clientStore.fermerDetails();
    showToastMessage("Client supprimé.", "success");
  } catch (error) {
    showToastMessage("Erreur de suppression", "error");
  } finally {
    isDeleting.value = false;
  }
}
</script>
