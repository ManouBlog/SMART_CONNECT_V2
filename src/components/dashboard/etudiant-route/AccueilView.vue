<script>
// import instance, { lienPhoto } from "../../../api/api";
// import Swal from "sweetalert2";

import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
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
    return {
      configUtils: configUtils,
      date_filter: dayjs("2024", "YYYY"),
      texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useOffreStore, [
      "getAllOffresCreatedByEntreprise",
      "filterOffreWithYear",
    ]),
    ...mapActions(useEntreprisesStore, [
      "get_students_contact",
      "get_offres_interess_by_student",
    ]),
    ...mapActions(useInfoStudentStore, ["get_all_student", "filterDataWithYear"]),
    handleData(year) {
      console.log(year);
      if (
        this.$store.state.user &&
        this.$store.state.user.user.statut.statut === "etudiant"
      ) {
        this.filterDataWithYear(year);
      } else {
        this.filterOffreWithYear(year);
      }
    },
  },
  computed: {
    ...mapState(useInfoStudentStore, ["list_offre"]),
    ...mapState(useOffreStore, ["offreCreatedByEntreprise"]),
    ...mapState(useEntreprisesStore, ["offresInteressByStudents"]),
    ...mapState(useEntreprisesStore, ["student", "studentRecruit", "list_students"]),
  },
  async created() {
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
    this.texte = await this.handleTranslate("Tableau de bord");
    this.texte1 = await this.handleTranslate(`Nombre d'offres postulées`);
    this.texte2 = await this.handleTranslate(`Offres en attente de réponse`);
    this.texte3 = await this.handleTranslate(`Offres acceptées`);
    this.texte4 = await this.handleTranslate(`Offres rejetées`);
    this.texte5 = await this.handleTranslate(`Nombre d'offres publiées`);
    this.texte6 = await this.handleTranslate(`Candidatures reçues`);
    this.texte7 = await this.handleTranslate(`Candidatures rejetées`);
    this.texte8 = await this.handleTranslate(`Candidatures acceptées`);
    this.texte9 = await this.handleTranslate("Vous devez faire un abonnement");
  },
};
</script>

<template>
  <section>
    <HeaderDashboard :TitleHeader="texte" :subTitleHeader="texte" />
    <div class="conteneur_filter">
      <a-date-picker v-model:value="date_filter" @change="handleData" picker="year" />
    </div>
    <TableauDeBord
      v-if="
        this.$store.state.user && this.$store.state.user.user.statut.statut === 'etudiant'
      "
      :infosArray="[
        { libelle: texte1, nbre: list_offre.length },
        {
          libelle: texte2,
          nbre: configUtils.statistiqueEntreprise(list_offre, 0),
        },
        {
          libelle: texte3,
          nbre: configUtils.statistiqueEntreprise(list_offre, 1),
        },
        {
          libelle: texte4,
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
          libelle: texte5,
          nbre: `${offreCreatedByEntreprise.length}`,
        },
        { libelle: texte6, nbre: this.offresInteressByStudents.length },
        {
          libelle: texte7,
          nbre: configUtils.statistiqueEntreprise(this.student, 2),
        },
        {
          libelle: texte8,
          nbre:
            this.offresInteressByStudents.length -
            configUtils.statistiqueEntreprise(this.student, 2),
        },
      ]"
    />
  </section>
</template>
<style scoped>
.conteneur_filter {
  display: flex;
  justify-content: flex-end;
  padding: 0 10em;
}
:where(.css-dev-only-do-not-override-17yhhjv).ant-picker {
  width: 200px;
  border: 1px solid black !important;
}
</style>
