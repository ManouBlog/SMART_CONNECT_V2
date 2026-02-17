<script>
import Chart from 'primevue/chart';
export default {
  name: "StatisticsChart",
  components:{Chart},
  props: {
    registeredCount: {
      type: Array,
      required: true
    },
    subscribedCount: {
      type: Array,
      required: true
    },
    labels:{
        type:String,
        required:true
    }
  },
  computed: {
    filterMonth(){
   return this.labels;
    },
    chartData() {
      return {
       labels:[this.labels],
        datasets: [
          {
            label: 'Inscrits',
            backgroundColor: '#3B82F6',
            data: this.registeredCount
          },
          {
            label: 'Abonnés',
            backgroundColor: '#10B981',
            data: this.subscribedCount
          }
        ]
      }
    },
  chartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: window.innerWidth < 768 ? 'bottom' : 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      }
    },

    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: window.innerWidth < 768 ? 9 : 12
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 9 : 12
          }
        }
      }
    }
  }
}

  }
}
</script>

<template>
  <div>
    <div style="display:flex;justify-content:flex-end;margin: 1em 0;">
        <input type="date" v-model="filterMonth">
    </div>
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
