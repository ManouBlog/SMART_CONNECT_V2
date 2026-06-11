<template>
  <div class="page-body position-relative">
    <!-- ANNEE -->
    <div style="margin: 2em 0">
      <label class="mb-2 d-block">Année</label>
      <select
        name="stat"
        id="stat"
        class="w-50"
        v-model="selectedYear"
        @change="periodeFilterStatisticBalance = ''"
      >
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <!-- TABS -->
    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab :value="0">Étudiants</Tab>
        <Tab :value="1">Professionnels</Tab>
        <Tab :value="2">Artisans</Tab>
        <Tab :value="3">Vétérans</Tab>
      </TabList>

      <TabPanels>
        <TabPanel :value="0"></TabPanel>
        <TabPanel :value="1"></TabPanel>
        <TabPanel :value="2"></TabPanel>
        <TabPanel :value="3"></TabPanel>
      </TabPanels>
    </Tabs>

    <!-- LEADERBOARD -->
    <div class="grid mt-4 gap-3">
      <div v-for="(user, index) in top4Data" :key="index" class="rank-card">
        <div class="rank-left">
          <div class="rank-number">#{{ index + 1 }}</div>
        </div>

        <div class="rank-body">
          <div class="name">{{ user.nom }}</div>
          <div class="score">{{ user.score }} pts</div>
        </div>
      </div>

      <div v-if="top4Data.length === 0" class="empty">
        Aucun classement disponible
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";

const rankings = ref([
  {
    annee: 2026,
    top4: {
      etudiant: [
        { nom: "Jean", score: 120 },
        { nom: "Paul", score: 110 },
        { nom: "Ali", score: 100 },
        { nom: "Sara", score: 95 },
      ],
      professionnel: [
        { nom: "Koffi", score: 140 },
        { nom: "Yao", score: 130 },
        { nom: "Awa", score: 120 },
        { nom: "Marc", score: 115 },
      ],
      artisan: [
        { nom: "Blaise", score: 90 },
        { nom: "Moussa", score: 85 },
        { nom: "Aya", score: 80 },
        { nom: "Nina", score: 75 },
      ],
      veteran: [
        { nom: "Adjoua", score: 150 },
        { nom: "Kouadio", score: 145 },
        { nom: "Louis", score: 140 },
        { nom: "Fabrice", score: 135 },
      ],
    },
  },
  {
    annee: 2025,
    top4: {
      etudiant: [
        { nom: "Jean2", score: 118 },
        { nom: "Paul2", score: 108 },
        { nom: "Ali2", score: 98 },
        { nom: "Sara2", score: 90 },
      ],
      professionnel: [
        { nom: "Koffi2", score: 135 },
        { nom: "Yao2", score: 128 },
        { nom: "Awa2", score: 119 },
        { nom: "Marc2", score: 112 },
      ],
      artisan: [
        { nom: "Blaise2", score: 88 },
        { nom: "Moussa2", score: 83 },
        { nom: "Aya2", score: 79 },
        { nom: "Nina2", score: 70 },
      ],
      veteran: [
        { nom: "Adjoua2", score: 148 },
        { nom: "Kouadio2", score: 142 },
        { nom: "Louis2", score: 138 },
        { nom: "Fabrice2", score: 130 },
      ],
    },
  },
]);

const activeTab = ref(0);
const selectedYear = ref(2026);

const rankingKeys = ["etudiant", "professionnel", "artisan", "veteran"];

const years = computed(() => rankings.value.map((r) => r.annee));

const top4Data = computed(() => {
  const yearData = rankings.value.find((r) => r.annee === selectedYear.value);

  if (!yearData) return [];

  const category = rankingKeys[activeTab.value];

  return (yearData.top4?.[category] ?? []).map((u) => ({
    nom: u.nom,
    score: u.score,
  }));
});
</script>

<style scoped>
.card {
  padding: 1rem;
}

/* Leaderboard cards */
.rank-card {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  transition: 0.2s;
}

.rank-card:hover {
  transform: translateY(-2px);
  background: #ffffff;
}

.rank-left {
  width: 50px;
  text-align: center;
}

.rank-number {
  font-weight: bold;
  font-size: 18px;
  color: #495057;
}

.rank-body {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
}

.score {
  font-size: 13px;
  color: #6c757d;
}

.empty {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
