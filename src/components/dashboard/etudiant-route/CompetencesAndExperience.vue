<script>
import instance, { lienPhoto } from "../../../api/api";
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
// import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
// import Editor from "../components/text-editor.vue";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner()
export default {
  name: "CompetencesAndExperience",
  components: {
    VueMultiselect,
    // HeaderDashboard,
  },
  data() {
    return {
      texte0: "",
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
      texte27:"",
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    onFileProof(e) {
      this.fileProofAttestation = e.target.files[0];
    },
    getAllCompetencesByStudents() {
      instance
        .get("getCompetenceByStudents")
        .then((res) => {
     
          if (res.data.status === true) {
            this.competences = res.data.data.competences;
          }
        });
    },
    addCompetences() {
      loadingSpinner.launchLoading(true);
      this.spinnerCompetence = true;
      instance
        .post("addCompetences", {
          competence: this.comp,
        })

        .then((response) => {
        
          if (response.data.status === true) {
            this.getAllCompetences();
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinnerCompetence = false;
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
          console.log(err)
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
            showConfirmButton: true,
          });
          this.spinnerCompetence = false;
        })
        .finally(()=>{
          this.getAllCompetencesByStudents();
          loadingSpinner.launchLoading(false);
        })
    },
    getAllCompetences() {
      instance
        .get("GetAllCompetences")

        .then((res) => {
          
          this.competencesPredf = res.data.data;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    addTag(newTag) {
     
      let brox = newTag;
      this.acquis = brox;
      this.comp = [];
      this.acquis.forEach((el) => {
        this.comp.push(el.id);
      });

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
      loadingSpinner.launchLoading(true);
      instance
        .delete("deleteCompetencesOfStudents/" + this.id_for_delete)
        .then((res) => {
        
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.notDeleteCompetence()
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(()=>{
          this.getAllCompetencesByStudents();
          loadingSpinner.launchLoading(false);
        })
    },
    addNouvelExperience() {
      this.toogleNouvelleExperience = !this.toogleNouvelleExperience;
    },
    saveExperience() {
      loadingSpinner.launchLoading(true);
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
            this.toogleNouvelleExperience = false
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          loadingSpinner.launchLoading(false);
          this.getAllExperiences();
        })
    },
    async getAllExperiences() {
      if (
  this.$store.state.token &&
  (this.$store.state.user?.user?.statuses || [])
    .some(s => ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'].includes(s.statut))
){
        this.spinnerExperience = true;
      await instance
        .get("GetMyExperiences")
        .then((res) => {
   
          this.MyExperiences = res.data.data;
          this.spinnerExperience = false;
        })
        .catch((err) => {
          console.log(err)
          this.spinnerExperience = false;
        });
       }else{
        return;
       }
     
    },
    chosenOneExperience(id) {
      this.spinnerModifyExperience = true;
      this.toogleModifyExperience = !this.toogleModifyExperience;
      this.idExperience = id;
     
      instance
        .get("GetMyExperiences")
        .then((res) => {
          this.MyExperiences = res.data.data;
          this.updateExperience = this.MyExperiences?.find((item) => item.id === id);
          this.spinnerModifyExperience = false;
       
        })
        .catch((err) => {
          console.log(err)
          this.spinnerModifyExperience = true;
        });
    },
    toogleExperience() {
      this.idExperience = null;
      this.toogleModifyExperience = !this.toogleModifyExperience;
    },
    changeExperience() {
      loadingSpinner.launchLoading(true);
      let formData = new FormData();
      formData.append("experience", this.updateExperience.experience);
      formData.append("lieu", this.updateExperience.lieu);
      formData.append("dateDebut", this.updateExperience.dateDebut);
      formData.append("dateFin", this.updateExperience.dateFin);
      formData.append("poste", this.updateExperience.poste);
      formData.append("entreprise", this.updateExperience.entreprise);
      formData.append("proof", this.fileProofAttestation);
      this.spinnerModifyExperience = true;
    
      instance
        .post("modifyExperience/" + this.idExperience, formData)
        .then((response) => {
          
          if (response.data.status === true) {
            this.getAllExperiences();
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.toogleModifyExperience = !this.toogleModifyExperience;
          }
        })
        .catch((err) => {
          console.log(err)
        }).finally(() => {
      this.spinnerModifyExperience = false; // on arrête le spinner
      loadingSpinner.launchLoading(false);
    });
    },
    deleteExperience() {
      loadingSpinner.launchLoading(true);
      instance
        .delete("deleteMyExperience/" + this.idExperienceAtDelete)
        .then((res) => {
          if (res.data.status === true) {
            this.getAllExperiences();
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.toogleScreenYouWantDelete = false
          }
        })
        .catch((err) => {
          console.log(err)
        }).finally(()=>{
          this.toogleScreenYouWantDelete = false
          loadingSpinner.launchLoading(false);
        })
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
     
      this.currentPage = event.page + 1;
    },
  },
  computed: {
    paginatedExperiences() {
      const startIndex = (this.currentPage - 1) * this.rows;
   
      const endIndex = startIndex + this.rows;
     
      return this.MyExperiences.slice(startIndex, endIndex);
    },
  },
  async created() {
    this.getAllExperiences();
    this.getAllCompetences();
    this.getAllCompetencesByStudents();
    this.texte0 = await this.handleTranslate('Ajouter une nouvelle experience');
    this.texte1 = await this.handleTranslate(`Poste`);
    this.texte2 = await this.handleTranslate("Nom de l'entreprise");
    this.texte3 = await this.handleTranslate('Lieu');
    this.texte4 = await this.handleTranslate('Date début');
    this.texte5 = await this.handleTranslate('Date fin');
    this.texte6 = await this.handleTranslate('Fichier');
    this.texte7 = await this.handleTranslate('Description');
    this.texte8 = await this.handleTranslate('Enregistrer');
    this.texte9 = await this.handleTranslate("Modifier l'experience");
    this.texte10 = await this.handleTranslate('Poste');
    this.texte11 = await this.handleTranslate("Nom de l'entreprise");
    this.texte12 = await this.handleTranslate('Lieu');
    this.texte13 = await this.handleTranslate('Document');
    this.texte14 = await this.handleTranslate('Ajouter un fichier');
    this.texte15 = await this.handleTranslate('Description (facultatif)');
    this.texte16 = await this.handleTranslate('Voulez-vous vraiment supprimer la compétence?');
    this.texte17 = await this.handleTranslate('Supprimer'); 
    this.texte18 = await this.handleTranslate('Annuler'); 
    this.texte19 = await this.handleTranslate("Voulez-vous vraiment supprimer l'expérience ?"); 
    this.texte20 = await this.handleTranslate('Mes compétences'); 
    this.texte21 = await this.handleTranslate('Ajouter'); 
    this.texte22 = await this.handleTranslate('Compétences'); 
    this.texte23 = await this.handleTranslate('Action'); 
    this.texte24 = await this.handleTranslate('Mes expériences'); 
    this.texte25 = await this.handleTranslate('Ajouter une expérience'); 
    this.texte26 = await this.handleTranslate('Chargement...'); 
    this.texte27 = await this.handleTranslate("Pas d'expérience"); 
   
  },
};
</script>

<template>
  <section>

    <div class="add_nouvelle_experience" v-show="toogleNouvelleExperience"
    @click.self="toogleNouvelleExperience = !toogleNouvelleExperience"
    >
      <div class="conteneur_nouvelle_experience">
        <div class="conteneur-experience">
          <em
            class="bi bi-x-lg"
            @click="toogleNouvelleExperience = !toogleNouvelleExperience"
          ></em>
          <div style="padding: 1em;">
            <h3>{{texte0}}</h3>
          </div>
        </div>
        <form @submit.prevent="saveExperience">
          <div class="row p-5 mt-3">
            <div class="col-lg-6 my-2 col-md-6 col-sm-6 text-start">
              <label>
                <span style="color:red">*</span>
                {{texte1}}</label>
              <input  type="text" style="padding:1em" v-model="poste" required />
            </div>
            <div class="col-lg-6 my-2 col-md-6 col-sm-6 text-start">
              <label><span style="color:red;">*</span>{{texte2}}</label>
              <input type="text"  style="padding:1em" v-model="entreprise" required />
            </div>
            <div class="col-lg-6 my-2 col-md-6 col-sm-6 text-start">
              <label><span style="color:red;">*</span>{{texte3}}</label>
              <input type="text" style="padding:1em" v-model="lieu" required />
            </div>
            <div class="col-lg-6 my-2 col-md-6 col-sm-6 text-start">
              <label><span style="color:red;">*</span>{{texte4}}</label>
              <input type="date" style="padding:1em" v-model="dateDebut" required />
            </div>
            <div class="col-lg-6 my-2 col-md-6 col-sm-6 text-start">
              <label>{{texte5}}</label>
              <input type="date" style="padding:1em" v-model="dateFin" :min="dateDebut" required />
            </div>
            <div class="col-lg-6 my-2 col-md-6 col-sm-6 text-start">
              <label>{{texte6}}</label>
              <input type="file" style="padding:1em" accept="image/*" @change="onFileProof" />
            </div>
            <div class="col-lg-6 my-2 col-md-6 col-sm-6 text-start">
              <label>{{texte7}}</label>
              <textarea name="expereience" id="experience" cols="20" v-model="experience" rows="10"></textarea>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-warning">{{texte8}}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="add_nouvelle_experience" v-show="toogleModifyExperience"
    @click.self="toogleExperience"
    >
      <div class="conteneur_nouvelle_experience" v-if="updateExperience">
        <div class="conteneur-experience">
          <em class="bi bi-x-lg" @click="toogleExperience"></em>
          <div class="h1">
            <h3>{{texte9}}</h3>
          </div>
        </div>
        <form @submit.prevent="changeExperience">
          <div class="row p-2">
            <div class="col-lg-3 my-2 col-md-6 col-sm-3 text-start">
              <label>{{texte10}}</label>
              <input
                type="text"
                v-model="updateExperience.poste"
                placeholder="Ex : Barman,serveuse"
                required
                style="padding:1em"
              />
            </div>
            <div class="col-lg-3 my-2 col-md-6 col-sm-3 text-start">
              <label>{{texte11}}</label>
              <input
                type="text"
                v-model="updateExperience.entreprise"
                placeholder="Ex : la locomotive"
                required
                style="padding:1em"
              />
            </div>
            <div class="col-lg-3 my-2 col-md-6 col-sm-3 text-start">
              <label>{{texte12}}</label>
              <input
                type="text"
                v-model="updateExperience.lieu"
                placeholder="Ex : Cocody angré"
                required
                style="padding:1em"
              />
            </div>
            <div class="col-lg-3 my-2 col-md-6 col-sm-3 text-start">
              <label>{{texte4}}</label>
              <input type="date"
              style="padding:1em"
              v-model="updateExperience.dateDebut" required />
            </div>
            <div class="col-lg-3 my-2 col-md-6 col-sm-3 text-start">
              <label>{{texte5}}</label>
              <input
                type="date"
                v-model="updateExperience.dateFin"
                :min="dateDebut"
                placeholder="Ex : Cocody angré"
                required
                style="padding:1em"
              />
            </div>
            <div class="col-lg-3 my-2 col-md-6 col-sm-3 text-start">
              <div v-if="updateExperience.proof">
                <label class="d-block">{{texte13}}</label>
                <n-image width="200" :src="lienPhoto + updateExperience.proof" />
              </div>
              <label class="d-block">{{texte14}}</label>
              <input
                type="file"
                accept="image/*"
                @change="onFileProof"
                placeholder="Ex :Cocody angré"
                style="padding:1em"
              />
            </div>
            <div class="col-lg-3 my-2 col-md-6 col-sm-3 text-start">
              <label>{{texte15}}</label>
              <textarea
                name="description"
                id="description"
                cols="20"
                v-model="updateExperience.experience"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              :disabled="spinnerModifyExperience ? true : false"
              class="btn btn-warning"
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
        @click.self="notDeleteCompetence"
      >
        <div class="card p-5">
          <p class="h3 my-2">{{texte16}}</p>
          <div style="display:flex;gap:1em;justify-content:center;">
            <button class="btn bg-warning m-2 border-0" @click="deleteMyCompetence">
              {{texte17}}
            </button>
            <button class="btn m-2 border-0" style="background:red !important;color:white;" @click="notDeleteCompetence">
              {{texte18}}
            </button>
          </div>
        </div>
      </div>

      <div class="ecran_for_delete delete_article" v-show="toogleScreenYouWantDelete"
      @click.self="notDeleteExperience"
      >
        <div class="card p-5">
          <p class="h3 my-2">{{texte19}}</p>
          <div style="display:flex;gap:1em;">
            <button class="btn w-75 bg-warning m-2" @click="deleteExperience"> {{texte17}}</button>
            <button class="btn w-75 m-2" style="background:red !important;" @click="notDeleteExperience">
              {{texte18}}
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid default-dash" style="margin: -7em 0 0 0">
        <div class="row" 
        v-if="
  user.user?.statuses
    .some(s => ['Etudiant', 'Professionnel', 'Artisan', 'Veteran'].includes(s.statut))
"
        >
          <div class="col-xl-5 col-md-6 dash-xl-50 my-5">
            <div class="profile-greeting" id="content_competences">
              <div class="card-body position-relative">
                <h1 class="fw-bold text-start" style="color: orange">{{texte20}}</h1>
                <div>
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
                  <div class="d-flex justify-content-start my-2">
                    <button
                      class="btn bg-warning addCompetences"
                      @click="addCompetences"
                      v-if="comp.length"
                    >
                      <span v-if="this.spinnerCompetence">
                        <n-spin size="small" />
                      </span>
                      <span v-else>{{texte21}}</span>
                    </button>
                  </div>
                </div>

                <div class="media">
                  <div class="media-body">
                    <div class="greeting-user">
                      <div>
                        <div class="col-sm-12 px-2 mb-5" id="cont_table_competence">
                          <table class="table" v-if="competences.length > 0">
                            <thead>
                              <tr>
                                <th>{{texte22}}</th>
                                <th>{{texte23}}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, index) in competences" :key="index">
                                <td>
                                  {{ item.competence }}
                                </td>
                                <td
                                  style="text-align:center;"
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
                          <h4 style="color:black;text-align:center;font-weight:bold;" v-else>Pas de compétences.</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-6 dash-xl-50" style="margin: 4em 0">
            <div class="weekly-column">
              <div class="card-body position-relative">
                <div id="weekly-chart">
                  <div class="d-flex justify-content-between align-items-center">
                    <h1 class="fw-bold text-start" style="color: orange; margin: 0">
                      {{texte24}}
                    </h1>
                    <button
                      style="background: orange; color: white; border: none"
                      @click="addNouvelExperience"
                    >
                      {{texte25}}
                      <em class="bi bi-plus-lg"></em>
                    </button>
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
                      <div class="contenteur_experience">
                        <div class="proof_experience" v-if="item.proof">
                          <n-image width="100" :src="lienPhoto + item.proof" />
                        </div>
                        <h3 class="text-start">
                          {{ item?.entreprise }}
                        </h3>
                        <h6 class="text-start ms-2 fw-bold">
                          <span class="badge bg-warning text-light fw-bold">{{
                            item.poste
                          }}</span>
                        </h6>
                        <p>
                          <em class="bi bi-geo-alt"></em>
                          {{ item.lieu }}
                        </p>
                        <h6 class="text-start ms-2">
                          <em class="bi bi-calendar-date"></em>
                          {{
                            `${new Date(
                              item.dateDebut
                            ).toLocaleDateString()} au ${new Date(
                              item.dateFin
                            ).toLocaleDateString()}`
                          }}
                        </h6>
                        <p class="text-start ms-2" v-if="item.experience !== null ||
                         item.experience !== 'null'">
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
                      <h4 class="text-center">{{texte26}}</h4>
                    </div>
                    <div v-else-if="!MyExperiences.length && !spinner">
                      <h4 class="text-center">{{texte27}}</h4>
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
button{
  border-radius:5px;
  margin-top:1em;
}
 .title_modal{
    font-size:1.5em !important;
  }
:deep(input){
  padding:0.5em;
  border:1px solid rgb(161, 161, 161);
  border-radius: 5px !important;
}
:deep(.multiselect__input){
padding:0 !important;
}
:deep(.multiselect__option--highlight){
  background:orange;
}
:deep(.multiselect__tag){
  background:orange;
}
.card {
  margin-bottom: 0px;
  border: none;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 15px;
  box-shadow: 1px 6px 6px 6px rgb(28 28 28 / 7%);
  padding: 2em 3em;
  background: white;
}
.mt-5 {
  margin-top: 101px !important;
}
input,
textarea {
  width: 100%;
  border-radius: 10px;
  padding: 0 1em;
}

textarea {
  border: 2px solid rgb(161, 161, 161);
  border-radius: 5px;
}

.conteneur_editor {
  border: 1px solid orange;
  color: black !important;
  padding: 0 1em;
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
  width: 80%;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  position: relative;
  border-radius: 5px;
}
.conteneur_nouvelle_experience form {
  padding: 0.5em;
  margin-top: 3.5em;
}

.bi-x-lg {
  position: absolute;
  right: 1em;
  top:0.6em;
  color: crimson;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
}
.rond {
  width: 20px;
  height: 20px;
  background: #ff8819;
  border-radius: 10px;
  left: -1.6em;
  top: -16px;
}
.bi-plus-lg {
  right: 0;
  top: 0;
  font-size: 1.2em;
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
.contenteur_experience {
  padding: 0.5em 0;
  font-size:1.5em !important;
}

.proof_experience {
  position: absolute;
  right: 9em;
  top: 0;
  border: 2px solid black;
  width: 150px;
  height: 150px;
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
.conteneur-experience {
  position: fixed;
  background: rgb(255, 255, 255);
  z-index: 12;
  width: inherit;
  padding:0 1.5em;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.297);
  border-radius: 10px 10px 0px 0px;
}
p {
  font-size: 1em !important;
}

/* === Amélioration responsive mobile === */
@media screen and (max-width: 992px) {
 h2{
    font-size:1.5em !important;
  }
  /* Conteneur principal */
  .info-header {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 1em;
  }

  .info-header h1 {
    font-size: 1.3rem !important;
  }

  .info-header button {
    width: 100%;
    text-align: center;
    border-radius: 8px !important;
    font-size: 0.9rem;
    padding: 0.6em;
  }

  /* Activation du compte */
  .conteneur_activation {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.8em;
  }

  /* Section des infos personnelles */
  .row > [class*="col-"] {
    width: 100% !important;
    flex: 1 1 100%;
    max-width: 100%;
    margin-bottom: 1em;
  }

  .n-modal iframe {
    height: 300px !important;
  }

  /* Avatar + caméra */
  .d-flex {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap:1em;
  }
  .conteneur_experience{
    margin:1em 0;
  }

  .bi-camera-fill {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    margin-top: 0.5em;
  }
.p-tabview .p-tabview-panels{
  padding:0 !important;
}
  /* Compétences & qualifications */
  .conteneur-flex {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.8em;
  }

  .conteneur-flex div {
    width: 100%;
  }

  /* Tableau et formulaires */
  table {
    width: 100%;
    font-size: 0.9em;
  }

  input,
  textarea,
  button {
    width: 100%;
    max-width: 100%;
  }

  /* Titres */
  h1, h3, h4, p, label {
    text-align: left !important;
  }

  /* Espacements */
  .card-body {
    padding: 0.5em !important;
  }

  .a-card {
    margin: 1em 0 !important;
  }

   .col-md-6{
    padding:0;
  }

  /* Image profil */
  .btn_photo_profil n-avatar,
  .btn_photo_profil p {
    width: 100px !important;
    height: 100px !important;
  }
 
}

@media screen and (max-width: 576px) {
  .conteneur_nouvelle_experience form {
  padding: 0.1em;
  margin-top: 6em;
}
  .info-header h1 {
    font-size: 1.1rem !important;
  }

  .fw-bold {
    font-size: 1rem !important;
  }

  .conteneur_activation button {
    font-size: 0.8rem !important;
    padding: 0.4em 0.8em !important;

  }
  

  .bi-camera-fill {
    font-size: 1rem !important;
  }
}


</style>
