<script>
import instance, { lienPhoto } from "../api/api";
import { configUtils } from "../Shared/Utils";
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
      lienPhoto: lienPhoto,
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
      texte66: "",
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
      configUtils: configUtils,
      spinnerText: loadingSpinner.isLoadingVisible,
      DetailSeeEntreprise: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      user: this.$store.state.user,
      loadSpinner: true,
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    get_offre_detail_interesse() {
      loadingSpinner.launchLoading(true);
      instance
        .get("see_entreprise_student")
        .then((res) => {
          // console.log("see_entreprise_student", res);
          this.DetailSeeEntreprise = res.data.data.find(
            (item) => item.id == this.$route.params.id
          );
          // console.log("this.DetailSeeEntreprise", this.DetailSeeEntreprise);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loadingSpinner.launchLoading(false);
          this.loadSpinner = false;
        });
    },
    updateCandidature(id, payload, idContrat) {
      loadingSpinner.launchLoading(true);
      instance
        .put("changeStatutJob/" + id, { contrat: payload, id_contrat: idContrat })
        .then((res) => {
          // console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "info",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: err.response.data.message,
            showConfirmButton: true,
          });
        })
        .finally(() => {
          this.get_offre_detail_interesse();
          loadingSpinner.launchLoading(false);
        });
    },
    handleNouvelAbonnement() {
      this.$router.push({ name: "abonnements" });
    },
  },
  async created() {
    this.get_offre_detail_interesse();
    this.path = window.location.pathname;
    this.texte = await this.handleTranslate(`Prime pas fixée`);
    this.texte1 = await this.handleTranslate(`Nombre de postes :`);
    this.texte2 = await this.handleTranslate("Date de début de travail :");
    this.texte3 = await this.handleTranslate(`Date de fin de travail :`);
    this.texte4 = await this.handleTranslate("Description");
    this.texte5 = await this.handleTranslate("Postuler avant le :");
    this.texte6 = await this.handleTranslate("Accepter");
    this.texte7 = await this.handleTranslate(
      "Veuillez faire un abonnement avant de postuler à cette offre"
    );
    this.texte8 = await this.handleTranslate("Souscrire à un abonnement");
    this.texte9 = await this.handleTranslate(` Vous avez atteint la fin`);
    this.texte10 = await this.handleTranslate("ex: Angre");
    this.texte11 = await this.handleTranslate("Offres");
    this.texte12 = await this.handleTranslate("Nous avons trouvé");
    this.texte13 = await this.handleTranslate("Nouveauté");
    this.texte14 = await this.handleTranslate("Voir les Détails");
    this.texte15 = await this.handleTranslate("Offre Expirée");
    this.texte16 = await this.handleTranslate("Charger plus");
    this.texte66 = await this.handleTranslate("Non retenu");
  },
};
</script>
<template>
  <div class="position-relative">
    <div class="container main-container" v-if="DetailSeeEntreprise">
      <div class="col-lg-12">
        <div class="offres_disponible row container">
          <div class="col-md-12 col-sm-12 entreprise">
            <div class="card px-5">
              <section>
                <div class="d-flex">
                  <h1 class="my-5 nom_offre">
                    {{ DetailSeeEntreprise.offre.nom_offre }}
                  </h1>
                </div>

                <h4 class="my-5">
                  <em class="bi bi-geo"></em> {{ DetailSeeEntreprise.offre.lieu }}
                </h4>
                <h4 class="my-5">
                  <img
                    style="
                      width: 35px;
                      height: 35px;
                      object-fit: cover;
                      border: 1px solid white;
                      background: white;
                    "
                    :src="
                      DetailSeeEntreprise.Offre?.entreprise?.logo
                        ? lienPhoto + DetailSeeEntreprise.Offre?.entreprise?.logo
                        : '/brobroli.png'
                    "
                    :alt="
                      DetailSeeEntreprise.Offre?.entreprise?.logo
                        ? DetailSeeEntreprise.Offre?.entreprise?.logo
                        : 'smart-connect'
                    "
                  />
                  {{ DetailSeeEntreprise.Offre?.owner?.nom }}
                </h4>
                <div>
                  <h4 class="my-5" v-if="DetailSeeEntreprise.offre.salaire != null">
                    <em class="bi bi-cash-stack"></em>
                    {{ moneyFormat.format(DetailSeeEntreprise.offre.salaire) }} Fcfa /
                    {{ DetailSeeEntreprise.offre.pointage }}
                  </h4>
                  <h4 class="my-5" v-else>
                    <em class="bi bi-cash-stack"></em> {{ texte }}
                  </h4>
                </div>
                <h4 class="my-5" v-if="DetailSeeEntreprise.offre.nbre_person">
                  <span class="fw-bold" style="font-weight:bold">{{ texte1 }}</span>
                  {{ DetailSeeEntreprise.offre.nbre_person }}
                </h4>
              </section>
              <section>
                <h4>
                  <span class="fw-bold my-3" style="font-weight:bold">{{ texte4 }} :</span>
                </h4>
                <div
                  style="font-weight: 300"
                  v-html="DetailSeeEntreprise.offre.description"
                  id="conteneur_description"
                ></div>
              </section>

              <section>
                <h4 class="my-5">
                  <span class="fw-bold">{{ texte2 }}</span>
                  {{ configUtils.getFormatDateFr(DetailSeeEntreprise.offre.job_debut) }}
                </h4>
                <h4 class="my-5">
                  <span class="fw-bold">{{ texte3 }}</span>
                  {{ configUtils.getFormatDateFr(DetailSeeEntreprise.offre?.job_fin) }}
                </h4>
              </section>
              <section>
                <span class="my-2 fw-bold" style="color: orange"
                  >{{ texte5 }}
                  {{ configUtils.getFormatDateFr(DetailSeeEntreprise.offre.fin) }}</span
                >
              </section>

              <section
                class="d-flex align-items-center justify-content-center"
                v-if="DetailSeeEntreprise.contrat === 0"
              >
                <button
                  class="btn bg-success mx-2"
                  @click="
                    updateCandidature(
                      DetailSeeEntreprise.offre.id,
                      1,
                      DetailSeeEntreprise.id
                    )
                  "
                  style="width: auto !important"
                >
                  {{ texte6 }}
                </button>
                <button
                  class="btn bg-danger"
                  @click="
                    updateCandidature(
                      DetailSeeEntreprise.offre.id,
                      2,
                      DetailSeeEntreprise.id
                    )
                  "
                  style="width: auto !important"
                >
                  {{ texte66 }}
                </button>
              </section>

              <p
                class="d-flex justify-content-center"
                style="color: #00ff04"
                v-else-if="DetailSeeEntreprise.contrat === 1"
              >
                Offre Acceptée pour le {{ DetailSeeEntreprise.date }}
              </p>
              <p class="text-danger d-flex justify-content-center" v-else>
                Offre refusée pour le {{ DetailSeeEntreprise.date }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container main-container shimmer-text" style="padding: 8em">chargement...</div>
  </div>
</template>
<style scoped>
.offres_disponible{
  margin-top: 9em;
}
@media screen and (max-width:1200px) {
 .offres_disponible{
  margin-top: 2.5em;
}
}
@media screen and (max-width:900px) {
 .offres_disponible{
  margin-top: 2em;
}
}
button {
  padding: 1.3em;
  font-size: 1.1em;
  font-weight: bold;
}
#conteneur_description {
  text-align: justify;
}
.nom_offre {
  font-size: 5em;
  color: rgb(255, 255, 255) !important;
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
  padding: 9em 5em;
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
@media (max-width: 1028px) {
  .entreprise {
    padding: 1em 1.5em;
    text-align: center;
  }
}

@media (max-width: 768px) {
  /* Nom de l'offre plus petit sur mobile */
  .nom_offre {
    font-size: 2rem !important;
    text-align: center !important;
  }

  /* Padding de la carte réduit sur mobile */
  .entreprise {
    padding: 1em 1.5em !important;
    text-align: center !important;
  }

  /* Boutons : empilés et largeur complète sur mobile */
  .card section.d-flex.flex-column.flex-md-row {
    flex-direction: column !important;
    gap: 0.5em !important;
  }
  .card section.d-flex.flex-column.flex-md-row button {
    width: 100% !important;
  }

  /* Images logos responsive */
  .card img {
    max-width: 50px !important;
    height: auto !important;
    margin-bottom: 0.5em;
  }

  /* Texte description plus lisible */
  #conteneur_description {
    font-size: 0.9rem !important;
    line-height: 1.4rem !important;
  }

  /* H4 et H5 plus adaptés aux petits écrans */
  .offres_disponible h4,
  .offres_disponible h5 {
    font-size: 0.95rem !important;
  }

  /* Espacement des sections réduit */
  .card section {
    margin-bottom: 1em !important;
  }
}
</style>
