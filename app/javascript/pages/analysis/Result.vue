<template>
  <div class="container">
    <div class="col-8 offset-2">
      <h3>結果</h3>
      <ResultGraph
        v-if="graph"
        :chart-data="chartData"
      />
      <TheButtons
        preview-page-path="/analysis/step4"
        @ok-button="handleResult"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import ResultGraph from '../../components/ResultGraph.vue'
import TheButtons from './components/TheButtons.vue'
export default {
  name: 'Result',
  components: {
    ResultGraph,
    TheButtons
  },
  data() {
    return {
      chartData: null,
      graph: false
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
      this.chartData = this.$graph.createResultChartData(array)
      this.graph = true
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
input {
  margin-bottom: 10px;
}
.col {
  text-align: center;
}
</style>
