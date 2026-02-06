<script>
import Swal from "sweetalert2";
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import Tesseract from 'tesseract.js'
export default {
  name: "RegsiterEntreprise",
  components: {
    Politics,
  },
  data() {
    return {
          fileList : [],
 loading : false,
 rawText : '',
 result : null,
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
      formState: {
      nom_particulier:"",
        nom: "",
        prenoms: "",
        phone: "",
        ville: "",
        commune: "",
        quartier: "",
        diplome: "",
        carte_student: "",
        myCompetence: [],
        Logo: [],
        upload: [],
        password: "",
        myRegister: "",
        myLogo: "",
        photo: null,
        countryCode: "+225",
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
      if (this.formState.upload.length) {
        this.formState.photo = this.addPhotoInArray(this.formState.upload);
        this.changeValueIsPolitics({
          value: true,
          infoUser: "particulier",
          payload: this.formState,
        });
      } else {
        this.SWALPOPUP.declencheSwalPopup(
          "info",
          "Ajouter votre carte etudiante ou une preuve"
        );
      }
      // this.changeValueIsPolitics({value:true,infoUser:'particulier',payload:this.formState});
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
      Swal.fire({
        icon: "warning",
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
    // handleChangeCardStudent(value) {
    //   console.log(value.file.originFileObj);
    // },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),
     onUploadChange({ fileList: newList }) {
  // fileList.value = newList
  console.log('onUploadChange', newList);
  if (!newList.length) return

  this.rawText = ''
  this.result = null

  this.runOCR(newList)
},
async runOCR(files) {
  this.loading = true
  let fullText = ''

  for (const f of files) {
    const file = f.originFileObj
    if (!file || !file.type.startsWith('image/')) continue

    const canvas = await this.preprocessImage(file)
    const { data } = await Tesseract.recognize(canvas, 'fra')
    fullText += '\n' + (data.text || '')
  }

  this.rawText = this.cleanOCRText(fullText)

  if (!this.hasReadableText(fullText)) {
    this.result = {
      score: 0,
      isCardIdentity: false,
      reason: 'Aucun texte exploitable détecté'
    }
    this.loading = false
    return
  }

  this.analyzeText(fullText)
  this.loading = false
},
hasReadableText(text) {
  const lettersOnly = text
    .replace(/\s/g, '')
    .replace(/[^a-zA-ZÀ-ÿ]/g, '')

  return lettersOnly.length >= 5
},
normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')              // enlève les accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')  // ponctuation OCR bizarre
    .replace(/\s+/g, ' ')
},
analyzeText(text) {
  console.log('Texte OCR nettoyé :', this.normalizeText(text))
  const cleanText = this.normalizeText(text)
  let score = 0

  if (cleanText.length > 80) score += 20

  const keywordHits = this.PIECE_KEYWORDS.filter(k =>
    cleanText.includes(k)
  ).length

  score += Math.min(keywordHits * 10, 40)
  console.log(`Score basé sur les mots-clés : ${score} (hits: ${keywordHits})`)

  if (cleanText.includes('nationalite') || cleanText.includes('nationalité')) {
   console.log("Mot-clé 'nationalité' détecté, ajout de 20 points")
    score += 20
  }
  // if (cleanText.match(/\b(l[123]|m[12])\b/)) score += 10

  this.result = {
    score,
    isCardIdentity: score >= 40
  }
},
cleanOCRText(text) {
  return text
    // supprimer caractères parasites fréquents OCR
    .replace(/[|«»“”]/g, '')
    .replace(/_{2,}/g, ' ')
    .replace(/-{2,}/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim()
},
preprocessImage(file) {
  return new Promise(resolve => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = () => (img.src = reader.result)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = img.width
      canvas.height = img.height

      ctx.filter = 'grayscale(1) contrast(1.5)'
      ctx.drawImage(img, 0, 0)

      resolve(canvas)
    }

    reader.readAsDataURL(file)
  })
},
  },
  async created() {
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
    this.texte10 = await this.handleTranslate("Ajouter une pièce d'identité bien visible");
  },
};
</script>
<template>
  <Politics v-if="isPolitics" />
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="on"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      :label="texte"
      name="nom"
      :rules="[{ required: true, message: 'Ajouter votre nom' },{
  pattern: /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/,
  message: 'Veuillez saisir uniquement des lettres.'
}]"
    >
      <a-input v-model:value="formState.nom" placeholder="Entrez votre nom" />
    </a-form-item>
    
    <a-form-item
      :label="texte1"
      name="prenoms"
      :rules="[{ required: true, message: 'Ajouter vos prénoms' },{
  pattern: /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/,
  message: 'Veuillez saisir uniquement des lettres.'
}]"
    >
      <a-input v-model:value="formState.prenoms" placeholder="Entrez vos prénoms" />
    </a-form-item>
    <a-form-item
      :label="'Nom de l\'entreprise'"
      name="nom_particulier"
    >
      <a-input v-model:value="formState.nom_particulier" placeholder="Entrez le nom de votre entreprise" />
    </a-form-item>
    <a-form-item
      :label="texte2"
      name="contact"
      :rules="[{ required: true, message: 'Ajouter un contact' }, {
      pattern: /^\d{10}$/,
      message: 'Le numéro de téléphone doit contenir exactement 10 chiffres.'
    }]"
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
    <a-form-item
      :label="texte3"
      name="ville"
      :rules="[{ required: true, message: 'Ajouter une ville' }]"
    >
      <a-input v-model:value="formState.ville" placeholder="Ajouter votre ville" />
    </a-form-item>
    <a-form-item
      :label="texte4"
      name="commune"
      :rules="[{ required: true, message: 'Ajouter une commune'  }]"
    >
      <a-input v-model:value="formState.commune" placeholder="Ajouter votre commune" />
    </a-form-item>
    <a-form-item :label="texte5" name="quartier">
      <a-input v-model:value="formState.quartier" placeholder="Ajouter votre quartier"/>
    </a-form-item>

    <a-form-item
      :label="texte6"
      name="email"
      :rules="[{ required: true, message: 'Ajouter un email' },
      { type: 'email', message: 'Veuillez entrer un email valide' }]"
    >
      <a-input v-model:value="formState.email" placeholder="Ajouter votre adresse email" />
    </a-form-item>
    <a-form-item
      name="upload"
      :label="texte10"
      :rules="[{ required: true, message: texte10 }]"
    >
      <a-upload
  
        v-model:fileList="formState.upload"
        name="upload"
        list-type="picture"
        :multiple="true"
        :maxCount="1"
        accept=".jpg,.jpeg,.png,.webp"
        @change="onUploadChange"
      >
        <a-button> Clique pour charger </a-button>
      </a-upload>
    </a-form-item>
    <a-spin v-if="loading" tip="Vérification de la carte d'identité" />
      <span style="color:red;" v-if="this.result && this.result.isCardIdentity === false">Veuillez ajouter une carte d'identité bien visible</span>

    <a-form-item
      :label="texte12"
      name="password"
      :rules="[{ required: true, message: 'Ajouter un mot de passe' }]"
    >
      <a-input-password v-model:value="formState.password" placeholder="Ajouter votre mot de passe" />
    </a-form-item>

    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button :disabled="isPasswordDisabled" type="primary" shape="round" :size="'large'" html-type="submit">
          {{ texte13 }}</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>
