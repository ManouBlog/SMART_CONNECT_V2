<script>
/* eslint-disable */
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "DetailPostulantsView",
  data() {
    return {
      offresInteressByStudents: null,
      offre: null,
      offres: null,
      spinner: false,
      detailStudents: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    get_offres_interess_by_student() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/list_offres_interess_by_students", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.offresInteressByStudents = res.data;
          console.log(
            "OFFRESINTERESSBYSTUDENTS",
            this.offresInteressByStudents
          );
          this.offresInteressByStudents.find((item) => {
            if (
              item.nom === this.$route.params.name &&
              item.nom_offre === this.$route.params.offre
            ) {
              this.detailStudents = item;
            }
          });
          this.spinner = false;
          console.log("DETAIL", this.detailStudents);
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
    this.get_offres_interess_by_student();
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <em class="bi bi-arrow-left-circle" @click="$router.go(-1)"></em>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Postulants/Détails Etudiants</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="detailStudents != null">
      <div class="details_entreprise card py-5 px-3">
        <h1 class="badge bg-primary w-25">Personnel</h1>
        <h4>Nom :{{ detailStudents.nom }}</h4>
        <h4>Prénoms :{{ detailStudents.prenoms }}</h4>
        <h4>Email :{{ detailStudents.email }}</h4>
        <h4>Ville :{{ detailStudents.ville }}</h4>
        <h4>Quartier :{{ detailStudents.quartier }}</h4>
        <h4>commune :{{ detailStudents.commune }}</h4>
        <h4>Télephone :{{ detailStudents.phone }}</h4>
        <h4>Diplome :{{ detailStudents.diplome }}</h4>
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
              <li class="breadcrumb-item">Détails offre</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="detailStudents != null">
      <div class="details_entreprise card py-5 px-3">
        <h1>{{ detailStudents.nom_offre }}</h1>
        <span class="h5">
          <strong>{{ detailStudents.lieu }}</strong>
        </span>
        <span v-if="detailStudents.salaire != null" class="d-block text-light
         badge bg-primary text-align-start h5"
          :class="!isNaN(Number(entreprise.salaire)) ? 'w-25' : 'w-50'">
          {{ !isNaN(Number(entreprise.salaire)) ? `${moneyFormat.format(detailStudents.salaire)} Fcfa`
            : detailStudents.salaire }} </span>
        <span v-else class="d-block text-light badge bg-primary w-25 text-align-start h5">
          Prime pas fixée</span>

        <hr />
        <br />
        <h3>Description complète de l'offre</h3>
        <h5 class="py-3">
          {{ detailStudents.description }}
        </h5>
        <hr />
        <!-- <span
          >Publié par : <b>{{ detailStudents.detailStudents.nom }}</b></span
        > -->
        <span class="d-block">Publié le :
          {{
            new Date(detailStudents.created_at).toLocaleDateString("fr")
          }}</span>
        <span>Echeance :
          {{ detailStudents.fin ? new Date(detailStudents.fin).toLocaleDateString("fr") : 'Pas défini' }}</span>
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

.details_entreprise {
  text-align: left;
}

.details_entreprise span {
  color: gray;
}

.w-25 {
  width: 120px !important;
}
</style>
