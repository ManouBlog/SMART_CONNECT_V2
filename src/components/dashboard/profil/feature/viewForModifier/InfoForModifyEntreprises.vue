<script>
import instance, { lienPhoto } from "../../../../../api/api";
// import VueMultiselect from "vue-multiselect";
import { mapActions, mapState } from "pinia";
import { Help } from "../../../../../utils";
import { useLoadingSpinner } from "../../../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { useRegisterStore } from "../../../../../store-pinia/register/useRegisterStore";
import { useInfoPersonnel } from "../../../../../store-pinia/InfoPersonnelle/useInfoPersonnel";

export default {
  name: "InfoForModifyEntreprises",
  components: {
    // VueMultiselect,
  },
  data() {
    return {
       valueTempsTravail: [
  { value: "Temps partiel", label: "Temps partiel" },
  { value: "Temps plein", label: "Temps plein" },
],

options : [
  { value: "Informel", label: "Informel" },
  { value: "Formel", label: "Formel" },
],
valueModeDeTravail: [
  { value: "Présentiel", label: "Présentiel" },
  { value: "Télétravail", label: "Télétravail" },
  { value: "Hybride", label: "Hybride" }
],
valueExpertise: [
  { value: "Privilége", label: "Privilége" },
  { value: "Normal", label: "Normal" },
],
      user: "",
      emails_cc:[],
      lienPhoto: lienPhoto,
      StoreLoading: useLoadingSpinner(),
      itemsQualificationDynamicInput: [],
      documentLabels : {
  etudiant: "Nouvelle carte d'étudiant",
  professionnel: "Copie du diplôme",
  artisan: "Copie de la CNI",
  veteran: "Certificat de travail"
},
      placeholderDynamicInput: ["05-02-2020", "05-03-2025"],
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
      countryCode:null,
      dataStudentUpdated:null,
      allStatuses:[],
      form: {
      nom: "",
      prenoms: "",
      email: "",
      contact: "",
      phone: "",
      ville: "",
      commune: "",
      quartier: "",
      matricule_cc: "",
      forme_juridique: "",
      optionsPaper:null,
      NCC: "",
      diplome: "",
      modeTravail: "",
      tempsTravail: "",
      titreCv: "",
      bio: "",
      gerant: "",
      numero_gerant: "",
      particulier_prenoms: "",
      statut:"",
      niveauExpertise:"aucun",
      nom_particulier:"",
      fileCharge:null
    },
    };
  },
  computed: {
    ...mapState(useRegisterStore, ["allCompetences"]),
    ...mapState(useInfoPersonnel, ["otherInfoPersonnelle"]),
    isCompanyDisabled(){
    const idsToCheck = ['Formel'];
     const statutId = this.form.optionsPaper;
    if (!idsToCheck.includes(statutId)) return false;

    const rules = {
      'Formel': ["NCC", "matricule_cc","forme_juridique","gerant","numero_gerant","fileCharge"]
    };

    const requiredFields = rules[statutId] || [];

    return requiredFields.some(field => !this.form[field]);
    },
     isDisabled() {


    // Statuts concernés
    const idsToCheck = [5, 6, 7];
     const statutsUser = this.$store.state.infoUserConnected?.user?.statuses.map(item=>item.id)
    if(!idsToCheck.some(el=>statutsUser.includes(el))) return false;

    // Champs obligatoires par statut
    const rules = {
      5: ["tempsTravail", "modeTravail"],
      6: ["niveauExpertise", "tempsTravail", "modeTravail"],
      7: ["niveauExpertise", "tempsTravail", "modeTravail"]
    };

    const requiredFields = rules.statutsUser || [];
    
    return requiredFields.some(field => !this.form[field]);
  }
  },
   watch: {
    'form.optionsPaper'(newValue) {
      console.log("Selected option:", newValue);
      this.form.optionsPaper = newValue;
      console.log("Selected option:", newValue);
    },
  },
  methods: {
    chargerFichier(event) {
      const file = event.target.files[0];
      console.log("file", file)
      if (file) {
        this.form.fileCharge = file;
      }
       if (!file) {
      this.form.fileCharge = null;  // Reset HTML natif
    }
    },
    selectOne(value) {
      console.log("this.form.optionsPaper",this.form.optionsPaper)
      if (this.form.optionsPaper === value) {
        // Déjà sélectionné → ignore le clic (reste sélectionné)
        return;
      }
    this.form.optionsPaper = value;
    
  },
       initForm() {
    const user = this.$store.state.infoUserConnected;
    console.log("initForm",user)
    if (!user) return;

    this.form.nom = this.$store.state.infoUserConnected?.user?.statuses?.some(s => s.statut !== 'Entreprise') ? user.nom : this.form.optionsPaper === 'Formel' ? user.nom:user.nom_particulier;
    this.form.prenoms = user.prenoms || "";
    this.form.email = user.email || "";
    this.form.contact = user.contact || "";
    this.form.phone = user.phone || "";
    this.form.ville = user.ville || "";
    this.form.commune = user.commune || "";
    this.form.quartier = user.quartier || "";
    this.form.statuses  = user.user.statuses.map(item=>item.id)  || "";
    this.form.niveauExpertise = user.niveauExpertise || "";

    this.form.matricule_cc = user.matricule_cc || "";
    this.form.forme_juridique = user.forme_juridique || "";
    this.form.NCC = user.NCC || "";

    this.form.diplome = user.diplome || "";

    this.form.modeTravail = user.modeTravail || "";
    this.form.tempsTravail = user.tempsTravail || "";

    this.form.titreCv = user.titreCv || "";
    this.form.bio = user.bio || "";

    this.form.gerant = user.gerant || "";
    this.form.numero_gerant = user.numero_gerant || "";
    this.form.optionsPaper = user.is_company_verified || "";
    this.form.particulier_prenoms = user.particulier_prenoms || "";
    
  },
    ...mapActions(useRegisterStore, {
      handleCompetence: "addTag",
      getCompetences: "getAllCompetences",
    }),
    ...mapActions(useInfoPersonnel, [
      "update_compte_entreprise",
      "update_compte_particulier",
      "update_compte_student",
      "addAnRegistreDoc",
      "addAnPieceDoc",
      "addAnLogo",
      "changeValueForToogleModalInfoPersonnelle"
    ]),
    async lister_statut() {
  const user = this.$store.state.infoUserConnected?.user;
  const statuses = user?.statuses || [];

  const currentRoles = statuses.map(s => s.statut);

  const transitions = {
    etudiant: ['Etudiant', 'Professionnel', 'Artisan'],
    professionnel: ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'],
    artisan: ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'],
    entreprise: ['Entreprise']
  };

  const allowed = new Set(
    currentRoles.flatMap(role => transitions[role] || [])
  );

  try {
    const response = await instance.get("listStatut");

    this.allStatuses = response.data.data.filter(item =>
      allowed.has(item.statut)
    );

    console.log("allStatuses", {
      statut: this.allStatuses,
      profil: this.$store.state.infoUserConnected
    });

  } catch (error) {
    console.log(error);
  }
},
//     async lister_statut(){
//       const transitions = {
//   etudiant:[this.$store.state.infoUserConnected.user.statut.statut,"professionnel", "artisan"],
//   professionnel:[this.$store.state.infoUserConnected.user.statut.statut,"artisan", "veteran"],
//   artisan:[this.$store.state.infoUserConnected.user.statut.statut,"professionnel", "veteran"],
//   entreprise:[this.$store.state.infoUserConnected.user.statut.statut,'Entreprise']
// };
//       try {
//         const response =  await instance.get("listStatut")
        
//         this.allStatuses = response.data.data.filter(item =>
//   transitions[this.$store.state.infoUserConnected.user.statut.statut]?.includes(item.statut)); 
//   console.log("allStatuses",{
//     statut:this.allStatuses,
//     profil:this.$store.state.infoUserConnected
//   })
//         // this.allStatuses = response.data.data.filter(item=>item.statut == 'Professionnel' || item.statut == 'Artisan' || item.statut == 'Etudiant' || item.statut === 'Veteran')
//       } catch (error) {
//         console.log(error);
//       }
//     },
    async getInfoUser() {
      this.StoreLoading.launchLoading(true);
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          if (resp.data.status === true) {
            
        // console.log("getInfoUser25",resp.data.user)
        const user = resp.data.user;
const statuses = user?.statuses || [];
const statusList = statuses.map(s => s.statut);

const isEntreprise = statusList.includes('Entreprise');

const isStudentGroup = statusList.some(s =>
  ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'].includes(s)
);

if (isEntreprise) {
  this.emails_cc = user.emails?.map(item => item.email_cc) || [];
  this.$store.commit("UPDATE_INFO_CONPANY", user);
}

if (isStudentGroup) {
  user.qualifications = (user.qualifications || []).map(item => ({
    date_debut: item.date_debut?.split(' ')[0],
    date_fin: item.date_fin?.split(' ')[0],
    objet: item.objet,
    detail: item.detail
  }));

  this.$store.commit("UPDATE_INFO_CONPANY", user);
}
        // const statutUser = resp.data.user.user.statut.statut
        // if(statutUser === 'Entreprise'){
        // this.emails_cc = resp.data.user.emails.map(item=> item.email_cc)
        // this.$store.commit("UPDATE_INFO_CONPANY",resp.data.user);
        // // console.log("COMPANY_INFOS",resp.data.user) 
        // }
        // if(statutUser === 'Etudiant' || statutUser === 'Professionnel' || statutUser === 'Artisan' || statutUser === 'Veteran'){
        //   resp.data.user.qualifications.map(item=>{
        //     return {
        //       date_debut:item.date_debut.split(' ')[0],
        //       date_fin:item.date_fin.split(' ')[0],
        //       objet:item.objet,
        //       detail:item.detail
        //     }
        //   });
        //   this.$store.commit("UPDATE_INFO_CONPANY",resp.data.user);
          
        //   // console.log("STUDENT_INFOS",resp.data.user) 
        //   }
            // console.log("this.emails_cc",this.emails_cc)
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.StoreLoading.launchLoading(false);
        });
    },

    async updateInfoEntreprise(company) {
      
      const data = await this.update_compte_entreprise({
        nom: company.nom,
        email: company.email,
        gerant: company.gerant,
        numero_gerant: company.numero_gerant,
        commune: company.commune,
        forme_juridique: company.forme_juridique,
        quartier: company.quartier,
        contact: company.contact,
        ville: company.ville,
        matricule_cc: company.matricule_cc,
        email_cc:this.emails_cc.length ? this.emails_cc:[]
      });
      if(data.status){
        this.$store.commit("UPDATE_INFO_CONPANY",data.data);
        // this.$store.state.infoUserConnected = this.$store.state.infoUserConnected;
        this.changeValueForToogleModalInfoPersonnelle({ isCv: false, isbtnPdf: false })
      }
      // console.log("COMPANY_UPDATE",this.$store.state.infoUserConnected)
    },
    async updateInfoStudent(Talent) {
      // console.log("updateInfoStudent",Talent)
      const data = await this.update_compte_student({
        nom: Talent.nom,
        email: Talent.email,
        prenoms: Talent.prenoms,
        commune: Talent.commune,
        quartier: Talent.quartier,
        contact: Talent.phone,
        ville: Talent.ville,
        bio: Talent.bio,
        diplome: Talent.diplome,
        titreCv: Talent.titreCv,
        modeTravail: Talent.modeTravail,
        tempsTravail:Talent.tempsTravail,
        statut_id:Talent.statut_id,
        niveauExpertise:Talent.niveauExpertise,
        competences:Talent?.competences?.length > 0 ? Help.retirerIdIntoArrayCompetence(Talent.competences):[],
      });
      // console.log("DATA UPDATE STUDENT",data)
      if(data.status){
        this.$store.commit("UPDATE_INFO_CONPANY",data.compte);
        this.changeValueForToogleModalInfoPersonnelle()
      }
    },
    async handleUpdate(payload) {
  console.log('handleUpdate', payload);

  const user = this.$store.state.infoUserConnected?.user;
  const statuses = user?.statuses || [];
  const roles = statuses.map(s => s.statut);

  const isEntreprise = roles.includes('Entreprise');
  const isParticulier = roles.includes('particulier');

  if (isEntreprise) {
    this.updateInfoEntreprise(payload);
    return;
  }

  if (isParticulier) {
    this.update_compte_particulier(payload);
    await this.getInfoUser();
    return;
  }

  this.updateInfoStudent(payload);
  await this.getInfoUser();
},
  //  async handleUpdate(payload) {
  //   console.log('handleUpdate',payload)
     
  //     if (this.$store.state.infoUserConnected.user.statut.statut === "entreprise") {
  //       this.updateInfoEntreprise(payload);
    
  //     } else if (this.$store.state.infoUserConnected.user.statut.statut === "particulier") {
        
  //       this.update_compte_particulier(payload);
  //         await this.getInfoUser();
  //     } else {
  //       this.updateInfoStudent(payload);
  //         await this.getInfoUser();
  //     }
    
  //   },
    onCreateQualification() {
      return { detail: "", date_debut: new Date(), date_fin: new Date() };
    },
    handleInputInput(valueDate) {
      console.log("valueDate", valueDate);
      // console.log("itemsQualificationDynamicInput",this.itemsQualificationDynamicInput)
    },
    handleInputChange(valueDate) {
      console.log("valueDate", valueDate);
    },
  },
  mounted() {
  this.initForm();
},
  async created() {
    await this.getInfoUser();
    this.getCompetences();
    await this.lister_statut();
  },
};
</script>
<template>
  <div class="card-body text-left py-4" v-if="this.$store.state.infoUserConnected">
    <div class="row">
     
      <legend>
  Info personnelle
  {{
    ($store.state.infoUserConnected?.user?.statuses || [])
      .some(s => ['Entreprise', 'particulier'].includes(s.statut))
      ? 'sur l\'Entreprise'
      : ''
  }}
</legend>
      <p style="text-align: center; color: red;font-size: 1em;">
        Les champs avec astérisque (*) sont obligatoires.
      </p>
      <!-- <div class="col-md-12">
   <div
  class="mb-3"
  v-if="!(
    ($store.state.infoUserConnected?.user?.statuses || [])
      .some(s => s.statut === 'Entreprise')
  )"
>
            <label class="form-label">Changer de statut</label>
           
            <select 
            name="statut_id" 
            id="statut_id"
            multiple
            :class="{ 'disabled-custom': form.statut === 'Veteran' }"
            :disabled="form.statut === 'Veteran'"
            style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.statuses"
            @change="()=>{
              form.tempsTravail = '';
              form.modeTravail = '';
            }"
            >
              <option 
              style="text-transform: capitalize;"
              :value="item.id"
              :key="item.id" 
              v-for="item in allStatuses">
                {{ item.statut }}
              </option>
            </select>
            
            </div>
            <div class="mb-3" v-else>
            <label class="form-label">Statut</label>
            <select 
            name="statut_id" 
            id="statut_id"
            style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.statuses"
            @change="()=>{
              console.log('hello world')
            }"
            >
              <option 
              style="text-transform: capitalize;"
              :value="item.id"
              :key="item.id" 
              v-for="item in allStatuses">
                {{ item.statut }}
              </option>
            </select>
            
            </div>
      </div> -->
     <div
  class="col-md-12"
  v-if="
    ($store.state.infoUserConnected?.user?.statuses || [])
      .some(s => s.statut === 'Entreprise')
  "
  style="display: flex; flex-wrap: wrap; justify-content:center; gap: 10px; margin-top: 0.5em; margin-bottom: 1.5em"
>
 <label v-for="item in options" :key="item.value">
  <input
    type="checkbox"
    :value="item.value"
    :checked="form.optionsPaper === item.value"
    @change="selectOne(item.value)"
  />
  {{ item.label }}
</label>
</div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected && $store.state.infoUserConnected?.user?.statuses?.some(s => s.statut === 'Entreprise')
              ? "Raison sociale"
              : "Nom"
          }} <span style="color:red">*</span></label>
          <input v-model="form.nom" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12" 
      v-if='this.$store.state.infoUserConnected 
      && $store.state.infoUserConnected?.user?.statuses?.some(s => s.statut === "entreprise") && this.form.optionsPaper === "Formel"'>
        <div class="mb-3">
          <label class="form-label"
            >RCCM (Registre du Commerce et du Crédit Mobilier)
            <span style="color:red">*</span>
            </label
          >
          <input v-model="form.matricule_cc" class="form-control" type="text" />
        </div>
        <div class="my-3">
         <label class="form-label"
            >Charger le document du RCCM
            <span style="color:red">*</span>
            </label
          >
          <input
            type="file"
            ref="fileInput"
            @input="addAnRegistreDoc"
            id="add_file_registre"
            class="w-100"
            @change="chargerFichier"
          />
        </div>
      </div>
      <div class="col-md-12" 
      v-if='this.$store.state.infoUserConnected 
      && this.$store.state.infoUserConnected?.user?.statuses?.some(s => s.statut === "entreprise") &&
      this.form.optionsPaper === "Formel"
      '>
        <div class="mb-3">
          <label class="form-label">Forme juridique <span style="color:red">*</span></label>
          <input v-model="form.forme_juridique" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12" 
      v-if='this.$store.state.infoUserConnected && 
      this.$store.state.infoUserConnected?.user?.statuses?.some(s => s.statut === "entreprise")
      && this.form.optionsPaper === "Formel"
      ' >
        <div class="mb-3">
          <label class="form-label">NCC (Numéro de compte contribuable) <span style="color:red">*</span></label>
          <input v-model="form.NCC" class="form-control" type="text" />
        </div>
      </div>
     <div
  class="col-md-12"
  v-if="
    ($store.state.infoUserConnected?.user?.statuses || [])
      .some(s => ['Entreprise', 'particulier'].includes(s.statut))
  "
>
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected?.user?.statuses?.some(s => s.statut == "entreprise")
            && this.form.optionsPaper === "Formel"
              ? "Contact téléphonique de l'entreprise"
              : "Contact téléphonique"
          }} <span style="color:red">*</span></label>
          <input v-model="form.contact" class="form-control" type="text" />
        </div>
      </div>
      <div
  class="col-md-12"
  v-if="
    ($store.state.infoUserConnected?.user?.statuses || [])
      .some(s => ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'].includes(s.statut))
  "
>
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="form.prenoms" class="form-control" type="text" />
        </div>
      </div>
      <div
        class="col-md-12"
        v-if="this.$store.state.infoUserConnected && this.$store.state.infoUserConnected?.user?.statuses?.some(s => s.statut === 'particulier')"
      >
        <div class="mb-3">
          <label class="form-label">Prénoms</label>
          <input v-model="form.particulier_prenoms" class="form-control" type="text" />
        </div>
      </div>

      <div class="col-md-12" v-if="this.$store.state.infoUserConnected">
        <div class="mb-3">
          <label class="form-label">{{
            this.$store.state.infoUserConnected?.user?.statuses?.some(s => s.statut === 'Entreprise')
            && this.form.optionsPaper == "Formel"
              ? "Contact mail de l'entreprise"
              : "Email"
          }} <span style="color:red">*</span> </label>
          <input v-model="form.email" class="form-control" type="email" />
        </div>
      </div>
      <div class="col-md-12 my-2" 
      v-if="this.$store.state.infoUserConnected && 
     this.$store.state.infoUserConnected?.user?.statuses?.some(s => s.statut === 'Entreprise')
      && this.form.optionsPaper === 'Formel'
      ">
      <label class="form-label">Emails secondaires(cc)</label>
      <n-dynamic-input
       v-model:value="emails_cc"
         placeholder="Ajouter un email en copie"
  :max="6"
  :item-style="{
    borderColor: 'gray'
  }"
/>
      </div>
  
     <div
  class="col-md-12"
  v-if="
    $store.state.infoUserConnected &&
    $store.state.infoUserConnected.user?.statuses?.some(s =>
      ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'].includes(s.statut)
    )
  "
>
  <div class="mb-3">
    <label class="form-label">Contact</label>
    <input v-model="form.phone" class="form-control" type="text" />
  </div>
</div>

      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Ville</label>
          <input v-model="form.ville" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Commune</label>
          <input v-model="form.commune" class="form-control" type="text" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label">Quartier</label>
          <input v-model="form.quartier" class="form-control" type="text" />
        </div>
      </div>
      <section 
     v-if="
    $store.state.infoUserConnected &&
    $store.state.infoUserConnected.user?.statuses?.some(s =>
      ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'].includes(s.statut)
    )
  ">
      
        <div class="col-md-12">
          <div class="mb-3"  
          v-if="
    $store.state.infoUserConnected.user?.statuses?.some(s => s.statut === 'Etudiant')
  ">
            <label class="form-label">Dernier diplôme academique</label>
            <input v-model="form.diplome" class="form-control" type="text" />
          </div>
          <div class="mb-3" 
          
         v-if="
    $store.state.infoUserConnected.user?.statuses?.some(s =>
      ['Professionnel', 'Veteran'].includes(s.statut)
    )
  ">
            <div>
     <label class="form-label">Niveau actuel + diplome</label>
            <input v-model="form.diplome" class="form-control" type="text" />
            </div>

            <div>
              <!-- {{ this.$store.state.infoUserConnected }} -->
            <label class="form-label">Mode de travail</label>
            <select 
            name="mode_travail1" 
            id="mode_travail1"
          style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.modeTravail"
            >
              <option value="">Séléctionne un mode de travail</option>
              <option 
              :value="item.value"
              :key="item.value" 
              v-for="item in valueModeDeTravail">
                {{ item.label }}
              </option>
            </select>
            </div>
            <div>
            <label class="form-label">Temps de travail</label>
            <select 
            name="time_work" 
            id="time_work"
            style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.tempsTravail"
            >
              <option value="">Séléctionne un temps de travail</option>
              <option 
              :value="item.value"
              :key="item.value" 
              v-for="item in valueTempsTravail">
                {{ item.label }}
              </option>
            </select>
            </div>
       
          </div>
          <div class="mb-3" 
          v-if="$store.state.infoUserConnected.user?.statuses?.some(s => s.statut === 'Veteran')">
            
            <div>
            <label class="form-label">Traitement préférentiel</label>
            <select 
            name="treatmentPriorize" 
            id="treatmentPriorize"
          style="width:100%;padding:0.8em;border-radius: 10px;border:1.2px solid orange"
            v-model="form.niveauExpertise"
            >
              <option 
              :value="item.value"
              :key="item.value" 
              v-for="item in valueExpertise">
                {{ item.label }}
              </option>
            </select>
            </div>
           
       
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label"
              >Mon Profil
              <small class="text-muted"
                >(ex. : Développeur Web, Designer UX, etc.)</small
              ></label
            >
            <input v-model="form.titreCv" class="form-control" type="text" />
          </div>
        </div>
      </section>
      <section 
     v-if="
    $store.state.infoUserConnected &&
    $store.state.infoUserConnected.user?.statuses?.some(s =>
      ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'].includes(s.statut)
    )
    ">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Biographie – résumé de votre profil (max 300 caractères)</label>
            <textarea
              id="msg"
              name="msg"
              maxlength="300"
              style="width: 100%; border-radius: 5px; height: 100px;border:1px solid orange"
              placeholder="Présentez-vous en quelques lignes..."
              v-model="form.bio"
            ></textarea>
          </div>
        </div>
      </section>
      <section 
      v-if="this.$store.state.infoUserConnected 
      && $store.state.infoUserConnected.user?.statuses?.some(s => s.statut === 'Entreprise')
      && this.form.optionsPaper === 'Formel'
      ">
        <div class="col-md-12">
          <div class="my-3">
            <label for="add_file_logo">Logo</label>
            <input type="file" @input="addAnLogo" id="add_file_logo" class="w-100" />
          </div>
        </div>

        <legend>Info sur le gérant</legend>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Gérant <span style="color:red">*</span></label>
            <input v-model="form.gerant" class="form-control" type="text" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Numéro téléphonique du Gérant <span style="color:red">*</span></label>
            <input v-model="form.numero_gerant" class="form-control" type="text" />
          </div>
        </div>
      </section>

      <!-- <div class="col-md-12">
        <div class="my-3">
          <label for="add_file">
  {{
    documentLabels[
      this.$store.state.infoUserConnected?.user?.statut?.statut
    ] || "Nouvelle pièce du gérant (jpg,png)"
  }}
</label>
          <input
            type="file"
            multiple
            @input="addAnPieceDoc"
            id="add_file_piece"
            class="w-100"
          />
        </div>
      </div> -->
      
    </div>
    <div class="text-right">
      <button
      v-if="$store.state.infoUserConnected.user?.statuses?.some(s => s.statut !== 'Entreprise')"
       :class="{ 'disabled-custom': isDisabled }"
        class="btn bg-warning"
         :disabled="isDisabled"
        style="border: none"
        @click.prevent="handleUpdate(this.form)"
      >
        Modifier
      </button>
       <button
        v-else
       :class="{ 'disabled-custom': isCompanyDisabled }"
        class="btn bg-warning"
        :disabled="isCompanyDisabled"
        style="border: none"
        @click.prevent="handleUpdate(this.form)"
      >
        Modifier
      </button>
    </div>
  </div>
  <div v-else style="text-align:center;">
   Chargement...
  </div>
</template>
<style scoped>
.input_class {
  width: 100%;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid gray;
}
:deep(.n-input__input-el:hover) {
  color: orange !important;
}
.form-control {
  padding: 1.5em !important;
  border-radius: 10px !important;
}
</style>
