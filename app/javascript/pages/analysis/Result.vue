<template>
  <div class="container">
    <h3>結果</h3>
    <div class="col-8 offset-2">
      <div
        v-for="(item, index) in criteria"
        :key="index"
      >
        <div>
          {{ item }}
        </div>
        <EvaluationList
          :combination-array="combinationArray"
          :list-name="item"
          @catch-data="setEvaluationDataCollection(item, index, $event)"
        />
      </div>
      <router-link
        type="button"
        class="btn btn-secondary"
        to="/analysis/step3"
      >
        戻る
      </router-link>
      <button
        type="button"
        class="btn btn-success"
        @click="handleAlternativeEvaluation"
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
export default {
  name: 'AlternativeEvaluation',
  components: {
    EvaluationList
  },
  data() {
    return {
      combinationArray: [],
      evaluationDataCollection: [],
      criteria: [],
      errors: null
    }
  },
  created() {
    const cri = this.getCriterionImportances
    const alt = this.getAlternativeEvaluations
    this.combinationArray = this.$calculator.makePairs(this.getAlternatives)
  },
  computed: {
    ...mapGetters('analysis', ['getCriterionImportances', 'getAlternativeEvaluations'])
  },
  methods: {
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
