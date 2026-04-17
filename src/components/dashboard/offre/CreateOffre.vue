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
      return (
        this.salaire &&
        this.description &&
        this.debut &&
        this.fin &&
        this.lieu &&
        this.pointage &&
        this.competence
      );
    },
  },
  methods: {
  async listerCountries() {
    try {
      const response = await instance.get("countries");
      this.countries = response.data;
      console.log("COUNTRIES", this.countries);
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
              window.localStorage.setItem("user", JSON.stringify(resp.data.user));
              console.log("USER_INFO", this.userInfo);
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
        status_id:this.chooseStatut.map(item=>item.id)
      };
      await instance
        .post("create_offre", data)
        .then((res) => {
          this.spinner = true;
          this.loading = false;
          // console.log(res);
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
          // console.log(res);
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
    async lister_statut(){
      try {
        const response =  await instance.get("listStatut")
        this.allStatuses = response.data.data.filter(item=>item.statut != 'admin')
      } catch (error) {
        console.log(error);
      }
    },
    show_box_confirmation_delete(id) {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = id;
      // console.log("ID_DELETE", this.id_for_delete);
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
          // console.log(res);

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
      // console.log("selectCategorie", e.target.value);
      this.otherDomaine = "";
      this.otherPoste = "";
      this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(e.target.value)
      );
    },
  },
  async created() {
     this.getInfoUser();
    this.get_categorie();
    this.getAllCompetences();
    this.lister_statut();
     this.listerCountries();
    this.texte0 = await this.handleTranslate("Enregistrer une Offre");
    this.texte1 = await this.handleTranslate("Domaines");
    this.texte2 = await this.handleTranslate("Sélectionnez un domaine");
    this.texte3 = await this.handleTranslate("Choisir le poste");
    this.texte4 = await this.handleTranslate("Choisir un poste");
    this.texte5 = await this.handleTranslate("Veuillez choisir un domaine");
    this.texte6 = await this.handleTranslate("Pas de donnée");
    this.texte7 = await this.handleTranslate("Nom de l'offre");
    this.texte8 = await this.handleTranslate("Honoraire (Fcfa)");
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
  <section>
    <div class="page-body position-relative">
      <div class="Myspinner" v-show="spinner">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="texte0" />
      <p style="text-align: center; color: red">
        Les champs avec astérisque (*) sont obligatoires.
      </p>
      <div>
       <form @submit.prevent="create_offre" class="container">
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
        <option :value="item.id" v-for="(item, index) in competenceWithCategorie" :key="index">
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
      <input class="form-control" type="text" v-model="salaire" placeholder="ex:35000" pattern="[0-9]*" />
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
      <input class="form-control" type="datetime-local" v-model="job_debut" :min="fin" />
    </div>
  </div>

  <!-- Ligne 6 : Job fin + Profil -->
  <div class="row g-3">
    <div class="col-lg-6 col-md-6 col-12 text-left my-3">
      <label>{{ texte17 }}</label>
      <input class="form-control" type="datetime-local" v-model="job_fin" :min="job_debut" />
    </div>
    <div class="col-lg-6 col-md-6 col-12 text-left my-3" v-if="userInfo">
      <label><span style="color: red">*</span>Choisissez un profil</label>
      <VueMultiselect 
      v-model="chooseStatut" 
      :options="userInfo && userInfo?.statut?.statut === 'Entreprise' ? allStatuses.filter(item => item.statut !== 'particulier') : allStatuses.filter(item => item.statut == 'Etudiant' || item.statut == 'Artisan')" 
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
    v-if="userInfo?.statut?.statut === 'Entreprise'"
    >
      <label><span style="color: red">*</span>Choisir un mode de travail</label>
      <VueMultiselect v-model="offre_mode_travail" 
                      :options="[{value:'onsite',label:'Présentiel'},{value:'remote',label:'Télétravail'},{value:'hybrid',label:'Hybride'}]" 
                      label="label" track-by="label" />
    </div>
    <div class="col-lg-6 col-md-6 col-12 mx-auto text-left my-3" v-if="countries.length > 0">
      <label><span style="color: red">*</span>Choisir un pays</label>
      <VueMultiselect v-model="offre_pays" 
                      :options="countries" 
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
      <button class="btn btn-warning btn-designer" type="submit" :disabled="loading">
        {{ loading ? texte20 : texte19 }}
      </button>
    </div>
  </div>
</form>
      </div>
    </div>
  </section>
</template>
<style scoped>
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
  border: 1px solid orange;
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
.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: transparent !important;
  display: flex;
  place-items: center;
  justify-content: center;
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
