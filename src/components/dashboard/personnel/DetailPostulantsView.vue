<script>
import instance, { lienPhoto } from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { Help } from "../../../utils";
import {useLoadingSpinner} from "../../../store-pinia/LoadingSpinner/useLoadingSpinner"
import CardPostulants from "./features/CardPostulants.vue";
const spinnerLoading = useLoadingSpinner();
export default {
  name: "DetailPostulantsView",
  components: { HeaderDashboard,CardPostulants },
  data() {
    return {
      offresInteressByStudents: null,
      lienPhoto: lienPhoto,
      offre: null,
      offres: null,
      spinner: false,
      detailStudents: [],
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    async get_offres_interess_by_student() {
      spinnerLoading.launchLoading(true)
      await instance
        .get("list_offres_interess_by_students")
        .then((res) => {
          console.log(res);
          this.offresInteressByStudents = Help.groupBy(res.data);
          console.log("OFFRESINTERESSBYSTUDENTS", this.offresInteressByStudents);
          for (let item in this.offresInteressByStudents) {
            if (item === this.$route.params.offre) {
              this.detailStudents = this.offresInteressByStudents[item];
            }
          }
          spinnerLoading.launchLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chooseStudent(){
     this.get_offres_interess_by_student()
    }
    
  },
  created() {
    this.get_offres_interess_by_student();
  },
};
</script>

<template>
  <section>
    <HeaderDashboard
      :TitleHeader="'Détails des postulants'"
      :subTitleHeader="'Détails des postulants'"
    />
    <div class="page-body position-relative">
      <h2 class="text-left my-5 mx-5">{{ detailStudents.length }} étudiant{{ detailStudents.length>1?"s":null }}</h2>
      
      <div
        v-if="detailStudents != null"
        class="d-flex align-items-center conteneur_postulants justify-content-center"
      >
      <CardPostulants 
      v-for="(item,index) in detailStudents" 
      :key="index"
      :InfoPostulant="item"
      @handleListe="chooseStudent"
      />
      </div>
    </div>
  </section>
</template>
<style scoped>
.conteneur_postulants{
  gap:1.5em;
  place-content: center;
  flex-wrap: wrap;
}
</style>


