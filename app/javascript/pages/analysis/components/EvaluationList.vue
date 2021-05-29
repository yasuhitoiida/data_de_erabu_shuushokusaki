<template>
  <div>
    <div
      v-for="(item, index) in combinationArray"
      :key="index"
    >
      <EvaluationItem
        :combination="item"
        :name="index"
        @catch-value="sendData(index, $event)"
      ></EvaluationItem>
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
    }
  },
  data() {
    return {
      evaluationListData: []
    }
  },
  methods: {
    sendData(ind, val) {
      let obj = {}
      obj.combination = this.combinationArray[ind]
      obj.score = val
      this.evaluationListData[ind] = obj
      this.$emit('catch-data', this.evaluationListData)
    }
  }
}
</script>

<style scoped>
</style>
