<script>
import instance from "../../../api/api";
import Editor from "./text-editor.vue";
import Swal from "sweetalert2";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { mapActions, mapState } from "pinia";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
export default {
  name: "DetailOffre",
  components: {
    Editor,
    HeaderDashboard,
  },
  data() {
    return {
      isLoading:false,
      loadingSpinner:useLoadingSpinner(),
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
      offresInteressByStudents: null,
      offre: null,
      salaire: null,
      lieu: null,
      debut: null,
      fin: null,
      description: null,
      offres: [],
      spinner: false,
      offre_id: null,
      modify_offre: false,
      id_offre_update: null,
      creer: true,
      confirmation_for_delete: false,
      id_for_delete: "",
      moneyFormat: new Intl.NumberFormat("de-DE"),
      categorie: "",
      competenceWithCategorie: [],
      competence: "",
      Today: new Date().toJSON().slice(0, 10),
      spinnerModify: true,
      categories: [],
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
    };
  },
  computed: {
    ...mapState(useOffreStore, ["categoriesOffres", "allCompetences"]),
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useOffreStore, ["get_categorie", "getAllCompetences"]),
    update_offre() {
      this.loadingSpinner.launchLoading(true);
      this.isLoading = true;
      instance
        .put("modify_offre_entreprise/" + this.$route.params.id, {
          nom_offre: this.offre_id.nom_offre,
          description: this.offre_id.description,
          debut: this.offre_id.debut,
          fin: this.offre_id.fin,
          salaire: this.offre_id.salaire,
          pointage: this.offre_id.pointage,
          lieu: this.offre_id.lieu,
          competence_id: this.offre_id.competence_id,
          nbre_person:this.offre_id.nbre_person
        })

        .then((res) => {
          // console.log(res);
          this.modify_offre = false;
          this.id_offre_update = "";
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: true,
          });
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: "info",
            title: "erreur",
            showConfirmButton: true,
          });
        })
        .finally(()=>{
          this.loadingSpinner.launchLoading(false);
          this.isLoading = false;
        })
    },
    show_offre_id() {
      this.loadingSpinner.launchLoading(true);
      instance
        .get("get_offres_entreprise")
        .then((res) => {
          // console.log(res);
          this.offres = res.data.data;
          this.offre_id = this.offres.find((offre) => offre.id == this.$route.params.id);
          // console.log("OFFRE_ID", this.offre_id);
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(()=>{
          this.spinnerModify = false;
          this.loadingSpinner.launchLoading(false);
        })
    },
    selectCategorie(e) {
      // console.log("selectCategorie", e.target.value);
      this.competenceWithCategorie = this.allCompetences.filter(
        (item) => item.categorie.id === Number(e.target.value)
      );
    },
  },
  async created() {
    this.show_offre_id();
    this.get_categorie();
    this.getAllCompetences();
    this.texte0 = await this.handleTranslate('Modifier Mon offre');
    this.texte1 = await this.handleTranslate("Catégorie de l'offre");
    this.texte2 = await this.handleTranslate('Sélectionner une catégorie');
    this.texte3 = await this.handleTranslate("Choisir les compétences");
    this.texte4 = await this.handleTranslate('Choisir une compétence');
    this.texte5 = await this.handleTranslate('Veuillez choisir une catégorie');
    this.texte6 = await this.handleTranslate('Pas de donnée');
    this.texte7 = await this.handleTranslate("Nom de l'offre");
    this.texte8 = await this.handleTranslate('Honoraire (Fcfa)');
    this.texte9 = await this.handleTranslate("Termes de paiements");
    this.texte10 = await this.handleTranslate('Payer Par');
    this.texte11 = await this.handleTranslate('Nombre de postes disponibles');
    this.texte12 = await this.handleTranslate("Lieu de l'emploi");
    this.texte13 = await this.handleTranslate("Date et heure de début de l'offre");
    this.texte14 = await this.handleTranslate("Date et heure d'expiration de l'offre");
    this.texte15 = await this.handleTranslate("Date d'entrée en fonction");
    this.texte16 = await this.handleTranslate("Date de fin d'activité");
    this.texte17 = await this.handleTranslate("Description");
    this.texte18 = await this.handleTranslate("Modifier");
   
    
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="texte0"
      :subTitleHeader="texte0"
    />
    <div class="form theme-form projectcreate">
      <form v-if="offre_id" class="container">
        <div class="row">
          <div class="text-left my-3 col-lg-6">
            <label>{{texte1}}</label>
            <select class="form-control" v-model="offre_id.categorie_offre_id" @change="selectCategorie">
              <option value="" disabled>{{texte2}}</option>
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
            <label>{{texte3}}</label>
            <select class="form-control" v-model="offre_id.competence_id" name="" id="select_comp">
              <option value="" disabled>{{texte4}}</option>
              <option
                :value="item.id"
                v-for="(item, index) in competenceWithCategorie"
                :key="index"
              >
                {{ item.competence }}
              </option>
              <option v-if="!competenceWithCategorie.length && !categorie" disabled>
                {{texte5}}
              </option>
              <option v-if="!competenceWithCategorie.length && categorie" disabled>
                {{texte6}}
              </option>
            </select>
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte7}}</label>
            <input
              class="form-control"
              type="text"
              v-model="offre_id.nom_offre"
              placeholder="ex:serveuse,barman,pianiste"
              required
            />
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte8}}</label>
            <input
              class="form-control"
              type="text"
              v-model.number="offre_id.salaire"
              placeholder="ex:35.000 Fcfa"
              required
            />
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte9}}</label>
            <select class="form-control" v-model="offre_id.pointage">
              <option value="" disabled>{{texte10}}</option>
              <option
                :value="item.libelle"
                v-for="(item, index) in OptionsOfpointage"
                :key="index"
              >
                {{ item.libelle }}
              </option>
            </select>
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte11}}</label>
            <input
              class="form-control"
              type="number"
              v-model="offre_id.nbre_person"
              placeholder="ex:5 ou 10"
              required
              min="1"
            />
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte12}}</label>
            <input
              class="form-control"
              type="text"
              id="lieu"
              v-model="offre_id.lieu"
              placeholder="ex:Angré"
              required
            />
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte13}}</label>
            <input
              class="form-control"
              type="datetime-local"
              id="date_time"
              v-model="offre_id.debut"
              :min="new Date().toJSON().slice(0, 16)"
              required
            />
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte14}}</label>
            <input
              class="form-control"
              type="datetime-local"
              id="date_fin"
              v-model="offre_id.fin"
              required
            />
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte15}}</label>
            <input
              class="form-control"
              type="date"
              v-model="offre_id.job_debut"
              required
              id="date_job_debut"
            />
          </div>
          <div class="text-left my-3 col-lg-6">
            <label>{{texte16}}</label>
            <input
              class="form-control"
              type="date"
              v-model="offre_id.job_fin"
              required
            />
          </div>
          <div class="text-left my-3 col-lg-12">
            <label>{{texte17}}</label>
            <div class="conteneur_editor">
              <editor :modelValue="offre_id.description" v-model="offre_id.description" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-end">
              <button
              :disabled="isLoading"
                class="btn p-5 mt-4 btn-designer fw-bold bg-warning"
                @click.prevent="update_offre"
              >
                {{texte18}}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div v-if="spinnerModify" class="container">
       <h3 class="text-center">Chargement...</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  padding:1.5em 2em;
}
form label,
form select option {
  font-size: 1.5em;
}
.mt-5 {
  margin-top: 101px !important;
}
.bi-arrow-left-circle::before {
  font-size: 2em !important;
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
  background: white;
}
label {
  font-weight: bold;
}
.btn-secondary {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
  color: rgb(255, 255, 255) !important;
}

select {
  border-radius: 5px !important;
  width: 100%;
  height: 39px;
  padding:1.1em;
}
input,.form-control{
  padding:1.3em !important;
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
a {
  color: black !important;
}
</style>
