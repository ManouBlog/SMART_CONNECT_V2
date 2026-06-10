<script>
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../../../../../Shared/Utils";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import instance from "../../../../../api/api";
import RegisterQualifications from "../students/RegisterQualifications.vue";
// import Tesseract from 'tesseract.js'

export default {
  name: "RegisterProfessionels",
  components: { 
    VueMultiselect, 
    Politics,
    RegisterQualifications 
  },
  data() {
    return {
       fileList : [],
 loading : false,
 rawText : '',
 result : null,
 allAnwserProfilHybride: [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" }
],
 allStatuts : [
  // { value: "Particulier", label: "Particulier" },
  // { value: "Artisan", label: "Artisan" },
],
 valueExpertise: [
  { value: "Privilége", label: "Privilége" },
  { value: "Normal", label: "Normal" },
],
 valueTempsTravail: [
  { value: "Temps partiel", label: "Temps partiel" },
  { value: "Temps plein", label: "Temps plein" },
],
valueModeDeTravail: [
  { value: "Présentiel", label: "Présentiel" },
  { value: "Télétravail", label: "Télétravail" },
  { value: "Hybride", label: "Hybride" }
],
//  SCHOOL_KEYWORDS :[
//   // Carte étudiante (formes tolérantes OCR)
//   'carte etudiant',
//   'carte d etudiant',
//   'carte a etudiant',
//   'carte etudiante',

//   // Étudiant (avec ou sans accents, fautes OCR)
//   'Etudiant',
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
StatutVeterans:[
  { value: "Vétéran Hors Grade", label: "Vétéran Hors Grade" },
  { value: "Vétéran Senior", label: "Vétéran Senior" },
  { value: "Vétéran", label: "Vétéran" }
],
      formState: {
        otherCompetence:[],
        code_ambassadeur:"",
        titreCv: "",
        nom: "",
        prenoms: "",
        phone: "",
        statut_talent:"",
        ville: "",
        tempsTravail:"",
        commune: "",
        quartier: "",
        diplome: "",
        myCompetence: [],
        profilHybride: [] ,
        optionsAnswer:null,
        uploadCNI:null,
        photo: null,
        upload: [],
        bio: "",
        statutId:6,
        photo_profil: null,
        uploadPhotoProfil: [],
        email: "",
        password: "",
        treatment_preferentiel:"",
        countryCode: "+225",
        qualifications: [],
        disponibiliteValid: false,
        statut_professionnel_artisan :"",
        mode_discret:false
      },
    };
  },
 watch: {
    "formState.optionsAnswer":{
      handler(value) {
        if(value === 'non'){
          this.formState.profilHybride = [];
          this.formState.ville = "";
          this.formState.commune = "";
          // this.formState.statut_talent = "";
          this.formState.statut_professionnel_artisan =""
          this.formState.uploadCNI = null
        }
        // console.log("formState.optionsAnswer", value);
        
      },
      immediate: true,
    }
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
    isNextDisabled() {
      // STEP 2 – Qualifications
      if (this.currentStep === 3) {
        // au moins une qualification
        if (!this.formState.qualifications.length) {
          return true;
        }

        // chaque qualification doit avoir une date_debut
        return this.formState.qualifications.some(
          (q) => !q.objet || !q.date_debut || !q.date_fin
        );
      }


      // Autres steps
      return !this.isCurrentStepValid;
    },

    requiredFieldsByStep() {
      return {
         0:["optionsAnswer"],
        // STEP 0 – Infos personnelles
        1: ["nom", "prenoms", "phone", "email"],

        // STEP 1 – Profil & compétences
        // 2: ["myCompetence"],

        // STEP 2 – Qualifications
        3: ["qualifications", "niveauEtude", "filiere","statut_talent"],

         // STEP 2 – mode de travail
        4: ["modeTravail","tempsTravail"],

        // STEP 4 – Validation finale
        5: ["password"],
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
     onCreateOther() {
      return null
    },
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),
    async lister_statut(){
      try {
        const response =  await instance.get("listStatut")
        this.allStatuts = response.data.data.filter(item=>item.statut === 'Particulier' || item.statut === 'Artisan')
        // console.log("this.allStatuts",response.data.data.filter(item=>item.statut === 'particulier' || item.statut === 'Artisan'))
      } catch (error) {
        console.log(error);
      }
    },
    handleQualifications(payload) {
   

      this.formState.qualifications = payload;
    },

    nextStep() {
      // console.log("this.currentStep",this.currentStep)

       if(this.currentStep === 0 && this.formState.optionsAnswer === 'oui' && !this.formState.profilHybride.length){
        // console.log("this.formState.profilHybride",this.formState.profilHybride)
        this.SWALPOPUP.declencheSwalPopup(
            "warning",
            "Choisissez un profil"
          );
          return;
      }

      if (this.currentStep === 1 && this.formState.profilHybride.length && this.formState.optionsAnswer == "oui") {
        // console.log("this.formState.profilHybride",this.formState.profilHybride)
        if(!this.formState.ville || !this.formState.commune){
         this.SWALPOPUP.declencheSwalPopup(
            "warning",
            "Les champs ville et commune sont obligatoires."
          );
          return;
        }
        
      }

      if (this.currentStep === 3) {
        const invalid = this.formState.qualifications.some((q) => !q.objet);

        if (invalid) {
          this.SWALPOPUP.declencheSwalPopup(
            "warning",
            "Chaque qualification doit avoir un titre"
          );
          return;
        }
        if(this.formState.profilHybride.some(el=>el == 7) && !this.formState.statut_professionnel_artisan ){
          this.SWALPOPUP.declencheSwalPopup(
            "warning",
            "Ajoutez votre statut professionnel artisan."
          );
          return;
        }
      }

      //   if (this.currentStep === 3) {
     
      //   if (!this.getFirstHeureStartFrom || !this.getTableauDays.length) {
      //     this.SWALPOPUP.declencheSwalPopup(
      //       "warning",
      //       "Veuillez remplir les champs obligatoire"
      //     );
      //     return;
      //   }
      // }

      if (this.currentStep !== 3 && !this.isCurrentStepValid) {
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
      // console.log("this.formState",this.formState);
      if (this.formState.uploadPhotoProfil.length) {
        this.formState.photo_profil = this.formState.uploadPhotoProfil[0].originFileObj;
      }

      if (this.configUtils.isValidEmail(this.formState.email)) {
        this.changeValueIsPolitics({
            value: true,
            infoUser: "talents",
            payload: this.formState,
          });
        // if (this.formState.upload.length) {
        //   this.formState.photo = this.addPhotoInArray(this.formState.upload);
      
        //   this.changeValueIsPolitics({
        //     value: true,
        //     infoUser: "talents",
        //     payload: this.formState,
        //   });
        // } 
        // else {
        //   this.SWALPOPUP.declencheSwalPopup("info", "Ajoutez votre certificat de travail.");
        // }
      } else {
        this.SWALPOPUP.declencheSwalPopup("info", "Ajoutez un email correct");
      }
    },

    onHandleFailed(errorInfo) {
      Swal.fire({
        icon: "warning",
        title: `${errorInfo.errorFields[0].errors[0]}`,
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
  },

  async created() {
    await this.lister_statut();
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
    this.texte8 = await this.handleTranslate("Niveau actuel");
    this.texte9 = await this.handleTranslate("Certificat de travail");
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
      title="Profil Hybride"
      description=""
    />
    <a-step
      title="Profil"
      description="Renseignez vos informations de base pour créer votre compte."
    />
    <a-step title="Compétences" description="Sélectionnez vos compétences." />
    <a-step
      title="Qualifications"
      description="Ajoutez vos qualifications pour valoriser votre profil."
    />
    <a-step
      title="Mode de travail"
      description="Séléctionnez un mode de travail."
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
    @finishFailed="onHandleFailed"
  >

  <!-- STEP 1 -->
  <div v-show="currentStep === 0">
    <div>
  <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
    Souhaitez-vous adopter un profil hybride ?
  </label>

  <div class="round-container">
    <label 
      v-for="item in allAnwserProfilHybride" 
      :key="item.value"
      class="round-item"
    >
      <input
        type="radio"
        name="profilHybride"
        :value="item.value"
        v-model="formState.optionsAnswer"
      />
      <span class="round-label">
        {{ item.label }}
      </span>
    </label>
  </div>
</div>
   <transition name="fade-slide">
  <div v-if="formState.optionsAnswer === 'oui'">
    <label style="color: rgba(0, 0, 0, 0.88); font-size: 14px;">
     Profils disponibles
    </label>
    <div class="round-container">
      <label 
        v-for="item in allStatuts" 
        :key="item.id"
        class="round-item"
      >
        <input
          type="checkbox"
          :value="item.id"
          v-model="formState.profilHybride"
        />
        <span class="round-label">
          {{ item.statut }}
        </span>
      </label>
    </div>
  </div>
</transition>
  </div>

    <!-- STEP 1 -->
    <div v-show="currentStep === 1">
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
       <a-row :gutter="[16, 24]" v-if="this.formState.profilHybride.length && this.formState.optionsAnswer === 'oui'">
          <a-col :xs="24" :md="12">
        <a-form-item
          label="Ville"
          name="ville"
          :rules="[{ required: true, message: 'Ajoutez une ville' }]"
        >
          <a-input v-model:value="formState.ville" placeholder="Ajoutez votre ville" />
        </a-form-item>
      </a-col>
    <a-col :xs="24" :md="12">
        <a-form-item
          label="Commune"
          name="commune"
          :rules="[{ required: true, message: 'Ajoutez une commune' }]"
        >
          <a-input v-model:value="formState.commune" placeholder="Ajoutez votre commune" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :md="12">
        <a-form-item label="Quartier" name="quartier">
          <a-input 
            v-model:value="formState.quartier"
            placeholder="Ajoutez votre quartier"
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
            :label="texte7"
           
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
            <a-form-item label="Autre">
  <n-dynamic-input v-model:value="formState.otherCompetence" :on-create="onCreateOther">
    <template #create-button-default>
      <slot name="create-button">Autres compétences</slot>
    </template>

    <template #default="{ index }">
      <a-input v-model:value="formState.otherCompetence[index]" />
    </template>
  </n-dynamic-input>
</a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
            <a-form-item
            :label="'Traitement préférentiel'"
          >
            <a-select
            style="width: 100%;"
    v-model:value="formState.treatment_preferentiel"
    placeholder="Sélectionnez votre traitement préférentiel"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in valueExpertise"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
   </a-form-item>
        </a-col>  
      </a-row>
    </div>

    <!-- STEP 3 -->
    <div v-show="currentStep === 3">
      <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="12">
          <a-form-item
            :label="texte8"
            name="niveauEtude"
            :rules="[{ required: true, message: texte13 }]"
          >
            <a-select
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
            </a-select>
            
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
          <a-form-item
            label="Domaine"
            name="filiere"
            :rules="[{ required: true, message: 'Ajoutez votre domaine' }]"
          >
          <a-input v-model:value="formState.filiere" placeholder="Domaine" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
            <a-form-item
            :label="'Statut professionnel'"
            :rules="[{ required: true, message: 'Séléctionnez un statut' }]"
          >
            <a-select
            style="width: 100%;"
    v-model:value="formState.statut_talent"
    placeholder="Sélectionnez votre Niveau de carrière"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in StatutVeterans"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
        </a-select>
       <span v-if="formState.statut_talent == 'Vétéran Hors Grade'" style="padding:1em;color: red;">Nous activons le mode discret par défaut pour votre confidentialité</span>
            </a-form-item>
            <a-form-item
            v-if="this.formState.profilHybride.some(el=>el == 7) && this.formState.optionsAnswer === 'oui'"
            :label="'Statut professionnel artisan'"
            name="statut_professionnel_artisan "
            :rules="[{ required: true, message: 'Ajoutez votre statut professionnel artisan' }]"
          >
            <a-select
            style="width: 100%;"
    v-model:value="formState.statut_professionnel_artisan "
    placeholder="Sélectionnez votre Statut professionnel"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in ['Artisan']"
      :key="item"
      :value="item"
      :label="item"
    >
      {{ item }}
    </a-select-option>
  </a-select>
            </a-form-item>
        </a-col>
         <a-col :xs="24" :md="12" v-if="formState.statut_talent !== 'Vétéran Hors Grade'">
            <a-form-item label="Voulez-vous activer le mode discret ?" name="mode_discret">
    <a-tooltip 
      title="Mode discret : Masquer votre profil des recherches publiques. 
Les entreprises ne pourront pas voir votre profil mais vous voyez leurs offres et pouvez postuler."
      placement="right"
    >
      <template #title>
        <span>
          Voulez-vous activer le mode discret ? 
          <i class="bi bi-info-circle ms-2 text-primary fs-6" style="cursor: help;"></i>
        </span>
      </template>
      
      <a-switch
        v-model:checked="formState.mode_discret"
        checked-children="Actif"
        un-checked-children="Inactif"
        size="default" 
        class="switch-green"
      />
    </a-tooltip>
       </a-form-item>
        </a-col>
        <a-col :xs="24" :md="24">
          <RegisterQualifications @update:modelValue="handleQualifications" />
        </a-col>
      </a-row>
    </div>

      <!-- STEP 4 -->
    <div v-show="currentStep === 4">
      <a-row :gutter="[16, 24]">
         <a-col :xs="24" :md="12">
           <a-form-item
            :label="'Mode de travail'"
            :rules="[{ required: true, message: 'Ajoutez  votre mode de travail' }]"
          >
            <a-select
            style="width: 100%;"
    v-model:value="formState.modeTravail"
    placeholder="Sélectionnez votre mode de travail"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in valueModeDeTravail"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
            </a-form-item>
        </a-col>
        <a-col :xs="24" :md="12">
            <a-form-item
            :label="'Temps de travail'"
            :rules="[{ required: true, message: 'Séléctionnez un temps de travail' }]"
          >
            <a-select
            style="width: 100%;"
    v-model:value="formState.tempsTravail"
    placeholder="Sélectionnez votre Niveau de carrière"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in valueTempsTravail"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
            </a-form-item>
        </a-col> 
       
      </a-row>
    </div>

    <!-- STEP 5 -->
    <div v-show="currentStep === 5">
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
            :label="texte9"
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
            Veuillez Ajoutez une carte bien visible
          </span>
          <!-- {{ this.result }} -->
        </a-col>
        <a-col :xs="24" :md="12"
           v-if="this.formState.profilHybride.length && this.formState.optionsAnswer === 'oui'">
        <a-form-item
          name="uploadCNI"
          label="Carte nationale d'identité"
          :rules="[{ required: true, message: 'Ajoutez une CNI' }]"
        >
          <a-upload
            v-model:fileList="formState.uploadCNI"
            name="uploadCNI"
            list-type="picture"
            :multiple="true"
            :maxCount="1"
            accept=".jpg,.jpeg,.png,.webp"
            @change="onUploadChange"
          >
            <a-button> Clique pour charger </a-button>
          </a-upload>
        </a-form-item>
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
        v-if="currentStep < 5"
        type="primary"
        @click.prevent="nextStep"
        :disabled="isNextDisabled"
      >
        Suivant
      </a-button>

      <a-button
        v-if="currentStep === 5"
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
