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
import instance from "../../../api/api";
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
      value1 :"Etudiant",
      isMobile:false,
      options : [
  // { value: "student", label: "Étudiant" },
  // { value: "professionnels", label: "Professionnel" },
  // { value: "artisans", label: "Artisan" },
  // { value: "vétérans", label: "Vétéran" },
  // { value: "particulier", label: "Particulier" },
  // { value: "entreprise", label: "Entreprise" },
],
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
      selectedOption:"",
      descriptions: {
      Etudiant: "Cette étape est réservée aux étudiants qui souhaitent acquérir une expérience de travail.",
      Entreprise: "Cette étape est destinée aux entreprises qui souhaitent recruter.",
      Particulier: "Cette étape concerne les particuliers qui souhaitent recruter des artisans et professionnels.",
      Professionnel: "Cette étape est réservée aux diplômés et consultants, qu’ils soient en activité ou sans emploi.",
      Artisan: "Cette étape concerne les artisans qui souhaitent promouvoir leur savoir‑faire.",
      Veteran: "Cette étape est exclusivement réservée aux retraités disposant de compétences expertes."
    },
    };
  },
  watch: {
    value1(newVal) {
      console.log(newVal)
      const found = this.options.find(
        item => item.statut === newVal
      );

      if (found) {
        this.selectedOption = found;
      } else {
        this.selectedOption = null;
      }
    }
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    onFinish(values) {
      console.log("Success:", values);
    },
    onHandleFailed(errorInfo) {
      console.log("Failed:", errorInfo);
      Swal.fire({
        icon: "warning",
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
     handleResize() {
      this.isMobile = window.innerWidth < 768;
    },

    handleChange(val) {
      console.log(val);
    },
    async lister_statut(){
      try {
        const response =  await instance.get("listStatut")
        this.options = response.data.data.filter(item=>item.statut !== 'admin')
        console.log("this.allStatuts",response.data.data)
      } catch (error) {
        console.log(error);
      }
    },
  },
   mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  async created() {
    await this.lister_statut()
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
    <p class="fw-bold text-center" style="font-size: 1.em;">{{ texte0 }}</p>

    <!-- MOBILE -->
    <a-select
      v-if="isMobile"
      v-model:value="value1"
      style="width: 100%; margin-top: 0.5em; margin-bottom: 1.5em"
      size="large"
      @change="handleChange"
    >
      <a-select-option
        v-for="item in options"
        :key="item.statut"
        :value="item.statut"
        style="text-transform: capitalize;"
      >
        {{ item.statut }}
      </a-select-option>
    </a-select>

    <!-- DESKTOP -->
    <a-radio-group
      v-else
      v-model:value="value1"
      option-type="button"
      button-style="solid"
      style="display: flex; flex-wrap: wrap; justify-content:center;gap: 10px; margin-top: 0.5em; margin-bottom: 1.5em"
      @change="handleChange"
    >
      <a-radio-button
        v-for="item in options"
        :key="item.statut"
        :value="item.statut"
        style="text-transform: capitalize;"
      >
        {{ item.statut }}
      </a-radio-button>
    </a-radio-group>

    <div style="padding: 0.5em 0; text-align: center; color: gray; font-weight: bold;">
      {{ descriptions[value1] }}
    </div>
  </div>
    <RegsiterStudents 
    :idStatutChoice="selectedOption"
    v-if="value1 === 'Etudiant'" />
    <RegsiterEntreprise v-if="value1 === 'Entreprise'" />
    <RegisterProfessionels v-if="value1 === 'Professionnel'"  />
    <RegisterParticulier v-if="value1 === 'Particulier'" />
    <RegisterArtisans  v-if="value1 === 'Artisan'"  />
    <RegisterVeterans  v-if="value1 === 'Veteran'"  />
  </a-form>
</template>
