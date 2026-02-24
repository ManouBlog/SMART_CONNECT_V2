<script>
import instance,{lienPhoto} from "../../../api/api";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import Swal from "sweetalert2";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
export default {
  name: "detailStudentsContacteView",
  components:{
    HeaderDashboard
  },
  data() {
    return {
      texte: "",
      texte2: "",
      texte3: "",
      texte1: "",
      texte4: "",
      texte5: "",
      texte6: "",
      texte7: "",
      texte8: "",
      texte9: "",
      texte10: "",
      texte11: "",
      texte12: "",
      texte13: "",
      texte14: "",
      texte15: "",
      texte16: "",
      texte17: "",
      texte18: "",
      texte19: "",
      texte20: "",
      texte21: "",
      texte22: "",
      texte23: "",
      texte24: "",
      texte25: "",
      texte26: "",
      texte27:"",
      list_students: null,
      student: null,
      lienPhoto:lienPhoto,
      spinner: false,
      detailsStudents: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      timetables: null,
      MyTime: "",
      myJour: "",
      appreciationService: false,
      notationService: "",
      avis: "",
      user: this.$store.state.user,
    };
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    get_students_contact() {
       this.launchLoading(true);
      instance
        .get("list_students_contact_by_entreprise")
        .then((res) => {
          // console.log(res);
          this.list_students = res.data.data;
          // console.log("LIST", this.list_students);
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
              this.appreciationService = true;
            }
          });
          // console.log("ETOILES", this.detailsStudents.etoiles);

          // console.log("DETAILSETUDIANT", this.detailsStudents);
          // console.log("STUDENTS", this.student);
        })
        .catch((err) => {
          console.log(err)
          this.spinner = false;
        }).finally(()=>{
           this.launchLoading(false);
        });  
       },
    get_all_timetables() {
      this.spinner = true;
      instance
        .get("list_emplois_temps")
        .then((res) => {
          // console.log(res);
          this.timetables = res.data.data;
          // console.log("timetables", this.timetables);
          this.MyTime = this.timetables.find(
            (item) => item.nom == this.$route.params.name
          );

          this.myJour = this.MyTime.jours;

          // console.log("MyJour", this.myJour);
          this.spinner = false;

          // this.appreciationService = !this.appreciationService;

          // setTimeout(function () {
          //   $("#MyTableData").DataTable({
          //     pagingType: "full_numbers",
          //     pageLength: 10,
          //     processing: true,
          //     order: [],
          //     language: {
          //       décimal: "",
          //       emptyTable: "Aucune donnée disponible dans le tableau",
          //       infoEmpty: "Showing 0 to 0 of 0 entries",
          //       info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
          //       infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
          //       infoPostFix: "",
          //       thousands: ",",
          //       lengthMenu: "Afficher les entrées du _MENU_",
          //       loadingRecords: "Loading...",
          //       processing: "Processing...",
          //       search: "Chercher :",
          //       stateSave: true,
          //       zeroRecords: "Aucun enregistrement correspondant trouvé",
          //       paginate: {
          //         first: "Premier",
          //         last: "Dernier",
          //         next: "Suivant",
          //         previous: "Précédent",
          //       },
          //       aria: {
          //         sortAscending: ": activate to sort column ascending",
          //         sortDescending: ": activate to sort column descending",
          //       },
          //     },
          //   });
          // }, 10);
        })
        .catch((err) => {
          console.log(err)
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
      // console.log("NOTATION", this.detailsStudents.id);
      instance
        .post("giveAvis", {
          notes: this.notationService,
          student_id: this.detailsStudents.id,
          avis: this.avis,
        })
        .then((res) => {
          // console.log(res);
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
 async created() {
    this.get_students_contact();
    this.get_all_timetables();
    this.texte = await this.handleTranslate('Talent contacté');
    this.texte1 = await this.handleTranslate(`Contacté pour le`);
    this.texte2 = await this.handleTranslate("Email");
    this.texte3 = await this.handleTranslate('Ville');
    this.texte4 = await this.handleTranslate('Quartier');
    this.texte5 = await this.handleTranslate('Commune');
    this.texte6 = await this.handleTranslate('Télephone');
    this.texte7 = await this.handleTranslate('Diplome');
    this.texte8 = await this.handleTranslate('Carte étudiant');
    this.texte9 = await this.handleTranslate("Compétences");
    this.texte10 = await this.handleTranslate('Pas retenu');
  },
};
</script>

<template>
  <section>
    <div class="page-body position-relative">
      <HeaderDashboard
      :TitleHeader="texte"
      :subTitleHeader="texte"
    />
    <div  class="d-flex align-items-center justify-content-center flex-wrap" v-if="detailsStudents">
      <a-card style="width: 400px; background: var(--secondary-color) !important;color: var(--third-color) !important;" >
        <div class="d-flex justify-content-between align-items-center">
         <h1><em class="bi bi-person h1"></em></h1>
         <h2 style="color:orange;font-weight:bold;">{{ detailsStudents.nom }} {{ detailsStudents.prenoms }}</h2>
        </div>
        <div>
          <h1 class="badge bg-primary w-25">{{texte1}}</h1>
          <br />
          <div
            v-if="
              detailsStudents.pivot.date_debut != null &&
              detailsStudents.pivot.date_fin != null
            "
          >
            <strong>{{
              detailsStudents.pivot.date_debut
               
            }}</strong>
            au
            <strong>{{
              detailsStudents.pivot.date_fin
            }}</strong>
          </div>
          <div v-else>
            <strong>{{
              detailsStudents.pivot.date
            }}</strong>
          </div>
        </div>
        <section class="text-left my-3">
         <h4><span style="color:orange;">{{texte2}} :</span> {{ detailsStudents.email }}</h4>
         <h4><span style="color:orange;">{{texte3}} :</span> {{ detailsStudents.ville }}</h4>
         <h4><span style="color:orange;">{{texte4}} :</span> {{ detailsStudents.quartier }}</h4>
         <h4><span style="color:orange;">{{texte5}} :</span> {{ detailsStudents.commune }}</h4>
         <h4><span style="color:orange;">{{texte6}} :</span> {{ detailsStudents.phone }}</h4>
         <h4><span style="color:orange;">{{texte7}} :</span> {{ detailsStudents.diplome }}</h4>
         <div style="text-align:left;">
           <h4><span style="color:orange;">{{texte8}} :</span></h4>
           <n-image width="100" :src="lienPhoto + detailsStudents.photo"
             :alt="detailsStudents.photo" />
         </div>
        </section>
        <section>
          <h1 class="badge bg-dark w-25 text-warning">{{texte9}}</h1>
          <div
            v-for="(competence, index) in detailsStudents.competences"
            :key="index"
            class="d-flex flex-wrap align-items-center"
          >
            <strong>- {{ competence.competence }}</strong>
          </div>
  
          
        </section>
       </a-card>
    </div>
  
      
    </div>
   </section>
</template>

<style scoped>

.bi-person{
  font-size:3em;
}
h4 {
  margin:1.5em 0;
}

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
  box-shadow: 1px 1px 6px 6px rgba(0, 0, 0, 0.308);
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
