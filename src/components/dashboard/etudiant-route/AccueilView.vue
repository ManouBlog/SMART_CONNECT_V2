<script>
// import instance, { lienPhoto } from "../../../api/api";
// import Swal from "sweetalert2";

import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import TableauDeBord from "../../../Shared/Compoments/TableauDeBord.vue";
// import Editor from "../components/text-editor.vue";
export default {
  name: "AccueilView",
  components: {
    HeaderDashboard,
    TableauDeBord,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
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
        { libelle: `Nombre d'offres postulées`, nbre: '25' },
        { libelle: `Offres en attente de réponse`, nbre: '25' },
        { libelle: `Offres acceptées`, nbre: '25' },
        {
          libelle: `Offres
    rejetées`,
          nbre: '25',
        },
      ]"
    />
    <TableauDeBord
      v-if="
        this.$store.state.user &&
        this.$store.state.user.user.statut.statut === 'entreprise'
      "
      :infosArray="[
        { libelle: `Nombre d'offres publiées`, nbre: '25' },
        { libelle: `Candidatures reçues`, nbre: '25' },
        { libelle: `Candidatures rejetées`, nbre: '25' },
        { libelle: `Candidatures acceptées`, nbre: '25' },
      ]"
    />
  </section>
</template>
