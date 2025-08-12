<script>
import { mapActions, mapState } from "pinia";
import CardPerformance from "../../../Shared/Compoments/CardPerformance.vue";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "PerformanceView",
  components: {
    // "vue3-autocounter": Vue3autocounter,
    CardPerformance,
  },
  data() {
    return { texte0: "",texte2:"",texte3:"",texte1:"" };
  },
  computed: {
    ...mapState(useEntreprisesStore, ["entreprises", "timetable"]),
    ...mapState(useOffreStore, ["offres"]),
  },
  methods: {
    ...mapActions(useEntreprisesStore, ["getEntreprise"]),
    ...mapActions(useOffreStore, ["getOffres"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
  },
  async created() {
    this.getEntreprise();
    this.getOffres();
    this.texte0 = await this.handleTranslate("Nos performances");
    this.texte1 = await this.handleTranslate("Partenaire(s)");
    this.texte2 = await this.handleTranslate("Offre(s)");
    this.texte3 = await this.handleTranslate("Talent(s)");
  },
};
</script>
<template>
  <div class="container-fluid stat mt-5">
    <div class="row">
      <div class="container">
        <div class="mb-5">
          <h1 class="fw-bold">{{ texte0 }}</h1>
        </div>
        <div class="conteneur-card-performance">
          <CardPerformance
          v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 spin-in-45 slide-in-from-t-12 animate-duration-1000' }"
            :myStyle="'card_perfor_one'"
            :icone_name="'bi bi-building icon'"
            :texte="texte1"
            :nbre="entreprises.length"
          />
          <CardPerformance
           v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 slide-in-from-t-20 animate-duration-500'}"
          :myStyle="'card_perfor_three'"
            :icone_name="'bi bi-briefcase-fill'"
            :texte="texte2"
            :nbre="offres.length"
          />
          <CardPerformance
          v-animateonscroll="{ enterClass: 'fadeinright', leaveClass: 'fadeoutright' }"
          :myStyle="'card_perfor_two'"
            :icone_name="'bi bi-person-lines-fill'"
            :texte="texte3"
            :nbre="timetable.length"
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
.card_perfor_one{
  width: auto;
  height: auto;
  padding: 3.8em 5em;
  color:white;
  background: #334155;
  border-radius: 0px 100px 0px 100px;
}
.card_perfor_two{
  width: auto;
  height: auto;
  color:white;
  padding: 3.8em 5em;
  background: rgba(4, 3, 1, 0.649);
  border-radius: 100%;
}
.card_perfor_three{
  width: auto;
  height: auto;
  color:white;
  padding: 3.8em 5em;
  background: rgb(75, 71, 71);
  border-radius: 100px 0px 100px 0px;
}
@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }

    100% {
        transform: translateY(0);
    }
}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
</style>
