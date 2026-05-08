<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "AllAvis",
  data() {
    return {
      temoignages: null,
      spinner: false,
      modify_timetable: false,
      showModal: false,
      selectedTemoignage: null
    };
  },
  methods: {
    get_temoignages() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/allTemoignages")
        .then((res) => {
          console.log(res);
          this.temoignages = res.data;
          console.log("USER", this.temoignages);
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
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    openModal(item) {
      this.selectedTemoignage = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedTemoignage = null;
    }
  },
  created() {
    this.get_temoignages();
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
              <li class="breadcrumb-item">Témoignages</li>
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
                  <th class="bg-light">Utilisateur</th>
                  <th class="bg-light">Profil</th>
                  <th class="bg-light">Note(/5)</th>
                  <th class="bg-light">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in temoignages" :key="index">
                  <td>{{ item.user.nom }}</td>
                  <td>{{ item.user?.statut?.statut }}</td>
                  <td>{{ item.rate }}</td>
                  <td>
                    <i class="bi bi-eye" @click="openModal(item)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5 class="modal-title">Détails du témoignage</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body" v-if="selectedTemoignage">
          <div class="row mb-3">
            <div class="col-md-12" style="text-align:left;">
              <strong>Utilisateur:</strong>
              <p>{{ selectedTemoignage.user.nom }}</p>
            </div>
            <div class="col-md-12" style="text-align:left;">
              <strong>Profil:</strong>
              <p>{{ selectedTemoignage.user?.statut?.statut }}</p>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-12" style="text-align:left;">
              <strong>Note:</strong>
              <p>{{ selectedTemoignage.rate }}/5</p>
            </div>
            <div class="col-md-12" style="text-align:left;">
              <strong>Date:</strong>
              <p v-if="selectedTemoignage.created_at">
                {{ new Date(selectedTemoignage.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
          <div class="row mb-3" v-if="selectedTemoignage.comment">
            <div class="col-12" style="text-align:left;">
              <strong>Commentaire:</strong>
              <p>{{ selectedTemoignage.comment }}</p>
            </div>
          </div>
          <!-- Ajoutez d'autres champs selon la structure de vos données -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Fermer
          </button>
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

/* Styles pour le modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
}
</style>