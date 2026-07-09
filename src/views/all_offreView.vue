<script>
import instance from "../api/api";
import $ from "jquery";
export default {
  name: "All_offreView",
  data() {
    return {
      offres: null,
      see_detail_students: false,
      id_student: null,
      student: null,
      spinner: false,
    };
  },
  methods: {
    get_all_offres() {
      this.spinner = true;
      instance.get("list_offres")
        .then((res) => {

          this.offres = res.data.data;

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
    this.get_all_offres();
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
              <li class="breadcrumb-item">Offres</li>
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
                  <th class="bg-light">Ville</th>
                  <th class="bg-light">Salaire</th>
                  <th class="bg-light">Description</th>
                  <th class="bg-light">Date de début</th>
                  <th class="bg-light">Date de fin</th>
                  <th class="bg-light">Date de publication</th>
                  <th class="bg-light">Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in offres" :key="index">
                  <td>{{ item.nom_offre }}</td>
                  <td>{{ item.ville }}</td>
                  <td>
                    {{ item.salaire }}
                  </td>
                  <td>
                    {{ item.description }}
                  </td>
                  <td>
                    {{ item.debut }}
                  </td>
                  <td>
                    {{ item.fin }}
                  </td>
                  <td>
                    {{ item.created_at }}
                  </td>
                  <td class="d-flex justify-content-center align-items-center">
                    <i class="bi bi-eye"></i>
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
