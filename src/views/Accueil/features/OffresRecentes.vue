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
      texte1: "",
      texte2: "",
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
        this.$router.push({ name: "jobs" });
      } else {
        this.toogleModal();
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
  <section v-if="
    this.$store.state.user &&
    (this.$store.state.user?.user?.statuses || []).some(s => s.statut === 'Etudiant') &&
    ListOffre.length
  ">
    <h1 class="fw-bold title" v-if="ListOffre.length">
      {{ texte0 }}
    </h1>

    <div class="wrapper">
      <Flicking class="job-container" :defaultIndex="0" :moveType="'snap'" :bound="true">
        <div class="job_div" v-for="item in ListOffre" :key="item.id">
          <h2 class="fw-bold">{{ item.nom_offre }}</h2>
          <span v-if="item.competence?.categorie?.categorie" style="color: orange;">
            {{ item.competence?.categorie?.categorie }}
          </span>

          <span class="meta">
            <em class="bi bi-geo-alt"></em> {{ item.lieu }}
          </span>

          <div class="salary">
            <em class="bi bi-cash mx-2"></em>
            <span class="amount">
              {{ item.salaire }}
            </span>
            <span v-if="item.pointage"> / {{ item.pointage }}</span>
          </div>

          <div class="desc_crop">
            <span class="fw-bold">{{ texte1 }}</span>
            <div class="desc" v-html="item.description"></div>
          </div>

          <span class="publie_offre">
            {{ texte2 }} {{ new Date(item.created_at).toLocaleString("fr") }}
          </span>
        </div>

        <!-- Slide "Plus d'offres" -->
        <div class="job_div more" style="background-color:transparent !important;">
          <a href="#" class="more-link" @click.prevent="voirDetailTimetable">
            Plus d'offres <em class="bi bi-arrow-right"></em>
          </a>
        </div>
      </Flicking>
    </div>
  </section>
</template>
<style scoped>
@import "../../../Shared/styles/stylesShared.css";

/* ===== TITRE ===== */
.title {
  color: orange;
  text-align: center;
  margin-bottom: 2rem;
}

/* ===== FLICKING ===== */
.job-container {
  background-color: var(--secondary-color);
  padding: 1rem 0;
  overflow: hidden;
}

/* FORCE LE ROW HORIZONTAL */
:deep(.flicking-camera) {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

:deep(.flicking-panel) {
  flex-shrink: 0;
}

:deep(.flicking-viewport) {
  touch-action: pan-y;
}

/* ===== CARTES ===== */
.job_div {
  background: #ffffff;
  width: 320px;
  height: 320px;
  margin: 0 0.75rem;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.job_div:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
}

.meta {
  display: block;
  margin-bottom: 0.5rem;
}

.salary {
  margin: 0.5rem 0 1rem;
}

.amount {
  font-weight: bold;
  color: orange;
}

/* ===== DESCRIPTION ===== */
.desc_crop {
  height: 90px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

/* ===== DATE ===== */
.publie_offre {
  position: absolute;
  bottom: 1rem;
  font-size: 0.85rem;
  color: #666;
}

/* ===== SLIDE PLUS D'OFFRES ===== */
.job_div.more {
  display: flex;
  justify-content: center;
  align-items: center;
}

.more-link {
  font-size: 1.5rem;
  color: orange;
  text-decoration: none;
  font-weight: bold;
}

/* ===== MOBILE ===== */
@media screen and (max-width: 768px) {
  .job_div {
    width: 75vw;
    max-width: 300px;
    height: auto;
  }

  .desc_crop {
    width: 220px;
    max-height: 85px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* Nombre de lignes désiré */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  .publie_offre {
    position: static;
    margin-top: 1rem;
  }
}

/* ===== PETIT MOBILE ===== */
@media screen and (max-width: 480px) {
  .job_div {
    width: 85vw;
    font-size: 0.95rem;
  }
}
</style>
