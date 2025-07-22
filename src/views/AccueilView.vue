<script>
import axios from "axios";
import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import Statistique_Comp from "@/components/Statistique_Comp.vue";
// import Editor from "../components/text-editor.vue";
export default {
  name: "AccueilView",
  components: {
    Statistique_Comp,
  },
  data() {
    return {
      user: this.$store.state.user,
      // compte: this.$store.state.compte,
      competencesPredf: [],
      competences: null,
      spinner: false,
      spinnerExperience: false,
      spinnerModifyExperience: false,
      comp: [],
      competence: null,
      comfirmationForDeleteCompetence: false,
      toogleNouvelleExperience: false,
      detailOfExperience: "",
      lieu: null,
      dateDebut: null,
      dateFin: null,
      poste: null,
      entreprise: null,
      MyExperiences: [],
      toogleModifyExperience: false,
      updateExperience: {},
      idExperience: null,
      idExperienceAtDelete: null,
      toogleScreenYouWantDelete: false,
      statut: this.$store.state.statut,
    };
  },
  methods: {
    getAllCompetencesByStudents() {
      axios
        .get("http://127.0.0.1:8000/api/getCompetenceByStudents", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("AllCompetences", res.data.data);
          if (res.data.status === true) {
            this.competences = res.data.data.competences;
          }
        });
    },
    addCompetences() {
      this.spinner = true;
      axios
        .post(
          "http://127.0.0.1:8000/api/addCompetences",
          {
            competence: this.comp,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinner = false;
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (response.data.status === false) {
            this.spinner = false;
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.spinner = false;
        });
    },
    getAllCompetences() {
      this.spinner = true;
      axios
        .get("http://127.0.0.1:8000/api/GetAllCompetences")
        .then((res) => {
          console.log("COMPETENCE", res.data.data);
          this.competencesPredf = res.data.data;
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
          this.spinner = false;
        });
    },
    addTag(newTag) {
      console.log(newTag);
      let brox = newTag;
      this.acquis = brox;
      this.comp = [];
      this.acquis.forEach((el) => {
        this.comp.push(el.id);
      });
      console.log("THIS.comp", this.comp);
    },
    showBoxConfirmationDeleteCompetences(id) {
      this.comfirmationForDeleteCompetence =
        !this.comfirmationForDeleteCompetence;
      this.id_for_delete = id;
    },
    notDeleteCompetence() {
      this.comfirmationForDeleteCompetence =
        !this.comfirmationForDeleteCompetence;
      this.id_for_delete = "";
    },
    deleteMyCompetence() {
      this.spinner = true;
      axios
        .delete(
          "http://127.0.0.1:8000/api/deleteCompetencesOfStudents/" +
            this.id_for_delete,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinner = false;
            setTimeout(() => {
              location.reload(true);
            }, 1500);
            this.confirmation_for_delete = !this.confirmation_for_delete;
          }
        })
        .catch((err) => {
          console.log(err);
          this.spinner = false;
        });
    },
    addNouvelExperience() {
      this.toogleNouvelleExperience = !this.toogleNouvelleExperience;
    },
    saveExperience() {
      let infoExperience = {
        experience: this.experience,
        lieu: this.lieu,
        dateDebut: this.dateDebut,
        dateFin: this.dateFin,
        poste: this.poste,
        entreprise: this.entreprise,
      };
      console.log(infoExperience);
      this.$store.commit("addExperiences", infoExperience);
    },
    // getAllExperiences() {
    //   this.spinnerExperience = true;
    //   axios
    //     .get("http://127.0.0.1:8000/api/GetMyExperiences", {
    //       headers: {
    //         Authorization: "Bearer " + this.$store.state.token,
    //       },
    //     })
    //     .then((res) => {
    //       console.log("Experiences", res.data.data);
    //       this.MyExperiences = res.data.data;
    //       this.spinnerExperience = false;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.spinnerExperience = false;
    //     });
    // },
    chosenOneExperience(id) {
      this.spinnerModifyExperience = true;
      this.toogleModifyExperience = !this.toogleModifyExperience;
      this.idExperience = id;
      console.log("IDEXPERIENCE", this.idExperience);
      axios
        .get("http://127.0.0.1:8000/api/GetMyExperiences", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.MyExperiences = res.data.data;
          this.updateExperience = this.MyExperiences.find(
            (item) => item.id === id
          );
          this.spinnerModifyExperience = false;
          console.log("Experiences", this.updateExperience);
        })
        .catch((err) => {
          console.log(err);
          this.spinnerModifyExperience = true;
        });
    },
    toogleExperience() {
      this.idExperience = null;
      this.toogleModifyExperience = !this.toogleModifyExperience;
    },
    changeExperience() {
      this.spinnerModifyExperience = true;
      console.log(this.updateExperience.experience);
      axios
        .post(
          "http://127.0.0.1:8000/api/modifyExperience/" + this.idExperience,
          {
            experience: this.updateExperience.experience,
            lieu: this.updateExperience.lieu,
            dateDebut: this.updateExperience.dateDebut,
            dateFin: this.updateExperience.dateFin,
            poste: this.updateExperience.poste,
            entreprise: this.updateExperience.entreprise,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.toogleModifyExperience = !this.toogleModifyExperience;
            this.spinnerModifyExperience = false;
          }
          if (res.data.status === false) {
            this.spinnerModifyExperience = false;
          }

          console.log("Resultat modification", res);
        })
        .catch((err) => {
          this.spinnerModifyExperience = false;
          console.log(err);
        });
    },
    deleteExperience() {
      axios
        .delete(
          "http://127.0.0.1:8000/api/deleteMyExperience/" +
            this.idExperienceAtDelete,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.toogleScreenYouWantDelete = !this.toogleScreenYouWantDelete;
            setTimeout(function () {
              this.spinnerModifyExperience = true;
              location.reload(true);
            }, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ToogleShowDelete(id) {
      this.idExperienceAtDelete = id;
      this.toogleScreenYouWantDelete = !this.toogleScreenYouWantDelete;
    },
    notDeleteExperience() {
      this.idExperienceAtDelete = null;
      this.toogleScreenYouWantDelete = !this.toogleScreenYouWantDelete;
    },
  },
  created() {
    console.log("user", this.$store.state.user);
    // console.log("compte", this.$store.state.compte);
    // this.getAllExperiences();
    this.getAllCompetences();
    this.getAllCompetencesByStudents();
  },
};
</script>

<template>
  <div class="add_nouvelle_experience" v-show="toogleNouvelleExperience">
    <div class="conteneur_nouvelle_experience p-5">
      <em
        class="bi bi-x-lg"
        @click="toogleNouvelleExperience = !toogleNouvelleExperience"
      ></em>
      <div class="h1">
        <h1>Ajouter une nouvelle experience</h1>
      </div>
      <form @submit.prevent="saveExperience">
        <div class="row p-2">
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Poste</label>
            <input
              type="text"
              v-model="poste"
              placeholder="Ex : Barman,serveuse"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Nom de l'entreprise</label>
            <input
              type="text"
              v-model="entreprise"
              placeholder="Ex : la locomotive"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Lieu</label>
            <input
              type="text"
              v-model="lieu"
              placeholder="Ex : Cocody angré"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Date début</label>
            <input type="date" v-model="dateDebut" required />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Date fin</label>
            <input
              type="date"
              v-model="dateFin"
              :min="dateDebut"
              placeholder="Ex : Cocody angré"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Descriptif</label>
            <textarea
              name=""
              id=""
              cols="20"
              v-model="experience"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div class="position-relative">
          <button
            type="submit"
            class="btn-lg btn-primary position-absolute save_experience"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="add_nouvelle_experience" v-show="toogleModifyExperience">
    <div class="Myspinner" v-show="spinnerModifyExperience">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="conteneur_nouvelle_experience p-5" v-if="updateExperience">
      <em class="bi bi-x-lg" @click="toogleExperience"></em>
      <div class="h1">
        <h1>Modifier l'experience</h1>
      </div>
      <form @submit.prevent="changeExperience">
        <div class="row p-2">
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Poste</label>
            <input
              type="text"
              v-model="updateExperience.poste"
              placeholder="Ex : Barman,serveuse"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Nom de l'entreprise</label>
            <input
              type="text"
              v-model="updateExperience.entreprise"
              placeholder="Ex : la locomotive"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Lieu</label>
            <input
              type="text"
              v-model="updateExperience.lieu"
              placeholder="Ex : Cocody angré"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Date début</label>
            <input type="date" v-model="updateExperience.dateDebut" required />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Date fin</label>
            <input
              type="date"
              v-model="updateExperience.dateFin"
              :min="dateDebut"
              placeholder="Ex : Cocody angré"
              required
            />
          </div>
          <div class="form-group col-lg-12 col-md-12 col-sm-6 text-start">
            <label for="poste">Descriptif(facultatif)</label>
            <textarea
              name=""
              id=""
              cols="20"
              v-model="updateExperience.experience"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div class="position-relative">
          <button
            type="submit"
            class="btn-lg btn-primary position-absolute save_experience"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="page-body">
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a class="home-item" href="index.html"
                  ><em data-feather="home"></em
                ></a>
              </li>
              <li class="breadcrumb-item">Accueil</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div
      class="ecran_for_delete delete_article"
      v-show="comfirmationForDeleteCompetence"
    >
      <div class="card p-5">
        <p class="h3 my-2">Voulez-vous vraiment supprimer la compétence?</p>
        <div>
          <button class="btn bg-primary mx-2" @click="notDeleteCompetence">
            Annuler
          </button>
          <button class="btn bg-danger" @click="deleteMyCompetence">
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <div
      class="ecran_for_delete delete_article"
      v-show="toogleScreenYouWantDelete"
    >
      <div class="card p-5">
        <p class="h3 my-2">Voulez-vous vraiment supprimer l'expérience ?</p>
        <div>
          <button class="btn bg-primary mx-2" @click="notDeleteExperience">
            Annuler
          </button>
          <button class="btn bg-danger" @click="deleteExperience">
            Supprimer
          </button>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="container-fluid default-dash">
      <div class="row">
        <div class="col-md-12">
          <div class="card profile-greeting">
            <div class="card-body">
              <div class="media">
                <div class="media-body">
                  <div class="greeting-user text-start">
                    <h1 v-if="user">Hello, {{ this.user.nom }}</h1>
                    <h1>Bienvenue, votre tableau de bord est prêt!</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <Statistique_Comp />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("../assets/css/accueil.css");
@import url("/public/asset/css/vendors/font-awesome.css");
@import url("/public/asset/css/vendors/icofont.css");
@import url("/public/asset/css/vendors/themify.css");
@import url("/public/asset/css/vendors/flag-icon.css");

@import url("/public/asset/css/vendors/feather-icon.css");

@import url("/public/asset/css/vendors/scrollbar.css");

@import url("/public/asset/css/vendors/animate.css");

@import url("/public/asset/css/vendors/date-picker.css");

@import url("/public/asset/css/vendors/photoswipe.css");

@import url("/public/asset/css/vendors/bootstrap.css");

@import url("/public/asset/css/style.css");

@import url("/public/asset/css/color-1.css");

@import url("/public/asset/css/responsive.css");
input,
textarea {
  width: 100%;
}
label {
  margin: 0.5em;
}
textarea {
  border: 2px solid rgb(83, 83, 83);
  border-radius: 5px;
}

.save_experience {
  right: -60px;
}
.conteneur_editor {
  border: 1px solid black;
  color: black !important;
  padding-bottom: 2em;
  border-radius: 5px;
}
.add_nouvelle_experience {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.338);
  display: flex;
  place-items: center;
  justify-content: center;
}
.conteneur_nouvelle_experience {
  width: 50%;
  height: 500px;
  overflow-y: auto;
  background: #ffffff;
  padding: 1em 2em;
  position: relative;
  border-radius: 5px;
}
.bi-x-lg {
  position: absolute;
  right: 1em;
  color: crimson;
  font-size: 1.5em;
  cursor: pointer;
}
.rond {
  width: 13px;
  height: 13px;
  background: rgb(122, 121, 121);
  border-radius: 10px;
  left: -0.4em;
  top: 0;
}
.bi-plus-lg {
  right: 0;
  top: 0;
  font-size: 1.5em;
  cursor: pointer;
}
.bi-trash3 {
  right: 0;
  top: 0;
  cursor: pointer;
}
.bi-pencil {
  right: 1.7em;
  top: 0;
  cursor: pointer;
}
ul {
  list-style-type: disc;
}
.my-custom-paragraph {
  text-align: left !important;
}
.content_experience {
  padding: 0.5em 0;
}

.experiences::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100%;
  background: rgb(122, 121, 121);
  left: 0;
}
.conteneur_experience,
.conteneur_competences {
  background: white;
}
.conteneur_experience {
  padding: 1em;
  border-radius: 1rem;
}
#content_competences {
  background: white;
  height: auto;
}
.delete_article {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: transparent;
  display: flex;
  place-items: center;
  justify-content: center;
}
.Myspinner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: rgba(0, 0, 0, 0.167);
  display: flex;
  place-items: center;
  justify-content: center;
  border-radius: 10px;
}
#cont_table_competence {
  margin-top: 1.5em;
}
</style>
