<script>
import Swal from "sweetalert2";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import instance from "../../../../../api/api";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
// import Tesseract from 'tesseract.js'

export default {
  name: "Informels",
   props: ['optionsPaper'],
  components: {
    Politics,
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
  // { value: "Artisan", label: "Artisan" },
],
      PIECE_KEYWORDS :[
  "republique de cote d ivoire",
  "signature du titulaire",
   "CARTE NATIONALE D IDENTITE",
   "carte nationale d'identité",
   "REPUbLIQUE DE COTE D IVOIRE",
   "DATE ET LIEU DE NAISSANCE",
    "lieu de naissance",
    "ivoirienne",
    "SEXE",
    "nom du père",
    "nom de la mère", 
    "sexe",
    "Nationalité",
    "nni",
    "NNI",
    "Date d'emission",
    "Signature de l'autorité",
     "date d'émission",
     "date d'emission",
     "Date d'expiration",
     "date d'expiration",
     "date dexpiration",
     "carte nationale d'identite",
     "carte nationale d'identité",
     "carte nationale d'identité",
     "union",
     "discipline",
     "travail",
     "date de delivrance",
     "Date d expiratione",
     "Nom/surname",
     "passeport",
     "passport",
     "code du pays",
     "CIV",
],
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
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      open: true,
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
        statut_entreprise: this.optionsPaper,
      nom_particulier:"",
      statut_professionnel_artisan:"",
        nom: "",
        prenoms: "",
        phone: "",
        ville: "",
        commune: "",
        quartier: "",
        diplome: "",
        carte_student: "",
        myCompetence: [],
         profilHybride: [] ,
        optionsAnswer:null,
        Logo: [],
        upload: [],
        password: "",
        myRegister: "",
        myLogo: "",
        photo: null,
        countryCode: "+225",
        statut_id:1,
      },
      verifChiffre: /[!@#$%^&*(),.?":{}|<>_-]/,
      competences: [],
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
     isPasswordDisabled() {
    return (
      this.loading ||
      (this.result && this.result.isCardIdentity === false)
      
    )
  },
  },
  watch:{
   'formState.optionsAnswer':{
      handler(newValue) {
        if(newValue == 'non'){
          this.formState.profilHybride = []
        }
        // ta logique ici
      },
      immediate: true // si tu veux déclencher au montage aussi
    }
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
     async lister_statut(){
      try {
        const response =  await instance.get("listStatut")
        this.allStatuts = response.data.data.filter(item=>item.statut === 'Artisan')
        // console.log("this.allStatuts",response.data.data.filter(item=>item.statut === 'Artisan'))
      } catch (error) {
        console.log(error);
      }
    },
    addPhotoInArray(allPhotos) {
      const element = [];
      allPhotos.forEach((item) => {
        element.push(item);
      });
      return element;
    },
    onFinish(values) {
      console.log("Success:", values);
      if(this.formState.profilHybride.length){
        this.formState.profilHybride.push(this.formState.statut_id)
      }
     
      if (this.formState.upload.length) {
        this.formState.photo = this.formState.upload;
       
        this.changeValueIsPolitics({
          value: true,
          infoUser: "entreprise",
          payload: this.formState,
        });
      } else {
        this.SWALPOPUP.declencheSwalPopup(
          "info",
          "Ajoutez votre pièce d'identité ou une pièce justificative"
        );
      }
    },
    onHandleFailed(errorInfo) {
   console.log('errorInfo',errorInfo)
      Swal.fire({
        icon: "warning",
        title: `${errorInfo.errorFields[0].errors[0]}`,
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
  
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),
     onUploadChange(event) {
console.log("onUploadChange",event.target.files)
this.formState.upload = Array.from(event.target.files)
  this.rawText = ''
  this.result = null

//   this.runOCR(newList)
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
//       isCardIdentity: false,
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

//   const keywordHits = this.PIECE_KEYWORDS.filter(k =>
//     cleanText.includes(k)
//   ).length

//   score += Math.min(keywordHits * 10, 40)


//   if (cleanText.includes('Nationalité') || cleanText.includes('nationalité')) {

//     score += 20
//   }
//   // if (cleanText.match(/\b(l[123]|m[12])\b/)) score += 10

//   this.result = {
//     score,
//     isCardIdentity: score >= 40
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
  },
  async created() {
    await this.lister_statut()
    this.texte = await this.handleTranslate("Nom");
    this.texte1 = await this.handleTranslate("Prénoms");
    this.texte2 = await this.handleTranslate("Numéro de téléphone");
    this.texte3 = await this.handleTranslate("Ville");
    this.texte4 = await this.handleTranslate("Commune");
    this.texte5 = await this.handleTranslate("Quartier");
    this.texte6 = await this.handleTranslate("Email");
    this.texte12 = await this.handleTranslate("Mot de passe");
    this.texte13 = await this.handleTranslate("S'inscrire");
    this.texte14 = await this.handleTranslate("Veuillez renseigner votre mot de passe!");
    this.texte15 = await this.handleTranslate(
      "Veuillez renseigner le numéro votre Gérant!"
    );
    this.texte16 = await this.handleTranslate("Veuillez renseigner votre Gérant!");
    this.texte17 = await this.handleTranslate(
      "Veuillez renseigner votre Forme juridique!"
    );
    this.texte18 = await this.handleTranslate("Veuillez renseigner votre email!");
    this.texte19 = await this.handleTranslate("Veuillez renseigner votre Quartier!");
    this.texte10 = await this.handleTranslate("Carte nationale d'identité");
  },
};
</script>
<template>
  <Politics v-if="isPolitics" />
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
<transition name="fade-slide">
  <a-form
   v-if="formState.optionsAnswer"
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="on"
    @finish="onFinish"
    @finishFailed="onHandleFailed"
  >
    <!-- Nom + Prénoms -->
    <a-row :gutter="[16, 24]">
      <a-col :xs="24" :md="12">
        <a-form-item
          :label="texte"
          name="nom"
          :rules="[
            { required: true, message: 'Ajoutez votre nom' },
            {
              pattern: /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/,
              message: 'Veuillez saisir uniquement des lettres.'
            }
          ]"
        >
          <a-input v-model:value="formState.nom" placeholder="Entrez votre nom" />
        </a-form-item>
      </a-col>

      <a-col :xs="24" :md="12">
        <a-form-item
          :label="texte1"
          name="prenoms"
          :rules="[
            { required: true, message: 'Ajoutez vos prénoms' },
            {
              pattern: /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/,
              message: 'Veuillez saisir uniquement des lettres.'
            }
          ]"
        >
          <a-input v-model:value="formState.prenoms" placeholder="Entrez vos prénoms" />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- Nom de l'entreprise (optionnel) + Téléphone -->
    <a-row :gutter="[16, 24]">
      <a-col :xs="24" :md="12">
        <a-form-item
          :label="'Nom de l\'Entreprise'"
          name="nom_particulier"
        >
          <a-input
            v-model:value="formState.nom_particulier"
            placeholder="Entrez le nom de votre entreprise"
          />
        </a-form-item>
      </a-col>

      <a-col :xs="24" :md="12">
        <a-form-item
          :label="texte2"
          name="contact"
          :rules="[
            { required: true, message: 'Ajoutez un contact' },
            {
              pattern: /^\d{10}$/,
              message: 'Le numéro de téléphone doit contenir exactement 10 chiffres.'
            }
          ]"
        >
          <a-input
            type="tel"
            v-model:value="formState.contact"
            placeholder="Entrez le numéro téléphonique"
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
      </a-col>
    </a-row>

    <!-- Ville + Commune -->
    <a-row :gutter="[16, 24]">
      <a-col :xs="24" :md="12">
        <a-form-item
          :label="texte3"
          name="ville"
          :rules="[{ required: true, message: 'Ajoutez une ville' }]"
        >
          <a-input v-model:value="formState.ville" placeholder="Ajoutez votre ville" />
        </a-form-item>
      </a-col>

      <a-col :xs="24" :md="12">
        <a-form-item
          :label="texte4"
          name="commune"
          :rules="[{ required: true, message: 'Ajoutez une commune' }]"
        >
          <a-input v-model:value="formState.commune" placeholder="Ajoutez votre commune" />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- Quartier (seul sur sa ligne car souvent moins long) + Email -->
    <a-row :gutter="[16, 24]">
      <a-col :xs="24" :md="12">
        <a-form-item :label="texte5" name="quartier">
          <a-input
            v-model:value="formState.quartier"
            placeholder="Ajoutez votre quartier"
          />
        </a-form-item>
      </a-col>

      <a-col :xs="24" :md="12">
        <a-form-item
          :label="texte6"
          name="email"
          :rules="[
            { required: true, message: 'Ajoutez un email' },
            { type: 'email', message: 'Veuillez entrer un email valide' }
          ]"
        >
          <a-input
            v-model:value="formState.email"
            placeholder="Ajoutez votre adresse email"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- Upload pièce d'identité (souvent mieux en pleine largeur) -->
    <a-row :gutter="[16, 24]">
      <a-col :xs="24" :md="12"  
      
      v-if="formState.profilHybride.length">
            <a-form-item
            :label="'Statut professionnel artisan'"
            name="statut_professionnel_artisan"
           :rules="[{ required: true, message: 'Ajoutez un statut professionnel artisan' }]"
          >
            <a-select
            style="width: 100%;"
    v-model:value="formState.statut_professionnel_artisan "
    placeholder="Sélectionnez votre Statut professionnel"
    show-search
    option-filter-prop="label"
  >
    <a-select-option
      v-for="item in ['Maitre Artisan','Artisan']"
      :key="item"
      :value="item"
      :label="item"
    >
      {{ item }}
    </a-select-option>
  </a-select>
            </a-form-item>
        </a-col>
      <a-col :xs="24" :md="12">
       <a-form-item
  name="upload"
  :label="texte10"
>
  <div>
    <!-- Remplacement de a-upload -->
    <input
      ref="uploadInput"
      type="file"
      name="upload"
      accept=".jpg,.jpeg,.png,.webp"
      multiple
      :maxCount="1" 
      placeholder="Clique pour charger"
      @change="onUploadChange"
    />
  </div>

</a-form-item>
 
      </a-col>
    </a-row>

    <!-- Mot de passe (pleine largeur) -->
    <a-row :gutter="[16, 24]">
      <a-col :xs="24" :md="24">
        <a-form-item
          :label="texte12"
          name="password"
          :rules="[{ required: true, message: 'Ajoutez un mot de passe' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Ajoutez votre mot de passe"
          />
        </a-form-item>
      </a-col>
    </a-row>

    <!-- Bouton de soumission -->
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button
          :disabled="isPasswordDisabled || !this.formState.upload.length"
          type="primary"
          shape="round"
          :size="'large'"
          html-type="submit"
        >
          {{ texte13 }}
        </a-button>
      </div>
    </a-form-item>
  </a-form>
</transition>
</template>

