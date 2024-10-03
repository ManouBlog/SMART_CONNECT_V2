<script>
import $ from "jquery";
import instance from "../api/api";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "Myabonnements",
  data() {
    return {
      list_abonnement: [],
      offre: null,
      offres: null,
      spinner: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    get_all_student() {
      this.spinner = true;
      instance
        .get("abonnement_user")
        .then((res) => {
          console.log("abonnement_user", res);
          this.list_abonnement = res.data.data;
          console.log("this.list_abonnement", this.list_abonnement);
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
    this.get_all_student();
  },
};
</script>
<template>
  <div class="page-body position-relative mt-5">
    <div class="container-fluid">
      <div class="page-title">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Mes abonnements</li>
        </ol>
      </div>
    </div>

    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 card py-3 px-2">
            <table id="MyTableData" class="table">
              <thead>
                <tr>
                  <th class="bg-light">Date</th>

                  <th class="bg-light">Formule</th>

                  <th class="bg-light">Prix (Fcfa)</th>
                  <th class="bg-light">Echéance</th>
                  <th class="bg-light">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list_abonnement" :key="index">
                  <td>{{ item.created_at }}</td>
                  <td>
                    {{ item.abonement.libelle }}
                  </td>

                  <td>
                    {{ item.abonement.prix }}
                  </td>
                  <td>{{ item.echeance }} {{ item.heure_echeance }}</td>
                  <td
                    class="fw-bold badge"
                    :class="
                      item.statut === 'ACTIVE' ? 'bg-success' : 'bg-danger'
                    "
                  >
                    {{ item.statut }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="spinner">
              <h1>loading...</h1>
            </div>
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
.mt-5 {
  margin-top: 101px !important;
}
</style>
