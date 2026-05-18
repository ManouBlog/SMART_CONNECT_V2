<script>
import instance from "../../../api/api";
import Editor from "./text-editor.vue";
import Swal from "sweetalert2";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { mapActions, mapState } from "pinia";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import VueMultiselect from "vue-multiselect";
export default {
  name: "DetailOffre",
  components: {
    Editor,
    HeaderDashboard,
    VueMultiselect, 
  },
  data() {
    return {
      isLoading:false,
      loadingSpinner:useLoadingSpinner(),
      texte0: "",
      offre_mode_travail:null,
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
       countries: [],
       offre_pays:null,
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
      texte27:"",
      offresInteressByStudents: null,
      offre: null,
      salaire: null,
      lieu: null,
      debut: null,
      chooseStatut:[],
      allStatuses:[],
      fin: null,
      description: null,
      offres: [],
      userInfo:null,
      spinner: false,
      offre_id: null,
      modify_offre: false,
      id_offre_update: null,
      creer: true,
      confirmation_for_delete: false,
      id_for_delete: "",
      moneyFormat: new Intl.NumberFormat("de-DE"),
      categorie: "",
      competenceWithCategorie: [],
      competence: "",
      Today: new Date().toJSON().slice(0, 10),
      spinnerModify: true,
      categories: [],
      offre_detaiId:null,
      OptionsOfpointage: [
        {
          id: 2,
          libelle: "Heure",
        },
        {
          id: 1,
          libelle: "Jour",
        },
        {
          id: 5,
          libelle: "Semaine",
        },
        {
          id: 4,
          libelle: "Mois",
        },
        {
          id: 3,
          libelle: "Trimestre",
        },
      ],
      pointage: "",
      formState: {
        categorie_offre_id: null,
        enable_urgent:null,
        hour_debut:null,
        hour_fin:null,
        competence_id: null,
        nom_offre: '',
        salaire: '',
        lieu: '',
        typeMission: 'immediat',
        job_debut: '',
        job_fin: '',
        description: '',
        otherDomaine: '',
        otherPoste: ''
      },
         rules: {
  nom_offre: [
    {
      required: true,
      message: "Le nom de la mission est obligatoire",
      trigger: "blur"
    }
  ],

  salaire: [
    {
      required: true,
      message: "Le prix est obligatoire",
      trigger: "blur"
    },
    {
      pattern: /^[0-9]+$/,
      message: "Le prix doit contenir uniquement des chiffres",
      trigger: "blur"
    }
  ],

  lieu: [
    {
      required: true,
      message: "Le lieu est obligatoire",
      trigger: "blur"
    }
  ],

  typeMission: [
    {
      required: true,
      message: "Veuillez choisir la disponibilité",
      trigger: "change"
    }
  ],

  categorie_offre_id: [
    {
      required: true,
      message: "Veuillez sélectionner une catégorie",
      trigger: "change"
    }
  ],

  competence_id: [
    {
      required: true,
      message: "Veuillez sélectionner une compétence",
      trigger: "change"
    }
  ],

  description: [
    {
      required: true,
      message: "La description est obligatoire",
      trigger: "blur"
    },
    {
      min: 10,
      message: "La description doit contenir au moins 10 caractères",
      trigger: "blur"
    }
  ]
},
    };
  },
  computed: {
    ...mapState(useOffreStore, ["categoriesOffres", "allCompetences"]),
    isDisabled() {
    return (
      !this.formState.nom_offre ||
      !this.formState.salaire ||
      !this.formState.lieu ||
      !this.formState.typeMission ||
      !this.formState.description ||
       !this.formState.categorie_offre_id 
      || !this.formState.competence_id
    )},
     filteredOptions() {
    // Si "TOUS" est sélectionné, n'affiche que "TOUS"
    if (this.chooseStatut.some(item => item.statut === 'Tous')) {
      return this.allStatuses.filter(item => item.statut === 'Tous');
    }
    if (this.chooseStatut.some(item => item.statut !== 'Tous')) {
      return this.allStatuses.filter(item => item.statut !== 'Tous');
    }
    return this.allStatuses;
  }
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useOffreStore, ["get_categorie", "getAllCompetences"]),
      async listerCountries() {
    try {
      const response = await instance.get("countries");
      this.countries = response.data;
   
    } catch (error) {
      console.log(error);
    }
  },
    async lister_statut(){
      try {
        const response =  await instance.get("listStatut")
        
          if (response.data.status) {
      let allStatuses = [];
  // Statut connecté
  const monStatut = this.userInfo?.user?.statut?.statut.toLowerCase() || '';
  
  if (monStatut === 'entreprise') {
    // ✅ Entreprise voit TOUS sauf admin/entreprise/particulier
    allStatuses = response.data.data.filter(item => 
      item.statut?.toLowerCase() !== 'admin' &&
      item.statut?.toLowerCase() !== 'entreprise' &&
      item.statut?.toLowerCase() !== 'particulier'
    );
    allStatuses.push({ id: "Tous", statut: "Tous" });
  } else if (monStatut === 'particulier' || this.userInfo?.user.statuses.some(itm=>itm.statut == 'Particulier') ) {
    // ✅ Particulier voit SEULEMENT artisans
    allStatuses = response.data.data.filter(item => 
      item.statut?.toLowerCase() === 'artisan'
    );
  }
   
  this.allStatuses = allStatuses;
          }

      } catch (error) {
        console.log(error);
      }
    },
     async getInfoUser() {
      if (this.$store.state.token) {
        await instance
          .get("voirInfoUserConnect")
          .then((resp) => {
            if (resp.data.status === true) {
              this.userInfo = resp.data.user;  
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
     async update_mission() {
      this.loadingSpinner.launchLoading(true);

  if (this.formState.typeMission === 'date') {
      if (!this.formState.job_debut || !this.formState.job_fin) {
        Swal.fire({
          icon: 'warning',
          title: 'Dates obligatoires',
          text: 'Veuillez renseigner la date de début et la date de fin.'
        })
        return
      }
    }
  // Si mission immédiate → date du jour
  if (this.formState.typeMission === "immediat") {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    this.formState.job_debut = `${yyyy}-${mm}-${dd}`;
  }

  try {
    const res = await instance.put("modify_offre_entreprise/"+this.$route.params.id,this.formState);
    if (res.data.status === true) {
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (res.data.status === false) {
      Swal.fire({
        icon: "error",
        title: res.data.message,
        showConfirmButton: true,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.response?.data?.message,
      showConfirmButton: true,
    });
  } finally {
    this.loadingSpinner.launchLoading(false);
  }
},
    async loadDetailOffre() {
      this.loadingSpinner.launchLoading(true);
      try{
     const id = this.$route.params.id
      const { data } = await instance.get(`detail_offre/${id}`)
      const offre = data.data
      console.log("loadDetailOffre",offre)
      this.offre_detaiId = offre;
      this.formState.categorie_offre_id = offre.categorie_offre_id
      this.formState.competence_id = offre.competence_id
      this.formState.nom_offre = offre.nom_offre
      this.formState.salaire = offre.salaire
      this.formState.lieu = offre.lieu
      this.formState.typeMission = offre.job_fin ? 'date':'immediat'
      this.formState.job_debut = offre.job_debut
      this.formState.job_fin = offre.job_fin
      this.formState.description = offre.description
      this.formState.otherDomaine = offre.otherDomaine || ''
      this.formState.otherPoste = offre.otherPoste || ''
      this.formState.enable_urgent = offre.enable_urgent ? true:false;
      this.formState.hour_debut = offre.hour_debut;
      this.formState.hour_fin = offre.hour_fin;
      this.selectCategorieFormState(offre.categorie_offre_id);
      this.chooseCompetenceFormState(offre.competence_id);
      }catch(error){
        console.log(error)
      }finally{
        this.spinnerModify = false
        this.loadingSpinner.launchLoading(false);
      }
      
    },
    update_offre() {
      this.loadingSpinner.launchLoading(true);
      this.isLoading = true;
      instance
        .put("modify_offre_entreprise/" + this.$route.params.id, {
          nom_offre: this.offre_id.nom_offre,
          description: this.offre_id.description,
          debut: this.offre_id.debut,
          fin: this.offre_id.fin,
          salaire: this.offre_id.salaire,
          pointage: this.offre_id.pointage,
          lieu: this.offre_id.lieu,
          competence_id: this.offre_id.competence_id,
          nbre_person:this.offre_id.nbre_person
        })

        .then((res) => {
        
          this.modify_offre = false;
          this.id_offre_update = "";
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: true,
          });
        })
        .catch((error) => {
         
          Swal.fire({
            icon: "info",
            title: error?.response?.data?.message,
            showConfirmButton: true,
          });
        })
        .finally(()=>{
          this.loadingSpinner.launchLoading(false);
          this.isLoading = false;
        })
    },
    filterOption(input, option) {
     
    return (option?.categorie ?? '').toLowerCase().includes(input.toLowerCase());
    },
    show_offre_id() {
      this.loadingSpinner.launchLoading(true);
      instance
        .get("detail_offre/"+this.$route.params.id)
        .then((res) => {
          this.offre_id = res.data.data;
          console.log("detail_offre_entreprise",this.offre_id)
          this.getCompetenceWithCategorie(this.offre_id.categorie_offre_id)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(()=>{
          this.spinnerModify = false;
          this.loadingSpinner.launchLoading(false);
        })
    },
    selectCategorie(e) {
   
      this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(e.target.value)
      );
    },
     selectCategorieFormState(value) {
  
  this.formState.categorie_offre_id = value;
  this.formState.competence = '';
  this.formState.otherDomaine = "";
  this.formState.otherPoste = "";
  this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(value)
      );

},
chooseCompetenceFormState(value) {

  this.formState.competence = value;

  // Reset champ "autre poste" si changement
  this.formState.otherPoste = "";
},
async confirmRelance(payload) {
  try {
    const result = await Swal.fire({
      title: 'Relancer la confirmation ?',
      text: 'Voulez-vous vraiment relancer la mission ? Cette action mettra fin à l’accord avec l\'artisan concerné précedement.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'orange',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, relancer',
      cancelButtonText: 'Annuler'
    });

    if (!result.isConfirmed) return;
     this.loadingSpinner.launchLoading(true);
    console.log("confirmRelance", payload);

    // appel API
    const response = await instance.post(`relance_mission/${payload.id}`);
   if(response.data.status){
   await Swal.fire({
      title: 'Confirmation relancée',
      icon: 'success'
    });
   }
  
  } catch (error) {
    console.error(error);

    await Swal.fire({
      title: 'Erreur',
      text: error,
      icon: 'error'
    });

  } finally {
     this.loadingSpinner.launchLoading(false);
  }
},

    getCompetenceWithCategorie(idCategorie){
    
     this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(idCategorie)
      );
      
    },
    
  },
  async created() {
    await this.getInfoUser();
    await this.get_categorie();
    await this.getAllCompetences();
    if(this.$store.state.user?.user?.statut?.statut === 'Entreprise'){
    await this.show_offre_id();
    await this.lister_statut();
    await this.listerCountries();
    }else{
      await this.loadDetailOffre();
    }
    this.texte0 = await this.handleTranslate('Modifier Mon offre');
    this.texte1 = await this.handleTranslate("Domaines");
    this.texte2 = await this.handleTranslate('Sélectionner une domaine');
    this.texte3 = await this.handleTranslate("Choisir le poste");
    this.texte4 = await this.handleTranslate('Choisir un poste');
    this.texte5 = await this.handleTranslate('Veuillez choisir un domaine');
    this.texte6 = await this.handleTranslate('Pas de donnée');
    this.texte7 = await this.handleTranslate("Nom de l'offre");
    this.texte8 = await this.handleTranslate('Honoraire (Fcfa)');
    this.texte9 = await this.handleTranslate("Termes de paiements");
    this.texte10 = await this.handleTranslate('Payer Par');
    this.texte11 = await this.handleTranslate('Nombre de postes disponibles');
    this.texte12 = await this.handleTranslate("Lieu de l'emploi");
    this.texte13 = await this.handleTranslate("Date et heure de début de l'offre");
    this.texte14 = await this.handleTranslate("Date et heure d'expiration de l'offre");
    this.texte15 = await this.handleTranslate("Date et heure de début de travail");
    this.texte16 = await this.handleTranslate("Date et heure de fin de travail");
    this.texte17 = await this.handleTranslate("Description");
    this.texte18 = await this.handleTranslate("Modifier"); 
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="this.$store.state.user.user.statut.statut === 'Entreprise' ? texte0:'Modifier Ma mission'"
      :subTitleHeader="this.$store.state.user.user.statut.statut === 'Entreprise' ? texte0:'Modifier Ma mission'"
    />
    <div v-if="!spinnerModify">
      <form v-if="offre_id && this.$store.state.user.user.statut.statut === 'Entreprise'" class="container">
        <div class="row">
          <div class="text-left my-3 col-md-6">
            <label for="categorie">{{texte1}}</label>
            <select id="categorie" 
            v-model="offre_id.categorie_offre_id" @change="selectCategorie">
              <option value="" disabled>{{texte2}}</option>
              <option
                :value="item.id"
                v-for="(item, index) in categoriesOffres"
                :key="index"
              >
                {{ item.categorie }}
              </option>
            </select>
          </div>
         
          <div class="text-left my-3 col-md-6">
            <label for="competences">{{texte3}}</label>
            <select id="competences"  
            v-model="offre_id.competence_id">
              <option value="" disabled>{{texte4}}</option>
              <option
                :value="item.id"
                v-for="(item, index) in competenceWithCategorie"
                :key="index"
              >
                {{ item.competence }}
              </option>
              <option v-if="!competenceWithCategorie.length && !categorie" disabled>
                {{texte5}}
              </option>
              <option v-if="!competenceWithCategorie.length && categorie" disabled>
                {{texte6}}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
 
          <div class="text-left my-3 col-md-6">
            <label>{{texte7}}</label>
            <input
              class="form-control"
              type="text"
              v-model="offre_id.nom_offre"
              placeholder="ex:serveuse,barman,pianiste"
              required
            />
          </div>
          <div class="text-left my-3 col-md-6">
            <label>{{texte8}}</label>
            <input
              class="form-control"
              type="text"
              v-model.number="offre_id.salaire"
              placeholder="ex:35000"
              required
            />
          </div>
        </div>
        <div class="row">
 <div class="text-left my-3 col-md-6">
            <label>{{texte9}}</label>
            <select v-model="offre_id.pointage">
              <option value="" disabled>{{texte10}}</option>
              <option
                :value="item.libelle"
                v-for="(item, index) in OptionsOfpointage"
                :key="index"
              >
                {{ item.libelle }}
              </option>
            </select>
          </div>
          <div class="text-left my-3 col-md-6">
            <label>{{texte11}}</label>
            <input
              class="form-control"
              type="number"
              v-model="offre_id.nbre_person"
              placeholder="ex:5 ou 10"
              required
              min="1"
            />
          </div>
        </div>
        <div class="row">
   <div class="text-left my-3 col-md-6">
            <label>{{texte12}}</label>
            <input
              class="form-control"
              type="text"
              id="lieu"
              v-model="offre_id.lieu"
              placeholder="ex:Angré"
              required
            />
          </div>
          <div class="text-left my-3 col-md-6">
            <label>{{texte13}}</label>
            <input
              class="form-control"
              type="datetime-local"
              id="date_time"
              v-model="offre_id.debut"
              :min="new Date().toJSON().slice(0, 16)"
              required
            />
          </div>
        </div>
        <div class="row">
      <div class="text-left my-3 col-md-6">
            <label>{{texte14}}</label>
            <input
              class="form-control"
              type="datetime-local"
              id="date_fin"
              v-model="offre_id.fin"
              required
            />
          </div>
          <div class="text-left my-3 col-md-6">
            <label>{{texte15}}</label>
            <input
              class="form-control"
              type="date"
              v-model="offre_id.job_debut"
              required
              id="date_job_debut"
            />
          </div>
        </div>
        <div class="row">
          <div class="text-left my-3 col-md-6">
            <label>{{texte16}}</label>
            <input
              class="form-control"
              type="date"
              v-model="offre_id.job_fin"
            />
          </div>
           <div class="col-lg-6 col-md-6 col-12 text-left my-3" v-if="userInfo">
      <label><span style="color: red">*</span>Choisissez un profil 
        <span style="font-size:0.8em;">(ceci vous permet de cibler les offres pas profil)</span>
      </label>
      <VueMultiselect 
      v-model="chooseStatut" 
      :options="filteredOptions" 
      placeholder="Choix multiples" 
      :multiple="true" 
      label="statut" 
      track-by="statut"
       />
          </div>
          
  <!-- Ligne 7 : Mode travail (centré)+ PAYS -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 mx-auto text-left my-3"
    v-if="userInfo?.statut?.statut === 'Entreprise'"
    >
      <label><span style="color: red">*</span>Choisir un mode de travail</label>
      <VueMultiselect v-model="offre_mode_travail" 
                      :options="[{value:'onsite',label:'Présentiel'},{value:'remote',label:'Télétravail'},{value:'hybrid',label:'Hybride'}]" 
                      label="label" track-by="label" />
    </div>
    <div class="col-lg-6 col-md-6 col-12 mx-auto text-left my-3" v-if="countries.length > 0">
      <label><span style="color: red">*</span>Choisir un pays</label>
      <!-- {{ countries }} -->
      <VueMultiselect v-model="offre_pays" 
                      :options="countries.filter(item=>item.label === 'Côte d’Ivoire')" 
                      label="label" 
                      multiple
                      track-by="label" />
    </div>
  </div>
          <div class="text-left my-3 col-md-12">
            <label>{{texte17}}</label>
            <div class="conteneur_editor">
              <editor :modelValue="offre_id.description" v-model="offre_id.description" />
            </div>
          </div>
        </div>
          <div style="display:flex;justify-content:center;">
              <button
              :disabled="isLoading"
                class="btn p-5 mt-4 btn-designer fw-bold bg-warning"
                @click.prevent="update_offre"
              >
                {{texte18}}
              </button>
            </div>
      </form>
      <div v-else class="container">
        <div style="display: flex;justify-content: flex-end;">
          <button
  class="btn"
  style="background-color: orange; color: white;"
  @click="confirmRelance(this.offre_detaiId)"
>
  Relancer
</button>
        </div>
     <a-form
     :model="formState"
     :rules="rules"
     layout="vertical"
     @finish="update_mission"
    >
   
   <a-row :gutter="[16, 16]">
   <!-- Catégorie -->
   <a-col :xs="24" :md="12">
    <a-form-item name="categorie_offre_id" :label="texte1">
    <a-select
  v-model:value="formState.categorie_offre_id"
  @change="selectCategorieFormState"
  name="categorie_offre_id"
  placeholder="texte2"
  show-search
  :options="categoriesOffres"
  :filter-option="filterOption"
  disabled
  option-filter-prop="label"
  :field-names="{ label: 'categorie', value: 'id' }"
>
  <!-- options dynamiques -->
  <a-select-option
    v-for="item in categoriesOffres"
    :key="item.id"
    :value="item.id"
  >
    {{ item.categorie }}
  </a-select-option>

  <!-- option static "Autre" -->
  <a-select-option value="autre">Autre</a-select-option>
</a-select>
    </a-form-item>

    <!-- Autre domaine -->
    <div v-if="formState.categorie_offre_id === 'autre'" style="margin:0.5em 0">
      <a-form-item name="otherDomaine" label="Autre domaine">
        <a-input v-model:value="formState.otherDomaine" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </div>
  </a-col>

  <!-- Compétence -->
  <a-col :xs="24" :md="12">
    <a-form-item
      v-if="formState.categorie_offre_id !== 'autre'"
      name="competence_id"
      :label="texte3"
    >
      <a-select
        v-model:value="formState.competence_id"
        name="competence_id"
        @change="chooseCompetenceFormState"
        disabled
      >
        <a-select-option
          v-for="(item, index) in competenceWithCategorie"
          :key="index"
          :value="item.id"
        >
          {{ item.competence }}
        </a-select-option>

        <a-select-option value="autre">Autre</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Autre poste -->
    <div
      v-if="
        formState.categorie_offre_id === 'autre' ||
        (formState.categorie_offre_id && formState.competence_id === 'autre')
      "
      style="margin:0.5em 0"
    >
      <a-form-item name="otherPoste" label="Autre poste">
        <a-input v-model:value="formState.otherPoste" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </div>
  </a-col>
</a-row>
  <!-- Offre + Salaire -->
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :md="12">
      <a-form-item name="nom_offre" :label="'Nom de la mission'">
        <a-input v-model:value="formState.nom_offre" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>

    <a-col :xs="24" :md="12">
      <a-form-item name="salaire" :label="'Prix de la mission (Fcfa)'">
        <a-input v-model:value="formState.salaire" min="1" type="number" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>
  </a-row>

  <!-- Lieu -->
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :md="12">
      <a-form-item name="lieu" :label="'Lieu de la mission'">
        <a-input v-model:value="formState.lieu" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>
    <a-col :xs="24" :md="12">
      <a-form-item name="typeMission" label="Besoin">
        <a-select v-model:value="formState.typeMission"
        @change="()=>{
         if(formState.typeMission === 'immediat'){
          formState.job_fin = null;
          formState.job_debut = null;
         }
        }"
        >
          <a-select-option value="immediat">Immédiat</a-select-option>
          <a-select-option value="date">Choisir une date</a-select-option>
        </a-select>
      </a-form-item>
    </a-col>
  </a-row>

  <!-- Type mission -->
  <a-row :gutter="[16, 16]">
    <a-col
      :xs="24"
      :md="12"
      v-if="formState.typeMission === 'date'"
    >
      <a-form-item name="job_debut" label="Date de début">
        <a-input type="date" v-model:value="formState.job_debut" 
        @change="(e)=>{
        //  console.log(e.target.value)
         if(e.target.value)formState.job_fin = null
        }"
        style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>
    <a-col
      :xs="24"
      :md="12"
      v-if="formState.typeMission === 'date'"
    >
      <a-form-item name="job_fin" label="Date de fin">
        <a-input type="date" :min="formState.job_debut" v-model:value="formState.job_fin" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>
  </a-row>

   <a-row :gutter="[16, 16]">
    <a-col
      :xs="24"
      :md="12"
      v-if="formState.hour_debut"
    >
      <a-form-item name="hour_debut" label="Heure de début">
        <a-input  type="time" v-model:value="formState.hour_debut" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>
    <a-col
      :xs="24"
      :md="12"
     v-if="formState.hour_fin"
    >
      <a-form-item name="hour_fin" label="Heure de fin">
        <a-input type="time"  v-model:value="this.formState.hour_fin" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>
  </a-row>
   <a-row :gutter="[16, 16]">
    <a-col
      :xs="24"
      :md="12"
      
    >
       <a-form-item label="Urgente">
    <a-switch v-model:checked="formState.enable_urgent"
    :style="{
    backgroundColor: formState.enable_urgent ? 'green' : ''
  }"
    />
    </a-form-item>
    </a-col>
  
  </a-row>

  <!-- Description -->
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <a-form-item name="description" :label="'Description'">
        <a-textarea
          v-model:value="formState.description"
          :rows="6"
          style="border:1px solid #cdcccc !important"
        />
      </a-form-item>
    </a-col>
  </a-row>

  <!-- Bouton -->
  <a-row :gutter="[16, 16]" class="my-5">
    <a-col :span="24" style="text-align: center">
      <button
        class="btn btn-warning btn-designer"
        type="submit"
        :disabled="isDisabled"
      >
         Modifier
      </button>
    </a-col>
  </a-row>
</a-form>
      </div>
    </div>
     <div v-else class="container shimmer-text">
       <h3 class="text-center">Chargement...</h3>
      </div>
  </div>
</template>

<style scoped>
.container{
  padding:1.5em 2em;
}
form label,
form select option {
  font-size: 1.2em;
}

.mt-5 {
  margin-top: 101px !important;
}
.bi-arrow-left-circle::before {
  font-size: 2em !important;
}
.mb-3 {
  text-align: left;
}
.conteneur_editor {
  border: 1px solid orange;
  color: black !important;
  border-radius: 5px;
  padding: 0 1em;
  height: auto;
  background: white;
}
label {
  font-weight: bold;
}
.btn-secondary {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
  color: rgb(255, 255, 255) !important;
}

select {
  border-radius: 5px !important;
  width: 100%;
  height: 50px;
  border:2px solid orange;

}
input,.form-control{
  padding:1.3em !important;
}
.plan-modify {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: transparent;
  display: flex;
  place-items: center;
  justify-content: center;
}
.delete_article {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: transparent;
  display: flex;
  place-items: center;
  justify-content: center;
}
.ecran {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 99;
}
.modify-form {
  margin-left: 50%;
  transform: translateX(-35%);
}
.bi {
  font-size: 1.3em !important;
  margin: 0 0.5em;
  cursor: pointer;
}
a {
  color: black !important;
}
</style>
