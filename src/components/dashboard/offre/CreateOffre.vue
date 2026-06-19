<script>
import Editor from "./text-editor.vue";
import Swal from "sweetalert2";
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { mapActions, mapState } from "pinia";
import VueMultiselect from "vue-multiselect";
export default {
  name: "CreateOffre",
  components: {
    Editor,
    HeaderDashboard,
    VueMultiselect, 
  },
  data() {
    return {
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
  ],
  hour_fin: [
    {
      required: false,
      message: "Veuillez sélectionner une heure de fin",
      trigger: "change",
    },
    {
      validator: async (_rule, value) => {

        if (!this.formState.hour_debut || !value) {
          return Promise.resolve();
        }

        if (value <= this.formState.hour_debut) {
          return Promise.reject(
            "L'heure de fin doit être supérieure à l'heure de début"
          );
        }

        return Promise.resolve();
      },
      trigger: "change",
    },
  ],
},
      formState: {
        offre_mode_travail:null,
  offre: "",
  salaire: "",
  lieu: "",
  hour_debut:null,
  hour_fin:null,
  enable_urgent:false,
  typeMission: null,   // "immediat" ou "date"
  dateMission: null,   // utilisé seulement si typeMission === "date"
  description: "",
  categorie_offre_id:"",
  competence_id:"",
  job_debut:"",
  job_fin:"",
  status_id:[7]
},
       countries: [],
      texte0: "",
      StoreLoading: useLoadingSpinner(),
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      chooseStatut:[],
      allStatuses:[],
      offre_mode_travail:null,
      offre_pays:[],
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
      texte27: "",
      offre: null,
      salaire: null,
      lieu: null,
      debut: null,
      competenceWithCategorie: [],
      fin: null,
      description: null,
      offres: null,
      spinner: false,
      isLoadingUser:true,
      competences: [],
      competence: "",
      offre_id: null,
      modify_offre: false,
      id_offre_update: null,
      loading: false,
      creer: true,
      confirmation_for_delete: false,
      id_for_delete: "",
      moneyFormat: new Intl.NumberFormat("de-DE"),
      categorie: "",
      categories: null,
      Today: new Date().toJSON().slice(0, 10),
      spinnerModify: false,
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
      userInfo:"",
      otherDomaine: "",
      otherPoste: "",
      pointage: "",
      nbre_person: 1,
      job_fin: "",
      job_debut: "",
      elmentsOfBtn: [
        {
          name_btn: "Enregistrer",
          color_btn: "primary",
        },
      ],
    };
  },
  computed: {
    ...mapState(useOffreStore, ["categoriesOffres", "allCompetences"]),
    verifIfAllField() {
      return !(
        this.salaire &&
        this.description &&
        this.debut &&
        this.fin &&
        this.lieu &&
        this.pointage &&
        this.competence &&
        this.chooseStatut.length > 0
      );
    },
     isDisabled() {
    return (
      this.loading ||
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
  watch: {
  "formState.typeMission"(newValue) {
    if (newValue === "immediat") {
      this.formState.job_fin = null;
    }
  }
},
  methods: {
    filterOption(input, option) {
     
    return (option?.categorie ?? '').toLowerCase().includes(input.toLowerCase());
  },
  async listerCountries() {
    try {
      const response = await instance.get("countries");
      this.countries = response.data;
   
    } catch (error) {
      console.log(error);
    }
  },
    async getInfoUser() {
      try{
 if (this.$store.state.token) {
        await instance
          .get("voirInfoUserConnect")
          .then((resp) => {
            if (resp.data.status === true) {
              this.userInfo = resp.data.user;
              window.localStorage.setItem("user", JSON.stringify(resp.data.user));
             
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      }catch(error){
        console.log(error)
      }finally{
        this.isLoadingUser = false
      }
     
    },
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useOffreStore, ["get_categorie", "getAllCompetences"]),
    show_offre_modify() {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = "";
    },
    async create_CompetenceOffre(idCategorie, libellecompetence) {
      try {
        const data = {
          competence: libellecompetence,
          categorie_id: idCategorie,
        };

        const response = await instance.post("createCompetence", data);

        if (response.data.status === true) {
          return {
            competence_id: response.data.data.id,
            status: true,
          };
        }

        return { status: false };
      } catch (error) {
        Swal.fire({
          icon: "info",
          title: error.response?.data?.message,
          showConfirmButton: true,
        });
        return { status: false };
      }
    },
    async create_categorieOffre(categorieData, competenceData) {
      try {
        const responseCategorie = await instance.post("categorie", {
          categorie: categorieData,
        });

        if (responseCategorie.data.status !== true) {
          return { status: false };
        }

        const idCategorieCreate = responseCategorie.data.data.id;

        const responseCreateCompetence = await this.create_CompetenceOffre(
          idCategorieCreate,
          competenceData
        );

        if (!responseCreateCompetence.status) {
          return { status: false };
        }

        return {
          categorie_id: idCategorieCreate,
          competence_id: responseCreateCompetence.competence_id,
          status: true,
        };
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response?.data?.message,
          showConfirmButton: true,
        });
        return { status: false };
      }
    },
    async postOffre(categorienew = null, competencenew = null) {
      let capitalizeFirstLetterOffre = this.offre[0].toUpperCase();
      let offreConcat = capitalizeFirstLetterOffre + this.offre.substring(1);
      let data = {
        nom_offre: offreConcat,
        salaire: this.salaire,
        description: this.description,
        debut: this.debut,
        fin: this.fin,
        lieu: this.lieu,
        pointage: this.pointage,
        offre_mode_travail:this.offre_mode_travail?.label,
        offre_pays:this.offre_pays?.map(item=>item.id),
        categorie_offre_id: !categorienew ? this.categorie : categorienew,
        competence_id: !competencenew ? this.competence : competencenew,
        nbre_person: this.nbre_person,
        job_fin: this.job_fin,
        job_debut: this.job_debut,
        status_id:this.chooseStatut.some(item=>item.statut === 'Tous') ? this.allStatuses.filter(item=>item.statut !== 'Tous').map(item=>item.id) : this.chooseStatut.map(item=>item.id)
      };
      await instance
        .post("create_offre", data)
        .then((res) => {
          this.spinner = true;
          this.loading = false;
       
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinner = false;
            this.salaire = null;
            this.description = null;
            this.debut = null;
            this.offre = null;
            this.fin = null;
            this.nbre_person = 1;
            this.lieu = null;
            this.pointage = null;
            this.categorie = null;
            this.competence = null;
            this.creer = true;
            this.job_debut = null;
              this.job_fin = null;
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: true,
            });
            this.spinner = false;
            this.creer = true;
            this.$router.push({ name: "abonnements" });
          }
        })
        .catch((res) => {
          
          Swal.fire({
            icon: "error",
            title: res.response.data.message,
            showConfirmButton: true,
          });
          this.loading = false;
          this.creer = true;
          if (res.response.status === 302) {
            this.$router.push({ name: "abonnements" });
          }
        });
    },
    async create_offre() {
      this.StoreLoading.launchLoading(true);
      this.loading = true;
      this.creer = false;
      try {
        if (this.otherDomaine && this.otherPoste) {
          const response = await this.create_categorieOffre(
            this.otherDomaine,
            this.otherPoste
          );
          if (response.status) {
            this.postOffre(response.categorie_id, response.competence_id);
          }
        } else if (!this.otherDomaine && this.otherPoste) {
          const response = await this.create_CompetenceOffre(
            this.categorie,
            this.otherPoste
          );
          if (response.status) {
            await this.postOffre(this.categorie, response.competence_id);
          }
        } else if (!this.otherDomaine && !this.otherPoste) {
          await this.postOffre();
        }
      } catch (error) {
        console.error("Erreur lors de la création de l'offre :", error);
      } finally {
        this.loading = false;
        this.StoreLoading.launchLoading(false);
      }
    },
    async post_mission() {
      this.StoreLoading.launchLoading(true);
  

  // Si mission immédiate → date du jour
  if (this.formState.typeMission === "immediat") {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    this.formState.job_debut = `${yyyy}-${mm}-${dd}`;
    this.formState.offre_mode_travail = "immediat"
  }

  try {
    const res = await instance.post("create_offre", this.formState);

    this.spinner = true;
    this.loading = false;

    if (res.data.status === true) {
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      this.resetDataFormState();
    }

    if (res.data.status === false) {
  Swal.fire({
    icon: "info",
    title: res.data.message,
    confirmButtonText: "Okay",
    confirmButtonColor: "#f97316", // orange
  }).then((result) => {
    if (result.isConfirmed) {
      this.$router.push("/abonnements"); // remplace par ta route
    }
  });
}
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.response?.data?.message,
      showConfirmButton: true,
    });
  } finally {
    this.loading = false; // ou toute autre chose à systématiquement faire
    this.StoreLoading.launchLoading(false);
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
    show_box_confirmation_delete(id) {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = id;
     
    },
    not_delete() {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = "";
    },
    delete_offre() {
      this.loading = true;
      this.creer = false;
      instance
        .delete("delete_offre_entreprise/" + this.id_for_delete)

        .then((res) => {
        

          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.confirmation_for_delete = !this.confirmation_for_delete;
            const index = this.offres.findIndex(
              (objet) => objet.id === this.id_for_delete
            );
            this.offres.splice(index, 1);
            this.loading = false;
            this.creer = true;
          }
        })
        .catch((err) => {
          if (err) {
            this.confirmation_for_delete = !this.confirmation_for_delete;
            Swal.fire({
              icon: "error",
              title: "Contacter votre service informatique",
              showConfirmButton: false,
              timer: 1500,
            });
            this.loading = false;
            this.creer = true;
          }
        });
    },
    chooseCompetence() {
      this.otherPoste = "";
    },
    selectCategorie(e) {
      
      this.otherDomaine = "";
      this.otherPoste = "";
      this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(e.target.value)
      );
    },
    selectCategorieFormState(value) {
      
  this.formState.categorie = value;
  this.formState.competence = '';
  this.formState.otherDomaine = "";
  this.formState.otherPoste = "";
  this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(value)
      );

},
resetDataFormState(){
  this.formState.offre= "";
  this.formState.salaire= "";
  this.formState.lieu= "";
  this.formState.typeMission= null;   
  this.formState.dateMission= null;
  this.formState.description= "";
  this.formState.categorie_offre_id="";
  this.formState.competence_id="";
  this.formState.job_debut="";
  this.formState.job_fin=""
   this.formState.hour_debut = null;
    this.formState.hour_fin = null;
     this.formState.enable_urgent=false
},
chooseCompetenceFormState(value) {
  
  this.formState.competence = value;
  this.formState.otherPoste = "";
}
  },
  async created() {
    await this.getInfoUser();
    await this.get_categorie();
    await this.getAllCompetences();
    await  this.lister_statut();
    await this.listerCountries();
    this.texte0 = await this.handleTranslate("Enregistrer une Offre");
    this.texte1 = await this.handleTranslate("Domaines");
    this.texte2 = await this.handleTranslate("Sélectionnez un domaine");
    this.texte3 = await this.handleTranslate("Choisir le poste");
    this.texte4 = await this.handleTranslate("Choisir un poste");
    this.texte5 = await this.handleTranslate("Veuillez choisir un domaine");
    this.texte6 = await this.handleTranslate("Pas de donnée");
    this.texte7 = await this.handleTranslate("Nom de l'offre");
    this.texte8 = await this.handleTranslate("Honoraire");
    this.texte9 = await this.handleTranslate("Termes de paiements");
    this.texte10 = await this.handleTranslate("Payer Par");
    this.texte11 = await this.handleTranslate("Veuillez définir l'honoraire");
    this.texte12 = await this.handleTranslate("Lieu de l'emploi");
    this.texte13 = await this.handleTranslate("Nombre de postes disponibles");
    this.texte14 = await this.handleTranslate("Date et heure de début de l'offre");
    this.texte15 = await this.handleTranslate("Date et heure d'expiration de l'offre");
    this.texte16 = await this.handleTranslate("Date et heure de début de travail");
    this.texte17 = await this.handleTranslate("Date et heure de fin de travail");
    this.texte18 = await this.handleTranslate("Description");
    this.texte19 = await this.handleTranslate("Enregistrer");
    this.texte20 = await this.handleTranslate("chargement...");
  },
};
</script>
<template>

<div v-if="!isLoadingUser && userInfo && categoriesOffres.length && countries.length">
  <section>
    <div class="page-body position-relative">
      <HeaderDashboard :TitleHeader="userInfo.user?.statut?.statut === 'Entreprise' ? texte0:'Poster une mission'" :subTitleHeader="userInfo.user?.statut?.statut === 'Entreprise' ? texte0:'Poster une mission'" />
      <p style="text-align: center; color: red">
        Les champs avec astérisque (*) sont obligatoires.
      </p>
      <div v-if="userInfo && userInfo.user?.statut?.statut === 'Entreprise'">
       <form 
       @submit.prevent="create_offre"
        class="container"
        v-if="competenceWithCategorie.length || categoriesOffres.length || countries.length"
        >
  <!-- Ligne 1 : Catégorie + Compétence -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label><span style="color: red">*</span>{{ texte1 }}</label>
      <select v-model="categorie" @change="selectCategorie">
        <option value="" disabled>{{ texte2 }}</option>
        <option :value="item.id" v-for="(item, index) in categoriesOffres" :key="index">
          {{ item.categorie }}
        </option>
        <option value="autre">Autre</option>
      </select>
      <div style="margin: 0.5em 0" v-if="categorie === 'autre'">
        <label for="otherDomaine">Autre domaine</label>
        <input id="otherDomaine" class="form-control" type="text" v-model="otherDomaine" />
      </div>
    </div>

    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label id="select_comp" v-if="categorie !== 'autre'">
        <span style="color: red">*</span>{{ texte3 }}</label>
      <select v-if="categorie !== 'autre'" 
              :class="{ 'select-disabled': !categorie || categorie === 'autre' }"
              v-model="competence" name="select_comp" id="select_comp" @change="chooseCompetence">
        <option value="" disabled style="color: brown">{{ texte4 }}</option>
        <option :value="item.id" 
        v-for="(item, index) in competenceWithCategorie" :key="index">
          {{ item.competence }}
        </option>
        <option style="color: brown" v-if="!competenceWithCategorie.length && !categorie" disabled>
          {{ texte5 }}
        </option>
        <option style="color: brown; font-size: 0.9em" v-if="!competenceWithCategorie.length && categorie" disabled>
          {{ texte6 }}
        </option>
        <option value="autre" :disabled="!categorie">Autre</option>
      </select>
      <div style="margin: 0.5em 0" v-if="categorie === 'autre' || (categorie && competence == 'autre')">
        <label for="otherPoste">Autre poste</label>
        <input id="otherPoste" class="form-control" type="text" v-model="otherPoste" />
      </div>
    </div>
  </div>

  <!-- Ligne 2 : Offre + Salaire -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label><span style="color: red">*</span>{{ texte7 }}</label>
      <input class="form-control" type="text" v-model="offre" placeholder="" required />
    </div>
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label><span style="color: red">*</span>{{ texte8 }}</label>
      <input class="form-control" type="text" v-model="salaire" placeholder="ex:35000" />
    </div>
  </div>

  <!-- Ligne 3 : Pointage + Lieu -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label><span style="color: red">*</span>{{ texte9 }}</label>
      <select :class="{ 'select-disabled': !salaire }" v-model="pointage" :disabled="salaire ? false : true">
        <option value="" disabled>{{ texte10 }}</option>
        <option :value="item.libelle" v-for="(item, index) in OptionsOfpointage" :key="index">
          {{ item.libelle }}
        </option>
      </select>
      <span class="text-danger" :class="!salaire ? 'd-block' : 'd-none'">*{{ texte11 }}</span>
    </div>
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label><span style="color: red">*</span>{{ texte12 }}</label>
      <input class="form-control" type="text" v-model="lieu" placeholder="ex:Angré" required />
    </div>
  </div>

  <!-- Ligne 4 : Nb Personnes + Date début -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label><span style="color: red">*</span>{{ texte13 }}</label>
      <input class="form-control" type="number" v-model="nbre_person" placeholder="ex:5 ou 10" required min="1" />
    </div>
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label for="calendar-12h" class="date_heure"><span style="color: red">*</span>{{ texte14 }}</label>
      <input class="form-control" type="datetime-local" v-model="debut" required :min="new Date().toISOString().slice(0, 16)" />
    </div>
  </div>

  <!-- Ligne 5 : Date fin + Job début -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label for="calendar-12" class="date_heure"><span style="color: red">*</span>{{ texte15 }}</label>
      <input class="form-control" type="datetime-local" :disabled="debut != null ? false : true" v-model="fin" required :min="debut" />
    </div>
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label>{{ texte16 }}</label>
      <input class="form-control" 
      type="datetime-local" 
      v-model="job_debut" 
      :min="debut"
      :max="fin"
       />
    </div>
  </div>

  <!-- Ligne 6 : Job fin + Profil -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label>{{ texte17 }}</label>
      <input class="form-control" type="datetime-local" 
      v-model="job_fin" 
      :min="job_debut"
      />
    </div>
    <div class="col-lg-6 col-md-6 col-12 text-left my-3" v-if="userInfo">
      <label><span style="color: red">*</span>Choisissez un profil 
        <span style="font-size:0.5em;">(ceci vous permet de cibler les offres par profil)</span>
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
  </div>

  <!-- Ligne 7 : Mode travail (centré)+ PAYS -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 mx-auto text-left my-3"
    v-if="userInfo?.user?.statut?.statut === 'Entreprise'"
    >
      <label>Choisir un mode de travail</label>
      <VueMultiselect v-model="offre_mode_travail" 
                      :options="[{value:'Présentiel',label:'Présentiel'},{value:'Télétravail',label:'Télétravail'},{value:'Hybride',label:'Hybride'}]" 
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

  <!-- Description pleine largeur -->
  <div class="row g-3">
    <div class="col-12 text-left my-3">
      <label><span style="color: red">*</span>{{ texte18 }}</label>
      <div class="conteneur_editor">
        <editor v-model="description" />
      </div>
    </div>
  </div>

  <!-- Bouton centré -->
  <div class="row g-3 my-5">
    <div class="col-12 text-center">
      <button class="btn btn-warning btn-designer" 
      type="submit" :disabled="verifIfAllField">
        {{ loading ? texte20 : texte19 }}
      </button>
    </div>
  </div>
      </form>
  
      </div>
       <div v-else>
     <a-form
  :model="formState"
  :rules="rules"
  layout="vertical"
  @finish="post_mission"
  class="container"
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
  :disabled="!categoriesOffres.length"
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
        :disabled="!formState.categorie_offre_id || formState.categorie_offre_id === 'autre'"
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
      <a-form-item name="salaire" :label="'Prix de la mission'">
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
        <a-select v-model:value="formState.typeMission">
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
        <a-input type="date" v-model:value="formState.job_debut" style="height:30px !important;border:1px solid #cdcccc !important" />
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
      
    >
      <a-form-item name="hour_debut" label="Heure de début">
        <a-input  type="time" v-model:value="formState.hour_debut" style="height:30px !important;border:1px solid #cdcccc !important" />
      </a-form-item>
    </a-col>
    <a-col
      :xs="24"
      :md="12"
     
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
      <a-form-item name="description" :label="texte18">
        <a-textarea
          v-model:value="this.formState.description"
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
        {{ loading ? texte20 : 'Poster' }}
      </button>
    </a-col>
  </a-row>
</a-form>
      </div>
       </div>
      </section>
  </div>
   <div v-else 
   style="
   text-align:center;
   padding:1em;
   font-size: 1.5em;
   height: 50vh;
   margin-top:9em;"
   class="shimmer-text">
      Chargement...
      </div>
</template>
<style scoped>
.shimmer-text {
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #999 0%,
    #fff 50%,
    #999 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.select-disabled {
  background-color: #e5e5e5;
  color: #666;
  cursor: not-allowed;
}
.date_heure {
  display: block !important;
}

#calendar-12h {
  width: 100% !important;
}

form label,
form select option {
  font-size: 1.2em;
}
input,
.form-control {
  padding: 1.3em !important;
  color: black !important;
}

.mb-3 {
  text-align: left;
}
.conteneur_editor {
  border: 1.5px solid orange;
  color: black !important;
  border-radius: 5px;
  padding: 0 1em;
  height: auto;
}
label {
  font-weight: bold;
}
.btn-secondary {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
}
input,
textarea,
select {
  border: 2px solid orange;
}
select {
  border-radius: 5px !important;
  width: 100%;
  padding: 1em;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
th {
  text-align: center;
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
.mt-5 {
  margin-top: 101px !important;
}
:deep(.card) {
  background: transparent !important;
  color: black !important;
}
:deep(.multiselect__tags){
    min-height: 40px;
    display: block;
    padding: 8px 40px 0 8px;
    border-radius: 3px !important;
    border: 1.4px solid #fa8d26 !important;
    background: #fff;
    font-size: 14px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
