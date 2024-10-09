<script>
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export default {
  name: "Détails_entreprise_view",
  components: {
    HeaderDashboard,
  },
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

        this.entreprise = this.offres.find((item) => item.id == this.$route.params.id);
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
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="'Détails de l’offre'"
      :subTitleHeader="'Détails de l’offre'"
    />
    <div class="container px-5" v-if="entreprise != null">
      <div class="details_entreprise card p-5">
        <div class="px-5">
          <h1>{{ entreprise.nom_offre }}</h1>
          <h4>
            Lieu :<strong style="color: orange"> {{ entreprise.lieu }}</strong>
          </h4>

          <span
            v-if="entreprise.salaire != null"
            class="d-block text-light badge bg-warning h5 px-3"
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
        </div>
        <hr />
        <div class="px-5">
          <h3 class="fw-bold">Description complète de l'offre</h3>
          <div class="description_html" v-html="entreprise.description"></div>
        </div>

        <hr />
        <div class="px-5">
          <span class="d-block px-3">Date et heure début : {{ entreprise.debut }}</span>
          <span class="px-3">Date et heure fin : {{ entreprise.fin }}</span>
          <span class="d-block px-3"
            >Publiée il y a:
            {{ diffForHumans(new Date(entreprise.created_at).toISOString()) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  width: 200px !important;
  color: white !important;

  font-weight: bold !important;
}
.description_html {
  padding: 0 3em;
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
  padding: 3em 0 !important;
  align-self: flex-start;
  box-shadow: 6px 6px 6px 6px rgba(0, 0, 0, 0.151);
}
.details_entreprise span {
  color: gray;
}
.w-25 {
  width: 120px !important;
}
</style>
