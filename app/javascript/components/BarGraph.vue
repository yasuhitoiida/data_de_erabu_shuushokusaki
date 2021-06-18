<script>
import { Bar } from 'vue-chartjs';

export default {
  name: 'BarGraph',
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      data: this.chartData,
      options: {
        title: {
          display: true,
          text: this.title
        },
        legend: {
          position: 'bottom',
          labels: {
            fontSize: 12
          }
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
