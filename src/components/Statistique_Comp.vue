<script>
import Chart from "primevue/chart";
import ProgressSpinner from "primevue/progressspinner";
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
    ProgressSpinner,
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
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
    <h1>{{ this.title }}</h1>
    <div v-if="isLoading" class="chart-loading">
      <div class="card flex justify-center">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
        />
      </div>
    </div>
    <Chart
      v-else
      @loaded="onChartLoaded"
      type="bar"
      :height="300"
      :width="500"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
