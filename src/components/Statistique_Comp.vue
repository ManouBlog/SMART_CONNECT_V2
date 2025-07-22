<script>
import Chart from "primevue/chart";
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
    // ProgressSpinner,
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      chooseAnOption: "",
    };
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  methods: {
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
  },
};
</script>
<template>
  <div class="card">
    <h1 class="text-start p-1">{{ this.title }}</h1>
    <div class="chart-loading d-flex gap-2 align-items-center px-2 py-3">
      <select name="options" id="options" v-model="chooseAnOption">
        <option value="" disabled>Séléctionne une option</option>
        <option value="daily">Jour</option>
        <option value="weekly">Semaine</option>
        <option value="monthly">Mois</option>
      </select>
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
      :width="500"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
