<script>
import $ from "jquery";
import axios from "axios";
import Editor from "@/components/text-editor.vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Swal from "sweetalert2";
export default {
  name: "HistoriqueAbonnement",
  components: {
    Editor,
  },
  data() {
    return {
      competence: null,
      abonnements: null,
      spinner: false,
      loading: false,
      AllCategorie: [],
      selectCategorie: "",
      data: {
        categorie_id: "",
        libelle: "",
        periode: "",
        prix: "",
        description: "",
      },
    };
  },
  methods: {
    handleDescription(e) {
      this.data.description = e;
    },
    create_abonnement() {
      axios
        .post("http://127.0.0.1:8000/api/create-abonnement", this.data, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
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
        });
    },
    get_categorie() {
      axios
        .get("http://127.0.0.1:8000/api/getCategorie", {
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
    get_abonnements(isLoading = null) {
      if (!isLoading) {
        this.spinner = true;
      }

      axios
        .get("http://127.0.0.1:8000/api/getAbonnement", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.abonnements = res.data.data;
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
            const index = this.abonnements.findIndex(
              (item) => item.id == idCompetence
            );
            if (index !== -1) {
              this.abonnements.splice(index, 1);
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
    handleDeleteabonnements(id) {
      if (confirm("Voulez-vous vraiment supprimer cet abonnement ?")) {
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
    this.get_abonnements();
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
              <li class="breadcrumb-item">Abonnements</li>
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
                href="#abonnements"
                role="tab"
                aria-controls="abonnements"
                aria-selected="true"
                ><i data-feather="clock"></i>Abonnements</a
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
                ><i data-feather="alert-circle"></i>Créer un abonnement
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
                    <form @submit.prevent="create_abonnement">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3 test-start">
                            <p class="font-bold">Libellé</p>
                            <input
                              class="form-control"
                              type="text"
                              v-model="data.libelle"
                              placeholder="ex:STANDARD"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mb-3 test-start">
                            <p class="font-bold">Période</p>
                            <input
                              class="form-control"
                              type="number"
                              v-model="data.periode"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mb-3 test-start">
                            <p class="font-bold">Prix (Fcfa)</p>
                            <input
                              class="form-control"
                              type="number"
                              v-model="data.prix"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mb-3 test-start">
                            <p class="font-bold">Catégorie</p>
                            <select
                              class="w-100"
                              name="categorie"
                              id="categorie"
                              v-model="data.categorie_id"
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
                        <div class="col-lg-12">
                          <div class="mb-3 test-start">
                            <p class="font-bold">Description</p>
                            <editor
                              @update:modelValue="handleDescription"
                              :modelValue="data.description"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button class="btn btn-primary me-3" type="submit">
                              <span
                                class="spinner-border w-20"
                                role="status"
                                v-show="loading"
                              ></span
                              ><span>Créer un abonnement</span>
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
        id="abonnements"
        role="tabpanel"
        aria-labelledby="abonnements"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table" v-if="abonnements != null">
                <thead>
                  <tr>
                    <th class="bg-light">Catégorie</th>
                    <th class="bg-light">Libelle</th>
                    <th class="bg-light">Période (année)</th>
                    <th class="bg-light">Prix (Fcfa)</th>
                    <th class="bg-light">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in abonnements" :key="index">
                    <td>{{ item.categorie.categorie }}</td>
                    <td>{{ item.libelle }}</td>
                    <td>{{ item.periode }}</td>
                    <td>{{ item?.prix }}</td>
                    <td>
                      <div
                        class="d-flex justify-content-center gap-5 align-items-center"
                      >
                        <router-link
                          style="font-size: 1.2em"
                          :to="{
                            name: 'detail_abonnement',
                            params: { id: item.id },
                          }"
                          ><i class="bi bi-eye"></i
                        ></router-link>
                        <button
                          class="bg-danger border-0"
                          @click="handleDeleteabonnements(item.id)"
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
.font-bold {
  font-size: 1.2em !important;
  font-weight: 900 !important;
}
</style>
