<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "UserView",
  data() {
    return {
      users: null,
      spinner: false,
      modify_timetable: false,
    };
  },
  methods: {
    get_users() {
      this.spinner = true;
      axios
        .get("http://127.0.0.1:8000/api/list_users")
        .then((res) => {
          console.log(res);
          this.users = res.data.data;
          console.log("USER", this.users);
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
    this.get_users();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="ecran" v-if="modify_timetable">
      <div class="modify_form plan-modify" v-if="timetable_show_id">
        <div class="container">
          <div class="row">
            <div class="col-sm-10 modify-form">
              <div class="card">
                <div class="card-body">
                  <h1 class="badge bg-primary h3">Modifier l'emploi du temps</h1>
                  <div class="form theme-form projectcreate p-5">
                    <form>
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Choisir un jour</label>
                            <select
                              class="form-select"
                              v-model="timetable_show_id.jour"
                              required
                              disabled
                            >
                              <option value="lundi">lundi</option>
                              <option value="mardi">Mardi</option>
                              <option value="mercredi">Mecredi</option>
                              <option value="jeudi">Jeudi</option>
                              <option value="vendredi">Vendredi</option>
                              <option value="samedi">Samedi</option>
                              <option value="dimanche">Dimanche</option>
                            </select>
                          </div>
                          <span class="text-danger"
                            >nb:le jour ne peut pas être modifier</span
                          >
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="timetable_show_id.heure_start"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="timetable_show_id.heure_end"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              class="btn btn-danger me-3"
                              @click.prevent="show_modify"
                            >
                              Annuler
                            </button>
                            <button
                              @click.prevent="update_timetable"
                              class="btn btn-secondary"
                            >
                              Modifier
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
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
              <li class="breadcrumb-item">Utilisateurs</li>
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
                  <th class="bg-light">Statut</th>
                  <!-- <th class="bg-light">Télephone</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in users" :key="index">
                  <td>{{ item.nom }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <span
                      v-if="item.statut.statut == 'entreprise'"
                      class="badge bg-primary"
                      >Entreprise</span
                    >
                    <span v-if="item.statut.statut == 'etudiant'" class="badge bg-warning"
                      >Etudiant</span
                    >
                    <span v-if="item.statut.statut == 'admin'" class="badge bg-danger"
                      >Admin</span
                    >
                    <span v-if="item.statut.statut == 'particulier'" class="badge bg-info"
                      >Particulier</span
                    >
                  </td>
                  <!-- <td v-if="item.student.statut">
                    {{item.statut.}}
                    <i class="bi bi-eye"></i> 
                  </td> -->
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
