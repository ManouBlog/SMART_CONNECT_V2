<script>
import { mapActions, mapState } from "pinia";
import { lienPhoto } from "../../../api/api";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useModalExperienceStore } from "../../../store-pinia/ModalExperience/useModalExperienceStore";
export default {
  name: "CardOtherExperience",
  props: { experiences: { type: Array } },
  data() {
    return {
      lienPhoto: lienPhoto,
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
  computed: { ...mapState(useModalExperienceStore, ["showModalExperience"]) },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useModalExperienceStore, ["changeValueForshowModalExperience"]),
  },
  async created() {
    this.texte = await this.handleTranslate("Expériences");

  },
};
</script>
<template>
  <a-modal
    :footer="null"
    v-model:open="showModalExperience"
    @cancel="changeValueForshowModalExperience"
    @ok="changeValueForshowModalExperience"
  >
    <h1 class="text-center" style="color: orange">{{texte}}</h1>
    <div
      class="experiences position-relative px-4 pb-5 my-4"
      v-for="(item, index) in experiences"
      :key="index"
    >
      <div class="rond position-absolute"></div>
      <div class="contenteur_experience">
        <div class="proof_experience" v-if="item.proof">
          <n-image width="100" :src="lienPhoto + item.proof" />
        </div>
        <h3 class="text-start">
          {{ item?.entreprise }}
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
  </a-modal>
</template>
<style scoped>
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
  font-size: 1.2em;
  cursor: pointer;
}
.rond {
  width: 20px;
  height: 20px;
  background: #ff8819;
  border-radius: 10px;
  left: -0.6em;
  top: 0;
}
.bi-plus-lg {
  right: 0;
  top: 0;
  font-size: 1.2em;
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
label,
h4 {
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
</style>
