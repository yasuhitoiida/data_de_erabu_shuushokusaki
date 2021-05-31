<template>
  <div class="container">
    <h3>STEP4 条件ごとにどちらの就職先が優れているか比較してください</h3>
    {{ this.getAlternatives }}
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
    this.combinationArray = this.$calculator.makePairs(this.getAlternatives)
    this.criteria = this.getCriteria
  },
  computed: {
    ...mapGetters('analysis', ['getCriteria', 'getAlternatives'])
  },
  methods: {
    handleErrors() {
      this.errors = null
    },
    setEvaluationDataCollection(cri, ind, arr) {
      this.evaluationDataCollection[ind] = { criterion: cri, data: arr }
    },
    handleAlternativeEvaluation() {
      const array = this.evaluationDataCollection.map(f => {
        const hash = {}
        hash.data = this.$calculator.weightCalculation(this.getAlternatives, f.data)
        hash.criterion = f.criterion
        return hash
      })
      this.setAlternativeEvaluations(array)
      console.log(array)
      this.$router.push('/analysis/result')
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
