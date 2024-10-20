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
export default {
  name: "AccueilView",
  components: {
    HeaderDashboard,
    TableauDeBord,
  },
  data() {
    return { configUtils: configUtils };
  },
  methods: {
    ...mapActions(useOffreStore, ["getAllOffresCreatedByEntreprise"]),
    ...mapActions(useEntreprisesStore, [
      "get_students_contact",
      "get_offres_interess_by_student",
    ]),
    ...mapActions(useInfoStudentStore, ["get_all_student"]),
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
