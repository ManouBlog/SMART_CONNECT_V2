<script>
import { mapActions } from "pinia";
import CardPerformance from "../../../Shared/Compoments/CardPerformance.vue";
import instance from "../../../api/api";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";

export default {
  name: "PerformanceView",
  components: {
    // "vue3-autocounter": Vue3autocounter,
    CardPerformance,
  },
  data() {
    return { texte0: "",entreprises:"",offres:"",timetable:"",visiteur:"",texte2: "", texte3: "", texte1: "", texte4: "" };
  },

  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
   async seePerformanceNbre(){
      try{
       const response = await instance.get('seePerformance');
       console.log("seePerformanceNbre",response)
      if(response.data.status){
        this.entreprises = response.data.partenairePerf
        this.offres = response.data.offrePerf
        this.timetable = response.data.talentPerf
        this.visiteur = response.data.visiteurPerf
      }
      }catch(error){
        console.log(error)
      }
    }
  },
  async created() {
    this.texte0 = await this.handleTranslate("Nos performances");
    this.texte1 = await this.handleTranslate("Partenaire(s)");
    this.texte2 = await this.handleTranslate("Offre(s)");
    this.texte3 = await this.handleTranslate("Talent(s)");
    this.texte4 = await this.handleTranslate("Viisteur(s)");
    this.seePerformanceNbre();
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
            :myStyle="'card_perfor_one'"
            :icone_name="'bi bi-building icon'"
            :texte="texte1"
            :nbre="entreprises"
          />
          <CardPerformance
            :myStyle="'card_perfor_three'"
            :icone_name="'bi bi-briefcase-fill'"
            :texte="texte2"
            :nbre="offres"
          />
          <CardPerformance
            :myStyle="'card_perfor_two'"
            :icone_name="'bi bi-person-lines-fill'"
            :texte="texte3"
            :nbre="timetable"
          />
          <CardPerformance
            :myStyle="'card_perfor_two'"
            :icone_name="'bi bi-person-lines-fill'"
            :texte="texte4"
            :nbre="visiteur"
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
