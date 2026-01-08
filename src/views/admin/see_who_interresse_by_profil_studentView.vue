<script>
/* eslint-disable */
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  data() {
    return {
      list_entreprise_contact: null,
      student: null,
      spinner: false,
      lentghOfList_entreprise_contact: "",
      idOffre: "",
      showMsgAcceptoffre: false,
      showMsgRejectoffre: false,
    };
  },
  methods: {
    get_entreprise_who_contact_student() {
      this.spinner = true;
      axios
        .get("http://backend.monbrobroli.com/api/get_who_contact_student", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.student = res.data;
          console.log("STUDENTS_ENTREPRISES", this.student);
          this.list_entreprise_contact = this.student.entreprises;
          localStorage.setItem("length", this.list_entreprise_contact.length);
          console.log("LISTS_ENTREPRISES", this.list_entreprise_contact);
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
    showId(id) {
      this.idOffre = id;
      console.log("ID", this.idOffre);
      this.showMsgAcceptoffre = !this.showMsgAcceptoffre;
    },
    annuleContrat() {
      this.idOffre = null;
      console.log("ID", this.idOffre);
      this.showMsgAcceptoffre = !this.showMsgAcceptoffre;
    },
    annuleRejetContrat() {
      this.idOffre = null;
      console.log("ID", this.idOffre);
      this.showMsgRejectoffre = !this.showMsgRejectoffre;
    },
    rejetJob(id) {
      this.idOffre = id;
      console.log("ID", this.idOffre);
      this.showMsgRejectoffre = !this.showMsgRejectoffre;
    },
    acceptJob() {
      axios
        .put(
          "http://backend.monbrobroli.com/api/changeStatutJob/" + this.idOffre,
          {
            contrat: 1,
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
            setTimeout(function () {
              location.reload(true);
            }, 1500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    rejectJob() {
      axios
        .put(
          "http://backend.monbrobroli.com/api/changeStatutJob/" + this.idOffre,
          {
            contrat: 0,
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(function () {
              location.reload(true);
            }, 1500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.get_entreprise_who_contact_student();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Entreprises interressées</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="tab-content" id="top-tabContent" v-if="list_entreprise_contact != null">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 card py-3 px-2">
            <div class="verfAccept" v-if="showMsgAcceptoffre">
              <div class="msgForAccept">
                <h5>Voulez-vous accepter l'offre ?</h5>
                <button class="btn bg-primary" @click="acceptJob">Accepter</button>
                <button class="btn bg-danger mx-2" @click="annuleContrat">Annuler</button>
              </div>
            </div>
            <div class="verfAccept" v-if="showMsgRejectoffre">
              <div class="msgForAccept">
                <h5>Voulez-vous rejeter l'offre ?</h5>
                <button class="btn bg-primary" @click="rejectJob">Rejeter</button>
                <button class="btn bg-danger mx-2" @click="annuleRejetContrat">
                  Annuler
                </button>
              </div>
            </div>
            <table id="MyTableData" class="table">
              <thead>
                <tr>
                  <th class="bg-light">Nom de l'entreprise</th>
                  <th class="bg-light">Email</th>
                  <th class="bg-light">Rendez-vous</th>
                  <th class="bg-light">Statut</th>
                  <th class="bg-light">Action</th>
                  <th class="bg-light">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in list_entreprise_contact" :key="index">
                  <td>{{ item.nom }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <span v-if="item.pivot.date_debut !== null"
                      >{{ new Date(item.pivot.date_debut).toLocaleDateString() }}
                      au
                    </span>

                    <span v-if="item.pivot.date_fin !== null">{{
                      new Date(item.pivot.date_fin).toLocaleDateString()
                    }}</span>
                    <span v-if="item.pivot.date !== null">{{
                      new Date(item.pivot.date).toLocaleDateString()
                    }}</span>
                  </td>
                  <td>
                    <span v-if="item.pivot.contrat === 1" class="badge bg-info"
                      >accepter</span
                    >

                    <span v-else-if="item.pivot.contrat === 0" class="badge bg-danger"
                      >refuser</span
                    >
                    <span v-else class="badge bg-warning"> En attente de reponse </span>
                  </td>
                  <td>
                    <a
                      href="#"
                      class="text-danger d-block"
                      @click.prevent="rejetJob(item.pivot.id)"
                      :class="
                        item.pivot.contrat === 1 || item.pivot.contrat === 0
                          ? 'd-none'
                          : ''
                      "
                      >Rejeter</a
                    >
                    <em
                      class="bi bi-dash-circle text-danger"
                      v-if="item.pivot.contrat === 1 || item.pivot.contrat === 0"
                    ></em>
                    <a
                      href="#"
                      class="text-primary"
                      @click.prevent="showId(item.pivot.id)"
                      :class="
                        item.pivot.contrat === 0 || item.pivot.contrat === 1
                          ? 'd-none'
                          : ''
                      "
                      >Accepter</a
                    >
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'imprimeLeContrat',
                        params: { id: item.id },
                      }"
                      :class="item.pivot.contrat === 0 ? 'd-none' : ''"
                      ><em class="bi bi-eye"></em
                    ></router-link>
                    <em
                      class="bi bi-dash-circle text-danger"
                      v-if="item.pivot.contrat === 0"
                    ></em>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
.verfAccept {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: transparent;
  display: flex;
  place-items: center;
  justify-content: center;
}
.msgForAccept {
  width: auto;
  padding: 1.5em;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.356);
}
</style>
