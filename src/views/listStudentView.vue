<script>
import instance from "../api/api";
import $ from "jquery";
export default {
  name: "UserView",
  data() {
    return {
      students: null,
      see_detail_students: false,
      id_student: null,
      student: null,
      spinner: false,
    };
  },
  methods: {
    see_details(id) {
      this.see_detail_students = !this.see_detail_students;
      this.id_student = id;
      
    },
    get_details_students(id) {
      this.see_detail_students = !this.see_detail_students;
      instance.get("list_students")
        .then((res) => {
          this.students = res.data.data;
          this.student = this.students.find((item) => item.id === id);
        });
    },
    get_students() {
      this.spinner = true;
      instance.get("list_students")
        .then((res) => {
          this.students = res.data.data;
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
          console.log(err)
        });
    },
  },
  created() {
    this.get_students();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="ecran Myspinner" v-if="see_detail_students">
      <div class="card">
        <div class="card-body" v-if="student">
          <h1>Détails</h1>
          <span>{{ `${student.nom}  ${student.prenoms}` }}</span>

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
                <input
                  v-model="student.phone"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="col-sm-6 col-md-3">
              <div class="mb-3">
                <label class="form-label">ville</label>
                <input
                  v-model="student.ville"
                  class="form-control"
                  type="text"
                />
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
    </div>

    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Etudiants</li>
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
                  <th class="bg-light">email</th>
                  <th class="bg-light">Ville</th>
                  <th class="bg-light">Commune</th>
                  <th class="bg-light">Quartier</th>
                  <th class="bg-light">Diplome</th>
                  <th class="bg-light">Télephone</th>
                  <th class="bg-light">Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in students" :key="index">
                  <td>{{ item.nom }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    {{ item.ville }}
                  </td>
                  <td>
                    {{ item.commune }}
                  </td>
                  <td>
                    {{ item.quartier }}
                  </td>
                  <td>
                    {{ item.diplome }}
                  </td>
                  <td>
                    {{ item.phone }}
                  </td>
                  <td class="d-flex justify-content-center align-items-center">
                    <router-link
                      :to="{ name: 'details', params: { id: item.id } }"
                    >
                      <i class="bi bi-eye"></i
                    ></router-link>
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


@import url("../../src/dash/css/color-1.css");
@import url("../../src/dash/css/vendors/font-awesome.css");
@import url("../../src/dash/css/vendors/icofont.css");
@import url("../../src/dash/css/vendors/themify.css");
@import url("../../src/dash/css/vendors/flag-icon.css");

@import url("../../src/dash/css/vendors/feather-icon.css");

@import url("../../src/dash/css/vendors/scrollbar.css");


@import url("../../src/dash/css/vendors/animate.css");

@import url("../../src/dash/css/vendors/date-picker.css");

@import url("../../src/dash/css/vendors/photoswipe.css");




@import url("../../src/dash/css/style.css");

@import url("../../src/dash/css/color-1.css");


@import url("../../src/dash/css/responsive.css");
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
