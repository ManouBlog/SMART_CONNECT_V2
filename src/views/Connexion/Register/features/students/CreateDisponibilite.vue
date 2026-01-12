<script>
import instance from "../../../../../api/api";
// import { useDisponibiliteStore } from "../../../store-pinia/Disponibilite/useDisponibiliteStore";
import Swal from "sweetalert2";
// import { mapActions } from "pinia";
// import Calendar from "primevue/calendar";
import HorizontalCalendar from "./HorizontalCalendar.vue";
// import HeaderDashboard from "../../../../../Shared/Compoments/HeaderDashboard.vue";
// import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
// import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { configUtils } from "../../../../../Shared/Utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export default {
  name: "CreateTimetableView",
  components: {
    // Calendar,
    HorizontalCalendar,
    // HeaderDashboard,
  },
  data() {
    return {
      texte0: "",
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
      selectedDates: null,
      dateTime_debut: "",
      dateTime_fin: "",
      handleHoraire: "Horaire",
      datesFormatedOfCalendar: [],
      configUtils: configUtils,
      datesOfCalendar: [],
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
      isLoading: false,
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
      // // console.log("mes Nouvelle dates", this.dates);
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
      // // console.log("mes Dates", this.datesPickers);
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
    
    get_timetable() {
      instance
        .get("get_schedule")
        .then((res) => {
          // // console.log(res);
          this.timetables = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    create_timetable() {
      //   const datesOfCalendar = this.configUtils.formatedDate(this.datesOfCalendar);
      // // console.log("datesOfCalendar", datesOfCalendar);
      const HourFirstHoraire = this.configUtils.getHourInDate(
        this.First_heure_start_from,
        this.First_heure_end_to
      );
      const HourSecondHoraire = this.configUtils.getHourInDate(
        this.Second_heure_start_from,
        this.Second_heure_end_to
      );
      const TOTALHOURHORAIRE = HourFirstHoraire + HourSecondHoraire;
      const HEURE_FROM_OF_FIRSTHORRAIRE = this.configUtils.handleHeureOfDate(
        this.First_heure_start_from
      );
      const HEURE_TO_OF_FIRSTHORRAIRE = this.configUtils.handleHeureOfDate(
        this.First_heure_end_to
      );

      const FIRST_HORRAIRE =
        HEURE_FROM_OF_FIRSTHORRAIRE + "-" + HEURE_TO_OF_FIRSTHORRAIRE;

      let SECOND_HORRAIRE;
      const HEURE_FROM_OF_SECONDHORRAIRE = this.configUtils.handleHeureOfDate(
        this.Second_heure_start_from
      );
      const HEURE_TO_OF_SECONDHORRAIRE = this.configUtils.handleHeureOfDate(
        this.Second_heure_end_to
      );
      if (HEURE_FROM_OF_SECONDHORRAIRE === null || HEURE_TO_OF_SECONDHORRAIRE === null) {
        SECOND_HORRAIRE = null;
      } else {
        SECOND_HORRAIRE = HEURE_FROM_OF_SECONDHORRAIRE + "-" + HEURE_TO_OF_SECONDHORRAIRE;
      }

      this.createdDisponiblite({
        DateRendezVous: this.datesOfCalendar,
        firstHoraire: FIRST_HORRAIRE,
        secondHoraire: SECOND_HORRAIRE,
        TotalHourDisponi: TOTALHOURHORAIRE,
      });
    },
    show_timetable(id) {
      this.modify_timetable = !this.modify_timetable;
      this.id_timetable_update = id;
      this.spinner = true;
      // // console.log("ID_UPADTE", this.id_timetable_update);
      instance
        .get("get_schedule")
        .then((res) => {
          // // console.log(res);
          this.timetable = res.data.data;
          this.timetable_show_id = this.timetable.find((item) => item.id === id);

          let newdate = [];
          newdate.push(this.timetable_show_id.jour);
          this.newDatePickerForUpdate = [...new Set(newdate)];
          this.Horaire_Fisrt = this.timetable_show_id.First_horaire.split("-");
          if (
            this.timetable_show_id != null &&
            this.timetable_show_id.Second_horaire != null
          ) {
            this.Horaire_Second = this.timetable_show_id.Second_horaire.split("-");
          } else {
            this.Horaire_Second = null;
          }
          // // console.log("FIRST HORAIRE", this.Horaire_Fisrt);
          // // console.log("SECOND HORAIRE", this.Horaire_Second);

          this.spinner = false;
          // // console.log("ELEMENT", this.timetable_show_id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    show_box_confirmation_delete(id) {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = id;
      // // console.log("ID_DELETE", this.id_for_delete);
    },
    addCompetences() {
      instance
        .post("addCompetences", {
          competence: this.comp,
        })
        .then((response) => {
          // // console.log(response);
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
          // console.log(err.message);
          console.log(err);
        });
    },
    showBoxConfirmationDeleteCompetences(id) {
      this.comfirmationForDeleteCompetence = !this.comfirmationForDeleteCompetence;
      this.id_for_delete = id;
    },
    not_delete() {
      this.confirmation_for_delete = !this.confirmation_for_delete;
      this.id_for_delete = "";
    },
    notDeleteCompetence() {
      this.comfirmationForDeleteCompetence = !this.comfirmationForDeleteCompetence;
      this.id_for_delete = "";
    },
    delete_timetable() {
      instance
        .delete("delete_schedule/" + this.id_for_delete)
        .then((res) => {
          // // console.log(res);
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
          // // console.log(res);
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
    resetData() {
      this.First_heure_start_from = "";
      this.First_heure_end_to = "";
      this.Second_heure_start_from = "";
      this.Second_heure_end_to = "";
    },
    handleValueDate() {
      if (!this.this.$store.state.datesOfCalendar.length) {
        this.resetData();
      }
      this.datesFormatedOfCalendar = this.configUtils.formatedDate(this.datesOfCalendar);
    },
    chooseDateTime_debut(e) {
      this.dateTime_fin = null;
         if(e.target.value){
     this.$store.commit('SET_DATE_DEBUT',e.target.value)
    }else{
        this.$store.commit('SET_DATE_DEBUT',null)
    }
    },
    handleDateTimeFin(e) {
      this.error = null;
    if(e.target.value){
     this.$store.commit('SET_DATE_FIN',e.target.value)
    }else{
        this.$store.commit('SET_DATE_FIN',null)
    }
    },
    addToSchedule() {
      this.launchLoading(true);
      this.schedule = [];
      const scheduleItem_debut = {
        jour: this.dateTime_debut.substring(0, 10), // Extrait YYYY-MM-DD
        first_horaire: `${this.dateTime_debut.substring(
          11,
          16
        )}-${this.dateTime_fin.substring(11, 16)}`,
      };
      const scheduleItem_fin = {
        jour: this.dateTime_fin.substring(0, 10), // Extrait YYYY-MM-DD
        first_horaire: `${this.dateTime_debut.substring(
          11,
          16
        )}-${this.dateTime_fin.substring(11, 16)}`,
      };

      this.schedule.push(scheduleItem_debut, scheduleItem_fin);
      this.schedule.sort((a, b) => new Date(a.jour) - new Date(b.jour));
      // // console.log("this.schedule", this.schedule);
      const dataSend = {
        jour: [
          this.schedule.map((item) => {
            return item.jour;
          })[0] +
            " A " +
            this.schedule.map((item) => {
              return item.jour;
            })[1],
        ],
        First_horaire: this.schedule.map((item) => {
          return item.first_horaire;
        })[0],
        Second_horaire: null,
        totalHour: 0,
        hour_periode_debut: this.schedule
          .map((item) => {
            return item.first_horaire;
          })[0]
          .split("-")[0],
        hour_periode_fin: this.schedule
          .map((item) => {
            return item.first_horaire;
          })[0]
          .split("-")[1],
        periode_debut: this.schedule.map((item) => {
          return item.jour;
        })[0],
        periode_fin: this.schedule.map((item) => {
          return item.jour;
        })[1],
        periode: 1,
      };
      console.log("DATETIME2", dataSend);
      instance
        .post("create_schedule", dataSend)
        .then((response) => {
          // // console.log("ADD DATETIME PERIODE", response.data.status);
          if (!response.data.status) {
            Swal.fire({
              icon: "info",
              title: response.data.message,
              showConfirmButton: true,
            });
          }
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: response.data.message,
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          console.log("ERROR", error.response.data.message);
          Swal.fire({
            icon: "info",
            title: error.response.data.message,
            showConfirmButton: true,
          });
        })
        .finally(() => {
          this.launchLoading(false);
          this.dateTime_fin = null;
          this.dateTime_debut = null;
        });
    },
    handleSelectedDates(payload_date_chosen) {
      if (payload_date_chosen.length > 0) {
        const formattedDates = payload_date_chosen.map((d) =>
          new Date(d).toISOString().slice(0, 10)
        );
        console.log("formattedDates", formattedDates);
        // this.datesOfCalendar = formattedDates;
        this.$store.commit('SET_DATES',formattedDates)
      } else {
       this.$store.commit('SET_DATES',[])
      }
    },
    handleFirstHeureStart(e){
   console.log("handleFirstHeureStart",e.target.value)
   if(e.target.value){
     this.$store.commit('SET_FIRST_HEURE_START',e.target.value)
    }else{
        this.$store.commit('SET_FIRST_HEURE_START',null)
    }

    },
    handleFirstHeureEnd(e){
        if(e.target.value){
     this.$store.commit('SET_FIRST_HEURE_END',e.target.value)
    }else{
        this.$store.commit('SET_FIRST_HEURE_END',null)
    }
    },
    handleSecondHeureStart(e){
        if(e.target.value){
     this.$store.commit('SET_SECOND_HEURE_START',e.target.value)
    }else{
        this.$store.commit('SET_SECOND_HEURE_START',null)
    }
    },
    handleSecondHeureEnd(e){
          if(e.target.value){
     this.$store.commit('SET_SECOND_HEURE_END',e.target.value)
    }else{
        this.$store.commit('SET_SECOND_HEURE_END',null)
    }
    },
    chooseTypePlage(e){
    if(e.target.value){
    this.$store.commit('SET_DATE_DEBUT',null)
    this.$store.commit('SET_DATE_FIN',null)
    this.$store.commit('SET_SECOND_HEURE_START',null)
    this.$store.commit('SET_SECOND_HEURE_END',null)
    this.$store.commit('SET_FIRST_HEURE_START',null)
    this.$store.commit('SET_FIRST_HEURE_END',null)
    this.$store.commit('SET_HANDLE_HORAIRE',e.target.value);
    }
    }
  },
  async created() {
    // this.get_timetable();
    // this.getAllCompetences();
    // this.getAllCompetencesByStudents();
    const now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    this.getJourInMonth = date;
    this.texte0 = "Planifier une disponibilité";
    this.texte1 = `Première plage horaire`;
    this.texte2 = "Heure de début";
    this.texte3 = `Heure de fin`;
    this.texte4 = "Deuxieme plage horaire";
    this.texte5 = "Heure de début";
    this.texte6 = "Heure de fin";
    this.texte7 = `Veuillez sélectionner une date`;
    this.texte8 = `Enregistrer`;
    this.texte9 = `Deuxieme plage horaire`;
    this.texte10 = "Heure de début";
    this.texte11 = "Heure de début";
    this.texte12 = "Heure de fin";
    this.texte13 = "Modifier";
    this.texte14 = "Nouvelle disponibilitée";
    this.texte15 = "Premiere Plage Horaire";
    this.texte16 = "Seconde Plage Horaire";
    this.texte17 = "Néant";
    this.texte18 = "Actions";
    this.texte19 = "Détails";
    this.texte20 = "Ajouter";
    this.texte21 = "Compétences";
    this.texte22 = "Détails";
    this.texte23 = "Ajouter";
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="tab-content" id="top-tabContent">
      <div>
        <div class="container-fluid">
          <div>
            <!-- <section style="display: flex; justify-content: center; margin-bottom: 1em">
              <select
                class="w-50 my-5"
                style="padding: 0.5em; border-radius: 10px"
                name="select"
                id="select"
                v-model="handleHoraire"
                @change="chooseTypePlage"
              >
                <option value="" disabled>Type de plage</option>
                <option value="Horaire">Plage Horaire</option>
                <option value="Periode">Période</option>
              </select>
            </section> -->
            <section
              class="d-flex justify-content-center align-items-center"
              style="flex-wrap: wrap"
              v-if="handleHoraire === 'Periode'"
            >
              <div class="mx-3">
                <h5 class="text-start">Date et Heure de début</h5>
                <input
                  v-model="dateTime_debut"
                  type="datetime-local"
                  :min="new Date().toISOString().substring(0, 16)"
                  style="padding: 0.8em !important; border-radius: 10px"
                  @change="chooseDateTime_debut"
                />
              </div>

              <div class="mx-3">
                <h5 class="text-start">Date et Heure de fin</h5>
                <input
                  v-model="dateTime_fin"
                  :min="
                    dateTime_debut
                      ? new Date(
                          new Date(dateTime_debut).setDate(
                            new Date(dateTime_debut).getDate() + 1
                          )
                        )
                          .toISOString()
                          .substring(0, 16)
                      : null
                  "
                  :disabled="!dateTime_debut"
                  type="datetime-local"
                  style="padding: 0.8em !important; border-radius: 10px"
                  @change="handleDateTimeFin"
                />
              </div>
            </section>
            <div style="flex: 1 1 100px" v-if="handleHoraire !== 'Periode'">
              <h6
                v-if="!this.$store.state.datesOfCalendar.length"
                class="text-danger d-block text-center"
                style="font-weight: bold; font-size: 1.4em; padding: 0.5em 0"
              >
                {{ texte7 }}
              </h6>
              <HorizontalCalendar
                :year="new Date().getFullYear()"
                @update:selectedDates="handleSelectedDates"
              />
            </div>
            <div class="form theme-form">
              <div>
                <section v-if="handleHoraire === 'Horaire'">
                  <h5 class="text-start text-warning">{{ texte1 }}</h5>

                  <!-- Premier créneau : heure début / heure fin -->
                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte2 }}</label>
                      <input
                        type="time"
                        class="form-control mt-1"
                        :disabled="this.$store.state.datesOfCalendar.length === 0"
                        :value="
                          First_heure_start_from
                            ? First_heure_start_from.format('HH:mm')
                            : ''
                        "
                        @change="handleFirstHeureStart"
                       
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte3 }}</label>
                      <input
                        type="time"
                        class="form-control mt-1"
                        :disabled="this.$store.state.datesOfCalendar.length === 0"
                        :min="First_heure_start_from?.format('HH:mm')"
                        :value="
                          First_heure_end_to ? First_heure_end_to.format('HH:mm') : ''
                        "
                        @change="handleFirstHeureEnd"
                      />
                    </div>
                  </div>

                  <h5 class="text-start my-2 text-warning">{{ texte4 }}</h5>

                  <!-- Second créneau : heure début / heure fin -->
                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte5 }}</label>
                      <input
                        type="time"
                        class="form-control mt-1"
                        :disabled="this.$store.state.datesOfCalendar.length === 0"
                        :value="
                          Second_heure_start_from
                            ? Second_heure_start_from.format('HH:mm')
                            : ''
                        "
                       @change="handleSecondHeureStart"
                      />
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte6 }}</label>
                      <input
                        type="time"
                        class="form-control mt-1"
                        :disabled="this.$store.state.datesOfCalendar.length === 0"
                        :min="Second_heure_start_from?.format('HH:mm')"
                        :value="
                          Second_heure_end_to ? Second_heure_end_to.format('HH:mm') : ''
                        "
                        @change="handleSecondHeureEnd"
                      />
                    </div>
                  </div>
                </section>
                <!-- <div class="col-lg-12" v-if="handleHoraire === 'Horaire'">
                  <button
                    :disabled="!First_heure_start_from && !First_heure_end_to"
                    class="btn bg-warning p-5"
                    @click="create_timetable"
                  >
                    {{ texte8 }}
                  </button>
                </div> -->
                <!-- <div class="col-lg-12 my-5" v-if="handleHoraire === 'Periode'">
                  <button
                    :disabled="!this.dateTime_fin"
                    class="btn bg-warning p-5"
                    @click="addToSchedule"
                  >
                    {{ texte8 }}
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-control{
border:1px solid gray !important;
height:40px;
}
.container-fluid {
  padding: 1em !important;
}
.conteneur-plage {
  display: flex;
  justify-content: flex-start;
}
#datepicker-timeonly_1,
#datepicker-timeonly_2,
#datepicker-timeonly_3,
#datepicker-timeonly_4 {
  width: 100%;
}

.projectcreate {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  text-align: center;
}
.text-start {
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
.btn-secondary,
.btn-secondary:hover {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
  color: white !important;
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
.btnAdd:hover {
  color: rgb(255, 255, 255);
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
@media (max-width: 768px) {
  .w-50 {
    width: 100% !important;
  }
  .container-fluid {
    padding: 0 !important;
  }
}
</style>
