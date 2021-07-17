<template>
  <v-container>
    <TheSteppers :value="3" />
    <v-row>
      <v-col
        cols="12"
        lg="8"
        class="mx-auto"
      >
        <h3>STEP3 評価基準の重要度評価</h3>
        <v-col align="center">
          <p>
            STEP2で選んだ条件に対するあなたのこだわりを数値化します。<br>
            左右2つの条件のうちどちらを重要と考えているか比較し、当てはまる数字を選んでください。<br>
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
          preview-page-path="/step2"
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
import TheSteppers from './components/TheSteppers.vue'
import ErrorMessage from '../../components/ErrorMessage.vue'
export default {
  name: 'CriterionImportance',
  components: {
    EvaluationList,
    HowToCompare,
    TheButtons,
    TheSteppers,
    ErrorMessage
  },
  data() {
    return {
      evaluationData: null,
      errors: null
    }
  },
  computed: {
    ...mapGetters('analyses', ['getCriteria'])
  },
  methods: {
    setEvaluationData(arr) {
      // EvaluationListから送られてきた評点配列を受け取る
      this.evaluationData = arr
    },
    handleCriterionImportance() {
      // バリデーションした上で素点と重要度をストアに保存
      if (this.evaluationData) { // これがないということは未入力のEvaluationItemがあるということ
        const raw = [].concat(this.evaluationData) //素点
        const imp = this.$calculator.weightCalculation(this.getCriteria, this.evaluationData) //重要度
        this.setCriterionImportances(imp)
        this.setImpRawData(raw)
        this.$router.push('/step4')
        console.log(imp)
      } else {
        this.errors = ['未入力の項目があります']
      }
    },
    ...mapActions('analyses', ['setCriterionImportances', 'setImpRawData'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
  text-align: center;
}
</style>
