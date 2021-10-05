<template>
  <v-container>
    <TheSteppers :value="4" />
    <v-row>
      <v-col
        cols="12"
        lg="8"
        class="mx-auto"
      >
        <h3>STEP4 選択肢の評価</h3>
        <v-col align="center">
          <p>
            それぞれの評価基準のもとで2つの会社のどちらが優れているかを比較し、当てはまる数字（<b>左の会社が優れているなら1~3:右なら5~7</b>）を選んでください。<br>
          </p>
          <HowToCompare type="evaluation" />
        </v-col>
        <div
          v-for="(item, index) in getCriteria"
          :key="index"
          class="mb-15"
        >
          <h4>
            {{ item }}
          </h4>
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
          preview-page-path="/step3"
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
    ...mapGetters('analyses', ['getCriteria', 'getAlternatives'])
  },
  methods: {
    setEvalDataCollection(cri, ind, arr) {
      // 複数のEvaluationListから送られてきた評点配列たちを表示順通りに配列に格納
      this.rawDataCollection[ind] = [].concat(arr) //素点
      this.evalDataCollection[ind] = { criterion: cri, data: arr } //評価基準と素点
    },
    handleAlternativeEvaluation() {
      // バリデーションした上で素点と重要度をストアに保存
      const l = this.evalDataCollection.filter(v => v).length //空要素を除去
      if (l == this.getCriteria.length) {　//評価基準の数と評点配列の数が異なるということは未入力のEvaluationItemがあるということ
        const raw = [].concat(this.rawDataCollection) //素点
        const ev = this.evalDataCollection.map(f => { //評価値　評価基準ごとに選択肢の評価値を算出している
          const h = {}
          h.data = this.$calculator.weightCalculation(this.getAlternatives, f.data)
          h.criterion = f.criterion
          return h
        })
        this.setAlternativeEvaluations(ev)
        this.setEvalRawData(raw)
        this.$router.push('/result')
        console.log(ev)
      } else {
        this.errors = ['未入力の項目があります']
      }
    },
    ...mapActions('analyses', ['setAlternativeEvaluations', 'setEvalRawData'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
  text-align: center;
}
h4 {
  margin: 50px auto;
}
</style>
