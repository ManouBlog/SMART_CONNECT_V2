<script>
// import Swal from "sweetalert2";
// import instance from "../../api/api";
import HeaderBanner from "./features/HeaderBanner.vue";
import StepViews from "./features/StepViews.vue";
import RechercheOffre from "./features/RechercheOffre.vue";
import PerformanceView from "./features/PerformanceView.vue";
import OffresRecentes from "./features/OffresRecentes.vue";
import Partenaires from "./features/Partenaires.vue";
// import NewsLetterView from "./features/NewsLetter.vue";
import AppMobileView from "./features/AppMobileView.vue";
import { usePartenaireStore } from "../../store-pinia/partenaire/usePartenaireStore";
export default {
  name: "Bienvenue",
  components: {
    HeaderBanner,
    StepViews,
    RechercheOffre,
    PerformanceView,
    OffresRecentes,
    Partenaires,
    // NewsLetterView,
    AppMobileView,
  },
  data() {
    return {
      offre_emploi_du_jour: "",
      user: this.$store.state.user,
      timetable: "",
      STOREPARTENAIRE:usePartenaireStore(),
      offres: "",
      emailForNewsletter: "",
      charte: window.localStorage.getItem("charte"),
      newletter: null,
      ListOffre: [],
      spinner: false,
    };
  },

  methods: {
    // closeCharte() {
    //   this.charte = 0;
    //   window.localStorage.setItem("charte", 0);
    // },

    // voirDetailTimetable() {
    //   if (this.user) {
    //     this.$router.push({
    //       name: "jobs",
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "info",
    //       title: "Veuillez-vous connecter!",
    //       showConfirmButton: false,
    //       timer: 2000,
    //     });
    //     setTimeout(() => {
    //       this.$router.push({
    //         path: "/registre",
    //         query: { redirect: this.path },
    //       });
    //     }, 2000);
    //   }
    // },
    // async handleGoogleCallBack() {
    //   const URL_PARAMS = new URLSearchParams(window.location.search);
    //   const code = URL_PARAMS.get("code");
    //   if (code) {
    //     try {
    //       const response = await instance.get(`auth/google/callback?code=${code}`);
    //       const { token, user } = response.data;
    //       localStorage.setItem("token", token);
    //       localStorage.setItem("user", JSON.stringify(user));
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   } else {
    //     return;
    //   }
    // },
  },
 async mounted() {
    await this.STOREPARTENAIRE.getAllPartenaires();
  },
};
</script>
<template>
  <section>
    <HeaderBanner />
    <StepViews />
    <RechercheOffre />

    <PerformanceView />
    <AppMobileView />
    <OffresRecentes />
    <Partenaires v-if="this.STOREPARTENAIRE.partenaires.length" />

    <!-- <NewsLetterView /> -->
  </section>
</template>

<style scoped>
.h1 {
  font-size: 5em;
}

.text-dark {
  color: black !important;
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
.conteneur_liste li {
  list-style-type: none !important;
}

section {
  position: relative;
  padding: 1em 0;
}
.lien {
  background: #f77f00 !important;
  padding: 0.5em;
  border-radius: 5px;
}
a:hover {
  color: white;
}
section > a {
  position: absolute;
  right: 3em;
  font-size: 1.2em;
  color: #f77f00 !important;
  text-decoration: underline !important;
}

.charte_btn_connect {
  color: #f77f00;
}

.text-secondary {
  color: gray;
}

.conteneur-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 1em 0;
  padding: 3em 0;
}
.conteneur-team .teamOne {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-image: url("../../assets/KFC-Logo-362893771.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: cover;
}
.conteneur-team .teamTwo {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-image: url("../../assets/logo-jumia-mall-2114415253.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: center;
}
.conteneur-team .teamThree {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-image: url("../../assets/41715b307038cad1018232d2f01f326b-1154425032.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: center;
}
.conteneur-team .teamFour {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-image: url("../../assets/Radisson_SAS-3112560756.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: center;
}
.conteneur-team .teamFive {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-image: url("../../assets/deliv.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: center;
}

.icon {
  position: absolute;
  top: 20px;
  left: 110px;
  font-size: 1.5em;
}
.bi-building {
  left: 130px;
}
.nb {
  text-align: center;
  background: rgb(3, 83, 115);
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  color: white;
}

.chart_entreprise {
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.156);
  margin-bottom: 2em;
  border-radius: 10px;
  padding: 1em;
  color: black;
  text-align: left;
  background: white;
  position: relative;
}
.btn-ferme {
  position: absolute;
  right: 0;
  bottom: 1em;
  width: 150px;
  background: rgb(255, 153, 0) !important;
}
.chart_entreprise p {
  font-size: 0.89em;
}
.showCharte {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgba(0, 0, 0, 0.346);
}

@import url("../../assets/w3.css");
.btn-lg {
  margin: 0 1em !important;
}
select {
  font-size: 16px;
  padding: 10px 16px;
  font-family: LatoRegular;
  border: 1px solid rgb(5, 35, 73);
  width: 20%;
  border-radius: 6px;
}

#load_more {
  border: 1px solid rgb(5, 35, 73) !important;
}
.fw-bold {
  font-weight: 900 !important;
}
.num {
  font-size: 5em;
}
.textSt {
  font-size: 0.8em;
}
.login {
  width: 200px;
  height: 50px;
  padding: 0 1em;
  border-radius: 5px;
  color: white !important;
}
.div {
  width: 25px;
  margin: auto;
}
.login a {
  color: white !important;
}

.conteneur-how_run {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
  flex-wrap: wrap;
  padding: 3em 5em !important;
  position: relative;
}
.my-card {
  width: 100%;
  height: auto;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.332);
  padding: 1em;
}
.sub_card_img {
  width: 90%;
  height: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
}
.count {
  position: relative;
}
.img-fluid {
  position: absolute;
  width: auto;
  height: 100%;
  margin-right: 50%;
  transform: translateX(-50%);
  object-fit: cover;
}
.bi-person-lines-fill,
.bi-briefcase-fill,
.bi-chat-square-text-fill {
  font-size: 2em !important;
}


h3 {
  color: white;
  text-decoration: underline;
  padding: 0.5em 0;
}
.cont1 {
  background: rgb(71, 67, 59);
  height: 50vh;
}

.info {
  height: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 4em 0;
}
.cont-one {
  transform: rotate(10deg) translateX(-63px);
}
.cont-two {
  transform: rotate(-10deg);
}
.cont-one,
.cont-two {
  width: 300px;
  height: 300px;
  padding: 1.5em;
  margin: 0 1em;
  border-radius: 10px;
  background: rgba(0, 213, 255, 0.257);
}

@media screen and (max-width: 1088px) {
  .header_banner {
    padding: 0.5em !important;
  }
  .main-container-home {
    padding: 1em 0;
  }
}
@media screen and (max-width: 800px) {
  h1 {
    font-size: 25px;
  }
  .alerte_emploi {
    flex-direction: column;
  }
}
@media screen and (max-width: 500px) {
  h1 {
    font-size: 20px;
  }
}
@media screen and (max-width: 400px) {
  h1 {
    font-size: 15px;
  }
}
</style>
