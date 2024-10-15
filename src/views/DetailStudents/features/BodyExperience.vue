<script>
import vue3starRatings from "vue3-star-ratings";
import CardOtherExperience from "./CardOtherExperience.vue";
import { mapActions } from "pinia";
import { useModalExperienceStore } from "../../../store-pinia/ModalExperience/useModalExperienceStore";
export default {
  name: "BodyExperience",
  props: {
    timetable_for_student: { type: Object },
  },
  components: {
    vue3starRatings,
    CardOtherExperience,
  },
  data() {
    return { toogleExperience: true };
  },
  methods: {
    ...mapActions(useModalExperienceStore, ["changeValueForshowModalExperience"]),
  },
};
</script>
<template>
  <CardOtherExperience
    v-if="timetable_for_student.experiences.length"
    :experiences="timetable_for_student.experiences"
  />
  <section class="section_experience_evaluation">
    <div class="conteneur_section_experience">
      <p
        class="w-100 experience text-left fw-bold"
        style="color: orange; cursor: pointer"
        v-if="timetable_for_student.experiences.length"
        @click.prevent="toogleExperience = !toogleExperience"
      >
        Expériences
        <em
          class="bi bi-chevron-down"
          v-if="toogleExperience == false"
          :class="toogleExperience == true ? 'd-none' : ''"
        >
        </em>
        <em class="bi bi-chevron-up" v-if="toogleExperience == true"></em>
      </p>
      <div v-if="toogleExperience && timetable_for_student.experiences.length">
        <div
          class="experiences position-relative px-4 pb-5 my-4"
          v-for="(item, index) in timetable_for_student.experiences.slice(0, 1)"
          :key="index"
        >
          <div class="rond position-absolute"></div>
          <div class="contenteur_experience">
            <div class="proof_experience" v-if="item.proof">
              <n-image width="100" :src="lienPhoto + item.proof" />
            </div>
            <h3 class="text-start">
              {{ item.entreprise }}
            </h3>
            <h6 class="text-start ms-2 fw-bold">
              <span class="badge bg-warning text-light fw-bold">{{ item.poste }}</span>
            </h6>
            <p>
              <em class="bi bi-geo-alt"></em>
              {{ item.lieu }}
            </p>
            <h6 class="text-start ms-2">
              <em class="bi bi-calendar-date"></em>
              {{
                `${new Date(item.dateDebut).toLocaleDateString()} au ${new Date(
                  item.dateFin
                ).toLocaleDateString()}`
              }}
            </h6>
            <p class="text-start ms-2" v-if="item.experience">
              {{ item.experience }}
            </p>
          </div>
        </div>
        <div class="d-flex">
          <button class="btn bg-warning" @click="changeValueForshowModalExperience">
            Voir plus
          </button>
        </div>
      </div>
    </div>
    <div
      class="conteneur_evaluation_experience"
      v-if="timetable_for_student?.etoiles.length"
    >
      <p class="text-left evaluation_avis">
        <span> ( {{ timetable_for_student?.etoiles.length }} )Evaluations/avis</span>
      </p>
      <div class="container-testominal">
        <div class="carrousel_container_testominal">
          <a-carousel arrows autoplay :dots="false">
            <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                <em class="bi bi-caret-left-fill"></em>
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px">
                <em class="bi bi-caret-right-fill"></em>
              </div>
            </template>

            <div v-for="(item, index) in timetable_for_student?.etoiles" :key="index">
              <div class="conteneur-stars_avis">
                <span style="font-weight: bold; font-size: 1.2em">
                  {{ item?.entreprise.nom }}</span
                >

                <vue3starRatings
                  v-model="item.notes"
                  :showControl="false"
                  :starSize="13"
                  :disableClick="true"
                />
              </div>

              <p class="my-3 text-center">{{ item.avis }}</p>
            </div>
          </a-carousel>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@import "../../../Shared/styles/stylesExperience.css";
.conteneur-stars_avis {
  display: flex;
  justify-content: center;
  gap: 1em;
  align-items: center;
  padding: 1em;
}
.evaluation_avis {
  margin-left: 0.5em;
  /* width: 160px; */
  padding: 0.5em;
  border-radius: 5px;
  font-size: 1.3em;
  color: orange;
}
.evaluation_contenaire {
  margin-left: 0.5em;
  padding: 0.5em;
  border-radius: 5px;
  font-size: 1.3em;
  color: orange;
}
.carrousel_container_testominal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.container-testominal {
  width: 100%;
  position: relative;
  height: 200px;
}
:deep(.slick-slide) {
  text-align: center;
  height: 200px;
  overflow: hidden;
  border-radius: 20px;
  padding: 1em;
  background: rgba(179, 201, 255, 0.38);
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #000000;
  transition: ease all 0.3s;
  opacity: 1;
  z-index: 1000;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #000000;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #010101;
}

.section_experience_evaluation {
  display: flex;
  align-content: center;
  gap: 1em;
  justify-content: space-between;
  flex-wrap: wrap;
}
.section_experience_evaluation .conteneur_section_experience {
  flex: 2 2 300px;
}
.section_experience_evaluation .conteneur_evaluation_experience {
  flex: 1 1 300px;
}
.info_student_detail {
  text-transform: capitalize;
}
.bi-person {
  font-size: 4em;
}
.section_student_header {
  display: flex;
  gap: 1em;
  align-items: flex-start;
}
</style>
