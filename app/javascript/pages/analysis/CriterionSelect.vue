<template>
  <div class="container">
    <div class="col-8 offset-2">
      <h3>STEP2 就職先を決める上で考慮する条件を選んでください</h3>
      <template v-if="errors">
        <ErrorMessage
          :messages="errors"
        />
      </template>
      <div
        v-for="(item, index) in criteria"
        :key="item"
      >
        <input
          :id="'criterion' + index"
          v-model="selectedCriteria"
          type="checkbox"
          :value="item"
        ><label :for="'criterion' + index">{{ item }}</label>
      </div>
      <div
        v-for="n in criterionAdditionNumber"
        :key="n"
      >
        <input
          v-model="selectedCriteria"
          type="checkbox"
          :value="addedCriteria[n-1]"
        >
        <input v-model="addedCriteria[n-1]">
      </div>
      <div>
        <router-link
          to="#"
          @click.native="addCriterion"
        >
          条件を追加
        </router-link>
      </div>
      <TheButtons
        preview-page-path="/analysis/step1"
        @ok-button="handleSelectedCriteria"
      />
    </div>
  </div>
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
      addedCriteria: [],
      criterionAdditionNumber: 0,
      errors: null
    }
  },
  computed: {
    fetchAlternative() {
      return this.getAlternatives
    },
    ...mapGetters('analysis', ['getAlternatives'])
  },
  methods: {
    addCriterion() {
      this.criterionAdditionNumber ++
    },
    handleSelectedCriteria() {
      const array = this.selectedCriteria.filter(v => v)
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
input {
  margin-bottom: 10px;
}
.buttons {
  margin-top: 10px;
}
</style>
