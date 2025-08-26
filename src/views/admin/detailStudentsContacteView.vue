<script>
/* eslint-disable */
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "detailStudentsContacteView",
  data() {
    return {
      list_students: null,
      student: null,
      spinner: false,
      detailsStudents: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      timetables: null,
      MyTime: "",
      myJour: "",
      appreciationService: true,
      notationService: "",
      avis: "",
      user: this.$store.state.user,
    };
  },
  methods: {
    get_students_contact() {
      //this.spinner = false;
      axios
        .get("https://backend.smart-connect.online/api/list_students_contact_by_entreprise", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.list_students = res.data.data;
          console.log("LIST", this.list_students);
          this.student = this.list_students.students;
          this.student.find((item) => {
            if (
              item.nom === this.$route.params.name &&
              item.pivot.created_at === this.$route.params.date
            ) {
              this.detailsStudents = item;
            }
          });
          this.detailsStudents.etoiles.forEach((item) => {
            if (item.entreprise_id === this.user.id) {
              this.appreciationService = false;
            }
          });
          console.log("ETOILES", this.detailsStudents.etoiles);

          console.log("DETAILSETUDIANT", this.detailsStudents);
          console.log("STUDENTS", this.student);
          //this.spinner = false;
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
    get_all_timetables() {
      this.spinner = true;
      axios
        .get("https://backend.smart-connect.online/api/list_emplois_temps")
        .then((res) => {
          console.log(res);
          this.timetables = res.data.data;
          console.log("timetables", this.timetables);
          this.MyTime = this.timetables.find(
            (item) => item.nom == this.$route.params.name
          );

          this.myJour = this.MyTime.jours;

          console.log("MyJour", this.myJour);
          this.spinner = false;

          // this.appreciationService = !this.appreciationService;

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
    chooseVeryBad() {
      this.notationService = 1;
    },
    chooseAcceptable() {
      this.notationService = 3;
    },
    chooseBad() {
      this.notationService = 2;
    },
    chooseBon() {
      this.notationService = 4;
    },
    chooseExcellent() {
      this.notationService = 5;
    },
    sendAppreciation() {
      console.log("NOTATION", this.detailsStudents.id);
      axios
        .post(
          "https://backend.smart-connect.online/api/giveAvis",
          {
            notes: this.notationService,
            student_id: this.detailsStudents.id,
            avis: this.avis,
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
            setTimeout(() => {
              this.appreciationService = false;
            }, 1500);
          }
        });
    },
  },
  created() {
    this.get_students_contact();
    this.get_all_timetables();
    // console.log("COMPTE", this.$store.state.compte);
  },
};
</script>

<template>
  <div class="notation_service" v-if="appreciationService">
    <div class="rate_with_impression p-5">
      <em
        class="bi bi-x btn_close_appreciation"
        @click="appreciationService = !appreciationService"
      ></em>
      <h1>Votre appréciation</h1>
      <div class="star">
        <h6 class="text-left">
          Comment avez-vous trouver le service du personnel ?
        </h6>
        <div class="emoticon">
          <span>
            <em
              :class="notationService === 1 ? 'bgRed' : ''"
              class="bi bi-emoji-frown-fill"
              @click.prevent="chooseVeryBad"
            ></em>
            <strong>Très mauvais</strong>
          </span>
          <span>
            <em
              :class="notationService === 2 ? 'bgOrange' : ''"
              class="bi bi-emoji-neutral-fill"
              @click.prevent="chooseBad"
            ></em>
            <strong>Mauvais</strong>
          </span>
          <span>
            <em
              :class="notationService === 3 ? 'bgPassable' : ''"
              class="bi bi-emoji-smile-fill"
              @click.prevent="chooseAcceptable"
            ></em>
            <strong>Acceptable</strong>
          </span>
          <span>
            <em
              :class="notationService === 4 ? 'bgYellow' : ''"
              class="bi bi-emoji-laughing-fill"
              @click.prevent="chooseBon"
            ></em>
            <strong>Bon</strong>
          </span>
          <span>
            <em
              :class="notationService === 5 ? 'bgExcellent' : ''"
              class="bi bi-emoji-heart-eyes-fill"
              @click.prevent="chooseExcellent"
            ></em>
            <strong>Excellent</strong>
          </span>
        </div>
      </div>
      <div class="commentaire" v-if="notationService >= 3">
        <h6 class="text-left">Avez-vous des commentaires ?</h6>
        <textarea
          name=""
          id=""
          cols="10"
          rows="10"
          class="w-75"
          v-model="avis"
        ></textarea>
      </div>
      <div>
        <button class="btn bg-primary" @click="sendAppreciation">
          Envoyer
        </button>
        <button
          class="btn bg-danger mx-2"
          @click="appreciationService = !appreciationService"
        >
          Plus tard
        </button>
      </div>
    </div>
  </div>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <i class="bi bi-arrow-left-circle" @click="$router.go(-1)"></i>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3>Créer un emploi du temps</h3> -->
          </div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Etudiant contacté / Détails</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="detailsStudents != null">
      <div class="details_entreprise card py-5 px-3">
        <h1 class="badge bg-primary w-25">Personnel</h1>
        <h4>Nom :{{ detailsStudents.nom }}</h4>
        <h4>Prénoms :{{ detailsStudents.prenoms }}</h4>
        <h4>Email :{{ detailsStudents.email }}</h4>
        <h4>Ville :{{ detailsStudents.ville }}</h4>
        <h4>Quartier :{{ detailsStudents.quartier }}</h4>
        <h4>commune :{{ detailsStudents.commune }}</h4>
        <h4>Télephone :{{ detailsStudents.phone }}</h4>
        <h4>Diplome :{{ detailsStudents.diplome }}</h4>
        <h1 class="badge bg-dark w-25">Compétences</h1>
        <div
          v-for="(competence, index) in detailsStudents.competences"
          :key="index"
        >
          <strong>- {{ competence.competence }}</strong>
        </div>
        <h1 class="badge bg-warning w-75 h3 mx-auto p-2">Emploi du temps</h1>
        <div v-for="(item, index) in myJour" :key="index">
          <h1 class="badge bg-primary w-25">Jour : {{ item.jour }}</h1>
          <h4>Premiere plage horaire : {{ item.First_horaire }}</h4>
          <h4 v-if="item.Second_horaire != null">
            Seconde plage horaire : {{ item.Second_horaire }}
          </h4>
          <h4 v-else></h4>
        </div>

        <div class="jourContrat">
          <h1 class="badge bg-primary w-25">Jour</h1>
          <br />
          <div
            v-if="
              detailsStudents.pivot.date_debut != null &&
              detailsStudents.pivot.date_fin != null
            "
          >
            <strong>{{
              new Date(detailsStudents.pivot.date_debut).toLocaleDateString(
                "fr"
              )
            }}</strong>
            au
            <strong>{{
              new Date(detailsStudents.pivot.date_fin).toLocaleDateString("fr")
            }}</strong>
          </div>
          <div v-else>
            <strong>{{
              new Date(detailsStudents.pivot.date).toLocaleDateString()
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bgExcellent {
  color: rgb(243, 174, 0) !important;
}
.bgRed {
  color: rgba(245, 2, 2, 0.792) !important;
}
.bgPassable {
  color: rgb(243, 174, 0) !important;
}
.bgYellow {
  color: rgb(243, 174, 0) !important;
}
.bgOrange {
  color: rgb(255, 94, 0) !important;
}
.emoticon {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1em;
}
.emoticon span em {
  font-size: 2.5em !important;
  color: gray;
  margin: 0 0.5em;
}
.emoticon span strong {
  font-size: 0.8em;
}
.emoticon span {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.notation_service {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(255, 255, 255, 0.151);
  display: flex;
  place-items: center;
  justify-content: center;
}
.btn_close_appreciation {
  font-size: 1.5em;
  width: 30px;
  height: 30px;
  background: gray;
  border-radius: 100%;
  color: white;
  position: absolute;
  top: 1em;
  right: 1em;
  cursor: pointer;
}
.rate_with_impression {
  width: 50%;
  height: auto !important;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.272);
  background: white;
  position: relative;
}
.bi-arrow-left-circle {
  cursor: pointer;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.body-card {
  background: transparent;
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
.details_entreprise {
  text-align: left;
}
.details_entreprise span {
  color: gray;
}
.w-25 {
  width: 100px !important;
}
.jourContrat {
  position: absolute;
  right: 2em;
  top: 1em;
}
</style>
