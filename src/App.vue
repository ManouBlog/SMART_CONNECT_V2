<template>
  <div>
    <!-- Si la date de lancement est passée, on montre le router-view -->
    <router-view v-if="!isDatePassed" />

    <!-- Sinon, on affiche le countdown -->
    <CountDownView v-else :targetDate="lancementDate" />
  </div>
  <PromotionModal
    v-if="students && 1000 > students"
    v-model:visible="showPromo"
    :ctaAction="handleCta"
  />
</template>

<script>
import axios from "axios";
import CountDownView from "./views/CountDownView.vue";
import PromotionModal from "./components/PromotionModal.vue";
import instance from "./api/api";

export default {
  name: "AppView",
  components: { CountDownView, PromotionModal },
  data() {
    return {
      isDatePassed: false,
      lancementDate: "",
      showPromo: true,
      students: null,
    };
  },
  methods: {
    async NbreEtudiantsInscrit() {
      try {
        const response = await instance.get("seePerformance");
        console.log("NbreEtudiantsInscrit", response);
        if (response.data.status) {
          this.students = response.data.talentPerf;
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkDate(value) {
      if (!value) return;

      // Conversion en Date et suppression de l'heure pour comparer uniquement la date
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const backendDate = new Date(value);
      backendDate.setHours(0, 0, 0, 0);

      this.isDatePassed = today >= backendDate;
      if (this.isDatePassed) {
        this.getIpApparel();
      }
    },
    handleCta() {
      // Action du CTA
      this.showPromo = false; // ferme le modal
      this.$router.push("/abonnements"); // ou autre action
    },

    /**
     * Récupère l'adresse IP publique et enregistre la visite si besoin
     */
    async getIpApparel() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        this.visiteur(data.ip);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse IP:", error);
      }
    },

    async visiteur(ipMachin) {
      if (!sessionStorage.getItem("@visit")) {
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_LIENS_BACKEND}api/visites`,
            { ip: ipMachin }
          );
          if (response.data.status) sessionStorage.setItem("@visit", 1);
        } catch (error) {
          console.error(error);
        }
      }
    },

    /**
     * Récupère la date de lancement depuis le backend
     */
    async isLancement() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_LIENS_BACKEND}api/date-lancement`
        );

        if (response.status === 200 && response.data?.data?.date) {
          this.lancementDate = response.data.data.date;
          console.log("this.lancementDate", this.lancementDate);
          this.checkDate(this.lancementDate);
        }
      } catch (error) {
        console.error("Erreur récupération date de lancement:", error);
      }
    },
  },

  created() {
    this.isLancement();
    localStorage.setItem("translate", "fr");
    this.NbreEtudiantsInscrit();
  },
};
</script>
<style>
.n-pagination
  .n-pagination-item:not(.n-pagination-item--disabled).n-pagination-item--active {
  color: orange !important;
  border: 1px solid orange !important;
}

.swal2-container {
  z-index: 999999 !important;
}
.ant-upload-list-item-error,
.ant-upload-list-item-error .ant-upload-list-item-name {
  color: green !important;
  border-color: green !important;
}
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon,
.n-tabs.n-tabs--line-type .n-tabs-tab.n-tabs-tab--active {
  color: orange !important;
}
.n-tabs .n-tabs-bar,
.multiselect__tag {
  background-color: orange !important;
}
html {
  font-size: 0.89em;
}
.myconteneur {
  margin-top: 7.8em;
}
.router-link-exact-active {
  color: orange !important;
}
.multiselect__option--highlight,
.p-button-icon-only {
  background: orange !important;
}

.p-datatable-header {
  display: flex;
  justify-content: flex-end;
}
.not_data {
  text-align: center;
}
.ant-input {
  padding: 0.7em !important;
}
@media (max-width: 1200px) {
  .myconteneur {
    margin-top: 0.5em !important; /* nouvelle valeur adaptée au mobile */
  }
}
</style>
