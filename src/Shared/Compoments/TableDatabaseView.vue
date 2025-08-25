<script>
import SearchViewTable from "./SearchViewTable.vue";
import { configUtils } from "../Utils";
export default {
  name: "TableDatabaseView",
  components: {
    SearchViewTable,
  },
  props: {
    columns: {
      type: Array,
    },
    allData: {
      type: Array,
    },
  },
  data() {
    return {
      configUtils: configUtils,
      dateName: ["fin", "debut", "date_debut", "date_fin"],
    };
  },
  methods: {
    edit(value) {
      // console.log(value);
    },
  },
};
</script>
<template>
  <SearchViewTable :allData="allData" />
  <a-table :columns="columns" :data-source="allData" bordered :loading="allData.length">
    <template #bodyCell="{ column, text, record }">
      <template v-if="dateName.some((item) => item === column.dataIndex)">
        <span>{{ configUtils.getFormatDateFr(text) }}</span>
      </template>
      <template v-else-if="column.key === 'action'">
        <div class="d-flex justify-content-center align-items-center">
          <span
            v-if="configUtils.verifDateWithDateToDay(record.fin)"
            class="mx-2 text-dark"
          >
            <router-link
              :to="{
                name: 'detail_offre',
                params: {
                  id: record.id,
                },
              }"
              ><em class="bi bi-pencil"></em>
            </router-link>
          </span>
          <span
            class="bi bi-trash mx-2 text-dark"
            @click="show_box_confirmation_delete(record.id)"
          ></span>

          <span class="mx-2 text-dark">
            <router-link
              :to="{
                name: 'detailsOffreEntreprise',
                params: {
                  id: record.id,
                },
              }"
              ><em class="bi bi-eye"></em>
            </router-link>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
