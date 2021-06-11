<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <h3>STEP2 就職先を決める上での評価基準を選んでください</h3>
        <v-checkbox
          v-for="(item, index) in criteria"
          :id="'criterion' + index"
          :key="item"
          v-model="selectedCriteria"
          color="orange"
          :value="item"
          :label="item"
          class="mt-0"
        />
        <div class="input-group">
          <input
            v-model="addedCriteria"
            class="form-control"
            placeholder="追加したい条件を記入"
          >
          <v-btn
            @click.native="addCriterion"
          >
            条件を追加
          </v-btn>
        </div>
        <template v-if="errors">
          <ErrorMessage
            :messages="errors"
          />
        </template>
        <TheButtons
          preview-page-path="/analysis/step1"
          @ok-button="handleSelectedCriteria"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import TheButtons from './components/TheButtons.vue'
import ErrorMessage from '../../components/ErrorMessage.vue'
export default {
  name: 'CriterionSelect',
  components: {
    TheButtons,
    ErrorMessage
  },
  data() {
    return {
      criteria: [
        '労働時間',
        '通勤時間',
        '雇用の安定',
        '仕事の裁量権',
        '社会への貢献度',
        '周囲のサポートの充実度',
        'ワークライフバランス',
        'タスク/評価基準の明確性',
        '仕事の幅広さ',
        '福利厚生',
        '達成感',
        '収入'
      ],
      selectedCriteria: [],
      trueValue: [],
      addedCriteria: null,
      errors: null
    }
  },
  created() {
    if (this.getCriteria) {
      this.selectedCriteria = this.getCriteria
      this.criteria = this.criteria.concat(this.getCriteria.filter(f => !this.criteria.includes(f)))
    }
  },
  computed: {
    fetchAlternative() {
      return this.getAlternatives
    },
    ...mapGetters('analysis', ['getAlternatives', 'getCriteria'])
  },
  methods: {
    addCriterion() {
      this.criteria.push(this.addedCriteria)
      this.selectedCriteria.push(this.addedCriteria)
      this.addedCriteria = null
    },
    handleSelectedCriteria() {
      const array = this.selectedCriteria.filter(v => v)
      console.log(array)
      if (array.length >= 2) {
        this.setCriteria(array)
        this.$router.push('/analysis/step3')
      } else {
        this.errors = ['条件を2つ以上選んでください']
      }
    },
    ...mapActions('analysis', ['setCriteria'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
