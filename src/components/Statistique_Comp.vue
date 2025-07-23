<script>
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
  {
    value: "periodly",
    libelle: "Personnaliser",
  },
];

// import ProgressSpinner from "primevue/progressspinner";
export default {
  name: "Statistique_Comp",
  props: {
    title: {
      type: String,
      required: true,
    },
    myLabelsStatics: {
      type: Array,
      require: true,
    },
    dataSetsStatistics: {
      type: Array,
      require: true,
    },
  },
  components: {
    Chart,
    MySelect,
    // ProgressSpinner,
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      chooseAnOptionPeriode: "annually",
      PERIODE: PERIODE,
      categories: [],
      valueSubmit: new Date().getFullYear(),
      categorieSelected: "",
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    get_categorie() {
      // this.spinner = true;
      axios
        .get("http://127.0.0.1:8000/api/seeCategorie", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("TIMETABLE", res);
          this.categories = res.data.data;
          this.submitStatistiques(this.valueSubmit, this.categories);
          console.log("CATEGORIE", this.categories);
          // this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setChartData() {
      // const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: this.myLabelsStatics,
        datasets: this.dataSetsStatistics,
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
    onChartLoaded(chartInstance) {
      // chartInstance est l'objet chart passé en paramètre
      console.log("Graphique chargé", chartInstance);
      this.isLoading = false;
      // Vous pouvez ici interagir avec le graphique
    },
    handleSelect(e) {
      console.log("handleSelect", e);
      this.chooseAnOptionPeriode = e;
    },
    handleCategorieSelect(e) {
      console.log("handleCategorieSelect", e);
      this.categorieSelected = e;
    },
    async submitStatistiques(year = null, categories) {
      console.log("submitStatistiques", this.valueSubmit);
      const data = {
        categorie_id:
          year && categories
            ? categories[0].id
            : Number(
                this.categorieSelected
                  ? this.categorieSelected
                  : categories[0].id
              ),
        options: "Offres",
        value_periode: year && categories ? this.currentYear : this.valueSubmit,
        periode:
          year && categories ? PERIODE[0].value : this.chooseAnOptionPeriode,
      };
      console.log("DATA", data);
      axios
        .post(
          "http://127.0.0.1:8000/api/statistiques/launchStatistiques",
          data,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          // if (res.data.status === true) {
          // Swal.fire({
          //   icon: "success",
          //   title: res.data.message,
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          // this.spinner = false;
          // setTimeout(() => {
          //   location.reload(true);
          // }, 1500);
          // this.confirmation_for_delete = !this.confirmation_for_delete;
          // }
        })
        .catch((err) => {
          console.log(err);
          this.spinner = false;
        });
    },
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
    this.get_categorie();
  },
};
</script>
<template>
  <div class="card py-4" style="flex: 1">
    <h1 class="text-start p-1">{{ this.title }}</h1>
    <div
      class="chart-loading d-flex gap-2 flex-wrap align-items-center px-2 py-3"
    >
      <MySelect
        v-if="categories.length && this.title === 'Categories'"
        :allItems="
          categories.length
            ? categories.map((item) => {
                return {
                  value: item.id,
                  libelle: item.categorie,
                };
              })
            : []
        "
        @handleSelect="handleCategorieSelect"
      />
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
        <div
          v-if="chooseAnOptionPeriode === 'periodly'"
          class="d-flex align-items-center gap-2 px-2 w-100"
        >
          <input type="date" />
          <input type="date" />
        </div>
      </div>
    </div>
    <div class="text-end mb-4 mx-3">
      <button
        class="btn bg-primary"
        @click="submitStatistiques(null, categories)"
      >
        Filtrer
      </button>
    </div>
    <Chart
      @loaded="onChartLoaded"
      type="bar"
      :height="300"
      :width="500"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
<style scoped>
input {
  width: auto;
}
</style>
