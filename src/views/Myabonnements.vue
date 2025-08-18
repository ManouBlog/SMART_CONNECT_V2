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

import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
const STATUTABONNEMENT = {
  'success':'Actif',
  'expired':'Non Actif'
}
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
      texte27:"",
      configUtils:configUtils,
      STATUTABONNEMENT:STATUTABONNEMENT,
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
  methods: { ...mapActions(useEntreprisesStore, ["get_all_abonnement"]),
  ...mapActions(useTranslateStore, ["handleTranslate"]),
  handleNouvelAbonnement(){
    this.$router.push({name:"abonnements"})
  } },
 async created() {
    this.get_all_abonnement();
    this.texte0 = await this.handleTranslate('Mes abonnements');
    this.texte1 = await this.handleTranslate(`Affichage de 1 à 10 sur`);
    this.texte2 = await this.handleTranslate("Nouvel Abonnement");
    this.texte3 = await this.handleTranslate('entrées.');
    this.texte4 = await this.handleTranslate('Formule');
    this.texte5 = await this.handleTranslate('Prix (Fcfa)');
    this.texte6 = await this.handleTranslate('Echéance');
    this.texte7 = await this.handleTranslate(' Statut');
    this.texte8 = await this.handleTranslate(' Rejeter');
    this.texte9 = await this.handleTranslate("Recherche:");
    this.texte10 = await this.handleTranslate("Date de paiement");
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard  :TitleHeader="texte0"
     :subTitleHeader="texte0"/>

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
            {{texte1}}{{ list_abonnement.length }} {{texte3}}
          </div>
        </template>
        <template #header>
          <div class="conteneur_search">
            <div class="mx-3">
              <button class="btn bg-warning py-2" @click="handleNouvelAbonnement">
                {{texte2}}</button>
            </div>
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                style="width: 300px; font-size: 1.5em; border: 2px solid orange"
                v-model="filters['global'].value"
                :placeholder="texte9"
              />
            </IconField>
          </div>
        </template>
        <Column
          style="font-size: 1.8em; padding: 1em; text-align: center"
          field="created_at"
          :header="texte10"
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
          :header="texte4"
        ></Column>
        <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="montant"
        :header="texte5"
      ></Column>
      <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="echeance"
        :header="texte6"
      ></Column>
      <Column
      style="font-size: 1.8em; padding: 1em; text-align: center"
      field="statut"
      :header="texte7"
    >
    <template #body="slotProps">
      <span class="px-2" :class="slotProps.data.statut === 'success' ? 'bg-success':'bg-danger'">
        {{ STATUTABONNEMENT[slotProps.data.statut] }}
      </span>
    </template>
  </Column>
        
      </DataTable>
      <div v-if="!list_abonnement.length">
        <h1>Pas de donnée</h1>
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
