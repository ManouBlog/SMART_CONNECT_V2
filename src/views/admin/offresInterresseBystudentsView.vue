<script>
/* eslint-disable */
import $ from "jquery";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "Offres_postulerView",
  data() {
    return {
      offresInteressByStudents: null,
      offre: null,
      offres: null,
      spinner: false,
    };
  },
  methods: {
    get_offres_interess_by_student() {
      this.spinner = true;
      axios
        .get(
          "http://192.168.1.14:8000/api/list_offres_interess_by_students",
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.offresInteressByStudents = res.data;
          console.log("OFFRESINTERESSBYSTUDENTS", this.offresInteressByStudents);
          //   this.list_offre = this.offres.offres;
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
  },
  created() {
    this.get_offres_interess_by_student();
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
              <li class="breadcrumb-item">Postulants</li>
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
                  <th class="bg-light">Nom de l'offre</th>
                  <th class="bg-light">Lieu du travail</th>
                  <!-- <th class="bg-light">Date de fin</th> -->
                  <th class="bg-light">Postulant</th>
                  <th class="bg-light">Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in offresInteressByStudents" :key="index">
                  <td>
                    {{ item.nom_offre }}
                    <span v-if="new Date() > new Date(item.fin)" class="badge bg-danger"
                      >Expirée</span
                    >
                  </td>
                  <td>
                    {{ item.lieu }}
                  </td>
                  <td>{{ item.nom }} {{ item.prenoms }}</td>
                  <td class="d-flex justify-content-center align-items-center">
                    <router-link
                      :to="{
                        name: 'detailsPostulants',
                        params: { name: item.nom, offre: item.nom_offre },
                      }"
                      ><em class="bi bi-eye"></em
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
</template>
<style scoped>
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
