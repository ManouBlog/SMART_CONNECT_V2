<script>
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../../../../../Shared/Utils";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";

import RegisterQualifications from "../students/RegisterQualifications.vue";
// import Tesseract from 'tesseract.js'


export default {
  name: "RegisterArtisans",
  components: { 
    VueMultiselect, 
    Politics,
     RegisterQualifications
  },
  data() {
    return {
       fileList : [],
 loading : false,
 StatutArtisans:[
  { value: "Maitre Artisan", label: "Maitre Artisan" },
  { value: "Artisan", label: "Artisan" }
],
  niveauxEtudes:[
  // Aucun / base
  { value: "aucun", label: "Aucun niveau" },

  // Primaire
  { value: "cepe", label: "CEPE (Certificat d'Études Primaires et Élémentaires)" },

  // Collège
  { value: "6eme", label: "6ème" },
  { value: "5eme", label: "5ème" },
  { value: "4eme", label: "4ème" },
  { value: "3eme", label: "3ème" },
  { value: "bepc", label: "BEPC (Brevet d'Études du Premier Cycle)" },

  // Lycée
  { value: "2nde", label: "Seconde" },
  { value: "1ere", label: "Première" },
  { value: "terminale", label: "Terminale" },
  { value: "bac", label: "BAC" },

  // Professionnel / technique
  { value: "cap", label: "CAP (Certificat d'Aptitude Professionnelle)" },
  { value: "cqp", label: "CQP (Certificat de Qualification Professionnelle)" },
  { value: "bt", label: "BT (Brevet de Technicien)" },
  { value: "bp", label: "BP (Brevet Professionnel)" },
  { value: "bep", label: "BEP (Brevet d'Études Professionnelles)" },
  { value: "bts", label: "BTS (Brevet de Technicien Supérieur)" },
  { value: "dut", label: "DUT (Diplôme Universitaire de Technologie)" },
  { value: "licence_pro", label: "Licence professionnelle" },
  { value: "ingenieur", label: "Diplôme d'ingénieur" },

  // Supérieur général
  { value: "bac+1", label: "BAC+1" },
  { value: "bac+2", label: "BAC+2" },
  { value: "bac+3", label: "BAC+3 (Licence)" },
  { value: "bac+4", label: "BAC+4 (Maîtrise)" },
  { value: "bac+5", label: "BAC+5 (Master)" },
  { value: "bac+6", label: "BAC+6" },
  { value: "bac+7", label: "BAC+7" },
  { value: "doctorat", label: "Doctorat (BAC+8 et plus)" },
],
 rawText : '',
 result : null,
//  SCHOOL_KEYWORDS :[
//   // Carte étudiante (formes tolérantes OCR)
//   'carte etudiant',
//   'carte d etudiant',
//   'carte a etudiant',
//   'carte etudiante',

//   // Étudiant (avec ou sans accents, fautes OCR)
//   'etudiant',
//   'etudiante',
//   'etudant',
//   'etud',

//   // Institution / enseignement
//   'ministere de l enseignement',
//   "ministere de l'enseignement",
//   'enseignement superieur',
//   'ufr',
//   'faculte',
//   'faculté',
//   'ecole',
//   'institut',

//   // Scolarité
//   'filiere',
//   'filiere',
//   'niveau',
//   'licence',
//   'master',
//   'doctorat',

//   // Niveaux courts (attention : à combiner avec d’autres mots)
//   'l1',
//   'l2',
//   'l3',
//   'm1',
//   'm2',

//   // Identifiant
//   'matricule'
// ],
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
      texte909:"",
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
     niveauEtude:"",
     filiere:"",
      configUtils,
      SWALPOPUP: useSwalPopup(),

       westAfricaCodes: [
  { label: "Bénin", value: "+229", length: 8 },
  { label: "Burkina Faso", value: "+226", length: 8 },
  { label: "Cap‑Vert", value: "+238", length: 7 },
  { label: "Côte d’Ivoire", value: "+225", length: 10 },
  { label: "Gambie", value: "+220", length: 7 },
  { label: "Ghana", value: "+233", length: 9 },
  { label: "Guinée", value: "+224", length: 7 },
  { label: "Guinée‑Bissau", value: "+245", length: 9 },
  { label: "Liberia", value: "+231", length: 9 },
  { label: "Mali", value: "+223", length: 8 },
  { label: "Niger", value: "+227", length: 8 },
  { label: "Nigeria", value: "+234", length: 10 },
  { label: "Sénégal", value: "+221", length: 8 },
  { label: "Sierra Leone", value: "+232", length: 8 },
  { label: "Togo", value: "+228", length: 8 },
],
      formState: {
        code_ambassadeur:"",
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
        statut_talent:"",
        statutId:7,
        photo_profil: null,
        uploadPhotoProfil: [],
        email: "",
        password: "",
        countryCode: "+225",
        qualifications: [],
        disponibiliteValid: false,
      },
    };
  },

  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
    isPasswordDisabled() {
    return (
      this.loading ||
      (this.result && this.result.isStudentCard === false)
    )
  },
    // getFirstHeureStartFrom() {
    //   return this.$store.state.First_heure_start_from;
    // },
    // getTableauDays() {
    //   return this.$store.state.datesOfCalendar;
    // },
    // getFirstHeureFinFrom() {
    //   return this.$store.state.First_heure_end_to;
    // },
    isNextDisabled() {
      // STEP 2 – Qualifications
    //   if (this.currentStep === 2) {
    //     // au moins une qualification
    //     if (!this.formState.qualifications.length) {
    //       return true;
    //     }

    //     // chaque qualification doit avoir une date_debut
    //     return this.formState.qualifications.some(
    //       (q) => !q.objet || !q.date_debut || !q.date_fin
    //     );
    //   }


      // Autres steps
      return !this.isCurrentStepValid;
    },

    requiredFieldsByStep() {
      return {
        // STEP 0 – Infos personnelles
        0: ["nom", "prenoms", "phone", "email"],

        // STEP 1 – Profil & compétences
        1: ["myCompetence"],

         // STEP 1 – Profil & compétences
        2: ["niveauEtude","statut_talent"],

        // STEP 4 – Validation finale
        3: ["upload", "password"],
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
    handleQualifications(payload) {
      // console.log("handleQualifications", payload);

      this.formState.qualifications = payload;
    },

    nextStep() {
      console.log("this.currentStep",this.currentStep)
      // console.log("getFirstHeureStartFrom", this.getFirstHeureStartFrom);
    //   if (this.currentStep === 2) {
    //     const invalid = this.formState.qualifications.some((q) => !q.objet);

    //     if (invalid) {
    //       this.SWALPOPUP.declencheSwalPopup(
    //         "warning",
    //         "Chaque qualification doit avoir un titre"
    //       );
    //       return;
    //     }
    //   }

    //     if (this.currentStep === 3) {
    //       console.log("this.currentStep4",this.getFirstHeureStartFrom)
    //     if (!this.getFirstHeureStartFrom || !this.getTableauDays.length) {
    //       this.SWALPOPUP.declencheSwalPopup(
    //         "warning",
    //         "Veuillez remplir les champs obligatoire"
    //       );
    //       return;
    //     }
    //   }

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
    addPhotoInArray(allPhotos) {
      return allPhotos.map((item) => item.originFileObj);
    },
    onUploadChange({ fileList: newList }) {
    console.log('onUploadChange', newList);
    if (!newList.length) return
    this.rawText = ''
    this.result = null
  // console.log()
  // this.runOCR(newList)
},
// async runOCR(files) {
//   this.loading = true
//   let fullText = ''

//   for (const f of files) {
//     const file = f.originFileObj
//     if (!file || !file.type.startsWith('image/')) continue

//     const canvas = await this.preprocessImage(file)
//     const { data } = await Tesseract.recognize(canvas, 'fra')
//     fullText += '\n' + (data.text || '')
//   }

//   this.rawText = this.cleanOCRText(fullText)

//   if (!this.hasReadableText(fullText)) {
//     this.result = {
//       score: 0,
//       isStudentCard: false,
//       reason: 'Aucun texte exploitable détecté'
//     }
//     this.loading = false
//     return
//   }

//   this.analyzeText(fullText)
//   this.loading = false
// },
// hasReadableText(text) {
//   const lettersOnly = text
//     .replace(/\s/g, '')
//     .replace(/[^a-zA-ZÀ-ÿ]/g, '')

//   return lettersOnly.length >= 5
// },
// normalizeText(text) {
//   return text
//     .toLowerCase()
//     .normalize('NFD')              // enlève les accents
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/[^a-z0-9\s]/g, ' ')  // ponctuation OCR bizarre
//     .replace(/\s+/g, ' ')
// },
// analyzeText(text) {
//   const cleanText = this.normalizeText(text)
//   let score = 0

//   if (cleanText.length > 80) score += 20

//   const keywordHits = this.SCHOOL_KEYWORDS.filter(k =>
//     cleanText.includes(k)
//   ).length

//   score += Math.min(keywordHits * 10, 40)

//   if (cleanText.includes('matricule')) score += 20
//   if (cleanText.match(/\b(l[123]|m[12])\b/)) score += 10

//   this.result = {
//     score,
//     isStudentCard: score >= 60
//   }
// },
// cleanOCRText(text) {
//   return text
//     // supprimer caractères parasites fréquents OCR
//     .replace(/[|«»“”]/g, '')
//     .replace(/_{2,}/g, ' ')
//     .replace(/-{2,}/g, ' ')
//     .replace(/\s{2,}/g, ' ')
//     .replace(/\n{2,}/g, '\n')
//     .trim()
// },
// preprocessImage(file) {
//   return new Promise(resolve => {
//     const img = new Image()
//     const reader = new FileReader()

//     reader.onload = () => (img.src = reader.result)

//     img.onload = () => {
//       const canvas = document.createElement('canvas')
//       const ctx = canvas.getContext('2d')

//       canvas.width = img.width
//       canvas.height = img.height

//       ctx.filter = 'grayscale(1) contrast(1.5)'
//       ctx.drawImage(img, 0, 0)

//       resolve(canvas)
//     }

//     reader.readAsDataURL(file)
//   })
// },
    onFinish() {
      console.log("this.formState",this.formState);
      if (this.formState.uploadPhotoProfil.length) {
        this.formState.photo_profil = this.formState.uploadPhotoProfil[0].originFileObj;
      }

      if (this.configUtils.isValidEmail(this.formState.email)) {
        if (this.formState.upload.length) {
          this.formState.photo = this.addPhotoInArray(this.formState.upload);
          console.log("this.formState",this.formState)
          this.changeValueIsPolitics({
            value: true,
            infoUser: "talents",
            payload: this.formState,
          });
        } else {
          this.SWALPOPUP.declencheSwalPopup("info", "Ajouter votre Carte national d'identité.");
        }
      } else {
        this.SWALPOPUP.declencheSwalPopup("info", "Ajouter un email correct");
      }
    },

    onFinishFailed(errorInfo) {
      Swal.fire({
        icon: "warning",
        title: `${errorInfo.errorFields[0].errors[0]}`,
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
    this.texte7 = await this.handleTranslate(
      "Compétences (plusieurs choix sont possibles)"
    );
    this.texte8 = await this.handleTranslate("Niveau d'étude");
    this.texte9 = await this.handleTranslate("Carte national d'identité");
    this.texte909 = await this.handleTranslate("Charger votre permis de conduire");
    this.texte10 = await this.handleTranslate("Mot de passe");
    this.texte11 = await this.handleTranslate("S'inscrire");
    this.texte12 = await this.handleTranslate("Mot de passe requis");
    this.texte13 = await this.handleTranslate("Votre niveau d'étude actuel requis");
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

  <a-steps
    :style="{
      color: 'orange',
      boxShadow: '0px -1px 0 0 #e8e8e8 inset',
    }"
    :current="currentStep"
    class="mb-4"
  >
    <a-step
      title="Profil"
      description="Renseignez vos informations de base pour créer votre compte."
    />
    <a-step title="Compétences" description="Sélectionnez vos compétences." />
    <a-step title="Qualifications" description="Ajoutez vos qualifications." />
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
      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="12">
          <a-form-item label="Code de parrainage" name="code_ambassadeur">
            <a-input v-model:value="formState.code_ambassadeur" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :md="12">
          <a-form-item
            :label="texte"
            name="nom"
            :rules="[
              { required: true, message: texte17 },
              {
                pattern: /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/,
                message: 'Veuillez saisir uniquement des lettres.'
              }
            ]"
          >
            <a-input v-model:value="formState.nom" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="12">
          <a-form-item
            :label="texte1"
            name="prenoms"
            :rules="[
              { required: true, message: texte16 },
              {
                pattern: /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/,
                message: 'Veuillez saisir uniquement des lettres.'
              }
            ]"
          >
            <a-input v-model:value="formState.prenoms" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :md="12">
          <a-form-item
            :label="texte2"
            name="phone"
            :rules="[
              { required: true, message: texte15 },
              {
                pattern: /^\d{10}$/,
                message: 'Le numéro de téléphone doit contenir exactement 10 chiffres.'
              }
            ]"
          >
            <a-input v-model:value="formState.phone">
              <template #addonBefore>
                <a-select v-model:value="formState.countryCode" :options="westAfricaCodes" />
              </template>
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="12">
          <a-form-item
            :label="texte6"
            name="email"
            :rules="[
              { required: true, message: texte14 },
              { type: 'email', message: 'Veuillez entrer un email valide' }
            ]"
          >
            <a-input v-model:value="formState.email" />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :md="12">
          <a-form-item label="Profil">
            <a-input v-model:value="formState.titreCv" />
            <!-- <a-textarea v-model:value="formState.titreCv" :maxlength="300" /> -->
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="24">
          <a-form-item label="Biographie – résumé de votre profil">
            <a-textarea v-model:value="formState.bio" :maxlength="300" />
          </a-form-item>
        </a-col>
      </a-row>
    </div>

    <!-- STEP 1 -->
    <div v-show="currentStep === 1">
      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="24">
          <a-form-item
            :label="texte7"
            :rules="[{ required: true, message: 'Ajoutez au moins une compétence' }]"
          >
            <VueMultiselect
              v-model="formState.myCompetence"
              :options="allCompetences"
              placeholder="Choix multiples"
              :multiple="true"
              label="competence"
              track-by="competence"
            />
          </a-form-item>
        </a-col>
       
      </a-row>
    </div>
    <!-- STEP 2 -->
    <div v-show="currentStep === 2">
         <a-row :gutter="[16, 24]">
         <a-col :xs="24" :md="12">
          <a-form-item
            :label="texte8"
            name="niveauEtude"
            :rules="[{ required: true, message: 'Séléctionnez votre niveau d\'étude' }]"
          >
          <a-select
    v-model:value="formState.niveauEtude"
    placeholder="Sélectionnez votre niveau d’étude"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in niveauxEtudes"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
            <!-- <a-select
              style="margin:1em 0"
              v-model:value="formState.niveauEtude"
              placeholder="Sélectionnez un diplôme"
            >
              <a-select-option
                v-for="item in Array.from({ length: 8 }, (_, i) => ({ value: `BAC+${i + 1}` }))"
                :key="item.value"
                :value="item.value"
              >
                {{ item.value }}
              </a-select-option>
            </a-select> -->
            <!-- <a-input v-model:value="formState.filiere" placeholder="Filière" /> -->
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
            <a-form-item
            :label="'Statut professionnel'"
            :rules="[{ required: true, message: 'Ajoutez  votre niveau de carrière' }]"
          >
            <a-select
            style="width: 100%;"
    v-model:value="formState.statut_talent"
    placeholder="Sélectionnez votre Niveau de carrière"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in StatutArtisans"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
            </a-form-item>
        </a-col>
         <a-col :xs="24" :md="24">
          <RegisterQualifications 
          :isRequired="false"
          @update:modelValue="handleQualifications" />
        </a-col>
        </a-row>
    </div>
    <!-- STEP 3 -->
    <div v-show="currentStep === 3">
      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="12">
          <a-form-item name="uploadPhotoProfil" label="Photo de profil">
            <a-upload v-model:fileList="formState.uploadPhotoProfil" :maxCount="1">
              <a-button> Clique pour charger </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
          <a-form-item
            name="upload"
            :label="formState.myCompetence.some(item => item.competence?.toLowerCase() === 'chauffeur') ? texte909:texte9"
            :rules="[{ required: true, message: texte96 }]"
          >
            <a-upload
              v-model:fileList="formState.upload"
              :maxCount="1"
              accept="image/*"
              @change="onUploadChange"
            >
              <a-button> Clique pour charger </a-button>
            </a-upload>
          </a-form-item>

          <a-spin v-if="loading" tip="Vérification de la carte d'étudiant" />
          <span style="color:red;" v-if="this.result && this.result.isStudentCard === false">
            Veuillez ajouter une carte bien visible
          </span>
          <!-- {{ this.result }} -->
        </a-col>
        
      </a-row>

      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="24">
          <a-form-item
            :label="texte10"
            name="password"
            :rules="[{ required: true, message: texte12 }]"
          >
            <a-input-password
              :disabled="isPasswordDisabled"
              v-model:value="formState.password"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </div>

    <!-- NAVIGATION -->
    <div class="d-flex justify-content-between" style="padding: 1.5em">
      <a-button v-if="currentStep > 0" @click="prevStep"> Précédent </a-button>

      <a-button
        v-if="currentStep < 3"
        type="primary"
        @click.prevent="nextStep"
        :disabled="isNextDisabled"
      >
        Suivant
      </a-button>

      <a-button
        v-if="currentStep === 3"
        type="primary"
        html-type="submit"
        :disabled="!isCurrentStepValid || isPasswordDisabled"
      >
        {{ texte11 }}
      </a-button>
    </div>
  </a-form>
</template>

<style scoped>
:deep(:where(.ant-steps-item-icon)) {
  background-color: #ff8819 !important;
  border-color: #ff8819 !important;
}
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector) {
  height: 40px !important;
}
:deep(.multiselect__tag) {
  background: orange;
}
:deep(.ant-spin-text) {
  font-size: 16px !important;
}
</style>

<style
  src="../../../../../../node_modules/vue-multiselect/dist/vue-multiselect.css"
></style>
