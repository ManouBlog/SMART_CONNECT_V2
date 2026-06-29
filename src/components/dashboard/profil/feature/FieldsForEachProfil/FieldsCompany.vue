<script>
// import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import Abonnements from '../../../../../views/Abonnements/Abonnements.vue';
import { configUtils } from "../../../../../Shared/Utils";

import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useAbonnementsStore } from '../../../../../store-pinia/Abonnements/useAbonnementsStore';
// import Tesseract from 'tesseract.js'

export default {
  name: "FieldsCompany",
  props:{
  profilOfAbonnement:Object
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
 showModalAbonnements:false,
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
      formState: {
       statut_entreprise: "Formelle",
        nom: "",
        prenoms: "",
        phone: "",
        ville: "",
        ncc: "",
        email:"",
        commune: "",
        quartier: "",
        diplome: "",
        carte_student: "",
        myCompetence: [],
        Logo: [],
        password: "",
        registre_pdf:null,
        cni:null,
        logo_entreprise:null,
        logo: "",
        upload: [],
        photo: null,
        Phonegerant: null,
        countryCode: "+225",
        countryCodePhoneGerant: "+225",
        email_cc:null,
        profilHybride:[]
      },
    };
  },

  computed: {
 isFormValid() {
    const f = this.formState

    return (
      f.nom?.trim() &&
      f.matricule_cc?.trim() &&
      f.juridique?.trim() &&
      f.ncc?.trim() &&
      // f.gerant?.trim() &&
      // f.Phonegerant?.toString().trim() &&
      // f.countryCode &&
      // f.countryCodePhoneGerant &&

      // fichier registre (PDF)
      f.registre_pdf
    )
  }
    
  },
 
  methods: {
    handleChangeCardEntreprise(e, type) {
    const files = e.target.files
    console.log("handleChangeCardEntreprise",files[0])

    if (type === 'registre') {
      this.formState.registre_pdf = files[0]
    }

    if (type === 'cni') {
      this.formState.cni = files[0]
    }

    if (type === 'logo') {
      this.formState.logo_entreprise = files[0]
    }
  },
//     onUploadChange(e) {
  
//     this.formState.upload = Array.from(e.target.files);
//     if (!e) return
//     this.rawText = ''
//     this.result = null
//   // this.runOCR(newList)
// },
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
      const STORE_ABONNEMENT = useAbonnementsStore()
     
      STORE_ABONNEMENT.handleChangeInfoForAbonnement(this.formState)
      STORE_ABONNEMENT.cleanProfilHybide([])
      
      this.showModalAbonnements = true
      
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
      :statut_entreprise="'Formelle'"
      />
      </div>
      </n-modal>
    <form @submit.prevent="onHandleProfil">
   <p style="text-align: center; color: red;font-size: 0.9em;">
        Les champs avec astérisque (*) sont obligatoires.
      </p>
  <!-- Raison sociale + RCCM -->
  <div class="row">
    <div class="col-md-6 my-3">
      <label><span style="color: red;margin:0 0.1em">*</span>Raison sociale</label>
      <input
        type="text"
        class="form-control"
        style="height: 45px;"
        v-model="formState.nom"
        placeholder="Entrez la raison sociale"
        
      />
    </div>

    <div class="col-md-6 my-3">
      <label> <span style="color: red;margin:0 0.1em">*</span>RCCM (Registre du Commerce et du Crédit Mobilier)</label>
      <input
        type="text"
        class="form-control"
        style="height: 45px;"
        v-model="formState.matricule_cc"
        placeholder="Entrez le numéro RCCM"
        
      />
      <label class="my-3"> <span style="color: red;margin:0 0.1em">*</span> Charger le registre de commerce (PDF)</label>
      <input
        type="file"
        @change="e => handleChangeCardEntreprise(e, 'registre')"
        name="Registre"
        accept=".pdf"
      />
    </div>
  </div>

  <!-- Forme juridique + NCC -->
  <div class="row">
    <div class="col-md-6 my-3">
      <label> <span style="color: red;margin:0 0.1em">*</span> Forme juridique</label>
      <input
        type="text"
        class="form-control"
        style="height: 45px;"
        v-model="formState.juridique"
        placeholder="Ex : SARL, SA, SAS..."
        
      />
    </div>

    <div class="col-md-6 my-3">
      <label> <span style="color: red;margin:0 0.1em">*</span> NCC (Numéro de compte contribuable)</label>
      <input
        type="text"
        class="form-control"
        style="height: 45px;"
        v-model="formState.ncc"
        placeholder="Entrez le NCC"
        
      />
    </div>
    
  </div>

  <!-- Email + Email secondaires -->
  <div class="row">
   

    <div class="col-md-6 my-3">
      <label>Emails secondaires (cc)</label>
      <n-dynamic-input
            v-model:value="formState.email_cc"
            placeholder="Ajoutez un email en copie"
            :min="0"
            :max="6"
            :item-style="{ borderColor: 'gray' }"
          />
    </div>
  </div>

  <!-- Gérant + Téléphone -->
  <div class="row">
    <div class="col-md-6 my-3">
      <label>Nom du gérant</label>
      <input
        type="text"
        class="form-control"
        style="height: 45px;"
        v-model="formState.gerant"
        placeholder="Nom complet du gérant"
        
      />
    </div>

    <div class="col-md-6 my-3">
      <label>Contact Téléphonique du gérant</label>

      <div style="display:flex; gap:5px;">
        <select
        class="form-control"
        style="height: 45px;"
        v-model="formState.countryCodePhoneGerant">
          <option
            v-for="code in westAfricaCodes"
            :key="code.value"
            :value="code.value"
          >
            {{ code.label }}
          </option>
        </select>

        <input
          type="tel"
          class="form-control"
          style="height: 45px;"
          v-model="formState.Phonegerant"
          placeholder="Numéro du gérant"
          
        />
      </div>
    </div>
  </div>

  <!-- Uploads -->
  <div class="row">
     <div class="col-md-6 my-3">
      <label>Carte nationale d'identité du gérant (JPG, PNG, WEBP)</label>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        @change="e => handleChangeCardEntreprise(e, 'cni')"
        
      />
    </div>
    <div class="col-md-6 my-3">
      <label>Logo de l’entreprise (JPG, PNG, WEBP)</label>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        @change="e => handleChangeCardEntreprise(e, 'logo')"
        
      />
    </div>
  </div>

  <!-- Submit -->
   <div class="col-md-12 my-4">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="!isFormValid"
      >
        Enregistrer
      </a-button>
      </div>

</form>

</template>
