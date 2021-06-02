<template>
  <div class="container">
    <h3>結果</h3>
    <ResultGraph
      v-if="graph"
      :chart-data="chartData"
    />
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
import ResultGraph from '../../components/ResultGraph.vue'
export default {
  name: 'Result',
  components: {
    ResultGraph
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
input {
  margin-bottom: 10px;
}
.col {
  text-align: center;
}
</style>
