<script>
import $ from "jquery";
import instance from "../../../api/api";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { Help } from "../../../utils";
export default {
  name: "Offres_postulerView",
  data() {
    return {
      offresInteressByStudents: [],
      offre: null,
      offres: null,
      spinner: false,
    };
  },
  methods: {
    get_offres_interess_by_student() {
      this.spinner = true;
      instance
        .get("list_offres_interess_by_students")
        .then((res) => {
          console.log(res.data);
          this.offresInteressByStudents = Help.groupBy(res.data);
          console.log(
            "OFFRESINTERESSBYSTUDENTS",
            this.offresInteressByStudents
          );
         
          this.spinner = false;
          setTimeout(function () {
            $("#MyTableData,#MyTableData1").DataTable({
              pagingType: "full_numbers",
              pageLength: 10,
              processing: true,
              order: [],
              language: {
                décimal: "",
                emptyTable: "Aucune donnée disponible dans le tableau",
                infoEmpty: "Showing 0 to 0 of 0 entries",
                info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
                infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
                infoPostFix: "",
                thousands: ",",
                lengthMenu: "Afficher les entrées du _MENU_",
                loadingRecords: "Loading...",
                processing: "Processing...",
                search: "Chercher :",
                stateSave: true,
                zeroRecords: "Aucun enregistrement correspondant trouvé",
                paginate: {
                  first: "Premier",
                  last: "Dernier",
                  next: "Suivant",
                  previous: "Précédent",
                },
                aria: {
                  sortAscending: ": activate to sort column ascending",
                  sortDescending: ": activate to sort column descending",
                },
              },
            });
          }, 10);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.get_offres_interess_by_student();
  },
};
</script>
<template>
  <section v-show="this.$store.state.translate === 'FR'">
    <div class="page-body position-relative mt-5">
    
      <div class="container-fluid">
        <div class="page-title">
          <ol class="breadcrumb w-25">
            <li class="breadcrumb-item">Postulants</li>
          </ol>
        </div>
      </div>
      
      <div class="tab-content" id="top-tabContent">
        <div class="container-fluid">
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
        </div>
      </div>
    </div>
  </section>
  <section v-show="this.$store.state.translate === 'EN'">
    <div class="page-body position-relative mt-5">
    
      <div class="container-fluid">
        <div class="page-title">
          <ol class="breadcrumb w-25">
            <li class="breadcrumb-item">Applicants</li>
          </ol>
        </div>
      </div>
      
      <div class="tab-content" id="top-tabContent">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData1" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Offer name</th>
                    <th class="bg-light">Work place</th>
                    <th class="bg-light">Number of Applicants</th>
                    <th class="bg-light">Detail</th>
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
        </div>
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
