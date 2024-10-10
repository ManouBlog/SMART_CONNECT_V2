<script>
import instance from "../../../api/api";
import $ from "jquery";
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
export default {
  name: "see_who_interresse_by_profil_studentView",
  components: {
    HeaderDashboard,
  },
  data() {
    return {
      list_entreprise_contact: [],
      student: null,
      spinner: false,
      lentghOfList_entreprise_contact: "",
      idOffre: "",
      showMsgAcceptoffre: false,
      showMsgRejectoffre: false,
      user: this.$store.state.user,
    };
  },
  methods: {
    get_entreprise_who_contact_student() {
      this.spinner = true;
      instance
        .get("get_who_contact_student")
        .then((res) => {
          console.log(res);
          this.student = res.data;
          console.log("STUDENTS_ENTREPRISES", this.student);
          this.list_entreprise_contact = this.student.entreprises;
          // this.$store.commit("ADD_ITEM",this.student.entreprises)
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
    showIdForAccept(id) {
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
      instance
        .put("changeStatutJob/" + this.idOffre, {
          contrat: 1,
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    rejectJob() {
      instance
        .put("changeStatutJob/" + this.idOffre, {
          contrat: 2,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === true) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            // setTimeout(function () {
            //   //location.reload(true);
            // }, 1500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    seeDetailOffre(idOffre){
      instance
        .put("confirmAlarm/" + idOffre)
        .then((response) => {
          console.log("confirmAlarm",response);
          if (response.data.status === true) {
           this.$store.commit("DECREASE_ALARM")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  created() {
    this.get_entreprise_who_contact_student();
  },
};
</script>
<template>
  <div class="page-body position-relative">

    <HeaderDashboard
    :TitleHeader="'Contrats'"
    :subTitleHeader="'Contrats'"
  />
    <div
      class="tab-content"
      id="top-tabContent"
      
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-12 card py-3 px-2">
            <div class="verfAccept" v-if="showMsgAcceptoffre">
              <div class="msgForAccept">
                <h5>Voulez-vous accepter l'offre ?</h5>
                <button class="btn-lg bg-primary" @click="acceptJob">
                  Accepter
                </button>
                <button class="btn-lg bg-danger mx-2" @click="annuleContrat">
                  Annuler
                </button>
              </div>
            </div>
            <div class="verfAccept" v-if="showMsgRejectoffre">
              <div class="msgForAccept">
                <h5>Voulez-vous rejeter l'offre ?</h5>
                <button class="btn-lg bg-primary" @click="rejectJob">
                  Rejeter
                </button>
                <button class="btn-lg bg-danger mx-2" @click="annuleRejetContrat">
                  Annuler
                </button>
              </div>
            </div>
            <table id="MyTableData" class="table">
              <thead>
                <tr>
                  <th class="bg-light">Nom de l'entreprise</th>
                  <th class="bg-light">Email de l'entreprise</th>
                  <th class="bg-light">Date de l'emploi</th>
                  <th class="bg-light">Statut</th>
                  <th class="bg-light">Action</th>
                  <th class="bg-light">Détails</th>
                </tr>
              </thead>
              <tbody >
                <tr
                  v-for="(item, index) in list_entreprise_contact"
                  :key="index"
                >
                  <td>{{ item.nom }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <span v-if="item.pivot.date_debut !== null"
                      >{{
                        item.pivot.date_debut
                      }}
                      au
                    </span>

                    <span v-if="item.pivot.date_fin !== null">{{
                      item.pivot.date_fin
                    }}</span>
                    <span v-if="item.pivot.date !== null">{{
                      item.pivot.date
                    }}</span>
                  </td>
                  <td>
                    <span v-if="item.pivot.contrat === 1" class="badge bg-info"
                      >accepter</span
                    >
                    <span
                      v-else-if="item.pivot.contrat === 2"
                      class="badge bg-danger"
                      >refuser</span
                    >
                    
                    <span v-else class="badge bg-warning">
                      En attente de reponse
                    </span>
                  </td>
                  <td>
                    <div v-if="item.pivot.contrat === 0">
                      <a
                      href="#"
                      class="text-danger d-block"
                      @click.prevent="rejetJob(item.pivot.id)"
                      >Rejeter</a
                    >
                    <a 
                      href="#"
                      class="text-primary"
                      @click.prevent="showIdForAccept(item.pivot.id)"
                      >Accepter</a
                    >
                    <span
                      class="mx-2"
                      v-if=" item.pivot.contrat === 0 && 
                      (JSON.stringify(new Date().toISOString().substring(0,10)) >=
                       JSON.stringify(new Date(item.pivot.offre.debut).toISOString().slice(0,10)))"
                      >Expirée</span>
                    </div>
                    
                    <em 
                    v-else
                    class="bi bi-dash-circle text-danger"
                  ></em>
                  </td>
                  <td>
                    <em
                      class="bi bi-dash-circle text-danger"
                      v-if="item.pivot.contrat === 0 || item.pivot.contrat === 2"
                    ></em>
                    <router-link
                    @click="seeDetailOffre(item.pivot.id)"
                    :to="{
                      name: 'imprimeLeContrat',
                      params: { id: item.pivot.id },
                    }"
                    v-if="item.pivot.contrat === 1"
                    ><em class="bi bi-eye"></em
                  ></router-link>
                  <span v-if="item.pivot.alarm === 1" class="badge bg-danger mx-3">New</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="spinner">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<style scoped>
.mt-5 {
  margin-top: 101px !important;
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
