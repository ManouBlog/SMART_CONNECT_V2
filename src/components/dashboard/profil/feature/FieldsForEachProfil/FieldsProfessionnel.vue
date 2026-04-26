<script>
// import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import Abonnements from '../../../../../views/Abonnements/Abonnements.vue';
import { configUtils } from "../../../../../Shared/Utils";
import Swal from 'sweetalert2';
import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useAbonnementsStore } from '../../../../../store-pinia/Abonnements/useAbonnementsStore';
// import Tesseract from 'tesseract.js'

export default {
  name: "FieldsProfessionnel",
  props:{
  profilHybride:Array,
  optionsAnswer:String,
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
 showModalAbonnements:false,
 
 allAnwserProfilHybride: [
  { label: "Oui", value: "oui" },
  { label: "Non", value: "non" }
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
rules: {
  niveauEtude: [
    {
      required: true,
      message: "Veuillez sélectionner le niveau d'étude",
      trigger: "change"
    }
  ],

  diplome: [
    {
      required: true,
      message: "Veuillez renseigner votre domaine",
      trigger: "blur"
    }
  ],

  statut_talent: [
    {
      required: true,
      message: "Veuillez sélectionner le statut professionnel",
      trigger: "change"
    }
  ],

  statut_professionnel_artisan: [
    {
      required: false
    }
  ],

  modeTravail: [
    {
      required: true,
      message: "Veuillez sélectionner le mode de travail",
      trigger: "change"
    }
  ],

  tempsTravail: [
    {
      required: true,
      message: "Veuillez sélectionner le temps de travail",
      trigger: "change"
    }
  ],

  cv: [
    {
      required: true,
      message: "Veuillez ajouter votre CV",
      trigger: "change"
    }
  ],

  cni: [
    {
      required: true,
      message: "Veuillez ajouter votre carte nationale d'identité",
      trigger: "change"
    }
  ]
},
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
        statut_professionnel_artisan :"",
        upload: [],
        niveauExpertise:"",
        CVupload:null,
        modeTravail:"",
        diplome:"",
        tempsTravail:"",
        profilHybride:[]
      },
    };
  },

  computed: {
 isFormComplete() {
      return (
        // this.formState.niveauExpertise?.trim() &&      // Champ texte non vide
        this.formState.statut_talent &&                // Select sélectionné
        this.formState.upload?.length > 0 && 
        this.formState.modeTravail && 
        this.formState.tempsTravail &&
        this.formState.diplome
      );
    },
isProfilHybrideADD(){
  if(this.optionsAnswer === 'oui'){
   return this.profilHybride.length > 0
  }
  return true;
}
    
  },
  //  watch: {
  //   isHybridValid(newVal) {
  //     console.log('Condition:', newVal);
  //   }
  // },
  methods: {
    resetData(){
      this.formState.profilHybride = [];
      const STORE_ABONNEMENT = useAbonnementsStore();
      console.log("this.formState.profilHybride",this.formState.profilHybride)
      STORE_ABONNEMENT.handleChangeInfoForAbonnement(this.formState)
    },
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
       if(!this.isProfilHybrideADD){
        Swal.fire({
    icon: 'info',
    text: 'Ajoutez un profil'
  });
       }else{
        console.log('profilHybride',this.profilHybride)
        if(this.profilHybride.length){
      this.formState.profilHybride = this.profilHybride.map(item=>item.id);
        }
       console.log("this.formState professionnel",this.formState);
        const STORE_ABONNEMENT = useAbonnementsStore();
      STORE_ABONNEMENT.handleChangeInfoForAbonnement(this.formState)
     this.showModalAbonnements = true
       }
     
     
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
     @after-leave="resetData"
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
    
  <a-form
  ref="formRef"
  :model="formState"
  :rules="rules"
  layout="vertical"
  @finish="onHandleProfil"
>
  <a-row :gutter="[16, 16]">

    <a-col :xs="24" :md="12">
      <a-form-item
        label="Niveau d'etude + Domaine"
        name="niveauEtude"
      >
        <a-select
          v-model:value="formState.niveauEtude"
          placeholder="Sélectionnez..."
          size="large"
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

      <a-form-item
        name="diplome"
      >
        <a-input
          v-model:value="formState.diplome"
          placeholder="Ajoutez votre Domaine"
          size="large"
        />
      </a-form-item>
    </a-col>

    <a-col :xs="24" :md="12">
      <a-form-item
        label="Statut professionnel"
        name="statut_talent"
      >
        <a-select
          v-model:value="formState.statut_talent"
          placeholder="Sélectionnez..."
          size="large"
        >
          <a-select-option
            v-for="item in StatutProfessionnel"
            :key="item.id"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>

    <a-col
      :xs="24"
      :md="12"
      v-if="profilHybride.some(item => item.statut.includes('Artisan'))"
    >
      <a-form-item
        label="Statut professionnel artisan"
        name="statut_professionnel_artisan"
      >
        <a-select
          v-model:value="formState.statut_professionnel_artisan"
          placeholder="Sélectionnez..."
          size="large"
        >
          <a-select-option
            v-for="item in StatutProfessionnel"
            :key="item.id"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>

    <a-col :xs="24" :md="12">
      <a-form-item
        label="Mode de travail"
        name="modeTravail"
      >
        <a-select
          v-model:value="formState.modeTravail"
          placeholder="Sélectionnez..."
          size="large"
        >
          <a-select-option
            v-for="item in valueModeDeTravail"
            :key="item.id"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>

    <a-col :xs="24" :md="12">
      <a-form-item
        label="Temps de travail"
        name="tempsTravail"
      >
        <a-select
          v-model:value="formState.tempsTravail"
          placeholder="Sélectionnez..."
          size="large"
        >
          <a-select-option
            v-for="item in valueTempsTravail"
            :key="item.id"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-col>

    <a-col :xs="24" :md="12">
      <a-form-item
        label="CV (Curriculum Vitae)"
        name="CVupload"
      >
        <a-input
          type="file"
          accept="image/*"
          @change="onUploadChangeCV"
          size="large"
        />
      </a-form-item>
    </a-col>

    <a-col :xs="24" :md="12">
      <a-form-item
        label="Carte national d'identité"
        name="upload"
      >
        <a-input
          type="file"
          accept="image/*"
          @change="onUploadChangeCNI"
          size="large"
        />
      </a-form-item>
    </a-col>

    <a-col :span="24">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="!isFormComplete"
      >
        Enregistrer
      </a-button>
    </a-col>

  </a-row>
</a-form>
</template>