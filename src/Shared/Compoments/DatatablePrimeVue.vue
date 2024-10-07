<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { configUtils } from "../Utils";
import { Help } from "../../utils";
import StatutForDatatable from "./features/StatutForDatatable.vue";

export default {
  name: "DatatablePrimeVue",
  props: {
    DATAVALUE: { type: Array },
    DATACOLUMN: { type: Array, required: true },
    globalFilterFields: { type: Array, required: true },
    DATAfORfILTER: { type: Object },
  },
  components: {
    DataTable,
    Column,
    InputText,
    IconField,
    InputIcon,
    StatutForDatatable,
  },
  data() {
    return { configUtils: configUtils, Help: Help };
  },
  methods: {
    toggleLock(data) {
      console.log("data", data);
    },
  },
  computed: {
    filters() {
      return this.DATAfORfILTER;
    },
  },
};
</script>
<template>
  <DataTable
    dataKey="id"
    :globalFilterFields="globalFilterFields"
    :value="DATAVALUE"
    paginator
    :rows="10"
    v-model:filters="filters"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <template #paginatorstart>
      <div
        style="display: flex; justify-content: flex-start; font-size: 1em; 
        border: none"
      >
        Affichage de 1 à 10 sur{{ DATAVALUE.length }} entrées.
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
          {{ slotProps.data.nom }}  {{ slotProps.data.prenoms }}
        </span>
        <span v-else>
          {{ slotProps.data[item.fieldName] }}
        </span>
      </template>
    </Column>
    <Column header="Détails" style="font-size: 1.8em; padding: 1em; text-align: center">
      <template #body="{ data: { id, fin } }">
        <div class="d-flex justify-content-center align-items-center">
          <span v-if="configUtils.verifDateWithDateToDay(fin)" class="mx-2 text-dark">
            <router-link
              :to="{
                name: 'detail_offre',
                params: {
                  id: id,
                },
              }"
              ><em class="bi bi-pencil"></em>
            </router-link>
          </span>
          <span class="mx-2 text-dark">
            <router-link
              :to="{
                name: 'detailsOffreEntreprise',
                params: {
                  id: id,
                },
              }"
              ><em class="bi bi-eye"></em>
            </router-link>
          </span>
          <span
            class="bi bi-trash mx-2 text-dark"
            @click="show_box_confirmation_delete(id)"
          ></span>
        </div>
      </template>
    </Column>
  </DataTable>
</template>
