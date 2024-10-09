<script>
import instance from "../../../api/api";
import Editor from "./text-editor.vue";
import Swal from "sweetalert2";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { mapActions, mapState } from "pinia";
import { useOffreStore } from "../../../store-pinia/Offres/useOffreStore";
export default {
  name: "DetailOffre",
  components: {
    Editor,
    HeaderDashboard,
  },
  data() {
    return {
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
      spinnerModify: false,
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
    ...mapActions(useOffreStore, ["get_categorie", "getAllCompetences"]),
    update_offre() {
      console.log("this.offre_id.competence_id",this.offre_id.competence_id)
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
          console.log(res);
          this.modify_offre = false;
          this.id_offre_update = "";
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: true,
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: "erreur",
            showConfirmButton: true,
          });
        });
    },
    show_offre_id() {
      this.spinnerModify = true;
      instance
        .get("get_offres_entreprise")
        .then((res) => {
          console.log(res);
          this.offres = res.data.data;
          this.offre_id = this.offres.find((offre) => offre.id == this.$route.params.id);
          this.spinnerModify = false;
          console.log("OFFRE_ID", this.offre_id);
        })
        .catch((err) => {
          console.log(err);
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
    this.show_offre_id();
    this.get_categorie();
    this.getAllCompetences();
  },
};
</script>

<template>
  <div class="page-body position-relative">
    <HeaderDashboard
      :TitleHeader="'Modifier Mon offre'"
      :subTitleHeader="'Modifier Mon offre'"
    />
    <div class="form theme-form projectcreate">
      <form v-if="offre_id" class="container">
        <div>
          <div class="text-left my-3">
            <label>Catégorie de l'offre</label>
            <select class="form-control" v-model="offre_id.categorie_offre_id" @change="selectCategorie">
              <option value="" disabled>Sélectionner une catégorie</option>
              <option
                :value="item.id"
                v-for="(item, index) in categoriesOffres"
                :key="index"
              >
                {{ item.categorie }}
              </option>
            </select>
          </div>
          <div class="text-left my-3">
            <label>Choisir les compétences</label>
            <select class="form-control" v-model="offre_id.competence_id" name="" id="select_comp">
              <option value="" disabled>Choisir une compétence</option>
              <option
                :value="item.id"
                v-for="(item, index) in competenceWithCategorie"
                :key="index"
              >
                {{ item.competence }}
              </option>
              <option v-if="!competenceWithCategorie.length && !categorie" disabled>
                Veuillez choisir une catégorie
              </option>
              <option v-if="!competenceWithCategorie.length && categorie" disabled>
                Pas de donnée
              </option>
            </select>
          </div>
          <div class="text-left my-3">
            <label>Nom de l'offre</label>
            <input
              class="form-control"
              type="text"
              v-model="offre_id.nom_offre"
              placeholder="ex:serveuse,barman,pianiste"
              required
            />
          </div>
          <div class="text-left my-3">
            <label>Honoraire (Fcfa)</label>
            <input
              class="form-control"
              type="text"
              v-model.number="offre_id.salaire"
              placeholder="ex:35.000 Fcfa"
              required
            />
          </div>
          <div class="text-left my-3">
            <label>Termes de paiements</label>
            <select class="form-control" v-model="offre_id.pointage">
              <option value="" disabled>Payer Par</option>
              <option
                :value="item.libelle"
                v-for="(item, index) in OptionsOfpointage"
                :key="index"
              >
                {{ item.libelle }}
              </option>
            </select>
          </div>
          <div class="text-left my-3">
            <label>Nombre de postes disponibles</label>
            <input
              class="form-control"
              type="number"
              v-model="offre_id.nbre_person"
              placeholder="ex:5 ou 10"
              required
              min="1"
            />
          </div>
          <div class="text-left my-3">
            <label>Lieu de l'emploi</label>
            <input
              class="form-control"
              type="text"
              v-model="offre_id.lieu"
              placeholder="ex:Angré"
              required
            />
          </div>
          <div class="text-left my-3">
            <label>Date et heure de début de l'offre</label>
            <input
              class="form-control"
              type="datetime-local"
              v-model="offre_id.debut"
              :min="new Date().toJSON().slice(0, 16)"
              required
            />
          </div>
          <div class="text-left my-3">
            <label>Date et heure d'expiration de l'offre</label>
            <input
              class="form-control"
              type="datetime-local"
              v-model="offre_id.fin"
              :min="offre_id.debut"
              required
            />
          </div>
          <div class="text-left my-3">
            <label>Date d'entrée en fonction</label>
            <input
              class="form-control"
              type="date"
              v-model="offre_id.job_debut"
              required
            />
          </div>
          <div class="text-left my-3">
            <label>Date de fin d'activité</label>
            <input
              class="form-control"
              type="date"
              v-model="offre_id.job_fin"
              required
            />
          </div>
          <div class="text-left my-3">
            <label>Description</label>
            <div class="conteneur_editor">
              <editor :modelValue="offre_id.description" v-model="offre_id.description" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-end">
              <button
                class="btn p-5 mt-4 btn-designer fw-bold bg-warning"
                @click.prevent="update_offre"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
