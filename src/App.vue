<template>
  <LoadingSpinner v-if="spinnerLoading" />
  <div>
    <!-- Si la date de lancement est passée, on montre le router-view -->
    <router-view v-if="!spinnerLoading && isDatePassed" />
    <!-- <updateProfiIfNot /> -->
    <!-- Sinon, on affiche le countdown -->
    <!-- <CountDownView v-else :targetDate="lancementDate" /> -->
  </div>
  <div v-if="isDatePassed && !spinnerLoading">
    <PromotionModal
      v-if="shouldShowPromo"
      v-model:visible="showPromo"
      :ctaAction="handleCta"
      header="🎓 Offre Étudiants Exceptionnelle !"
      :buttonTitle="true"
    >
      <p style="font-size: 1.2em; margin-bottom: 1em">
        Soyez parmi les 1000 premiers abonnés (PLATINUM) et recevez 2 mois offerts
        automatiquement !
      </p>
      <p style="margin-bottom: 1em">
        Une opportunité rare pour profiter pleinement de nos services à moindre coût.
      </p>
    </PromotionModal>
    <PromotionModal
      v-if="isUserParticulierEntreprise"
      v-model:visible="showPromoParticulierAndEntreprise"
      :ctaAction="handleParticulierCta"
      :buttonTitle="false"
      header="🚀 Publiez votre première offre gratuitement"
    >
      <p style="font-size: 1.2em; margin-bottom: 1em">
        Publiez votre première offre gratuitement… et recrutez votre premier talent sans
        frais.
      </p>
      <p style="margin-bottom: 1em">Lancez-vous dès maintenant, c’est 100% offert</p>
      <button
        style="
          background-color: #ff9900;
          font-weight: bold;
          width: 100%;
          color: white;
          border-radius: 10px;

          white-space: normal;
          line-height: 1.3;
          padding: 14px 16px;
          text-align: center;
        "
        @click="gotoCreatedOffre"
      >
        OK
      </button>
    </PromotionModal>
  </div>
</template>

<script>
import axios from "axios";
// import CountDownView from "./views/CountDownView.vue";
import LoadingSpinner from "./Shared/Compoments/LoadingSpinner.vue";
import PromotionModal from "./components/PromotionModal.vue";
import instance from "./api/api";

export default {
  name: "AppView",
  components: {
    //CountDownView,
    LoadingSpinner,
    PromotionModal,
  },
  data() {
    return {
      user: this.$store.state.user,
      isDatePassed: false,
      lancementDate: "",
      showPromo: true,
      showPromoParticulierAndEntreprise: false,
      students: null,
      offreCreatedByEntreprise: [],
      spinnerLoading: true,
    };
  },
  computed: {
    isUserEtudiant() {
    const statuses = this.$store?.state?.user?.user?.statuses || [];

    return statuses?.some(s => s.statut === "etudiant");
  },
    isUserParticulierEntreprise() {
  const statuses = this.$store?.state?.user?.user?.statuses || [];

  return statuses?.some(s =>
    ['particulier', 'Entreprise'].includes(s.statut)
  );
  },
    shouldShowPromo() {
      const limit = this.students !== null && this.students < 1000;
      return limit && this.isUserEtudiant;
    },
  },
  watch: {
    isUserParticulierEntreprise: {
      handler(newValue, oldValue) {
        console.log("newValue", { newValue, oldValue });
        if (newValue) {
          this.getAllOffresCreatedByEntreprise();
        }
      },
      deep: true,
    }
  },
  methods: {
    async getAllOffresCreatedByEntreprise() {
  const hasAccess = this.$store?.state?.user?.user?.statuses?.some(
    s => ['particulier', 'Entreprise'].includes(s.statut)
  );

  if (!hasAccess) return;

  try {
    const response = await instance.get("get_offres_entreprise");

    if (response.status === 200) {
      if (!response.data.data.length) {
        this.showPromoParticulierAndEntreprise = true;
      }
    }
  } catch (error) {
    console.log(error);
  }
},
    async NbreEtudiantsInscritAndDoAbonnement() {
      try {
        const response = await instance.get("getUserDoAbonnement");
    
        if (response.data.status) {
          this.students = response.data.total;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.spinnerLoading = false;
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
    handleParticulierCta() {
      this.showPromoParticulierAndEntreprise = false; // ferme le modal
      this.$router.push("/abonnements"); // ou autre action
    },
    handleCta() {
      // Action du CTA
      this.showPromo = false; // ferme le modal
      this.$router.push("/abonnements"); // ou autre action
    },
    gotoCreatedOffre() {
      this.showPromoParticulierAndEntreprise = false; // ferme le modal
      this.$router.push("/dashboard/creation_offre");
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
      } finally {
        this.spinnerLoading = false;
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
         
          this.checkDate(this.lancementDate);
        }
      } catch (error) {
        console.error("Erreur récupération date de lancement:", error);
      } finally {
        this.spinnerLoading = false;
      }
    },
  },

  created() {
    this.isLancement();
    localStorage.setItem("translate", "fr");
    this.NbreEtudiantsInscritAndDoAbonnement();
   
  },
};
</script>
<style>
.switch-green.ant-switch-checked {
  background-color: #52c41a !important; /* vert Ant Design */
}
.ant-select-dropdown {
  z-index: 100000 !important;
}
.ant-radio-group-solid :where(.css-17yhhjv).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
  background: orange !important;
  color: rgb(239, 239, 239) !important;
  border-color:orange !important;
}

:where(.css-dev-only-do-not-override-17yhhjv).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
  color: orange !important;
  text-shadow:0 0 0.25px orange !important;
}
.ant-radio-group-solid :where(.css-dev-only-do-not-override-17yhhjv).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
  background-color: orange !important;
}
.ant-radio-group-solid :where(.css-17yhhjv).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before{
  background-color: orange !important;
}
.n-tabs.n-tabs--line-type .n-tabs-tab:hover,:where(.css-17yhhjv).ant-radio-button-wrapper:hover{
  color: orange !important;
}
:where(.css-17yhhjv).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
  color: #ffa500 !important;
  text-shadow:0 0 0.25px orange !important;
}
.anticon{
  color:#333 !important;
}
:where(.css-dev-only-do-not-override-17yhhjv).ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
  height: 40px !important;
}
.n-input {
  --n-border: 1px solid rgb(167, 167, 167) !important;
  --n-border-hover: 1px solid rgb(167, 167, 167) !important;
  --n-border-focus: 1px solid rgb(216, 216, 216) !important;
  --n-box-shadow-focus: none !important;
}
.n-button--primary {
  --n-color: #333 !important;
  --n-color-hover: #555 !important;
  --n-color-pressed: #111 !important;
}
/* Entrée */
.fade-slide-enter-active {
  transition: all 0.4s ease;
}

/* Sortie */
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

/* Etat initial */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

/* Etat final */
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Disparition */
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.round-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

/* Cache le checkbox natif */
.round-item input {
  display: none;
}

/* Le bouton rond */
.round-label {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90px;
  height: 90px;
  border-radius: 50%;

  border: 2px solid #ccc;
  background: #f5f5f5;

  text-align: center;
  font-size: 12px;
  padding: 10px;

  cursor: pointer;
  transition: all 0.3s ease;
}

/* Hover */
.round-label:hover {
  border-color: orange;
  transform: scale(1.05);
}

/* Etat sélectionné */
.round-item input:checked + .round-label {
  background: orange;
  color: white;
  border-color: orange;
  box-shadow: 0 0 10px teal;
}
 
.disabled-custom {
  background-color: #e9ecef !important; /* gris bootstrap */
  color: #6c757d !important;
  cursor: not-allowed;
  opacity: 0.8;
  border: 1px solid #ced4da !important;
}
.disabled-custom:focus {
  box-shadow: none !important;
}
.stars svg{
  margin:0 0.1em !important;
}
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-btn-primary) {
    background-color: #ff8819 !important;
}

:deep(:where(.n-button:not(.n-button--disabled):active,.n-button:not(.n-button--disabled):hover)){
    color:orange !important;
  }
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-input:focus) {
  border-color: orange !important;
}
.p-tooltip-text {
  font-size: 2.5em !important;
  font-weight: bold;
}
.element {
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.element::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
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
.color_yellow .p-rating-item.p-rating-item-active .p-rating-icon,
.n-tabs.n-tabs--line-type .n-tabs-tab.n-tabs-tab--active {
  color: rgb(255, 208, 0) !important;
}

.color_gold .p-rating-item.p-rating-item-active .p-rating-icon,
.n-tabs.n-tabs--line-type .n-tabs-tab.n-tabs-tab--active {
  color: rgb(250, 163, 1) !important;
}

.n-tabs .n-tabs-bar,
.multiselect__tag {
  background-color: orange !important;
}
html {
  font-size: 0.89em;
}

.router-link-exact-active {
  color: orange !important;
}
.ant-radio-group-solid :where(.css-dev-only-do-not-override-17yhhjv).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
  background-color: orange !important;
  color: rgb(239, 239, 239) !important;
  border: thin orange !important;
}
:where(.css-dev-only-do-not-override-17yhhjv).ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before{
  background-color: orange !important;
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
.p-column-header-content{
  justify-content: center;
}
.vue3-star-ratings__wrapper{
  margin: 0 !important;
}

</style>
