<template>
  <div class="page-body position-relative">
    <!-- ANNEE -->
    <div
      style="margin: 3em 0 0 0; display: flex; align-items: center; gap: 1rem"
    >
      <p class="my-5 p-0" style="color: black; text-align: left">Année</p>

      <select v-model="selectedYear" class="select">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <!-- TABS PRINCIPALES -->
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
                v-for="(category, index) in talentCategories"
                :key="category.key"
                :value="index"
              >
                {{ category.label }}
              </Tab>
            </TabList>
          </Tabs>
        </TabPanel>

        <!-- ENTREPRISES -->
        <TabPanel :value="1">
          <Tabs v-model:value="activeEntrepriseTab">
            <TabList>
              <Tab
                v-for="(category, index) in entrepriseCategories"
                :key="category.key"
                :value="index"
              >
                {{ category.label }}
              </Tab>
            </TabList>
          </Tabs>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!-- LEADERBOARD -->
    <div class="grid mt-4 gap-3">
      <div
        v-for="(user, index) in top4Data"
        :key="`${user.nom}-${index}`"
        class="rank-card"
        :style="{
          borderLeft: `6px solid ${rankConfig[index]?.color}`,
          background: rankConfig[index]?.color,
        }"
      >
        <div class="rank-left">
          <img :src="medailleConfig[index]" alt="Médaille" class="medaille" />

          <i
            :class="rankConfig[index]?.icon"
            class="rank-icon"
            style="color: white"
          />

          <div class="rank-number" style="color: white">#{{ index + 1 }}</div>
        </div>

        <div class="rank-body">
          <div class="name" style="text-align: left">
            {{ user.nom }}
          </div>

          <div class="avg" v-if="user.avg">Moyenne : {{ user.avg }}</div>
          <div class="avg" v-if="user.Offre">
            Offre pourvue : {{ user.Offre }}
          </div>
        </div>
      </div>

      <div v-if="!top4Data.length" class="empty">
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

import medailleOr from "../../../public/Or.png";
import medailleArgent from "../../../public/Argent.png";
import medailleBronze from "../../../public/Bronze.png";
import medaille4 from "../../../public/Cuivre.png";

/**
 * MEDAILLES
 */
const medailleConfig = [medailleOr, medailleArgent, medailleBronze, medaille4];

/**
 * RANK CONFIG
 */
const rankConfig = [
  {
    icon: "pi pi-crown",
    color: "#f1c40f",
  },
  {
    icon: "pi pi-star-fill",
    color: "#bdc3c7",
  },
  {
    icon: "pi pi-bookmark-fill",
    color: "#cd7f32",
  },
  {
    icon: "pi pi-user",
    color: "#d6906c",
  },
];

/**
 * CATEGORIES
 */
const talentCategories = [
  {
    label: "Étudiants",
    key: "etudiant",
  },
  {
    label: "Professionnels",
    key: "professionnel",
  },
  {
    label: "Artisans",
    key: "artisan",
  },
  {
    label: "Vétérans",
    key: "veteran",
  },
];

const entrepriseCategories = [
  {
    label: "Entreprises",
    key: "entreprises",
  },
  {
    label: "Particuliers",
    key: "particuliers",
  },
];

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

      entreprises: [
        { nom: "Tech CI", Offre: 30 },
        { nom: "Orange CI", Offre: 20 },
        { nom: "MTN CI", Offre: 10 },
        { nom: "SIFCA", Offre: 5 },
      ],

      particuliers: [
        { nom: "Yves", Offre: 30 },
        { nom: "Patrick", Offre: 20 },
        { nom: "Fatou", Offre: 10 },
        { nom: "Aminata", Offre: 5 },
      ],
    },
  },
]);

/**
 * STATE
 */
const activeMainTab = ref(0);
const activeTalentTab = ref(0);
const activeEntrepriseTab = ref(0);

/**
 * YEARS
 */
const years = computed(() => rankings.value.map((item) => item.annee));

const selectedYear = ref(years.value[0] ?? new Date().getFullYear());

/**
 * ACTIVE KEYS
 */
const activeTalentKey = computed(
  () => talentCategories[activeTalentTab.value]?.key
);

const activeEntrepriseKey = computed(
  () => entrepriseCategories[activeEntrepriseTab.value]?.key
);

/**
 * YEAR DATA
 */
const currentYearData = computed(() =>
  rankings.value.find((item) => item.annee === selectedYear.value)
);

/**
 * TOP 4 DATA
 */
const top4Data = computed(() => {
  const top4 = currentYearData.value?.top4;

  if (!top4) {
    return [];
  }

  if (activeMainTab.value === 0) {
    return top4.talents?.[activeTalentKey.value] ?? [];
  }

  const dataMap = {
    entreprises: top4.entreprises ?? [],
    particuliers: top4.particuliers ?? [],
  };

  return dataMap[activeEntrepriseKey.value] ?? [];
});
</script>
<style scoped>
.medaille {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.rank-card {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  gap: 1em;
  transition: 0.2s;
  margin: 1em 0;
  color: white;
}

.rank-card:hover {
  transform: translateY(-2px);
}

.rank-left {
  width: 60px;
  display: flex;
  align-items: center;
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
