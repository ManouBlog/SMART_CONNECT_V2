<script>
import instance from "../api/api";
// import Swal from "sweetalert2";
import $ from "jquery";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "DétailEntrepriseView",
  data() {
    return {
      entreprise: null,
      entreprises: null,
      offres: null,
      spinner: false,
    };
  },
  methods: {
    get_details_entreprise() {
      this.spinner = true;
      instance.get("list_entreprise")
        .then((res) => {

          this.entreprises = res.data.data;

          this.entreprise = this.entreprises.find(
            (item) => item.id == this.$route.params.id
          );
          this.offres = this.entreprise.offres;
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

        });
    },
  },
  created() {
    this.get_details_entreprise();
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
              <li class="breadcrumb-item">Détails Entreprise</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="entreprise != null">
      <div class="card-body body-card">
        <span class="h3">Entreprise : </span><span class="badge bg-primary h3">{{ `${entreprise.nom}` }}</span>
      </div>
    </div>
    <div class="container-fluid" v-if="entreprise != null">
      <h1 class="text-decoration-underline py-3">Offres</h1>
      <div class="row">
        <div class="col-sm-12 card py-3 px-2">
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">Nom de l'offre</th>
                <th class="bg-light">Salaire</th>
                <th class="bg-light">Date de début</th>
                <th class="bg-light">Date de fin</th>
                <th class="bg-light">Date de publication</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in offres" :key="index">
                <td>{{ item.nom_offre }}</td>
                <td>{{ item.salaire }}</td>
                <td>{{ item.debut }}</td>
                <td>{{ item.fin }}</td>
                <td>{{ item.created_at }}</td>
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

.body-card {
  background: transparent;
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
