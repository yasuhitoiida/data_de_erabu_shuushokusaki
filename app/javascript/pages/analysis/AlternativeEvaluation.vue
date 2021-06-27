<template>
  <v-container>
    <TheSteppers :value="4"></TheSteppers>
    <v-row>
      <v-col
        cols="12"
        lg="8"
        class="mx-auto"
      >
        <h3>STEP4 選択肢の評価</h3>
        <v-col align="center">
          <p>
            あなたが考えている選択肢がどの程度条件を満たしているかを数値化します。<br>
            それぞれの観点で2つの選択肢同士を比較し、当てはまる数字を選んでください。<br>
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
            @catch-data="setEvalDataCollection(item, index, $event)"
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
import TheSteppers from './components/TheSteppers.vue'
import ErrorMessage from '../../components/ErrorMessage.vue'
export default {
  name: 'AlternativeEvaluation',
  components: {
    EvaluationList,
    HowToCompare,
    TheButtons,
    TheSteppers,
    ErrorMessage
  },
  data() {
    return {
      evalDataCollection: [],
      rawDataCollection: [],
      errors: null
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriteria', 'getAlternatives'])
  },
  methods: {
    setEvalDataCollection(cri, ind, arr) {
      this.rawDataCollection[ind] = [].concat(arr)
      this.evalDataCollection[ind] = { criterion: cri, data: arr }
    },
    handleAlternativeEvaluation() {
      const l = this.evalDataCollection.filter(v => v).length
      if (l == this.getCriteria.length) {
        const raw = [].concat(this.rawDataCollection)
        const ev = this.evalDataCollection.map(f => {
          const hash = {}
          hash.data = this.$calculator.weightCalculation(this.getAlternatives, f.data)
          hash.criterion = f.criterion
          return hash
        })
        console.log(raw)
        console.log(ev)
        this.setAlternativeEvaluations({eval: ev, raw: raw})
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
