<script>
import vue3starRatings from "vue3-star-ratings";
import CardOtherExperience from "./CardOtherExperience.vue";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
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
    return {
      toogleExperience: true,
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
    };
  },
  methods: {
    ...mapActions(useModalExperienceStore, ["changeValueForshowModalExperience"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
  },
  async created() {
    this.texte = await this.handleTranslate("Expériences");
    this.texte1 = await this.handleTranslate("Voir plus");
    this.texte2 = await this.handleTranslate("Evaluations/avis");
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
        {{ texte }}
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
          class="experiences position-relative px-4 my-4"
          v-for="(item, index) in timetable_for_student.experiences.slice(0, 1)"
          :key="index"
        >
          <div class="rond position-absolute"></div>
          <div class="contenteur_experience">
            <div class="proof_experience" v-if="item?.proof">
              <n-image width="100" :src="lienPhoto + item?.proof" />
            </div>
            <h3 class="text-start">
              {{ item?.entreprise }}
            </h3>
            <h6 class="text-start ms-2 fw-bold">
              <span class="badge bg-warning text-light fw-bold">{{ item?.poste }}</span>
            </h6>

            <p>
              <em class="bi bi-geo-alt"></em>
              {{ item?.lieu }}
            </p>
            <h6 class="text-start ms-2">
              <em class="bi bi-calendar-date"></em>
              {{
                `${new Date(item?.dateDebut).toLocaleDateString()} au ${new Date(
                  item?.dateFin
                ).toLocaleDateString()}`
              }}
            </h6>
            <p class="text-start ms-2" v-if="item?.experience">
              {{ item?.experience }}
            </p>
          </div>
        </div>
        <div class="d-flex">
          <button class="btn bg-warning" @click="changeValueForshowModalExperience">
            {{ texte1 }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="conteneur_evaluation_experience"
      v-if="timetable_for_student?.etoiles.length"
    >
      <p class="text-left evaluation_avis">
        <span> ( {{ timetable_for_student?.etoiles.length }} ){{ texte2 }}</span>
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
              <div>
                <p v-if="item?.entreprise">
                  <span>Noter par : </span>
                  <span
                    style="
                      margin: 0;
                      padding: 0;
                      font-size: 1.2em;
                    "
                  >
                    {{ item?.entreprise?.nom }}
                  </span>
                </p>
                <vue3starRatings
                  v-model="item.notes"
                  :showControl="false"
                  :starSize="'13'"
                  :disableClick="true"
                />
              </div>

              <h4 style="text-align:left;">{{ item?.avis }}</h4>
            </div>
          </a-carousel>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
:deep(.stars){
  margin:0 0 1em 0 !important;
}
:deep(.vue3-star-ratings__wrapper) {
  padding: 0 !important;
}
.card {
  margin-bottom: 0px;
  border: none;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 15px;
  box-shadow: 1px 6px 6px 6px rgb(28 28 28 / 7%);
  padding: 2em 3em;
  background: white;
}
.mt-5 {
  margin-top: 101px !important;
}
input,
textarea {
  width: 100%;
  border-radius: 10px;
  padding: 0 1em;
}

textarea {
  border: 2px solid orange;
  border-radius: 5px;
}

.conteneur_editor {
  border: 1px solid orange;
  color: black !important;
  padding: 0 1em;
  border-radius: 5px;
}
.add_nouvelle_experience {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.338);
  display: flex;
  place-items: center;
  justify-content: center;
}
.conteneur_nouvelle_experience {
  width: 60%;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  position: relative;
  border-radius: 5px;
}
.conteneur_nouvelle_experience form {
  padding: 1em;
  margin-top: 5em;
}

.bi-x-lg {
  position: absolute;
  right: 1em;
  color: crimson;
  font-weight: bold;
  font-size: 1.5em;
  cursor: pointer;
}
.rond {
  width: 20px;
  height: 20px;
  background: #ff8819;
  border-radius: 10px;
  left: -1.6em;
  top: 0;
}
.bi-plus-lg {
  right: 0;
  top: 0;
  font-size: 1.5em;
  cursor: pointer;
}
.bi-trash3 {
  right: 0;
  top: 0;
  cursor: pointer;
}
.bi-pencil {
  right: 1.7em;
  top: 0;
  cursor: pointer;
}
ul {
  list-style-type: disc;
}
.my-custom-paragraph {
  text-align: left !important;
  color: black;
}
.contenteur_experience {
  padding: 0.5em 0;
}

.proof_experience {
  position: absolute;
  right: 9em;
  top: 0;
  border: 2px solid black;
  width: 150px;
  height: 150px;
}

.experiences::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100%;
  background: rgb(122, 121, 121);
  left: 0;
}
.conteneur_experience,
.conteneur_competences {
  background: white;
}
.conteneur_experience {
  padding: 1em;
  border-radius: 1rem;
}
#content_competences {
  background: white;
  height: auto;
}
.delete_article {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.342);
  display: flex;
  place-items: center;
  justify-content: center;
}

.Myspinner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  display: flex;
  place-items: center;
  justify-content: center;
  border-radius: 10px;
}
#cont_table_competence {
  margin-top: 1.5em;
}
.position-absolute {
  position: absolute;
}
.position-relative {
  position: relative;
}
.text-start,
label {
  text-align: left;
}
.fw-bold,
label {
  font-weight: bold;
  color: black;
}
.profile-greeting .greeting-user .btn:hover {
  background: #6362e7 !important;
  color: white !important;
}
.table,
tr,
th,
td {
  border: 1px solid black !important;
  text-align: center;
}
.conteneur-experience {
  position: fixed;
  background: rgb(255, 255, 255);
  z-index: 12;
  width: inherit;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.297);
}
p {
  font-size: 1em !important;
}

.conteneur-stars_avis {
  display: flex;
  gap: 1em;
  align-items: center;
}
.evaluation_avis {
  margin-left: 0.5em;
  /* width: 160px; */
  padding: 0.5em;
  font-weight:bold;
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
  height: 100%;
}
:deep(.slick-slide) {
  text-align: center;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  padding: 1em;
  background: rgb(94, 94, 94) !important;
  color: rgb(194, 194, 194) !important;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: orange;
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


.section_experience_evaluation .conteneur_section_experience {
  flex: 2 2 300px;
}
.section_experience_evaluation .conteneur_evaluation_experience {
  flex: 1 1 300px;
  margin-bottom:18em;
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
@media (max-width:780px) {
  .section_experience_evaluation .conteneur_evaluation_experience {
  margin-bottom:10em;
}
}
</style>
