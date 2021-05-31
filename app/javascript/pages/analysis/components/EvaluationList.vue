<template>
  <div>
    <div
      v-for="(item, index) in combinationArray"
      :key="index"
    >
      <EvaluationItem
        :combination="item"
        :name="listName + item"
        @catch-value="sendData(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import EvaluationItem from './EvaluationItem.vue'
export default {
  name: 'EvaluationList',
  components: {
    EvaluationItem
  },
  props: {
    combinationArray: {
      type: Array,
      required: true
    },
    listName: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      evaluationListData: []
    }
  },
  methods: {
    sendData(ind, val) {
      const obj = this.$calculator.makeEvalData(this.combinationArray[ind], val)
      this.evaluationListData[ind] = obj
      this.$emit('catch-data', this.evaluationListData)
    }
  }
}
</script>

<style scoped>
</style>
