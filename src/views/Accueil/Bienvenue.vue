<script>
import Swal from "sweetalert2";
import instance from "../../api/api";
import HeaderBanner from "./features/HeaderBanner.vue";
import Banniere from "../../Banner/Banniere.vue";
import StepViews from "./features/StepViews.vue";
import TestimonialsView from "../TestimonialsView.vue";
import RechercheOffre from "./features/RechercheOffre.vue";
import PerformanceView from "./features/PerformanceView.vue";
import OffresRecentes from "./features/OffresRecentes.vue";
import Partenaires from "./features/Partenaires.vue";
// import NewsLetterView from "./features/NewsLetter.vue";
import AppMobileView from "./features/AppMobileView.vue";
import { usePartenaireStore } from "../../store-pinia/partenaire/usePartenaireStore";
import { useRegisterStore } from "../../store-pinia/register/useRegisterStore";
import { mapActions } from "pinia";
export default {
  name: "Bienvenue",
  components: {
    HeaderBanner,
    StepViews,
    RechercheOffre,
    PerformanceView,
    OffresRecentes,
    Partenaires,
    TestimonialsView,
    // NewsLetterView,
    Banniere,
    AppMobileView,
  },
  data() {
    return {
      cookiesAccepted: localStorage.getItem("cookiesAccepted"),
      offre_emploi_du_jour: "",
      user: this.$store.state.user,
      timetable: "",
      STOREPARTENAIRE: usePartenaireStore(),
      offres: "",
      emailForNewsletter: "",
      charte: window.localStorage.getItem("charte"),
      newletter: null,
      ListOffre: [],
      spinner: false,
      email: "",
      token: "",
      testimonials: [],
    };
  },
  methods: {
    ...mapActions(useRegisterStore, ["changeValueIsModal"]),
    acceptCookies() {
      this.cookiesAccepted = true;
      localStorage.setItem("cookiesAccepted", "true");
    },
    rejectCookies() {
      this.cookiesAccepted = true;
      localStorage.setItem("cookiesAccepted", "false");
      // Swal.fire({
      //   icon: "info",
      //   title: "Cookies refusés 🚫",
      //   text: "Vous pourrez changer d’avis plus tard dans vos paramètres.",
      //   timer: 2000,
      //   showConfirmButton: false,
      // });
    },
    async verifyEmail(email, token) {
      try {
        const { data } = await instance.post("verificationEmail", { email, token });

        if (data.status) {
          Swal.fire({
            icon: "success",
            title: "Votre compte a été activé 🎉",
            text: "Vous pouvez maintenant accéder à votre espace personnel.",
            showConfirmButton: false,
            timer: 1800,
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Vérification échouée",
            text: data.message || "Le lien de vérification est invalide ou expiré.",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification :", error);
        Swal.fire({
          icon: "error",
          title: "Erreur serveur",
          text:
            "Une erreur est survenue lors de la vérification. Veuillez réessayer plus tard.",
        });
      }
    },
    async launchTestimonials() {
      try {
        const response = await instance.get("temoignages");
        // console.log("testimonials", response.data);
        this.testimonials = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des témoignages :", error);
      }
    },
  },

  async created() {
    this.launchTestimonials();
    this.email = this.$route.params.email;
    this.token = this.$route.params.token;
    // console.log("this.token", this.token);
    // console.log("this.email", this.email);
    const redirect = this.$route.query.redirect;
    if (redirect) {
      this.changeValueIsModal();
    }
    if (this.email && this.token) {
      await this.verifyEmail(this.email, this.token);
    }
  },

  async mounted() {
    try {
      await this.STOREPARTENAIRE.getAllPartenaires();
    } catch (error) {
      console.error("Erreur lors du chargement des partenaires :", error);
    }
  },
  // methods: {
  //   async doVerificationMail(email, token) {
  //     try {
  //       const response = await instance.post("verificationEmail", {
  //         email: email,
  //         token: token,
  //       });
  //       if (response.data.status) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Compte activé",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  // },
  // created() {
  //   this.email = this.$route.params.email;
  //   this.token = this.$route.params.token;

  //   if (this.email && this.token) {
  //     this.doVerificationMail(this.email, this.token);
  //   }
  // },
  // async mounted() {
  //   await this.STOREPARTENAIRE.getAllPartenaires();
  // },
};
</script>
<template>
  <section style="position: relative">
    <Banniere />
    <HeaderBanner />
    <StepViews />
    <RechercheOffre />
     <OffresRecentes />
    <PerformanceView />
    <AppMobileView />
    <Partenaires v-if="this.STOREPARTENAIRE.partenaires.length" />
    <TestimonialsView v-if="this.testimonials.length" />
    <!-- <NewsLetterView /> -->
    <div
      v-if="!cookiesAccepted"
      style="
        z-index: 1050;
        position: fixed;
        min-width: 280px;
        bottom: 0.5em;
        right: 1em;
        left: 1em;
        background: orange;
        padding: 1rem;
        border-radius: 10px;
      "
    >
      <div
        class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 w-100"
      >
        <!-- Texte informatif -->
        <div class="d-flex align-items-start gap-3 flex-grow-1">
          <div class="w-100">
            <h5 class="fw-semibold mb-1 text-dark">Utilisation des cookies</h5>
            <p class="mb-0 text-dark small" style="width: 100%">
              Nous utilisons des cookies pour garantir le bon fonctionnement de notre
              site, analyser le trafic et personnaliser le contenu. Vous pouvez choisir
              d’accepter ou de refuser leur utilisation. Ces choix n’affecteront pas votre
              navigation.
            </p>
          </div>
        </div>

        <!-- Boutons -->
        <div class="d-flex gap-2 flex-shrink-0 mt-2 mt-md-0">
          <button @click="rejectCookies" class="btn text-dark btn-sm">Refuser</button>
          <button @click="acceptCookies" class="btn btn-dark btn-sm" style="color: white">
            Accepter
          </button>
        </div>
      </div>
    </div>
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
.btn {
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
