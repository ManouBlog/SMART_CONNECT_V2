<script>
import Politics from "../../../../../components/feature/Politics.vue";
import { mapActions, mapState } from "pinia";
import { configUtils } from "../../../../../Shared/Utils";
import { useTranslateStore } from "../../../../../store-pinia/Translate/useTranslateStore";
import { useSwalPopup } from "../../../../../store-pinia/SwalPopup/useSwalPopup";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
export default {
  name: "RegsiterEntreprise",
  components: {
    Politics,
  },
  data() {
    return {
      SWALPOPUP: useSwalPopup(),
      configUtils:configUtils,
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
      texte11:"",
      texte12:"",
      texte13:"",
      texte14:"",
      texte15:"",
      texte16:"",
      texte17:"",
      texte18:"",
      texte19:"",
      texte20:"",
      texte21:"",
      texte22:"",
      texte23:"",
      texte24:"",
      texte25:"",
      texte26:"",
      open: true,
      formState: {
        nom: "",
        prenoms: "",
        phone: "",
        ville: "",
        commune: "",
        quartier: "",
        diplome: "",
        carte_student: "",
        myCompetence: [],
        Logo:[],
        password:"",
        myRegister:"",
        myLogo:"",
        upload: [],
        photo:null,
        Phonegerant:null,
      },
      verifChiffre: /[!@#$%^&*(),.?":{}|<>_-]/,
      competences: [],
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences", "isPolitics"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
     addPhotoInArray(allPhotos){
    const element = []
    allPhotos.forEach(item=>{
      element.push(item.originFileObj)
    })
    return element;
    },
    onFinish(values) {
      console.log("Success:", values);
        if (this.configUtils.isValidPhoneNumber(this.formState.phone) 
        && this.configUtils.isValidPhoneNumber(this.formState.Phonegerant)) {
   if(this.formState.upload.length){
      this.formState.photo = this.addPhotoInArray(this.formState.upload);
      // // console.log("this.formState",this.formState)
      // alert(JSON.stringify(this.formState,null,2))
     this.changeValueIsPolitics({value:true,infoUser:'entreprise',payload:this.formState});
    }else{
      this.SWALPOPUP.declencheSwalPopup("info", 
    "Ajouter la Pièce du gérant");
    }
        }else{
        this.SWALPOPUP.declencheSwalPopup("info", 
        "Les numéros de téléphone doivent contenir 10 chiffres");
      }
   
      
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
    handleChangeCardStudent(value) {
      console.log(value.file.originFileObj);
    },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      // getCompetences: "getAllCompetences",
      changeValueIsPolitics: "changeValueIsPolitics",
    }),
  },
  async created() {
    // this.getCompetences();
    this.texte = await this.handleTranslate("Entreprise");
    this.texte1 = await this.handleTranslate(
      "Matricule cc"
    );
    this.texte2 = await this.handleTranslate("Numéro de l'entreprise");
    this.texte3 = await this.handleTranslate("Ville");
    this.texte4 = await this.handleTranslate("Commune");
    this.texte5 = await this.handleTranslate("Quartier");
    this.texte6 = await this.handleTranslate("Email de l'entreprise");
    this.texte7 = await this.handleTranslate("Forme juridique");
    this.texte8 = await this.handleTranslate("Gérant");
    this.texte9 = await this.handleTranslate("Numéro du Gérant");
    this.texte10 = await this.handleTranslate("Pièce du gérant (jpg,jpeg)"); 
    this.texte11 = await this.handleTranslate("Registre (pdf)"); 
    this.texte12 = await this.handleTranslate('Mot de passe');
    this.texte13 = await this.handleTranslate("S'inscrire");
    this.texte14 = await this.handleTranslate('Veuillez renseigner votre mot de passe!');
    this.texte15 = await this.handleTranslate('Veuillez renseigner le numéro votre Gérant!');
    this.texte16 = await this.handleTranslate('Veuillez renseigner votre Gérant!');
    this.texte17 = await this.handleTranslate('Veuillez renseigner votre Forme juridique!');
    this.texte18 = await this.handleTranslate('Veuillez renseigner votre email!');
    this.texte19 = await this.handleTranslate('Veuillez renseigner votre Quartier!');
    this.texte20 = await this.handleTranslate('Veuillez renseigner votre Commune!');
    this.texte21 = await this.handleTranslate('Veuillez renseigner votre Ville!');
    this.texte22 = await this.handleTranslate('Veuillez renseigner votre Contact!');
    this.texte23 =  await this.handleTranslate('Veuillez renseigner votre Matricule!');
    this.texte24 = await this.handleTranslate('Veuillez renseigner votre nom!');
    
  },
};
</script>
<template>
  <Politics 
  v-if="isPolitics" 
  />
  <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      :label="texte"
      name="nom"
      :rules="[{ required: true, message: texte24 }]"
    >
      <a-input v-model:value="formState.nom" />
    </a-form-item>
    <a-form-item
      :label="texte1"
      name="matricule_cc"
      :rules="[{ required: true, message: texte23 }]"
    >
      <a-input v-model:value="formState.matricule_cc" />
    </a-form-item>
    

    <a-form-item
      :label="texte2"
      name="contact"
      :rules="[{ required: true, message: texte22 }]"
    >
      <a-input v-model:value="formState.contact" />
    </a-form-item>
    <a-form-item
      :label="texte3"
      name="ville"
      :rules="[{ required: true, message: texte21 }]"
    >
      <a-input v-model:value="formState.ville" />
    </a-form-item>
    <a-form-item
      :label="texte4"
      name="commune"
      :rules="[{ required: true, message: texte20 }]"
    >
      <a-input v-model:value="formState.commune" />
    </a-form-item>
    <a-form-item
      :label="texte5"
      name="quartier"
      :rules="[{ required: true, message: texte19 }]"
    >
      <a-input v-model:value="formState.quartier" />
    </a-form-item>

    <a-form-item
      :label="texte6"
      name="email"
      :rules="[{ required: true, message: texte18 }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>
  
    <a-form-item
      :label="texte7"
      name="juridique"
      :rules="[{ required: true, message: texte17 }]"
    >
      <a-input v-model:value="formState.juridique" />
    </a-form-item>
    <a-form-item
      :label="texte8"
      name="gerant"
      :rules="[{ required: true, message: texte16 }]"
    >
      <a-input v-model:value="formState.gerant" />
    </a-form-item>

    <a-form-item
      :label="texte9"
      name="Phonegerant"
      :rules="[{ required: true, message: texte15 }]"
    >
      <a-input v-model:value="formState.Phonegerant" />
    </a-form-item>
    <a-form-item
     name="piece_gerant"
    :label="texte10"
    >
        <a-upload
          @change="handleChangeCardStudent"
          v-model:fileList="formState.upload"
          name="piece_gerant"
          list-type="picture"
          :multiple="true"
          :maxCount="2"
          accept=".jpg,.jpeg,.png,.webp"
        >
          <a-button> Clique pour télécharger </a-button>
        </a-upload>
      </a-form-item>
    <a-form-item 
    :rules="[{ required: true, message: texte11 }]"
    name="Registre" :label="texte11">
        <a-upload
          @change="handleChangeCardStudent"
          v-model:fileList="formState.Registre"
          name="Registre"
          list-type="picture"
          :multiple="false"
          :maxCount="1"
          accept=".pdf"
        >
          <a-button> Clique pour télécharger </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item 
      name="Logo" 
      :label="'Logo(jpeg,jpg)'"
      >
        <a-upload
          @change="handleChangeCardStudent"
          v-model:fileList="formState.Logo"
          name="logo"
          :multiple="false"
          :maxCount="1"
          accept=".jpg,.jpeg,.png,.webp"
          list-type="picture"
        >
          <a-button> Clique pour télécharger </a-button>
        </a-upload>
      </a-form-item>
      

    <a-form-item
      :label="texte12"
      name="password"
      :rules="[{ required: true, message: texte14 }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
  
    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          {{texte13}}</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>

