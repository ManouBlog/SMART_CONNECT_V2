<script>
import instance from "../api/api";
// import Swal from "sweetalert2";
import $ from "jquery";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "DétailStudentView",
  data() {
    return {
      student: null,
      students: null,
      jours: null,
      spinner: false,
    };
  },
  methods: {
    get_details_students() {
      this.spinner = true;
      instance.get("list_students")
        .then((res) => {
          // console.log(res);
          this.students = res.data.data;

          this.student = this.students.find(
            (item) => item.id == this.$route.params.id
          );
          this.jours = this.student.jours;
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
          // console.log("ID_STUDENT", this.jours);
        });
    },
  },
  created() {
    this.get_details_students();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <i class="bi bi-arrow-left-circle" @click="$router.go(-1)"></i>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Détails Etudiants</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="student != null">
      <div class="card-body">
        <span v-if="student != null" class="badge bg-primary h3">{{
          `${student.nom}  ${student.prenoms}`
        }}</span>

        <div class="row">
          <div class="col-md-3">
            <div class="mb-3">
              <label class="form-label">Nom</label>
              <input v-model="student.nom" class="form-control" type="text" />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label">Prénoms</label>
              <input
                v-model="student.prenoms"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="student.email"
                class="form-control"
                type="email"
                disabled
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label">Télephone</label>
              <input v-model="student.phone" class="form-control" type="text" />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label">ville</label>
              <input v-model="student.ville" class="form-control" type="text" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="mb-3">
              <label class="form-label">Commune</label>
              <input
                v-model="student.commune"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label">Quartier</label>
              <input
                v-model="student.quartier"
                class="form-control"
                type="text"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="mb-3">
              <label class="form-label">Diplome</label>
              <input
                v-model="student.diplome"
                class="form-control"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="student != null">
      <h1 class="text-decoration-underline py-3">emploi du temps</h1>
      <div class="row">
        <div class="col-sm-12 card py-3 px-2">
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">Jours</th>
                <th class="bg-light">heure de depart</th>
                <th class="bg-light">Heure de fin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in jours" :key="index">
                <td>{{ item.jour }}</td>
                <td>{{ item.heure_start }}</td>
                <td>{{ item.heure_end }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.bi-arrow-left-circle {
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
