<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import BadgeCompVue from "../../components/BadgeComp.vue";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "UserView",
  components: {
    BadgeCompVue,
  },
  data() {
    return {
      students: [],
      studentsNonAbonnee: [],
      see_detail_students: false,
      id_student: null,
      student: null,
      spinner: false,
    };
  },
  methods: {
    verifIfAbonnementCurrently(value) {
      let valueAbonnementCurrently = null;
      if (!value) {
        return "Pas d'abonnement";
      }
      value?.forEach((element) => {
        if (element.statut === "success") {
          valueAbonnementCurrently = element;
        }
      });
      return valueAbonnementCurrently?.abonement?.libelle
        ? valueAbonnementCurrently?.abonement?.libelle
        : null;
    },
    see_details(id) {
      this.see_detail_students = !this.see_detail_students;
      this.id_student = id;
      console.log("ID_STUDENT", this.id_student);
    },
    get_details_students(id) {
      this.see_detail_students = !this.see_detail_students;
      axios
        .get("https://backend.monbrobroli.com/api/list_students", {
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
    get_students() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/list_students", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.students = res.data.data;
          console.log("ENTRPRISES", this.students);
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
          setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
        });
    },
    get_Visiteurs() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/list_visiteurs", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.studentsNonAbonnee = res.data.data;
          console.log("ENTRPRISES", this.students);
          this.spinner = false;
          setTimeout(function () {
            $("#MyTableData2").DataTable({
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
    async getDetailNotSuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeStudent/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_STUDENT_NOT_SUSCRIBE");
            this.$router.push({
              name: "details",
              params: { id: id, name: "visiteur" },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
          this.$store.dispatch("get_Students_Non_Abonne");
          this.$store.dispatch("get_Students_abonne");
        });
    },
    async getDetailSuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeStudent/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_STUDENT_NOT_SUSCRIBE");
            this.$router.push({
              name: "details",
              params: { id: id, name: "talents" },
            });
          }
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
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
          this.$store.dispatch("get_Students_Non_Abonne");
          this.$store.dispatch("get_Students_abonne");
        });
    },
  },
  created() {
    this.get_students();
    this.get_Visiteurs();
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
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Talents</li>
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
                href="#abonnées"
                role="tab"
                aria-controls="abonnées"
                aria-selected="true"
                ><i data-feather="clock"></i>Abonnées
                <BadgeCompVue
                  v-if="this.$store.state.listStudentAbonne > 0"
                  :nbreTotal="this.$store.state.listStudentAbonne"
                />
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#nonAbonnees"
                role="tab"
                aria-controls="nonAbonnees"
                aria-selected="true"
                ><i data-feather="clock"></i>Pas abonnées
                <BadgeCompVue
                  v-if="this.$store.state.listStudentPasAbonne > 0"
                  :nbreTotal="this.$store.state.listStudentPasAbonne"
                />
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
        id="abonnées"
        role="tabpanel"
        aria-labelledby="abonnées"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Date d'enregistrement</th>
                    <th class="bg-light">Nom</th>
                    <th class="bg-light">email</th>
                    <th class="bg-light">Ville</th>
                    <th class="bg-light">Commune</th>
                    <th class="bg-light">Quartier</th>

                    <th class="bg-light">Télephone</th>
                    <th class="bg-light">Formule d'abonnement</th>
                    <th class="bg-light">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in students" :key="index">
                    <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}</td>
                    <td>
                      {{ item.nom }}
                      <span class="badge bg-danger" v-if="item.view == 1">New</span>
                    </td>
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
                      {{ item.phone }}
                    </td>
                    <td>
                      {{
                        item?.user?.abonement.length
                          ? this.verifIfAbonnementCurrently(item?.user?.abonement)
                          : "Pas d'abonnement."
                      }}
                    </td>
                    <td>
                      <a href="#" @click.prevent="getDetailSuscribe(item.id)">
                        <i class="bi bi-eye"></i>
                      </a>
                      <!-- <router-link
                        :to="{
                          name: 'details',
                          params: { id: item.id, name: 'talents' },
                        }"
                      >
                        <i class="bi bi-eye"></i
                      ></router-link> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane"
        id="nonAbonnees"
        role="tabpanel"
        aria-labelledby="nonAbonnees"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData2" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Date d'enregistrement</th>
                    <th class="bg-light">Nom</th>
                    <th class="bg-light">email</th>
                    <th class="bg-light">Ville</th>
                    <th class="bg-light">Commune</th>
                    <th class="bg-light">Quartier</th>
                    <!-- <th class="bg-light">Diplome</th> -->
                    <th class="bg-light">Télephone</th>
                    <th class="bg-light">Formule d'abonnement</th>
                    <th class="bg-light">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in studentsNonAbonnee" :key="index">
                    <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}</td>
                    <td>
                      {{ item.nom }}
                      <span class="badge bg-danger" v-if="item.view == 1">New</span>
                    </td>
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
                      {{ item.phone }}
                    </td>
                    <td>
                      {{
                        item?.user?.abonement.length
                          ? this.verifIfAbonnementCurrently(item?.user?.abonement)
                          : "Pas d'abonnement."
                      }}
                    </td>
                    <td>
                      <a href="#" @click.prevent="getDetailNotSuscribe(item.id)">
                        <i class="bi bi-eye"></i>
                      </a>
                      <!-- <router-link
                        :to="{
                          name: 'details',
                          params: { id: item.id, name: 'visiteur' },
                        }"
                      >
                        <i class="bi bi-eye"></i
                      ></router-link> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
