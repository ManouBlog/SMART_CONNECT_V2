<script>
/* eslint-disable */
import $ from "jquery";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      afficheData: [],
      allAffiches: [],
      categories: null,
      spinner: true,
      loading: false,
      lienAffiche:null,
      appareal:'pc',
    };
  },
  methods: {
    async create_publicite() {
        this.spinner = true;
      const formData = new FormData();
      this.afficheData.forEach((affiche) => {
        formData.append("affiche[]", affiche);
      });
      formData.append('lien',this.lienAffiche);
      formData.append('appareil',this.appareal);
      await axios
        .post("https://backend.monbrobroli.com/api/admin/addAffiche", formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status == true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
          if (res.data.status == false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          alert(error);
          // console.log(error);
        })
        .finally(() => {
          this.get_publicite(1);
          this.spinner = false;
          this.lienAffiche = null;
        });
    },
    get_publicite(isLoading = null) {
      if (isLoading === 1) {
        this.spinner = false;
      }
      axios
        .get("https://backend.monbrobroli.com/api/showAffiche", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          this.allAffiches = res.data.data;
          console.log("AFFICHES ALL", this.allAffiches);
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
        })
        .finally(() => {
          this.spinner = false;
        });
    },
    deletePublicite(idPublicite) {
      this.spinner = true;
      axios
        .delete("https://backend.monbrobroli.com/api/admin/delete_pub/" + idPublicite, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          alert(res.data.message);
          if (res.data.status) {
            const index = this.allAffiches.findIndex((item) => item.id == idPublicite);
            if (index !== -1) {
              this.allAffiches.splice(index, 1);
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
    handleDeletePublicite(id) {
      if (confirm("Voulez-vous vraiment supprimer cette affiche ?")) {
        // L'utilisateur a cliqué sur OK
        console.log("Action confirmée", id);
        this.deletePublicite(id);
      } else {
        // L'utilisateur a cliqué sur Annuler
        console.log("Action annulée");
      }
    },
    handleFile(e) {
      console.log("This.afficheData", e.target.files);
      this.afficheData = e.target.files;
    },
  },
  created() {
    this.get_publicite();
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
              <li class="breadcrumb-item">Publicité</li>
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
                ><i data-feather="clock"></i>Voir les affiches</a
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
                ><i data-feather="alert-circle"></i>Ajouter une affiche
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
                    <form @submit.prevent="create_publicite">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1.5em">Ajouter une Affiche</p>

                            <input
                              class="form-control"
                              type="file"
                              @change="handleFile"
                              accept="image/*"
                              multiple
                              required
                            />
                          </div>
                        </div>
                          <div class="col-lg-6">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1.5em">Ajouter un lien</p>
                            <input
                              class="form-control"
                              type="text"
                              v-model="lienAffiche"
                              required
                            />
                          </div>
                        </div>
                         <div class="col-lg-6">
                          <div class="mb-3 text-start font-bold">
                            <p style="font-weight: bold; font-size: 1.5em">Séléctionne l'appareil</p>
                            <select name="appareal" id="appareal"
                            v-model="appareal"
                            style="width:100%"
                            >
                          <option value="mobile">Mobile</option>
                          <option value="pc">PC</option>
                          </select>
                          </div>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              :disabled="!afficheData.length"
                              class="btn btn-primary me-3"
                              type="submit"
                            >
                              <span
                                class="spinner-border w-20"
                                role="status"
                                v-show="loading"
                              ></span
                              ><span>Enregistrer une affiche</span>
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
                    <th class="bg-light">Affiches</th>
                     <th class="bg-light">Lien</th>
                    <th class="bg-light">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in allAffiches" :key="index">
                    <td>
                      <n-image
                        width="100"
                        :src="'https://backend.monbrobroli.com/storage/images/'+item.affiche"
                      />
                    </td>
                    <td>
                      {{ item.lien ? item.lien:'Pas de lien'}}
                    </td>
                    <td>
                      <div class="d-flex justify-content-center gap-5 align-items-center">
                        <!-- <router-link
                          :to="{
                            name: 'modifications',
                            params: { id: item.id, name: 'categorie' },
                          }"
                          ><i class="bi bi-pencil"></i
                        ></router-link> -->
                        <button
                          class="bg-danger border-0"
                          @click="handleDeletePublicite(item.id)"
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
