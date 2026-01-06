<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "ContratView",
  data() {
    return {
      contrats: null,
      id_contrat: null,
      student: null,
      spinner: false,
    };
  },
  methods: {
    see_details(id) {
      this.see_detail_students = !this.see_detail_students;
      this.id_student = id;
      console.log("ID_STUDENT", this.id_student);
    },
    get_details_students(id) {
      this.see_detail_students = !this.see_detail_students;
      axios
        .get("http://127.0.0.1:8000/api/list_students", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.students = res.data.data;
          this.student = this.students.find((item) => item.id === id);
          console.log("ID_STUDENT", this.student);
        });
    },
    get_contrats() {
      this.contrats = this.$store.state.listeContrat;
          console.log("ENTRPRISES CONTRAT", this.contrats);
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
      // this.spinner = true;
      // axios
      //   .get("http://127.0.0.1:8000/api/admin/allContrats", {
      //     headers: {
      //       Authorization: "Bearer " + this.$store.state.token,
      //     },
      //   })
      //   .then((res) => {
      //     console.log("allContrats", res);
          
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
  created() {
    this.get_contrats();
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
              <li class="breadcrumb-item">Contrat</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid">
        <div class="row" v-if="contrats != null">
          <div class="col-sm-12 card py-3 px-2">
            <table id="MyTableData" class="table">
              <thead>
                <tr>
                  <th class="bg-light">Date d'enregistrement</th>
                  <th class="bg-light">Entreprise</th>
                  <th class="bg-light">Talent</th>
                  <th class="bg-light">Offre</th>
                  <th class="bg-light">Statut du contrat</th>
                  <!-- <th class="bg-light">Détails</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in contrats" :key="index">
                  <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}
                     <span class="badge bg-danger" v-if="item.view == 1">New</span>
                  </td>
                  <td>{{ item.offre.entreprise.nom }}</td>
                  <td>{{ item.student.nom }} {{ item.student.prenoms }}</td>
                  <td>
                    {{ item.offre.nom_offre }}
                  </td>
                  <td>
                    <p
                      class="font-bold"
                      :class="
                        'text-' +
                        `${
                          item.recruit === 1
                            ? 'success'
                            : item.recruit === 2
                            ? 'danger'
                            : 'dark'
                        }`
                      "
                    >
                      {{
                        item.recruit === 1
                          ? "Accepté"
                          : item.recruit === 2
                          ? "Non retenu"
                          : "En attente de réponse"
                      }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Container-fluid Ends-->
</template>
<style scoped>
.bi {
  font-size: 1.5em !important;
  cursor: pointer;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
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
</style>
