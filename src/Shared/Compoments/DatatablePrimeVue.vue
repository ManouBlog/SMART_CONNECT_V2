<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { configUtils } from "../Utils";
import { Help } from "../../utils";
import StatutForDatatable from "./features/StatutForDatatable.vue";
import SelectionnesDetailDatatable from "./features/Personnels/SelectionnesDetailDatatable.vue";
import ContactesDetailDatatable from "./features/Personnels/ContactesDetailDatatable.vue";
import DetailsListeOffresDatatables from "./features/Offres/DetailsListeOffresDatatables.vue";
import { mapActions } from "pinia";

import { useTranslateStore } from "../../store-pinia/Translate/useTranslateStore";
export default {
  name: "DatatablePrimeVue",
  props: {
    DATAVALUE: { type: Array },
    DATACOLUMN: { type: Array, required: true },
    globalFilterFields: { type: Array, required: true },
    DATAfORfILTER: { type: Object },
    nameDatatable: { type: String },
  },
  components: {
    DataTable,
    Column,
    InputText,
    IconField,
    InputIcon,
    StatutForDatatable,
    DetailsListeOffresDatatables,
    ContactesDetailDatatable,
    SelectionnesDetailDatatable,
  },
  data() {
    return { configUtils: configUtils, Help: Help,texte: "",
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
      texte27:"", };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    // toggleLock(data) {
    //   // console.log("data", data);
    // },
  },
  computed: {
    filters() {
      return this.DATAfORfILTER;
    },
  },
  async created() {
    this.texte = await this.handleTranslate('Affichage de 1 à 10 sur');
    this.texte1 = await this.handleTranslate(`entrées.`);
    this.texte2 = await this.handleTranslate(`Détails`);
  },
};
</script>
<template>
  <DataTable
    dataKey="id"
    :globalFilterFields="globalFilterFields"
    :value="DATAVALUE"
    :rows="10"
    lazy
    v-model:filters="filters"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
   <template #empty>
      <div class="empty-content">
        <template v-if="hasError">
          <i class="pi pi-exclamation-triangle text-warning"></i>
          <p>Erreur de chargement des données</p>
        </template>
        <template v-else-if="isLoading">
          <i class="pi pi-spin pi-spinner"></i>
          <p>Chargement en cours...</p>
        </template>
        <template v-else>
          <i class="pi pi-inbox"></i>
          <p class="text-center">Aucune donnée disponible</p>
        </template>
      </div>
    </template>
    <template #paginatorstart>
      <div
        style="display: flex; justify-content: flex-start; font-size: 1em; border: none"
      >
        {{texte}}{{ DATAVALUE.length }} {{texte1}}
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
      v-for="(item, index) in DATACOLUMN"
      :key="index"
      :field="item.fieldName"
      :header="item.headerName"
      style="font-size: 1.8em; padding: 1em; text-align: center"
    >
      <template #body="slotProps">
        <span v-if="item.fieldName === 'fin'">
          {{ configUtils.getFormatDateFr(slotProps.data.fin) }}
        </span>
        <span v-else-if="item.fieldName === 'salaire'">
          {{ Help.convertInMoney(slotProps.data.salaire) }}/{{ slotProps.data.pointage }}
        </span>
        <span v-else-if="item.fieldName === 'statut'">
          <StatutForDatatable :dataStatut="slotProps.data" />
        </span>
        <span v-else-if="item.fieldName === 'offre'">
          {{ slotProps.data.pivot.offre.nom_offre }}
        </span>
        <span v-else-if="item.headerName === 'Etudiant'">
          {{ slotProps.data.nom }} {{ slotProps.data.prenoms }}
        </span>
        <span v-else>
          {{ slotProps.data[item.fieldName] }}
        </span>
      </template>
    </Column>
    <Column :header="texte2" style="font-size: 1.8em; padding: 1em; text-align: center">
      <template #body="{ data }">
        <DetailsListeOffresDatatables
          :donnees="data"
          v-if="nameDatatable === 'liste des offres'"
        />
        <ContactesDetailDatatable
          :donnees="data"
          v-if="nameDatatable === 'Talents contactés'"
        />
        <SelectionnesDetailDatatable
          :donnees="data"
          v-if="nameDatatable === 'Talents sélectionnés'"
        />
      </template>
    </Column>
  </DataTable>
</template>
