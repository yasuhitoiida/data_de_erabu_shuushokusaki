<template>
  <div class="container">
    <h3>結果</h3>
    <ResultGraph :chart-data="chartData" v-if="graph"></ResultGraph>
    <div class="col-8 offset-2">
      <router-link
        type="button"
        class="btn btn-secondary"
        to="/analysis/step3"
      >
        戻る
      </router-link>
      <button
        type="button"
        class="btn btn-danger"
        @click="handleResult"
      >
        決定
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import EvaluationList from './components/EvaluationList.vue'
import ResultGraph from '../../components/ResultGraph.vue'
export default {
  name: 'Result',
  components: {
    EvaluationList,
    ResultGraph
  },
  data() {
    return {
      chartData: null,
      graph: false
    }
  },
  computed: {
    ...mapGetters('analysis', ['getAlternatives', 'getCriterionImportances', 'getAlternativeEvaluations'])
  },
  methods: {
    handleResult() {
      const cri = this.getCriterionImportances
      const alt = this.getAlternativeEvaluations
      const array = this.$calculator.resultCalculation(cri, alt)
      console.log(array)
      this.chartData = this.$graph.createResultChartData(array)
      console.log(this.chartData)
      this.graph = true
    },
    handleErrors() {
      this.errors = null
    },
    setEvaluationDataCollection(cri, ind, arr) {
      this.evaluationDataCollection[ind] = { criterion: cri, data: arr }
    },
    handleAlternativeEvaluation() {
      const e = this.evaluationDataCollection
      const array = []
      for(let i = 0; i < e.length; i++) {
        const hash = {}
        hash.data = this.$calculator.weightCalculation(this.getAlternatives, e[i].data)
        hash.criterion = e[i].criterion
        array.push(hash)
      }
      this.setAlternativeEvaluations(array)
      console.log(array)
    },
    ...mapActions('analysis', ['setAlternativeEvaluations'])
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
.col {
  text-align: center;
}
</style>
