<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="10" class="mx-auto">
        <h3>結果</h3>
        <v-row>
          <v-col align="center">
            <p>
              おつかれさまでした！<br>
              決定ボタンを押して結果を表示してください。
            </p>
            <TheButtons
              preview-page-path="/analysis/step4"
              @ok-button="handleResult"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <BarGraph
              v-if="chart"
              :chart-data="barChartData"
              title="総合評点"
            />
          </v-col>
          <v-col
            cols="8"
            md="4"
            class="mx-auto my-auto"
          >
            <DoughnutGraph
              v-if="chart"
              :chart-data="doughnutChartData"
              title="あなたのこだわり条件"
            />
          </v-col>
          <v-row
            v-if="chart"
          >
            <DataTable
              :headers="tableDataResult.headers"
              :items="tableDataResult.items"
              title="総合評点"
            />
            <DataTable
              :headers="tableDataCri.headers"
              :items="tableDataCri.items"
              title="条件の重要度"
            />
            <v-expansion-panels class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-header>分析結果詳細</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <DataTable
                    v-for="(item, index) in tableDataAlt.items"
                    :key="index"
                    :headers="tableDataAlt.headers"
                    :items="item.data"
                    :title="item.criterion"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-row>
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
import DataTable from './components/DataTable.vue'
export default {
  name: 'Result',
  components: {
    BarGraph,
    DoughnutGraph,
    TheButtons,
    DataTable
  },
  data() {
    return {
      barChartData: null,
      doughnutChartData: null,
      tableDataCri: {
        headers: null,
        items: null
      },
      tableDataAlt: {
        headers: null,
        items: null
      },
      tableDataResult: {
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
      const result = this.$calculator.resultCalculation(cri, alt)

      this.barChartData = this.$chart.createBarChartData(result)
      this.doughnutChartData = this.$chart.createDoughnutChartData(cri)

      this.tableDataCri.headers = this.$chart.createTableHeaderWeight(cri[0])
      this.tableDataCri.items = cri
      this.tableDataAlt.headers = this.$chart.createTableHeaderWeight(alt[0].data[0])
      this.tableDataAlt.items = alt
      this.tableDataResult.headers = this.$chart.createTableHeaderResult(result[0])
      this.tableDataResult.items = result
      this.chart = true
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
