<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import CardPerformance from "../../../Shared/Compoments/CardPerformance.vue";
import instance from "../../../api/api";

const translateStore = useTranslateStore();

const texte0 = ref("");
const texte1 = ref("");
const texte2 = ref("");
const texte3 = ref("");
const texte4 = ref("");
const entreprises = ref("");
const offres = ref("");
const timetable = ref("");
const visiteur = ref("");
const cardPerfVisible = ref(false);

let observer = null;

const seePerformanceNbre = async () => {
  try {
    const response = await instance.get('seePerformance');
    // console.log("seePerformanceNbre", response);
    if(response.data.status) {
      entreprises.value = response.data.partenairePerf;
      offres.value = response.data.offrePerf;
      timetable.value = response.data.talentPerf;
      visiteur.value = response.data.visiteurPerf;
    }
  } catch(error) {
    alert(JSON.stringify(error,null,2));
  }
};

const initIntersectionObserver = () => {
  const cardPerfElement = document.getElementById('cardPerf');
  
  if (cardPerfElement) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        cardPerfVisible.value = entry.isIntersecting;
      });
    }, {
      threshold: 0.1
    });

    observer.observe(cardPerfElement);
  }
};

onMounted(async () => {
  texte0.value = await translateStore.handleTranslate("Nos performances");
  texte1.value = await translateStore.handleTranslate("Partenaire(s)");
  texte2.value = await translateStore.handleTranslate("Offre(s)");
  texte3.value = await translateStore.handleTranslate("Talent(s)");
  texte4.value = await translateStore.handleTranslate("Viisteur(s)");
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
  <div class="container-fluid stat mt-5">
    <div class="row">
      <div class="container">
        <div class="mb-5">
          <h1 class="fw-bold" style="color:orange;">{{ texte0 }}</h1>
        </div>
        <div class="conteneur-card-performance" id="cardPerf">
          <!-- Premier card - Animation depuis la gauche -->
          <CardPerformance
            :myStyle="'card_perfor_one'"
            :icone_name="'bi bi-building icon'"
            :texte="texte1"
            :nbre="Number(entreprises)"
            :class="{ 'slide-from-left': cardPerfVisible }"
          />
          
          <!-- Deuxième card - Animation de fondu -->
          <CardPerformance
            :myStyle="'card_perfor_two'"
            :icone_name="'bi bi-briefcase-fill'"
            :texte="texte2"
            :nbre="Number(offres)"
            :class="{ 'fade-in': cardPerfVisible }"
          />
          
          <!-- Troisième card - Animation de fondu -->
          <CardPerformance
            :myStyle="'card_perfor_three'"
            :icone_name="'bi bi-person-lines-fill'"
            :texte="texte3"
            :nbre="Number(timetable)"
            :class="{ 'fade-in': cardPerfVisible }"
          />
          
          <!-- Quatrième card - Animation depuis la droite -->
          <CardPerformance
            :myStyle="'card_perfor_two'"
            :icone_name="'bi bi-person-lines-fill'"
            :texte="texte4"
            :nbre="Number(visiteur)"
            :class="{ 'slide-from-right': cardPerfVisible }"
          />
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
  gap: 2em;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
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
  width: auto;
  height: auto;
  color: white;
  padding: 3.8em 5em;
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
  animation-delay: 0.3s; /* Délai pour un effet séquentiel */
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
  animation-delay: 0.6s; /* Délai plus long pour le dernier élément */
}

</style>