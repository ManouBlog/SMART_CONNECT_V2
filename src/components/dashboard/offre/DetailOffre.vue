<script>
import instance from "../../../api/api";
import Editor from "./text-editor.vue";
import Swal from "sweetalert2";
export default {
  name: "DetailOffre",
  components: {
    Editor,
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
      loading: false,
      creer: true,
      confirmation_for_delete: false,
      id_for_delete: "",
      moneyFormat: new Intl.NumberFormat("de-DE"),
      categorie: "",
      categories: null,
      Today: new Date().toJSON().slice(0, 10),
      spinnerModify: false,
      isLoading:false,
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
  methods: {
    update_offre() {
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
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: "erreur",
            showConfirmButton: true,
          });
          this.isLoading = false;
        });
    },
    show_offre_id() {
      this.spinnerModify = true;
      instance
        .get("get_offres_entreprise")
        .then((res) => {
          console.log(res);
          this.offres = res.data.data;
          this.offre_id = this.offres.find(
            (offre) => offre.id == this.$route.params.id
          );
          this.spinnerModify = false;
          console.log("OFFRE_ID", this.offre_id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.show_offre_id();
  },
};
</script>

<template>
  <div class="page-body position-relative mt-5">
    <div class="container-fluid">
      <div class="page-title">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Modifier Mon offre</li>
        </ol>
      </div>
    </div>
    <div  v-if="offre_id">
      <div class="form theme-form projectcreate">
        <form v-if="offre_id" class="container">
          <div>
            <div class="text-left">
                <label>Nom de l'offre</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="offre_id.nom_offre"
                  placeholder="ex:serveuse,barman,pianiste"
                  required
                />
            
            </div>
            <div class="text-left">
           
                <label>Honoraire (Fcfa)</label>
                <input
                  class="form-control"
                  type="text"
                  v-model.number="offre_id.salaire"
                  placeholder="ex:35.000 Fcfa"
                  required
                />
           
            </div>
            <div class="text-left">
             
                <label>Termes de paiements</label>
                <select v-model="offre_id.pointage">
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

            <div class="text-left">
           
                <label>Lieu de l'emploi</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="offre_id.lieu"
                  placeholder="ex:Angré"
                  required
                />
            
            </div>
            <div class="text-left">
             
                <label>Date et heure début</label>
                <input
                  class="form-control"
                  type="datetime-local"
                  v-model="offre_id.debut"
                  :min="new Date().toJSON().slice(0, 16)"
                  required
                />
             
            </div>
            <div class="text-left">
             
                <label>Date et heure fin</label>
                <input
                  class="form-control"
                  type="datetime-local"
                  v-model="offre_id.fin"
                  :min="offre_id.debut"
                  required
                />
              
            </div>
            <div class="text-left">
             
                <label>Description</label>
                <div class="conteneur_editor">
                  <editor
                    :modelValue="offre_id.description"
                    v-model="offre_id.description"
                  />
                
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text-end">
                <button
                :disabled="isLoading ? true:false"
                 class="btn p-5 mt-4 btn-designer
                 fw-bold btn-secondary" @click.prevent="update_offre">
                  {{isLoading ? 'Loading...':'Modifier'}}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
     <div  v-else>
      <h1>Loading...</h1>
    </div>
  </div>
</template>

<style scoped>
form label,form select option{
  font-size:1.5em;
 
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
  color:rgb(255, 255, 255) !important;
}
input,
textarea,
select {
  border: 2px solid rgb(86, 86, 86) !important;
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
a{
  color:black !important;
}
</style>
