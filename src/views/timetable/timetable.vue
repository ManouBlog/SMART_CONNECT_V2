<script>
import instance from "../../api/api";
import Swal from "sweetalert2";
import "primeicons/primeicons.css";
// import Multiselect from 'vue-multiselect'
// import { Calendar} from "v-calendar";

// import "v-calendar/dist/style.css";

// import vue3starRatings from "vue3-star-ratings";
// import { KCheckbox } from '@kong/kongponents'
// import '@kong/kongponents/dist/style.css'

export default {
  // compoments:{
  //   vue3starRatings
  // },
  data() {
    return {
      lieu: "",
      dateRendezVousStudentWithEntreprise: null,
      MyDateRendezVous: [],
      user: this.$store.state.user,
      competences: "",
      competence: "",
      contacter: false,
      datesSelect: [],
      jours: [],
      page: 1,
      details_timetable: false,
      id_detail_timetable: "",
      timetable_for_student: "",
      path: "",
      schedule: "",
      compte: 4,
      hideButton: false,
      MylistEmploi: null,
      location: "",
      list: [],
      contrat: false,
      NewListEmploi: "",
      length: 8,
      hideButtons: false,
      isWhished: [],
      lengthOfMylistEmploi: "",
      spinner: false,
      dateDebut: null,
      dateFin: null,
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
      jourOfMois: [
        { jour: "1" },
        { jour: "2" },
        { jour: "3" },
        { jour: "4" },
        { jour: "5" },
        { jour: "6" },
        { jour: "7" },
        { jour: "8" },
        { jour: "9" },
        { jour: "10" },
        { jour: "11" },
        { jour: "12" },
        { jour: "13" },
        { jour: "14" },
        { jour: "15" },
        { jour: "16" },
        { jour: "17" },
        { jour: "18" },
        { jour: "19" },
        { jour: "20" },
        { jour: "21" },
        { jour: "22" },
        { jour: "23" },
        { jour: "24" },
        { jour: "25" },
        { jour: "26" },
        { jour: "27" },
        { jour: "28" },
        { jour: "29" },
        { jour: "30" },
        { jour: "31" },
      ],
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
      toogleExperience: false,
      days: [],
      showCalenderFilter: false,
      selectedCompetenceWithDate: "",
      selectedCompetenceWithPeriode: "",
      perPage: 3,
      currentPage: 1,
      totalPages: "",
      maxVisibleButtons: "2",
    };
  },
  computed: {
    paginatedData() {
      let start = this.currentPage * this.perPage - this.perPage;
      let end = start + this.perPage;
      return this.timetable_for_student.etoiles.slice(start, end);
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
    // jourOfMonth() {
    //   let month = new Date().getMonth() + 1;
    //   let year = new Date().getFullYear();
    //   let nombre = "0";
    //   if (month < 10 || month < 11 || month < 12) {
    //     nombre = nombre + month;
    //   }
    //   return [
    //     ...this.jourOfMois.map((element) => ({
    //       jou: year + "-" + nombre + "-" + element.jour,
    //     })),
    //   ];
    // },
    // dates() {
    //   return this.days.map((day) => day.date);
    // },
    // attribut() {
    //   return this.dates.map((date) => ({
    //     highlight: true,
    //     dates: date,
    //   }));
    // },

    // attributes() {
    //   return [
    //     ...this.schedule.map((time) => ({
    //       dates: new Date(time.jour),
    //       highlight: {
    //         color: time.job == 3 ? "gray" : time.job == 1 ? "red" : "green",
    //         fillMode: time.job == 3 ? "light" : "solid",
    //       },
    //       popover: {
    //         label: {
    //           one: time.First_horaire,
    //           two: time.Second_horaire,
    //         },
    //         visibility: "hover",
    //       },
    //     })),
    //   ];
    // },
  },
  methods: {
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
        this.competences = reponse.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    showCalenderDate() {
      this.showCalenderFilter = !this.showCalenderFilter;
    },
    convertDate(items) {
      let dateConvert = [];

      items.forEach((el) => {
        dateConvert.push(new Date(el).toISOString().substring(0, 10));
      });
      return dateConvert;
    },
    selectDate() {
      console.log("elem", this.datesSelect);
      let newDateConvert = this.convertDate(this.datesSelect);
      this.MylistEmploi.forEach((element) => {
        const { days } = element;
        console.log("DAYS", days);
        newDateConvert.forEach((dateSearch) => {
          days.forEach((daySave) => {
            if (daySave === dateSearch) {
              this.Myarray.push(element);
            }
          });
        });
      });
      console.log("this.Myarray", this.Myarray);
      if (!this.datesSelect.length) {
        this.list = this.MylistEmploi;
      } else {
        this.list = this.Myarray;
      }

      console.log("newDateConvert", newDateConvert);
      console.log("this.list", this.list);
      console.log("this.days", this.days);
      console.log("this.MylistEmploi", this.MylistEmploi);
    },
    onDayClick(day) {
      const idx = this.days.findIndex((d) => d.id === day.id);
      console.log(new Date().toLocaleDateString());
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
      console.log("DATE", this.Myarray);
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
      }
    },
    showPeriode() {
      console.log(this.checkbox);
      if (this.checkboxDate === true) {
        this.checkboxDate = !this.checkboxDate;
      }
      this.checkbox = !this.checkbox;
      if (this.checkbox === true) {
        this.opinion = "periode";
      }
    },
    addTag(newTag) {
      console.log(newTag);
      this.Myarray = [];
      // this.list = [];
      this.MylistEmploi.forEach((element) => {
        newTag.forEach((e) => {
          element.jours.forEach((item) => {
            if (item.jour === e.jou) {
              console.log(element);
              this.Myarray.push(element);
            }
          });
        });
      });
      this.list = [...new Set(this.Myarray)];
      console.log("LIST", this.list);
      this.hideButtons = true;

      if (!newTag.length) {
        this.list = this.MylistEmploi;
        this.hideButtons = true;
      }
    },
    addComp(newTag) {
      console.log(this.days.length);
      if (this.Myarray.length > 0) {
        let newArray = [];
        this.Myarray.forEach((item) => {
          newTag.forEach((e) => {
            if (item.acquis.includes(e.competence)) {
              newArray.push(item);
              console.log("new Array", newArray);
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
        console.log("list de competences", this.list);

        console.log("list de jour", this.Myarray);
        this.hideButtons = true;

        if (!newTag.length) {
          this.list = this.MylistEmploi;
          this.hideButtons = false;
        }
      }
    },
    deleteDays(day) {
      const idx = this.days.findIndex((d) => d.id === day.id);
      console.log(day.id);
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
    showMyCalender(id) {
      console.log(id);
    },
    defineTotalHour(hour) {
      if (hour.length > 0) {
        return hour.reduce((a, b) => a + b);
      }
    },
    loadMore() {
      if (this.length > this.list.length) return;
      this.length = this.length + 8;
      if (this.length === this.list.length) {
        this.showEndResearch = !this.showEndResearch;
      }
    },
    get_list_emploi() {
      this.spinner = true;
      instance
        .get("list_emplois_temps")
        .then((res) => {
          console.log("EMPLOI", res.data.data);
          res.data.data.forEach((element) => {
            let days = [];
            let hours = [];
            let competences = [];

            element.jours.forEach((day) => {
              days.push(day.jour);
              hours.push(day.totalHour);
            });
            element.days = days;
            element.hours = hours;
            element.competences.forEach((comp) => {
              competences.push(comp.competence);
            });
            element.acquis = competences;
            this.isWhished[element.id] = false;
            this.$store.state.whistListPerson.forEach((person) => {
              if (element.id === person.id) {
                this.isWhished[element.id] = true;
              }
            });
          });
          this.list = res.data.data;
          this.MylistEmploi = res.data.data;
          console.log("LIST", this.MylistEmploi);
          this.lengthOfMylistEmploi = this.MylistEmploi.length;
          console.log("EMPLOI DU TEMPS", this.list_emploi);
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
          this.spinner = false;
        });
    },
    closeDetailTimetable() {
      this.details_timetable = !this.details_timetable;
      this.id_detail_timetable = "";
      this.selectedCompetenceWithDate = "";
      this.selectedCompetenceWithPeriode = "";
      this.checkboxDate = false;
      this.checkbox = false;
    },
    voirDetailTimetable(id) {
      if (
        (this.user && this.user.user.statut.statut == "entreprise") ||
        (this.user && this.user.user.statut.statut === "particulier")
      ) {
        this.$router.push({
          name: "detailStudent",
          params: { id: id },
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Veuillez-vous connecter!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          this.$router.push({
            path: "/registre",
            query: { redirect: this.path },
          });
        }, 2000);
      }
    },
    optionDate(studentId) {
      this.loadSpinner = true;
      let date = [];
      this.datesPickers.forEach((item) => {
        date.push(item.date.toISOString().slice(0, 10));
      });
      let VerfDoublonInDate = [...new Set(date)];

      instance
        .post("entreprise_student", {
          student_id: studentId,
          date: VerfDoublonInDate,
          option: "date",
          service: this.selectedCompetenceWithDate,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
            this.loadSpinner = false;
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 2000,
            });
            this.loadSpinner = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loadSpinner = false;
          Swal.fire({
            icon: "info",
            title: "Vérifier votre connexion ou les informations que vous envoyer.",
            showConfirmButton: true,
          });
        });
    },
    optionPeriode(EntrepriseId) {
      this.loadSpinner = true;
      instance
        .post("entreprise_student", {
          student_id: EntrepriseId,
          date_debut: this.range.start.toISOString().slice(0, 10),
          date_fin: this.range.end.toISOString().slice(0, 10),
          option: "periode",
          service: this.selectedCompetenceWithPeriode,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
            this.loadSpinner = false;
            //setTimeout(() => {
            //location.reload(true);
            //}, 3000);
          }
          if (res.data.status === false) {
            Swal.fire({
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 2000,
            });
            this.loadSpinner = false;
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "info",
            title: "Vérifier votre connexion ou les informations que vous envoyer",
            showConfirmButton: true,
          });
          this.loadSpinner = false;
        });
    },
    async handleListeFavoris() {
      if (this.$store.state.token) {
        await instance
          .get("getAllWishlist")
          .then((response) => {
            console.log("WISHLIST", response.data.data.wishlists);
            response.data.data.wishlists.forEach((item) => {
              this.verfIfStudentExistInWishlist.push(item.user_id);
            });
            console.log(
              "verfIfStudentExistInWishlist",
              this.verfIfStudentExistInWishlist
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
    AllCompetencesPredf() {
      instance
        .get("GetAllCompetences")
        .then((res) => {
          console.log("competencesPredefini", res);
          this.competencesPredefini = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verfEnter() {
      if (this.user && this.user.user.statut.statut === "etudiant") {
        Swal.fire({
          icon: "error",
          title: "Vous n'êtes pas autorisé.",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      }
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
    jourSelect() {
      return this.jourOfMois.forEach((element) => {
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        console.log(element.jour + "-" + month + "-" + year);
        return element.jour + "-" + month + "-" + year;
      });
    },
  },
  created() {
    this.get_list_emploi();
    this.getAllCompetences();
    this.handleListeFavoris();
    this.AllCompetencesPredf();
    this.verfEnter();
    console.log(this.jourSelect());
    this.path = window.location.pathname;
  },
};
</script>
<template>
  <section>
    <div class="jobs_filters">
      <h3 class="fw-bold ecriteau text-left">Vous rechercher un talent ?</h3>

      <form class="d-flex flex-wrap align-items-center">
        <div class="w-100 mx-3">
          <PrimeCalendar
            v-model="datesSelect"
            :minDate="new Date()"
            selectionMode="multiple"
            dateFormat="dd/mm/yy"
            :manualInput="false"
            :showIcon="true"
            @update:modelValue="selectDate"
            placeholder="Sélectionne les jours"
          />
        </div>
        <div class="w-100 mx-3">
          <multiselect
            v-model="competence"
            :options="competences"
            :multiple="true"
            :taggable="true"
            :tag="addComp"
            @update:model-value="addComp"
            label="competence"
            track-by="competence"
            placeholder="competence"
          >
          </multiselect>
        </div>

        <div class="w-100 mx-3">
          <input
            type="text"
            class="form-control"
            placeholder="Commune"
            v-model="location"
          />
        </div>
      </form>
    </div>
    <div>
      <h2 class="fw-bold ecriteau text-left px-3">
        {{ list.length }} Talents disponibles
      </h2>
    </div>

    <div
      class="container-fluid timetableSchedule"
      :class="spinner ? 'conteneur_offre' : null"
    >
      <div class="timetable_disponible" v-if="list_emploi">
        <h6>
          Nous avons trouvé
          {{ datesSelect.length ? list.length : lengthOfMylistEmploi }}
          disponibilité(s).
        </h6>
      </div>

      <div>
        <span v-if="spinner" class="h1 char">Chargements...</span>

        <div class="container-fuid d-grid px-3">
          <div
            v-for="(emploi, index) in list_emploi"
            :key="index"
            class="card Mycard-body"
          >
            <div class="icons_interesse">
              <em
                v-if="
                  (user && user.user.statut.statut == 'entreprise') ||
                  (user && user.user.statut.statut === 'particulier')
                "
                @click="addPersonAtWishLit(emploi)"
                :class="isWhished[emploi.id] ? 'text-danger' : 'null'"
                class="bi bi-heart-fill"
              ></em>
              <em v-else class="bi bi-heart-fill"></em>
            </div>
            <em class="bi bi-person"></em>
            <div class="card-body">
              <h3 class="name">
                {{ emploi.nom }}
                {{ emploi.prenoms }}
              </h3>

              <div class="jour">
                <span v-for="(item, index) in emploi.competences" :key="index">
                  <strong class="bg-teal cpt">{{ item.competence }}</strong>
                </span>
              </div>

              <span class="biStar">
                <Rating v-model="emploi.average" readonly :cancel="false" />
              </span>

              <button
                class="btn bg-primary voirPlus"
                @click="voirDetailTimetable(emploi.id)"
              >
                Voir plus

                <em class="bi bi-eye"></em>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.length">
      <button
        @click="loadMore"
        v-if="length < list.length"
        class="btn-lg bg-primary loadPlus"
      >
        Charger plus <em class="bi bi-chevron-down"></em>
      </button>
      <h2 v-if="length >= list.length" class="endResearch">Vous avez atteint la fin</h2>
    </div>
  </section>
</template>
<style scoped>
.ecriteau {
  color: orange;
}
.jobs_filters {
  padding: 2em;
  margin: 2em 0;
}
.conteneur_timetable {
  padding: 1em;
}
.flex-periode {
  flex-direction: column;
}
.conteneur_pagination {
  position: relative;
  bottom: 0;
}
.evaluation {
  margin-left: 0.5em;
  width: 160px;
  padding: 0.5em;
  border-radius: 5px;
  background: #f77f00 !important;
  color: rgb(255, 255, 255);
}
.text-secondary {
  color: gray;
}
.notes {
  top: 0;
  right: 0;
  position: absolute;
}
.selecte_service select {
  width: 30%;
  margin: 0.5em 0;
  border-radius: 5px;
  padding: 0.3em 0;
}
.para {
  color: rgb(92, 92, 92);
}
.font-weight-bold {
  font-weight: bold !important;
}
.content_experience {
  padding: 1em;
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: top;
}
.content_commentaire {
  padding: 0.5em 0;
  display: flex;
  width: 80%;
  justify-content: flex-start;
  align-items: top;
}
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.108);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(113, 113, 113);
  border-radius: 10px;
}
.conteneur_ecriteau {
  width: 100% !important;
  padding: -1em 0;
  text-align: left;
  margin-left: 0.5em;
}
.conteneur_star_count {
  position: relative;
}
.conteneur_star_count span {
  position: absolute;
  top: 0;
  right: 82% !important;
}
.rond {
  width: 45px;
  height: 45px;
  margin-left: 1em;
  background: rgba(255, 255, 255, 0.232);
  border-radius: 100%;
  line-height: 45px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
}
.rondProfil {
  width: 70px;
  height: 70px;
  background: rgba(122, 121, 121, 0.232);
  border-radius: 100%;
  line-height: 70px;
  text-align: center;
  border: 3px solid rgb(152, 152, 152);
}
.experience {
  width: 50%;
  margin-top: 1em;
  text-align: left;
  font-weight: bold;
}

.endResearch {
  margin-bottom: 1em;
}
.list_personnel {
  color: #f77f00 !important;
}
.voirPlus {
  position: absolute;
  bottom: 0.7em;
  padding: 0.3em 0.5em;
  margin-right: 50%;
  transform: translateX(-50%);
}

.filterDate {
  background: rgb(255, 252, 252);
  min-height: 40px;
  border-radius: 5px;
  padding: 5px 40px 0 8px;
  position: relative;
  width: 325px !important;
  line-height: 20px;
  text-align: left;
}

.dayChoose {
  background: #3c4440;
  padding: 0.3em 1em;
  color: rgb(255, 255, 254);
  position: relative;
  margin-left: 10px;
  margin-bottom: 14px;
  font-size: 0.8em;
  border-radius: 3px;
}
.closeday {
  position: absolute;
  right: 0;
  top: 0;
}
.calendarFilter {
  position: absolute;
  top: 40px;
  z-index: 999;
  margin-left: -30%;
  transform: translateX(26%);
}
.searchByDay {
  color: gray !important;
}
.bi-play {
  position: absolute;
  right: 1em;
  top: 0.3em;
  transform: rotateZ(210deg);
  color: gray !important;
  font-size: 1.3em !important;
}
.bi-play-fill {
  position: absolute;
  right: 1em;
  top: 0.6em;
  transform: rotateZ(30deg);
  font-size: 1.3em !important;
}
.datepickrs {
  margin: 1em 0;
}
.rangePickers {
  margin: 1em 0;
}
.border-input {
  padding: 0.5em 0.3em;
}
.mb-5 {
  margin-bottom: 1em !important;
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

.conteneurInter {
  margin: 1em 0 0 0;
}
.myCalender {
  margin: 0 3em !important;
}
.btnAdd {
  margin: 1em 0 0 0 !important;
  position: relative !important;
  font-weight: bold;
  background: #f77f00 !important;
  color: white;
}

.disponibilite span strong {
  margin: 0 0.5em;
  border-radius: 100%;
  height: 15px;
  width: 15px;
  line-height: 25px;
  font-size: 0.8em;
  text-transform: capitalize;
}
.disponibilite span strong {
  background: rgba(128, 128, 128, 0.262);
  color: rgb(68, 68, 68);
}
.jou {
  background: linear-gradient(10deg, rgb(2, 123, 56), rgb(0, 230, 31)) !important;
  color: rgb(255, 255, 255) !important;
}
.multiselect__tag {
  background: rgb(5, 35, 73) !important ;
}

.colorForFirstHoraire {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: crimson !important;
}
.Mycard-body {
  position: relative !important;
  padding: 1em 0;
  text-transform: capitalize;
  margin: 0 !important;
}
.Mycard-body h3 {
  padding: 0;
  margin: 0 !important;
}
.Mycard-body .btn {
  font-size: 0.8em !important;
  margin-top: 1em;
}
.icons_interesse {
  position: absolute !important;
  top: 1em;
  left: 1em;
}
.totalHour {
  position: absolute !important;
  top: 1em;
  right: 1em;
}
.biStar {
  position: absolute !important;
  top: 3.3em;
  left: 1.25em;
  font-size: 1em;
}
.biStar .color_star,
.biStar strong {
  color: orange;
}

.icons_interesse em {
  font-size: 1.89em !important;
}
.icons_interesse .bi {
  font-size: 2em !important;
}
.w-100 {
  width: 20%;
  padding: 0.5em 0;
}
.notDispo,
.red {
  background: crimson !important;
}
.d-block {
  display: block;
}

.loadPlus {
  margin-bottom: 2em;
}
.card_content {
  background: white;
  width: 70%;
  height: 50%;
}
.green-banner,
.image-heading {
  color: rgb(5, 35, 73) !important;
}
#load_more,
.filter-result:hover {
  border: 2px solid rgb(5, 35, 73) !important;
}
.job-footer {
  border: none;
}
.char {
  margin-bottom: 3em;
}
.timetableSchedule {
  padding: 5em 0 !important;
}
.card {
  border-radius: 5px !important;
  border: 1px solid;
  background: rgba(179, 201, 255, 0.38);
}
.spinner-border {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  place-items: center;
  align-items: center;
}

.d-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
  justify-content: center;
}
.see_details_emploi {
  position: fixed !important;
  font-weight: bold;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  place-items: center;
  background: rgba(141, 137, 137, 0.429);
  z-index: 99;
}
.hideschudleIfUserStudent {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  place-items: center;
  background: rgba(35, 35, 35, 0.887);
  z-index: 999;
}
.hideschudleIfUserStudent .student {
  width: 50%;
  background: white;
  height: auto;
  overflow-y: auto;
  border-radius: 10px;
}

.see_contrat {
  position: fixed !important;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  place-items: center;
  background: rgba(141, 137, 137, 0.547);
  z-index: 990;
}
.see_details_emploi .timetable {
  width: 700px;
  background: white;
  height: 90%;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
}

.bs {
  font-size: 3em !important;
  color: crimson;
  cursor: pointer;
}
.bx {
  position: absolute !important;
  font-size: 2.5em !important;
  cursor: pointer;
  right: 0.5em;
  top: 0.5em !important;
  color: crimson;
  font-weight: bold;
  box-shadow: 1px 1px 6px solid rgba(0, 0, 0, 0.69);
  border-radius: 100%;
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.card-body h5 {
  text-align: left;
  font-size: 1em;
}
.card-body h1 {
  text-align: left;
}
.info_student {
  text-align: left;
  margin-left: 1em;
  margin-top: 4em;
  text-transform: capitalize;
}
.conteneur_competences {
  margin-left: 1em;
  margin-top: 0.5em;
}
.p-calendar {
  width: 100% !important;
}
.info_student .h1 {
  font-size: 2em;
}

.name {
  text-transform: capitalize;
}
.info_student span {
  margin-top: 0.2em;
  font-size: 1.1em;
  display: block;
}
.bi-person {
  font-size: 3em !important;
}
.bg-primary {
  background: #f77f00 !important;
  border: 1px solid rgb(1, 1, 1) !important;
}
.timetable_disponible {
  text-align: left;
  padding: 0.5em 1.5em;
}
.jour {
  padding: 1em 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.jour span strong {
  margin: 0.5em 0.5em;
  font-size: 9px;
  padding: 0.3em 0.3em;
  color: rgb(3, 70, 70);
  border-radius: 2px;
  text-transform: capitalize;
  background: rgba(0, 255, 255, 0.249);
}
.not_dispo {
  width: 100%;
  padding: 0.69em 1em;
}
.fa-heart {
  color: rgb(185, 185, 185) !important;
}
.ff {
  color: #bcbbbbd3;
}
.text-danger {
  color: rgb(238, 9, 55) !important;
}
.bg-warning {
  background: rgb(25, 53, 90) !important;
}
.btn:focus {
  color: none !important;
}
@media screen and (max-width: 1199px) {
  .d-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 992px) {
  .d-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 650px) {
  .d-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
.d-none {
  display: none !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
