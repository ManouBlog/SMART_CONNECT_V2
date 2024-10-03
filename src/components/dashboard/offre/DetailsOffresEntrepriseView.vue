<script>
import instance from "../../../api/api";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

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
    diffForHumans(timestamp) {
      dayjs.updateLocale("en", {
        relativeTime: {
          future: "dans %s",
          past: "%s",
          s: "quelques secondes",
          m: "1 minute",
          mm: "%d minutes",
          h: "1 heure",
          hh: "%d heures",
          d: "1 jour",
          dd: "%d jours",
          M: "1 mois",
          MM: "%d mois",
          y: "1 an",
          yy: "%d ans",
        },
      });
      return dayjs(timestamp).fromNow();
    },
    get_offres() {
      this.spinner = true;
      instance.get("get_offres_entreprise").then((res) => {
        console.log(res);
        this.offres = res.data.data;

        this.entreprise = this.offres.find(
          (item) => item.id == this.$route.params.id
        );
        console.log("ENTREPRISE", this.entreprise);
        this.spinner = false;
      });
    },
  },
  created() {
    this.get_offres();
  },
};
</script>

<template>
  <div class="page-body position-relative container-fluid mt-5">
  
    <div class="container-fluid">
      <div class="page-title">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Détails offre</li>
        </ol>
      </div>
    </div>
    <div class="container-fluid container-detail" v-if="entreprise != null">
      <div class="details_entreprise card py-5 px-3">
        <h1>{{ entreprise.nom_offre }}</h1>
        <h4>
          <strong>Lieu : {{ entreprise.lieu }}</strong>
        </h4>

        <span
          v-if="entreprise.salaire != null"
          class="d-block text-light badge bg-primary h5"
        >
          {{ moneyFormat.format(entreprise.salaire) }} Fcfa
          <b v-if="entreprise.pointage"> / {{ entreprise.pointage }}</b></span
        >
        <span
          v-else
          class="d-block text-light badge bg-primary w-25 text-align-start h5"
        >
          Prime pas fixée</span
        >
        <hr />
       
        <h3>Description complète de l'offre</h3>
        <div class="p-5"  v-html="entreprise.description"></div>
        <hr />
        <span class="d-block"
          >Date et heure début  :
          {{ entreprise.debut }}</span
        >
        <span
          >Date et heure fin  :
          {{ entreprise.fin }}</span
        >
        <span class="d-block"
          >Publiée il y a:
          {{
            diffForHumans(new Date(entreprise.created_at).toISOString())
          }}</span
        >
      </div>
    </div>
     <div  v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<style scoped>
.badge{
  width: 200px !important;
  color:white !important;

  font-weight: bold !important;
}

.mt-5 {
  margin-top: 101px !important;
}
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
  padding:1em 3em !important;
  align-self: flex-start;
}
.details_entreprise span {
  color: gray;
}
.w-25 {
  width: 120px !important;
}
</style>
