<script>
import Swal from "sweetalert2";
import RegsiterStudents from "./features/students/RegsiterStudents.vue";
import RegsiterEntreprise from "./features/Entreprises/RegsiterEntreprise.vue";
import RegisterParticulier from "./features/particulier/RegisterParticulier.vue";
import RegisterArtisans from './features/Artisans/RegisterArtisans.vue'
import RegisterVeterans from './features/Veterans/RegisterVeterans.vue'
import RegisterProfessionels from './features/profesionnels/RegisterProfessionels.vue'
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
export default {
  name: "RegisterView",
  components: {
    RegsiterStudents,
    RegsiterEntreprise,
    RegisterParticulier,
    RegisterProfessionels,
    RegisterArtisans,
    RegisterVeterans
  },
  data() {
    return {
      texte0: "",
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
      open: true,
      value1: "student",
      descriptions: {
      student: "Cette étape est réservée aux étudiants qui souhaitent acquérir une expérience de travail.",
      entreprise: "Cette étape est destinée aux entreprises qui souhaitent recruter.",
      particulier: "Cette étape concerne les particuliers qui souhaitent recruter.",
      professionnels: "Cette étape est réservée aux diplômés et consultants, qu’ils soient en activité ou sans emploi.",
      artisans: "Cette étape concerne les artisans qui souhaitent promouvoir leur savoir‑faire.",
      vétérans: "Cette étape est exclusivement réservée aux retraités disposant de compétences expertes."
    },
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    onFinish(values) {
      console.log("Success:", values);
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
      Swal.fire({
        icon: "warning",
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
    handleChange(value) {
      console.log("HANDLECHANGE", value);
    },
  },
  async created() {
    this.texte0 = await this.handleTranslate("Sélectionner un statut");
    this.texte1 = await this.handleTranslate("Etudiant");
    this.texte2 = await this.handleTranslate("Entreprise");
    this.texte3 = await this.handleTranslate("Particulier");
  },
};
</script>
<template>
  <a-form :layout="'vertical'" name="basic">
    <div style="padding: 0.5em 0; text-align: center; color: red">
      Les champs avec astérisque (*) sont obligatoires
    </div>
    <div>
      <span class="fw-bold">{{ texte0 }}</span>
      <a-select
        ref="select"
        v-model:value="value1"
        style="width: 100%; padding: 0; margin-top: 0.5em; margin-bottom: 1.5em"
        :size="'large'"
        @change="handleChange"
      >
        <a-select-option value="student">{{ texte1 }}</a-select-option>
        <a-select-option value="entreprise">{{ texte2 }}</a-select-option>
        <a-select-option value="particulier">{{ texte3 }}</a-select-option>
         <a-select-option value="professionnels">Professionnels</a-select-option>
          <a-select-option value="artisans">Artisans</a-select-option>
           <a-select-option value="vétérans">Vétérans</a-select-option>
      </a-select>
      <div style="padding: 0.5em 0; text-align: center; color: gray;font-weight: bold;">
      {{ this.descriptions[value1] }}
    </div>
    </div>
    <RegsiterStudents v-if="value1 === 'student'" />
    <RegsiterEntreprise v-if="value1 === 'entreprise'" />
    <RegisterProfessionels v-if="value1 === 'professionnels'"  />
    <RegisterParticulier v-if="value1 === 'particulier'" />
    <RegisterArtisans  v-if="value1 === 'artisans'"  />
    <RegisterVeterans  v-if="value1 === 'vétérans'"  />
  </a-form>
</template>
