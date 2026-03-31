<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "HistoriqueTransactions",
  data() {
    return {
      Historique: null,
      spinner: false,
      modify_timetable: false,
    };
  },
  methods: {
    get_Historique() {
      this.spinner = true;
      axios
        .get("https://backend-test.monbrobroli.com/api/admin/historiqueTransaction", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.Historique = res.data.data;
          console.log("TRANSACTIONS", this.Historique);
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
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    // async getPayStackHistorique() {
    //   await axios
    //     .get("https://backend-test.monbrobroli.com/api/payStack/transactions", {
    //       headers: {
    //         Authorization: "Bearer " + this.$store.state.token,
    //       },
    //     })
    //     .then((response) => {
    //       console.log("RESPONSE_GetPayStackHistorique", response);
    //       // this.get_Historique()
    //     });
    // },
  },
  created() {
    this.get_Historique();
    // this.getPayStackHistorique();
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
              <li class="breadcrumb-item">Historique de paiement</li>
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
                  <th class="bg-light">Date de paiement</th>
                  <th class="bg-light">Identifiant</th>
                  <!-- <th class="bg-light">Moyen de paiement</th> -->
                  <th class="bg-light">Montant (Fcfa)</th>
                  <th class="bg-light">Client</th>
                  <th class="bg-light">Profil du client</th>
                  <th class="bg-light">Formule</th>
                  <th class="bg-light">Date d'écheance</th>
                  <th class="bg-light">Statut du paiement</th>
                  <!-- <th class="bg-light">Détail</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in Historique" :key="index">
                  <td>
                    {{ new Date(item.created_at).toLocaleDateString("fr") }}
                  </td>
                  <td>{{ item.transaction_id }}</td>
        
                  <td>{{ item.montant }}</td>
                  <td>{{ `${item?.user?.nom}` }}</td>
                  <td>
                    {{ item.status_user }}
                  </td>
                  <td>
                    {{ item.abonement.libelle }}
                  </td>
                  <td>{{ item.echeance }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="
                        item.statut === 'EN ATTENTE'
                          ? 'bg-warning'
                          : item.statut !== 'success'
                          ? 'bg-danger'
                          : 'bg-success'
                      "
                      >{{ item.statut }}</span
                    >
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
