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
    return { texte: "",texte2:"",texte3:"",texte1:"" };
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
    this.texte = await this.handleTranslate("Nos performances");
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
        <div>
          <h1 class="fw-bold">{{ texte }}</h1>
        </div>
        <div class="conteneur-card-performance">
          <CardPerformance
            :icone_name="'bi bi-building icon'"
            :texte="texte1"
            :nbre="entreprises.length"
          />
          <CardPerformance
            :icone_name="'bi bi-briefcase-fill'"
            :texte="texte2"
            :nbre="offres.length"
          />
          <CardPerformance
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
</style>
