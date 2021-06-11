<template>
  <div>
    <div
      v-for="(item, index) in combinations"
      :key="index"
    >
      <EvaluationItem
        :combination="item"
        :name="listNumber + '-' + index"
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
    factors: {
      type: Array,
      required: true
    },
    listNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      combinations: null,
      evalListData: []
    }
  },
  created() {
    this.combinations = this.$calculator.makePairs(this.factors)
  },
  methods: {
    isInputDataEnough(arr) {
      const l = arr.filter(v => v).length
      if (l == this.combinations.length) {
        return true
      } else {
        return false
      }
    },
    sendData(ind, val) {
      this.evalListData[ind] = val
      if (this.isInputDataEnough(this.evalListData)) {
        this.$emit('catch-data', this.evalListData)
      }
    }
  }
}
</script>

<style scoped>
</style>
