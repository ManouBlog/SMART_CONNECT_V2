<script>
import instance from "../api/api";
import {configUtils} from "../Shared/Utils"
import Swal from "sweetalert2";
import { mapActions } from "pinia";
import { useTranslateStore } from "../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();
export default {
  name: "OffreDetails",
  data() {
    return {
      texte: "",
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
      texte27:"",
      configUtils:configUtils,
      spinnerText: loadingSpinner.isLoadingVisible,
      Offre: "",
      list_offre: "",
      moneyFormat: new Intl.NumberFormat("de-DE"),
      user: this.$store.state.user,
      loadSpinner: false,
      path: "",
      listEntrepriseOffre: [],
      abonnements:this.$store.state.user.user.abonement
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    get_list_offre() {
      loadingSpinner.launchLoading(true);
      instance
        .get("list_offres")
        .then((res) => {
          console.log("list_offres", res);
          this.list_offre = res.data.data;
          this.Offre = this.list_offre.find((item) => item.id == this.$route.params.id);
          this.list_offre.forEach((el) => {
            if (el.entreprise.nom === this.Offre.entreprise.nom) {
              this.listEntrepriseOffre.push(el);
            }
          });

          console.log("OFFRES", this.list_offre);
          console.log("OFFRE", this.Offre);
          console.log("LIST ENTREPRISE", this.listEntrepriseOffre);
          loadingSpinner.launchLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendDataPost(id) {
      loadingSpinner.launchLoading(true);
      instance
        .post("postule_offre", {
          offre_id: id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
            loadingSpinner.launchLoading(false);
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "info",
              title: res.data.message,
              showConfirmButton: true,
            });
            loadingSpinner.launchLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: err.response.data.message,
            showConfirmButton: true,
          });
          loadingSpinner.launchLoading(false);
          // Swal.fire({
          //   icon: "error",
          //   title: "Veuillez-vous connecter",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          // setTimeout(() => {
          //   this.$router.push({
          //     path: "/registre",
          //      query: { redirect: this.path }
          //   })
          // })
          loadingSpinner.launchLoading(false);
        });
    },
    verfEnter() {
      if (this.user && this.user.user.statut.statut === "entreprise") {
        Swal.fire({
          icon: "error",
          title: "Vous n'êtes pas autorisé.",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      }
    },
    handleNouvelAbonnement() {
      this.$router.push({ name: "abonnements" });
    },
  },
 async created() {
    this.get_list_offre();
    this.path = window.location.pathname;
    this.verfEnter();
    this.texte = await this.handleTranslate(`Prime pas fixée`);
    this.texte1 = await this.handleTranslate(`Nombre de postes :`);
     this.texte2 = await this.handleTranslate("Date et heure d'entrée en fonction :");
     this.texte3 = await this.handleTranslate(`Date et heure de fin d'activité :`);
     this.texte4 = await this.handleTranslate('Présentations');
     this.texte5 = await this.handleTranslate('Postuler avant le :');
     this.texte6 = await this.handleTranslate('Postuler');
     this.texte7 =  await this.handleTranslate('Veuillez faire un abonnement avant de postuler à cette offre');
     this.texte8 =  await this.handleTranslate('Souscrire à un abonnement');
     this.texte9 = await this.handleTranslate(` Vous avez atteint la fin`);
     this.texte10 = await this.handleTranslate("ex: Angre");
     this.texte11 = await this.handleTranslate('Offres');
     this.texte12 = await this.handleTranslate('Nous avons trouvé');
     this.texte13 = await this.handleTranslate('Nouveauté');
     this.texte14 = await this.handleTranslate('Voir les Détails');
     this.texte15 =  await this.handleTranslate('Offre Expirée');
     this.texte16 =  await this.handleTranslate('Charger plus');
  },
};
</script>
<template>
  <div class="position-relative">
    <div class="container main-container" v-if="Offre">
      <div class="col-lg-12">
        <div class="offres_disponible row container">
          <div class="col-md-12 col-sm-12 entreprise">
            <div class="card">
              <section>
                <h1 class="my-5 nom_offre">{{ Offre.nom_offre }}</h1>
                <h4 class="my-5">
                  <em class="bi bi-building"></em> {{ Offre.entreprise.nom }}
                </h4>
                <div>
                  <h4 class="my-5" v-if="Offre.salaire != null">
                    <em class="bi bi-cash-stack"></em>
                    {{ moneyFormat.format(Offre.salaire) }} Fcfa /
                    {{ Offre.pointage }}
                  </h4>
                  <h4 class="my-5" v-else>
                    <em class="bi bi-cash-stack"></em> {{texte}}
                  </h4>
                </div>
                <h4 class="my-5" v-if="Offre.nbre_person">
                  {{texte1}} {{ Offre.nbre_person }}
                </h4>
                <h4 class="my-5">
                  {{texte2}} {{ 
                    configUtils.getFormatDateFr(Offre.job_debut) }}
                </h4>
                <h4 class="my-5">
                  {{texte3}} {{ 
                    configUtils.getFormatDateFr(Offre.job_fin) }}
                </h4>
             
              </section>
              <section>
                <h4 class="d-flex my-4">{{texte4}}</h4>
                <div v-html="Offre.description" id="conteneur_description"></div>
              </section>
              <section>
                <span class="my-2 text-danger">{{texte5}} {{ 
                  configUtils.getFormatDateFr(Offre.fin) }}</span>
              </section>
              <section v-if="abonnements.some(item=>item.statut === 'success')">
                <button
                  class="btn-lg bg-warning"
                  @click="sendDataPost(Offre.id)"
                  style="width: auto !important"
                >{{texte6}}
                  <em class="bi bi-send"></em>
                </button>
              </section>
              <section v-else>
               <h5 class="text-danger d-flex justify-content-center my-5">
                {{texte7}}
              </h5>
              <div>
                <button class="btn bg-warning"  style="width: auto !important;padding:1em;" @click="handleNouvelAbonnement">
                  {{texte8}}
                </button>
              </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#conteneur_description {
  text-align: justify;
}
.nom_offre {
  font-size: 3em;
  color: black !important;
  font-weight: bold;
}
span {
  font-weight: 200 !important;
}
.card {
  padding: 1em !important;
  background: var(--secondary-color) !important;
  color: var(--third-color) !important;
}
.conteneur-chargement {
  height: 80vh;
  width: 100%;
  display: flex;
  place-content: center;
  justify-items: stretch;
  text-align: center;
}

.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  place-items: center;
  z-index: 99;
}
.image-heading {
  color: black;
}

.offres_disponible h4,
.offres_disponible h5,
p,
.nom_offre {
  text-align: left;
}
span {
  text-align: left;
}
.detail_offre {
  font-weight: 900 !important;
  color: orange;
}
.spinner-border {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(190, 189, 189, 0.289);
  display: flex;
  justify-content: center;
  place-items: center;
  align-items: center;
}
.hideOffreIfUserIsBuisness {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 21, 21, 0.886);
  display: flex;
  justify-content: center;
  place-items: center;
  align-items: center;
}
.entreprise span {
  display: block;
}
.entreprise {
  padding: 0 5em;
  text-align: center;
}

.blueprint h1 {
  color: white;
  font-size: 3em;
}
.entreprise h1 {
  text-align: left;
  color: orange;
}
.blueprint h1::first-letter {
  font-size: 4em;
}
button {
  width: 100% !important;
  border: 0;
}
.jobs_filters {
  box-shadow: none !important;
}
</style>
