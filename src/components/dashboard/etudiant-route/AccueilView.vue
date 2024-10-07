<script>
import instance, { lienPhoto } from "../../../api/api";
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
// import Editor from "../components/text-editor.vue";
export default {
  name: "AccueilView",
  components: {
    VueMultiselect,
  },
  data() {
    return {
      currentPage: 1,
      rows: 2,
      user: this.$store.state.user,
      competencesPredf: [],
      lienPhoto: lienPhoto,
      competences: [],
      spinner: false,
      experience: null,
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
      fileProofAttestation: null,
      spinnerCompetence: false,
    };
  },
  methods: {
    onFileProof(e) {
      this.fileProofAttestation = e.target.files[0];
    },
    getAllCompetencesByStudents() {
      instance
        .get("getCompetenceByStudents")

        .then((res) => {
          console.log("AllCompetences", res.data.data);
          if (res.data.status === true) {
            this.competences = res.data.data.competences;
          }
        });
    },
    addCompetences() {
      this.spinnerCompetence = true;
      instance
        .post("addCompetences", {
          competence: this.comp,
        })

        .then((response) => {
          console.log(response);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinnerCompetence = false;
            // setTimeout(() => {
            //   location.reload(true);
            // }, 1500);
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
          console.log(err);
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
            showConfirmButton: true,
          });
          this.spinnerCompetence = false;
        });
    },
    getAllCompetences() {
      this.spinner = true;

      instance
        .get("GetAllCompetences")

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
      this.comfirmationForDeleteCompetence = !this.comfirmationForDeleteCompetence;
      this.id_for_delete = id;
    },
    notDeleteCompetence() {
      this.comfirmationForDeleteCompetence = !this.comfirmationForDeleteCompetence;
      this.id_for_delete = "";
    },
    deleteMyCompetence() {
      this.spinner = true;
      instance
        .delete("deleteCompetencesOfStudents/" + this.id_for_delete)
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
            //setTimeout(() => {
            //location.reload(true);
            //}, 1500);
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
      let formData = new FormData();
      formData.append("experience", this.experience);
      formData.append("lieu", this.lieu);
      formData.append("dateDebut", this.dateDebut);
      formData.append("dateFin", this.dateFin);
      formData.append("poste", this.poste);
      formData.append("entreprise", this.entreprise);
      formData.append("proof", this.fileProofAttestation);
      instance
        .post("postNewExperience", formData)
        .then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllExperiences() {
      this.spinnerExperience = true;
      instance
        .get("GetMyExperiences")
        .then((res) => {
          console.log("Experiences", res.data.data);
          this.MyExperiences = res.data.data;
          this.spinnerExperience = false;
        })
        .catch((err) => {
          console.log(err);
          this.spinnerExperience = false;
        });
    },
    chosenOneExperience(id) {
      this.spinnerModifyExperience = true;
      this.toogleModifyExperience = !this.toogleModifyExperience;
      this.idExperience = id;
      console.log("IDEXPERIENCE", this.idExperience);
      instance
        .get("GetMyExperiences")
        .then((res) => {
          this.MyExperiences = res.data.data;
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
      let formData = new FormData();
      formData.append("experience", this.updateExperience.experience);
      formData.append("lieu", this.updateExperience.lieu);
      formData.append("dateDebut", this.updateExperience.dateDebut);
      formData.append("dateFin", this.updateExperience.dateFin);
      formData.append("poste", this.updateExperience.poste);
      formData.append("entreprise", this.updateExperience.entreprise);
      formData.append("proof", this.fileProofAttestation);
      this.spinnerModifyExperience = true;
      console.log(this.updateExperience.experience);
      instance
        .post("modifyExperience/" + this.idExperience, formData)
        .then((response) => {
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.toogleModifyExperience = !this.toogleModifyExperience;
            this.spinnerModifyExperience = false;
          }
          if (response.data.status === false) {
            this.spinnerModifyExperience = false;
          }

          console.log("Resultat modification", response);
        })
        .catch((err) => {
          this.spinnerModifyExperience = false;
          console.log(err);
        });
    },
    deleteExperience() {
      instance
        .delete("deleteMyExperience/" + this.idExperienceAtDelete)
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.comfirmationForDeleteCompetence = !this.comfirmationForDeleteCompetence;
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
    onPageChange(event) {
      console.log("EVENT", event);
      this.currentPage = event.page + 1;
    },
  },
  computed: {
    paginatedExperiences() {
      const startIndex = (this.currentPage - 1) * this.rows;
      console.log("startIndex", startIndex);
      const endIndex = startIndex + this.rows;
      console.log("endIndex", endIndex);
      return this.MyExperiences.slice(startIndex, endIndex);
    },
  },
  created() {
    this.getAllExperiences();
    this.getAllCompetences();
    this.getAllCompetencesByStudents();
  },
};
</script>

<template>
  <section v-if="this.$store.state.translate === 'FR'">
    <div class="add_nouvelle_experience" v-show="toogleNouvelleExperience">
      <div class="conteneur_nouvelle_experience">
        <div class="conteneur-experience">
          <em
            class="bi bi-x-lg"
            @click="toogleNouvelleExperience = !toogleNouvelleExperience"
          ></em>
          <div>
            <h1>Ajouter une nouvelle experience</h1>
          </div>
        </div>
        <form @submit.prevent="saveExperience">
          <div class="row p-2">
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Poste</label>
              <input
                type="text"
                v-model="poste"
                placeholder="Ex : Barman,serveuse"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                v-model="entreprise"
                placeholder="Ex : la locomotive"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Lieu</label>
              <input
                type="text"
                v-model="lieu"
                placeholder="Ex : Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Date début</label>
              <input type="date" v-model="dateDebut" required />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Date fin</label>
              <input
                type="date"
                v-model="dateFin"
                :min="dateDebut"
                placeholder="Ex :Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Fichier</label>
              <input
                type="file"
                accept="image/*"
                @change="onFileProof"
                placeholder="Ex :Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Description (facultatif)</label>
              <textarea name="" id="" cols="20" v-model="experience" rows="10"></textarea>
            </div>
          </div>
          <div class="mx-auto">
            <button type="submit" class="btn-lg btn-warning">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
    <div class="add_nouvelle_experience" v-show="toogleModifyExperience">
      <div class="Myspinner" v-show="spinnerModifyExperience">
        <h1>Chargements...</h1>
      </div>
      <div class="conteneur_nouvelle_experience" v-if="updateExperience">
        <div class="conteneur-experience">
          <em class="bi bi-x-lg" @click="toogleExperience"></em>
          <div class="h1">
            <h1 class="fw-bold">Modifier l'experience</h1>
          </div>
        </div>
        <form @submit.prevent="changeExperience">
          <div class="row p-2">
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Poste</label>
              <input
                type="text"
                v-model="updateExperience.poste"
                placeholder="Ex : Barman,serveuse"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                v-model="updateExperience.entreprise"
                placeholder="Ex : la locomotive"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Lieu</label>
              <input
                type="text"
                v-model="updateExperience.lieu"
                placeholder="Ex : Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Date début</label>
              <input type="date" v-model="updateExperience.dateDebut" required />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Date fin</label>
              <input
                type="date"
                v-model="updateExperience.dateFin"
                :min="dateDebut"
                placeholder="Ex : Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <n-image width="200" :src="lienPhoto + updateExperience.proof" />
              <label class="d-block">Ajouter un fichier</label>
              <input
                type="file"
                accept="image/*"
                @change="onFileProof"
                placeholder="Ex :Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Description (facultatif)</label>
              <textarea
                name=""
                id=""
                cols="20"
                v-model="updateExperience.experience"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div class="mx-auto">
            <button
              type="submit"
              :disabled="spinnerModifyExperience ? true : false"
              class="btn-lg btn-warning"
            >
              {{ spinnerModifyExperience ? "Loading..." : "Modifier" }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="page-body mt-5">
      <div
        class="ecran_for_delete delete_article"
        v-show="comfirmationForDeleteCompetence"
      >
        <div class="card p-5">
          <p class="h3 my-2">Voulez-vous vraiment supprimer la compétence?</p>
          <div>
            <button class="btn-lg bg-warning" @click="deleteMyCompetence">
              Supprimer
            </button>
            <button class="btn-lg bg-danger mx-2" @click="notDeleteCompetence">
              Annuler
            </button>
          </div>
        </div>
      </div>

      <div class="ecran_for_delete delete_article" v-show="toogleScreenYouWantDelete">
        <div class="card p-5">
          <p class="h3 my-2">Voulez-vous vraiment supprimer l'expérience ?</p>
          <div>
            <button class="btn-lg bg-warning" @click="deleteExperience">Supprimer</button>
            <button class="btn-lg bg-danger mx-2" @click="notDeleteExperience">
              Annuler
            </button>
          </div>
        </div>
      </div>
      <!-- Container-fluid starts-->
      <div class="container-fluid default-dash">
        <div class="row" v-if="user.user.statut.statut == 'etudiant'">
          <div class="container-fluid">
            <div class="page-title">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Tableau de bord</li>
              </ol>
            </div>
          </div>
          <div class="col-xl-6 col-md-6 dash-xl-50">
            <div class="card profile-greeting" id="content_competences">
              <div class="card-body position-relative">
                <h1 class="fw-bold text-start">Mes compétences</h1>
                <div class="media">
                  <div class="media-body">
                    <div class="greeting-user">
                      <div class="container-fluid">
                        <div class="row">
                          <div class="position-relative">
                            <VueMultiselect
                              v-model="competence"
                              :options="competencesPredf"
                              :multiple="true"
                              :taggable="true"
                              :tag="addTag"
                              @update:model-value="addTag"
                              label="competence"
                              track-by="competence"
                              placeholder="selectionne une competence"
                              class="vuemulti"
                            >
                            </VueMultiselect>
                            <button
                              class="btn bg-warning addCompetences"
                              @click="addCompetences"
                              v-if="comp.length"
                            >
                              <span v-if="this.spinnerCompetence">
                                <n-spin size="small" />
                              </span>
                              <span v-else>Ajouter</span>
                            </button>
                          </div>

                          <div
                            class="col-sm-12 card px-2 mb-5"
                            id="cont_table_competence"
                          >
                            <table class="table">
                              <thead>
                                <tr>
                                  <th class="bg-light">Compétences</th>
                                  <th class="bg-light">Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, index) in competences" :key="index">
                                  <td>
                                    {{ item.competence }}
                                  </td>
                                  <td
                                    class="d-flex justify-content-center align-items-center"
                                  >
                                    <em
                                      class="bi bi-trash"
                                      @click="
                                        showBoxConfirmationDeleteCompetences(
                                          item.pivot.competence_id
                                        )
                                      "
                                    ></em>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 dash-xl-50">
            <div class="card weekly-column">
              <div class="card-body position-relative">
                <div id="weekly-chart">
                  <div class="position-relative">
                    <h1 class="fw-bold text-start">Mes expériences</h1>
                    <em
                      class="bi bi-plus-lg position-absolute"
                      @click="addNouvelExperience"
                    ></em>
                  </div>
                  <div class="conteneur_experience">
                    <div
                      class="experiences position-relative px-4 pb-5"
                      v-for="(item, index) in paginatedExperiences"
                      :key="index"
                    >
                      <em
                        class="bi bi-trash3 position-absolute"
                        @click="ToogleShowDelete(item.id)"
                      ></em>
                      <em
                        class="bi bi-pencil position-absolute"
                        @click="chosenOneExperience(item.id)"
                      ></em>
                      <div class="rond position-absolute"></div>
                      <div class="content_experience">
                        <div class="proof_experience" v-if="item.proof">
                          <n-image width="100" :src="lienPhoto + item.proof" />
                        </div>
                        <h3 class="text-start fw-bold">
                          {{ item.entreprise }}
                        </h3>
                        <h6 class="text-start ms-2 fw-bold">
                          <span class="badge bg-warning text-light fw-bold">{{
                            item.poste
                          }}</span>
                        </h6>
                        <p class="text-start ms-2">
                          <em class="bi bi-geo-alt"></em>
                          {{ item.lieu }}
                        </p>
                        <p class="text-start ms-2">
                          <em class="bi bi-calendar-date"></em>
                          {{
                            `${new Date(
                              item.dateDebut
                            ).toLocaleDateString()} au ${new Date(
                              item.dateFin
                            ).toLocaleDateString()}`
                          }}
                        </p>
                        <p class="text-start ms-2 fw-bold" v-if="item.experience">
                          {{ item.experience }}
                        </p>
                      </div>
                    </div>
                    <div v-if="MyExperiences.length">
                      <Paginator
                        v-model="currentPage"
                        :rows="rows"
                        :totalRecords="MyExperiences.length"
                        @page="onPageChange"
                      ></Paginator>
                    </div>

                    <div v-if="spinner">
                      <h4 class="text-center">Chargements...</h4>
                    </div>
                    <div v-else-if="!MyExperiences.length && !spinner">
                      <h4 class="text-center">Pas d'expérience</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="this.$store.state.translate === 'EN'">
    <div class="add_nouvelle_experience" v-show="toogleNouvelleExperience">
      <div class="conteneur_nouvelle_experience">
        <div class="conteneur-experience">
          <em
            class="bi bi-x-lg"
            @click="toogleNouvelleExperience = !toogleNouvelleExperience"
          ></em>
          <div>
            <h1>Add a new experience</h1>
          </div>
        </div>
        <form @submit.prevent="saveExperience">
          <div class="row p-2">
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Job</label>
              <input
                type="text"
                v-model="poste"
                placeholder="Ex : Barman,serveuse"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Company Name</label>
              <input
                type="text"
                v-model="entreprise"
                placeholder="Ex : la locomotive"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Place</label>
              <input
                type="text"
                v-model="lieu"
                placeholder="Ex : Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Start date</label>
              <input type="date" v-model="dateDebut" required />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>End date</label>
              <input
                type="date"
                v-model="dateFin"
                :min="dateDebut"
                placeholder="Ex :Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>File</label>
              <input
                type="file"
                accept="image/*"
                @change="onFileProof"
                placeholder="Ex :Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Description (optional)</label>
              <textarea name="" id="" cols="20" v-model="experience" rows="10"></textarea>
            </div>
          </div>
          <div class="mx-auto">
            <button type="submit" class="btn-lg btn-warning">Save</button>
          </div>
        </form>
      </div>
    </div>
    <div class="add_nouvelle_experience" v-show="toogleModifyExperience">
      <div class="Myspinner" v-show="spinnerModifyExperience">
        <h1>Loading...</h1>
      </div>
      <div class="conteneur_nouvelle_experience" v-if="updateExperience">
        <div class="conteneur-experience">
          <em class="bi bi-x-lg" @click="toogleExperience"></em>
          <div class="h1">
            <h1 class="fw-bold">Edit experience</h1>
          </div>
        </div>
        <form @submit.prevent="changeExperience">
          <div class="row p-2">
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Job</label>
              <input
                type="text"
                v-model="updateExperience.poste"
                placeholder="Ex : Barman,serveuse"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Company name</label>
              <input
                type="text"
                v-model="updateExperience.entreprise"
                placeholder="Ex : la locomotive"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Place</label>
              <input
                type="text"
                v-model="updateExperience.lieu"
                placeholder="Ex : Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Start date</label>
              <input type="date" v-model="updateExperience.dateDebut" required />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>End date</label>
              <input
                type="date"
                v-model="updateExperience.dateFin"
                :min="dateDebut"
                placeholder="Ex : Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <n-image width="200" :src="lienPhoto + updateExperience.proof" />
              <label class="d-block">Add a file</label>
              <input
                type="file"
                accept="image/*"
                @change="onFileProof"
                placeholder="Ex :Cocody angré"
                required
              />
            </div>
            <div class="col-lg-12 my-2 col-md-12 col-sm-6 text-start">
              <label>Description (optional)</label>
              <textarea
                name=""
                id=""
                cols="20"
                v-model="updateExperience.experience"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div class="mx-auto">
            <button
              type="submit"
              :disabled="spinnerModifyExperience ? true : false"
              class="btn-lg btn-warning"
            >
              {{ spinnerModifyExperience ? "Loading..." : "Modifier" }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="page-body mt-5">
      <div
        class="ecran_for_delete delete_article"
        v-show="comfirmationForDeleteCompetence"
      >
        <div class="card p-5">
          <p class="h3 my-2">Are you sure you want to remove the skill?</p>
          <div>
            <button class="btn-lg bg-warning" @click="deleteMyCompetence">Delete</button>
            <button class="btn-lg bg-danger mx-2" @click="notDeleteCompetence">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="ecran_for_delete delete_article" v-show="toogleScreenYouWantDelete">
        <div class="card p-5">
          <p class="h3 my-2">Are you sure you want to delete the experience ?</p>
          <div>
            <button class="btn-lg bg-warning" @click="deleteExperience">Delete</button>
            <button class="btn-lg bg-danger mx-2" @click="notDeleteExperience">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <!-- Container-fluid starts-->
      <div class="container-fluid default-dash">
        <div class="row" v-if="user.user.statut.statut == 'etudiant'">
          <div class="container-fluid">
            <div class="page-title">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Dashboard</li>
              </ol>
            </div>
          </div>
          <div class="col-xl-6 col-md-6 dash-xl-50">
            <div class="card profile-greeting" id="content_competences">
              <div class="card-body position-relative">
                <h1 class="fw-bold text-start">My skills</h1>
                <div class="media">
                  <div class="media-body">
                    <div class="greeting-user">
                      <div class="container-fluid">
                        <div class="row">
                          <div class="position-relative">
                            <VueMultiselect
                              v-model="competence"
                              :options="competencesPredf"
                              :multiple="true"
                              :taggable="true"
                              :tag="addTag"
                              @update:model-value="addTag"
                              label="competence"
                              track-by="competence"
                              placeholder="select a skill"
                              class="vuemulti"
                            >
                            </VueMultiselect>
                            <button
                              class="btn bg-warning addCompetences"
                              @click="addCompetences"
                              v-if="comp.length"
                            >
                              <span v-if="this.spinnerCompetence">
                                <n-spin size="small" />
                              </span>
                              <span v-else>Add</span>
                            </button>
                          </div>

                          <div
                            class="col-sm-12 card px-2 mb-5"
                            id="cont_table_competence"
                          >
                            <table class="table">
                              <thead>
                                <tr>
                                  <th class="bg-light">Skill</th>
                                  <th class="bg-light">Detail</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, index) in competences" :key="index">
                                  <td>
                                    {{ item.competence }}
                                  </td>
                                  <td
                                    class="d-flex justify-content-center align-items-center"
                                  >
                                    <em
                                      class="bi bi-trash"
                                      @click="
                                        showBoxConfirmationDeleteCompetences(
                                          item.pivot.competence_id
                                        )
                                      "
                                    ></em>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 dash-xl-50">
            <div class="card weekly-column">
              <div class="card-body position-relative">
                <div id="weekly-chart">
                  <div class="position-relative">
                    <h1 class="fw-bold text-start">My experiences</h1>
                    <em
                      class="bi bi-plus-lg position-absolute"
                      @click="addNouvelExperience"
                    ></em>
                  </div>
                  <div class="conteneur_experience">
                    <div
                      class="experiences position-relative px-4 pb-5"
                      v-for="(item, index) in paginatedExperiences"
                      :key="index"
                    >
                      <em
                        class="bi bi-trash3 position-absolute"
                        @click="ToogleShowDelete(item.id)"
                      ></em>
                      <em
                        class="bi bi-pencil position-absolute"
                        @click="chosenOneExperience(item.id)"
                      ></em>
                      <div class="rond position-absolute"></div>
                      <div class="content_experience">
                        <div class="proof_experience" v-if="item.proof">
                          <n-image width="100" :src="lienPhoto + item.proof" />
                        </div>
                        <h3 class="text-start fw-bold">
                          {{ item.entreprise }}
                        </h3>
                        <h6 class="text-start ms-2 fw-bold">
                          <span class="badge bg-warning text-light fw-bold">
                            {{ item.poste }}</span
                          >
                        </h6>
                        <p class="text-start ms-2">
                          <em class="bi bi-geo-alt"></em>
                          {{ item.lieu }}
                        </p>
                        <p class="text-start ms-2">
                          <em class="bi bi-calendar-date"></em>
                          {{
                            `${new Date(
                              item.dateDebut
                            ).toLocaleDateString()} au ${new Date(
                              item.dateFin
                            ).toLocaleDateString()}`
                          }}
                        </p>
                        <p class="text-start ms-2 fw-bold" v-if="item.experience">
                          {{ item.experience }}
                        </p>
                      </div>
                    </div>
                    <div v-if="MyExperiences.length">
                      <Paginator
                        v-model="currentPage"
                        :rows="rows"
                        :totalRecords="MyExperiences.length"
                        @page="onPageChange"
                      ></Paginator>
                    </div>

                    <div v-if="spinner">
                      <h4 class="text-center">Loading...</h4>
                    </div>
                    <div v-else-if="!MyExperiences.length && !spinner">
                      <h4 class="text-center">No experience</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.mt-5 {
  margin-top: 101px !important;
}
input,
textarea {
  width: 100%;
}

textarea {
  border: 2px solid orange;
  border-radius: 5px;
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
  width: 60%;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  position: relative;
  border-radius: 5px;
}
.conteneur_nouvelle_experience form {
  padding: 1em;
  margin-top: 5em;
}

.bi-x-lg {
  position: absolute;
  right: 1em;
  top: 1em;
  color: crimson;
  font-weight: bold;
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
  color: black;
}
.content_experience {
  padding: 0.5em 0;
}

.proof_experience {
  position: absolute;
  right: 9em;
  top: 0;
  border: 2px solid black;
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
  background: rgba(0, 0, 0, 0.342);
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
  display: flex;
  place-items: center;
  justify-content: center;
  border-radius: 10px;
}
#cont_table_competence {
  margin-top: 1.5em;
}
.position-absolute {
  position: absolute;
}
.position-relative {
  position: relative;
}
.text-start,
label {
  text-align: left;
}
.fw-bold,
label,
h4 {
  font-weight: bold;
  color: black;
}
.profile-greeting .greeting-user .btn:hover {
  background: #6362e7 !important;
  color: white !important;
}
.table,
tr,
th,
td {
  border: 1px solid black !important;
  text-align: center;
}
.card {
  background-color: white !important;
  padding: 2em;
}
.conteneur-experience {
  position: fixed;
  background: rgb(255, 255, 255);
  z-index: 12;
  width: inherit;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.297);
}
</style>
