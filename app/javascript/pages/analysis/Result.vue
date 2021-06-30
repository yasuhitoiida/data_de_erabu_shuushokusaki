<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="10" class="mx-auto">
        <h3>結果</h3>
        <v-row v-if="!chart">
          <v-col align="center" class="mt-12">
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
        <v-row v-if="chart">
          <v-col cols="12" align="center">
            <h3>
              <div class="mb-2">
                あなたのベストな選択肢：
              </div>
              <span class="mx-2" v-for="item in bestChoice" :key="item">{{ item }}</span>
            </h3>
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <BarGraph
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
              :chart-data="doughnutChartData"
              title="条件の重要度"
            />
          </v-col>
          <v-row>
            <DataTable
              :headers="tableDataResult.headers"
              :items="tableDataResult.items"
              title="総合評点"
            />
            <v-expansion-panels class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-header>分析結果詳細</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <DataTable
                    :headers="tableDataCri.headers"
                    :items="tableDataCri.items"
                    title="条件の重要度"
                  />
                  <DataTable
                    v-for="(item, index) in tableDataAlt.items"
                    :key="index"
                    :headers="tableDataAlt.headers"
                    :items="item.data"
                    :title="item.criterion + 'に関する評価'"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-row>
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>各パラメータの算出方法</v-expansion-panel-header>
              <v-expansion-panel-content>
                <AboutAnalisysMethod></AboutAnalisysMethod>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn @click="topPage">トップページ</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import BarGraph from '../../components/BarGraph.vue'
import DoughnutGraph from '../../components/DoughnutGraph.vue'
import AboutAnalisysMethod from '../../components/AboutAnalisysMethod.vue'
import TheButtons from './components/TheButtons.vue'
import DataTable from '../../components/DataTable.vue'
export default {
  name: 'Result',
  components: {
    BarGraph,
    DoughnutGraph,
    AboutAnalisysMethod,
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
      bestChoice: null,
      chart: false
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriterionImportances', 'getAlternativeEvaluations'])
  },
  methods: {
    topPage() {
      location.href = '/'
    },
    handleResult() {
      const cri = this.getCriterionImportances //評価基準の重要度
      const alt = this.getAlternativeEvaluations //選択肢の評価値
      const result = this.$calculator.resultCalculation(cri, alt) //総合評点
      // 総合評点の棒グラフ用データと評価基準重要度の円グラフ用データを作成
      this.barChartData = this.$chart.createBarChartData(result)
      this.doughnutChartData = this.$chart.createDoughnutChartData(cri)
      // データテーブル用のヘッダーとアイテムを作成
      this.tableDataCri.headers = this.$chart.createTableHeaderWeight(cri[0])
      this.tableDataCri.items = cri
      this.tableDataAlt.headers = this.$chart.createTableHeaderWeight(alt[0].data[0])
      this.tableDataAlt.items = alt
      this.tableDataResult.headers = this.$chart.createTableHeaderResult(result[0])
      this.tableDataResult.items = result
      // ベストチョイス
      this.bestChoice = this.$calculator.bestChoice(result)
      this.chart = true //グラフ等々を表示
      console.log(result)
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
