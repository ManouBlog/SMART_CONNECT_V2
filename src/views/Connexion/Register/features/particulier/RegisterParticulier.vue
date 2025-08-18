<script>
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
export default {
  name: "RegsiterEntreprise",
  components: {
    Politics,
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
      texte15:"",
      texte16:"",
      texte17:"",
      texte18:"",
      texte19:"",
      texte20:"",
      texte21:"",
      texte22:"",
      texte23:"",
      texte24:"",
      texte25:"",
      texte26:"",
      open: true,
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
        Logo:[],
        password:"",
        myRegister:"",
        myLogo:"",
      },
      verifChiffre: /[!@#$%^&*(),.?":{}|<>_-]/,
      competences: [],
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    onFinish(values) {
      console.log("Success:", values);
      this.changeValueIsPolitics({value:true,infoUser:'particulier',payload:this.formState});
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
    handleChangeCardStudent(value) {
      console.log(value.file.originFileObj);
    },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),
  },
  async created() {
    this.texte = await this.handleTranslate("Nom");
    this.texte1 = await this.handleTranslate(
      "Prénoms"
    );
    this.texte2 = await this.handleTranslate("Numéro de téléphone");
    this.texte3 = await this.handleTranslate("Ville");
    this.texte4 = await this.handleTranslate("Commune");
    this.texte5 = await this.handleTranslate("Quartier");
    this.texte6 = await this.handleTranslate("Email");
    this.texte12 = await this.handleTranslate('Mot de passe');
    this.texte13 = await this.handleTranslate("S'inscrire");
    this.texte14 = await this.handleTranslate('Veuillez renseigner votre mot de passe!');
    this.texte15 = await this.handleTranslate('Veuillez renseigner le numéro votre Gérant!');
    this.texte16 = await this.handleTranslate('Veuillez renseigner votre Gérant!');
    this.texte17 = await this.handleTranslate('Veuillez renseigner votre Forme juridique!');
    this.texte18 = await this.handleTranslate('Veuillez renseigner votre email!');
    this.texte19 = await this.handleTranslate('Veuillez renseigner votre Quartier!');
    this.texte10 = await this.handleTranslate("Ajouter une pièce");
  },
};
</script>
<template>
  <Politics 
  v-if="isPolitics" 
  />
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="on"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      :label="texte"
      name="nom"
      :rules="[{ required: true, message: 'Ajouter votre nom' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      :label="texte1"
      name="prenoms"
      :rules="[{ required: true, message: 'Ajouter vos prénoms' }]"
    >
      <a-input v-model:value="formState.prenoms" />
    </a-form-item>
    <a-form-item
      :label="texte2"
      name="contact"
      :rules="[{ required: true, message: 'Ajouter un contact' }]"
    >
      <a-input v-model:value="formState.contact" />
    </a-form-item>
    <a-form-item
      :label="texte3"
      name="ville"
      :rules="[{ required: true, message: 'Ajouter une ville' }]"
    >
      <a-input v-model:value="formState.ville" />
    </a-form-item>
    <a-form-item
      :label="texte4"
      name="commune"
      :rules="[{ required: true, message: 'Ajouter une commune' }]"
    >
      <a-input v-model:value="formState.commune" />
    </a-form-item>
    <a-form-item
      :label="texte5"
      name="quartier"
    >
      <a-input v-model:value="formState.quartier" />
    </a-form-item>

    <a-form-item
      :label="texte6"
      name="email"
      :rules="[{ required: true, message: 'Ajouter un email' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>
  <a-form-item
     name="piece_gerant"
    :label="texte10"
    :rules="[{ required: true, message: texte10 }]"
    >
        <a-upload
          @change="handleChangeCardStudent"
          v-model:fileList="formState.piece_gerant"
          name="piece_gerant"
          list-type="picture"
          :multiple="false"
          :maxCount="1"
          accept=".jpg,.jpeg,.png,.webp"
        >
          <a-button> Clique pour télécharger </a-button>
        </a-upload>
      </a-form-item>
    
    <a-form-item
      :label="texte12"
      name="password"
      :rules="[{ required: true, message: 'Ajouter un mot de passe' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
  
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          {{texte13}}</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>

