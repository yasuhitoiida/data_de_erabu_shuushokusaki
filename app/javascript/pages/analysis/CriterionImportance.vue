<template>
  <div class="container">
    <div class="col-8 offset-2">
      <h3>STEP3 条件の重要性を比較してください</h3>
      <template v-if="errors">
        <li
          class="error-message"
        >
          未入力の項目があります
        </li>
      </template>
      <EvaluationList
        :combination-array="combinationArray"
        @catch-data="setEvaluationData"
      />
      <TheButtons
        preview-page-path="/analysis/step2"
        @ok-button="handleCriterionImportance"
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
  name: 'CriterionImportance',
  components: {
    EvaluationList,
    TheButtons
  },
  data() {
    return {
      combinationArray: [],
      evaluationData: null,
      errors: null
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriteria'])
  },
  created() {
    this.combinationArray = this.$calculator.makePairs(this.getCriteria)
  },
  methods: {
    setEvaluationData(arr) {
      const l = arr.filter(v => v).length
      if (l == this.combinationArray.length) {
        this.evaluationData = arr
      }
    },
    handleCriterionImportance() {
      if (this.evaluationData) {
        const array = this.$calculator.weightCalculation(this.getCriteria, this.evaluationData)
        this.setCriterionImportances(array)
        this.$router.push('/analysis/step4')
      } else {
        this.errors = true
      }
    },
    ...mapActions('analysis', ['setCriterionImportances'])
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
