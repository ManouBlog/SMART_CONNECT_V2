<script>
// import $ from "jquery";
// import instance from "../../../api/api";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import { Help } from "../../../utils";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapActions, mapState } from "pinia";
import { useEntreprisesStore } from "../../../store-pinia/Entreprise/useEntreprisesStore";
export default {
  name: "Offres_postulerView",
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      offre: null,
      offres: null,
      spinner: false,
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
    <div class="page-body position-relative mt-5">
      <div class="container-fluid">
        <div class="page-title">
          <ol class="breadcrumb w-25">
            <li class="breadcrumb-item">Postulants</li>
          </ol>
        </div>
      </div>

      <div class="tab-content" id="top-tabContent">
        <DataTable
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :value="offresInteressByStudents"
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
        <!-- <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Nom de l'offre</th>
                    <th class="bg-light">Lieu du travail</th>
                    <th class="bg-light">Nombre de Postulant</th>
                    <th class="bg-light">Détail</th>
                  </tr>
                </thead>
                <tbody >
                  <tr
                    v-for="(item, index) in offresInteressByStudents"
                    :key="index"
                  >
                    <td>
                      {{ index }}
                      <span
                        v-if="new Date() > new Date(item[0].fin)"
                        class="badge bg-danger"
                        >Expirée</span>
                    </td>
                    <td>
                      {{ item[0].lieu }}
                    </td>
                    <td>{{ item.length }}</td>
                    <td>
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <router-link
                          :to="{
                            name: 'detailsPostulants',
                            params: {
                              offre: index,
                            },
                          }"
                          ><em class="bi bi-eye"></em
                        ></router-link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="spinner">
                <h1>Loading...</h1>
              </div>
            </div>
          </div>
        </div> -->
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
