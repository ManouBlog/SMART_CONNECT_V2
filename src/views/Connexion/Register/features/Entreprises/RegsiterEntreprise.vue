<script>
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
export default {
  name: "RegsiterEntreprise",
  components: {
    Politics,
  },
  data() {
    return {
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
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
    handleChangeCardStudent(value) {
      console.log(value.file.originFileObj);
    },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
    }),
  },
  created() {
    this.getCompetences();
  },
};
</script>
<template>
  <Politics v-if="isPolitics" :registreUser="inscriptionUser" :status="status" />
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Entreprise"
      name="nom"
      :rules="[{ required: true, message: 'Veuillez renseigner votre nom!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      label="Matricule cc"
      name="matricule_cc"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Matricule!' }]"
    >
      <a-input v-model:value="formState.matricule_cc" />
    </a-form-item>
    

    <a-form-item
      label="Numéro de l'entreprise"
      name="contact"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Contact!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      label="Ville"
      name="ville"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Ville!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      label="Commune"
      name="commune"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Commune!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      label="Quartier"
      name="quartier"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Quartier!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>

    <a-form-item
      label="Email de l'entreprise"
      name="email"
      :rules="[{ required: true, message: 'Veuillez renseigner votre email!' }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
  
    <a-form-item
      label="Forme juridique"
      name="juridique"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Forme juridique!' }]"
    >
      <a-input v-model:value="formState.juridique" />
    </a-form-item>
    <a-form-item
      label="Gérant"
      name="gerant"
      :rules="[{ required: true, message: 'Veuillez renseigner votre Gérant!' }]"
    >
      <a-input v-model:value="formState.gerant" />
    </a-form-item>

    <a-form-item
      label="Numéro du Gérant"
      name="Phonegerant"
      :rules="[{ required: true, message: 'Veuillez renseigner le numéro votre Gérant!' }]"
    >
      <a-input v-model:value="formState.Phonegerant" />
    </a-form-item>
    <a-form-item name="Pièce du gérant" label="piece_gerant">
        <a-upload
          @change="handleChangeCardStudent"
          v-model:fileList="formState.piece_gerant"
          name="logo"
          list-type="picture"
        >
          <a-button> Click to upload </a-button>
        </a-upload>
      </a-form-item>
    <a-form-item name="Registre" label="Registre">
        <a-upload
          @change="handleChangeCardStudent"
          v-model:fileList="formState.Registre"
          name="logo"
          list-type="picture"
        >
          <a-button> Click to upload </a-button>
        </a-upload>
      </a-form-item>

    <a-form-item
      label="Mot de passe"
      name="mot de passe"
      :rules="[{ required: true, message: 'Veuillez renseigner votre mot de passe!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
  
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
