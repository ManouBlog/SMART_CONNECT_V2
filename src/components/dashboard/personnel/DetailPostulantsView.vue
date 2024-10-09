<script>
import instance, { lienPhoto } from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { Help } from "../../../utils";

import CardPostulants from "./features/CardPostulants.vue"
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
    get_offres_interess_by_student() {
      this.spinner = true;
      instance
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

          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
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
        class="d-flex align-items-center justify-content-center flex-wrap"
      >
      <CardPostulants 
      v-for="(item,index) in detailStudents" 
      :key="index"
      :InfoPostulant="item"
      />
      </div>
    </div>
  </section>
</template>


