<script>
import instance from "../../../api/api";
import Swal from "sweetalert2";
import { FilterMatchMode } from "primevue/api";
// import VueMultiselect from "vue-multiselect";
import { configUtils } from "../../../Shared/Utils";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import "v-calendar/dist/style.css";
import { mapActions } from "pinia";
import { useWindowSize } from "@vueuse/core";
import { useTranslateStore } from "../../../store-pinia/Translate/useTranslateStore";
import HeaderDashboard from "../../../Shared/Compoments/HeaderDashboard.vue";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
const loadingSpinner = useLoadingSpinner();

export default {
  name: "listeDisponibilite",
  components: {
    // VueMultiselect,
    // Calendar,
    HeaderDashboard,
    IconField,
    InputIcon,
    InputText,
  },
  data() {
    return {
      isActive: false,
      tab: false,
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
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        formule: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      configUtils: configUtils,
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
      getJourInMonth: "",
      dates: [],
      selectedJourForUpadte: {},
      isMobile: false,
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    timetables_mobile() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.timetables.slice(start, end);
    },
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
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
        // let newDateForTimetable = [];
        // this.dates.forEach((date) => {
        //   newDateForTimetable.push(date.date.toISOString().slice(0, 10));
        //   // console.log(newDateForTimetable);
        // });
        instance
          .put("modify_schedule/" + this.id_timetable_update, {
            First_horaire: this.firstPlageHoraire.replace(",", "-"),
            Second_horaire: this.SecondPlageHoraire.replace(",", "-"),
            totalHour: this.totalHour,
            day: this.newDatePickerForUpdate,
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
          })
          .finally(() => {
            this.get_timetable();
          });
      }
    },
    async get_timetable() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("get_schedule")
        .then((res) => {
          // // console.log(res);
          this.timetables = res.data.data;
          loadingSpinner.launchLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    create_timetable() {
      loadingSpinner.launchLoading(true);
      this.firstHoraire = this.First_heure_start_from.concat(
        "-",
        this.First_heure_end_to
      );
      if (this.Second_heure_start_from != null && this.Second_heure_end_to != !null) {
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
      if (this.Second_heure_start_from != null && this.Second_heure_end_to != !null) {
        let secondHoraire = this.Second_heure_start_from.split(":");
        let TwoSecondHoraire = Number(secondHoraire[0].split(":").toString());
        let minuteTwoSecondHoraire = Number(secondHoraire[1].split(":").toString());

        let minuteTohourOneSecondHoraire = Math.ceil(minuteTwoSecondHoraire / 60);
        totalOneSecondHoraireFrom = TwoSecondHoraire + minuteTohourOneSecondHoraire;

        this.secondHoraireTwo = this.Second_heure_end_to.split(":");
        this.TwoSecondHoraireTwo = Number(this.secondHoraireTwo[0].split(":").toString());
        let minuteTwoSecondHoraireTwo = Number(
          this.secondHoraireTwo[1].split(":").toString()
        );
        let minuteTohourOneSecondHoraireEnd = Math.ceil(minuteTwoSecondHoraireTwo / 60);
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
      // // console.log("TotalHourDisponi", TotalHourDisponi);
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
            // // console.log(res);
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
          })
          .finally(() => {
            loadingSpinner.launchLoading(false);
          });
      }
    },
    show_timetable(id) {
      // // console.log("SHOW_TIMETABLE",id)
      loadingSpinner.launchLoading(true);
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
          // // console.log('this.timetable_show_id.jour',this.timetable_show_id.jour)
          this.newDatePickerForUpdate = [...new Set(newdate)];
          // // console.log('this.newDatePickerForUpdate',this.newDatePickerForUpdate)
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
        })
        .finally(() => {
          loadingSpinner.launchLoading(false);
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
      loadingSpinner.launchLoading(true);
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
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: err.response.data.message,
            showConfirmButton: true,
            // timer: 1500,
          });
        })
        .finally(() => {
          this.get_timetable();
          loadingSpinner.launchLoading(false);
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
          // console.log("COMPETENCE", res.data.data);
          this.competencesPredf = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTag(newTag) {
      // console.log(newTag);
      let brox = newTag;
      this.acquis = brox;
      this.comp = [];
      this.acquis.forEach((el) => {
        this.comp.push(el.id);
      });
      // console.log("THIS.comp", this.comp);
    },
    addJour(Tag) {
      // console.log(Tag);
      let brox = Tag;
      this.acquis = brox;
      this.comp = [];
      // console.log("Tableau", this.comp);
      this.acquis.forEach((el) => {
        this.comp.push(el.jour);
      });
      // console.log("THIS.days", this.comp);
    },
    handleNewCalendar() {
      this.$router.push("/dashboard/disponibilite");
    },
    getOtherTab() {
      this.tab = !this.tab;
      this.isActive = !this.isActive;
    },
    async verifUserProfilEtudiantComplet() {
      await this.$store.dispatch("getInfoUser")
  const user = this.$store.state.infoUserConnected;
  console.log("USER_INFO",user)
  if(user.user.statut.statut === 'etudiant'){
if (!user.competences.length || !user.qualifications.length) {
    this.$router.push('/dashboard/profil');
   }
   if(!user.jours.length){
    this.$router.push('/dashboard/emploi_du_temps');
   }
  }
},
async seeMessageUploadProfil() {
  let message = ''

  if (!this.$store.state.infoUserConnected.qualifications.length) {
    message = 'Veuillez renseigner vos qualifications pour continuer.'
  }

  if (message) {
    Swal.fire({
      icon: 'info',
      title: 'Profil incomplet',
      text: message,
      // timer: 3000,
      // timerProgressBar: true,
      showConfirmButton: true
    })
  }
},
  },
  async created() {
    this.verifUserProfilEtudiantComplet();
    this.seeMessageUploadProfil()
    const { width } = useWindowSize();
    this.$watch(
      () => width.value,
      (newWidth) => {
        this.isMobile = newWidth < 768;
      },
      { immediate: true }
    );
    this.get_timetable();
    this.getAllCompetences();
    this.getAllCompetencesByStudents();
    const now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    this.getJourInMonth = date;
    this.texte = await this.handleTranslate("Mes Disponibilités");
    this.texte1 = await this.handleTranslate(`Voulez-vous vraiment supprimer cette disponibilité?`);
    this.texte2 = await this.handleTranslate("Supprimer");
    this.texte3 = await this.handleTranslate(`Annuler`);
    this.texte4 = await this.handleTranslate("Modifier l'emploi du temps");
    this.texte5 = await this.handleTranslate("+ Ajouter une date");
    this.texte6 = await this.handleTranslate("Premier plage horaire");
    this.texte7 = await this.handleTranslate(`Heure de début`);
    this.texte8 = await this.handleTranslate(`Heure de fin`);
    this.texte9 = await this.handleTranslate(`Deuxième sélection`);
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
    this.texte24 = await this.handleTranslate("Jours");
  },
};
</script>
<template>
  <div class="page-body position-relative mt-3">
    <HeaderDashboard :TitleHeader="texte" :subTitleHeader="texte" />
    <div class="ecran_for_delete delete_article" v-show="confirmation_for_delete">
      <div class="card p-5">
        <p class="h3 my-2" style="color: black">{{ texte1 }}</p>
        <div style="display:flex;justify-content:center;gap:1em;">
          <button class="btn bg-warning" @click="delete_timetable">
            {{ texte2 }}
          </button>
          <button class="btn bg-danger mx-2" @click="not_delete">
            {{ texte3 }}
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
                    {{ texte4 }}
                  </h1>
                  <div class="form theme-form projectcreate p-5">
                    <form>
                      <div class="row">
                        <h5 class="text-start">{{ texte6 }}</h5>
                        <div class="col-lg-6" v-if="Horaire_Fisrt != null">
                          <div class="mb-3">
                            <label>{{ texte7 }}</label>
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
                            <label>{{ texte8 }}</label>
                            <input
                              class="form-control"
                              type="time"
                              v-model="Horaire_Fisrt[1]"
                              required
                            />
                          </div>
                        </div>
                        <section v-if="timetable_show_id.periode === null">
                          <h5 class="text-start">{{ texte9 }}</h5>
                          <div class="col-lg-6" v-if="Horaire_Second != null">
                            <div class="mb-3">
                              <label>{{ texte10 }}</label>
                              <input
                                class="form-control"
                                type="time"
                                v-model="Horaire_Second[0]"
                                required
                              />
                              <!-- <Calendar
                              id="datepicker-timeonly_3"
                              v-model="Horaire_Second[0]"
                              showIcon
                              iconDisplay="input"
                              timeOnly
                              inputId="templatedisplay"
                            /> -->
                            </div>
                          </div>
                          <div class="col-lg-6" v-else>
                            <div class="mb-3">
                              <label>{{ texte11 }}</label>
                              <!-- <Calendar
                              id="datepicker-timeonly_3"
                              v-model="Second_heure_start_from"
                              showIcon
                              iconDisplay="input"
                              timeOnly
                              inputId="templatedisplay"
                            /> -->
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
                              <label>{{ texte12 }}</label>
                              <!-- <Calendar
                              id="datepicker-timeonly_3"
                              v-model="Horaire_Second[1]"
                              showIcon
                              iconDisplay="input"
                              timeOnly
                              inputId="templatedisplay"
                            /> -->
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
                              <label>{{ texte12 }}</label>
                              <!-- <Calendar
                              id="datepicker-timeonly_3"
                              v-model="Second_heure_end_to"
                              showIcon
                              iconDisplay="input"
                              timeOnly
                              inputId="templatedisplay"
                            /> -->
                              <input
                                class="form-control"
                                type="time"
                                v-model="Second_heure_end_to"
                                required
                              />
                            </div>
                          </div>
                        </section>
                      </div>
                      <div class="row">
                        <div class="col">
                          <div class="text-end">
                            <button
                              @click.prevent="update_timetable"
                              class="btn bg-warning mx-1"
                            >
                              {{ texte13 }}
                            </button>
                            <button
                              class="btn btn-danger mx-1"
                              @click.prevent="show_modify"
                            >
                              {{ texte3 }}
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

    <div class="page-title d-flex">
      <ol
        :class="!isActive ? 'breadcrumb' : 'breadcrumb_two'"
        class="mx-3 p-5"
        @click="getOtherTab"
      >
        <li class="breadcrumb-item">Horaire</li>
      </ol>
      <ol
        :class="isActive ? 'breadcrumb' : 'breadcrumb_two'"
        class="mx-3 p-5"
        @click="getOtherTab"
      >
        <li class="breadcrumb-item">Période</li>
      </ol>
    </div>
    <div v-if="!isMobile">
      <div class="tab-content" id="top-tabContent" v-show="!tab">
        <DataTable
          paginator
          :rows="10"
          :globalFilterFields="['formule']"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :value="timetables.filter((item) => !item.periode)"
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
                <button class="btn bg-warning py-2" @click="handleNewCalendar">
                  {{ texte14 }}
                </button>
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
            :header="texte24"
          >
            <template #body="slotProps">
              <span v-if="!slotProps.data.periode">
                {{ configUtils.getFormatDateFr(slotProps.data.jour) }}
              </span>
              <span v-else>
                {{ slotProps.data.jour }}
              </span>
            </template>
          </Column>
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="First_horaire"
            :header="texte15"
          >
            <template #body="slotProps">
              <span v-if="!slotProps.data.periode">
                {{ configUtils.formatedDisponibilite(slotProps.data.First_horaire) }}
              </span>
              <span v-else>
                Du {{ configUtils.getFormatDateFr(slotProps.data.periode_debut) }} à
                {{ slotProps.data.hour_periode_debut }} au
                {{ configUtils.getFormatDateFr(slotProps.data.periode_fin) }} à
                {{ slotProps.data.hour_periode_fin }}
              </span>
            </template>
          </Column>
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="Second_horaire"
            :header="texte16"
          >
            <template #body="slotProps">
              <span v-if="slotProps.data.Second_horaire">
                {{ configUtils.formatedDisponibilite(slotProps.data.Second_horaire) }}
              </span>
              <span v-else>{{ texte17 }}</span>
            </template>
          </Column>
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="statut"
            :header="texte18"
          >
            <template #body="slotProps">
              <div
                v-if="
                  new Date(slotProps.data.jour).toLocaleDateString('fr') >=
                  new Date().toLocaleDateString('fr')
                "
                class="d-flex justify-content-center align-items-center"
              >
                <em class="bi bi-pencil" @click="show_timetable(slotProps.data.id)"></em>
                <em
                  class="bi bi-trash"
                  @click="show_box_confirmation_delete(slotProps.data.id)"
                ></em>
              </div>
              <em v-else class="bi bi-dash-circle text-danger"></em>
            </template>
          </Column>
        </DataTable>
        <div v-if="!timetables.length">
          <h1 class="not_data">Pas de donnée.</h1>
        </div>
      </div>
      <div class="tab-content" id="top-tabContent" v-show="tab">
        <DataTable
          paginator
          :rows="10"
          :globalFilterFields="['formule']"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          :value="timetables.filter((item) => item.periode === 1)"
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
                <button class="btn bg-warning py-2" @click="handleNewCalendar">
                  {{ texte14 }}
                </button>
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
          <!-- <Column
          style="font-size: 1.8em; padding: 1em; text-align: center"
          field="jour"
          :header="'Période'"
        >
          <template #body="slotProps">
            <span v-if="!slotProps.data.periode">
              {{ configUtils.getFormatDateFr(slotProps.data.jour) }}
            </span>
            <span v-else>
              {{ slotProps.data.jour }}
            </span>
          </template>
        </Column> -->
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="First_horaire"
            :header="'Période'"
          >
            <template #body="slotProps">
              <span v-if="!slotProps.data.periode">
                {{ configUtils.formatedDisponibilite(slotProps.data.First_horaire) }}
              </span>
              <span v-else>
                Du {{ configUtils.getFormatDateFr(slotProps.data.periode_debut) }} à
                {{ slotProps.data.hour_periode_debut }} au
                {{ configUtils.getFormatDateFr(slotProps.data.periode_fin) }} à
                {{ slotProps.data.hour_periode_fin }}
              </span>
            </template>
          </Column>
          <Column
            style="font-size: 1.8em; padding: 1em; text-align: center"
            field="statut"
            :header="texte18"
          >
            <template #body="slotProps">
              <div
                v-if="
                  new Date(slotProps.data.periode_fin).toLocaleDateString('fr') >=
                  new Date().toLocaleDateString('fr')
                "
                class="d-flex justify-content-center align-items-center"
              >
                <em class="bi bi-pencil" @click="show_timetable(slotProps.data.id)"></em>
                <em
                  class="bi bi-trash"
                  @click="show_box_confirmation_delete(slotProps.data.id)"
                ></em>
              </div>
              <em v-else class="bi bi-dash-circle text-danger"></em>
            </template>
          </Column>
        </DataTable>
        <div v-if="!timetables.length">
          <h1 class="not_data">Pas de donnée.</h1>
        </div>
      </div>
    </div>
    <div v-else class="mobile-container p-2">
      <div style="text-align:right;" class="mx-3">
                <button class="btn bg-warning py-2" @click="handleNewCalendar">
                  {{ texte14 }}
                </button>
              </div>
      <!-- HORAIRES SIMPLES -->
      <section v-show="!tab" style="padding: 1em">
        <div
          v-for="(item, i) in timetables_mobile.filter((t) => !t.periode)"
          :key="i"
          class="mobile-card p-3 mb-3"
        >
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="fw-bold text-dark">
              {{ configUtils.getFormatDateFr(item.jour) }}
            </h5>
            <!-- <span
          class="badge bg-warning text-dark"
          v-if="
            new Date(item.jour).toLocaleDateString('fr') >=
            new Date().toLocaleDateString('fr')
          "
        >
          À venir
        </span>
        <span class="badge bg-secondary" v-else>Expiré</span> -->
          </div>

          <p class="mb-1">
            <strong>{{ texte15 }} :</strong>
            {{ configUtils.formatedDisponibilite(item.First_horaire) }}
          </p>

          <p class="mb-1">
            <strong>{{ texte16 }} :</strong>
            <span v-if="item.Second_horaire">
              {{ configUtils.formatedDisponibilite(item.Second_horaire) }}
            </span>
            <span v-else>{{ texte17 }}</span>
          </p>

          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              v-if="
                new Date(item.jour).toLocaleDateString('fr') >=
                new Date().toLocaleDateString('fr')
              "
              class="btn bg-warning btn-sm"
              @click="show_timetable(item.id)"
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button
              v-if="
                new Date(item.jour).toLocaleDateString('fr') >=
                new Date().toLocaleDateString('fr')
              "
              class="btn btn-danger btn-sm mx-2"
              @click="show_box_confirmation_delete(item.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
            <i v-else class="bi bi-dash-circle text-danger" style="font-size: 1.3em"></i>
          </div>
        </div>
        <div class="d-flex justify-content-center my-4" v-if="timetables_mobile.filter((t) => !t.periode).length > 0">
          <n-pagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="timetables_mobile.filter((t) => !t.periode).length"
            show-size-picker
            :page-sizes="[5, 10, 20]"
            @update:page="currentPage = $event"
            @update:page-size="
              (size) => {
                pageSize = size;
                currentPage = 1;
              }
            "
          />
        </div>
      </section>

      <!-- PÉRIODES -->
      <section v-show="tab" style="padding: 1em">
        <div
          v-for="(item, i) in timetables_mobile.filter((t) => t.periode)"
          :key="i"
          class="mobile-card p-3 mb-3"
        >
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="fw-bold text-dark">Période</h5>
            <span
              class="badge bg-warning text-dark"
              v-if="
                new Date(item.periode_fin).toLocaleDateString('fr') >=
                new Date().toLocaleDateString('fr')
              "
            >
              Active
            </span>
            <span class="badge bg-secondary" v-else>Terminée</span>
          </div>

          <p class="mb-1">
            <strong>Du :</strong>
            {{ configUtils.getFormatDateFr(item.periode_debut) }}
            <strong>à</strong> {{ item.hour_periode_debut }}
          </p>

          <p class="mb-1">
            <strong>Au :</strong>
            {{ configUtils.getFormatDateFr(item.periode_fin) }}
            <strong>à</strong> {{ item.hour_periode_fin }}
          </p>

          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              v-if="
                new Date(item.periode_fin).toLocaleDateString('fr') >=
                new Date().toLocaleDateString('fr')
              "
              class="btn bg-warning btn-sm"
              @click="show_timetable(item.id)"
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button
              v-if="
                new Date(item.periode_fin).toLocaleDateString('fr') >=
                new Date().toLocaleDateString('fr')
              "
              class="btn btn-danger btn-sm mx-2"
              @click="show_box_confirmation_delete(item.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
            <i v-else class="bi bi-dash-circle text-danger" style="font-size: 1.3em"></i>
          </div>
        </div>
        <div class="d-flex justify-content-center my-4" v-if="timetables_mobile.filter((t) => t.periode).length > 0">
          <n-pagination
            v-model:page="currentPage"
            :page-size="pageSize"
            :item-count="timetables_mobile.filter((t) => t.periode).length"
            show-size-picker
            :page-sizes="[5, 10, 20]"
            @update:page="currentPage = $event"
            @update:page-size="
              (size) => {
                pageSize = size;
                currentPage = 1;
              }
            "
          />
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
.card {
  background-color: white !important;
  padding: 2em !important;
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
  margin: 2em;
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
.text-start {
  text-align: left !important;
  margin-left: 1.5em !important;
}
.conteneur_search {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1em;
}

@media (max-width: 768px) {
  .mobile-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-radius: 12px;
    padding: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background: #25535f;
    color: white;
  }
  .mobile-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  /* Modal overlay */
  .plan-modify,
  .delete_article {
    padding: 1em;
    justify-content: center;
    overflow-y: auto;
  }

  /* Card inside modal */
  .plan-modify .card,
  .delete_article .card {
    width: 100%;
    box-sizing: border-box;
  }
  .modify-form {
    width: 350px !important;
  }

  /* Form inside modal */
  .modify-form .form .row {
    flex-direction: column !important;
  }

  .modify-form .form .col-lg-6 {
    width: 100% !important;
    margin-bottom: 1em;
  }

  /* Headers inside form */
  .modify-form h5 {
    font-size: 1em !important;
    margin-left: 0 !important;
    margin-bottom: 0.5em;
  }

  /* Inputs */
  .modify-form input[type="time"] {
    width: 100%;
    font-size: 1em;
    padding: 0.5em;
  }

  /* Card body spacing */
  .card-body {
    padding: 0 !important;
  }

  .breadcrumb,
  .breadcrumb_two {
    font-size: 0.9em;
    padding: 0.25em 0.5em;
  }

  /* Table wrapper for horizontal scroll */
  .p-datatable-wrapper {
    overflow-x: auto;
  }

  .p-datatable th,
  .p-datatable td {
    font-size: 0.9em !important;
    padding: 0.5em !important;
  }

  /* Icons in tables */
  .bi {
    font-size: 1em !important;
    margin: 0 0.3em;
  }

  /* Search container */
  .conteneur_search {
    flex-direction: column;
    gap: 0.5em;
  }

  .conteneur_search input {
    width: 100% !important;
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
