<!-- <script>
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
      westAfricaCodes: [
        { label: "Bénin", value: "+229" },
        { label: "Burkina Faso", value: "+226" },
        { label: "Cap-Vert", value: "+238" },
        { label: "Côte d’Ivoire", value: "+225" },
        { label: "Gambie", value: "+220" },
        { label: "Ghana", value: "+233" },
        { label: "Guinée", value: "+224" },
        { label: "Guinée-Bissau", value: "+245" },
        { label: "Liberia", value: "+231" },
        { label: "Mali", value: "+223" },
        { label: "Niger", value: "+227" },
        { label: "Nigeria", value: "+234" },
        { label: "Sénégal", value: "+221" },
        { label: "Sierra Leone", value: "+232" },
        { label: "Togo", value: "+228" },
      ],
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
    this.texte2 = await this.handleTranslate("Contact Téléphonique");
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
      <a-input v-model:value="formState.nom"  placeholder="Entrez votre nom" />
    </a-form-item>
    <a-form-item
      :label="texte1"
      name="prenoms"
      :rules="[{ required: true, message: texte16 }]"
    >
      <a-input v-model:value="formState.prenoms"  placeholder="Entrez vos prénoms" />
    </a-form-item>
     <a-form-item
      :label="texte2"
      name="phone"
      :rules="[{ required: true, message: texte15 }]"
    >
      <a-input
        type="tel"
        v-model:value="formState.phone"
        placeholder="Entrez votre numéro téléphonique"
      >
        <template #addonBefore>
          <a-select
            v-model:value="formState.countryCode"
            :options="westAfricaCodes"
            show-search
            option-filter-prop="label"
            option-label-prop="value"
            style="width: 120px"
          />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="texte3" name="ville">
      <a-input v-model:value="formState.ville"  placeholder="Entrez votre ville" />
    </a-form-item>
    <a-form-item :label="texte4" name="commune">
      <a-input v-model:value="formState.commune"  placeholder="Entrez votre commune" />
    </a-form-item>
    <a-form-item :label="texte5" name="quartier">
      <a-input v-model:value="formState.quartier"  placeholder="Entrez votre quartier" />
    </a-form-item>

    <a-form-item
      :label="texte6"
      name="email"
      :rules="[{ required: true, message: texte14 }]"
    >
      <a-input v-model:value="formState.email"  placeholder="Entrez votre adresse mail" />
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
      <a-input type="text" v-model:value="formState.diplome"  placeholder="Entrez votre dernier diplôme academique" />
    </a-form-item>
    <a-form-item
      label="Mon Profil (ex. : Développeur Web, Designer UX, etc.)"
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
      <a-input-password v-model:value="formState.password" placeholder="Entrez votre mot de passe"  />
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
></style> -->
<script>
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../../../../../Shared/Utils";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import CreateDisponibilite from "./CreateDisponibilite.vue";

export default {
  name: "RegsiterStudents",
  components: { VueMultiselect, Politics, CreateDisponibilite },
  data() {
    return {
      availabilityDates: [],
      startTime: null,
      endTime: null,
      currentStep: 0, // 👈 ajout
      texte: "",
      texte1: "",
      texte2: "",
      texte3: "",
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

      configUtils,
      SWALPOPUP: useSwalPopup(),

      westAfricaCodes: [
        { label: "Bénin", value: "+229" },
        { label: "Burkina Faso", value: "+226" },
        { label: "Côte d’Ivoire", value: "+225" },
        { label: "Ghana", value: "+233" },
        { label: "Sénégal", value: "+221" },
      ],
      formState: {
        titreCv: "",
        nom: "",
        prenoms: "",
        phone: "",
        ville: "",
        commune: "",
        quartier: "",
        diplome: "",
        myCompetence: [],
        photo: null,
        upload: [],
        bio: "",
        photo_profil: null,
        uploadPhotoProfil: [],
        email: "",
        password: "",
        countryCode: "+225",
        // datesOfCalendar:[],
        // handleHoraire:"",
        // dateTime_debut:null,
        // dateTime_fin:null,
        // First_heure_start_from:null,
        // First_heure_end_to:null,
        // Second_heure_start_from:null,
        // Second_heure_end_to:null
      },
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
    requiredFieldsByStep() {
      return {
        0: ["nom", "prenoms", "phone", "email"],
        1: ["diplome", "myCompetence"],
        2: ["upload", "password"],
      };
    },
    isCurrentStepValid() {
      const fields = this.requiredFieldsByStep[this.currentStep] || [];

      return fields.every((field) => {
        const value = this.formState[field];

        if (Array.isArray(value)) {
          return value.length > 0;
        }

        return value !== null && value !== undefined && value !== "";
      });
    },
  },

  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),

    nextStep() {
      if (this.currentStep >= 3) return;

      // validation sauf pour le step Disponibilités
      if (this.currentStep !== 2 && !this.isCurrentStepValid) {
        this.SWALPOPUP.declencheSwalPopup(
          "warning",
          "Veuillez remplir les champs requis avant de continuer"
        );
        return;
      }

      this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },

    // nextStep() {
    //   this.currentStep++;
    //   console.log("DISPONIBILITE",{
    //     datesOfCalendar:this.$store.state.handleHoraire !== 'Periode' ? this.$store.state.datesOfCalendar:[],
    //     handleHoraire:this.$store.state.handleHoraire,
    //     dateTime_debut:this.$store.state.handleHoraire === 'Periode' ? this.$store.state.dateTime_debut:null,
    //     dateTime_fin:this.$store.state.handleHoraire === 'Periode' ? this.$store.state.dateTime_fin:null,
    //     First_heure_start_from:this.$store.state.handleHoraire !== 'Periode' ? this.$store.state.First_heure_start_from:null,
    //     First_heure_end_to:this.$store.state.handleHoraire !== 'Periode' ? this.$store.state.First_heure_end_to:null,
    //     Second_heure_start_from:this.$store.state.handleHoraire !== 'Periode' ? this.$store.state.Second_heure_start_from:null,
    //     Second_heure_end_to:this.$store.state.handleHoraire !== 'Periode' ? this.$store.state.Second_heure_end_to:null
    //   })
    // },
    // prevStep() {
    //   this.currentStep--;
    // },

    addPhotoInArray(allPhotos) {
      return allPhotos.map((item) => item.originFileObj);
    },

    onFinish() {
      if (this.formState.uploadPhotoProfil.length) {
        this.formState.photo_profil = this.formState.uploadPhotoProfil[0].originFileObj;
      }

      if (this.configUtils.isValidEmail(this.formState.email)) {
        if (this.formState.upload.length) {
          this.formState.photo = this.addPhotoInArray(this.formState.upload);

          if (this.$store.state.handleHoraire !== "Periode") {
            const TOTALHOURHORAIRE = 0;
            const FIRST_HORRAIRE =
              this.$store.state.First_heure_start_from +
              "-" +
              this.$store.state.First_heure_end_to;
            let SECOND_HORRAIRE = null;
            if (this.$store.state.Second_heure_start_from) {
              SECOND_HORRAIRE =
                this.$store.state.Second_heure_start_from +
                "-" +
                this.$store.state.Second_heure_end_to;
            }
            this.formState.jour =
              this.$store.state.handleHoraire !== "Periode"
                ? this.$store.state.datesOfCalendar
                : [];
            this.formState.periode = 0;
            this.formState.First_horaire = FIRST_HORRAIRE;
            this.formState.Second_horaire = SECOND_HORRAIRE;
            this.formState.totalHour = TOTALHOURHORAIRE;
          } else {
            console.log("fhf");
            console.log("DISPONIBILITE", {
              dateTime_debut:
                this.$store.state.handleHoraire === "Periode"
                  ? this.$store.state.dateTime_debut
                  : null,
              dateTime_fin:
                this.$store.state.handleHoraire === "Periode"
                  ? this.$store.state.dateTime_fin
                  : null,
            });
            this.formState.jour = [
              this.$store.state.dateTime_debut.split("T")[0] +
                " A " +
                this.$store.state.dateTime_fin.split("T")[0],
            ];
            this.formState.First_horaire = this.$store.state.dateTime_debut.split("T")[1] + "-" + this.$store.state.dateTime_fin.split("T")[1];
            this.formState.hour_periode_debut = this.$store.state.dateTime_debut.split("T")[1];
            this.formState.hour_periode_fin = this.$store.state.dateTime_fin.split("T")[1];
            this.formState.periode = 1;
             this.formState.periode_debut = this.$store.state.dateTime_debut.split("T")[0];
             this.formState.periode_fin = this.$store.state.dateTime_fin.split("T")[0];
            this.formState.totalHour = 0;
            
          }
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

    onFinishFailed() {
      Swal.fire({
        icon: "warning",
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
  },

  async created() {
    this.getCompetences();
    this.texte = await this.handleTranslate("Nom");
    this.texte1 = await this.handleTranslate("Prénoms");
    this.texte2 = await this.handleTranslate("Contact Téléphonique");
    this.texte3 = await this.handleTranslate("Ville");
    this.texte4 = await this.handleTranslate("Commune");
    this.texte5 = await this.handleTranslate("Quartier");
    this.texte6 = await this.handleTranslate("Email");
    this.texte7 = await this.handleTranslate("Compétences");
    this.texte8 = await this.handleTranslate("Dernier diplôme academique");
    this.texte9 = await this.handleTranslate("Carte étudiant");
    this.texte10 = await this.handleTranslate("Mot de passe");
    this.texte11 = await this.handleTranslate("S'inscrire");
    this.texte12 = await this.handleTranslate("Mot de passe requis");
    this.texte13 = await this.handleTranslate("Diplôme requis");
    this.texte14 = await this.handleTranslate("Email requis");
    this.texte15 = await this.handleTranslate("Téléphone requis");
    this.texte16 = await this.handleTranslate("Prénoms requis");
    this.texte17 = await this.handleTranslate("Nom requis");
    this.texte96 = await this.handleTranslate("Carte étudiant requise");
  },
};
</script>
<template>
  <Politics v-if="isPolitics" />

  <a-steps :current="currentStep" class="mb-4">
    <a-step
      title="Informations personnelles"
      description="Renseignez vos informations de base pour créer votre compte."
    />
    <a-step
      title="Profil & compétences"
      description="Décrivez votre parcours et sélectionnez vos compétences."
    />
    <a-step
      title="Disponibilités"
      description="Indiquez vos créneaux horaires et les périodes où vous êtes disponible."
    />
    <a-step
      title="Validation finale"
      description="Ajoutez vos documents et confirmez votre inscription."
    />
  </a-steps>

  <a-form
    layout="vertical"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <!-- STEP 1 -->
    <div v-show="currentStep === 0">
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
        <a-input v-model:value="formState.phone">
          <template #addonBefore>
            <a-select v-model:value="formState.countryCode" :options="westAfricaCodes" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        :label="texte6"
        name="email"
        :rules="[{ required: true, message: texte14 }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>
    </div>

    <!-- STEP 2 -->
    <div v-show="currentStep === 1">
      <a-form-item
        :label="texte7"
        :rules="[{ required: true, message: 'Ajoutez au moins une compétence' }]"
      >
        <VueMultiselect
          v-model="formState.myCompetence"
          :options="allCompetences"
          :multiple="true"
          label="competence"
          track-by="competence"
        />
      </a-form-item>

      <a-form-item
        :label="texte8"
        name="diplome"
        :rules="[{ required: true, message: texte13 }]"
      >
        <a-input v-model:value="formState.diplome" />
      </a-form-item>

      <a-form-item label="Bio">
        <a-textarea v-model:value="formState.bio" :maxlength="300" />
      </a-form-item>
    </div>

    <!-- STEP 3 -->
    <div v-show="currentStep === 2">
      <CreateDisponibilite />
    </div>

    <!-- STEP 4 -->
    <div v-show="currentStep === 3">
      <a-form-item name="uploadPhotoProfil" label="Photo de profil">
        <a-upload v-model:fileList="formState.uploadPhotoProfil" :maxCount="1">
          <a-button> Clique pour charger </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item
        name="upload"
        :label="texte9"
        :rules="[{ required: true, message: texte96 }]"
      >
        <a-upload v-model:fileList="formState.upload" :maxCount="2">
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
    </div>

    <!-- NAVIGATION -->
    <div class="d-flex justify-content-between" style="padding: 1.5em">
      <a-button v-if="currentStep > 0" @click="prevStep"> Précédent </a-button>

      <a-button
        v-if="currentStep < 3"
        type="primary"
        @click.prevent="nextStep"
        :disabled="currentStep !== 2 && !isCurrentStepValid"
      >
        Suivant
      </a-button>

      <a-button
        v-if="currentStep === 3"
        type="primary"
        html-type="submit"
        :disabled="!isCurrentStepValid"
      >
        {{ texte11 }}
      </a-button>
    </div>
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
