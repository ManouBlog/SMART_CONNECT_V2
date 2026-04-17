<script>
// import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import Abonnements from '../../../../../views/Abonnements/Abonnements.vue';
import { configUtils } from "../../../../../Shared/Utils";

import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";

// import Tesseract from 'tesseract.js'

export default {
  name: "FieldsProfessionnel",
  props:{
  profilHybride:Array,
  profilOfAbonnement:String
  },
  components: { 
  Abonnements
  },
  data() {
    return {
       fileList : [],
 loading : false,
 rawText : '',
 result : null,
 showModalAbonnements:false,
 allAnwserProfilHybride: [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" }
],
 allStatuts : [
  // { value: "Particulier", label: "Particulier" },
  // { value: "Artisan", label: "Artisan" },
],
StatutProfessionnel:[
  { value: "Diplômé en quête d’emploi", label: "Diplômé en quête d’emploi" },
  { value: "En fonction", label: "En fonction" },
  { value: "Expert indépendant", label: "Expert indépendant" },
  { value: "Consultant", label: "Consultant" },
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
      formState: {
        statut_talent:"",
        statut_professionnel_hybride:"",
        upload: [],
        niveauExpertise:"",
        CVupload:null,
        modeTravail:"",
        tempsTravail:""
      },
    };
  },

  computed: {
 isFormComplete() {
      return (
        this.formState.niveauExpertise?.trim() &&      // Champ texte non vide
        this.formState.statut_talent &&                // Select sélectionné
        this.formState.upload?.length > 0 && 
        this.formState.modeTravail && 
        this.formState.tempsTravail           // Fichier uploadé
      );
    }
    
  },
 
  methods: {

    onUploadChangeCV(e) {
    console.log('onUploadChange', e.target.files);
    this.formState.CVupload = Array.from(e.target.files);
    if (!e) return
    this.rawText = ''
    this.result = null
  // console.log()
  // this.runOCR(newList)
},
    onUploadChangeCNI(e) {
    console.log('onUploadChange', e.target.files);
    this.formState.upload = Array.from(e.target.files);
    if (!e) return
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
    onHandleProfil() {
      console.log("this.formState",this.formState);
      this.showModalAbonnements = !this.showModalAbonnements
    },
  },
};
</script>
<template>
  <n-modal 
   style="width:80%; 
  height: 600px;
    overflow-y: auto; 
    max-height: 80vh;"
       :closable="false"
       @close="resetData"
  v-model:show="showModalAbonnements">
         <template #header>
        <div class="modal-header">
          <h3>Abonnement</h3>
        </div>
      </template>
      <div style="background-color: white;">
      <Abonnements 
      :ProfilAbonnement="this.profilOfAbonnement"
      />
      </div>
      </n-modal>
    <form  @submit.prevent="onHandleProfil">
      <!-- {{ profilHybride }} -->
    <div class="row g-4">
      <div class="col-md-6 my-2">
        <label for="treatment1" class="form-label fw-semibold mb-2">Niveau d'etude + Domaine</label>
        <select 
          name="treatment" 
          id="treatment1" 
          v-model="formState.niveauEtude"
          class="form-control"
          style="height: 50px;"
        >
          <option value="" disabled>Sélectionnez...</option>
          <option 
            v-for="item in Array.from({ length: 8 }, (_, i) => ({ value: `BAC+${i + 1}` }))"
            :key="item.value" 
            :value="item.value"
          >
            {{ item.value }}
          </option>
        </select>
        <input type="text" placeholder="Ajoutez votre Domaine" class="form-control my-2" />
      </div>
      <div class="col-md-6 my-2">
        <label for="treatment2" class="form-label fw-semibold mb-2">Statut professionnel</label>
        <select 
          name="statut" 
          id="treatment2" 
          v-model="formState.statut_talent"
          class="form-control"
          style="height: 50px;"
        >
          <option value="" disabled>Sélectionnez...</option>
          <option 
            v-for="item in StatutProfessionnel" 
            :key="item.id" 
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>
      
      <div class="col-md-6 my-2" v-if="this.profilHybride.some(item=>item.statut.includes('Artisan'))">
        <label for="treatment2" class="form-label fw-semibold mb-2">Statut professionnel artisan</label>
        <select 
          name="statut" 
          id="treatment2" 
          v-model="formState.statut_professionnel_hybride"
          class="form-control"
          style="height: 50px;"
        >
          <option value="" disabled>Sélectionnez...</option>
          <option 
            v-for="item in StatutProfessionnel" 
            :key="item.id" 
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>

      <div class="col-md-6 my-2">
        <label for="treatment2" class="form-label fw-semibold mb-2">Mode de travail</label>
        <select 
          name="statut" 
          id="treatment2" 
          v-model="formState.modeTravail"
          class="form-control"
          style="height: 50px;"
        >
          <option value="" disabled>Sélectionnez...</option>
          <option 
            v-for="item in valueModeDeTravail" 
            :key="item.id" 
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>

       <div class="col-md-6 my-2">
        <label for="treatment2" class="form-label fw-semibold mb-2">Temps de travail</label>
        <select 
          name="statut" 
          id="treatment2" 
          v-model="formState.tempsTravail"
          class="form-control"
          style="height: 50px;"
        >
          <option value="" disabled>Sélectionnez...</option>
          <option 
            v-for="item in valueTempsTravail" 
            :key="item.id" 
            :value="item.value"
          >
            {{ item.label }}
          </option>
        </select>
      </div>
      
      <div class="col-md-6 my-2">
        <label for="certificat" class="form-label fw-semibold mb-2">CV (Curriculum Vitae)</label>
        <input 
          type="file" 
          id="certificat"
          accept="image/*"
          @change="onUploadChangeCV"
          class="form-control"
          style="height: 40px;border: none !important;"
        />
      </div>
      <div class="col-md-6 my-2">
        <label for="certificat" class="form-label fw-semibold mb-2">Carte national d'identité</label>
        <input 
          type="file" 
          id="certificat"
          accept="image/*"
          @change="onUploadChangeCNI"
          class="form-control"
          style="height: 40px;border: none !important;"
        />
      </div>
      <div class="col-md-12 my-4">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="!isFormComplete"
      >
        Enregistrer
      </a-button>
      </div>
    </div>
  </form>
</template>