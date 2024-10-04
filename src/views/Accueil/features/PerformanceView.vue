<script>
import { mapActions, mapState } from "pinia";
import CardPerformance from "../../../Shared/Compoments/CardPerformance.vue";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "PerformanceView",
  components: {
    // "vue3-autocounter": Vue3autocounter,
    CardPerformance,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useEntreprisesStore, ["entreprises", "timetable"]),
    ...mapState(useOffreStore, ["offres"]),
  },
  methods: {
    ...mapActions(useEntreprisesStore, ["getEntreprise"]),
    ...mapActions(useOffreStore, ["getOffres"]),
  },
  created() {
    this.getEntreprise();
    this.getOffres();
  },
};
</script>
<template>
  <div class="container-fluid stat mt-5">
    <div class="row">
      <div class="container">
        <div>
          <h1 class="fw-bold">Nos performances</h1>
        </div>
        <div class="conteneur-card-performance">
          <CardPerformance
            :icone_name="'bi bi-building icon'"
            :texte="'Partenaire(s)'"
            :nbre="entreprises.length"
          />
          <CardPerformance
            :icone_name="'bi bi-briefcase-fill'"
            :texte="'Offre(s)'"
            :nbre="offres.length"
          />
          <CardPerformance
            :icone_name="'bi bi-person-lines-fill'"
            :texte="'Ressource(s)'"
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
