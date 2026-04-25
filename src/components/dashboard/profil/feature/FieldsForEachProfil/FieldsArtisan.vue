<script>
import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import Abonnements from "../../../../../views/Abonnements/Abonnements.vue";
import { configUtils } from "../../../../../Shared/Utils";

import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useAbonnementsStore } from "../../../../../store-pinia/Abonnements/useAbonnementsStore";
// import Tesseract from 'tesseract.js'

export default {
  name: "FieldsArtisan",
  props:{
profilOfAbonnement:Object
  },
  components: { 
   Abonnements
  },
  data() {
    return {
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
 loading : false,
 rawText : '',
 result : null,
 showModalAbonnements:false,
 allAnwserProfilHybride: [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" }
],
 allStatuts : [
  { value: "Particulier", label: "Particulier" },
  { value: "Artisan", label: "Artisan" },
],
StatutArtisans:[
  { value: "Maitre Artisan", label: "Maitre Artisan" },
  { value: "Artisan", label: "Artisan" }
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
     filiere:"",
      configUtils,
      SWALPOPUP: useSwalPopup(),
      formState: {
        upload: [],
        niveauEtude:"",
        niveauExpertise:"",
        profilHybride:[]
      },
    };
  },

  computed: {

   isFormComplete() {
      return (
        this.formState.niveauExpertise?.trim() &&      // Select sélectionné
        this.formState.upload?.length > 0              // Fichier uploadé
      );
    }
  },
 
  methods: {
     onUploadChange(e) {
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
   onHandleUpdateProfil() {
    this.resetData();
  Swal.fire({
    icon: 'warning',
    title: 'Confirmation',
    text: 'Voulez-vous vraiment continuer avec cette mise à jour de profil ?',
    confirmButtonText: 'Oui, valider',
    cancelButtonText: 'Annuler',
    showCancelButton: true,
    confirmButtonColor: '#f39c12',
    cancelButtonColor: '#e74c3c',
  }).then((result) => {
    if (result.isConfirmed) {
      const storeAbonnement = useAbonnementsStore();
   console.log("this.formState",this.formState)
   storeAbonnement.cleanProfilHybide([]);
   console.log('PROFIL HYBRIDE',storeAbonnement.profilHybride)
      storeAbonnement.handleChangeInfoForAbonnement(this.formState);
     console.log("storeAbonnement_fieldsartisan",storeAbonnement)
      this.showModalAbonnements = true;
    }
  });
},
resetData(){
      this.formState.profilHybride = [];
      const STORE_ABONNEMENT = useAbonnementsStore();
      console.log("this.formState.profilHybride",this.formState.profilHybride)
      STORE_ABONNEMENT.handleChangeInfoForAbonnement(this.formState)
      console.log("RESETDATA_artisan_field",STORE_ABONNEMENT)
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
  v-model:show="showModalAbonnements">
         <template #header>
        <div class="modal-header">
          <h3>Abonnement</h3>
        </div>
      </template>
      <div style="background-color: white;">
       <Abonnements 
       :ProfilAbonnement="this.profilOfAbonnement.statut"
       />
      </div>
      </n-modal>
    <form action="" @submit.prevent="onHandleUpdateProfil">
    <div class="row g-4">
      <div class="col-md-6 my-3">
        <label for="treatment1" class="form-label fw-semibold mb-2">Niveau d'étude *</label>
        <select 
          name="treatment" 
          id="treatment1" 
          v-model="formState.niveauEtude"
          class="form-control"
          style="height: 50px;"
        >
          <option value="" disabled>Sélectionnez...</option>
          <option 
            v-for="item in niveauxEtudes" 
            :key="item.id" 
            :value="item.label"
          >
            {{ item.label }}
          </option>
        </select>
      </div>
      <div class="col-md-6 my-3">
        <label for="treatment1" class="form-label fw-semibold mb-2">Statut professionnel *</label>
        <select 
          name="treatment" 
          id="treatment1" 
          v-model="formState.niveauExpertise"
          class="form-control"
          style="height: 50px;"
        >
          <option value="" disabled>Sélectionnez...</option>
          <option 
            v-for="item in StatutArtisans" 
            :key="item.id" 
            :value="item.label"
          >
            {{ item.label }}
          </option>
        </select>
      </div>
    
      <div class="col-md-6 my-4">
        <label for="certificat" class="form-label fw-semibold mb-2">Carte national d'identité *</label>
        <input 
          type="file" 
          id="certificat"
          accept="image/*"
          @change="onUploadChange"
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
        Enregistrer artisan
      </a-button>
      </div>
    </div>
  </form>

</template>
