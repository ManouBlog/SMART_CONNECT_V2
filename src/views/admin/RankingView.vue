<template>
  <div class="card">
    <TabView v-model:activeIndex="activeTab">
      <TabPanel header="Étudiants"></TabPanel>
      <TabPanel header="Professionnels"></TabPanel>
      <TabPanel header="Artisans"></TabPanel>
      <TabPanel header="Vétérans"></TabPanel>
    </TabView>

    <div class="mb-3 mt-3">
      <InputText
        v-model="filters.global.value"
        placeholder="Rechercher..."
        class="w-full"
      />
    </div>

    <DataTable
      :value="formattedData"
      :filters="filters"
      :globalFilterFields="['annee', 'nom', 'score']"
      paginator
      :rows="10"
      stripedRows
      showGridlines
      tableStyle="min-width: 50rem"
    >
      <template #empty> Aucun classement trouvé. </template>

      <Column field="annee" header="Année" sortable />

      <Column field="nom" header="Nom" sortable />

      <Column field="score" header="Score" sortable />
    </DataTable>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

import { FilterMatchMode } from "@primevue/core/api";

const rankings = ref([
  {
    annee: 2026,
    top4: {
      etudiant: {
        nom: "Jean",
        score: 120,
      },
      professionnel: {
        nom: "Koffi",
        score: 110,
      },
      artisan: {
        nom: "Yao",
        score: 95,
      },
      veteran: {
        nom: "Adjoua",
        score: 90,
      },
    },
  },
  {
    annee: 2025,
    top4: {
      etudiant: {
        nom: "Paul",
        score: 115,
      },
      professionnel: {
        nom: "Konan",
        score: 105,
      },
      artisan: {
        nom: "Aya",
        score: 92,
      },
      veteran: {
        nom: "Yves",
        score: 88,
      },
    },
  },
]);

const activeTab = ref(0);

const filters = ref({
  global: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
});

const rankingKeys = ["etudiant", "professionnel", "artisan", "veteran"];

const formattedData = computed(() => {
  const currentType = rankingKeys[activeTab.value];

  return rankings.value
    .filter((item) => item.top4?.[currentType])
    .map((item) => ({
      annee: item.annee,
      nom: item.top4[currentType].nom,
      score: item.top4[currentType].score,
    }));
});
</script>

<style scoped>
.card {
  padding: 1rem;
}

.w-full {
  width: 100%;
}
</style>
