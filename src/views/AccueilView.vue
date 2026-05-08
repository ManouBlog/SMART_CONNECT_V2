<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";
// import VueMultiselect from "vue-multiselect";
import Statistique_Comp from "@/components/Statistique_Comp.vue";
import Statistiques_Account from "@/components/Statistiques_Account.vue";
import Statistique_revenu from "@/components/Statistique_revenu.vue";
import Statistique_visite from "@/components/Statistique_visite.vue";
import MyCardStatistique from "@/components/MyCardStatistique.vue";
// import Editor from "../components/text-editor.vue";
export default {
  name: "AccueilView",
  components: {
    Statistique_Comp,
    Statistiques_Account,
    MyCardStatistique,
    Statistique_visite,
    Statistique_revenu,
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
      isLoadingWallet: false,
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
      list_entreprise: "",
      list_students: "",
      list_offres: "",
      see_entreprise_student: null,
      wallet: "",
      nbreVisit: "",
      valueSelectPeriod: "Global",
      periodeFilterStatisticBalance: "",
    };
  },
  methods: {
    getAllStatistique() {
      this.isLoadingWallet = true;
      axios
        .get("https://backend.monbrobroli.com/api/statistiques/statistiqueGlobal", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("statistique_global", res?.data);
          if (res?.data?.status === true) {
            this.list_entreprise = res?.data?.entreprise;
            this.list_students = res?.data?.talents;
            this.list_offres = res?.data?.offre;
            this.see_entreprise_student = Number(res?.data?.contrat);
            console.log("this.see_entreprise_student", this.see_entreprise_student);
            this.wallet = res?.data?.wallet;
            this.nbreVisit = res?.data?.totalVisit;
          }
        })
        .catch((error) => {
          console.log("error", error);
          
        })
        .finally(() => {
          this.isLoadingWallet = false;
        });
    },
    addCompetences() {
      this.spinner = true;
      axios
        .post(
          "https://backend.monbrobroli.com/api/addCompetences",
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
        .get("https://backend.monbrobroli.com/api/GetAllCompetences")
        .then((res) => {
          console.log("COMPETENCE", res?.data?.data);
          this.competencesPredf = res?.data?.data;
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
      this.comfirmationForDeleteCompetence = !this.comfirmationForDeleteCompetence;
      this.id_for_delete = id;
    },
    notDeleteCompetence() {
      this.comfirmationForDeleteCompetence = !this.comfirmationForDeleteCompetence;
      this.id_for_delete = "";
    },
    deleteMyCompetence() {
      this.spinner = true;
      axios
        .delete(
          "https://backend.monbrobroli.com/api/deleteCompetencesOfStudents/" +
            this.id_for_delete,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res?.data?.status === true) {
            Swal.fire({
              icon: "success",
              title: res?.data?.message,
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
    
    chosenOneExperience(id) {
      this.spinnerModifyExperience = true;
      this.toogleModifyExperience = !this.toogleModifyExperience;
      this.idExperience = id;
      console.log("IDEXPERIENCE", this.idExperience);
      axios
        .get("https://backend.monbrobroli.com/api/GetMyExperiences", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.MyExperiences = res?.data?.data;
          this.updateExperience = this.MyExperiences.find((item) => item.id === id);
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
          "https://backend.monbrobroli.com/api/modifyExperience/" + this.idExperience,
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
          if (res?.data?.status === true) {
            Swal.fire({
              icon: "success",
              title: res?.data?.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.toogleModifyExperience = !this.toogleModifyExperience;
            this.spinnerModifyExperience = false;
          }
          if (res?.data?.status === false) {
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
          "https://backend.monbrobroli.com/api/deleteMyExperience/" +
            this.idExperienceAtDelete,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          if (res?.data?.status === true) {
            Swal.fire({
              icon: "success",
              title: res?.data?.message,
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
    filterWalletBalance(e) {
      console.log(e.target.value);
      this.isLoadingWallet = true;
      const data = {
        type: this.valueSelectPeriod,
        wallet: e.target.value,
      };
      axios
        .post(
          "https://backend.monbrobroli.com/api/statistiques/filterStatistiqueWallet",
          data,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log("statistique_global", res?.data);
          if (res?.data?.status === true) {
            this.wallet = res?.data?.wallet;
          }
        })
        .catch((error) => {
          console.log("error", error);
          
        })
        .finally(() => {
          this.isLoadingWallet = false;
        });
    },
    get_users() {
      this.$store.dispatch("get_users");

      setTimeout(function () {
        $("#MyTableData").DataTable({
          pagingType: "full_numbers",
          pageLength: 10,
          processing: true,
          order: [],
          language: {
            décimal: "",
            emptyTable: "Aucune donnée disponible dans le tableau",
            infoEmpty: "Showing 0 to 0 of 0 entries",
            info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
            infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Afficher les entrées du _MENU_",
            loadingRecords: "Loading...",
            processing: "Processing...",
            search: "Chercher :",
            stateSave: true,
            zeroRecords: "Aucun enregistrement correspondant trouvé",
            paginate: {
              first: "Premier",
              last: "Dernier",
              next: "Suivant",
              previous: "Précédent",
            },
            aria: {
              sortAscending: ": activate to sort column ascending",
              sortDescending: ": activate to sort column descending",
            },
          },
        });
      }, 10);
    },
  },
  created() {
    console.log("user", this.$store.state.user);
    if(this.$store.state.user?.permissions.some(p => p.name === 'Dashboard')){
this.getAllStatistique();
    this.getAllCompetences();
    // this.getAllCompetencesByStudents();
    }
    
  },
};
</script>

<template>
  <div class="page-body">
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a class="home-item" href="index.html"><em data-feather="home"></em></a>
              </li>
              <li class="breadcrumb-item">Accueil</li>
            </ol>
          </div>
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
        <section v-if="this.$store.state.user?.permissions.some(p => p.name === 'Dashboard')">
          <div
          class="d-flex container_tableauBord"
          style="place-content: flex-start; justify-content: center; flex-wrap: wrap"
        >
          <div
            class="d-flex"
            style="
              flex: 2;
              justify-content: center;
              gap: 0.5em;
              flex-wrap: wrap;
              place-content: center;
              align-items: center;
            "
          >
            <MyCardStatistique
              :dataInfo="[
                { libelle: 'Actives', value: list_offres.OffreActive },
                { libelle: 'Non actives', value: list_offres.Offrespassees },
              ]"
              nameRouter="all_Offres"
              :numberStatistic="Number(list_offres.total)"
              icon_libelle="bi-tag"
              title="Offres"
            />
            <MyCardStatistique
              :dataInfo="[
                { libelle: 'Abonnées', value: list_entreprise.abonne },
                { libelle: 'Non abonnées', value: list_entreprise.nonabonne },
              ]"
              nameRouter="entreprises"
              :numberStatistic="Number(list_entreprise.total)"
              icon_libelle="bi-building"
              title="Entreprise"
            />
            <MyCardStatistique
              :dataInfo="[
                { libelle: 'Abonnés', value: list_students.abonne },
                { libelle: 'Non abonnés', value: list_students.nonAbonne },
              ]"
              nameRouter="students"
              :numberStatistic="Number(list_students.total)"
              icon_libelle="bi-person-badge"
              title="Etudiants"
            />
            <MyCardStatistique
              :dataInfo="[]"
              nameRouter="Contrat"
              :numberStatistic="see_entreprise_student"
              icon_libelle="bi-file-earmark-text"
              title="Contrat"
            />
          </div>
          <div style="flex: 1">
            <div class="card p-2" style="width: 100%; height: auto; position: relative">
              <div>
                <div class="d-flex justify-content-center gap-1 align-items-center">
                  <h3>Total Revenu</h3>
                  /
                  <h5>
                    {{
                      periodeFilterStatisticBalance
                        ? new Date(periodeFilterStatisticBalance).toLocaleString(
                            "fr-FR",
                            { month: "long" }
                          )
                        : new Date().toLocaleString("fr-FR", { month: "long" })
                    }}
                  </h5>
                </div>
                <div class="d-flex justify-content-between gap-2 m-2">
                  <select
                    name="stat"
                    id="stat"
                    class="w-50"
                    v-model="valueSelectPeriod"
                    @change="periodeFilterStatisticBalance = ''"
                  >
                    <option value="Global">Global</option>
                    <option value="entreprise">Entreprise</option>
                    <option value="etudiant">Talents</option>
                  </select>
                  <input
                    class="w-50"
                    type="month"
                    v-model="periodeFilterStatisticBalance"
                    @change="filterWalletBalance"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <span v-if="isLoadingWallet">Chargement...</span>
                <div v-else class="d-flex">
                  <h1 style="font-size: 5em">
                    {{ wallet }}
                  </h1>
                  <span>Fcfa</span>
                </div>
              </div>
            </div>
            <div class="card p-2" style="width: 100%; height: auto; position: relative">
              <div>
                <div class="d-flex justify-content-center align-items-center">
                  <h3>Nombre total de visiteur</h3>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <span v-if="isLoadingWallet">Chargement...</span>
                <div v-else class="d-flex">
                  <h1 style="font-size: 5em">
                    {{ nbreVisit }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            gap: 1.5em;
            align-items: 'center';
            flex-wrap: wrap;
            place-content: 'center !important';
            justify-content: 'center !important';
          "
        >
          <Statistique_Comp :title="'Offres & Candidatures & Contrat'" />
          <Statistique_visite :title="'Visiteur'" />
        </div>
        <div
          style="
            display: flex;
            gap: 1.5em;
            align-items: 'center';
            flex-wrap: wrap;
            place-content: 'center !important';
            justify-content: 'center !important';
          "
        >
          <Statistiques_Account :title="'Entreprises & Etudiants'" />
          <Statistique_revenu :title="'Revenu'" />
        </div>
        </section>
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
  padding: 1.5em !important;
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
@media only screen and (max-width: 900px) {
  .container_tableauBord {
    flex-direction: column-reverse;
    place-content: center !important;
  }
  .card {
    width: 100% !important;
  }
}
</style>
