<script>
/* eslint-disable */
import axios from "axios";
// import Swal from "sweetalert2";

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
    verifIfAbonnementCurrently(value) {
      let valueAbonnementCurrently = null;
      if (!value.length) {
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
        .put("https://backend.smart-connect.online/api/updateBadgeEntreprise/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("get_users", res);
          if (res.data.status) {
            this.$store.commit('UPDATEBADGEENTREPRISE')
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
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 card py-3 px-2">
            <table id="MyTableData" class="table">
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
                  v-for="(item, index) in this.$store.state.listEntreprise"
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
                    {{ this.verifIfAbonnementCurrently(item?.user?.abonement) }}
                  </td>

                  <td class="d-flex justify-content-center align-items-center">
                    <!-- <router-link
                      :to="{
                        name: 'detail_entreprise',
                        params: { id: item.id },
                      }"
                      ><i class="bi bi-eye"></i
                    ></router-link> -->
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
