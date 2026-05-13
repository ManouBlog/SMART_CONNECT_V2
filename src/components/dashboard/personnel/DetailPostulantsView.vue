<script>
import instance, { lienPhoto } from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import CardPostulants from "./features/CardPostulants.vue";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
const spinnerLoading = useLoadingSpinner();
export default {
  name: "DetailPostulantsView",
  components: { HeaderDashboard, CardPostulants },
  data() {
    return {
      texte0: "",
      texte1: "",
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    getTableau(data){
 return Object.entries(data).map(([nomOffre, students]) => ({
        nom_offre: nomOffre,
        count: students.length,
        students
      }));
    },
    async get_offres_interess_by_student() {
      spinnerLoading.launchLoading(true);
      await instance
        .get("list_offres_interess_by_students")
        .then((res) => {
          // console.log("list_offres_interess_by_students23", res);
          this.offresInteressByStudents = this.getTableau(res.data);
          this.detailStudents = this.offresInteressByStudents.find(item=>item.nom_offre === this.$route.params.offre).students;
          // console.log("this.detailStudents",this.detailStudents)
          spinnerLoading.launchLoading(false);
        })
        .catch((err) => {
          // console.log(err)
          console.log(err);
        });
    },
    chooseStudent() {
      this.get_offres_interess_by_student();
    },
  },
  async created() {
    this.get_offres_interess_by_student();
    this.texte0 = await this.handleTranslate("Détails des postulants");
    this.texte1 = await this.handleTranslate("Talent");
  },
};
</script>

<template>
  <section>
    <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="this.$route.params.offre" />
    <div class="page-body position-relative">
      <h2 class="text-left my-5 mx-5">
        {{ detailStudents.length }}{{ texte1
        }}{{ detailStudents.length > 1 ? "s" : null }}
      </h2>
  <!-- <p>{{ detailStudents }}</p> -->
      <div
        v-if="detailStudents != null"
        class="d-flex align-items-center conteneur_postulants justify-content-center"
      >
        <CardPostulants
          v-for="(item, index) in detailStudents"
          :key="index"
          :InfoPostulant="{
            id:item.id,
            user_id:item.id,
            student_id:item.student.id,
            nom:item.student.nom,
            prenoms:item.student.prenoms,
            email:item.student.email,
            ville:item.student.ville,
            quartier:item.student.quartier,
            commune:item.student.commune,
            phone:item.student.phone,
            diplome:item.student.diplome,
            photo:item.student.user.photos,
            recruit:item.recruit,
            photo_profil:item.student.photo_profil
          }"
          @handleListe="chooseStudent"
        />
      </div>
    </div>
  </section>
</template>
<style scoped>
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-body) {
  height:750px;
  overflow-y: auto;
}
.conteneur_postulants {
  gap: 1.5em;
  place-content: center;
  flex-wrap: wrap;
  padding-bottom: 2.5em;
}
</style>
