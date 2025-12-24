<script>
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../../../../../Shared/Utils";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
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
      texte96: "",
      open: true,
      configUtils: configUtils,
      SWALPOPUP: useSwalPopup(),
      formState: {
        titreCv: "",
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
        bio: "",
        photo_profil: null,
        uploadPhotoProfil: [],
        countryCode: "+225",
      },
      verifChiffre: /[!@#$%^&*(),.?":{}|<>_-]/,
      competences: [],
      isVisibleModal: false,
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    addPhotoInArray(allPhotos) {
      const element = [];
      allPhotos.forEach((item) => {
        element.push(item.originFileObj);
      });
      return element;
    },
    onFinish(values) {
      console.log("Success:", values);
      if (this.formState.uploadPhotoProfil.length) {
        this.formState.photo_profil = this.formState.uploadPhotoProfil[0].originFileObj;
      }

      if (this.configUtils.isValidEmail(this.formState.email)) {
        if (this.formState.upload.length) {
          this.formState.photo = this.addPhotoInArray(this.formState.upload);

          this.changeValueIsPolitics({
            value: true,
            infoUser: "talents",
            payload: this.formState,
          });
        } else {
          this.SWALPOPUP.declencheSwalPopup("info", "Ajouter votre carte étudiant.");
        }
      } else {
        this.SWALPOPUP.declencheSwalPopup("info", "Ajouter un email correct");
      }
    },
    onFinishFailed(errorInfo) {
      console.log("Failed25:", errorInfo);
      Swal.fire({
        icon: "warning",
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
    handleChangeCardStudent(value) {
      console.log(value[0]);
      // this.formState.photo = value[0].originFileObj;
    },
    handleChangePhotoProfil(value) {
      console.log("handleChangePhotoProfil", value);
    },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),
  },
  async created() {
    this.getCompetences();
    this.texte = await this.handleTranslate("Nom");
    this.texte1 = await this.handleTranslate("Prénoms");
    this.texte2 = await this.handleTranslate("Contact");
    this.texte3 = await this.handleTranslate("Ville");
    this.texte4 = await this.handleTranslate("Commune");
    this.texte5 = await this.handleTranslate("Quartier");
    this.texte6 = await this.handleTranslate("Email");
    this.texte7 = await this.handleTranslate("Compétences (Choix multiple)");
    this.texte8 = await this.handleTranslate("Dernier diplôme academique");
    this.texte9 = await this.handleTranslate("Carte étudiant (jpg,pdf,png,webp)");
    this.texte10 = await this.handleTranslate("Mot de passe");
    this.texte11 = await this.handleTranslate("S'inscrire");
    this.texte12 = await this.handleTranslate("Veuillez renseigner votre mot de passe!");
    this.texte13 = await this.handleTranslate("Veuillez renseigner votre Diplôme!");
    this.texte14 = await this.handleTranslate("Veuillez renseigner votre email!");
    this.texte15 = await this.handleTranslate("Veuillez renseigner votre Contact!");
    this.texte16 = await this.handleTranslate("Veuillez renseigner vos Prénoms!");
    this.texte17 = await this.handleTranslate("Veuillez renseigner votre nom!");
    this.texte18 = await this.handleTranslate("Veuillez renseigner la ville");
    this.texte19 = await this.handleTranslate("Veuillez renseigner la commune");
    this.texte96 = await this.handleTranslate("Veuillez ajouter une carte étudiant.");
  },
};
</script>
<template>
  <Politics v-if="isPolitics" />
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      :label="texte"
      name="nom"
      :rules="[{ required: true, message: texte17 }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      :label="texte1"
      name="prenoms"
      :rules="[{ required: true, message: texte16 }]"
    >
      <a-input v-model:value="formState.prenoms" />
    </a-form-item>

    <a-form-item
      :label="texte2"
      name="phone"
      :rules="[{ required: true, message: texte15 }]"
    >
      <a-input type="number" :maxlength="10" v-model:value="formState.phone" />
    </a-form-item>
    <a-form-item :label="texte3" name="ville">
      <a-input v-model:value="formState.ville" />
    </a-form-item>
    <a-form-item :label="texte4" name="commune">
      <a-input v-model:value="formState.commune" />
    </a-form-item>
    <a-form-item :label="texte5" name="quartier">
      <a-input v-model:value="formState.quartier" />
    </a-form-item>

    <a-form-item
      :label="texte6"
      name="email"
      :rules="[{ required: true, message: texte14 }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item :label="texte7" name="Compétences">
      <VueMultiselect
        v-model="formState.myCompetence"
        :options="allCompetences"
        :multiple="true"
        :taggable="true"
        :tag="handleCompetence"
        @update:model-value="handleCompetence"
        label="competence"
        track-by="competence"
        placeholder="Sélectionnez vos compétences (Choix multiple)"
        class="vuemulti"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
      >
      </VueMultiselect>
    </a-form-item>
    <a-form-item
      :label="texte8"
      name="diplome"
      :rules="[{ required: true, message: texte13 }]"
    >
      <a-input type="text" v-model:value="formState.diplome" />
    </a-form-item>
    <a-form-item
      label="Titre du CV (ex. : Développeur Web, Designer UX, etc.)"
      name="titreCv"
    >
      <a-input type="text" v-model:value="formState.titreCv" />
    </a-form-item>

    <a-form-item label="Bio (max 300 caractères)">
      <a-textarea
        :rows="4"
        v-model:value="formState.bio"
        :maxlength="300"
        placeholder="Présentez-vous en quelques lignes..."
      />
    </a-form-item>
    <a-form-item name="uploadPhotoProfil" label="Photo de profil (jpg,png,webp)">
      <a-upload
        @change="handleChangePhotoProfil"
        v-model:fileList="formState.uploadPhotoProfil"
        name="uploadPhotoProfil"
        list-type="picture"
        :multiple="true"
        :maxCount="1"
        accept=".jpg,.jpeg,.png,.webp"
      >
        <a-button> Clique pour charger </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item
      :rules="[{ required: true, message: texte96 }]"
      name="upload"
      :label="texte9"
    >
      <a-upload
        @change="handleChangeCardStudent"
        v-model:fileList="formState.upload"
        name="upload"
        list-type="picture"
        :multiple="true"
        :maxCount="2"
        accept=".jpg,.pdf,.png,.webp"
      >
        <a-button> Clique pour charger </a-button>
      </a-upload>
    </a-form-item>

    <a-form-item
      :label="texte10"
      name="password"
      :rules="[{ required: true, message: texte12 }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          {{ texte11 }}</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>
<style scoped>
:deep(.multiselect__tag) {
  background: orange;
}
</style>
<style
  src="../../../../../../node_modules/vue-multiselect/dist/vue-multiselect.css"
></style>
