<script>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { mapActions, mapState } from "pinia";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useRegisterStore } from "../../../store-pinia/register/useRegisterStore";
export default {
  name: "OffresRecentes",
  components: {
    Flicking,
  },
  data() {
    return {
      texte0: "",
      texte2: "",
      texte3: "",
      texte1: "",
      user: this.$store.state.user,
    };
  },
  computed: {
    ...mapState(useOffreStore, ["ListOffre"]),
  },
  methods: {
    ...mapActions(useOffreStore, ["getOffres"]),
    ...mapActions(useRegisterStore, {
      toogleModal: "changeValueIsModal",
    }),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    voirDetailTimetable() {
      if (this.$store.state.user) {
        this.$router.push({
          name: "jobs",
        });
      } else {
        this.toogleModal();
        // Swal.fire({
        //   icon: "info",
        //   title: "Veuillez-vous connecter!",
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
        // setTimeout(() => {
        //   this.$router.push({
        //     path: "/registre",
        //     query: { redirect: this.path },
        //   });
        // }, 2000);
      }
    },
  },
  async created() {
    if (this.user) {
      this.getOffres();
    }

    this.texte0 = await this.handleTranslate("Offres récentes");
    this.texte1 = await this.handleTranslate("Description");
    this.texte2 = await this.handleTranslate("Publié le:");
  },
};
</script>
<template>
  <section
    v-if="
      this.$store.state.user && this.$store.state.user.user.statut.statut === 'etudiant'
    "
  >
    <h1 class="fw-bold" style="color: orange; text-align: center" v-if="ListOffre.length">
      {{ texte0 }}
    </h1>
    <br />
    <br />

    <div class="wrapper">
      <Flicking class="job-container" :defaultIndex="1">
        <div class="job_div" style="width: auto" v-for="item in ListOffre" :key="item.id">
          <h1 class="fw-bold">{{ item.nom_offre }}</h1>
          <span><em class="bi bi-geo-alt"></em>{{ item.lieu }}</span>
          <br />
          <br />
          <span> <em class="bi bi-calendar-date"></em>Echéance :</span>
          <span>{{ new Date(item.fin).toLocaleDateString("fr") }}</span>
          <br />
          <br />
          <div class="desc_crop">
            <span class="fw-bold">{{ texte1 }}</span>
            <div class="desc" v-html="item.description"></div>
            <p class="lire"></p>
          </div>
          <span class="publie_offre"
            >{{ texte2 }}{{ new Date(item.created_at).toLocaleDateString("fr") }}</span
          >
        </div>
        <div
          v-if="ListOffre.length > 0"
          style="
            width: auto;
            display: flex;
            justify-content: center;
            place-content: center;
            align-items: center;
          "
        >
          <a
            href="#"
            class="h5"
            style="font-size: 2em; color: orange !important"
            @click.prevent="voirDetailTimetable"
            v-if="
              this.$store.state.user &&
              this.$store.state.user.user.statut.statut === 'etudiant'
            "
            >Plus d'offres <em class="bi bi-arrow-right"></em>
          </a>
        </div>
      </Flicking>
    </div>
  </section>
</template>
<style scoped>
@import "../../../Shared/styles/stylesShared.css";

/* Description coupée */
.desc_crop {
  width: 100%;
  height: 90px;
  overflow: hidden;
  position: relative;
}
.publie_offre {
  position: absolute;
  bottom: 1em;
}
.desc_crop .lire {
  position: absolute;
  bottom: -1em;
  left: 0;
  width: 100%;
  height: 90px;
  text-align: center;
  margin: 0;
  padding: 50px 0;
  border-radius: 10px;
  background-image: linear-gradient(to bottom, transparent, rgb(255, 255, 255));
}

/* Conteneur principal du Flicking */
.job-container {
  background-color: var(--secondary-color) !important;
  color: black !important;
  padding: 1em 0;
  overflow: hidden;
}

/* Cartes d’offre */
.job_div {
  background: #fff;
  width: 300px;
  height: 300px;
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
  position: relative;
  text-align: left;
  padding: 0 1em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.job_div:hover {
  transform: translateY(-4px);
  box-shadow: 2px 2px 14px rgba(0, 0, 0, 0.25);
}

/* Responsive mobile */
@media screen and (max-width: 768px) {
  .job-container {
    padding: 0.5em;
  }

  .job_div {
    width: 85%; /* s’adapte à la largeur de l’écran */
    height: auto;
    min-height: 250px;
    margin: 0 auto;
    padding: 1em;
    text-align: left;
  }

  .desc_crop {
    height: auto;
  }

  .publie_offre {
    position: static;
    display: block;
    margin-top: 1em;
  }

  /* Optimise la navigation tactile */
  :deep(.flicking-camera) {
    gap: 1em;
  }

  :deep(.flicking-viewport) {
    touch-action: pan-y pinch-zoom;
  }
}

/* Ultra petit écran */
@media screen and (max-width: 480px) {
  .job_div {
    width: 95%;
    font-size: 0.9em;
  }
}
</style>
