<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8" class="mx-auto">
        <h3>結果</h3>
        <v-row>
          <v-col align="center">
            <p>
              おつかれさまでした！<br>
              決定ボタンを押して結果を表示してください。
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="8">
            <BarGraph
              v-if="chart"
              :chart-data="barChartData"
              title="総合評点"
            />
          </v-col>
          <v-col cols="12" lg="4" class="ml-auto my-auto">
            <DoughnutGraph
              v-if="chart"
              :chart-data="doughnutChartData"
              title="あなたのこだわり条件"
            />
          </v-col>
          <v-card
            class="overflow-x-auto"
            max-width="100%"
          >
            <v-data-table
              :headers="tableData.headers"
              :items="tableData.items"
              v-if="chart"
            ></v-data-table>
          </v-card>
        </v-row>
        <TheButtons
          preview-page-path="/analysis/step4"
          @ok-button="handleResult"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import BarGraph from '../../components/BarGraph.vue'
import DoughnutGraph from '../../components/DoughnutGraph.vue'
import TheButtons from './components/TheButtons.vue'
export default {
  name: 'Result',
  components: {
    BarGraph,
    DoughnutGraph,
    TheButtons
  },
  data() {
    return {
      barChartData: null,
      doughnutChartData: null,
      tableData: {
        headers: null,
        items: null
      },
      chart: false
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriterionImportances', 'getAlternativeEvaluations'])
  },
  methods: {
    handleResult() {
      const cri = this.getCriterionImportances
      const alt = this.getAlternativeEvaluations
      const array = this.$calculator.resultCalculation(cri, alt)
      this.barChartData = this.$chart.createBarChartData(array)
      this.doughnutChartData = this.$chart.createDoughnutChartData(cri)
      this.tableData.headers = this.$chart.createTableHeaders(cri[0])
      this.tableData.items = cri
      this.chart = true
      console.log(cri)
      console.log(alt)
      console.log(array)
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
