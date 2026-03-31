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
      users: [],
      spinner: false,
      modify_timetable: false,
    };
  },
  methods: {
    seeDetailsUserPersonnel(payload) {
      this.$router.push({
        name: "details_personnel",
        params: { id: payload },
      });
    },
    async get_users() {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .get("https://backend-test.monbrobroli.com/api/listerUser", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.users = res.data.data;
          this.$nextTick(() => {
            this.initializeDataTables();
          });
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
          
        })
        .finally(() => {
                 this.$store.commit("TOOGLESPINNER", false);
               });
    },
    initializeDataTables() {
      const tables = ["#MyTableData", "#MyTableData1"];
      const config = {
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
      };

      tables.forEach((tableId) => {
        const table = $(tableId);
        if (table.length) {
          // Détruire l'instance existante
          if ($.fn.DataTable.isDataTable(tableId)) {
            $(tableId).DataTable().destroy();
            $(tableId).empty(); // Optionnel: vider le contenu
          }

          // Réinitialiser
          setTimeout(() => {
            $(tableId).DataTable(config);
          }, 50);
        }
      });
    },
  },
  async created() {
    await this.get_users();
  },
};
</script>
<template>
  <div class="page-body position-relative" v-if="users.length">
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
              <li class="breadcrumb-item">Utilisateurs</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 box-col-12">
      <div class="card timetable">
        <div class="social-tab">
          <ul class="nav nav-tabs" id="top-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#admis_personnel"
                role="tab"
                aria-controls="admis_personnel"
                aria-selected="true"
                ><i data-feather="clock"></i>Admins(personnel monbrobroli)
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#clients"
                role="tab"
                aria-controls="clients"
                aria-selected="true"
                ><i data-feather="clock"></i>Clients
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent">
      <div
        class="tab-pane fade show active"
        id="admis_personnel"
        role="tabpanel"
        aria-labelledby="admis_personnel"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData1" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Nom</th>
                    <th class="bg-light">email</th>
                    <th class="bg-light">Statut</th>

                    <th class="bg-light" v-if="this.$store.state.user.email === 'admin@gmail.com' 
                    && this.$store.state.user.statut.statut === 'admin'">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in users.filter(
                      (person) => person.statut.statut == 'admin'
                    )"
                    :key="index"
                  >
                    <td>{{ item.nom }} {{ item.prenoms }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                      <span class="badge bg-danger">Admin</span>
                    </td>
                    <td v-if="this.$store.state.user.email === 'admin@gmail.com' 
                    && this.$store.state.user.statut.statut === 'admin'">
                      <i class="bi bi-eye" @click="seeDetailsUserPersonnel(item.id)"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane" id="clients" role="tabpanel" aria-labelledby="clients">
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
                  <tr
                    v-for="(item, index) in users.filter(
                      (person) => person.statut.statut != 'admin'
                    )"
                    :key="index"
                  >
                    <td>{{ item.nom }} {{ item.prenoms }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                      <span
                        v-if="item.statut.statut == 'entreprise'"
                        class="badge bg-primary"
                        >Entreprise</span
                      >
                      <span
                        v-if="item.statut.statut == 'etudiant'"
                        class="badge bg-warning"
                        >Etudiant</span
                      >
                      <span v-if="item.statut.statut == 'admin'" class="badge bg-danger"
                        >Admin</span
                      >
                      <span
                        v-if="item.statut.statut == 'particulier'"
                        class="badge bg-info"
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
