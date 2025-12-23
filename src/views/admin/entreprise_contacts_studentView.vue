<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  data() {
    return {
      list_students: null,
      student: null,
      spinner: false,
    };
  },
  methods: {
    get_students_contact() {
      this.spinner = true;
      axios
        .get(
          "http://192.168.1.27:8000/api/list_students_contact_by_entreprise",
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.list_students = res.data.data;
          console.log("LIST", this.list_students);
          this.student = this.list_students.students;
          console.log("STUDENTS", this.student);
          this.spinner = false;
          setTimeout(function () {
            $("#MyTableData").DataTable({
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
    this.get_students_contact();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Personnels contactés</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 card py-3 px-2">
            <table id="MyTableData" class="table">
              <thead>
                <tr>
                  <th class="bg-light">Nom</th>
                  <th class="bg-light">Prénoms</th>
                  <th class="bg-light">Email</th>
                  <th class="bg-light">Télephone</th>
                  <th class="bg-light">Rendez-vous</th>
                  <th class="bg-light">Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in student" :key="index">
                  <td>{{ item.nom }}</td>
                  <td>{{ item.prenoms }}</td>
                  <td>
                    {{ item.email }}
                  </td>
                  <td>
                    {{ item.phone }}
                  </td>
                  <td>
                    <span v-if="item.pivot.contrat === 1" class="badge bg-teal"
                      >Accepter</span
                    >
                    <span v-if="item.pivot.contrat === 0" class="badge bg-danger"
                      >Refuser</span
                    >
                    <span v-if="item.pivot.contrat === null" class="badge bg-primary"
                      >En attente de réponse</span
                    >
                  </td>
                  <td class="d-flex justify-content-center align-items-center">
                    <router-link
                      v-if="item.pivot.contrat === 1"
                      :to="{
                        name: 'details_students_contactes',
                        params: {
                          name: item.nom,
                          date: item.pivot.created_at,
                        },
                      }"
                      ><em class="bi bi-eye"></em
                    ></router-link>
                    <em
                      class="bi bi-dash-circle"
                      v-if="item.pivot.contrat === 0 || item.pivot.contrat === null"
                    ></em>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bi-dash-circle {
  color: crimson;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.bg-teal {
  background: rgb(47, 155, 182);
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
</style>
