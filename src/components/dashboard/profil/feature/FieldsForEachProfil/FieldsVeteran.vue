<script>
import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";

import { configUtils } from "../../../../../Shared/Utils";

import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";

// import Tesseract from 'tesseract.js'

export default {
  name: "RegisterProfessionels",
//   components: { 
//     VueMultiselect, 
//     Politics,
//     RegisterQualifications 
//   },
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
  { value: "Particulier", label: "Particulier" },
  { value: "Artisan", label: "Artisan" },
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
StatutVeterans:[
  { value: "Vétéran Hors Grade", label: "Vétéran Hors Grade" },
  { value: "Vétéran Senior", label: "Vétéran Senior" },
  { value: "Vétéran", label: "Vétéran" }
],
      formState: {
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
          optionsProfil: [] ,
        optionsAnswer:null,
        photo: null,
        upload: [],
        bio: "",
        statutId:6,
        photo_profil: null,
        uploadPhotoProfil: [],
        email: "",
        password: "",
        niveauExpertise:"",
        countryCode: "+225",
        qualifications: [],
        disponibiliteValid: false,
      },
    };
  },

  computed: {

    requiredFieldsByStep() {
      return {
         0:["optionsAnswer"],
        // STEP 0 – Infos personnelles
        1: ["nom", "prenoms", "phone", "email"],

        // STEP 1 – Profil & compétences
        2: ["myCompetence"],

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
        this.changeValueIsPolitics({
            value: true,
            infoUser: "talents",
            payload: this.formState,
          });
        
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

//   async created() {
//     // this.getCompetences();
  
//   },
};
</script>
<template>
    <a-form
    layout="vertical"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
   <a-row :gutter="[16, 24]">
        <a-col :xs="24" :md="12">
          <a-form-item label="Traitement préférentiel" name="niveauExpertise">
            <a-input v-model:value="formState.niveauExpertise" />
          </a-form-item>
        </a-col>

        <!-- <a-col :xs="24" :md="12">
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
        </a-col> -->
      </a-row>


   

    <!-- NAVIGATION -->
    <div class="d-flex justify-content-between" style="padding: 1.5em">
      

      <a-button
       
        type="primary"
        html-type="submit"
       
      >
        Enregistrer
      </a-button>
    </div>
  </a-form>
</template>