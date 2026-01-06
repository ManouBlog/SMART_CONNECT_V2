<script>
/* eslint-disable */
import axios from "axios";
import Chart from "primevue/chart";
import MySelect from "./MySelect.vue";
const PERIODE = [
  {
    value: "annually",
    libelle: "Année",
  },
  {
    value: "monthly",
    libelle: "Mois",
  },
  {
    value: "weekly",
    libelle: "Semaine",
  },
  {
    value: "daily",
    libelle: "Jour",
  },
  //   {
  //     value: "periodly",
  //     libelle: "Personnaliser",
  //   },
];

export default {
  name: "Statistique_Account",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Chart,
    MySelect,
  },
  data() {
    return {
      isDisabled: true,
      isLoading: false,
      chartData: null,
      chartOptions: null,
      chartAbonnementData: null,
      chartAbonnementOptions: null,
      chooseAnOptionPeriode: "annually",
      chooseTypesOfFilter: "nombre",
      weekDay: null,
      PERIODE: PERIODE,
      categories: [],
      valueSubmit: new Date().getFullYear(),
      categorieSelected: "",
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    getDayOfWeek(e) {
      console.log(e.target.value);
      let year = parseInt(e.target.value.slice(0, 4), 10);
      let week = parseInt(e.target.value.slice(6), 10);
      let day = 1 + (week - 1) * 7;
      let dayOffset = new Date(year, 0, 1).getDay();
      dayOffset--;
      let days = [];
      for (let i = 0; i < 7; i++) {
        days.push(
          new Date(year, 0, day - dayOffset + i).toISOString().substring(0, 10)
        );
      }
      const dateWeekDebut = days[0];
      const dateWeekFin = days[days.length - 1];
      this.weekDay = { start: dateWeekDebut, end: dateWeekFin };
      console.log("debutweek", dateWeekDebut);
      console.log("finweek", dateWeekFin);
    },
    get_categorie() {
      axios
        .get("http://127.0.0.1:8000/api/seeCategorie", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.categories = res.data.data;
          this.submitStatistiques(this.valueSubmit);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isDisabled = false;
        });
    },
    setChartData(
      Entreprises,
      Talents,
      souscriptionEntreprise,
      souscriptionTalents,
      labels
    ) {
      return {
        labels: labels,
        datasets: [
          {
            label: "Inscription entreprises",
            backgroundColor: "teal",
            borderColor: "teal",
            data: Entreprises,
          },
          {
            label: "Souscription entreprises",
            backgroundColor: "black",
            borderColor: "black",
            data: souscriptionEntreprise,
          },
          {
            label: "Inscription talents",
            backgroundColor: "brown",
            borderColor: "brown",
            data: Talents,
          },
          {
            label: "Souscription talents",
            backgroundColor: "orange",
            borderColor: "orange",
            data: souscriptionTalents,
          },
        ],
      };
    },
    setChartAbonnementOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--p-text-muted-color"
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        "--p-content-border-color"
      );

      return {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--p-text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--p-text-muted-color"
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        "--p-content-border-color"
      );

      return {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    },
    handleSelect(e) {
      console.log("handleSelect", e);
      this.chooseAnOptionPeriode = e;
      this.valueSubmit = null;
    },
    handleTypeSelect(e) {
      this.chooseTypesOfFilter = e;
      if (e === "nombre") {
        this.submitStatistiques(this.valueSubmit);
      } else {
        this.submitAbonnementStatistiques(this.valueSubmit);
      }
      this.valueSubmit =
        this.chooseAnOptionPeriode === "annually"
          ? new Date().getFullYear()
          : null;
      // this.chooseAnOptionPeriode = "annually";
    },
    handleCategorieSelect(e) {
      console.log("handleCategorieSelect", e);
      this.categorieSelected = e;
    },
    async submitStatistiques(year = null) {
      console.log("submitStatistiques", this.valueSubmit);
      this.isLoading = true;
      const data =
        this.chooseAnOptionPeriode !== "weekly"
          ? {
              value_periode: year ? this.currentYear : this.valueSubmit,
              periode: year ? PERIODE[0].value : this.chooseAnOptionPeriode,
            }
          : {
              value_periode: this.weekDay,
              periode: year ? PERIODE[0].value : this.chooseAnOptionPeriode,
            };
      console.log("DATA", data);
      axios
        .post(
          "http://127.0.0.1:8000/api/statistiques/statistiqueAccount",
          data,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((response) => {
          console.log("statistique_response", response);
          this.chartData = this.setChartData(
            response.data.entreprises,
            response.data.talents,
            response.data.entreprise_count_abonnement,
            response.data.talents_count_abonnement,
            response.data.absicsse
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.get_categorie();
    this.chartOptions = this.setChartOptions();
  },
};
</script>
<template>
  <div class="card py-4">
    <h3 class="text-start p-1">{{ this.title }}</h3>
    <div
      class="chart-loading d-flex gap-2 flex-wrap align-items-center px-2 py-3"
    >
      <MySelect :allItems="PERIODE" @handleSelect="handleSelect" />
      <div>
        <input
          v-model="valueSubmit"
          v-if="chooseAnOptionPeriode === 'daily'"
          type="date"
        />
        <input
          v-if="chooseAnOptionPeriode === 'weekly'"
          v-model="valueSubmit"
          @change="getDayOfWeek"
          type="week"
        />
        <input
          v-if="chooseAnOptionPeriode === 'monthly'"
          v-model="valueSubmit"
          type="month"
        />

        <input
          v-if="chooseAnOptionPeriode === 'annually'"
          v-model="valueSubmit"
          type="number"
        />
        <!-- <div
          v-if="chooseAnOptionPeriode === 'periodly'"
          class="d-flex align-items-center gap-2 px-2 w-100"
        >
          <input type="date" />
          <input type="date" />
        </div> -->
      </div>
    </div>
    <div class="text-end mb-4 mx-3">
      <button
        :disabled="!valueSubmit || isDisabled"
        class="btn bg-primary"
        @click="submitStatistiques(null)"
      >
        Filtrer
      </button>
    </div>
    <div v-if="isLoading" style="height: 300px">Chargement...</div>
    <div v-else>
      <Chart
        v-if="this.chooseTypesOfFilter === 'nombre'"
        type="bar"
        :height="300"
        
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
<style scoped>
input {
  width: auto;
}
.card{
  flex:1;
}
@media only screen and (max-width: 900px){
.card{
  flex:none;
}
}
</style>
