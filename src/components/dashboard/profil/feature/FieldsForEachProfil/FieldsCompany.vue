<script>
// import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import Abonnements from '../../../../../views/Abonnements/Abonnements.vue';
import { configUtils } from "../../../../../Shared/Utils";

import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";

// import Tesseract from 'tesseract.js'

export default {
  name: "FieldsCompany",
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
        statut_talent:"",
        upload: [],
        niveauExpertise:"",
       
      },
    };
  },

  computed: {
 isFormComplete() {
      return (
        this.formState.niveauExpertise?.trim() &&      // Champ texte non vide
        this.formState.statut_talent &&                // Select sélectionné
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
    onHandleProfil() {
      console.log("this.formState",this.formState);
      this.showModalAbonnements = !this.showModalAbonnements
    },
  },
};
</script>
<template>
  <n-modal 
  style="width:100%; height: 400px; 
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
       <Abonnements />
      </n-modal>
    <form @submit.prevent="onFinish" autocomplete="off">

  <!-- Raison sociale + RCCM -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Raison sociale de l’entreprise</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.nom"
        placeholder="Entrez la raison sociale"
        required
      />
    </div>

    <div class="col-lg-6 my-3">
      <label>Numéro RCCM</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.matricule_cc"
        placeholder="Entrez le numéro RCCM"
        required
      />

      <label>Registre de commerce (PDF)</label>
      <input
        type="file"
        class="form-control"
        @change="handleChangeCardStudent"
        name="Registre"
        accept=".pdf"
        required
      />
    </div>
  </div>

  <!-- Forme juridique + NCC -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Forme juridique</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.juridique"
        placeholder="Ex : SARL, SA, SAS..."
        required
      />
    </div>

    <div class="col-lg-6 my-3">
      <label>Numéro de Compte Contribuable (NCC)</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.ncc"
        placeholder="Entrez le NCC"
        required
      />
    </div>
  </div>

  <!-- Contact + Ville -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Numéro de téléphone principal</label>

      <div style="display:flex; gap:5px;">
        <select v-model="formState.countryCode"
        
        class="form-control"
        >
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
          v-model="formState.contact"
          placeholder="Numéro de téléphone"
          required
        />
      </div>
    </div>

    <div class="col-lg-6 my-3">
      <label>Ville</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.ville"
        placeholder="Entrez la ville"
        required
      />
    </div>
  </div>

  <!-- Commune + Quartier -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Commune</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.commune"
        placeholder="Entrez la commune"
        required
      />
    </div>

    <div class="col-lg-6 my-3">
      <label>Quartier</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.quartier"
        placeholder="Entrez le quartier"
        required
      />
    </div>
  </div>

  <!-- Email + Email secondaires -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Adresse email principale</label>
      <input
        type="email"
        class="form-control"
        v-model="formState.email"
        placeholder="exemple@email.com"
        required
      />
    </div>

    <div class="col-lg-6 my-3">
      <label>Emails secondaires (copie)</label>

      <div v-for="(email, index) in formState.email_cc" :key="index" style="display:flex; gap:5px;">
        <input type="email"  v-model="formState.email_cc[index]" placeholder="Email secondaire" />
        <button type="button" @click="removeEmail(index)">Supprimer</button>
      </div>

      <button type="button" @click="addEmail">Ajouter un email</button>
    </div>
  </div>

  <!-- Gérant + Téléphone -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Nom du gérant / responsable</label>
      <input
        type="text"
        class="form-control"
        v-model="formState.gerant"
        placeholder="Nom complet du gérant"
        required
      />
    </div>

    <div class="col-lg-6 my-3">
      <label>Téléphone du gérant</label>

      <div style="display:flex; gap:5px;">
        <select
        class="form-control"
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
          v-model="formState.Phonegerant"
          placeholder="Numéro du gérant"
          required
        />
      </div>
    </div>
  </div>

  <!-- Uploads -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Pièce d’identité (CNI, Passeport, etc.)</label>
      <input
        type="file"
        multiple
        class="form-control"
        @change="handleChangeCardStudent"
        required
      />
    </div>

    <div class="col-lg-6 my-3">
      <label>Logo de l’entreprise (JPG, PNG, WEBP)</label>
      <input
        type="file"
        class="form-control"
        accept=".jpg,.jpeg,.png,.webp"
        @change="handleChangeCardStudent"
        required
      />
    </div>
  </div>

  <!-- Password -->
  <div class="row">
    <div class="col-lg-6 my-3">
      <label>Mot de passe</label>
      <input
        type="password"
        class="form-control"
        v-model="formState.password"
        placeholder="Entrez un mot de passe sécurisé"
        required
      />
    </div>
  </div>

  <!-- Submit -->
  <div style="text-align:center; margin-top:20px;">
    <button type="submit">
      Créer le compte entreprise
    </button>
  </div>

</form>
</template>