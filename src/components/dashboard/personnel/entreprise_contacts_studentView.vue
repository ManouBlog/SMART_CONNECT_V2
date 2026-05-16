<script>
import DatatablePrimeVue from "../../../Shared/Compoments/DatatablePrimeVue.vue";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { FilterMatchMode } from "primevue/api";
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
export default {
  name: "entreprise_contacts_studentView",
  components: {
    DatatablePrimeVue,
    HeaderDashboard,
    DataTable,
    Column,
    InputText,
    IconField,
    InputIcon
  },
  data() {
    return {
      texte0: "",
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
      texte27:"",
      spinner: false,
      isActive: false,
      tab: false,
      fieldsForFilter: ["nom", "prenoms"],
      allColumnsDataContacter:[],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        prenoms: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        nom: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      allColumnsDataStudentRecruit: [],
    };
  },
  computed: {
    ...mapState(useEntreprisesStore, ["listTalentContacte", "studentRecruit", "list_students"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useEntreprisesStore, ["get_students_contact"]),
    getOtherTab() {
      this.tab = !this.tab;
      this.isActive = !this.isActive;
    },
  },
  async created() {
    this.get_students_contact();
    const Offre = await this.handleTranslate('Offres');
    const Etudiant =  await this.handleTranslate('Talents');
    this.allColumnsDataStudentRecruit= [
        { fieldName: "nom_offre", headerName: Offre },
        { fieldName: "count", headerName: Etudiant },
        { fieldName: "id", headerName: 'Date de travail' },
        // { fieldName: "offre.job_fin", headerName: 'Date de fin de travail' },
      ]
   
    this.texte0 = await this.handleTranslate('Liste des talents');
    this.texte1 = await this.handleTranslate(`Talents contactés`);
    this.texte2 = await this.handleTranslate("Mes talents");
    this.texte3 = await this.handleTranslate('Commune');
    this.texte4 = await this.handleTranslate('Télephone');
    this.texte5 = await this.handleTranslate('Diplome');
    this.texte6 = await this.handleTranslate('Carte étudiant');
    this.texte7 = await this.handleTranslate(' Sélectionner');
    this.texte8 = await this.handleTranslate(' Rejeter');
    this.texte9 = await this.handleTranslate("Sélectionné");
    this.texte10 = await this.handleTranslate('Pas retenu');
  },
};
</script>
<template>
  <section>
    <HeaderDashboard
      :TitleHeader="texte0"
      :subTitleHeader="texte0"
    />
    <div class="page-body position-relative">
      <div class="container-fluid">
        <div class="page-title d-flex">
          <ol
            :class="!isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">{{texte1}}</li>
          </ol>
          <ol
            :class="isActive ? 'breadcrumb' : 'breadcrumb_two'"
            class="mx-3"
            @click="getOtherTab"
          >
            <li class="breadcrumb-item">{{texte2}}</li>
          </ol>
        </div>
      </div>
      <div class="tab-content" id="top-tabContent" v-show="!tab">
        {{ listTalentContacte }}
         <DataTable
    :globalFilterFields="fieldsForFilter"
    :value="listTalentContacte"
    :rows="10"
    v-model:filters="filters"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
      <template #empty>
    <div class="text-center" style="padding:2em;font-weight:bold;">
      Aucune donnée disponible
    </div>
  </template>
    <template #paginatorstart>
      <div
        style="display: flex; justify-content: flex-start; font-size: 1em; border: none"
      >
        Talents contactés {{ listTalentContacte.length }}
      </div>
    </template>
    <template #header>
      <div class="conteneur_search">
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText
            style="width: 300px; font-size: 1.2em; border: 2px solid orange"
            v-model="filters['global'].value"
            placeholder="Recherche:"
          />
        </IconField>
      </div>
    </template>
     <Column field="talent.nom" header="Talent"></Column>
     <Column field="offre.nom_offre" header="Offre"></Column>
     <Column field="offre.lieu" header="Lieu"></Column>
      <Column field="status" header="Statut">
  <template #body="{ data }">
    <span v-if="data?.contrat === 1" class="badge bg-success">
      Sélectionné
    </span>

    <span v-else-if="data?.contrat === 2" class="badge bg-danger">
      Refusé
    </span>

    <span v-else class="badge bg-primary">
      En attente de réponse
    </span>
  </template>
</Column>
<Column field="id" header="Détail">
  <template #body="{ data }">
  
    <div class="d-flex justify-content-center align-items-center">
     <router-link
  v-if="data?.contrat === 1 && data?.offre?.nom_offre"
  :to="{
    name: 'details_students_contactes',
    params: {
      offre: data?.offre?.nom_offre,
      id:data.id,
      name: data?.talent.nom,
    },
  }"
  class="text-primary"
  title="Voir les détails"
>
  <em class="bi bi-eye"></em>
</router-link>
      
      <em
      v-else  
        class="bi bi-dash-circle"
      ></em>

    </div>

  </template>
</Column>
  </DataTable>
      </div>
      <div class="tab-content" id="top-tabContent" v-show="tab">
        <DatatablePrimeVue
          :DATAVALUE="studentRecruit"
          :DATACOLUMN="allColumnsDataStudentRecruit"
          :globalFilterFields="fieldsForFilter"
          :DATAfORfILTER="filters"
          :nameDatatable="'Mes talents'"
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
