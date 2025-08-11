<script>
import RegsiterStudents from "./features/students/RegsiterStudents.vue";
import RegsiterEntreprise from "./features/Entreprises/RegsiterEntreprise.vue";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
export default {
  name: "RegisterView",
  components: {
    RegsiterStudents,
    RegsiterEntreprise
  },
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
      texte11:"",
      texte12:"",
      texte13:"",
      texte14:"",
      open: true,
      value1: "student",
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    onFinish(values) {
      console.log("Success:", values);
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
    handleChange(value){
      console.log("HANDLECHANGE",value)
    }
  },
  async created() {
    this.texte = await this.handleTranslate("Sélectionner un statut");
    this.texte1 = await this.handleTranslate(
      "Etudiant"
    );
    this.texte2 = await this.handleTranslate("Entreprise");

  },
};
</script>
<template>
  <a-form
    :layout="'vertical'"
    name="basic"
  >
    <div>
      <span class="fw-bold">{{texte}}</span>
      <a-select
        ref="select"
        v-model:value="value1"
        style="width: 100%; padding: 0; margin-top: 0.5em; margin-bottom: 0.5em"
        :size="'large'"
        @change="handleChange"
      >
        <a-select-option value="student">{{texte1}}</a-select-option>
        <a-select-option value="entreprise">{{texte2}}</a-select-option>
        <!-- <a-select-option value="particulier">Particulier</a-select-option> -->
      </a-select>
    </div>
    <RegsiterStudents v-if="value1 === 'student'" />
    <RegsiterEntreprise v-if="value1 === 'entreprise'" />
  </a-form>
</template>
