<script>
import instance from "../api/api";
import {configUtils} from "../Shared/Utils"
import Swal from "sweetalert2";
import { useLoadingSpinner } from "../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();
export default {
  name: "OffreDetails",
  data() {
    return {
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
  created() {
    this.get_list_offre();
    this.path = window.location.pathname;
    this.verfEnter();
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
                    <em class="bi bi-cash-stack"></em> Prime pas fixée
                  </h4>
                </div>
                <h4 class="my-5" v-if="Offre.nbre_person">
                  Nombre de postes : {{ Offre.nbre_person }}
                </h4>
                <h4 class="my-5">
                  Date et heure d'entrée en fonction : {{ 
                    configUtils.getFormatDateFr(Offre.job_debut) }}
                </h4>
                <h4 class="my-5">
                  Date et heure de fin d'activité : {{ 
                    configUtils.getFormatDateFr(Offre.job_fin) }}
                </h4>
             
              </section>
              <section>
                <h4 class="d-flex my-4">Présentations</h4>
                <div v-html="Offre.description" id="conteneur_description"></div>
              </section>
              <section>
                <span class="my-2 text-danger">Postuler avant le : {{ 
                  configUtils.getFormatDateFr(Offre.fin) }}</span>
              </section>
              <section v-if="abonnements.some(item=>item.statut === 'ACCEPTED')">
                <button
                  class="btn-lg bg-warning"
                  @click="sendDataPost(Offre.id)"
                  style="width: auto !important"
                >
                  Postuler
                  <em class="bi bi-send"></em>
                </button>
              </section>
              <section v-else>
               <h5 class="text-danger d-flex justify-content-center my-5">
                Veuillez faire un abonnement avant de postuler à cette offre
              </h5>
              <div>
                <button class="btn bg-warning"  style="width: auto !important;padding:1em;" @click="handleNouvelAbonnement">
                  Souscrire à un abonnement
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
  background: rgba(179, 201, 255, 0.38) !important;
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
