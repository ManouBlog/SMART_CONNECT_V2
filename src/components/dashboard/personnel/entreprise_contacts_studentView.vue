<script>
import DatatablePrimeVue from "../../../Shared/Compoments/DatatablePrimeVue.vue";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue"
import { FilterMatchMode } from "primevue/api";
import { mapActions, mapState } from "pinia";

import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "entreprise_contacts_studentView",
  components: {
    DatatablePrimeVue,
    HeaderDashboard
  },
  data() {
    return {
      spinner: false,
      isActive: false,
      tab: false,
      fieldsForFilter: ["nom", "prenoms"],
      allColumnsDataContacter: [
        { fieldName: "nom", headerName: "Nom" },
        { fieldName: "prenoms", headerName: "prénoms" },
        { fieldName: "email", headerName: "Email" },
        { fieldName: "phone", headerName: "Télephone" },
        { fieldName: "statut", headerName: "Statut" },
        { fieldName: "offre", headerName: "Offre" },
      ],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        prenoms: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        nom: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      allColumnsDataStudentRecruit: [
        { fieldName: "nom_offre", headerName: "Offre" },
        { fieldName: "nom", headerName: "Etudiant" },
      ],
    };
  },
  computed: {
    ...mapState(useEntreprisesStore, ["student", "studentRecruit", "list_students"]),
  },
  methods: {
    ...mapActions(useEntreprisesStore, ["get_students_contact"]),
    getOtherTab() {
      this.tab = !this.tab;
      this.isActive = !this.isActive;
    },
  },
  created() {
    this.get_students_contact();
  },
};
</script>
<template>
  <section>
    <HeaderDashboard  :TitleHeader="'Liste du personnels'"
     :subTitleHeader="'Liste du personnels'"/>
    <div class="page-body position-relative">
      <div class="container-fluid">
        <div class="page-title d-flex">
          <ol
            :class="!isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">Personnels contactés</li>
          </ol>
          <ol
            :class="isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">Personnels sélectionnés</li>
          </ol>
        </div>
      </div>
      <div class="tab-content" id="top-tabContent" v-show="!tab">
        <DatatablePrimeVue
          :DATAVALUE="student"
          :DATACOLUMN="allColumnsDataContacter"
          :globalFilterFields="fieldsForFilter"
          :DATAfORfILTER="filters"
        />
      </div>
      <div class="tab-content" id="top-tabContent" v-show="tab">
        <DatatablePrimeVue
          :DATAVALUE="studentRecruit"
          :DATACOLUMN="allColumnsDataStudentRecruit"
          :globalFilterFields="fieldsForFilter"
          :DATAfORfILTER="filters"
        />
      </div>
    </div>
  </section>
</template>
<style scoped>
.mt-5 {
  margin-top: 101px !important;
}
.bi-dash-circle {
  color: crimson;
}
th {
  border: thin solid rgba(141, 140, 140, 0.692);
}
.bg-teal {
  background: rgb(1, 172, 47);
}
.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
</style>
