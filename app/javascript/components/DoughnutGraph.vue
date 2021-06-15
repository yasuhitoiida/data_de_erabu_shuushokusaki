<script>
import { Doughnut } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default {
  name: 'DoughnutGraph',
  extends: Doughnut,
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
        plugins: {
          datalabels: {
            font: {
              weight: 'bold',
              size: 12,
            },
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels[ctx.dataIndex]
              return `${label}\n${value * 100 + '%'}`
            }
          }
        },
        title: {
          display: true,
          text: this.title
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    }
  },
  mounted () {
    this.addPlugin(ChartDataLabels)
    this.renderChart(this.data, this.options)
  }
}
</script>
