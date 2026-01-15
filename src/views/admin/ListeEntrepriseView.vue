<script>
/* eslint-disable */
import axios from "axios";

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
     get_users() {
      this.$store.dispatch("get_users");
    },
    seeNbreBadge(entreprise) {
      return entreprise?.filter((item) => item.view === 1).length || 0;
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
    async getDetailCompanyNotSuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeEntreprise/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_COMPANY_NOT_SUSCRIBE");
            this.$router.push({
              name: "detail_entreprise",
              params: { id: id },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
          this.get_users()
        });
    },
     async getDetailCompanySuscribe(id) {
      this.$store.commit("TOOGLESPINNER", true);
      await axios
        .put("https://backend.monbrobroli.com/api/updateBadgeEntreprise/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_detail_users", res);
          if (res.data.status) {
            this.$store.commit("DECREMENT_COMPANY_NOT_SUSCRIBE");
            this.$router.push({
              name: "detail_entreprise",
              params: { id: id },
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$store.state.user = null;
            this.$store.state.token = null;
          alert(err.response.data.message);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
          this.get_users()
        });
    },
    
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
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
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
                  v-if="this.$store.state.nbreBdageEntrepriseAbonnee > 0"
                >
                  {{ this.$store.state.nbreBdageEntrepriseAbonnee }}
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
                  v-if="this.$store.state.nbreBdageEntreprisePasAbonnee > 0 "
                >
                  {{ this.$store.state.nbreBdageEntreprisePasAbonnee }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
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
                    <th class="bg-light">Date d'enregistrement</th>
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
                    <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}</td>
                    <td>{{ item.nom }}
                      <span class="badge bg-danger" v-if="item.view == 1">New</span>
                    </td>
                    <td>{{ item.email }}</td>
                    <td>
                      <span>{{ item.user.statut.statut }}</span>
                      
                    </td>
                    <td>
                      {{
                        item?.user?.abonement.length
                          ? this.verifIfAbonnementCurrently(item?.user?.abonement)
                          : "Pas d'abonnement"
                      }}
                    </td>

                    <td>
                      <a href="#" @click.prevent="getDetailCompanySuscribe(item.id)">
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
                    <th class="bg-light">Date d'enregistrement</th>
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
                    <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}</td>
                    <td>
                      {{ item.nom }}
                      <span class="badge bg-danger" v-if="item.view == 1">New</span>
                    </td>
                    <td>{{ item.email }}</td>
                    <td>
                      <span>{{ item.user.statut.statut }}</span>
                    </td>
                    <td>
                      {{
                        item?.user?.abonement.length
                          ? this.verifIfAbonnementCurrently(item?.user?.abonement)
                          : "Pas d'abonnement"
                      }}
                    </td>

                    <td>
                      <a href="#" @click.prevent="getDetailCompanyNotSuscribe(item.id)">
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
