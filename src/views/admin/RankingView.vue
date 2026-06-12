<template>
  <div class="page-body position-relative">
    <!-- ANNEE -->
    <div style="margin: 3em 0 0 0; display: flex; align-items: center">
      <p class="my-5 p-0" style="color: black; text-align: left">Année</p>
      <select v-model="selectedYear" class="select">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <!-- TAB GLOBAL -->
    <Tabs v-model:value="activeMainTab">
      <TabList style="padding: 1em 0">
        <Tab :value="0">Talents</Tab>
        <Tab :value="1">Entreprises</Tab>
      </TabList>

      <TabPanels>
        <!-- TALENTS -->
        <TabPanel :value="0">
          <Tabs v-model:value="activeTalentTab">
            <TabList>
              <Tab
                v-for="(cat, i) in talentCategories"
                :key="cat.key"
                :value="i"
              >
                {{ cat.label }}
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel
                v-for="(cat, i) in talentCategories"
                :key="cat.key"
                :value="i"
              />
            </TabPanels>
          </Tabs>
        </TabPanel>

        <!-- ENTREPRISES -->
        <TabPanel :value="1">
          <Tabs v-model:value="activeEntrepriseTab">
            <TabList>
              <Tab
                v-for="(cat, i) in entrepriseCategories"
                :key="cat.key"
                :value="i"
              >
                {{ cat.label }}
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel
                v-for="(cat, i) in entrepriseCategories"
                :key="cat.key"
                :value="i"
              />
            </TabPanels>
          </Tabs>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!-- LEADERBOARD -->
    <div class="grid mt-4 gap-3">
      <div
        v-for="(user, index) in top4Data"
        :key="index"
        class="rank-card"
        :style="{
          borderLeft: `6px solid ${rankConfig[index]?.color}`,
          background: rankConfig[index]?.color,
        }"
      >
        <div class="rank-left">
          <i
            :class="rankConfig[index]?.icon"
            class="rank-icon"
            :style="{ color: 'white' }"
          />

          <div class="rank-number" style="color: white">#{{ index + 1 }}</div>
        </div>

        <div class="rank-body">
          <div class="name" style="text-align: left">{{ user.nom }}</div>
          <div class="avg">Moyenne : {{ user.avg }} / 5</div>
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

/**
 * CONFIG ICONS / COLORS
 */
const rankConfig = [
  { icon: "pi pi-crown", color: "#f1c40f" },
  { icon: "pi pi-star-fill", color: "#bdc3c7" },
  { icon: "pi pi-bookmark-fill", color: "#cd7f32" },
  { icon: "pi pi-user", color: "#6c757d" },
];

/**
 * CATEGORIES
 */
const talentCategories = [
  { label: "Étudiants", key: "etudiant" },
  { label: "Professionnels", key: "professionnel" },
  { label: "Artisans", key: "artisan" },
  { label: "Vétérans", key: "veteran" },
];

const entrepriseCategories = [{ label: "Entreprises", key: "entreprises" }];

/**
 * DATA
 */
const rankings = ref([
  {
    annee: 2026,
    top4: {
      talents: {
        etudiant: [
          { nom: "Jean", avg: 5 },
          { nom: "Paul", avg: 4 },
          { nom: "Ali", avg: 3 },
          { nom: "Sara", avg: 2 },
        ],
        professionnel: [
          { nom: "Koffi", avg: 5 },
          { nom: "Yao", avg: 4 },
          { nom: "Awa", avg: 3 },
          { nom: "Marc", avg: 1 },
        ],
        artisan: [
          { nom: "Blaise", avg: 5 },
          { nom: "Moussa", avg: 4 },
          { nom: "Aya", avg: 3 },
          { nom: "Nina", avg: 2 },
        ],
        veteran: [
          { nom: "Adjoua", avg: 5 },
          { nom: "Kouadio", avg: 4 },
          { nom: "Louis", avg: 4 },
          { nom: "Fabrice", avg: 3 },
        ],
      },

      entreprises: {
        entreprises: [
          { nom: "Tech CI", avg: 30 },
          { nom: "Orange CI", avg: 20 },
          { nom: "MTN CI", avg: 10 },
          { nom: "SIFCA", avg: 5 },
        ],
      },
    },
  },
]);

/**
 * STATE
 */
const selectedYear = ref(new Date().getFullYear());

const activeMainTab = ref(0);
const activeTalentTab = ref(0);
const activeEntrepriseTab = ref(0);

/**
 * COMPUTED
 */
const years = computed(() => rankings.value.map((r) => r.annee));

const top4Data = computed(() => {
  const yearData = rankings.value.find((r) => r.annee === selectedYear.value);

  if (!yearData) return [];

  // TALENTS
  if (activeMainTab.value === 0) {
    const key = talentCategories[activeTalentTab.value]?.key;
    return yearData.top4?.talents?.[key] ?? [];
  }

  // ENTREPRISES
  const key = entrepriseCategories[activeEntrepriseTab.value]?.key;
  return yearData.top4?.entreprises?.[key] ?? [];
});
</script>
<style scoped>
.rank-card {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  transition: 0.2s;
  margin: 1em 0;
  color: white;
}

.rank-card:hover {
  transform: translateY(-2px);
}

.rank-left {
  width: 60px;
  text-align: center;
}

.rank-number {
  font-weight: bold;
  font-size: 18px;
}

.rank-body {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
}

.avg {
  font-size: 13px;
  opacity: 0.9;
}

.empty {
  text-align: center;
  padding: 20px;
  color: #999;
}

.label {
  font-weight: bold;
}

.select {
  width: 200px;
  padding: 8px;
}
</style>
