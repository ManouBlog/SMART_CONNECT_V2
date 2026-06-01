<script>
import instance from "../../api/api";
import Swal from "sweetalert2";
import "v-calendar/dist/style.css";
import { Calendar } from "v-calendar";
import { configUtils } from "../../Shared/Utils";
import { mapActions } from "pinia";
import { useTranslateStore } from "../../store-pinia/Translate/useTranslateStore";
import { useLoadingSpinner } from "../../store-pinia/LoadingSpinner/useLoadingSpinner";
import "@kong/kongponents/dist/style.css";
import HeaderDetailStudent from "./features/HeaderDetailStudent.vue";
import BodyExperience from "./features/BodyExperience.vue";
const loadingSpinner = useLoadingSpinner();
export default {
  components: {
    Calendar,
    HeaderDetailStudent,
    BodyExperience,
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
      configUtils: configUtils,
      lieu: "",
      datesChoice: [],
      dateRendezVousStudentWithEntreprise: null,
      MyDateRendezVous: [],
      user: this.$store.state.user,
      competences: "",
      competence: "",
      contacter: false,
      jours: [],
      dateDebut: "",
      dateFin: "",
      page: 1,
      details_timetable: false,
      id_detail_timetable: "",
      timetable_for_student: null,
      schedule: "",
      compte: 4,
      hideButton: false,
      MylistEmploi: null,
      location: "",
      list: [],
      contrat: false,
      NewListEmploi: "",
      isLoading: true,
      length: 5,
      hideButtons: false,
      isWhished: [],
      lengthOfMylistEmploi: "",
      spinner: false,
      Myarray: [],
      showEndResearch: false,
      langage: [],
      selected: null,
      newlist: [],
      color: false,
      selectedService: [],
      verfIfStudentExistInWishlist: [],
      addColor: false,
      Today: new Date().toJSON().slice(0, 10),
      showCalender: false,
      datesPickers: [],
      selecteDatepickers: {},
      checkboxDate: false,
      checkbox: false,
      option: "",
      MyJour: null,
      moreExist: false,
      nextPage: 0,
      loadSpinner: false,
      competencesPredefini: [],
      range: {
        start: new Date(),
        end: new Date(),
      },
      rangeSearch: {
        start: new Date(),
        end: new Date(),
      },
      days: [],
      showCalenderFilter: false,
      selectedOffreWithDate: null,
      selectedOffreWithPeriode: "",
      perPage: 3,
      currentPage: 1,
      totalPages: "",
      maxVisibleButtons: "2",
      listAbonnement: [],
    };
  },
  computed: {
    paginatedData() {
      let start = this.currentPage * this.perPage - this.perPage;
      let end = start + this.perPage;
      return this.timetable_for_student?.user?.rated_users?.slice(start, end);
    },
    startPage() {
      if (this.currentPage === 1) return 1;
      if (this.currentPage === this.totalPages)
        return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons - 1);
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      let range = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({ number: i, isDisabled: i === this.currentPage });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    list_emploi() {
      if (this.location !== "") {
        return this.list.filter((item) => {
          return item.commune.toLowerCase().includes(this.location.toLowerCase());
        });
      }
      return this.list.slice(0, this.length);
    },
    jourOfMonth() {
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let nombre = "0";
      if (month < 10 || month < 11 || month < 12) {
        nombre = nombre + month;
      }
      return [
        ...this.jourOfMois.map((element) => ({
          jou: year + "-" + nombre + "-" + element.jour,
        })),
      ];
    },
    dates() {
      return this.days.map((day) => day.date);
    },
    attribut() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },

    attributes() {
      // console.log("schedule23",this.schedule)
      return [
        ...this.schedule?.map((time) => ({
          dates: new Date(time.jour),
          highlight: {
            color: time.job == 3 ? "gray" : time.job == 1 ? "red" : "green",
            fillMode: time.job == 3 ? "light" : "solid",
          },
          popover: {
            label: {
              one: this.ifPeriodeDate(time),
              two: time.Second_horaire,
            },
            visibility: "hover",
          },
        })),
      ];
    },
    idParamsItem() {
      return this.$route.params.id;
    },
    idParamsUser_id() {
      return this.$route.params.user_id;
    },
  },
  watch: {
    idParamsItem(newValue) {
      // console.log("oldValue", oldValue);
      if (newValue) {
        this.getDetailStudent();
      }
    },
  },
  methods: {
    ...mapActions(useTranslateStore, ["handleTranslate"]),
    seeAllAbonnement() {
      this.$router.push({ name: "abonnements" });
    },
    splitDateRanges(dateArray) {
      const result = [];

      for (const dateStr of dateArray) {
        if (dateStr.includes(" A ")) {
          const [startDate, endDate] = dateStr.split(" A ");
          result.push(startDate, endDate);
        } else {
          result.push(dateStr);
        }
      }

      return result;
    },
    getDatesBetween(data) {
      if(data){
        const dates = [];
for (const item of data) {
        if (item.periode) {
          const [startDate, endDate] = item.jour.split(" A ");
          let currentDate = new Date(startDate);
          const end = new Date(endDate);
          while (currentDate <= end) {
            dates.push({
              ...item,
              jour: new Date(currentDate).toISOString().split("T")[0],
              periode: 1,
              periode_debut: startDate,
              periode_fin: endDate,
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        } else {
          dates.push({ ...item });
        }
      }

      return dates;
      }else{
        return;
      }
      
    },
    splitDateRangeObjects(data) {
      const result = [];

      for (const item of data) {
        if (item.periode_debut) {
          const [startDate, endDate] = item.jour.split(" A ");
          result.push({
            ...item,
            id: item.id * 10 + 1,
            jour: startDate,
            periode: 1,
            periode_debut: startDate,
            periode_fin: endDate,
          });
          result.push({
            ...item,
            id: item.id * 10 + 2,
            jour: endDate,
            periode: 1,
            periode_debut: startDate,
            periode_fin: endDate,
          });
        } else {
          result.push({ ...item });
        }
      }

      return result;
    },
    ifPeriodeDate(periode) {
      if (periode.periode) {
        return `Du ${new Date(periode.periode_debut).toLocaleString("fr")} à ${
          periode.hour_periode_debut
        } au ${new Date(periode.periode_fin).toLocaleString("fr")} à ${
          periode.hour_periode_fin
        }`;
      } else {
        return periode.First_horaire;
      }
    },
    async getDetailStudent() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("FiltreTimetable", { params: { recipient_id: this.idParamsItem } })
        .then((res) => {
          this.NewListEmploi = res.data.data;
          this.dateRendezVousStudentWithEntreprise = res.data.date;
          let dateOfStudent = [];
          this.dateRendezVousStudentWithEntreprise.forEach((element) => {
            if (element.student_id === Number(this.idParamsItem)) {
              dateOfStudent.push(element);
            }
          });

          this.MyDateRendezVous = dateOfStudent;
       
          this.timetable_for_student = this.NewListEmploi.find(
            (item) => item.id === Number(this.idParamsItem)
          );
          // console.log("timetable_for_student", this.timetable_for_student);
          this.totalPages = Math.ceil(this.timetable_for_student?.user?.rated_users?.length / 2);
          this.schedule = this.getDatesBetween(this.timetable_for_student?.jours);

          this.schedule?.forEach((item) => {
            this.MyDateRendezVous?.forEach((date) => {
              if (
                item.jour === date.date_debut ||
                item.jour === date.date_fin ||
                item.jour === date.date ||
                (item.jour > date.date_debut && item.jour < date.date_fin)
              ) {
                if (date.contrat === 1) item.job = 1;
              }
            });
            item.jou = new Date(item.jour).getDate();
            item.month = new Date(item.jour).getMonth() + 1;
            item.year = new Date(item.jour).getFullYear();
            if (
              JSON.stringify(new Date(item.jour)) <
              JSON.stringify(new Date().toISOString().slice(0, 10))
            ) {
              item.job = 3;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loadingSpinner.launchLoading(false);
          this.isLoading = false;
        });
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    onClickFirstPage() {
      this.onPageChange(this.currentPage - 1);
    },
    onClickPreviousPage() {
      this.onPageChange(this.currentPage - 1);
    },
    onClickPage(page) {
      this.onPageChange(page);
    },
    onClickNextPage() {
      this.onPageChange(this.currentPage + 1);
    },
    onClickLastPage() {
      this.onPageChange(this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
    async getAllCompetences() {
      try {
        const reponse = await instance.get("GetAllCompetences");
        this.competences = reponse.data.data.filter(c => c.categorie_id !== null);
      } catch (e) {
        console.log(e);
      }
    },
    showCalenderDate() {
      this.showCalenderFilter = !this.showCalenderFilter;
    },
    onDayClick(day) {
      const idx = this.days.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
      }
      if (this.Myarray.length) {
        let filterArray = [];
        this.Myarray.forEach((item) => {
          this.days.forEach((arr) => {
            if (item.days.includes(arr.id)) {
              filterArray.push(item);
            }
          });
        });
        this.list = [...new Set(filterArray)];
      }
      this.MylistEmploi.forEach((element) => {
        this.days.forEach((e) => {
          if (element.days.includes(e.id)) {
            this.Myarray.push(element);
          }
        });
      });
      this.list = [...new Set(this.Myarray)];

      if (!this.days.length) {
        this.list = this.MylistEmploi;
        this.hideButtons = true;
      }

      this.showCalenderFilter = !this.showCalenderFilter;
    },
    showDate() {
      this.checkboxDate = !this.checkboxDate;
      if (this.checkbox === true) {
        this.checkbox = !this.checkbox;
      }
      if (this.checkboxDate === true) {
        this.opinion = "date";
        this.dateDebut = "";
        this.dateFin = "";
      }
    },
    showPeriode() {
      if (this.checkboxDate === true) {
        this.checkboxDate = !this.checkboxDate;
      }
      this.checkbox = !this.checkbox;
      if (this.checkbox === true) {
        this.opinion = "periode";
        this.datesChoice = [];
      }
    },
    addTag(newTag) {
      this.Myarray = [];

      this.MylistEmploi.forEach((element) => {
        newTag.forEach((e) => {
          element.jours.forEach((item) => {
            if (item.jour === e.jou) {
              this.Myarray.push(element);
            }
          });
        });
      });
      this.list = [...new Set(this.Myarray)];
      this.hideButtons = true;

      if (!newTag.length) {
        this.list = this.MylistEmploi;
        this.hideButtons = true;
      }
    },
    addComp(newTag) {
      if (this.Myarray.length > 0) {
        let newArray = [];
        this.Myarray.forEach((item) => {
          newTag.forEach((e) => {
            if (item.acquis.includes(e.competence)) {
              newArray.push(item);
            }
          });
        });
        this.list = [...new Set(newArray)];
        if (!newTag.length) {
          this.Myarray = [];
          this.MylistEmploi.forEach((el) => {
            this.days.forEach((item) => {
              if (el.days.includes(item.id)) {
                this.Myarray.push(el);
              }
            });
          });
          this.list = [...new Set(this.Myarray)];
        }
      }
      if (!this.Myarray.length) {
        this.Myarray = [];
        this.MylistEmploi.forEach((element) => {
          newTag.forEach((e) => {
            if (element.acquis.includes(e.competence)) {
              this.Myarray.push(element);
            }
          });
        });
        this.list = [...new Set(this.Myarray)];
        this.hideButtons = true;

        if (!newTag.length) {
          this.list = this.MylistEmploi;
          this.hideButtons = false;
        }
      }
    },
    deleteDays(day) {
      const idx = this.days.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        this.days.splice(idx, 1);
      }
      this.Myarray = [];
      this.MylistEmploi.forEach((elet) => {
        this.days.forEach((item) => {
          if (elet.days.includes(item.id)) {
            this.Myarray.push(elet);
          }
        });
      });
      this.list = [...new Set(this.Myarray)];
      if (!this.days.length) {
        this.list = this.MylistEmploi;
        this.hideButtons = true;
      }
    },
    cleanArray() {
      this.Myarray = [];
      this.list = [];
    },
    selectJour(jour) {
      this.Myarray = [];
      this.list = [];
      this.MylistEmploi.forEach((element) => {
        jour.forEach((e) => {
          if (element.days.includes(e)) {
            this.Myarray.push(element);
          }
        });
      });
      this.list = [...new Set(this.Myarray)];
    },
    addPersonAtWishLit(person) {
      this.$store.commit("addPersonAtWishLit", person);
      this.isWhished[person.id] = !this.isWhished[person.id];
    },
    defineTotalHour(hour) {
      if (hour.length > 0) {
        return hour.reduce((a, b) => a + b);
      }
    },
    loadMore() {
      if (this.length > this.list.length) return;
      this.length = this.length + 4;
      if (this.length === this.list.length) {
        this.showEndResearch = !this.showEndResearch;
      }
    },
    async get_list_emploi() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("list_emplois_temps")
        .then((res) => {
           // console.log("list_emplois_temps90",res);
          res.data.data.forEach((element) => {
            let days = [];
            let hours = [];
            let competences = [];

            element.student.jours.forEach((day) => {
              days.push(day.jour);
              hours.push(day.totalHour);
            });
            element.student.days = days;
            element.student.hours = hours;
            element.student.competences.forEach((comp) => {
              competences.push(comp.competence);
            });
            element.student.acquis = competences;
            this.isWhished[element.id] = false;
            this.$store.state.whistListPerson?.forEach((person) => {
              if (element.id == person.id) {
                this.isWhished[element.id] = true;
              }
            });
          });
          this.list = res.data.data;
          this.MylistEmploi = res.data.data;

          this.lengthOfMylistEmploi = this.MylistEmploi.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loadingSpinner.launchLoading(false);
        });
    },
    closeDetailTimetable() {
      this.details_timetable = !this.details_timetable;
      this.id_detail_timetable = "";
      this.selectedOffreWithDate = "";
      this.selectedOffreWithPeriode = "";
      this.checkboxDate = false;
      this.checkbox = false;
    },
    async choiceOtherTalentNotStudent(studentId){
    loadingSpinner.launchLoading(true);
     try{
  const response = await instance.post("entreprise_student", {
          student_id: studentId.user_id,
          option: "date",
          offre_id: this.selectedOffreWithDate,
    })
   if(response.data.message){
    Swal.fire({
            icon: "info",
            title: response.data.message,
            showConfirmButton: true,
          });
   }
     }catch(error){
      console.log(error);
     }finally{
       loadingSpinner.launchLoading(false);
     }
    },
    choiceStudentWithDisponibilite(studentId) {
      
      loadingSpinner.launchLoading(true);

      let date = [];

      this.datesChoice.forEach((item) => {
        date.push(new Date(item).toISOString().slice(0, 10));
      });
      let VerfDoublonInDate = [...new Set(date)];
      instance
        .post("entreprise_student", {
          student_id: studentId.user_id,
          date: VerfDoublonInDate,
          option: "date",
          offre_id: this.selectedOffreWithDate,
        })
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "info",
              title: res.data.message,
              showConfirmButton: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: err.response.data.message,
            showConfirmButton: true,
          });
        })
        .finally(() => {
          loadingSpinner.launchLoading(false);
        });
    },
    async optionPeriode(EntrepriseId) {
      // console.log("entreprise_student90")
      loadingSpinner.launchLoading(true);
      await instance
        .post("entreprise_student", {
          student_id: EntrepriseId,
          date_debut: this.dateDebut,
          date_fin: this.dateFin,
          option: "periode",
          offre_id: this.selectedOffreWithPeriode,
        })
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "info",
              title: res.data.message,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: "Vérifier votre connexion ou les informations que vous envoyer",
            showConfirmButton: true,
          });
        });
      loadingSpinner.launchLoading(false);
    },
    async getall() {
      loadingSpinner.launchLoading(true);
      await instance
        .get("getAllWishlist")
        .then((response) => {
          response.data.data.wishlists.forEach((item) => {
            this.verfIfStudentExistInWishlist.push(item.user_id);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      loadingSpinner.launchLoading(false);
    },
    AllCompetencesPredf() {
      instance
        .get("GetAllCompetences")
        .then((res) => {
          this.competencesPredefini = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verfEnter() {
     if (
  this.user && ['Etudiant', 'Professionnel', 'Artisan', 'Vétéran'].includes(this.user.user?.statut?.statut) 
  && !this.user.user?.statuses.some(item=>item.statut === 'Particulier')
) {
  this.$router.push("/");
  Swal.fire({
    icon: "info",
    title: "Vous n'êtes pas autorisé",
    showConfirmButton: false,
    timer: 1000,
  });
}
    },
    async selectOffreEntreprise() {
      try {
        const response = await instance.get("get_offres_entreprise");
        // console.log("selectOffreEntreprise",response)
        this.selectedService = response.data.data;
      } catch (error) {
        // console.log("error", error);
      }
    },
    removeDate(date, hide) {
      this.datesPickers = this.datesPickers.filter((d) => d !== date);
      hide();
    },
    dateSelected(e, date, toggle) {
      this.selecteDatepickers = date;
      toggle({ ref: e.target });
    },
    jourSelect() {
      return this.jourOfMois.forEach((element) => {
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        return element.jour + "-" + month + "-" + year;
      });
    },
    async handleAbonnement() {
      try {
        const response = await instance.get("abonnement_user");
        this.listAbonnement = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    await this.$store.dispatch("getInfoUser");
    this.handleAbonnement();
    this.get_list_emploi();
    this.getAllCompetences();
    this.AllCompetencesPredf();
    this.verfEnter();
    this.getDetailStudent();
    this.selectOffreEntreprise();
    this.texte = await this.handleTranslate("Disponible");
    this.texte1 = await this.handleTranslate("Occupé");
    this.texte2 = await this.handleTranslate("Horaire");
    this.texte3 = await this.handleTranslate("Choisir la date");
    this.texte4 = await this.handleTranslate("Choisir une offre");
    this.texte5 = await this.handleTranslate("Sélectionner une offre");
    this.texte6 = await this.handleTranslate("Pas d'offres");
    this.texte7 = await this.handleTranslate("Séléctionner ce talent");
    this.texte8 = await this.handleTranslate(
      "Ce talent n'a pas encore fait un abonnement."
    );
    this.texte9 = await this.handleTranslate("Vous devez faire un abonnement");
  },
};
</script>

<template>
  <div class="space-talent">
    <div class="conteneur_student" v-if="timetable_for_student">
      <HeaderDetailStudent :timetable_for_student="timetable_for_student" />

      <BodyExperience :timetable_for_student="timetable_for_student" />
 <!--  ceci : timetable_for_student.user.statut_id === 2 est destine au étudiant -->
      <section class="conteneur_calendar_student" v-if="
  timetable_for_student.user?.statuses.some(s => s.statut === 'Etudiant')">
        <div class="jobs-result">
          <div class="disponibilite">
            <span>
              <strong class="jou"></strong> {{ texte }} <strong class="notDispo"></strong
              >{{ texte1 }}
            </span>
          </div>
         
          <div class="container-fluid my-5 conteneur_timetable" >
            <Calendar :attributes="attributes" :min-date="new Date()" class="myCalender">
              <template #day-popover="{ attributes }">
                <ul>
                  <li
                    v-for="(item, index) in attributes"
                    :key="index"
                    class="listeForHoraire"
                  >
                    <strong class="d-block">
                      <span class="colorForFirstHoraire"></span>
                      {{ texte2 }} : {{ item.popover.label.one }}</strong
                    >
                    <strong v-if="item.popover.label.two != null"
                      ><span class="colorForSecondHoraire"></span> {{ texte2 }} :
                      {{ item.popover.label.two }}</strong
                    >
                  </li>
                </ul>
              </template>
            </Calendar>
          </div>
        </div>
        <div
          class="conteneur_date"
          v-if="
            this.$store.state.infoUserConnected.user.abonement.length &&
            this.$store.state.infoUserConnected.user.abonement.some(
              (item) => item.statut === 'success'
            )
          "
        >
        <p style="text-align: center;font-size: 0.9em;color:red;">Les champs avec astérisque (*) sont obligatoires.</p>
          <label class="d-block">{{ texte3 }}</label>
          <PrimeCalendar
            v-model="datesChoice"
            :minDate="new Date()"
            inputClass="prime_calendar"
            selectionMode="multiple"
            :manualInput="false"
            dateFormat="dd/mm/yy"
          />

          <div class="selecte_service my-3">
            <label class="d-block">{{ texte4 }} <span style="color:red">*</span></label>
            <select
              name="select_offre"
              id="select_offre"
              v-model="selectedOffreWithDate"
              class="my-3"
            >
              <option value="" disabled>{{ texte5 }}</option>
              <option
                :value="offre.id"
                v-for="(offre, index) in selectedService"
                :key="index"
              >
                {{ offre.nom_offre }}
              </option>
              <option disabled v-if="!selectedService.length">{{ texte6 }}</option>
            </select>
          </div>
          <div class="conteneurInter">
          
            <button
              class="btn btn-warning btn-designer my-3"
              type="submit"
              :disabled="!this.selectedOffreWithDate"
              @click="choiceStudentWithDisponibilite(timetable_for_student)"
            >
              {{ texte7 }}
            </button>
          </div>
        </div>
        <div v-else class="conteneur_date" style="color: red; text-align: center">
          Veuillez souscrire à un abonnement
          <div>
            <button
              style="
                background: orange;
                color: white;
                padding: 0.5em;
                border-radius: 10px;
                border: 1px solid orange;
              "
              @click.prevent="seeAllAbonnement"
            >
              Voir les abonnements
            </button>
          </div>
        </div>
      </section>
      <!--  ceci : timetable_for_student.user.statut_id est destine aux autres -->
        <section class="conteneur_calendar_student" v-else> 
         <div
          class="conteneur_date"
          v-if="
            this.$store.state.infoUserConnected.user.abonement.length &&
            this.$store.state.infoUserConnected.user.abonement.some(
              (item) => item.statut === 'success'
            )
          "
        >
          <div class="selecte_service my-3">
            <label class="d-block">{{ texte4 }}</label>
         
            <select
              name="select_offre"
              id="select_offre"
              v-model="selectedOffreWithDate"
              class="my-3"
            >
              <option value="" disabled>{{ texte5 }}</option>
              <option
                :value="offre.id"
                v-for="(offre, index) in selectedService"
                :key="index"
              >
                {{ offre.nom_offre }}
              </option>
              <option disabled v-if="!selectedService.length">{{ texte6 }}</option>
            </select>
          </div>

          <div class="conteneurInter">
            <button
              class="btn btn-warning btn-designer my-3"
              type="submit"
              :disabled="!this.selectedOffreWithDate"
              @click="choiceOtherTalentNotStudent(timetable_for_student)"
            >
              {{ texte7 }}
            </button>
          </div>
        </div>
        <div v-else class="conteneur_date" style="color: red; text-align: center">
          Veuillez souscrire à une formule d'abonnement
          <div>
            <button
              style="
                background: orange;
                color: white;
                padding: 0.5em;
                border-radius: 10px;
                border: 1px solid orange;
              "
              @click.prevent="seeAllAbonnement"
            >
              Souscrire
            </button>
          </div>
        </div>
        </section>
    </div>
    <div class="conteneur_student py-5" style="min-height: 60vh;" v-else>
      <h3 class="shimmer-text">Chargement...</h3>
    </div>
  </div>
</template>

<style scoped>
.disponibilite {
  text-align: center;
}
:deep(.p-inputwrapper) {
  width: 500px !important;
}

.selecte_service {
  width: 100%;  /* ✅ Pleine largeur parent */
}

.selecte_service select {
  width: 100% !important;  /* ✅ Responsive auto */
  max-width: 500px;        /* ✅ Limite max */
  min-width: 250px;        /* ✅ Min mobile */
}
.conteneur_calendar_student {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
}
.conteneur_calendar_student .jobs-result {
  flex: 1 1 200px;
}
.conteneur_calendar_student .conteneur_date {
  flex: 2 2 200px;
}
.spinner-border {
  height: 100vh !important;
  display: flex;
  place-items: center;
  justify-content: center;
  align-items: center;
}
.n-rate {
  width: 100%;
  margin-left: 1em;
  font-size: 2em;
}
h1 {
  font-size: 4em;
}
.choose_periode {
  margin-left: 1.5em;
}
.experience {
  cursor: pointer;
  padding: 0.5em 0.5em;
  font-size: 1.2em;
}
.conteneur_student {
  margin-top: 6em;
  padding: 0 5em;
  text-align: center;
}
.space-talent {
  margin: 9.5em 0;
}

select {
  padding: 0.8em !important;
}
.pagination_btn {
  margin: 0 0.1em;
  border: 1px solid teal;
  background: transparent;
  border-radius: 5px;
}
.color {
  border: 1px solid white;
  background: #f77f00 !important;
}
.rond {
  width: 45px;
  height: 45px;
  margin-left: 1em;
  background: rgba(255, 255, 255, 0.232);
  border-radius: 100%;
  line-height: 45px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
  text-align: center;
}
.content_commentaire {
  text-align: left;
}

.vue3-star-ratings {
  display: none;
}
hr {
  border-top: 1px solid #5050501a !important;
}
.notDispo,
.red {
  background: crimson !important;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
.button {
  width: auto !important;
  padding: 0.9em !important;
  margin-left: 0.5em !important;
  margin-bottom: 0.2em !important;
  margin-top: 0.98em !important;
  background: rgb(255, 255, 255) !important;
  border-radius: 5px !important;
  border: none !important;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.303);
}
.flex-periode {
  flex-direction: column;
}
.jou {
  background: linear-gradient(10deg, rgb(2, 123, 56), rgb(0, 230, 31)) !important;
  color: rgb(255, 255, 255) !important;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
.shimmer-text {
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #999 0%,
    #fff 50%,
    #999 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
@media (max-width: 1200px) {
  .space-talent {
    margin: 9em 0 1em 0;
  }
  .conteneur_calendar_student {
    margin-top: 6em !important;
  }
  .conteneur_student {
    padding: 0 1em;
    margin-top: 0;
  }
}
@media (max-width: 580px) {
  .conteneur_calendar_student {
    margin-top: 2em !important;
  }
  .conteneur_student {
    padding: 0 0.5em;
  }
}

@media (max-width: 380px) {
  :deep(.vc-container) {
    width: 100%;
  }
}
</style>
