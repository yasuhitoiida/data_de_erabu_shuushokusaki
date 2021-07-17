<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="10"
        class="mx-auto"
      >
        <h3>結果</h3>
        <v-row v-if="!chart">
          <v-col
            align="center"
          >
            <p>
              おつかれさまでした！<br>
              決定ボタンを押して結果を表示してください。
            </p>
            <TheButtons
              preview-page-path="/step4"
              @ok-button="displayResult"
            />
          </v-col>
        </v-row>
        <v-row v-if="chart">
          <v-col
            cols="12"
            align="center"
          >
            <h3>
              <div class="mb-2">
                あなたのベストな選択肢：
              </div>
              <span
                v-for="item in bestChoice"
                :key="item"
                class="mx-2"
              >{{ item }}</span>
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
          <v-row justify="center">
            <v-col
              cols="12"
              md="8"
              align="center"
            >
              <v-btn
                v-if="saveButton"
                @click="handleResult"
                class="mb-2"
                block
              >
                結果を保存
              </v-btn>
              <v-alert type="success" color="#6495ed" v-if="alertSuccess">分析結果を保存しました</v-alert>
              <v-alert type="error" v-if="alertError">分析結果を保存できませんでした</v-alert>
            </v-col>
          </v-row>
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
              <v-expansion-panel>
                <v-expansion-panel-header>各パラメータの算出方法</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <AboutAnalisysMethod />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-row>
        <v-col align="center">
          <v-btn @click="topPage">
            トップページ
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
    <UserModal
      :display="userModal"
      @close-modal="closeModal"
      @authenticated="saveResultAfterAuthentication"
    ></UserModal>
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
import UserModal from './components/UserModal.vue'
export default {
  name: 'Result',
  components: {
    BarGraph,
    DoughnutGraph,
    AboutAnalisysMethod,
    TheButtons,
    DataTable,
    UserModal
  },
  data() {
    return {
      chart: false,
      alertSuccess: false,
      alertError: false,
      saveButton: true,
      userModal: false
    }
  },
  computed: {
    criImp() {
      return this.getCriterionImportances
    },
    altEval() {
      return this.getAlternativeEvaluations
    },
    result() {
      return this.$calculator.resultCalculation(this.criImp, this.altEval)
    },
    barChartData() {
      return this.$chart.createBarChartData(this.result)
    },
    doughnutChartData() {
      return this.$chart.createDoughnutChartData(this.criImp)
    },
    tableDataCri() {
      const h = this.$chart.createTableHeaderWeight(this.criImp[0])
      const i = this.criImp
      return { headers: h, items: i}
    },
    tableDataAlt() {
      const h = this.$chart.createTableHeaderWeight(this.altEval[0].data[0])
      const i = this.altEval
      return { headers: h, items: i}
    },
    tableDataResult() {
      const h = this.$chart.createTableHeaderResult(this.result[0])
      const i = this.result
      return { headers: h, items: i}
    },
    bestChoice() {
      return this.$calculator.bestChoice(this.result)
    },
    ...mapGetters(
      'analyses', [
        'getAlternatives',
        'getCriterionImportances',
        'getAlternativeEvaluations',
      ]
    ),
    ...mapGetters(
      'users', [
        'getLoginUser'
      ]
    )
  },
  methods: {
    topPage() {
      location.href = '/'
    },
    closeModal() {
      this.userModal = false
    },
    displayResult() {
      this.chart = true
    },
    saveResult() {
      const hash = {
        criterion_importance: this.criImp,
        alternative_result: this.result
      }
      this.$axios.post('analyses', { analysis: hash })
      .then(res => {
        this.alertSuccess = true
        this.saveButton = false
        console.log(res)
      })
      .catch(err => {
        this.alertError = true
        console.error(err)
      }
      )
    },
    saveResultAfterAuthentication() {
      this.closeModal()
      this.saveResult()
    },
    handleResult() {
      this.getLoginUser ? this.saveResult() : this.userModal = true
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
  text-align: center;
}
</style>
