<template>
  <div class="container">
    <div class="col-8 offset-2">
      <h3>STEP4 条件ごとにどちらの就職先が優れているか比較してください</h3>
      <template v-if="errors">
        <ErrorMessage
          :messages="errors"
        />
      </template>
      <div
        v-for="(item, index) in getCriteria"
        :key="index"
      >
        <div>
          {{ item }}
        </div>
        <EvaluationList
          :factors="getAlternatives"
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
import ErrorMessage from '../../components/ErrorMessage.vue'
export default {
  name: 'AlternativeEvaluation',
  components: {
    EvaluationList,
    TheButtons,
    ErrorMessage
  },
  data() {
    return {
      evaluationDataCollection: [],
      errors: null
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriteria', 'getAlternatives'])
  },
  methods: {
    setEvaluationDataCollection(cri, ind, arr) {
      this.evaluationDataCollection[ind] = { criterion: cri, data: arr }
    },
    handleAlternativeEvaluation() {
      const l = this.evaluationDataCollection.filter(v => v).length
      if (l == this.getCriteria.length) {
        const array = this.evaluationDataCollection.map(f => {
          const hash = {}
          hash.data = this.$calculator.weightCalculation(this.getAlternatives, f.data)
          hash.criterion = f.criterion
          return hash
        })
        this.setAlternativeEvaluations(array)
        this.$router.push('/analysis/result')
      } else {
        this.errors = ['未入力の項目があります']
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
