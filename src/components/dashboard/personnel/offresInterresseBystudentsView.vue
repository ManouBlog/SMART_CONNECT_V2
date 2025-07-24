<script>
import { FilterMatchMode } from "primevue/api";
import LogoAnimations from "../../LogoAnimations.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapActions, mapState } from "pinia";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
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
    LogoAnimations
  },
  data() {
    return {
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
      allColumnsPostulants: [],
    };
  },
  computed: {
    ...mapState(useEntreprisesStore, ["offresInteressByStudents"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useEntreprisesStore, ["get_offres_interess_by_student"]),
    seeData(value) {
      console.log(value);
    },
  },
  async created() {
    this.get_offres_interess_by_student();
    const Nom = await this.handleTranslate('Nom');
    const prenoms = await this.handleTranslate('prénoms');
    const Email = await this.handleTranslate('Email');
    const Telephone = await this.handleTranslate('Télephone');
    const Statut = await this.handleTranslate('Statut');
    const Offre = await this.handleTranslate('Offre');
    this.allColumnsPostulants = [
        { fieldName: "nom", headerName: Nom },
        { fieldName: "prenoms", headerName: prenoms },
        { fieldName: "email", headerName: Email },
        { fieldName: "phone", headerName: Telephone },
        { fieldName: "statut", headerName: Statut },
        { fieldName: "offre", headerName: Offre },
      ]
    this.texte = await this.handleTranslate('Postulants');
    this.texte1 = await this.handleTranslate("Affichage de 1 à 10 sur");
    this.texte2 = await this.handleTranslate('entrées.');
    this.texte3 = await this.handleTranslate("Offre");
    this.texte4 = await this.handleTranslate('Nombre de Postulant');

  },
};
</script>
<template>
  <section>
    <HeaderDashboard
      :TitleHeader="texte"
      :subTitleHeader="texte"
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
              {{texte1}}{{ offresInteressByStudents.length }} {{texte2}}
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
            :header="texte3"
          ></Column>
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="nbre.length"
            :header="texte4"
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
    <LogoAnimations />
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
