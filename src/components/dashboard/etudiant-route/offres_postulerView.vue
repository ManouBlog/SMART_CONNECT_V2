<script>
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { FilterMatchMode } from "primevue/api";
import { configUtils } from "../../../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();
const statut = {
  0: "En attente",
  1: "Séléctionné",
  2: "Rejeté",
};
const colorStatut = {
  0: "bg-info",
  1: "bg-success",
  2: "bg-danger",
};
export default {
  name: "Offres_postulerView",
  components: {
    HeaderDashboard,
    IconField,
    InputIcon,
    InputText,
  },
  data() {
    return {
      colorStatut: colorStatut,
      statut: statut,
      configUtils: configUtils,
      list_offre: [],
      offre: null,
      offres: null,
      spinner: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
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
  methods: {
    async get_all_student() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("get_offres_postule")
        .then((res) => {
          console.log(res);
          this.offres = res.data;
          const { offres } = res.data.data;
          console.log("OFFRES", offres);
          this.list_offre = offres;
          console.log("this.list_offre", this.list_offre);
          loadingSpinner.launchLoading(false);
        })
        .catch((err) => {
          console.log(err);
          loadingSpinner.launchLoading(false);
        });
    },
  },
  created() {
    this.get_all_student();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="'Mes postulations'"
      :subTitleHeader="'offres postulés'"
    />

    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 py-3 px-2">
            <DataTable
              paginator
              :rows="10"
              :globalFilterFields="['formule']"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              :value="list_offre"
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
                  Affichage de 1 à 10 sur{{ list_offre.length }} entrées.
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
                header="Nom de l'offre"
              >
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="lieu"
                header="Lieu du travail"
              ></Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="salaire"
                header="Honoraire (Fcfa)"
              >
                <template #body="slotProps">
                  <span>
                    {{
                      slotProps.data.salaire != null
                        ? moneyFormat.format(slotProps.data.salaire)
                        : "Prime pas fixée."
                    }}</span
                  >
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="pivot.recruit"
                header="Sélectionné"
              >
                <template #body="slotProps">
                  <span
                    :class="colorStatut[slotProps.data.pivot.recruit]"
                    class="badge"
                    >{{ statut[slotProps.data.pivot.recruit] }}</span
                  >
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="statut"
                header="Détails"
              >
                <template #body="slotProps">
                  <div class="d-flex justify-content-center align-items-center">
                    <router-link
                      :to="{
                        name: 'details_offres_postuler',
                        params: { id: slotProps.data.id },
                      }"
                      ><i class="bi bi-eye"></i
                    ></router-link>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
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
