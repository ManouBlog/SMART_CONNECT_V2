<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

export default {
  name: "UserView",
  data() {
    return {
      entreprises: null,
      spinner: false,
      modify_timetable: false,
    };
  },
  methods: {
    alertNummber(entreprise) {
      let count = 0;
      entreprise?.forEach((item) => {
        if (item.view === 1) {
          count = 1;
        }
      });
      return count;
    },
    verifIfAbonnementCurrently(value) {
      let valueAbonnementCurrently = null;
      if (!value) {
        return "Pas d'abonnement";
      }
      value?.forEach((element) => {
        if (element.statut === "success") {
          valueAbonnementCurrently = element;
        }
      });
      return valueAbonnementCurrently?.abonement?.libelle
        ? valueAbonnementCurrently?.abonement?.libelle
        : null;
    },
    async getDetailRoute(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("http://backend.monbrobroli.com/api/updateBadgeEntreprise/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_users", res);
          if (res.data.status) {
            this.$store.commit("UPDATEBADGEENTREPRISE");
            this.$router.push({
              name: "detail_entreprise",
              params: { id: id },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
        });
    },
    seelistEntrepriseAbonne(value){
     console.log("VALUE_LISTENTREPRISE",value)
    }
  },
  mounted() {
    // Destruction des tables DataTable existantes si elles existent
    if ($.fn.DataTable.isDataTable("#MyTableData_entreprise")) {
      $("#MyTableData_entreprise").DataTable().destroy();
    }
    if ($.fn.DataTable.isDataTable("#MyTableData_entreprise2")) {
      $("#MyTableData_entreprise2").DataTable().destroy();
    }

    // Rafraîchissement du DOM avant l'initialisation de DataTables
    this.$nextTick(() => {
      // Initialisation séparée pour chaque table
      $("#MyTableData_entreprise").DataTable({
        pagingType: "full_numbers",
        pageLength: 10,
        processing: true,
        order: [],
        responsive: true, // Ajout du responsive
        language: {
          decimal: "",
          emptyTable: "Aucune donnée disponible dans le tableau",
          info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
          infoEmpty: "Affichage de 0 à 0 sur 0 entrées",
          infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
          lengthMenu: "Afficher _MENU_ entrées",
          loadingRecords: "Chargement...",
          processing: "Traitement...",
          search: "Rechercher :",
          zeroRecords: "Aucun résultat trouvé",
          paginate: {
            first: "Premier",
            last: "Dernier",
            next: "Suivant",
            previous: "Précédent",
          },
        },
      });

      // Si vous avez une deuxième table
      if ($("#MyTableData_entreprise2").length) {
        $("#MyTableData_entreprise2").DataTable({
          pagingType: "full_numbers",
          pageLength: 10,
          processing: true,
          order: [],
          responsive: true,
          language: {
            decimal: "",
            emptyTable: "Aucune donnée disponible dans le tableau",
            info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
            infoEmpty: "Affichage de 0 à 0 sur 0 entrées",
            infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
            lengthMenu: "Afficher _MENU_ entrées",
            loadingRecords: "Chargement...",
            processing: "Traitement...",
            search: "Rechercher :",
            zeroRecords: "Aucun résultat trouvé",
            paginate: {
              first: "Premier",
              last: "Dernier",
              next: "Suivant",
              previous: "Précédent",
            },
          },
        });
      }
    });
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="this.$store.state.spinnerLoading">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="ecran" v-if="modify_timetable">
      <div class="modify_form plan-modify" v-if="timetable_show_id">
        <div class="container">
          <div class="row">
            <div class="col-sm-10 modify-form">
              <div class="card">
                <div class="card-body">
                  <h1 class="badge bg-primary h3">Modifier l'emploi du temps</h1>
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
              <li class="breadcrumb-item">Entreprises</li>
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
              @click.prevent="seelistEntrepriseAbonne(this.$store.state.listEntrepriseAbonnee)"
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#abonnées"
                role="tab"
                aria-controls="abonnées"
                aria-selected="true"
                ><i data-feather="clock"></i>Abonnées
                <span
                  class="badge bg-danger"
                  v-if="alertNummber(this.$store.state.listEntrepriseAbonnee)"
                >
                  {{ alertNummber(this.$store.state.listEntrepriseAbonnee) }}
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#nonAbonnees"
                role="tab"
                aria-controls="nonAbonnees"
                aria-selected="true"
                ><i data-feather="clock"></i>Pas abonnées
                <span
                  class="badge bg-danger"
                  v-if="alertNummber(this.$store.state.listEntreprisePasAbonnee)"
                >
                  {{ alertNummber(this.$store.state.listEntreprisePasAbonnee) }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent">
      <div
        class="tab-pane fade show active"
        id="abonnées"
        role="tabpanel"
        aria-labelledby="abonnées"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData_entreprise" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Entreprise</th>
                    <th class="bg-light">Email</th>
                    <th class="bg-light">Profil</th>
                    <th class="bg-light">Formule d'abonnement</th>
                    <th class="bg-light">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in this.$store.state.listEntrepriseAbonnee"
                    :key="index"
                  >
                    <td>{{ item.nom }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                      <span>{{ item.user.statut.statut }}</span>
                      <!-- <span v-else class="badge bg-info"
                      >pas de registre de commerce</span
                    > -->
                    </td>
                    <td>
                      {{ item?.user?.abonement.length ? this.verifIfAbonnementCurrently(item?.user?.abonement):"Pas d'abonnement" }}
                    </td>

                    <td>
                      <a href="#" @click.prevent="getDetailRoute(item.id)">
                        <i class="bi bi-eye"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane"
        id="nonAbonnees"
        role="tabpanel"
        aria-labelledby="nonAbonnees"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData_entreprise2" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Entreprise</th>
                    <th class="bg-light">Email</th>
                    <th class="bg-light">Profil</th>
                    <th class="bg-light">Formule d'abonnement</th>
                    <th class="bg-light">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in this.$store.state.listEntreprisePasAbonnee"
                    :key="index"
                  >
                    <td>
                      {{ item.nom }}
                      <span class="badge bg-danger" v-if="item.view">New</span>
                    </td>
                    <td>{{ item.email }}</td>
                    <td>
                      <span>{{ item.user.statut.statut }}</span>
                      <!-- <span v-else class="badge bg-info"
                      >pas de registre de commerce</span
                    > -->
                    </td>
                    <td>
                      {{ item?.user?.abonement.length ? this.verifIfAbonnementCurrently(item?.user?.abonement):"Pas d'abonnement" }}
                    </td>

                    <td>
                      <a href="#" @click.prevent="getDetailRoute(item.id)">
                        <i class="bi bi-eye"></i>
                      </a>
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
  <!-- Container-fluid Ends-->
</template>
<style scoped>
.bi {
  font-size: 1.5em !important;
  cursor: pointer;
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
</style>
