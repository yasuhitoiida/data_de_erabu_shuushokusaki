<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="8"
        class="mx-auto"
      >
        <h3>STEP4 どちらの選択肢が優れているか比較してください</h3>
        <v-col align="center">
          <p>
            それぞれの評価基準において、どの選択肢がどの程度優れているかを数値化します。<br>
            それぞれの評価基準のもとで2つの選択肢を比較し、当てはまる数字を選んでください。<br>
          </p>
          <HowToCompare type="evaluation" />
        </v-col>
        <div
          v-for="(item, index) in getCriteria"
          :key="index"
          class="mb-15"
        >
          <h3>
            {{ item }}
          </h3>
          <EvaluationList
            :factors="getAlternatives"
            :list-number="index"
            @catch-data="setEvaluationDataCollection(item, index, $event)"
          />
        </div>
        <template v-if="errors">
          <ErrorMessage
            :messages="errors"
          />
        </template>
        <TheButtons
          preview-page-path="/analysis/step3"
          @ok-button="handleAlternativeEvaluation"
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
  name: 'AlternativeEvaluation',
  components: {
    EvaluationList,
    HowToCompare,
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
.number-rule {
  text-align: center;
  margin-top: 40px;
}
</style>
