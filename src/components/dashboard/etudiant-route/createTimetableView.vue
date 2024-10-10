<script>
import instance from "../../../api/api";
import Swal from "sweetalert2";

import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "v-calendar/dist/style.css";
import { DatePicker } from "v-calendar";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";

export default {
  name: "CreateTimetableView",
  components: {
    DatePicker,
    HeaderDashboard
  },
  data() {
    return {
      jour: "",
      firstHoraire: "",
      secondHoraire: "",
      First_heure_start_from: null,
      competences: [],
      First_heure_end_to: null,
      timetables: "",
      Second_heure_end_to: null,
      Second_heure_start_from: null,
      spinner: false,
      modify_timetable: false,
      timetable_show_id: null,
      id_timetable_update: null,
      confirmation_for_delete: false,
      comfirmationForDeleteCompetence: false,
      id_for_delete: "",
      Horaire_Fisrt: null,
      Horaire_Second: null,
      firstPlageHoraire: "",
      SecondPlageHoraire: "",
      competencesPredf: [],
      hourTotal: "",
      competence: null,
      totalHour: "",
      hour: "",
      twoHoraireHour: "",
      TwoSecondHoraire: "",
      secondHoraireTwo: "",
      acquis: null,
      comp: null,
      datesPickers: [],
      datesPickersUpdate: [
        {
          date: new Date(),
        },
      ],
      newDatePickerForUpdate: [],
      selecteDatepickers: {},
      selecteDatepickersupdate: {},
      isLoading:false,
      getJourInMonth: "",
      dates: [],
      selectedJourForUpadte: {},
    };
  },
  methods: {
    show_modify() {
      this.modify_timetable = !this.modify_timetable;
      this.id_timetable_update = null;
    },
    addDateForUpdate() {
      this.dates.push({
        date: new Date(),
      });
      console.log("mes Nouvelle dates", this.dates);
      this.$nextTick(() => {
        const btn = this.$refs.button[this.$refs.button.length - 1];
        btn.click();
      });
    },
    removeDateForUpdate(date, hide) {
      this.dates = this.dates.filter((d) => d !== date);
      hide();
    },
    dateSelectedForUpadte(e, date, toggle) {
      this.selectedJourForUpadte = date;
      toggle({ ref: e.target });
    },
    addDate() {
      this.datesPickers.push({
        date: new Date(),
      });
      console.log("mes Dates", this.datesPickers);
      this.$nextTick(() => {
        const btn = this.$refs.button[this.$refs.button.length - 1];
        btn.click();
      });
    },
  
    removeDate(date, hide) {
      this.datesPickers = this.datesPickers.filter((d) => d !== date);
      hide();
    },
    dateSelected(e, date, toggle) {
      this.selecteDatepickers = date;
      toggle({ ref: e.target });
    },
    update_timetable() {
      this.firstPlageHoraire = this.Horaire_Fisrt.toString();
      let FirstHour = this.Horaire_Fisrt;
      let SecondHour;
      if (this.Horaire_Second != null) {
        this.SecondPlageHoraire = this.Horaire_Second.toString();
        SecondHour = this.Horaire_Second;
      } else {
        if (
          this.Second_heure_start_from != null &&
          this.Second_heure_end_to != null
        ) {
          this.SecondPlageHoraire = this.Second_heure_start_from.concat(
            "-",
            this.Second_heure_end_to
          );
        }
      }

      let oneHoraireFirstHoraire = FirstHour[0].split(":");
      let oneHoraireHour = Number(oneHoraireFirstHoraire[0]);
      let oneHoraireMinute = Number(oneHoraireFirstHoraire[1]);
      let convertOneHoraireminuteInHour = Math.ceil(oneHoraireMinute / 60);
      let totalHourOneHoraire = oneHoraireHour + convertOneHoraireminuteInHour;

      let twoHoraireSecondHoraire = FirstHour[1].split(":");
      let twoHoraireHour = Number(twoHoraireSecondHoraire[0]);
      let twoHoraireMinute = Number(twoHoraireSecondHoraire[1]);
      let convertTwoHoraireminuteInHour = Math.ceil(twoHoraireMinute / 60);
      let totalHourTwoHoraire = twoHoraireHour + convertTwoHoraireminuteInHour;

      let totalGlobalHoraire = totalHourTwoHoraire - totalHourOneHoraire;
      let SecondHoraireHour, SecondHoraireHourSecondHoraire;
      console.log(totalGlobalHoraire);
      if (this.Horaire_Second != null) {
        let SecondHoraireFirstHoraire = SecondHour[0].split(":");
        SecondHoraireHour = Number(SecondHoraireFirstHoraire[0]);
        let SecondHoraireMinute = Number(SecondHoraireFirstHoraire[1]);
        let convertSecondHoraireminuteInHour = Math.ceil(
          SecondHoraireMinute / 60
        );
        let totalHourSecondHoraireOne =
          SecondHoraireHour + convertSecondHoraireminuteInHour;

        let SecondHoraireSecondHoraire = SecondHour[1].split(":");
        SecondHoraireHourSecondHoraire = Number(SecondHoraireSecondHoraire[0]);
        let SecondHoraireMinuteSecondHoraire = Number(
          SecondHoraireSecondHoraire[1]
        );
        let convertSecondHoraireminuteInHourSecondHoraire = Math.ceil(
          SecondHoraireMinuteSecondHoraire / 60
        );
        let totalHourSecondHoraireTwo =
          SecondHoraireHourSecondHoraire +
          convertSecondHoraireminuteInHourSecondHoraire;

        let totalGlobalSecondHoraire =
          totalHourSecondHoraireTwo - totalHourSecondHoraireOne;
        this.totalHour = totalGlobalHoraire + totalGlobalSecondHoraire;
      } else {
        this.totalHour = totalGlobalHoraire;
      }

      console.log("FIRSTHORAIRE", totalGlobalHoraire);
      console.log("SECONDHORAIRE", this.totalHour);

      if (
        oneHoraireHour > twoHoraireHour ||
        SecondHoraireHour > SecondHoraireHourSecondHoraire
      ) {
        Swal.fire({
          icon: "error",
          title: "l'heure de fin doit être superieur à l'heure de départ",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        let newDateForTimetable = [];
        this.dates.forEach((date) => {
          newDateForTimetable.push(date.date.toISOString().slice(0, 10));
          console.log(newDateForTimetable);
        });
        instance
          .put("modify_schedule/" + this.id_timetable_update, {
            First_horaire: this.firstPlageHoraire.replace(",", "-"),
            Second_horaire: this.SecondPlageHoraire.replace(",", "-"),
            totalHour: this.totalHour,
            day: newDateForTimetable,
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
              setTimeout(() => {
                this.modify_timetable = false;
                this.id_timetable_update = null;
                //location.reload(true);
              }, 1500);
            }
            if (res.data.status === false) {
              Swal.fire({
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    get_timetable() {
      this.spinner = true;
      instance
        .get("get_schedule")
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
      this.isLoading = true;
      this.firstHoraire = this.First_heure_start_from.concat(
        "-",
        this.First_heure_end_to
      );
      if (
        this.Second_heure_start_from != null &&
        this.Second_heure_end_to != !null
      ) {
        this.secondHoraire = this.Second_heure_start_from.concat(
          "-",
          this.Second_heure_end_to
        );
      }
      let oneHoraire = this.First_heure_end_to.split(":");
      this.hour = Number(oneHoraire[0].split(":").toString());
      let minute = Number(oneHoraire[1].split(":").toString());
      let minuteTohour = Math.ceil(minute / 60);
      let totalOneHoraire = this.hour + minuteTohour;

      let twoHoraire = this.First_heure_start_from.split(":");
      this.twoHoraireHour = Number(twoHoraire[0].split(":").toString());
      let minuteTwoHoraire = Number(twoHoraire[1].split(":").toString());
      let minuteTohourTwo = Math.ceil(minuteTwoHoraire / 60);
      let totalTwoHoraire = this.twoHoraireHour + minuteTohourTwo;

      let totalOneSecondHoraireTwoEnd, totalOneSecondHoraireFrom;
      if (
        this.Second_heure_start_from != null &&
        this.Second_heure_end_to != !null
      ) {
        let secondHoraire = this.Second_heure_start_from.split(":");
        let TwoSecondHoraire = Number(secondHoraire[0].split(":").toString());
        let minuteTwoSecondHoraire = Number(
          secondHoraire[1].split(":").toString()
        );

        let minuteTohourOneSecondHoraire = Math.ceil(
          minuteTwoSecondHoraire / 60
        );
        totalOneSecondHoraireFrom =
          TwoSecondHoraire + minuteTohourOneSecondHoraire;

        this.secondHoraireTwo = this.Second_heure_end_to.split(":");
        this.TwoSecondHoraireTwo = Number(
          this.secondHoraireTwo[0].split(":").toString()
        );
        let minuteTwoSecondHoraireTwo = Number(
          this.secondHoraireTwo[1].split(":").toString()
        );
        let minuteTohourOneSecondHoraireEnd = Math.ceil(
          minuteTwoSecondHoraireTwo / 60
        );
        totalOneSecondHoraireTwoEnd =
          this.TwoSecondHoraireTwo + minuteTohourOneSecondHoraireEnd;
      } else {
        totalOneSecondHoraireTwoEnd = 0;
        totalOneSecondHoraireFrom = 0;
      }

      let globalHourFirstHoraire =
        totalOneSecondHoraireTwoEnd - totalOneSecondHoraireFrom;
      let globalHourSecondHoraire = totalOneHoraire - totalTwoHoraire;

      let TotalHourDisponi = globalHourFirstHoraire + globalHourSecondHoraire;
      console.log("TotalHourDisponi", TotalHourDisponi);
      if (
        this.twoHoraireHour > this.hour ||
        this.TwoSecondHoraire > this.secondHoraireTwo
      ) {
        Swal.fire({
          icon: "error",
          title: "l'heure de fin doit être supérieur a l'heure de départ",
          showConfirmButton: false,
          timer: 1500,
        });
        this.isLoading = false;
      } else {
        let DateRendezVous = [];
        this.datesPickers.forEach((date) => {
          DateRendezVous.push(date.date.toISOString().slice(0, 10));
        });
        instance
          .post("create_schedule", {
            jour: DateRendezVous,
            First_horaire: this.firstHoraire,
            Second_horaire: this.secondHoraire,
            totalHour: TotalHourDisponi,
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
              this.isLoading = false;
              // setTimeout(function () {
              //   location.reload(true);
              // }, 1500);
            }
            if (res.data.status === false) {
              Swal.fire({
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              this.isLoading = false;
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Le jour a déjà été pris",
              showConfirmButton: false,
              timer: 1500,
            });
            this.isLoading = false;
          });
      }
    },
    show_timetable(id) {
      this.modify_timetable = !this.modify_timetable;
      this.id_timetable_update = id;
      this.spinner = true;
      console.log("ID_UPADTE", this.id_timetable_update);
      instance
        .get("get_schedule")
        .then((res) => {
          console.log(res);
          this.timetable = res.data.data;
          this.timetable_show_id = this.timetable.find(
            (item) => item.id === id
          );

          let newdate = [];
          newdate.push(this.timetable_show_id.jour);
          this.newDatePickerForUpdate = [...new Set(newdate)];
          this.Horaire_Fisrt = this.timetable_show_id.First_horaire.split("-");
          if (
            this.timetable_show_id != null &&
            this.timetable_show_id.Second_horaire != null
          ) {
            this.Horaire_Second =
              this.timetable_show_id.Second_horaire.split("-");
          } else {
            this.Horaire_Second = null;
          }
          console.log("FIRST HORAIRE", this.Horaire_Fisrt);
          console.log("SECOND HORAIRE", this.Horaire_Second);

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
    addCompetences() {
      instance
        .post("addCompetences", {
          competence: this.comp,
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
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    showBoxConfirmationDeleteCompetences(id) {
      this.comfirmationForDeleteCompetence =
        !this.comfirmationForDeleteCompetence;
      this.id_for_delete = id;
    },
    not_delete() {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = "";
    },
    notDeleteCompetence() {
      this.comfirmationForDeleteCompetence =
        !this.comfirmationForDeleteCompetence;
      this.id_for_delete = "";
    },
    delete_timetable() {
      instance
        .delete("delete_schedule/" + this.id_for_delete)
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.confirmation_for_delete = !this.confirmation_for_delete;
            // setTimeout(function () {
            //   //location.reload(true);
            // }, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteMyCompetence() {
      instance
        .delete("deleteCompetencesOfStudents/" + this.id_for_delete)
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.confirmation_for_delete = !this.confirmation_for_delete;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCompetencesByStudents() {
      instance.get("getCompetenceByStudents").then((res) => {
        console.log("AllCompetences", res.data.data);
        if (res.data.status === true) {
          this.competences = res.data.data.competences;
        }
      });
    },
    getAllCompetences() {
      instance
        .get("GetAllCompetences")
        .then((res) => {
          console.log("COMPETENCE", res.data.data);
          this.competencesPredf = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTag(newTag) {
      console.log(newTag);
      let brox = newTag;
      this.acquis = brox;
      this.comp = [];
      this.acquis.forEach((el) => {
        this.comp.push(el.id);
      });
      console.log("THIS.comp", this.comp);
    },
    addJour(Tag) {
      console.log(Tag);
      let brox = Tag;
      this.acquis = brox;
      this.comp = [];
      console.log("Tableau", this.comp);
      this.acquis.forEach((el) => {
        this.comp.push(el.jour);
      });
      console.log("THIS.days", this.comp);
    },
  },
  created() {
    this.get_timetable();
    this.getAllCompetences();
    this.getAllCompetencesByStudents();
    const now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    this.getJourInMonth = date;
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard
    :TitleHeader="'Planifier une disponibilité'"
    :subTitleHeader="'Planifier une disponibilité'"
  />

    <!-- <div class="container-fluid">
      <div class="page-title">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Enregistrer une disponibilité</li>
        </ol>
      </div>
    </div> -->
   

    <div class="tab-content" id="top-tabContent">
      <div
    
    
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="create_timetable">
                      <div class="row">
                        <h5 class="text-left fw-bold mx-4 my-3">Veuillez ajouter une date</h5>
                        <div class="position-relative datepickrs">
                          
                          <DatePicker
                            v-model="selecteDatepickers.date"
                            class="datePicker"
                            :min-date="new Date()"
                          >
                            <template #default="{ togglePopover, hidePopover }">
                              <div
                                class="flex d-flex flex-wrap justify-content-start ps-4"
                              >
                                <button
                                  v-for="date in datesPickers"
                                  :key="date.date"
                                  @click.prevent="
                                    dateSelected($event, date, togglePopover)
                                  "
                                  ref="button"
                                  class="button"
                                >
                                  {{ date.date.toLocaleDateString() }}
                                  <em
                                    href="#"
                                    class="bi bi-x text-danger"
                                    @click.prevent="
                                      removeDate(date, hidePopover)
                                    "
                                  ></em>
                                </button>
                              </div>
                            </template>
                          </DatePicker>
                          <button class="btn btnAdd" @click.prevent="addDate">
                            + Ajouter une date
                          </button>
                        </div>
                        <h5 class="text-start"
                          >Premier plage horaire</h5
                        >
                        <div class="col-lg-6">
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="First_heure_start_from"
                              required
                              min="06:00"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="First_heure_end_to"
                              required
                              max="23:59"
                              min="06:00"
                            />
                          </div>
                        </div>
                        <h5 class="text-start"
                          >Deuxieme plage horaire</h5
                        >
                        <div class="col-lg-6">
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Second_heure_start_from"
                              min="06:00"
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Second_heure_end_to"
                              max="23:00"
                              min="06:00"
                            />
                          </div>
                        </div>
                      </div>

                     
                        
                          <div class="text-right p-3">
                            <button
                              class="btn btn-secondary me-3"
                              type="submit"
                              :disabled="isLoading ? true:false"
                            >
                              {{isLoading ? 'Loading...':'Créer'}}
                            </button>
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
  
  </div>
</template>
<style scoped>
.text-start{
  text-align: left;
  margin-left: 1em;
}
.mt-5 {
  margin-top: 101px !important;
}
.flex {
  padding: 1em 0;
}
h3 {
  text-transform: none !important;
}
label {
  text-align: left !important;
}
.btn-secondary,.btn-secondary:hover {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
  color:white !important;
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
.btnAdd {
  position: absolute;
  left: 0;
  bottom: 0;
  font-weight: bold;
  background: #052349;
  color: white;
}
.btnAdd:hover{
  color:rgb(255, 255, 255);
}
.datepickrs {
  padding: 1em 0;
  background: rgba(98, 98, 231, 0.108);
  margin: 0 0 2em 0;
  border-radius: 5px;
}
.button {
  width: auto !important;
  padding: 0.2em !important;
  margin-left: 0.5em !important;
  margin-bottom: 0.5em !important;
  background: rgb(255, 255, 255) !important;
  border-radius: 5px !important;
  border: none !important;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.303);
}
</style>

