<script>
/* eslint-disable */
import $ from "jquery";
import Editor from "@/components/text-editor.vue";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Swal from "sweetalert2";
export default {
  name: "OffresView",
  components: {
    Editor,
  },
  data() {
    return {
      offre: null,
      salaire: null,
      lieu: null,
      debut: null,
      fin: null,
      description: null,
      offres: null,
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
    show_offre_modify() {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = "";
    },
    update_offre() {
      axios
        .put(
          "https://backend.monbrobroli.com/api/modify_offre_entreprise/" +
            this.id_offre_update,
          {
            nom_offre: this.offre_id.nom_offre,
            description: this.offre_id.description,
            debut: this.offre_id.debut,
            fin: this.offre_id.fin,
            salaire: this.offre_id.salaire,
            pointage: this.offre_id.pointage,
            lieu: this.offre_id.lieu,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.modify_offre = false;
          this.id_offre_update = "";
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        
        });
    },
    get_offres() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/get_offres_entreprise", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.offres = res.data.data;
          this.spinner = false;
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
        })
        .catch((err) => {
          console.log(err);
          
        });
    },
    async show_offre_id(id) {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = id;
      console.log("ID", this.id_offre_update);
      this.spinnerModify = true;
      await axios
        .get("https://backend.monbrobroli.com/api/get_offres_entreprise", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.offres = res.data.data;
          this.offre_id = this.offres.find((offre) => offre.id === id);
          this.spinnerModify = false;
          console.log("OFFRE_ID", this.offre_id);
        })
        .catch((err) => {
          console.log(err);
          
        });
    },
    create_offre() {
      this.loading = true;
      this.creer = false;
      let capitalizeFirstLetterOffre = this.offre[0].toUpperCase();
      let offreConcat = capitalizeFirstLetterOffre + this.offre.substring(1);
      console.log(offreConcat);
      axios
        .post(
          "https://backend.monbrobroli.com/api/create_offre",
          {
            nom_offre: offreConcat,
            salaire: this.salaire,
            description: this.description,
            debut: this.debut,
            fin: this.fin,
            lieu: this.lieu,
            pointage: this.pointage,
            categorie_offre_id: this.categorie,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
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

            this.creer = true;
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.spinner = false;
            this.creer = true;
          }
        })
        .catch((res) => {
          console.log(res);
          Swal.fire({
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
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
      axios
        .delete(
          "https://backend.monbrobroli.com/api/delete_offre_entreprise/" +
            this.id_for_delete,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);

          if (res.data.status == true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.confirmation_for_delete = !this.confirmation_for_delete;
            setTimeout(function () {
              location.reload(true);
            }, 1500);
          }
        })
        .catch((err) => {
          if (err) {
            this.confirmation_for_delete = !this.confirmation_for_delete;
            Swal.fire({
              icon: "error",
              title:
                "l'offre ne peut pas être supprimé.Une personne à déja postuler à cette offre.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    },
    get_categorie() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/seeCategorie", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.categories = res.data.data;
          console.log("CATEGORIE", this.categories);
          this.spinner = false;
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.get_offres();
    this.get_categorie();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="ecran" v-if="modify_offre">
      <div class="modify_form plan-modify">
        <div class="container">
          <div class="row">
            <div class="col-sm-10 modify-form">
              <div class="card">
                <div class="card-body position-relative">
                  <div class="Myspinner" v-show="spinnerModify">
                    <div
                      class="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                  <h1 class="badge bg-primary h3 my-2">Modifier l'offre</h1>
                  <div class="form theme-form projectcreate">
                    <form v-if="offre_id">
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Nom de l'offre</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="offre_id.nom_offre"
                              placeholder="ex:serveuse,barman,pianiste"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Prime</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model.number="offre_id.salaire"
                              placeholder="ex:35.000 Fcfa"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Payer</label>
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
                        </div>

                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>lieu</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="offre_id.lieu"
                              placeholder="ex:Angré"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Debut</label>
                            <input
                              class="form-control"
                              type="date"
                              v-model="offre_id.debut"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Fin</label>
                            <input
                              class="form-control"
                              type="date"
                              v-model="offre_id.fin"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label>Description</label>
                            <div class="conteneur_editor">
                              <editor v-model="offre_id.description" />
                            </div>
                            <!-- <textarea
                              class="w-100"
                              name="description"
                              id=""
                              cols="100"
                              rows="5"
                              v-model="offre_id.description"
                              placeholder="ex:Besoin d'un barman pour la semaine du 12 au 20."
                            ></textarea> -->
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              class="btn btn-danger me-3"
                              @click.prevent="show_offre_modify"
                            >
                              Annuler
                            </button>
                            <button
                              class="btn btn-secondary"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="ecran_for_delete delete_article"
      v-show="confirmation_for_delete"
    >
      <div class="card p-5">
        <p class="h3 my-2">Voulez-vous vraiment supprimer?</p>
        <div>
          <button class="btn bg-danger" @click="delete_offre">Supprimer</button>
          <button class="btn bg-primary mx-2" @click="not_delete">
            Annuler
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Offres</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="col-sm-12 box-col-12">
      <div class="card timetable">
        <div class="social-tab">
          <ul class="nav nav-tabs" id="top-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#voir_emploi_temps"
                role="tab"
                aria-controls=" voir_emploi_temps"
                aria-selected="true"
                ><em data-feather="clock"></em>Voir mes offres</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-about"
                data-bs-toggle="tab"
                href=" #timetable "
                role="tab"
                aria-controls="timetable"
                aria-selected="false"
                ><em data-feather="alert-circle"></em>Créer une offre
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-content" id="top-tabContent">
      <div
        class="tab-pane fade"
        id="timetable"
        role="tabpanel"
        aria-labelledby="timetable"
      >
        <div class="container-fluid">
          <div class="Myspinner" v-show="spinner">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="create_offre">
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label> Categorie</label>
                            <select v-model="categorie">
                              <option value="" disabled>
                                Sélectionner une catégorie
                              </option>
                              <option
                                :value="item.id"
                                v-for="(item, index) in categories"
                                :key="index"
                              >
                                {{ item.categorie }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Prime</label>
                            <input
                              class="form-control"
                              type="text"
                              v-model="salaire"
                              placeholder="ex:35.000 Fcfa"
                              pattern="[0-9]*"
                            />
                          </div>
                        </div>
                        <div class="col-lg-4" v-if="salaire">
                          <div class="mb-3">
                            <label>Payer</label>
                            <select v-model="pointage">
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
                        </div>

                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>lieu</label>
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
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Début du contrat</label>
                            <input
                              class="form-control"
                              type="date"
                              v-model="debut"
                              required
                              :min="Today"
                            />
                          </div>
                        </div>
                        <div class="col-lg-4" v-if="debut">
                          <div class="mb-3">
                            <label> Fin du contrat</label>
                            <input
                              class="form-control"
                              :class="debut != null ? '' : 'disabled'"
                              type="date"
                              v-model="fin"
                              required
                              :min="debut"
                            />
                          </div>
                        </div>

                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label>Description</label>
                            <div class="conteneur_editor">
                              <editor v-model="description" />
                            </div>
                            <!-- <textarea
                              class="w-100"
                              name="description"
                              id=""
                              cols="100"
                              rows="5"
                              v-model="description"
                              required
                              placeholder="ex:Besoin d'un barman pour la semaine du 12 au 20."
                            ></textarea> -->
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              class="btn btn-secondary me-3"
                              type="submit"
                            >
                              <span
                                class="spinner-border w-20"
                                role="status"
                                v-show="loading"
                              ></span
                              ><span v-show="creer">Créer</span>
                            </button>
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

      <div
        class="tab-pane fade show active"
        id="voir_emploi_temps"
        role="tabpanel"
        aria-labelledby="voir_emploi_temps"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Nom de l'offre</th>
                    <th class="bg-light">Lieu</th>
                    <th class="bg-light">Rémuneration (Fcfa)</th>

                    <th class="bg-light">Fin du contrat</th>

                    <th class="bg-light">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in offres" :key="index">
                    <td>
                      {{ item.nom_offre }}
                      <span
                        v-if="
                          JSON.stringify(
                            new Date().toISOString().substring(0, 10)
                          ) > JSON.stringify(new Date(item.fin))
                        "
                        class="badge bg-danger"
                        >Expirée</span
                      >
                      <span v-else-if="new Date() == new Date(item.fin)"></span>
                    </td>
                    <td>{{ item.lieu }}</td>
                    <td v-if="item.salaire != null">
                      {{ !isNaN(Number(item.salaire)) ? `${moneyFormat.format(item.salaire)} Fcfa`
            : item.salaire }}
            <span v-if="item.pointage">/{{ item.pointage }}</span>
                    </td>
                    <td v-else>pas de prime</td>
                    <td>{{ item.fin ? new Date(item.fin).toLocaleDateString("fr"):'-' }}</td>

                    <td class="details">
                      <em
                        v-if="
                          JSON.stringify(
                            new Date().toISOString().substring(0, 10)
                          ) < JSON.stringify(new Date(item.fin))
                        "
                        class="bi bi-pencil mx-2"
                        @click="show_offre_id(item.id)"
                      ></em>
                      <em
                        class="bi bi-trash"
                        @click="show_box_confirmation_delete(item.id)"
                      ></em>
                      <router-link
                        :to="{
                          name: 'detailsOffreEntreprise',
                          params: { id: item.id },
                        }"
                        ><em class="bi bi-eye"></em>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>
<style scoped>
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
</style>
