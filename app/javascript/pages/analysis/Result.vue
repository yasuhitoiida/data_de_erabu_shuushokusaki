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
            <DataTable
              :headers="tableDataCri.headers"
              :items="tableDataCri.items"
              title="条件の重要度"
            />
            <v-expansion-panels class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-header>その他のデータ</v-expansion-panel-header>
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
              <v-expansion-panel>
                <v-expansion-panel-header>分析方法について</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <b>要素間のスコア</b>
                  <v-container>
                    <p>要素F<sub>1</sub>を要素F<sub>2</sub>と比較したとき、要素F<sub>1</sub>の「要素F<sub>2</sub>に対するスコア」は以下のとおりである</p>
                    <p>要素F<sub>1</sub>が要素F<sub>2</sub>に対して</p>
                    <ul>
                      <li>とても優れているとき：7点</li>
                      <li>優れているとき：5点</li>
                      <li>やや優れているとき：3点</li>
                      <li>同程度であるとき：1点</li>
                      <li>やや劣っているとき：1/3点</li>
                      <li>劣っているとき：1/5点</li>
                      <li>とても劣っているとき：1/7点</li>
                    </ul>
                    <v-sheet color="#f5f5f5" rounded class="px-4 pt-5 pb-1">
                      <p>たとえば、「労働時間」が「収入」より<b>とても優れている</b>(とても重要である)とき、労働時間の「収入に対するスコア」は<b>7点</b>、収入の「労働時間に対するスコア」は<b>1/7点</b></p>
                      <p>また、ある評価基準の下で「A社」が「B社」より<b>やや劣っている</b>とき、A社の「B社に対するスコア」は<b>1/3点</b>、B社の「A社に対するスコア」は<b>3点</b></p>
                    </v-sheet>
                    <p>なお、ある要素の、それ自身に対するスコアは1点である。</p>
                  </v-container>
                  <b>幾何平均</b>
                  <v-container>
                    <p>n個の要素(F<sub>1</sub>, F<sub>2</sub>, ..., F<sub>n</sub>)で要素間の比較を行ったとき、ある要素F<sub>k</sub>はn個のスコア(S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>n</sub> = それぞれF<sub>1</sub>, F<sub>2</sub>, ..., F<sub>n</sub>に対するスコア)を持つ。このとき、</p>
                    <v-sheet color="#f5f5f5" rounded class="px-4 pt-5 pb-1">
                      <p>要素F<sub>k</sub>の幾何平均G<sub>k</sub> = (S<sub>1</sub> × S<sub>2</sub> × ... × S<sub>n</sub>)^(1/n)</p>
                    </v-sheet>
                  </v-container>
                  <b>重要度</b>
                  <v-container>
                    <v-sheet color="#f5f5f5" rounded class="px-4 pt-5 pb-1">
                      <p>要素F<sub>k</sub>の重要度I<sub>k</sub> = 幾何平均G<sub>k</sub> / 全要素の幾何平均の合計</p>
                    </v-sheet>
                  </v-container>
                  <b>総合評点</b>
                  <v-container>
                    <p>n個の評価基準(C<sub>1</sub>, C<sub>2</sub>, ..., C<sub>n</sub>)の重要度をそれぞれI<sub>C1</sub>, I<sub>C2</sub>, ..., I<sub>Cn</sub>とし、評価基準C<sub>k</sub>の下での代替案Aの重要度をI<sub>Ak</sub>とすると、</p>
                    <v-sheet color="#f5f5f5" rounded class="px-4 pt-5 pb-1">
                      <p>代替案Aの総合評点T<sub>A</sub> = I<sub>C1</sub>×I<sub>A1</sub> + I<sub>C2</sub>×I<sub>A2</sub> + ... + I<sub>Cn</sub>×I<sub>An</sub></p>
                    </v-sheet>
                  </v-container>
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
      bestChoice: null,
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

      this.bestChoice = this.$calculator.bestChoice(result)
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
