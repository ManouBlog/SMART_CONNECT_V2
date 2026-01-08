<script>
/* eslint-disable */
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "Détails_entreprise_view",
  data() {
    return {
      entreprise: null,
      offres: null,
      spinner: false,
      details_offre: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    get_details_offres_postule() {
      this.spinner = true;
      axios
        .get("http://backend.monbrobroli.com/api/get_offres_postule", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("DETAILS", res);
          this.offres = res.data.offres;
          this.details_offre = this.offres.find(
            (item) => item.id == this.$route.params.id
          );
          console.log("DETAILS_OFFRES", this.details_offre);
          this.spinner = false;
        });
    },
  },
  created() {
    this.get_details_offres_postule();
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
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6" v-if="details_offre != null">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                Détails de l' Offres postulé : {{ details_offre.nom_offre }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="details_offre != null">
      <div class="details_entreprise card py-5 px-3">
        <h1>{{ details_offre.nom_offre }}</h1>
        <span class="h5">
          <b>{{ details_offre.lieu }}</b>
        </span>
        <span
          v-if="details_offre.salaire != null"
          class="d-block text-light badge bg-primary w-25 text-align-start h5"
        >
          {{ moneyFormat.format(details_offre.salaire) }} Fcfa</span
        >
        <span
          v-else
          class="d-block text-light badge bg-primary w-25 text-align-start h5"
          >Prime pas fixée</span
        >
        <hr />
        <br />
        <h3>Description complète de l'offre</h3>
        <h5 class="py-3">
          {{ details_offre.description }}
        </h5>
        <hr />
        <span
          >début du contrat :
          <b>{{
            new Date(details_offre.debut).toLocaleDateString("fr")
          }}</b></span
        >
        <span
          >Fin du contrat :
          <b>{{
            new Date(details_offre.fin).toLocaleDateString("fr")
          }}</b></span
        >
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
