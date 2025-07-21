<script>
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
      detail_offre: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    get_details_entreprise() {
      console.log("this.$store.state.token", this.$store.state.token);
      this.spinner = true;
      axios
        .get("http://127.0.0.1:8000/api/list_offres", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.offres = res.data.data;

          this.entreprise = this.offres.find(
            (item) => item.nom_offre == this.$route.params.name
          );
          console.log("ENTREPRISE", this.entreprise);
          this.detail_offre = this.entreprise.entreprise;
          this.spinner = false;
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
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Détails offre</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="entreprise != null">
      <div class="details_entreprise card py-5 px-3">
        <h1>{{ entreprise.nom_offre }}</h1>
        <span class="h5">
          <strong>{{ entreprise.lieu }}</strong>
        </span>
        <span
          v-if="entreprise.salaire != null"
          class="d-block text-light badge bg-primary w-25 text-align-start h5"
        >
          {{ moneyFormat.format(entreprise.salaire) }} Fcfa</span
        >
        <span
          class="d-block text-light badge bg-primary w-25 text-align-start h5"
          v-else
        >
          pas de prime
        </span>
        <hr />
        <br />
        <h3>Description complète de l'offre</h3>
        <div class="py-3" v-html="entreprise.description"></div>
        <hr />
        <span
          >Publié par : <strong>{{ entreprise.entreprise.nom }}</strong></span
        >
        <span class="d-block"
          >Publié depuis le :
          {{ new Date(entreprise.created_at).toLocaleDateString("fr") }}</span
        >
        <span
          >Deadline :
          {{ new Date(entreprise.fin).toLocaleDateString("fr") }}</span
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
  width: 100px !important;
}
</style>
