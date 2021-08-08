<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="10"
        class="mx-auto my-12"
      >
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
            <h4>
              <div class="mb-2">
                YOUR BEST CHOICE:
              </div>
            </h4>
            <h2>
              <span
                v-for="item in bestChoice"
                :key="item"
                class="mx-2"
              >{{ item }}</span>
            </h2>
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
                class="mb-5"
                block
                dark
                color="#6495ed"
                height="56"
                @click="handleResult"
              >
                <div class="mt-1">
                  <h4>SAVE</h4>
                </div>
              </v-btn>
              <v-alert
                v-if="alertSuccess"
                type="success"
              >
                分析結果を保存しました
              </v-alert>
              <v-alert
                v-if="alertError"
                type="error"
              >
                分析結果を保存できませんでした
              </v-alert>
              <v-btn
                class="mb-2"
                block
                dark
                height="56"
                color="#00acee"
                :href="twitterLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="mt-2">
                  <h4>SHARE <v-icon class="mb-2">mdi-twitter</v-icon></h4>
                </div>
              </v-btn>
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
    />
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
    twitterLink() {
      const endpoint = 'https://twitter.com/intent/tweet'
      const cri = this.criImp.reduce((str,i) => str + `${i.name}:${(i.weight*100).toFixed(1)+'％'}%0a`, '')
      const res = this.result.reduce((str,i) => str + `${i.name}:${i.total}%0a`, '')
      const text = 'ジョブハンターズチョイスはこんなデータで仕事選びをサポート！%0a' + '%0aマッチ度%0a' + res + '%0a重視する基準%0a' + cri
      return endpoint + `?text=${text}` + '&hashtags=就活用意思決定ツール%0a,ジョブハンターズチョイス%0a' + '&url=https://jobhunters-choice.com%0a'
    },
    ...mapGetters(
      'analyses', [
        'getAlternatives',
        'getCriterionImportances',
        'getAlternativeEvaluations',
      ]
    ),
    ...mapGetters(
      'users', ['getCurrentUser']
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
      console.log(this.result)
    },
    saveResult() {
      const hash = {
        criterionImportance: this.criImp,
        alternativeResult: this.result
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
      this.getCurrentUser ? this.saveResult() : this.userModal = true
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
  text-align: center;
}
h4 {
  margin-bottom: 0;
}
</style>
