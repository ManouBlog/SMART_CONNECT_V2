<script>
import $ from "jquery";
import instance from "../api/api";
// import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import Swal from "sweetalert2";
export default {
  name: "OffresView",
  data() {
    return {
      offre: null,
      salaire: null,
      ville: null,
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
    };
  },
  methods: {
    show_offre_modify() {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = "";
    },
    update_offre() {
      instance
        .put("modify_offre_entreprise/" + this.id_offre_update, {
          nom_offre: this.offre_id.nom_offre,
          description: this.offre_id.description,
          debut: this.offre_id.debut,
          fin: this.offre_id.fin,
          salaire: this.offre_id.salaire,
          ville: this.offre_id.ville,
        })
        .then((res) => {
          // console.log(res);
          if(res.data.status){
         this.modify_offre = false;
          this.id_offre_update = "";
          }
         
          // Swal.fire({
          //   icon: "success",
          //   title: res.data.message,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        })
        .catch((err) => {
          // console.log("MSG ERROR", err);
          alert(JSON.stringify(err,null,2))
          Swal.fire({
            icon: "info",
            title: err.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    get_offres() {
      this.spinner = true;
      instance
        .get("get_offres_entreprise")
        .then((res) => {
          // console.log("TIMETABLE", res);
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
          alert(JSON.stringify(err,null,2))
        });
    },
    show_offre_id(id) {
      this.modify_offre = !this.modify_offre;
      this.id_offre_update = id;
      // console.log("ID", this.id_offre_update);

      instance
        .get("get_offres_entreprise")
        .then((res) => {
          // console.log(res);
          this.offres = res.data.data;
          this.offre_id = this.offres.find((offre) => offre.offres_id === id);
          // console.log("OFFRE_ID", this.offre_id);
        })
        .catch((err) => {
          alert(JSON.stringify(err,null,2))
        });
    },
    create_offre() {
      this.loading = true;
      this.creer = false;
      // console.log("ville", this.ville);
      instance
        .post("create_offre", {
          nom_offre: this.offre,
          salaire: this.salaire,
          description: this.description,
          debut: this.debut,
          fin: this.fin,
          ville: this.ville,
        })
        .then((res) => {
          this.spinner = true;
          this.loading = false;
          // console.log(res);
          if (res.data.status == true) {
            // Swal.fire({
            //   icon: "success",
            //   title: res.data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
            this.spinner = false;

            this.creer = true;
            //setTimeout(() => {
            //location.reload(true);
            //}, 1500);
          }
        })
        .catch((error) => {
          alert(JSON.stringify(error,null,2))
          // console.log(res);
          // Swal.fire({
          //   icon: "error",
          //   title: res.data.message,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
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
      instance
        .delete("delete_offre_entreprise/" + this.id_for_delete)
        .then((res) => {
          // console.log(res);
          if (res.data.status == true) {
            // Swal.fire({
            //   icon: "success",
            //   title: res.data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
            this.confirmation_for_delete = !this.confirmation_for_delete;
            // setTimeout(function () {
            //   location.reload(true);
            // }, 1500);
          }
        })
        .catch((err) => {
          // console.log("MSAERROR",err);
          Swal.fire({
              icon: "success",
              title: err.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
        });
    },
  },
  created() {
    this.get_offres();
  },
};
</script>
<template>
  <section v-if="this.$store.state.translate === 'FR'">
    <div class="page-body position-relative">
      <div class="ecran" v-if="modify_offre">
        <div class="modify_form plan-modify">
          <div class="container">
            <div class="row">
              <div class="col-sm-10 modify-form">
                <div class="card">
                  <div class="card-body">
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
                              <label>salaire</label>
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
                              <label>lieu</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="offre_id.ville"
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
                          <div class="col-lg-8">
                            <div class="mb-3">
                              <label>Description</label>
                              <textarea
                                class="w-100"
                                name="description"
                                id=""
                                cols="100"
                                rows="5"
                                v-model="offre_id.description"
                                placeholder="ex:Besoin d'un barman pour la semaine du 12 au 20."
                              ></textarea>
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

      <div class="ecran_for_delete delete_article" v-show="confirmation_for_delete">
        <div class="card p-5">
          <p class="h3 my-2" style="color:black;">Voulez-vous vraiment supprimer?</p>
          <div>
            <button class="btn-lg bg-warning" @click="delete_offre">Supprimer</button>
            <button class="btn-lg bg-danger mx-2" @click="not_delete">Annuler</button>
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

      <div class="col-sm-12 box-col-12">
        <div class="card timetable">
          <div class="social-tab">
            <ul class="nav nav-tabs" id="top-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="top-timeline"
                  data-bs-toggle="tab"
                  href="#timetable"
                  role="tab"
                  aria-controls="timetable"
                  aria-selected="true"
                  ><i data-feather="clock"></i>Créer une offre</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="top-about"
                  data-bs-toggle="tab"
                  href="#voir_emploi_temps"
                  role="tab"
                  aria-controls="voir_emploi_temps"
                  aria-selected="false"
                  ><i data-feather="alert-circle"></i>Voir mes offres
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-content" id="top-tabContent">
        <div
          class="tab-pane fade show active"
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
                              <label>Nom de l'offre</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="offre"
                                placeholder="ex:serveuse,barman,pianiste"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Salaire</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="salaire"
                                placeholder="ex:35.000 Fcfa"
                                pattern="[0-9]*"
                                required
                              />
                            </div>
                          </div>

                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Lieu</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="ville"
                                placeholder="ex:Angré"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Date et heure début </label>
                              <input
                                class="form-control"
                                type="date"
                                v-model="debut"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label> Date et heure fin </label>
                              <input
                                class="form-control"
                                type="date"
                                v-model="fin"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Description</label>

                              <textarea
                                class="w-100"
                                name="description"
                                id=""
                                cols="100"
                                rows="5"
                                v-model="description"
                                required
                                placeholder="ex:Besoin d'un barman pour la semaine du 12 au 20."
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="text-end">
                              <button class="btn btn-secondary me-3" type="submit">
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
          class="tab-pane fade"
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
                      <th class="bg-light">Salaire</th>
                      <th class="bg-light">Date et heure début du contrat</th>
                      <th class="bg-light">Date et heure fin du contrat</th>
                      <th class="bg-light">Description</th>
                      <th class="bg-light">Détails</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in offres" :key="index">
                      <td>{{ item.nom_offre }}</td>
                      <td>{{ item.ville }}</td>
                      <td>{{ moneyFormat.format(item.salaire) }} Fcfa</td>
                      <td>{{ item.debut }}</td>
                      <td>{{ item.fin }}</td>
                      <td>{{ item.description }}</td>
                      <td class="d-flex justify-content-center align-items-center">
                        <i
                          class="bi bi-pencil mx-2"
                          @click="show_offre_id(item.offres_id)"
                        ></i>
                        <i
                          class="bi bi-trash"
                          @click="show_box_confirmation_delete(item.offres_id)"
                        ></i>
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
  </section>
  <section v-if="this.$store.state.translate === 'EN'">
    <div class="page-body position-relative">
      <div class="ecran" v-if="modify_offre">
        <div class="modify_form plan-modify">
          <div class="container">
            <div class="row">
              <div class="col-sm-10 modify-form">
                <div class="card">
                  <div class="card-body">
                    <h1 class="badge bg-primary h3 my-2">Edit offer</h1>
                    <div class="form theme-form projectcreate">
                      <form v-if="offre_id">
                        <div class="row">
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Offer name</label>
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
                              <label>Honorary</label>
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
                              <label>City</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="offre_id.ville"
                                placeholder="ex:Angré"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Start</label>
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
                              <label>End</label>
                              <input
                                class="form-control"
                                type="date"
                                v-model="offre_id.fin"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-8">
                            <div class="mb-3">
                              <label>Description</label>
                              <textarea
                                class="w-100"
                                name="description"
                                id=""
                                cols="100"
                                rows="5"
                                v-model="offre_id.description"
                              ></textarea>
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
                                Cancel
                              </button>
                              <button
                                class="btn btn-secondary"
                                @click.prevent="update_offre"
                              >
                                Edit
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

      <div class="ecran_for_delete delete_article" v-show="confirmation_for_delete">
        <div class="card p-5">
          <p class="h3 my-2">Are you sure you want to delete ?</p>
          <div>
            <button class="btn-lg bg-warning" @click="delete_offre">Delete</button>
            <button class="btn-lg bg-danger mx-2" @click="not_delete">Cancel</button>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="page-title">
          <div class="row">
            <div class="col-12 col-sm-6"></div>
            <div class="col-12 col-sm-6">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Offers</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 box-col-12">
        <div class="card timetable">
          <div class="social-tab">
            <ul class="nav nav-tabs" id="top-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="top-timeline"
                  data-bs-toggle="tab"
                  href="#timetable"
                  role="tab"
                  aria-controls="timetable"
                  aria-selected="true"
                  ><i data-feather="clock"></i>Create an offer</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="top-about"
                  data-bs-toggle="tab"
                  href="#voir_emploi_temps"
                  role="tab"
                  aria-controls="voir_emploi_temps"
                  aria-selected="false"
                  ><i data-feather="alert-circle"></i>See my offers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-content" id="top-tabContent">
        <div
          class="tab-pane fade show active"
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
                              <label>Offer name</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="offre"
                                placeholder="ex:serveuse,barman,pianiste"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Honorary</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="salaire"
                                pattern="[0-9]*"
                                required
                              />
                            </div>
                          </div>

                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>City</label>
                              <input
                                class="form-control"
                                type="text"
                                v-model="ville"
                                placeholder="ex:Angré"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Start date and time </label>
                              <input
                                class="form-control"
                                type="date"
                                v-model="debut"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label> End date and time </label>
                              <input
                                class="form-control"
                                type="date"
                                v-model="fin"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="mb-3">
                              <label>Description</label>

                              <textarea
                                class="w-100"
                                name="description"
                                id=""
                                cols="100"
                                rows="5"
                                v-model="description"
                                required
                                placeholder="ex:Besoin d'un barman pour la semaine du 12 au 20."
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="text-end">
                              <button class="btn btn-secondary me-3" type="submit">
                                <span
                                  class="spinner-border w-20"
                                  role="status"
                                  v-show="loading"
                                ></span
                                ><span v-show="creer">Create</span>
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
          class="tab-pane fade"
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
                      <th class="bg-light">Offer name</th>
                      <th class="bg-light">City</th>
                      <th class="bg-light">Honorary</th>
                      <th class="bg-light">Date and time of start</th>
                      <th class="bg-light">Date and time of end</th>
                      <th class="bg-light">Description</th>
                      <th class="bg-light">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in offres" :key="index">
                      <td>{{ item.nom_offre }}</td>
                      <td>{{ item.ville }}</td>
                      <td>{{ moneyFormat.format(item.salaire) }} Fcfa</td>
                      <td>{{ item.debut }}</td>
                      <td>{{ item.fin }}</td>
                      <td>{{ item.description }}</td>
                      <td class="d-flex justify-content-center align-items-center">
                        <i
                          class="bi bi-pencil mx-2"
                          @click="show_offre_id(item.offres_id)"
                        ></i>
                        <i
                          class="bi bi-trash"
                          @click="show_box_confirmation_delete(item.offres_id)"
                        ></i>
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
  </section>
</template>
<style scoped>
label {
  font-weight: bold;
}
.btn-secondary {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
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
  background: rgba(255, 255, 255, 0.625);
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
