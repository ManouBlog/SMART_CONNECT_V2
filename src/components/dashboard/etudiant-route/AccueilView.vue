<script>
// import instance, { lienPhoto } from "../../../api/api";
// import Swal from "sweetalert2";
import { mapState, mapActions } from "pinia";
import { configUtils } from "../../../Shared/Utils";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import TableauDeBord from "../../../Shared/Compoments/TableauDeBord.vue";
// import Editor from "../components/text-editor.vue";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
import { useInfoStudentStore } from "../../../store-pinia/InfoStudent/useInfoStudentStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
export default {
  name: "AccueilView",
  components: {
    HeaderDashboard,
    TableauDeBord,
  },
  data() {
    return { configUtils: configUtils,date_filter:dayjs('2024', 'YYYY') };
  },
  methods: {
    ...mapActions(useOffreStore, ["getAllOffresCreatedByEntreprise","filterOffreWithYear"]),
    ...mapActions(useEntreprisesStore, [
      "get_students_contact",
      "get_offres_interess_by_student",
    ]),
    ...mapActions(useInfoStudentStore, ["get_all_student","filterDataWithYear"]),
    handleData(year){
      console.log(year)
      if(this.$store.state.user && this.$store.state.user.user.statut.statut === 'etudiant'){
        this.filterDataWithYear(year)
      }else{
        this.filterOffreWithYear(year)
      }
    }
  },
  computed: {
    ...mapState(useInfoStudentStore, ["list_offre"]),
    ...mapState(useOffreStore, ["offreCreatedByEntreprise"]),
    ...mapState(useEntreprisesStore, ["offresInteressByStudents"]),
    ...mapState(useEntreprisesStore, ["student", "studentRecruit", "list_students"]),
  },
  created() {
    this.get_all_student();
    this.get_students_contact();
    this.get_offres_interess_by_student();
    this.getAllOffresCreatedByEntreprise();
    console.log(
      "Personnels contactés",
      configUtils.statistiqueEntreprise(this.student, 2)
    );
    console.log("Personnels sélectionnés", this.offresInteressByStudents);
    console.log("list_students", this.list_students);
  },
};
</script>

<template>
  <section>
    <HeaderDashboard
      :TitleHeader="'Tableau de bord'"
      :subTitleHeader="'Tableau de bord'"
    />
    <div class="conteneur_filter">
      <a-date-picker v-model:value="date_filter" @change="handleData" picker="year"  />
    </div>
    <TableauDeBord
      v-if="
        this.$store.state.user && this.$store.state.user.user.statut.statut === 'etudiant'
      "
      :infosArray="[
        { libelle: `Nombre d'offres postulées`, nbre: list_offre.length },
        {
          libelle: `Offres en attente de réponse`,
          nbre: configUtils.statistiqueEntreprise(list_offre, 0),
        },
        {
          libelle: `Offres acceptées`,
          nbre: configUtils.statistiqueEntreprise(list_offre, 1),
        },
        {
          libelle: `Offres
    rejetées`,
          nbre: configUtils.statistiqueEntreprise(list_offre, 2),
        },
      ]"
    />
    <TableauDeBord
      v-if="
        this.$store.state.user &&
        this.$store.state.user.user.statut.statut === 'entreprise'
      "
      :infosArray="[
        {
          libelle: `Nombre d'offres publiées`,
          nbre: `${offreCreatedByEntreprise.length}`,
        },
        { libelle: `Candidatures reçues`, nbre: this.offresInteressByStudents.length },
        {
          libelle: `Candidatures rejetées`,
          nbre: configUtils.statistiqueEntreprise(this.student, 2),
        },
        {
          libelle: `Candidatures acceptées`,
          nbre:
            this.offresInteressByStudents.length -
            configUtils.statistiqueEntreprise(this.student, 2),
        },
      ]"
    />
  </section>
</template>
<style scoped>
.conteneur_filter{
  display:flex;
  justify-content: flex-end;
  padding:0 10em;
}
:where(.css-dev-only-do-not-override-17yhhjv).ant-picker {
  width:200px;
  border:1px solid black !important;
}
</style>
