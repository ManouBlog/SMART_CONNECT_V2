<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";
import VueMultiselect from "vue-multiselect";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "v-calendar/dist/style.css";
import { DatePicker } from "v-calendar";

export default {
  name: "CreateTimetableView",
  components: {
    VueMultiselect,
    DatePicker,
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
    // addNewDateForUpdate() {
    //   this.datesPickersUpdate.push({
    //     date: new Date(),
    //   });
    //   console.log("mes Dates", this.datesPickersUpdate);
    //   this.$nextTick(() => {
    //     const btn = this.$refs.button[this.$refs.button.length - 1];
    //     btn.click();
    //   });
    // },
    removeDate(date, hide) {
      this.datesPickers = this.datesPickers.filter((d) => d !== date);
      hide();
    },
    // removeDateForUpdate(date, hide) {
    //   this.datesPickersUpdate = this.datesPickersUpdate.filter(
    //     (d) => d !== date
    //   );
    //   hide();
    // },
    dateSelected(e, date, toggle) {
      this.selecteDatepickers = date;
      toggle({ ref: e.target });
    },
    // dateNewSelectedUpdate(e, date, toggle) {
    //   this.datesPickersUpdate = date;
    //   toggle({ ref: e.target });
    // },
    update_timetable() {
      this.firstPlageHoraire = this.Horaire_Fisrt.toString();
      let FirstHour = this.Horaire_Fisrt;
      var SecondHour;
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

      var oneHoraireFirstHoraire = FirstHour[0].split(":");
      var oneHoraireHour = Number(oneHoraireFirstHoraire[0]);
      var oneHoraireMinute = Number(oneHoraireFirstHoraire[1]);
      var convertOneHoraireminuteInHour = Math.ceil(oneHoraireMinute / 60);
      var totalHourOneHoraire = oneHoraireHour + convertOneHoraireminuteInHour;

      var twoHoraireSecondHoraire = FirstHour[1].split(":");
      var twoHoraireHour = Number(twoHoraireSecondHoraire[0]);
      var twoHoraireMinute = Number(twoHoraireSecondHoraire[1]);
      var convertTwoHoraireminuteInHour = Math.ceil(twoHoraireMinute / 60);
      var totalHourTwoHoraire = twoHoraireHour + convertTwoHoraireminuteInHour;

      var totalGlobalHoraire = totalHourTwoHoraire - totalHourOneHoraire;
      var SecondHoraireHour, SecondHoraireHourSecondHoraire;
      console.log(totalGlobalHoraire);
      if (this.Horaire_Second != null) {
        var SecondHoraireFirstHoraire = SecondHour[0].split(":");
        SecondHoraireHour = Number(SecondHoraireFirstHoraire[0]);
        var SecondHoraireMinute = Number(SecondHoraireFirstHoraire[1]);
        var convertSecondHoraireminuteInHour = Math.ceil(
          SecondHoraireMinute / 60
        );
        var totalHourSecondHoraireOne =
          SecondHoraireHour + convertSecondHoraireminuteInHour;

        var SecondHoraireSecondHoraire = SecondHour[1].split(":");
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
        axios
          .put(
            "http://192.168.1.27:8000/api/modify_schedule/" +
              this.id_timetable_update,
            {
              First_horaire: this.firstPlageHoraire.replace(",", "-"),
              Second_horaire: this.SecondPlageHoraire.replace(",", "-"),
              totalHour: this.totalHour,
              day: newDateForTimetable,
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
                this.modify_timetable = false;
                this.id_timetable_update = null;
                location.reload(true);
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
            // Swal.fire({
            //   icon: "info",
            //   title:
            //     "Vous ne pouvez pas modifié le jour, car le jour à été selectionné pour un job.",
            //   showConfirmButton: false,
            //   timer: 2000,
            // });
          });
      }
    },
    get_timetable() {
      this.spinner = true;
      axios
        .get("http://192.168.1.27:8000/api/get_schedule", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
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
      var oneHoraire = this.First_heure_end_to.split(":");
      this.hour = Number(oneHoraire[0].split(":").toString());
      var minute = Number(oneHoraire[1].split(":").toString());
      var minuteTohour = Math.ceil(minute / 60);
      var totalOneHoraire = this.hour + minuteTohour;

      var twoHoraire = this.First_heure_start_from.split(":");
      this.twoHoraireHour = Number(twoHoraire[0].split(":").toString());
      var minuteTwoHoraire = Number(twoHoraire[1].split(":").toString());
      var minuteTohourTwo = Math.ceil(minuteTwoHoraire / 60);
      var totalTwoHoraire = this.twoHoraireHour + minuteTohourTwo;

      var totalOneSecondHoraireTwoEnd, totalOneSecondHoraireFrom;
      if (
        this.Second_heure_start_from != null &&
        this.Second_heure_end_to != !null
      ) {
        var secondHoraire = this.Second_heure_start_from.split(":");
        var TwoSecondHoraire = Number(secondHoraire[0].split(":").toString());
        var minuteTwoSecondHoraire = Number(
          secondHoraire[1].split(":").toString()
        );

        var minuteTohourOneSecondHoraire = Math.ceil(
          minuteTwoSecondHoraire / 60
        );
        totalOneSecondHoraireFrom =
          TwoSecondHoraire + minuteTohourOneSecondHoraire;

        this.secondHoraireTwo = this.Second_heure_end_to.split(":");
        this.TwoSecondHoraireTwo = Number(
          this.secondHoraireTwo[0].split(":").toString()
        );
        var minuteTwoSecondHoraireTwo = Number(
          this.secondHoraireTwo[1].split(":").toString()
        );
        var minuteTohourOneSecondHoraireEnd = Math.ceil(
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
        axios
          .post(
            "http://192.168.1.27:8000/api/create_schedule",
            {
              jour: DateRendezVous,
              First_horaire: this.firstHoraire,
              Second_horaire: this.secondHoraire,
              totalHour: TotalHourDisponi,
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
      axios
        .get("http://192.168.1.27:8000/api/get_schedule", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
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
      axios
        .post(
          "http://192.168.1.27:8000/api/addCompetences",
          {
            competence: this.comp,
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
      axios
        .delete(
          "http://192.168.1.27:8000/api/delete_schedule/" + this.id_for_delete,
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
            this.confirmation_for_delete = !this.confirmation_for_delete;
            setTimeout(function () {
              location.reload(true);
            }, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteMyCompetence() {
      axios
        .delete(
          "http://192.168.1.27:8000/api/deleteCompetencesOfStudents/" +
            this.id_for_delete,
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
            this.confirmation_for_delete = !this.confirmation_for_delete;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllCompetencesByStudents() {
      axios
        .get("http://192.168.1.27:8000/api/getCompetenceByStudents", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("AllCompetences", res.data.data);
          if (res.data.status === true) {
            this.competences = res.data.data.competences;
          }
        });
    },
    getAllCompetences() {
      axios
        .get("http://192.168.1.27:8000/api/GetAllCompetences")
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
  <div class="Myspinner" v-show="spinner">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
  <div class="page-body position-relative">
    <div
      class="ecran_for_delete delete_article"
      v-show="confirmation_for_delete"
    >
      <div class="card p-5">
        <p class="h3 my-2">Voulez-vous vraiment supprimer?</p>
        <div>
          <button class="btn bg-primary mx-2" @click="not_delete">
            Annuler
          </button>
          <button class="btn bg-danger" @click="delete_timetable">
            Supprimer
          </button>
        </div>
      </div>
    </div>
    <div class="ecran" v-if="modify_timetable">
      <div class="modify_form plan-modify" v-if="timetable_show_id">
        <div class="container">
          <div class="row">
            <div class="col-sm-10 modify-form">
              <div class="card">
                <div class="card-body">
                  <h1 class="badge bg-primary h3">
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
                        <label class="badge bg-info"
                          >Premier plage horaire</label
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
                        <label class="badge bg-warning"
                          >Deuxieme plage horaire</label
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
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Emploi du temps</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid starts-->
    <div class="col-sm-12 box-col-12">
      <div class="card timetable">
        <div class="social-tab">
          <ul class="nav nav-tabs" id="top-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="top-timeline"
                data-bs-toggle="tab"
                href="#voir_emploi_temps"
                role="tab"
                aria-controls="voir_emploi_temps"
                aria-selected="true"
                ><i data-feather="clock"></i>Voir mon emploi du temps</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="top-about"
                data-bs-toggle="tab"
                href=" #timetable"
                role="tab"
                aria-controls="timetable"
                aria-selected="false"
                ><em data-feather="alert-circle"></em>Créer une disponibilité
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-content" id="top-tabContent">
      <div
        class="tab-pane fade"
        id="timetable"
        role="tabpanel"
        aria-labelledby="timetable"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="form theme-form projectcreate">
                    <form @submit.prevent="create_timetable">
                      <div class="row">
                        <!-- <div class="col-lg-12">
                          <div class="mb-3">
                            <label>Choisir un jour</label>
                            <VueMultiselect
                              v-if="getJourInMonth == jourOfMois.length"
                              v-model="jour"
                              :options="jourOfMois"
                              :multiple="true"
                              :taggable="true"
                              :tag="addJour"
                              @update:model-value="addJour"
                              label="jour"
                              track-by="jour"
                              placeholder="selectionne un jour"
                              class="vuemulti"
                            >
                            </VueMultiselect>
                            <select
                              class="form-select"
                              v-else-if="getJourInMonth == OtherMonth.length"
                              v-model="jour"
                              required
                            >
                              <option value="" disabled>
                                Sélectionne un jour
                              </option>
                              <option
                                :value="item"
                                v-for="item in OtherMonth"
                                :key="item"
                              >
                                {{ item }}
                              </option>
                            </select>
                            <select
                              v-else-if="getJourInMonth == OneOtherMonth.length"
                              class="form-select"
                              v-model="jour"
                              required
                            >
                              <option value="" disabled>
                                Sélectionne un jour
                              </option>
                              <option
                                :value="item"
                                v-for="item in OneOtherMonth"
                                :key="item"
                              >
                                {{ item }}
                              </option>
                            </select>
                            <select
                              v-else
                              class="form-select"
                              v-model="jour"
                              required
                            >
                              <option value="" disabled>
                                Sélectionne un jour
                              </option>
                              <option
                                :value="item"
                                v-for="item in tw0therMonth"
                                :key="item"
                              >
                                {{ item }}
                              </option>
                            </select>
                          </div>
                        </div> -->
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
                        <label class="badge bg-info"
                          >Premier plage horaire</label
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
                        <label class="badge bg-warning"
                          >Deuxieme plage horaire</label
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

                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              class="btn btn-secondary me-3"
                              type="submit"
                            >
                              Créer
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

      <div
        class="tab-pane fade show active"
        id="voir_emploi_temps"
        role="tabpanel"
        aria-labelledby="voir_emploi_temps"
      >
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
                  <tr v-for="(item, index) in this.timetables" :key="index">
                    <td>{{ new Date(item.jour).toLocaleDateString() }}</td>
                    <td>{{ item.First_horaire.replace("-", " à ") }}</td>
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
            </div>
          </div>
        </div>
      </div>
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
              <button class="btn bg-primary" @click="addCompetences">
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
    <!-- Container-fluid Ends-->
  </div>
</template>
<style scoped>
.flex {
  padding: 1em 0;
}
h3 {
  text-transform: none !important;
}
label {
  text-align: left !important;
}
.btn-secondary {
  background: rgb(5, 35, 73) !important;
  border: 1px solid rgb(5, 35, 73) !important;
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
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
