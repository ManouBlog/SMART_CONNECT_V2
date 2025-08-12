<script>
import HeaderDashboard from "../Shared/Compoments/HeaderDashboard.vue";
import { FilterMatchMode } from "primevue/api";
import { configUtils } from "../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
import { useInfoStudentStore } from "../store-pinia/InfoStudent/useInfoStudentStore";
// const loadingSpinner = useLoadingSpinner();
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
      texte11:"",
      texte12:"",
      texte13:"",
      texte14:"",
      texte15:"",
      texte16:"",
      texte17:"",
      texte18:"",
      colorStatut: colorStatut,
      statut: statut,
      configUtils: configUtils,
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
  computed: { ...mapState(useInfoStudentStore, ["list_entreprise_interesse"]) },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useInfoStudentStore, ["get_entreprise_interesse"]),
  },
  async created() {
    await this.get_entreprise_interesse();
    this.texte0 = await this.handleTranslate(`Entreprises intéressés`);
    this.texte1 = await this.handleTranslate(`Nom de l'offre`);
     this.texte2 = await this.handleTranslate("Lieu du travail");
     this.texte3 = await this.handleTranslate(`Honoraire (Fcfa)`);
     this.texte4 = await this.handleTranslate("Prime pas fixée.");
     this.texte5 = await this.handleTranslate('Sélectionné');
     this.texte6 = await this.handleTranslate('Détails');
     this.texte7 =  await this.handleTranslate('Veuillez faire un abonnement avant de postuler à cette offre');
     this.texte8 =  await this.handleTranslate('Souscrire à un abonnement');
     this.texte9 = await this.handleTranslate(` Vous avez atteint la fin`);
     this.texte10 = await this.handleTranslate("ex: Angre");
     this.texte11 = await this.handleTranslate('Offres');
     this.texte12 = await this.handleTranslate('Nous avons trouvé');
     this.texte13 = await this.handleTranslate('Nouveauté');
     this.texte14 = await this.handleTranslate('Voir les Détails');
     this.texte15 =  await this.handleTranslate('Offre Expirée');
     this.texte16 =  await this.handleTranslate('Charger plus');
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="texte0"
      :subTitleHeader="texte0"
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
              :value="list_entreprise_interesse"
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
                  Affichage de 1 à 10 sur{{ list_entreprise_interesse.length }} entrées.
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
                :header="texte1"
              >
              <template #body="slotProps">
                  <span>
                    {{
                      slotProps.data.offre.nom_offre
                    }}</span
                  >
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="lieu"
                :header="texte2"
              >
            <template #body="slotProps">
                  <span>
                    {{
                      slotProps.data.offre.lieu
                    }}</span
                  >
                </template>
            </Column>
            <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="lieu"
                :header="'Entreprise'"
              >
            <template #body="slotProps">
                  <span>
                    {{
                      slotProps.data.offre.entreprise.nom
                    }}</span
                  >
                </template>
            </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="salaire"
                :header="texte3"
              >
                <template #body="slotProps">
                  <span>
                    {{
                       moneyFormat.format(slotProps.data.offre.salaire)
                        
                    }}</span
                  >
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="pivot.recruit"
                :header="texte5"
              >
                <template #body="slotProps">
                  <span
                    :class="colorStatut[slotProps.data.contrat]"
                    class="badge"
                    >{{ statut[slotProps.data.contrat] }}</span
                  >
                </template>
              </Column>
              <Column
                style="font-size: 1.8em; padding: 1em; text-align: center"
                field="statut"
                :header="texte6"
              >
                <template #body="slotProps">
                  <div class="d-flex justify-content-center g-5 align-items-center">
                    <router-link
                      :to="{
                        name: 'details_offres_postuler',
                        params: { id: slotProps.data.offre.id },
                      }"
                      ><i class="bi bi-eye"></i
                    ></router-link>

                  </div>
                </template>
              </Column>
            </DataTable>
            <div v-if="!list_entreprise_interesse.length">
              <h1>Pas de donnée.</h1>
            </div>
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
