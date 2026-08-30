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
    getAbonnementStatus(item) {
      const isSubscribed = item?.student?.user?.abonement?.some(
        abonnement => abonnement.statut === "success"
      );

      return isSubscribed ? "Abonné" : "Non abonné";
    },
    see_details(id) {
      this.see_detail_students = !this.see_detail_students;
      this.id_student = id;
      console.log("ID_STUDENT", this.id_student);
    },
    async get_contrats() {
      await this.$store.dispatch('get_contrats');
      console.log("ENTRPRISES_CONTRAT", this.$store.state.listeContrat);
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
        <div class="row" v-if="this.$store.state.listeContrat != null">
          <div class="col-sm-12 card py-3 px-2">
            <table id="MyTableData" class="table">
              <thead>
                <tr>
                  <th class="bg-light">Date d'enregistrement</th>
                  <th class="bg-light">Entreprise</th>
                  <th class="bg-light">Talent</th>

                  <th class="bg-light">Offre</th>
                  <th class="bg-light">Statut du contrat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in this.$store.state.listeContrat" :key="index">
                  <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}
                    <span class="badge bg-danger" v-if="item.view == 1">New</span>
                  </td>
                  <td>{{ item.offre?.user?.nom }}</td>
                  <td>
                    <p>{{ item.student.nom }} {{ item.student.prenoms }}</p>
                    <span :style="{
                      background: getAbonnementStatus(item) === 'Abonné' ? 'green' : 'red',
                      color: 'white',
                      padding: '0.2em',
                      borderRadius: '5px'
                    }">
                      {{ getAbonnementStatus(item) }}
                    </span>
                  </td>
                  <td>
                    {{ item.offre.nom_offre }}
                  </td>
                  <td>
                    <span class="font-bold" style="font-size: 1em !important;" :class="'text-' +
                      `${item.recruit === 1
                        ? 'success'
                        : item.recruit === 2
                          ? 'danger'
                          : 'dark'
                      }`
                      ">
                      {{
                        item.recruit === 1
                          ? "Retenu"
                          : item.recruit === 2
                            ? "Non retenu"
                            : "En attente de réponse"
                      }}
                    </span>
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
