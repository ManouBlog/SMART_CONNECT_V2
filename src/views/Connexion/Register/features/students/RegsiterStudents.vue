<script>
import VueMultiselect from "vue-multiselect";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../../../../../Shared/Utils";
import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";

export default {
  name: "RegsiterStudents",
  components: {
    VueMultiselect,
    Politics,
  },
  data() {
    return {
      open: true,
      configUtils: configUtils,
      SWALPOPUP: useSwalPopup(),
      formState: {
        nom: "",
        prenoms: "",
        phone: "",
        ville: "",
        commune: "",
        quartier: "",
        diplome: "",
        carte_student: "",
        myCompetence: [],
        photo: null,
        upload: [],
      },
      verifChiffre: /[!@#$%^&*(),.?":{}|<>_-]/,
      competences: [],
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
  },
  methods: {
    onFinish(values) {
      console.log("Success:", values);
      console.log("formState", this.formState);
      if (this.configUtils.isValidPhoneNumber(this.formState.phone)) {
  if(this.configUtils.isValidEmail(this.formState.email)){
    if(this.formState.upload.length){
      this.formState.photo = this.formState.upload[0].originFileObj;
      this.changeValueIsPolitics(true);
    }else{
      this.SWALPOPUP.declencheSwalPopup("info", 
    "Ajouter votre carte etudiante ou une preuve");
    }
  }else{
    this.SWALPOPUP.declencheSwalPopup("info", 
    "Ajouter un email correct");
  }
      }else{
        this.SWALPOPUP.declencheSwalPopup("info", 
        "Votre numéro de telephone doit etre de 10 chiffres");
      }

    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
    handleChangeCardStudent(value) {
      console.log(value[0]);
      // this.formState.photo = value[0].originFileObj;
    },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),
  },
  created() {
    this.getCompetences();
  },
};
</script>
<template>
  <Politics v-if="isPolitics" :payload="this.formState" />
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Nom"
      name="nom"
      :rules="[{ required: true, message: 'Veuillez renseigner votre nom!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      label="Prénoms"
      name="prenoms"
      :rules="[{ required: true, message: 'Veuillez renseigner vos Prénoms!' }]"
    >
      <a-input v-model:value="formState.prenoms" />
    </a-form-item>

    <a-form-item
      label="Contact"
      name="phone"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Contact!' }]"
    >
      <a-input type="number" :maxlength="10" v-model:value="formState.phone" />
    </a-form-item>
    <a-form-item label="Ville" name="ville">
      <a-input v-model:value="formState.ville" />
    </a-form-item>
    <a-form-item label="Commune" name="commune">
      <a-input v-model:value="formState.commune" />
    </a-form-item>
    <a-form-item label="Quartier" name="quartier">
      <a-input v-model:value="formState.quartier" />
    </a-form-item>

    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Veuillez renseigner votre email!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item label="Compétences" name="Compétences">
      <VueMultiselect
        v-model="formState.myCompetence"
        :options="allCompetences"
        :multiple="true"
        :taggable="true"
        :tag="handleCompetence"
        @update:model-value="handleCompetence"
        label="competence"
        track-by="competence"
        class="vuemulti"
      >
      </VueMultiselect>
    </a-form-item>
    <a-form-item
      label="Diplôme"
      name="diplome"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Diplôme!' }]"
    >
      <a-input type="text" v-model:value="formState.diplome" />
    </a-form-item>
    <a-form-item name="Carte étudiante" label="Carte étudiante">
      <a-upload
        @change="handleChangeCardStudent"
        v-model:fileList="formState.upload"
        name="logo"
        list-type="picture"
      >
        <a-button> Click to upload </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item
      label="Mot de passe"
      name="password"
      :rules="[{ required: true, message: 'Veuillez renseigner votre mot de passe!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <!-- <a-form-item>
      <h5 style="margin: 1em 0">Votre mot de passe doit contenir:</h5>
      <ul style="padding: 0 2em">
        <li>
          <span class="d-block password_length"
            >Au moins 8 caractères
            <i
              v-if="formState.password && formState.password.length > 8"
              class="bi bi-check-lg"
            ></i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Une lettre majuscule
            <i
              v-if="formState.password && /[A-Z]/.test(formState.password)"
              class="bi bi-check-lg"
            ></i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Une lettre miniscule
            <i
              v-if="formState.password && /[a-z]/.test(formState.password)"
              class="bi bi-check-lg"
            ></i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Un chiffre
            <i v-if="/\d/.test(formState.password)" class="bi bi-check-lg"> </i>
          </span>
        </li>
        <li>
          <span class="d-block password_length"
            >Un caractère spécial
            <i v-if="verifChiffre.test(formState.password)" class="bi bi-check-lg"></i>
          </span>
        </li>
      </ul>
    </a-form-item> -->
    <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item> -->
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          S'inscrire</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>
<style
  src="../../../../../../node_modules/vue-multiselect/dist/vue-multiselect.css"
></style>
