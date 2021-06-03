<template>
  <div class="container">
    <div class="col-8 offset-2">
      <h3>STEP4 条件ごとにどちらの就職先が優れているか比較してください</h3>
      <template v-if="errors">
        <li
          class="error-message"
        >
          未入力の項目があります
        </li>
      </template>
      <div
        v-for="(item, index) in criteria"
        :key="index"
      >
        <div>
          {{ item }}
        </div>
        <EvaluationList
          :combination-array="combinationArray"
          :list-number="index"
          @catch-data="setEvaluationDataCollection(item, index, $event)"
        />
      </div>
      <TheButtons
        preview-page-path="/analysis/step3"
        @ok-button="handleAlternativeEvaluation"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import EvaluationList from './components/EvaluationList.vue'
import TheButtons from './components/TheButtons.vue'
export default {
  name: 'AlternativeEvaluation',
  components: {
    EvaluationList,
    TheButtons
  },
  data() {
    return {
      combinationArray: [],
      evaluationDataCollection: [],
      criteria: [],
      errors: null
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriteria', 'getAlternatives'])
  },
  created() {
    this.combinationArray = this.$calculator.makePairs(this.getAlternatives)
    this.criteria = this.getCriteria
  },
  methods: {
    setEvaluationDataCollection(cri, ind, arr) {
      const l = arr.filter(v => v).length
      if (l == this.combinationArray.length) {
        this.evaluationDataCollection[ind] = { criterion: cri, data: arr }
      }
    },
    handleAlternativeEvaluation() {
      const l = this.evaluationDataCollection.filter(v => v).length
      if (l == this.criteria.length) {
        const array = this.evaluationDataCollection.map(f => {
          const hash = {}
          hash.data = this.$calculator.weightCalculation(this.getAlternatives, f.data)
          hash.criterion = f.criterion
          return hash
        })
        this.setAlternativeEvaluations(array)
        this.$router.push('/analysis/result')
      } else {
        this.errors = true
      }
    },
    ...mapActions('analysis', ['setAlternativeEvaluations'])
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
