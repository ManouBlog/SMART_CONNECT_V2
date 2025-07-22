<script>
import axios from "axios";
import Chart from "primevue/chart";
import MySelect from "./MySelect.vue";
const PERIODE = [
  {
    value: "daily",
    libelle: "Jour",
  },
  {
    value: "weekly",
    libelle: "Semaine",
  },
  {
    value: "monthly",
    libelle: "Mois",
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
      chooseAnOption: "",
      PERIODE: PERIODE,
      categories: [],
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
      this.chooseAnOption = e;
    },
    handleCategorieSelect(e) {
      console.log("handleCategorieSelect", e);
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
  <div class="card w-100 p-4">
    <h1 class="text-start p-1">{{ this.title }}</h1>
    <div class="chart-loading d-flex gap-2 align-items-center px-2 py-3">
      <MySelect
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
        <input v-if="chooseAnOption === 'daily'" type="date" />
        <input v-if="chooseAnOption === 'weekly'" type="week" />
        <input v-if="chooseAnOption === 'monthly'" type="month" />
      </div>
    </div>
    <Chart
      @loaded="onChartLoaded"
      type="bar"
      :height="300"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
