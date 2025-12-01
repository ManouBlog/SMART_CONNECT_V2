<script>
import Editor from "./text-editor.vue";
import Swal from "sweetalert2";
import instance from "../../../api/api";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { mapActions, mapState } from "pinia";
export default {
  name: "CreateOffre",
  components: {
    Editor,
    HeaderDashboard,
  },
  data() {
    return {
      texte0: "",
      StoreLoading: useLoadingSpinner(),
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
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useOffreStore, ["get_categorie", "getAllCompetences"]),

    show_offre_modify() {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = "";
    },

    create_offre() {
      this.StoreLoading.launchLoading(true);
      this.loading = true;
      this.creer = false;
      let capitalizeFirstLetterOffre = this.offre[0].toUpperCase();
      let offreConcat = capitalizeFirstLetterOffre + this.offre.substring(1);
      // console.log(offreConcat);
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
        job_fin: this.job_fin,
        job_debut: this.job_debut,
      };
      instance
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
          console.log(res);
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
        })
        .finally(() => {
          this.StoreLoading.launchLoading(false);
        });
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

    selectCategorie(e) {
      // console.log("selectCategorie", e.target.value);
      this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(e.target.value)
      );
    },
  },
  async created() {
    this.get_categorie();
    this.getAllCompetences();
    this.texte0 = await this.handleTranslate("Enregistrer une Offre");
    this.texte1 = await this.handleTranslate("Catégorie d'offre");
    this.texte2 = await this.handleTranslate("Sélectionner une catégorie");
    this.texte3 = await this.handleTranslate("Choisir les compétences");
    this.texte4 = await this.handleTranslate("Choisir une compétence");
    this.texte5 = await this.handleTranslate("Veuillez choisir une catégorie");
    this.texte6 = await this.handleTranslate(" Pas de donnée");
    this.texte7 = await this.handleTranslate("Nom de l'offre");
    this.texte8 = await this.handleTranslate("Honoraire");
    this.texte9 = await this.handleTranslate("Termes de paiements");
    this.texte10 = await this.handleTranslate("Payer Par");
    this.texte11 = await this.handleTranslate("Veuillez définir l'honoraire");
    this.texte12 = await this.handleTranslate("Lieu de l'emploi");
    this.texte13 = await this.handleTranslate("Nombre de postes disponibles");
    this.texte14 = await this.handleTranslate("Date et heure de début de l'offre");
    this.texte15 = await this.handleTranslate("Date et heure d'expiration de l'offre");
    this.texte16 = await this.handleTranslate("Date de début de travail");
    this.texte17 = await this.handleTranslate("Date de fin de travail");
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
      <div>
        <form @submit.prevent="create_offre" class="container">
          <div class="row">
            <div class="text-left my-3 col-lg-6">
              <label> {{ texte1 }}</label>
              <select v-model="categorie" @change="selectCategorie">
                <option value="" disabled>
                  {{ texte2 }}
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
            <div class="text-left my-3 col-lg-6">
              <label id="select_comp">{{ texte3 }}</label>
              <select
                :class="{ 'select-disabled': !categorie }"
                v-model="competence"
                name="select_comp"
                id="select_comp"
              >
                <option value="" disabled style="color: brown">
                  {{ texte4 }}
                </option>
                <option
                  :value="item.id"
                  v-for="(item, index) in competenceWithCategorie"
                  :key="index"
                >
                  {{ item.competence }}
                </option>
                <option
                  style="color: brown"
                  v-if="!competenceWithCategorie.length && !categorie"
                  disabled
                >
                  {{ texte5 }}
                </option>
                <option
                  style="color: brown; font-size: 0.9em"
                  v-if="!competenceWithCategorie.length && categorie"
                  disabled
                >
                  {{ texte6 }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="text-left my-3 col-lg-6">
              <label>{{ texte7 }}</label>
              <input
                class="form-control"
                type="text"
                v-model="offre"
                placeholder="ex:serveuse,barman,pianiste"
                required
              />
            </div>
            <div class="text-left my-3 col-lg-6">
              <label>{{ texte8 }}</label>
              <input
                class="form-control"
                type="text"
                v-model="salaire"
                placeholder="ex:35.000 Fcfa"
                pattern="[0-9]*"
              />
            </div>
          </div>
          <div class="row">
            <div class="text-left my-3 col-lg-6">
              <label>{{ texte9 }} </label>
              <select
                :class="{ 'select-disabled': !salaire }"
                v-model="pointage"
                :disabled="salaire ? false : true"
              >
                <option value="" disabled>{{ texte10 }}</option>
                <option
                  :value="item.libelle"
                  v-for="(item, index) in OptionsOfpointage"
                  :key="index"
                >
                  {{ item.libelle }}
                </option>
              </select>
              <span class="text-danger" :class="!salaire ? 'd-block' : 'd-none'"
                >*{{ texte11 }}</span
              >
            </div>

            <div class="text-left my-3 col-lg-6">
              <label>{{ texte12 }}</label>
              <input
                class="form-control"
                type="text"
                v-model="lieu"
                placeholder="ex:Angré"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="text-left my-3 col-lg-6">
              <label>{{ texte13 }}</label>
              <input
                class="form-control"
                type="number"
                v-model="nbre_person"
                placeholder="ex:5 ou 10"
                required
                min="1"
              />
            </div>
            <div class="text-left my-3 col-lg-6">
              <label for="calendar-12h d-block" class="date_heure">{{ texte14 }}</label>
              <input
                class="form-control"
                type="datetime-local"
                v-model="debut"
                required
                :min="new Date().toISOString().slice(0, 16)"
              />
            </div>
          </div>
          <div class="row">
            <div class="text-left my-3 col-lg-6">
              <label for="calendar-12" class="date_heure"> {{ texte15 }}</label>
              <input
                class="form-control"
                type="datetime-local"
                :disabled="debut != null ? false : true"
                v-model="fin"
                required
                :min="debut"
              />
            </div>
            <div class="text-left my-3 col-lg-6">
              <label>{{ texte16 }}</label>
              <input
                class="form-control"
                type="datetime-local"
                v-model="job_debut"
                required
                :min="fin"
              />
            </div>
          </div>
          <div class="row">
            <div class="text-left my-3 col-lg-6">
              <label>{{ texte17 }}</label>
              <input
                class="form-control"
                type="datetime-local"
                v-model="job_fin"
                required
                :min="job_debut"
              />
            </div>

            <div class="col-md-12 my-2 text-left">
              <label>{{ texte18 }}</label>
              <div class="conteneur_editor">
                <editor v-model="description" />
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: center; padding: 1.5em 0">
            <button
              class="btn btn-warning btn-designer me-3"
              type="submit"
              :disabled="loading ? true : false"
            >
              {{ loading ? texte20 : texte19 }}
            </button>
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
  font-size: 1.5em;
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
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
