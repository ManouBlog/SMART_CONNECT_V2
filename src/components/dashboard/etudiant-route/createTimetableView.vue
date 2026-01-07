<script>
import instance from "../../../api/api";
import { useDisponibiliteStore } from "../../../store-pinia/Disponibilite/useDisponibiliteStore";
import Swal from "sweetalert2";
import { mapActions } from "pinia";
import Calendar from "primevue/calendar";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
import { configUtils } from "../../../Shared/Utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export default {
  name: "CreateTimetableView",
  components: {
    Calendar,
    HeaderDashboard,
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
    ...mapActions(useDisponibiliteStore, ["createdDisponiblite"]),
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
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
    update_timetable() {
      this.firstPlageHoraire = this.Horaire_Fisrt.toString();
      let FirstHour = this.Horaire_Fisrt;
      let SecondHour;
      if (this.Horaire_Second != null) {
        this.SecondPlageHoraire = this.Horaire_Second.toString();
        SecondHour = this.Horaire_Second;
      } else {
        if (this.Second_heure_start_from != null && this.Second_heure_end_to != null) {
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
      // // console.log(totalGlobalHoraire);
      if (this.Horaire_Second != null) {
        let SecondHoraireFirstHoraire = SecondHour[0].split(":");
        SecondHoraireHour = Number(SecondHoraireFirstHoraire[0]);
        let SecondHoraireMinute = Number(SecondHoraireFirstHoraire[1]);
        let convertSecondHoraireminuteInHour = Math.ceil(SecondHoraireMinute / 60);
        let totalHourSecondHoraireOne =
          SecondHoraireHour + convertSecondHoraireminuteInHour;

        let SecondHoraireSecondHoraire = SecondHour[1].split(":");
        SecondHoraireHourSecondHoraire = Number(SecondHoraireSecondHoraire[0]);
        let SecondHoraireMinuteSecondHoraire = Number(SecondHoraireSecondHoraire[1]);
        let convertSecondHoraireminuteInHourSecondHoraire = Math.ceil(
          SecondHoraireMinuteSecondHoraire / 60
        );
        let totalHourSecondHoraireTwo =
          SecondHoraireHourSecondHoraire + convertSecondHoraireminuteInHourSecondHoraire;

        let totalGlobalSecondHoraire =
          totalHourSecondHoraireTwo - totalHourSecondHoraireOne;
        this.totalHour = totalGlobalHoraire + totalGlobalSecondHoraire;
      } else {
        this.totalHour = totalGlobalHoraire;
      }

      // // console.log("FIRSTHORAIRE", totalGlobalHoraire);
      // // console.log("SECONDHORAIRE", this.totalHour);

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
          // // console.log(newDateForTimetable);
        });
        instance
          .put("modify_schedule/" + this.id_timetable_update, {
            First_horaire: this.firstPlageHoraire.replace(",", "-"),
            Second_horaire: this.SecondPlageHoraire.replace(",", "-"),
            totalHour: this.totalHour,
            day: newDateForTimetable,
          })
          .then((res) => {
            // // console.log(res);
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
      const datesOfCalendar = this.configUtils.formatedDate(this.datesOfCalendar);
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
        DateRendezVous: datesOfCalendar,
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
    getAllCompetencesByStudents() {
      instance.get("getCompetenceByStudents").then((res) => {
        // // console.log("AllCompetences", res.data.data);
        if (res.data.status === true) {
          this.competences = res.data.data.competences;
        }
      });
    },
    getAllCompetences() {
      instance
        .get("GetAllCompetences")
        .then((res) => {
          // // console.log("COMPETENCE", res.data.data);
          this.competencesPredf = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTag(newTag) {
      // // console.log(newTag);
      let brox = newTag;
      this.acquis = brox;
      this.comp = [];
      this.acquis.forEach((el) => {
        this.comp.push(el.id);
      });
      // // console.log("THIS.comp", this.comp);
    },
    addJour(Tag) {
      // // console.log(Tag);
      let brox = Tag;
      this.acquis = brox;
      this.comp = [];
      // // console.log("Tableau", this.comp);
      this.acquis.forEach((el) => {
        this.comp.push(el.jour);
      });
      // // console.log("THIS.days", this.comp);
    },
    resetData() {
      this.First_heure_start_from = "";
      this.First_heure_end_to = "";
      this.Second_heure_start_from = "";
      this.Second_heure_end_to = "";
    },
    handleValueDate() {
      // // console.log("handleValueDate", this.datesOfCalendar);
      if (!this.datesOfCalendar.length) {
        this.resetData();
      }
      this.datesFormatedOfCalendar = this.configUtils.formatedDate(this.datesOfCalendar);
      // // console.log("this.datesFormatedOfCalendar", this.datesFormatedOfCalendar);
    },
    chooseDateTime_debut() {
      this.dateTime_fin = null;
    },
    validateDates() {
      this.error = null;

      if (this.dateTime_debut && this.dateTime_fin) {
        const start = new Date(this.dateTime_debut);
        const end = new Date(this.dateTime_fin);

        if (end <= start) {
          Swal.fire({
            icon: "info",
            title: "La date de fin doit être postérieure à la date de début",
            showConfirmButton: true,
          });
          this.dateTime_fin = null;
        }
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
      // // console.log("DATETIME", dataSend);
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
          console.log('ERROR',error.response.data.message);
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
  },
  async created() {
    this.get_timetable();
    this.getAllCompetences();
    this.getAllCompetencesByStudents();
    const now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    this.getJourInMonth = date;
    this.texte0 = await this.handleTranslate("Planifier une disponibilité");
    this.texte1 = await this.handleTranslate(`Première plage horaire`);
    this.texte2 = await this.handleTranslate("Heure de début");
    this.texte3 = await this.handleTranslate(`Heure de fin`);
    this.texte4 = await this.handleTranslate("Deuxieme plage horaire");
    this.texte5 = await this.handleTranslate("Heure de début");
    this.texte6 = await this.handleTranslate("Heure de fin");
    this.texte7 = await this.handleTranslate(`Veuillez sélectionner une date`);
    this.texte8 = await this.handleTranslate(`Enregistrer`);
    this.texte9 = await this.handleTranslate(`Deuxieme plage horaire`);
    this.texte10 = await this.handleTranslate("Heure de début");
    this.texte11 = await this.handleTranslate("Heure de début");
    this.texte12 = await this.handleTranslate("Heure de fin");
    this.texte13 = await this.handleTranslate("Modifier");
    this.texte14 = await this.handleTranslate("Nouvelle disponibilitée");
    this.texte15 = await this.handleTranslate("Premiere Plage Horaire");
    this.texte16 = await this.handleTranslate("Seconde Plage Horaire");
    this.texte17 = await this.handleTranslate("Néant");
    this.texte18 = await this.handleTranslate("Actions");
    this.texte19 = await this.handleTranslate("Détails");
    this.texte20 = await this.handleTranslate("Ajouter");
    this.texte21 = await this.handleTranslate("Compétences");
    this.texte22 = await this.handleTranslate("Détails");
    this.texte23 = await this.handleTranslate("Ajouter");
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <HeaderDashboard :TitleHeader="texte0" :subTitleHeader="texte0" />

    <div class="tab-content" id="top-tabContent">
      <div>
        <div class="container-fluid">
          <div>
            <section style="display: flex; justify-content: center; margin-bottom: 1em">
              <select
                class="w-50 my-5"
                style="padding: 1em"
                name="select"
                id="select"
                v-model="handleHoraire"
              >
                <option value="" disabled>Type de plage</option>
                <option value="Horaire">Plage Horaire</option>
                <option value="Periode">Période</option>
              </select>
            </section>
            <section
              class="d-flex justify-content-center align-items-center"
              style="flex-wrap:wrap;"
              v-if="handleHoraire === 'Periode'"
            >
              <div class="mx-3">
                <h5 class="text-start">Date et Heure de début</h5>
                <input
                  v-model="dateTime_debut"
                  type="datetime-local"
                  :min="new Date().toISOString().substring(0, 16)"
                  class="w-100"
                  style="padding:1em !important;"
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
                  class="w-100"
                   style="padding:1em !important;"
                  @change="validateDates"
                />
              </div>
            </section>
            <div class="form theme-form projectcreate">
              <div style="flex: 1 1 100px" v-if="handleHoraire !== 'Periode'">
                <h6
                  v-if="!datesOfCalendar.length"
                  class="text-danger d-block text-center"
                  style="font-weight: bold; font-size: 1.4em; padding: 0.5em 0"
                >
                  {{ texte7 }}
                </h6>
                <Calendar
                  :minDate="new Date()"
                  v-model="datesOfCalendar"
                  selectionMode="multiple"
                  @update:modelValue="handleValueDate"
                  inline
                  style="width: 333px"
                  :manualInput="false"
                />
              </div>
              <div style="flex: 1 1 200px">
                <section v-if="handleHoraire === 'Horaire'">
                  <h5 class="text-start text-warning">{{ texte1 }}</h5>
                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte2 }}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_1"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          v-model="First_heure_start_from"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedispla1"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte3 }}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_2"
                          :minDate="First_heure_start_from"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          v-model="First_heure_end_to"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedisplay2"
                        />
                      </div>
                    </div>
                  </div>
                  <h5 class="text-start mt-5 text-warning">{{ texte4 }}</h5>
                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte5 }}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_3"
                          :minDate="First_heure_start_from"
                          v-model="Second_heure_start_from"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedisplay3"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{ texte6 }}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_4"
                          :minDate="Second_heure_start_from"
                          v-model="Second_heure_end_to"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedisplay4"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <div class="col-lg-12" v-if="handleHoraire === 'Horaire'">
                  <button
                    :disabled="!First_heure_start_from && !First_heure_end_to"
                    class="btn bg-warning p-5"
                    @click="create_timetable"
                  >
                    {{ texte8 }}
                  </button>
                </div>
                <div class="col-lg-12 my-5" v-if="handleHoraire === 'Periode'">
                  <button
                    :disabled="!this.dateTime_fin"
                    class="btn bg-warning p-5"
                    @click="addToSchedule"
                  >
                    {{ texte8 }}
                  </button>
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
  .w-50{
    width:100% !important;
  }
}
</style>
