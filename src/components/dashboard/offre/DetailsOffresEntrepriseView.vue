<script>
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import dayjs from "dayjs";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
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
      texte0: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      texte27: "",
      entreprise: null,
      offres: null,
      spinner: false,
      detail_offre: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
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
      this.launchLoading(true);
      instance
        .get("get_offres_entreprise")
        .then((res) => {
          // console.log(res);
          this.offres = res.data.data;
          this.entreprise = this.offres.find((item) => item.id == this.$route.params.id);
          // console.log("ENTREPRISE", this.entreprise);
          this.spinner = false;
        })
        .catch((error) => {
          // console.log(error)
          console.log(error);
        })
        .finally(() => {
          this.launchLoading(false);
        });
    },
  },
  async created() {
    this.get_offres();
    this.texte0 = await this.handleTranslate("Détails de l’offre");
    this.texte1 = await this.handleTranslate("Lieu");
    this.texte2 = await this.handleTranslate("Prime pas fixée");
    this.texte3 = await this.handleTranslate("Description complète de l'offre");
    this.texte4 = await this.handleTranslate("Date et heure début ");
    this.texte5 = await this.handleTranslate("Date limite de candidature");
    this.texte6 = await this.handleTranslate("Publiée il y a");
    this.texte8 = await this.handleTranslate("Date de début de travail");
    this.texte9 = await this.handleTranslate("Date de fin de travail");
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="texte0" />
    <div class="container px-5" v-if="entreprise != null">
      <div class="details_entreprise card p-5">
        <div class="px-5">
          <h1>{{ entreprise.nom_offre }}</h1>
          <h4>
            {{ texte1 }} :<strong style="color: orange"> {{ entreprise.lieu }}</strong>
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
            {{ texte2 }}</span
          >
        </div>
        <hr />
        <div class="px-5">
          <h3 class="fw-bold" style="color: white">{{ texte3 }}</h3>
          <div class="description_html" v-html="entreprise.description"></div>
        </div>

        <hr />
        <div class="px-5">
          <!-- <span class="d-block px-3">{{texte4}}: {{ entreprise.debut }}</span> -->
          <span class="px-3">{{ texte5 }} : {{ entreprise.fin }}</span>
          <!-- <span class="d-block px-3"
            >{{texte6}}:
            {{ diffForHumans(new Date(entreprise.created_at).toISOString()) }}</span
          > -->
        </div>
        <div class="px-5">
          <span class="d-block px-3">{{ texte8 }}: {{ entreprise?.job_debut }}</span>
          <span class="px-3">{{ texte9 }} : {{ entreprise?.job_fin }}</span>
          <span class="d-block px-3"
            >{{ texte6 }}:
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
  background: #25535f;
  color: white;
  margin-bottom: 1em;
}
.w-25 {
  width: 120px !important;
}
</style>
