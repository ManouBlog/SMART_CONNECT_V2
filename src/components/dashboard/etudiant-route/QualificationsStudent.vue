<script>
import instance, { lienPhoto } from "../../../api/api";
import Swal from "sweetalert2";
// import { Help } from "../../../utils";
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
      showPdfModal:false,
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
      fileCharged: null,
      user: this.$store.state.user,
      competencesPredf: [],
      lienPhoto: lienPhoto,
      competences: [],
      spinner: false,
      experience: null,
      spinnerExperience: false,
      spinnerModifyQualification: false,
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
      toogleModifyQualifications: false,
      updateExperience: {},
      idQualification: null,
      idQualificationAtDelete: null,
      toogleScreenYouWantDelete: false,
      fileProofAttestation: null,
      spinnerCompetence: false,
      userQualifications: "",
      itemQualification: [],
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
      return { 
      //  detail: "",
       date_debut: new Date(), 
       date_fin: new Date(), 
       objet: "",
       fileCharged:null 
      };
    },
    showBoxConfirmationDeleteCompetences(id) {
      this.comfirmationForDeleteQualifications = !this
        .comfirmationForDeleteQualifications;
      this.id_for_delete = id;
    },
    notDeleteCompetence() {
      this.comfirmationForDeleteQualifications = !this
        .comfirmationForDeleteQualifications;
      this.id_for_delete = "";
    },
    addNouvelExperience() {
      this.toogleNouvelleExperience = !this.toogleNouvelleExperience;
    },
    async saveQualification() {
      loadingSpinner.launchLoading(true);
      let data = new FormData();

      this.itemsQualificationDynamicInput?.forEach((element) => {
        data.append("qualifications[]", JSON.stringify(element));
      });
      try {
        const res = await instance.post("addQualifications", data);
        if (res.data.status === true) {
          await this.getInfoUser();
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.toogleNouvelleExperience = false;
        } else {
          Swal.fire({
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.toogleNouvelleExperience = true;
        }
      } catch (err) {
        console.log(err);
        throw err; // optionnel mais propre
      } finally {
        loadingSpinner.launchLoading(false);
      }
      // const saveReturnQualification = this.update_compte_student({
      //   nom: this.userQualifications.nom,
      //   email: this.userQualifications.email,
      //   prenoms: this.userQualifications.prenoms,
      //   commune: this.userQualifications.commune,
      //   quartier: this.userQualifications.quartier,
      //   contact: this.userQualifications.phone,
      //   ville: this.userQualifications.ville,
      //   bio: this.userQualifications.bio,
      //   diplome: this.userQualifications.diplome,
      //   qualifications: this.itemsQualificationDynamicInput,
      //   competences: Help.retirerIdIntoArrayCompetence(
      //     this.userQualifications.competences
      //   ),
      // });
      // this.getInfoUser();
      // if (saveReturnQualification) {
      //   this.toogleNouvelleExperience = !this.toogleNouvelleExperience;
      // }
    },
    async getInfoUser() {
      await instance
        .get("voirInfoUserConnect")
        .then((resp) => {
          if (resp.data.status === true) {
            this.userQualifications = resp.data.user;
            window.localStorage.setItem("user", JSON.stringify(resp.data.user));
           
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    chosenQualifications(id) {
      let elements = []
      this.itemQualification=[];
      this.spinnerModifyQualification = true;
      this.toogleModifyQualifications = !this.toogleModifyQualifications;
      this.idQualification = id;
       elements = this.userQualifications?.qualifications?.find(
        (item) => item.id === id
      );
      this.fileCharged = elements.fileCharged;
      this.itemQualification.push({
        date_debut:elements.date_debut.split(' ')[0],
        date_fin:elements.date_fin.split(' ')[0],
        objet:elements.objet,
        // detail:elements.detail,
        id:elements.id,
        fileCharged:elements.fileCharged
      })
     
    },
    toogleQualifications() {
      this.idQualification = null;
      this.toogleModifyQualifications = !this.toogleModifyQualifications;
    },
    changeQualifications() {
      loadingSpinner.launchLoading(true);
      let formData = new FormData();
      if (this.itemQualification?.length > 0) {
  this.itemQualification.forEach((item, index) => {
  // envoyer l'objet SANS le fichier
  formData.append(
    `qualifications[${index}]`,
    JSON.stringify({
      objet: item.objet,
      date_debut: item.date_debut,
      date_fin: item.date_fin,
      id: item.id,
    })
  );

  // envoyer le fichier à part
  if (item.fileCharged) {
    formData.append(`files[${index}]`, item.fileCharged);
  }
})
}
      this.spinnerModifyQualification = true;
      instance
        .post("updateQualification",formData)
        .then(async (response) => {
          if (response.data.status === true) {
            await this.getInfoUser();
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.toogleModifyQualifications = !this.toogleModifyQualifications;
          }
         
        })
        .catch((err) => {
       
          console.log(err);
        })
        .finally(async() => {
          await this.getInfoUser();
          loadingSpinner.launchLoading(false);
        });
    },
    deleteMyQualification() {
      loadingSpinner.launchLoading(true);
   
      instance
        .delete("qualifications/" + this.idQualificationAtDelete)
        .then(async (res) => {
      
          if (res.data.status === true) {
            this.toogleScreenYouWantDelete = !this.toogleScreenYouWantDelete;
           await this.getInfoUser();
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
        .finally(async () => {
          await this.getInfoUser();
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
    await this.getInfoUser();
    this.texte0 = await this.handleTranslate("Ajoutez une nouvelle qualification");
    this.texte1 = await this.handleTranslate(`Poste`);
    this.texte2 = await this.handleTranslate("Nom de l'entreprise");
    this.texte3 = await this.handleTranslate("Lieu");
    this.texte4 = await this.handleTranslate("Date début");
    this.texte5 = await this.handleTranslate("Date fin");
    this.texte6 = await this.handleTranslate("Fichier");
    this.texte7 = await this.handleTranslate("Description");
    this.texte8 = await this.handleTranslate("Enregistrer");
    this.texte9 = await this.handleTranslate("Modifier la qualification");
    this.texte10 = await this.handleTranslate("Poste");
    this.texte11 = await this.handleTranslate("Nom de l'entreprise");
    this.texte12 = await this.handleTranslate("Lieu");
    this.texte13 = await this.handleTranslate("Document");
    this.texte14 = await this.handleTranslate("Ajoutez un fichier");
    this.texte15 = await this.handleTranslate("Description (facultatif)");
    this.texte16 = await this.handleTranslate(
      "Voulez-vous vraiment supprimer la qualification?"
    );
    this.texte17 = await this.handleTranslate("Supprimer");
    this.texte18 = await this.handleTranslate("Annuler");
    this.texte19 = await this.handleTranslate(
      "Voulez-vous vraiment supprimer la qualification ?"
    );

    this.texte21 = await this.handleTranslate("Ajoutez");
    this.texte22 = await this.handleTranslate("Compétences");
    this.texte23 = await this.handleTranslate("Action");
    this.texte24 = await this.handleTranslate("Mes qualifications");
    this.texte25 = await this.handleTranslate("Ajoutez une qualification");
    this.texte26 = await this.handleTranslate("Chargement...");
    this.texte27 = await this.handleTranslate("Pas de qualifications");
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
            <h3 class="title_experience">{{ texte0 }}</h3>
          </div>
        </div>
        <form @submit.prevent="saveQualification">
          <div class="my-3" >
            <n-dynamic-input
              v-model:value="itemsQualificationDynamicInput"
              :on-create="onCreateQualification"
            >
              <!-- Bouton Ajoutez -->
              <template #create-button-default>
                <slot name="create-button"> Diplomes ou certification obtenues </slot>
              </template>

              <!-- Contenu d’un item -->
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
                  <div style="width: 100%">
                    <label for="objet">Diplôme ou certification obtenue</label>
                    <input
                      type="text"
                      class="input_class"
                      id="objet"
                      v-model="value.objet"
                      maxlength="100"
                    />
                  </div>

                  <div style="width: 100%">
                    <label for="periode">Période</label>
                    <div style="display: flex; gap: 1em; align-items: center">
                      <input
                        type="date"
                        class="input_class"
                        id="periode"
                        
                        v-model="value.date_debut"
                      />
                      <p>À</p>
                      <input type="date" 
                      :min="value.date_debut"
                      :disabled="!value.date_debut"
                      class="input_class" v-model="value.date_fin" />
                    </div>
                  </div>
                  <!-- <div style="width: 100%;">
                    <label for="description">Description (max 300 caractères)</label>
                    <textarea
                      maxlength="300"
                      id="description"
                      style="
                        width: 100%;
                        border-radius: 5px;
                        padding: 0.5em;
                        border: 1px solid gray;
                      "
                      v-model="value.detail"
                    ></textarea>
                  </div> -->
                </div>
              </template>
            </n-dynamic-input>
          </div>
          <div class="text-center" v-if="itemsQualificationDynamicInput.length">
            <button type="submit" class="btn btn-warning">{{ texte8 }}</button>
          </div>
        </form>
       
      </div>
    </div>
    <div class="add_nouvelle_experience" v-show="toogleModifyQualifications"
    @click.self="toogleQualifications"
    >
      <div class="conteneur_nouvelle_experience" v-if="itemQualification.length">
        <div class="conteneur-experience">
          <em class="bi bi-x-lg" @click="toogleQualifications"></em>
          <div class="h1">
            <h3>{{ texte9 }}</h3>
          </div>
        </div>
        <form @submit.prevent="changeQualifications">
          <div class="my-3">
            <n-dynamic-input 
            :max="1"
            :min="1"
            v-model:value="itemQualification"
             :on-create="onCreateQualification">
        <!-- Bouton Ajoutez -->
        <template #create-button-default>
          <slot name="create-button"> Diplomes ou certifications obtenues </slot>
        </template>

        <!-- Contenu d’un item -->
        <template #default="{ value }">
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              gap: 1em;
              flex-direction: column;
              margin-top:2em;
            "
          >
            <div style="width: 100%">
              <label for="objet"><span style="color:red;">*</span> Diplôme</label>
              <input type="text" class="input_class" id="objet" v-model="value.objet" />
            </div>

            <div style="width: 100%">
              <label for="periode"><span style="color:red;">*</span> Période</label>
              <div style="display: flex; gap: 1em; align-items: center">
                <input
                  type="date"
                  class="input_class"
                  id="periode"
                  v-model="value.date_debut"
                />
                <p>À</p>
                <input 
                type="date"

                 class="input_class" 
                 :min="value.date_debut"
                 :disabled="!value.date_debut"
                v-model="value.date_fin" 
                />
              </div>
            </div>
            <div style="width: 100%">
              
              <div v-if="this.fileCharged">
                        <n-image
                        alt="photo"
                         width="50"
                         height="70"
                         :src="lienPhoto + this.fileCharged"
                        />
                        </div>
              <label for="descriptionFile">Charger un nouveau fichier</label>
              <input
      type="file"
      id="descriptionFile"
      @change="(event)=>value.fileCharged = event.target.files[0]"
      style="
        width: 100%;
        border-radius: 5px;
        padding: 0.5em;
        border: 1px solid gray;
      "
    />
            </div>
            
          </div>
        </template>
      </n-dynamic-input>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-warning"
            >
           Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="page-body mt-5">
      <div
        class="ecran_for_delete delete_article"
        v-show="comfirmationForDeleteQualifications"
        @click.self="notDeleteCompetence"
      >
        <div class="card p-5">
          <p class="h3 my-2">{{ texte16 }}</p>
          <div>
            <button class="btn bg-warning" @click="deleteMyQualification">
              {{ texte17 }}
            </button>
            <button class="btn bg-danger text-light mx-2" @click="notDeleteCompetence">
              {{ texte18 }}
            </button>
          </div>
        </div>
      </div>

      <div class="ecran_for_delete delete_article" v-show="toogleScreenYouWantDelete"
      @click.self="notDeleteQualification"
      >
        <div class="card p-5">
          <p class="h3 my-2">{{ texte19 }}</p>
          <div
            style="display: flex; justify-content: center; align-items: center; gap: 1em"
          >
            <button class="btn bg-warning" @click="deleteMyQualification">
              {{ texte17 }}
            </button>
            <button class="btn bg-danger mx-2" @click="notDeleteQualification">
              {{ texte18 }}
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid default-dash" style="margin: -7em 0 0 0">
        <div class="row" 
        v-if="
  user.user?.statuses
    .some(s => ['Etudiant', 'Professionnel', 'Artisan', 'Vétéran'].includes(s.statut))
"
        >
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
                        class="bi bi-pencil position-absolute"
                        @click="chosenQualifications(item.id)"
                      ></em>
                      <em
                        class="bi bi-trash3 position-absolute"
                        @click="ToogleShowDelete(item.id)"
                      ></em>
                      
                      <div class="rond position-absolute"></div>
                      <div class="contenteur_experience">
                        
                        <h6 class="text-start ms-2">
                          <em class="bi bi-calendar-date"></em>
                          {{
                            `${new Date(
                              item.date_debut
                            ).toLocaleString()} au ${new Date(
                              item.date_fin
                            ).toLocaleString()}`
                          }}
                        </h6>
                        <span style="font-weight:bold;color:gray;font-size:0.8em" v-if="item.objet">
                          {{ item.objet }}
                        </span>
                        <p class="text-start ms-2" v-if="item.detail">
                          Détail : {{ item.detail }}
                        </p>
              
                        <div v-if="item.fileCharged">
  <!-- SI C’EST UN PDF : on affiche un bouton qui ouvre une modal avec iframe -->
  <div v-if="item.fileCharged.toLowerCase().endsWith('.pdf')">
    <n-button
      size="small"
      type="secondary"
      style="border: 1px solid orange; color: orange;"
      @click="showPdfModal = true"
    >
      Voir mon fichier
    </n-button>

    <n-modal v-model:show="showPdfModal" style="width: 90%; max-width: 800px;">
      <div style="height: 70vh;">
        <iframe
          :src="lienPhoto + item.fileCharged"
          frameborder="0"
          style="width: 100%; height: 100%;"
        ></iframe>
      </div>
    </n-modal>
  </div>

  <!-- SINON SI C’EST UNE IMAGE (jpg, png, jpeg, etc.) -->
  <div v-else>
    <n-image
      :alt="photo"
      width="50"
      height="70"
      :src="lienPhoto + item.fileCharged"
    />
  </div>
</div>
                      
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
                      <h4 class="text-center shimmer-text">{{ texte26 }}</h4>
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
:deep(.n-dynamic-input-item){
border-bottom:0.5px solid #d9d9d9; 
padding: 0 0 1em 0;
}
.input_class {
  width: 100%;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid gray;
}
button {
  border-radius: 5px;
}
.p-tabview-panels {
  padding: 0 !important;
}
.header_qualifications {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1em;
  margin: 1em 0;
}
:deep(.n-button:not(.n-button--disabled):active) {
  color: orange !important;
}
:deep(.n-button:not(.n-button--disabled):hover) {
  color: orange !important;
}
:deep(input) {
  padding: 0.5em;
  border: 1px solid orange;
  border-radius: 5px !important;
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
  border: 1.5px solid orange;
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
  z-index: 999;
  background: rgba(0, 0, 0, 0.338);
  display: flex;
  place-items: center;
  justify-content: center;
}
.conteneur_nouvelle_experience {
  width: 80%;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  position: relative;
  border-radius: 8px;
  margin-top: 8em;
}
.conteneur_nouvelle_experience form {
  padding: 1em;
  margin-top: 3.5em;
}

.bi-x-lg {
  position: absolute;
  right: 1em;
  color: crimson;
  font-weight: bold;
  font-size: 1.2em;
  top:0.6em;
  cursor: pointer;
}
.rond {
  width: 20px;
  height: 20px;
  background: #ff8819;
  border-radius: 10px;
  left: -0.6em;
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
  top: 0.5em;
  font-size:1.3em;
  cursor: pointer;
}
.bi-pencil {
  right: 1.7em;
  top: 0.5em;
  font-size:1.3em;
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
  border-radius: 10px 10px 0px 0px;
}
p {
  font-size: 1em !important;
}
@media (max-width: 992px) {
  .conteneur_nouvelle_experience form {
  margin-top: 9em;
}
}
@media (max-width: 768px) {
 
  form {
    padding: 1em;
  }
  .conteneur_nouvelle_experience {
    width: 95%;
  }
  .title_experience {
    font-size: 1.3em !important;
  }
  :deep(.n-dynamic-input .n-dynamic-input-item) {
    display: block;
  }
}
</style>
