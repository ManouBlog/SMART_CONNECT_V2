<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
export default {
  name: "DatatablePrimeVue",
  props: {
    DATAVALUE: { type: Array , required: true},
    DATACOLUMN: { type: Array, required: true },
    globalFilterFields: { type: Array, required: true },
    DATAfORfILTER:{type:Object}
  },
  components: {
    DataTable,
    Column,
    InputText,
    IconField,
    InputIcon,
  },
  data() {
    return {
    };
  },
  computed:{
    filters(){
        return this.DATAfORfILTER;
    }
  }
};
</script>
<template>
  <DataTable
    dataKey="id"
    :globalFilterFields="globalFilterFields"
    :value="DATAVALUE"
    paginator
    :rows="5"
    v-model:filters="filters"
    :rowsPerPageOptions="[5, 10, 20, 50]"
  >
    <template #header>
      <div class="conteneur_search">
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Recherche" />
        </IconField>
      </div>
    </template>
    <Column
      v-for="(item, index) in DATACOLUMN"
      :key="index"
      :field="item.fieldName"
      :header="item.headerName"
      style="font-size: 2em"
    ></Column>
  </DataTable>
</template>
<style scoped>
.conteneur_search {
  display: flex;
  justify-content: flex-end;
}

</style>
