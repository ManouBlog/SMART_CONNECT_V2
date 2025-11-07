<script>
import instance, { lienPhoto } from "../../../api/api";
import Swal from "sweetalert2";
import { Help } from "../../../utils";
// import VueMultiselect from "vue-multiselect";
import { useInfoPersonnel } from "../../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
// import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
// import Editor from "../components/text-editor.vue";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();
export default {
  name: "CompetencesAndExperience",
  components: {
    // VueMultiselect,
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
      texte27: "",
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
      comfirmationForDeleteQualifications: false,
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
      idQualificationAtDelete: null,
      toogleScreenYouWantDelete: false,
      fileProofAttestation: null,
      spinnerCompetence: false,
      userQualifications: "",
      itemQualification: "",
      itemsQualificationDynamicInput: [],
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useInfoPersonnel, ["update_compte_student"]),
    onFileProof(e) {
      this.fileProofAttestation = e.target.files[0];
    },
    onCreateQualification() {
      return { detail: "", date_debut: new Date(), date_fin: new Date() };
    },
    showBoxConfirmationDeleteCompetences(id) {
      this.comfirmationForDeleteQualifications = !this.comfirmationForDeleteQualifications;
      this.id_for_delete = id;
    },
    notDeleteCompetence() {
      this.comfirmationForDeleteQualifications = !this.comfirmationForDeleteQualifications;
      this.id_for_delete = "";
    },
    addNouvelExperience() {
      this.toogleNouvelleExperience = !this.toogleNouvelleExperience;
    },
    saveQualification() {
      const saveReturnQualification = this.update_compte_student({
        nom: this.userQualifications.nom,
        email: this.userQualifications.email,
        prenoms: this.userQualifications.prenoms,
        commune: this.userQualifications.commune,
        quartier: this.userQualifications.quartier,
        contact: this.userQualifications.phone,
        ville: this.userQualifications.ville,
        bio: this.userQualifications.bio,
        diplome: this.userQualifications.diplome,
        qualifications: this.itemsQualificationDynamicInput,
        competences: Help.retirerIdIntoArrayCompetence(
          this.userQualifications.competences
        ),
      });
      this.getInfoUser();
      if(saveReturnQualification){
     this.toogleNouvelleExperience = !this.toogleNouvelleExperience
      }
      
    },
    async getInfoUser() {
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          if (resp.data.status === true) {
            this.userQualifications = resp.data.user;
            console.log("this.userQualifications", this.userQualifications);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    chosenOneExperience(id) {
      this.spinnerModifyExperience = true;
      this.toogleModifyExperience = !this.toogleModifyExperience;
      this.idExperience = id;
      this.itemQualification = this.userQualifications?.qualifications?.find(
        (item) => item.id === id
      );
      console.log("itemQualification", this.itemQualification);
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
      // // console.log(this.updateExperience.experience);
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
            this.spinnerModifyExperience = false;
          }
          if (response.data.status === false) {
            this.spinnerModifyExperience = false;
          }
        })
        .catch((err) => {
          this.spinnerModifyExperience = false;
          console.log(err);
        });
    },
    deleteMyQualification() {
      loadingSpinner.launchLoading(true);
      console.log('this.idQualificationAtDelete',this.idQualificationAtDelete)
      instance
        .delete("qualifications/" + this.idQualificationAtDelete)
        .then((res) => {
          console.log("deleteQualification", res);
          if (res.data.status === true) {
            this.toogleScreenYouWantDelete = !this.toogleScreenYouWantDelete;
            this.getInfoUser();
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
         .finally(() => {
          this.getInfoUser();
          loadingSpinner.launchLoading(false);
        });
    },
    ToogleShowDelete(id) {
      this.idQualificationAtDelete = id;
      this.toogleScreenYouWantDelete = !this.toogleScreenYouWantDelete;
    },
    notDeleteQualification() {
      this.idQualificationAtDelete = null;
      this.toogleScreenYouWantDelete = !this.toogleScreenYouWantDelete;
    },
    onPageChange(event) {
      this.currentPage = event.page + 1;
    },
  },
  computed: {
    paginatedQualifications() {
      const startIndex = (this.currentPage - 1) * this.rows;
      const endIndex = startIndex + this.rows;
      return this.userQualifications?.qualifications?.slice(startIndex, endIndex);
    },
  },
  async created() {
    this.getInfoUser();
    this.texte0 = await this.handleTranslate("Ajouter une nouvelle qualification");
    this.texte1 = await this.handleTranslate(`Poste`);
    this.texte2 = await this.handleTranslate("Nom de l'entreprise");
    this.texte3 = await this.handleTranslate("Lieu");
    this.texte4 = await this.handleTranslate("Date début");
    this.texte5 = await this.handleTranslate("Date fin");
    this.texte6 = await this.handleTranslate("Fichier");
    this.texte7 = await this.handleTranslate("Description");
    this.texte8 = await this.handleTranslate("Enregistrer");
    this.texte9 = await this.handleTranslate("Modifier l'experience");
    this.texte10 = await this.handleTranslate("Poste");
    this.texte11 = await this.handleTranslate("Nom de l'entreprise");
    this.texte12 = await this.handleTranslate("Lieu");
    this.texte13 = await this.handleTranslate("Document");
    this.texte14 = await this.handleTranslate("Ajouter un fichier");
    this.texte15 = await this.handleTranslate("Description (facultatif)");
    this.texte16 = await this.handleTranslate(
      "Voulez-vous vraiment supprimer la compétence?"
    );
    this.texte17 = await this.handleTranslate("Supprimer");
    this.texte18 = await this.handleTranslate("Annuler");
    this.texte19 = await this.handleTranslate(
      "Voulez-vous vraiment supprimer la qualification ?"
    );
    this.texte20 = await this.handleTranslate("Mes qualifications");
    this.texte21 = await this.handleTranslate("Ajouter");
    this.texte22 = await this.handleTranslate("Compétences");
    this.texte23 = await this.handleTranslate("Action");
    this.texte24 = await this.handleTranslate("Mes qualifications");
    this.texte25 = await this.handleTranslate("Ajouter une qualification");
    this.texte26 = await this.handleTranslate("Chargement...");
    this.texte27 = await this.handleTranslate("Pas de qualifications");
  },
};
</script>

<template>
  <section>
    <div class="add_nouvelle_experience" v-show="toogleNouvelleExperience">
      <div class="conteneur_nouvelle_experience">
        <div class="conteneur-experience">
          <em
            class="bi bi-x-lg"
            @click="toogleNouvelleExperience = !toogleNouvelleExperience"
          ></em>
          <div class="p-3">
            <h3 style="padding: 0.5em">{{ texte0 }}</h3>
          </div>
        </div>
        <form @submit.prevent="saveQualification">
          <div class="my-3">
            <n-dynamic-input
              v-model:value="itemsQualificationDynamicInput"
              :on-create="onCreateQualification"
            >
              <template #create-button-default>
                <slot name="create-button">Ajouter des qualifications</slot>
              </template>
              <template #default="{ value }">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    width: 100%;
                    gap: 1em;
                    flex-direction: column;
                  "
                >
                  <div style="display: flex; width: 100%; gap: 1em">
                    <input style="width: 100%" type="date" v-model="value.date_debut" />
                    <p>À</p>
                    <input style="width: 100%" type="date" v-model="value.date_fin" />
                  </div>

                  <textarea
                    id="msg"
                    name="msg"
                    maxlength="300"
                    style="width: 100%; border-radius: 5px; padding: 1em"
                    placeholder="Détails (max 300 caractères)"
                    v-model="value.detail"
                  ></textarea>
                </div>
              </template>
            </n-dynamic-input>
          </div>
          <div class="text-center" v-if="itemsQualificationDynamicInput.length">
            <button type="submit" class="btn-lg btn-warning">{{ texte8 }}</button>
          </div>
        </form>
      </div>
    </div>
    <div class="add_nouvelle_experience" v-show="toogleModifyExperience">
      <div class="conteneur_nouvelle_experience" v-if="itemQualification">
        <div class="conteneur-experience">
          <em class="bi bi-x-lg" @click="toogleExperience"></em>
          <div class="h1">
            <h1>{{ texte9 }}</h1>
          </div>
        </div>
        <form @submit.prevent="changeExperience">
          <div class="my-3">
            <label class="form-label">Qualifications</label>
            <n-dynamic-input
              v-model:value="itemsQualificationDynamicInput"
              :on-create="onCreateQualification"
            >
              <template #create-button-default>
                <slot name="create-button">Ajouter des qualifications</slot>
              </template>
              <template #default="{ value }">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    width: 100%;
                    gap: 1em;
                    flex-direction: column;
                  "
                >
                  <div style="display: flex; width: 100%; gap: 1em">
                    <input style="width: 100%" type="date" v-model="value.date_debut" />
                    <p>À</p>
                    <input style="width: 100%" type="date" v-model="value.date_fin" />
                  </div>

                  <textarea
                    id="msg"
                    name="msg"
                    maxlength="300"
                    style="width: 100%; border-radius: 5px; padding: 1em"
                    placeholder="Détails (max 300 caractères)"
                    v-model="value.detail"
                  ></textarea>
                </div>
              </template>
            </n-dynamic-input>
          </div>
          <div class="text-center">
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
        v-show="comfirmationForDeleteQualifications"
      >
        <div class="card p-5">
          <p class="h3 my-2">{{ texte16 }}</p>
          <div>
            <button class="btn-lg bg-warning" @click="deleteMyQualification">
              {{ texte17 }}
            </button>
            <button class="btn-lg bg-danger mx-2" @click="notDeleteCompetence">
              {{ texte18 }}
            </button>
          </div>
        </div>
      </div>

      <div class="ecran_for_delete delete_article" v-show="toogleScreenYouWantDelete">
        <div class="card p-5">
          <p class="h3 my-2">{{ texte19 }}</p>
          <div>
            <button class="btn-lg bg-warning" @click="deleteMyQualification">
              {{ texte17 }}
            </button>
            <button class="btn-lg bg-danger mx-2" @click="notDeleteQualification">
              {{ texte18 }}
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid default-dash" style="margin: -7em 0 0 0">
        <div class="row" v-if="user.user.statut.statut == 'etudiant'">
          <div class="col-md-12" style="margin: 4em 0">
            <div class="weekly-column">
              <div class="card-body position-relative">
                <div id="weekly-chart">
                  <div class="header_qualifications">
                    <h1 class="fw-bold text-start" style="color: orange; margin: 0">
                      {{ texte24 }}
                    </h1>
                    <button
                      style="background: orange; color: white; border: none"
                      @click="addNouvelExperience"
                    >
                      {{ texte25 }}
                      <em class="bi bi-plus-lg"></em>
                    </button>
                  </div>
                  <div class="conteneur_experience">
                    <div
                      class="experiences position-relative px-4 pb-5"
                      v-for="(item, index) in paginatedQualifications"
                      :key="index"
                    >
                      <em
                        class="bi bi-trash3 position-absolute"
                        @click="ToogleShowDelete(item.id)"
                      ></em>
                      <!-- <em
                        class="bi bi-pencil position-absolute"
                        @click="chosenOneExperience(item.id)"
                      ></em> -->
                      <div class="rond position-absolute"></div>
                      <div class="contenteur_experience">
                        <!-- <div class="proof_experience" v-if="item.proof">
                          <n-image width="100" :src="lienPhoto + item.proof" />
                        </div> -->
                        <!-- <h3 class="text-start">
                          {{ item.entreprise }}
                        </h3> -->
                        <!-- <h6 class="text-start ms-2 fw-bold">
                          <span class="badge bg-warning text-light fw-bold">{{
                            item.poste
                          }}</span>
                        </h6> -->
                        <!-- <p>
                          <em class="bi bi-geo-alt"></em>
                          {{ item.lieu }}
                        </p> -->
                        <h6 class="text-start ms-2">
                          <em class="bi bi-calendar-date"></em>
                          {{
                            `${new Date(
                              item.date_debut
                            ).toLocaleDateString()} au ${new Date(
                              item.date_fin
                            ).toLocaleDateString()}`
                          }}
                        </h6>
                        <p class="text-start ms-2">
                          {{ item.detail }}
                        </p>
                      </div>
                    </div>
                    <div v-if="userQualifications?.qualifications?.length">
                      <Paginator
                        v-model="currentPage"
                        :rows="rows"
                        :totalRecords="userQualifications?.qualifications?.length"
                        @page="onPageChange"
                      ></Paginator>
                    </div>

                    <div v-if="spinner">
                      <h4 class="text-center">{{ texte26 }}</h4>
                    </div>
                    <div
                      v-else-if="!userQualifications?.qualifications?.length && !spinner"
                    >
                      <h4 class="text-center">{{ texte27 }}</h4>
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
<style scoped>
.header_qualifications{
  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap:1em;
  margin:1em 0;
}
:deep(input) {
  padding: 0.5em;
  border: 1px solid orange;
  border-radius: 5px !important;
}
:deep(.multiselect__input) {
  padding: 0 !important;
}
:deep(.multiselect__option--highlight) {
  background: orange;
}
:deep(.multiselect__tag) {
  background: orange;
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
  margin-top: 3.5em;
}

.bi-x-lg {
  position: absolute;
  right: 1em;
  top: 0.5em;
  color: crimson;
  font-weight: bold;
  font-size: 1.5em;
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
.contenteur_experience {
  padding: 0.5em 0;
  font-size: 1.5em !important;
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
  padding: 0 1.5em;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.297);
}
p {
  font-size: 1em !important;
}
</style>
