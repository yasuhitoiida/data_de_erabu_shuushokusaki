<template>
  <div class="container">
    <h3>STEP3 条件の重要性を比較してください</h3>
    <div class="col-8 offset-2">
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
      <router-link
        type="button"
        class="btn btn-secondary"
        to="/analysis/step2"
      >
        戻る
      </router-link>
      <button
        type="button"
        class="btn btn-success"
        @click="handleCriterionImportance"
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
  name: 'CriterionImportance',
  components: {
    EvaluationList
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
input {
  margin-bottom: 10px;
}
.col {
  text-align: center;
}
</style>
