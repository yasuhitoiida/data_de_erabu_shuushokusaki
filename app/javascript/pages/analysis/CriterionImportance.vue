<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="8"
        class="mx-auto"
      >
        <h3>STEP3 条件の重要度を比較してください</h3>
        <v-col align="center">
          <p>
            STEP2で選んだ条件に対するあなたのこだわりを数値化します。<br>
            2つの条件のどちらをあなたが重要と考えているか比較し、当てはまる数字を選んでください。<br>
          </p>
          <HowToCompare type="importance" />
        </v-col>
        <EvaluationList
          :factors="getCriteria"
          @catch-data="setEvaluationData"
        />
        <template v-if="errors">
          <ErrorMessage
            :messages="errors"
          />
        </template>
        <TheButtons
          preview-page-path="/analysis/step2"
          @ok-button="handleCriterionImportance"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import EvaluationList from './components/EvaluationList.vue'
import HowToCompare from './components/HowToCompare.vue'
import TheButtons from './components/TheButtons.vue'
import ErrorMessage from '../../components/ErrorMessage.vue'
export default {
  name: 'CriterionImportance',
  components: {
    EvaluationList,
    HowToCompare,
    TheButtons,
    ErrorMessage
  },
  data() {
    return {
      evaluationData: null,
      errors: null
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriteria'])
  },
  methods: {
    setEvaluationData(arr) {
      this.evaluationData = arr
    },
    async handleCriterionImportance() {
      if (this.evaluationData) {
        const raw = [].concat(this.evaluationData)
        const imp = this.$calculator.weightCalculation(this.getCriteria, this.evaluationData)
        this.setCriterionImportances({imp:imp, raw:raw})
        this.$router.push('/analysis/step4')
      } else {
        this.errors = ['未入力の項目があります']
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
</style>
