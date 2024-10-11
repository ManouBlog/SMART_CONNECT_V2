<script>
import instance from "../../../api/api";
import Swal from "sweetalert2";
import { FilterMatchMode } from "primevue/api";
import VueMultiselect from "vue-multiselect";
import { configUtils } from "../../../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import "v-calendar/dist/style.css";
import { DatePicker } from "v-calendar";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";

export default {
  name: "listeDisponibilite",
  components: {
    VueMultiselect,
    DatePicker,
    HeaderDashboard,
    IconField,
    InputIcon,
    InputText,
  },
  data() {
    return {
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        formule: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      configUtils:configUtils,
      jour: "",
      firstHoraire: "",
      secondHoraire: "",
      First_heure_start_from: null,
      competences: [],
      First_heure_end_to: null,
      timetables: [],
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
      jourOfMois: [
        { jour: 1 },
        { jour: 2 },
        { jour: 3 },
        { jour: 4 },
        { jour: 5 },
        { jour: 6 },
        { jour: 7 },
        { jour: 8 },
        { jour: 9 },
        { jour: 10 },
        { jour: 11 },
        { jour: 12 },
        { jour: 13 },
        { jour: 14 },
        { jour: 15 },
        { jour: 16 },
        { jour: 17 },
        { jour: 18 },
        { jour: 19 },
        { jour: 20 },
        { jour: 21 },
        { jour: 22 },
        { jour: 23 },
        { jour: 24 },
        { jour: 25 },
        { jour: 26 },
        { jour: 27 },
        { jour: 28 },
        { jour: 29 },
        { jour: 30 },
        { jour: 31 },
      ],
      OtherMonth: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
      OneOtherMonth: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29,
      ],
      tw0therMonth: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28,
      ],
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
      instance
        .get("get_schedule")
        .then((res) => {
          console.log(res);
          this.timetables = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    create_timetable() {
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
              setTimeout(function () {
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
            Swal.fire({
              icon: "error",
              title: "Le jour a déjà été pris",
              showConfirmButton: false,
              timer: 1500,
            });
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
            setTimeout(function () {
              //location.reload(true);
            }, 1500);
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
    handleNewCalendar(){
      this.$router.push('/dashboard/disponibilite')
    }
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
  <div class="page-body position-relative mt-3">
    <HeaderDashboard
    :TitleHeader="'Disponibilités'"
    :subTitleHeader="'Disponibilités'"
  />
    <div
      class="ecran_for_delete delete_article"
      v-show="confirmation_for_delete"
    >
      <div class="card p-5">
        <p class="h3 my-2">Voulez-vous vraiment supprimer?</p>
        <div>
          <button class="btn-lg bg-warning" @click="delete_timetable">
            Supprimer
          </button>
          <button class="btn-lg bg-danger mx-2" @click="not_delete">
            Annuler
          </button>
        </div>
      </div>
    </div>
    <div class="ecran" v-if="modify_timetable">
      <div class="modify_form plan-modify" v-if="timetable_show_id">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 modify-form">
              <div class="card">
                <div class="card-body">
                  <h1 class="badge bg-warning h3">
                    Modifier l'emploi du temps
                  </h1>
                  <div class="form theme-form projectcreate p-5">
                    <form>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <button
                              v-for="date in newDatePickerForUpdate"
                              :key="date"
                              class="button"
                              disabled
                            >
                              {{ date }}
                            </button>
                            <div class="position-relative datepickrs">
                              <DatePicker
                                v-model="selectedJourForUpadte.date"
                                class="datePicker"
                                :min-date="new Date()"
                              >
                                <template
                                  #default="{ togglePopover, hidePopover }"
                                >
                                  <div
                                    class="flex d-flex flex-wrap justify-content-start ps-4"
                                  >
                                    <button
                                      v-for="date in dates"
                                      :key="date.date"
                                      @click.prevent="
                                        dateSelectedForUpadte(
                                          $event,
                                          date,
                                          togglePopover
                                        )
                                      "
                                      ref="button"
                                      class="button"
                                    >
                                      {{ date.date.toLocaleDateString("fr") }}
                                      <em
                                        href="#"
                                        class="bi bi-x text-danger"
                                        @click.prevent="
                                          removeDateForUpdate(date, hidePopover)
                                        "
                                      ></em>
                                    </button>
                                  </div>
                                </template>
                              </DatePicker>
                              <button
                                class="btn btnAdd"
                                :class="dates.length === 1 ? 'd-none' : ''"
                                @click.prevent="addDateForUpdate"
                              >
                                + Ajouter une date
                              </button>
                            </div>
                          </div>
                        </div>
                        <h5 class="text-start"
                          >Premier plage horaire</h5
                        >
                        <div class="col-lg-6" v-if="Horaire_Fisrt != null">
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Horaire_Fisrt[0]"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6" v-if="Horaire_Fisrt != null">
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Horaire_Fisrt[1]"
                              required
                            />
                          </div>
                        </div>
                        <h5 class="text-start"
                          >Deuxieme plage horaire</h5
                        >
                        <div class="col-lg-6" v-if="Horaire_Second != null">
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Horaire_Second[0]"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6" v-else>
                          <div class="mb-3">
                            <label>Heure de début</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Second_heure_start_from"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6" v-if="Horaire_Second != null">
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Horaire_Second[1]"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6" v-else>
                          <div class="mb-3">
                            <label>Heure de fin</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Second_heure_end_to"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              @click.prevent="update_timetable"
                              class="btn-lg btn-warning mx-1"
                            >
                              Modifier
                            </button>
                            <button
                              class="btn-lg btn-danger mx-1"
                              @click.prevent="show_modify"
                            >
                              Annuler
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

    <div class="tab-content" id="top-tabContent">
      <DataTable
      paginator
      :rows="10"
      :globalFilterFields="['formule']"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :value="timetables"
      v-model:filters="filters"
    >
      <template #paginatorstart>
        <div
          style="
            display: flex;
            justify-content: flex-start;
            font-size: 1em;
            border: none;
          "
        >
          Affichage de 1 à 10 sur{{ timetables.length }} entrées.
        </div>
      </template>
      <template #header>
        <div class="conteneur_search">
          <div class="mx-3">
            <button class="btn bg-warning py-2" 
            @click="handleNewCalendar">Nouvelle disponibilitée</button>
          </div>
          <IconField iconPosition="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              style="width: 300px; font-size: 1.5em; border: 2px solid orange"
              v-model="filters['global'].value"
              placeholder="Recherche:"
            />
          </IconField>
        </div>
      </template>
      <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="jour"
        header="Jours"
      >
    <template #body="slotProps">
      <span>
        {{ configUtils.getFormatDateFr(slotProps.data.jour) }}
      </span>
    </template>
    </Column>
      <Column
        style="font-size: 1.8em; padding: 1em; text-align: center"
        field="First_horaire"
        header="Premiere Plage Horaire"
      >
      <template #body="slotProps">
       <span>
        {{configUtils.formatedDisponibilite(slotProps.data.First_horaire) }}
       </span>
      </template>
    </Column>
      <Column
      style="font-size: 1.8em; padding: 1em; text-align: center"
      field="Second_horaire"
      header="Seconde Plage Horaire"
    >
    <template #body="slotProps">
      <span v-if="slotProps.data.Second_horaire">
       {{ configUtils.formatedDisponibilite(slotProps.data.Second_horaire) }}
      </span>
      <span v-else>Néant</span>
     </template>
  </Column>
    <Column
    style="font-size: 1.8em; padding: 1em; text-align: center"
    field="statut"
    header="Actions"
  >
  <template #body="slotProps">
    <div
    class="d-flex justify-content-center align-items-center"
  >
    <em
      class="bi bi-pencil"
      @click="show_timetable(slotProps.data.id)"
    ></em>
    <em
      class="bi bi-trash"
      @click="show_box_confirmation_delete(slotProps.data.id)"
    ></em>
  </div>
  </template>
</Column>
      
    </DataTable>
      <!-- <div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Jours</th>
                    <th class="bg-light">Premiere Plage Horaire</th>
                    <th class="bg-light">Seconde Plage Horaire</th>
                    <th class="bg-light">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in timetables" :key="index">
                    <td>
                      {{ new Date(item.jour).toLocaleDateString() }}
                    </td>
                    <td>
                      {{ item.First_horaire.replace("-", " à ") }}
                    </td>
                    <td v-if="item.Second_horaire">
                      {{ item.Second_horaire.replace("-", " à ") }}
                    </td>
                    <td v-else>Pas de plage horaire</td>
                    <td
                      class="d-flex justify-content-center align-items-center"
                    >
                      <em
                        class="bi bi-pencil"
                        @click="show_timetable(item.id)"
                      ></em>
                      <em
                        class="bi bi-trash"
                        @click="show_box_confirmation_delete(item.id)"
                      ></em>
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
      </div> -->
      <div
        class="tab-pane fade show"
        id="competence"
        role="tabpanel"
        aria-labelledby="competence"
      >
        <div class="container-fluid">
          <div class="row">
            <div>
              <VueMultiselect
                v-model="competence"
                :options="competencesPredf"
                :multiple="true"
                :taggable="true"
                :tag="addTag"
                @update:model-value="addTag"
                label="competence"
                track-by="competence"
                placeholder="selectionne une competence"
                class="vuemulti"
              >
              </VueMultiselect>
              <button class="btn-lg bg-primary" @click="addCompetences">
                Ajouter
              </button>
            </div>
            <div class="col-sm-12 card py-3 px-2">
              <table id="MyTableData" class="table">
                <thead>
                  <tr>
                    <th class="bg-light">Compétences</th>
                    <th class="bg-light">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in competences" :key="index">
                    <td>{{ item.competence }}</td>
                    <td
                      class="d-flex justify-content-center align-items-center"
                    >
                      <em
                        class="bi bi-trash"
                        @click="
                          showBoxConfirmationDeleteCompetences(
                            item.pivot.competence_id
                          )
                        "
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
  </div>
</template>
<style scoped>
.card{
    background-color:white !important;
    padding:2em !important;
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
  background: rgba(0, 0, 0, 0.349);
  display: flex;
  place-items: center;
  justify-content: center;
}
.bi {
  font-size: 1.3em !important;
  margin: 0 0.5em;
  cursor: pointer;
}
.btnAdd {
  position: absolute;
  left: 1em;
  bottom: 3em;
  font-weight: bold;
  background: #052349;
  color: white;
}
.datepickrs {
  padding: 1em 0;
  background: rgba(98, 98, 231, 0.108);
  margin:2em;
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
.text-start{
    text-align:left !important;
    margin-left:1.5em !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
