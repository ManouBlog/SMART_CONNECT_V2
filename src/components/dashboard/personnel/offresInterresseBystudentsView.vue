<script>
import { FilterMatchMode } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapActions, mapState } from "pinia";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "Offres_postulerView",
  components: {
    DataTable,
    Column,
    IconField,
    InputIcon,
    InputText,
    HeaderDashboard,
  },
  data() {
    return {
      offre: null,
      offres: null,
      spinner: false,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nom_offre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      allColumnsPostulants: [
        { fieldName: "nom", headerName: "Nom" },
        { fieldName: "prenoms", headerName: "prénoms" },
        { fieldName: "email", headerName: "Email" },
        { fieldName: "phone", headerName: "Télephone" },
        { fieldName: "statut", headerName: "Statut" },
        { fieldName: "offre", headerName: "Offre" },
      ],
    };
  },
  computed: {
    ...mapState(useEntreprisesStore, ["offresInteressByStudents"]),
  },
  methods: {
    ...mapActions(useEntreprisesStore, ["get_offres_interess_by_student"]),
    seeData(value) {
      console.log(value);
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
      :TitleHeader="'Postulants'"
      :subTitleHeader="'Liste des postulants'"
    />
    <div class="page-body position-relative">
      <div class="tab-content" id="top-tabContent">
        <DataTable
          paginator
          :rows="10"
          :globalFilterFields="['nom_offre']"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :value="offresInteressByStudents"
          v-model:filters="filters"
        >
          <template #paginatorstart>
            <div
              style="
                display: flex;
                justify-content: flex-start;
                font-size: 1em;
                border: none;
              "
            >
              Affichage de 1 à 10 sur{{ offresInteressByStudents.length }} entrées.
            </div>
          </template>
          <template #header>
            <div class="conteneur_search">
              <IconField iconPosition="left">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  style="width: 300px; font-size: 1.5em; border: 2px solid orange"
                  v-model="filters['global'].value"
                  placeholder="Recherche:"
                />
              </IconField>
            </div>
          </template>
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="nom_offre"
            header="Offre"
          ></Column>
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="nbre.length"
            header="Nombre de Postulant"
          ></Column>
          <Column
            header="Détails"
            style="font-size: 1.8em; padding: 1em; text-align: center"
          >
            <template #body="{ data: { nom_offre } }">
              <div class="d-flex justify-content-center align-items-center">
                <router-link
                  :to="{
                    name: 'detailsPostulants',
                    params: {
                      offre: nom_offre,
                    },
                  }"
                  ><em class="bi bi-eye"></em
                ></router-link>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<style scoped>
.mt-5 {
  margin-top: 101px !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
</style>
