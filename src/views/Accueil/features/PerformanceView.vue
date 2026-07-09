<script setup>

import { ref, onMounted, onUnmounted } from "vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import CardPerformance from "../../../Shared/Compoments/CardPerformance.vue";
import instance from "../../../api/api";

const translateStore = useTranslateStore();

const texte0 = ref("");
const texte1 = ref("");
const texte55 = ref("");
const texte2 = ref("");
const texte3 = ref("");
const texte4 = ref("");
const entreprises = ref(0);
const offres = ref(0);
const timetable = ref(0);
const visiteur = ref(0);
const student = ref(0);
const veterans = ref(0);
const artisans = ref(0);
const particuliers = ref(0)
const professionnels = ref(0)
const cardPerfVisible = ref(false);

let observer = null;

// Fonction pour formater les nombres comme YouTube
const formatNumber = (value) => {
  const v = Math.floor(value)

  if (v >= 1000000) {
    return parseFloat((v / 1000000))
  }

  if (v >= 1000) {
    return parseFloat((v / 1000))
  }
  return v;
}


const formatSuffix = (value) => {
  const v = Math.floor(value)

  if (v >= 1000000) {
    return 'M'
  }

  if (v >= 1000) {
    return 'K'
  }

  return;
}

const seePerformanceNbre = async () => {
  try {
    const response = await instance.get("seePerformance");
    if (response.data.status) {

      entreprises.value = response.data.partenairePerf;
      offres.value = response.data.offrePerf;
      timetable.value = response.data.talentPerf;
      visiteur.value = response.data.visiteurPerf;
      student.value = response.data.students;
      veterans.value = response.data.veterans;
      artisans.value = response.data.artisans;
      professionnels.value = response.data.professionnels
      particuliers.value = response.data.particuliers
    }
  } catch (error) {
    console.log(error);
  }
};

const initIntersectionObserver = () => {
  const cardPerfElement = document.getElementById("cardPerf");

  if (cardPerfElement) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          cardPerfVisible.value = entry.isIntersecting;
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(cardPerfElement);
  }
};

onMounted(async () => {
  texte0.value = await translateStore.handleTranslate("Nos chiffres clés");
  texte1.value = await translateStore.handleTranslate("Entreprise(s)");
  texte2.value = await translateStore.handleTranslate("Offre(s)");
  texte3.value = await translateStore.handleTranslate("Talent(s)");
  texte4.value = await translateStore.handleTranslate("Visiteur(s)");
  texte55.value = await translateStore.handleTranslate("Étudiant(s)");
  await seePerformanceNbre();
  initIntersectionObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div class="mb-5">
    <h1 class="fw-bold" style="color: orange; text-align: center">{{ texte0 }}</h1>
  </div>
  <div class="container-fluid stat mt-5">
    <div class="row">
      <div class="container">
        <div class="conteneur-card-performance" id="cardPerf">
          <div style="display: flex;gap: 0.5em;" class="circles-container">
            <div class="circles-wrapper">
              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :icone_name="'bi bi-person-lines-fill'"
                :texte="'Particulier(s)'" :nbre="formatNumber(particuliers)"
                :class="{ 'fade-in circle-item': cardPerfVisible }" :isPayement="false"
                :suffix="formatSuffix(Number(particuliers))" :tooltip="particuliers.toString()"
                :decimals="Number(particuliers) > 1000 ? 1 : null" />


              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :icone_name="'bi bi-person-lines-fill'"
                :texte="texte55" :nbre="formatNumber(student)" :class="{ 'fade-in circle-item': cardPerfVisible }"
                :isPayement="false" :suffix="formatSuffix(Number(student))" :tooltip="student.toString()"
                :decimals="Number(student) > 1000 ? 1 : null" />
              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :icone_name="'bi bi-person-lines-fill'"
                :texte="'Professionnel(s)'" :nbre="formatNumber(professionnels)"
                :class="{ 'fade-in circle-item': cardPerfVisible }" :isPayement="false"
                :suffix="formatSuffix(Number(professionnels))" :tooltip="professionnels.toString()"
                :decimals="Number(professionnels) > 1000 ? 1 : null" />
              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :icone_name="'bi bi-person-lines-fill'"
                :texte="'Artisan(s)'" :nbre="formatNumber(artisans)" :class="{ 'fade-in circle-item': cardPerfVisible }"
                :isPayement="false" :suffix="formatSuffix(Number(artisans))" :tooltip="artisans.toString()"
                :decimals="Number(artisans) > 1000 ? 1 : null" />
              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :icone_name="'bi bi-person-lines-fill'"
                :texte="'Vétéran(s)'" :nbre="formatNumber(veterans)" :class="{ 'fade-in circle-item': cardPerfVisible }"
                :isPayement="false" :suffix="formatSuffix(Number(veterans))" :tooltip="veterans.toString()"
                :decimals="Number(veterans) > 1000 ? 1 : null" />
              <CardPerformance v-if="Number(entreprises) > 100" :myStyle="'card_perfor_one'"
                :icone_name="'bi bi-building icon'" :texte="texte1" :nbre="formatNumber(entreprises)"
                :class="{ 'slide-from-left circle-item': cardPerfVisible }" :isPayement="false" :suffix="'K'"
                :tooltip="entreprises.toString()" :decimals="Number(entreprises) > 1000 ? 1 : null" />
              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :icone_name="'bi bi-briefcase-fill'"
                :texte="texte2" :nbre="formatNumber(offres)" :class="{ 'fade-in circle-item': cardPerfVisible }"
                :isPayement="false" :suffix="formatSuffix(Number(offres))" :tooltip="offres.toString()"
                :decimals="Number(offres) > 1000 ? 1 : null" />
              <CardPerformance v-if="Number(timetable) > 100" :myStyle="'card_perfor_nbre_student_save'"
                :icone_name="'bi bi-person-lines-fill'" :texte="texte3" :nbre="formatNumber(timetable)"
                :class="{ 'fade-in circle-item': cardPerfVisible }" :isPayement="false"
                :suffix="formatSuffix(Number(timetable))" :tooltip="timetable.toString()"
                :decimals="Number(timetable) > 1000 ? 1 : null" />

              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :icone_name="'bi bi-person-lines-fill'"
                :texte="texte4" :nbre="formatNumber(visiteur)"
                :class="{ 'slide-from-right circle-item': cardPerfVisible }" :isPayement="false"
                :suffix="formatSuffix(Number(visiteur))" :tooltip="visiteur.toString()"
                :decimals="Number(visiteur) > 1000 ? 1 : null" />
              <CardPerformance :myStyle="'card_perfor_nbre_student_save'" :texte="'Paiement garanti'"
                :class="{ 'fade-in circle-item': cardPerfVisible }" :isPayement="true" />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../Shared/styles/stylesShared.css";

.stat {
  background-color: var(--secondary-color) !important;
  color: var(--third-color) !important;
  padding: 3em 2em;
  color: rgb(0, 0, 0);
}

.conteneur-card-performance {
  display: flex;
  gap: 1.5em;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  place-content: center;
}

.card_perfor_one {
  width: auto;
  height: auto;
  padding: 3.8em 5em;
  color: white;
  background: #334155;
  border-radius: 0px 100px 0px 100px;
}

.card_perfor_two {
  width: 200px;
  height: 200px;
  color: white;
  text-align: center;
  background: rgba(4, 3, 1, 0.649);
  border-radius: 100%;
}

.circles-container {
  width: 100%;
  padding: 10px 0;
  white-space: nowrap;
}

.circles-wrapper {
  display: flex;
  gap: 0.5em;
  animation: scrollLoop 10s linear infinite;
}

@keyframes scrollLoop {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
    /* 50% = la largeur de tout le contenu répété */
  }
}

@media (max-width: 800px) {
  .circles-wrapper {
    animation: scrollLoopMobile 10s linear infinite;
  }

  @keyframes scrollLoopMobile {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(-100%);
    }
  }
}

@media (min-width: 2000px) {
  .circles-wrapper {
    animation: none !important;
    transform: none !important;
  }

  .circles-container {
    display: flex;
    justify-content: center;
  }
}

.circles-container:hover .circles-wrapper {
  animation-play-state: paused;
}

.circle-item {
  min-width: 70px;
  /* plus petit sur mobile */
  border-radius: 16px;
  background: #ff8c42;
  color: white;
  text-align: center;
}

.card_perfor_nbre_student_save {
  flex: 0 0 auto;
  /* important pour empêcher le wrap */
  width: 200px;
  height: 200px;
  color: white;
  text-align: center;
  background: rgba(4, 3, 1, 0.649);
  border-radius: 50%;
  padding: 1.9em 1em;
  scroll-snap-align: start;
}

.card_perfor_payment {
  width: 200px;
  height: 200px;
  font-size: 0.9em;
  color: white;
  padding: 1.9em 1em;
  text-align: center;
  background: rgba(4, 3, 1, 0.649);
  border-radius: 100%;
}

.card_perfor_three {
  width: auto;
  height: auto;
  color: white;
  padding: 3.8em 5em;
  background: #334155;
  border-radius: 100px 0px 100px 0px;
}

/* Animation depuis la gauche */
@keyframes slideFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-from-left {
  animation: slideFromLeft 0.8s ease-out forwards;
}

/* Animation de fondu */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in {
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.3s;
  /* Délai pour un effet séquentiel */
}

/* Animation depuis la droite */
@keyframes slideFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-from-right {
  animation: slideFromRight 0.8s ease-out forwards;
  animation-delay: 0.6s;
  /* Délai plus long pour le dernier élément */
}
</style>
