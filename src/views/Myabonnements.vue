<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import HeaderDashboard from "../Shared/Compoments/HeaderDashboard.vue"
import { useEntreprisesStore } from "../store-pinia/Entreprise/useEntreprisesStore";

export default {
  name: "Myabonnements",
  components:{
    DataTable,
    Column,
    HeaderDashboard,
    IconField,
    InputIcon,
    InputText,
  },
  data() {
    return {
      configUtils:configUtils,
      offre: null,
      offres: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        formule: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
    };
  },
  computed: { ...mapState(useEntreprisesStore, ["list_abonnement"]) },
  methods: { ...mapActions(useEntreprisesStore, ["get_all_student"]),
  handleNouvelAbonnement(){
    this.$router.push({name:"abonnements"})
  } },
  created() {
    this.get_all_student();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard  :TitleHeader="'Mes abonnements'"
     :subTitleHeader="'Mes abonnements'"/>

    <div class="tab-content" id="top-tabContent">
      <DataTable
        paginator
        :rows="10"
        :globalFilterFields="['formule']"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :value="list_abonnement"
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
            Affichage de 1 à 10 sur{{ list_abonnement.length }} entrées.
          </div>
        </template>
        <template #header>
          <div class="conteneur_search">
            <div class="mx-3">
              <button class="btn bg-warning py-2" @click="handleNouvelAbonnement">Nouvel Abonnement</button>
            </div>
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
          field="created_at"
          header="Date d'enregistrement"
        >
      <template #body="slotProps">
        <span>
          {{ configUtils.getFormatDateFr(slotProps.data.created_at) }}
        </span>
      </template>
      </Column>
        <Column
          style="font-size: 1.8em; padding: 1em; text-align: center"
          field="abonement.libelle"
          header="Formule"
        ></Column>
        <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="montant"
        header="Prix (Fcfa)"
      ></Column>
      <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="echeance"
        header="Echéance"
      ></Column>
      <!-- <Column
      style="font-size: 1.8em; padding: 1em; text-align: center"
      field="statut"
      header="Statut"
    >
    <template #body="slotProps">
      <span class="px-2" :class="slotProps.data.statut === 'ACCEPTED' ? 'bg-success':'bg-danger'">
        {{ slotProps.data.statut }}
      </span>
    </template>
  </Column> -->
        
      </DataTable>

    </div>
  </div>
</template>
<style scoped>
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
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
.mt-5 {
  margin-top: 101px !important;
}
</style>
