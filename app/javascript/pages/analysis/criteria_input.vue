<template>
  <div class="container">
    <h3>STEP2 就職先を決める上で考慮する条件を選んでください</h3>
    <div class="col-8 offset-2">
      <div
        v-for="(item, index) in criteria"
        :key="item"
      >
        <input
          :id="index"
          v-model="selectedCriteria"
          type="checkbox"
          :value="item"
        ><label :for="index">{{ item }}</label>
      </div>
      <div
        v-for="n in criteriaAdditionNumber"
        :key="n"
      >
        <input
          v-model="selectedCriteria"
          type="checkbox"
          :value="addedCriteria[n-1]"
        >
        <input v-model="addedCriteria[n-1]">
      </div>
      <button
        type="button"
        class="btn btn-success"
        @click="addCriteria"
      >
        追加
      </button>
      <button
        type="button"
        class="btn btn-success"
        @click="handleCriteria"
      >
        決定
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
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
      criteriaAdditionNumber: 0,
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
    handleErrors() {
      this.errors = null
    },
    addCriteria() {
      this.criteriaAdditionNumber += 1
    },
    handleCriteria() {
      const array = this.selectedCriteria.filter(v => v)
      this.setCriteria(array)
    },
    ...mapActions('analysis', ['setCriteria'])
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>
