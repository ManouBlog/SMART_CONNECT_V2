<script>
import $ from "jquery";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      competence: null,
      competences: null,
      spinner: false,
      loading: false,
      AllCategorie: [],
      selectCategorie: "",
    };
  },
  methods: {
    create_competence() {
      axios
        .post(
          "http://127.0.0.1:8000/api/createCompetence",
          {
            competence: this.competence,
            categorie_id: this.selectCategorie,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          this.get_competences(1);
          this.competence = null;
        });
    },
    get_categorie() {
      axios
        .get("http://127.0.0.1:8000/api/seeCategorie", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.AllCategorie = res.data.data;
          this.selectCategorie = res.data.data[0].id;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    get_competences(isLoading = null) {
      if (!isLoading) {
        this.spinner = true;
      }

      axios
        .get("http://127.0.0.1:8000/api/GetAllCompetences", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.competences = res.data.data;
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
    deleteCompetence(idCompetence) {
      this.spinner = true;
      axios
        .delete(
          "http://127.0.0.1:8000/api/admin/delete_competence/" + idCompetence,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log("TIMETABLE", res);
          alert(res.data.message);
          if (res.data.status) {
            const index = this.categories.findIndex(
              (item) => item.id == idCompetence
            );
            if (index !== -1) {
              this.categories.splice(index, 1);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    handleDeleteCompetences(id) {
      if (confirm("Voulez-vous vraiment supprimer cette compétence ?")) {
        // L'utilisateur a cliqué sur OK
        console.log("Action confirmée", id);
        this.deleteCompetence(id);
      } else {
        // L'utilisateur a cliqué sur Annuler
        console.log("Action annulée");
      }
    },
  },
  created() {
    this.get_competences();
    this.get_categorie();
  },
};
</script>

<template>
  <div class="page-body">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Compétences</li>
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
                aria-controls="voir_emploi_temps"
                aria-selected="true"
                ><i data-feather="clock"></i>Voir les compétences</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-about"
                data-bs-toggle="tab"
                href="#timetable"
                role="tab"
                aria-controls="timetable"
                aria-selected="false"
                ><i data-feather="alert-circle"></i>Créer une compétence
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
                    <form @submit.prevent="create_competence">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3 test-start">
                            <p class="font-bold">Compétence</p>
                            <input
                              class="form-control"
                              type="text"
                              v-model="competence"
                              placeholder="ex:Serveur,Barman,Professeur,Fille de ménage."
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mb-3 test-start">
                            <p class="font-bold">Catégorie</p>
                            <select
                              name="categorie"
                              id="categorie"
                              v-model="selectCategorie"
                            >
                              <option value="" disabled>
                                Séléctionne la catégorie
                              </option>
                              <option
                                :value="item.id"
                                v-for="(item, index) in AllCategorie"
                                :key="index"
                              >
                                {{ item.categorie }}
                              </option>
                            </select>
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
                              ><span>Créer une compétence</span>
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
              <table id="MyTableData" class="table" v-if="competences != null">
                <thead>
                  <tr>
                    <th class="bg-light">Compétence</th>
                    <th class="bg-light">Catégorie</th>
                    <th class="bg-light">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in competences" :key="index">
                    <td>{{ item.competence }}</td>
                    <td>{{ item?.categorie?.categorie }}</td>
                    <td>
                      <div
                        class="d-flex justify-content-center gap-5 align-items-center"
                      >
                        <router-link
                          :to="{
                            name: 'modifications',
                            params: { id: item.id, name: 'competences' },
                          }"
                          ><i class="bi bi-pencil"></i
                        ></router-link>
                        <button
                          class="bg-danger border-0"
                          @click="handleDeleteCompetences(item.id)"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
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
</template>
<style scoped>
.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th {
  text-align: center;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
</style>
