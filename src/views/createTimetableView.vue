<script>
import instance from "../api/api";
import $ from "jquery";


export default {
  name: "CreateTimetableView",
  data() {
    return {
      jour: "",
      heure_start: null,
      heure_end: null,
      timetables: "",
      spinner: false,
      modify_timetable: false,
      timetable_show_id: null,
      id_timetable_update: null,
      confirmation_for_delete: false,
      id_for_delete: "",
    };
  },
  methods: {
    show_modify() {
      this.modify_timetable = !this.modify_timetable;
      this.id_timetable_update = null;
    },
    update_timetable() {
      instance.put(
          "modify_schedule/" +
            this.id_timetable_update,
          {
            heure_start: this.timetable_show_id.heure_start,
            heure_end: this.timetable_show_id.heure_end,
          }
        )
        .then((res) => {
          console.log(res);
          // Swal.fire({
          //   icon: "success",
          //   title: res.data.message,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          setTimeout(() => {
            this.modify_timetable = false;
            this.id_timetable_update = null;
            // location.reload(true);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_timetable() {
      this.spinner = true;
      instance.get("get_schedule")
        .then((res) => {
          console.log(res);
          this.timetables = res.data.data;
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
  
    create_timetable() {
      instance.post(
          "create_schedule",
          {
            jour: this.jour,
            heure_start: this.heure_start,
            heure_end: this.heure_end,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status == true) {
            // Swal.fire({
            //   icon: "success",
            //   title: res.data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            // // });
            // setTimeout(function () {
            //   location.reload(true);
            // }, 1500);
          }
          if (res.data.status == false) {
            // Swal.fire({
            //   icon: "error",
            //   title: res.data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
          }
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   icon: "error",
          //   title: "Le jour a déjà été pris",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        });
    },
    show_timetable(id) {
      this.modify_timetable = !this.modify_timetable;
      this.id_timetable_update = id;
      this.spinner = true;
      console.log("ID_UPADTE", this.id_timetable_update);
      instance.get("get_schedule")
        .then((res) => {
          console.log(res);
          this.timetable = res.data.data;
          this.timetable_show_id = this.timetable.find(
            (item) => item.id === id
          );
          this.spinner = false;
          console.log("ELEMENT", this.timetable_show_id);
        })
        .catch((err) => {
          console.log(err);
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
    delete_timetable() {
      instance.delete(
          "delete_schedule/" + this.id_for_delete
        )
        .then((res) => {
          console.log(res);
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
          console.log(err);
        });
    },
  },
  created() {
    this.get_timetable();
  },
};
</script>
<template>
  <!-- v-if="this.$store.state.translate === 'Fr'" -->
  <section >
  <div class="Myspinner" v-show="spinner">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
  <div class="page-body position-relative">
    <div
      class="ecran_for_delete delete_article"
      v-show="confirmation_for_delete"
    >
      <div class="card p-5">
        <p class="h3 my-2">Voulez-vous vraiment supprimer?</p>
        <div>
          
          <button class="btn-lg bg-warning" @click="delete_timetable">
            Supprimer
          </button>
          <button class="btn-lg bg-danger mx-2" @click="not_delete">
            Annuler
          </button>
        </div>
      </div>
    </div>
    <div class="ecran" v-if="modify_timetable">
      <div class="modify_form plan-modify" v-if="timetable_show_id">
        <div class="container">
          <div class="row">
            <div class="col-sm-10 modify-form">
              <div class="card">
                <div class="card-body">
                  <h1 class="badge bg-warning h3">
                    Modifier l'emploi du temps
                  </h1>
                  <div class="form theme-form projectcreate p-5">
                    <form>
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Choisir un jour</label>
                            <select
                              class="form-select"
                              v-model="timetable_show_id.jour"
                              required
                              disabled
                            >
                              <option value="lundi">lundi</option>
                              <option value="mardi">Mardi</option>
                              <option value="mercredi">Mercredi</option>
                              <option value="jeudi">Jeudi</option>
                              <option value="vendredi">Vendredi</option>
                              <option value="samedi">Samedi</option>
                              <option value="dimanche">Dimanche</option>
                            </select>
                          </div>
                          <span class="text-danger"
                            >nb:le jour ne peut pas être modifier</span
                          >
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="timetable_show_id.heure_start"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="timetable_show_id.heure_end"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              class="btn btn-danger me-3"
                              @click.prevent="show_modify"
                            >
                              Annuler
                            </button>
                            <button
                              @click.prevent="update_timetable"
                              class="btn btn-secondary"
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

    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Emploi du temps</li>
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
                href="#timetable"
                role="tab"
                aria-controls="timetable"
                aria-selected="true"
                ><i data-feather="clock"></i>Créer un emploi du temps</a
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
                ><i data-feather="alert-circle"></i>Voir mon emploi du temps
              </a>
            </li>
            <!-- <li class="nav-item">
              <a
                class="nav-link"
                id="top-friends"
                data-bs-toggle="tab"
                href="#friends"
                role="tab"
                aria-controls="friends"
                aria-selected="false"
                ><i data-feather="users"></i>Friends</a
              >
            </li> -->
            <!-- <li class="nav-item">
              <a
                class="nav-link"
                id="top-photos"
                data-bs-toggle="tab"
                href="#photos"
                role="tab"
                aria-controls="photos"
                aria-selected="false"
                ><i data-feather="image"></i>Photos</a
              >
            </li> -->
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
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="create_timetable">
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Choisir un jour</label>
                            <select class="form-select" v-model="jour" required>
                              <option value="lundi">lundi</option>
                              <option value="mardi">Mardi</option>
                              <option value="mercredi">Mecredi</option>
                              <option value="jeudi">Jeudi</option>
                              <option value="vendredi">Vendredi</option>
                              <option value="samedi">Samedi</option>
                              <option value="dimanche">Dimanche</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="heure_start"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="heure_end"
                              required
                            />
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
                              Créer
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
                    <th class="bg-light">Jours</th>
                    <th class="bg-light">Heure de début</th>
                    <th class="bg-light">Heure de fin</th>
                    <th class="bg-light">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in this.timetables" :key="index">
                    <td>{{ item.jour }}</td>
                    <td>{{ item.heure_start }}</td>
                    <td>{{ item.heure_end }}</td>
                    <td
                      class="d-flex justify-content-center align-items-center"
                    >
                      <i
                        class="bi bi-pencil"
                        @click="show_timetable(item.id)"
                      ></i>
                      <i
                        class="bi bi-trash"
                        @click="show_box_confirmation_delete(item.id)"
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
    <!-- Container-fluid Ends-->
  </div>
</section>
  <!-- <section v-if="this.$store.state.translate === 'EN'">

  </section> -->
</template>
<style scoped>
h3 {
  text-transform: none !important;
}
label {
  text-align: left !important;
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
