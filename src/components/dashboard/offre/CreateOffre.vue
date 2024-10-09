<script>
import Editor from "./text-editor.vue";
import Swal from "sweetalert2";
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { mapActions, mapState } from "pinia";
export default {
  name: "CreateOffre",
  components: {
    Editor,
    HeaderDashboard,
  },
  data() {
    return {
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
          id: 1,
          libelle: "Jour",
        },
        {
          id: 2,
          libelle: "Heure",
        },
      ],
      pointage: "",
      nbre_person: 1,
      job_fin:"",
      job_debut:"",
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
  },
  methods: {
    ...mapActions(useOffreStore, ["get_categorie", "getAllCompetences"]),
    show_offre_modify() {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = "";
    },

    create_offre() {
      this.loading = true;
      this.creer = false;
      let capitalizeFirstLetterOffre = this.offre[0].toUpperCase();
      let offreConcat = capitalizeFirstLetterOffre + this.offre.substring(1);
      console.log(offreConcat);
      let data = {
        nom_offre: offreConcat,
        salaire: this.salaire,
        description: this.description,
        debut: this.debut,
        fin: this.fin,
        lieu: this.lieu,
        pointage: this.pointage,
        categorie_offre_id: this.categorie,
        competence_id: this.competence,
        nbre_person: this.nbre_person,
        job_fin:this.job_fin,
        job_debut:this.job_debut
      };
      instance
        .post("create_offre", data)
        .then((res) => {
          this.spinner = true;
          this.loading = false;
          console.log(res);
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
          }
        })
        .catch((res) => {
          console.log(res.response.data.message);
          Swal.fire({
            icon: "error",
            title: res.response.data.message,
            showConfirmButton: true,
          });
          this.loading = false;
          this.creer = true;
        });
    },
    show_box_confirmation_delete(id) {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = id;
      console.log("ID_DELETE", this.id_for_delete);
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
          console.log(res);

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

    selectCategorie(e) {
      console.log("selectCategorie", e.target.value);
      this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(e.target.value)
      );
    },
  },
  created() {
    this.get_categorie();
    this.getAllCompetences();
  },
};
</script>
<template>
  <section>
    <div class="page-body position-relative">
      <div class="Myspinner" v-show="spinner">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <HeaderDashboard
        :TitleHeader="'Enregistrer une Offre'"
        :subTitleHeader="'Enregistrer une Offre'"
      />
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12">
            <div class="card timetable">
              <div class="social-tab">
                <div class="tab-content" id="top-tabContent">
                  <div>
                    <div class="container-fluid">
                      <div class="Myspinner" v-show="spinner">
                        <div class="spinner-border text-primary" role="status"></div>
                      </div>
                      <div class="row">
                        <div class="col-lg-12 my-2">
                          <div class="card-body">
                            <div class="form theme-form projectcreate">
                              <form @submit.prevent="create_offre">
                                <div class="container">
                                  <div class="row">
                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label> Catégorie</label>
                                        <select
                                          v-model="categorie"
                                          @change="selectCategorie"
                                        >
                                          <option value="" disabled>
                                            Sélectionner une catégorie
                                          </option>
                                          <option
                                            :value="item.id"
                                            v-for="(item, index) in categoriesOffres"
                                            :key="index"
                                          >
                                            {{ item.categorie }}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="col-lg-12 my-2 text-left">
                                      <label id="select_comp"
                                        >Choisir les compétences</label
                                      >
                                      <select
                                        v-model="competence"
                                        name=""
                                        id="select_comp"
                                      >
                                        <option value="" disabled>
                                          Choisir une compétence
                                        </option>
                                        <option
                                          :value="item.id"
                                          v-for="(item, index) in competenceWithCategorie"
                                          :key="index"
                                        >
                                          {{ item.competence }}
                                        </option>
                                        <option
                                          v-if="
                                            !competenceWithCategorie.length && !categorie
                                          "
                                          disabled
                                        >
                                          Veuillez choisir une catégorie
                                        </option>
                                        <option
                                          v-if="
                                            !competenceWithCategorie.length && categorie
                                          "
                                          disabled
                                        >
                                          Pas de donnée
                                        </option>
                                      </select>
                                    </div>
                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label>Nom de l'offre</label>
                                        <input
                                          class="form-control"
                                          type="text"
                                          v-model="offre"
                                          placeholder="ex:serveuse,barman,pianiste"
                                          required
                                          pattern="[A-Za-zÀ-ȕ(),-_., ]*"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label>Honoraire</label>
                                        <input
                                          class="form-control"
                                          type="text"
                                          v-model="salaire"
                                          placeholder="ex:35.000 Fcfa"
                                          pattern="[0-9]*"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label>Termes de paiements </label>
                                        <select
                                          v-model="pointage"
                                          :disabled="salaire ? false : true"
                                        >
                                          <option value="" disabled>Payer Par</option>
                                          <option
                                            :value="item.libelle"
                                            v-for="(item, index) in OptionsOfpointage"
                                            :key="index"
                                          >
                                            {{ item.libelle }}
                                          </option>
                                        </select>
                                        <span class="text-danger"
                                        :class="!salaire ? 'd-block':'d-none'"
                                        >*Veuillez définir l'honoraire</span>
                                      </div>
                                    </div>

                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label>Lieu de l'emploi</label>
                                        <input
                                          class="form-control"
                                          type="text"
                                          v-model="lieu"
                                          placeholder="ex:Angré"
                                          required
                                          pattern="[A-Za-zÀ-ȕ(),-_., ]*"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label>Nombre de postes disponibles</label>
                                        <input
                                          class="form-control"
                                          type="number"
                                          v-model="nbre_person"
                                          placeholder="ex:5 ou 10"
                                          required
                                          min="1"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label
                                          for="calendar-12h d-block"
                                          class="date_heure"
                                          >Date et heure de début de l'offre</label
                                        >
                                        <input
                                          class="form-control"
                                          type="datetime-local"
                                          v-model="debut"
                                          required
                                          :min="new Date().toISOString().slice(0, 16)"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label for="calendar-12" class="date_heure">
                                          Date et heure d'expiration de l'offre</label
                                        >
                                        <input
                                          class="form-control"
                                          type="datetime-local"
                                          :disabled="debut != null ? false : true"
                                          v-model="fin"
                                          required
                                          :min="debut"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-lg-12 my-2 text-left">
                                      <label>Date d'entrée en fonction</label>
                                      <input
                                        class="form-control"
                                        type="date"
                                        v-model="job_debut"
                                        required
                                      />
                                    </div>
                                    <div class="col-lg-12 my-2 text-left">
                                      <label>Date de fin d'activité</label>
                                      <input
                                        class="form-control"
                                        type="date"
                                        v-model="job_fin"
                                        required
                                      />
                                    </div>

                                    <div class="col-lg-12 my-2">
                                      <div class="mb-3">
                                        <label>Description</label>
                                        <div class="conteneur_editor">
                                          <editor v-model="description" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col">
                                      <div class="text-end">
                                
                                        <button
                                          class="btn btn-warning btn-designer me-3"
                                          type="submit"
                                          :disabled="loading ? true : false"
                                        >
                                          {{ loading ? "Loading..." : "Enregistrer" }}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
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
.date_heure {
  display: block !important;
}

#calendar-12h {
  width: 100% !important;
}

form label,
form select option {
  font-size: 1.5em;
}

.mb-3 {
  text-align: left;
}
.conteneur_editor {
  border: 1px solid black;
  color: black !important;
  border-radius: 5px;
  padding: 0 0 2em 0;
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
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
